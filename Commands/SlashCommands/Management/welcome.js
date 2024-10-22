import { ApplicationCommandType, InteractionContextType, ApplicationIntegrationType, MessageFlags, InteractionResponseType, ApplicationCommandOptionType, PermissionFlagsBits } from 'discord-api-types/v10';
import { localize } from '../../../Utility/localizeResponses.js';
import { JsonResponse } from '../../../Utility/utilityMethods.js';
import { DISCORD_TOKEN } from '../../../config.js';
import { InteractionResponseHeaders, UriEditOriginalInteraction, UriInteractionCallback } from '../../../Utility/utilityConstants.js';


export const SlashCommand = {
    /** Command's Name, in fulllowercase (can include hyphens)
     * @type {String}
     */
    name: "welcome",

    /** Command's Description
     * @type {String}
     */
    description: "Edit or Toggle the Welcome Screen for this Server",

    /** Command's Localised Descriptions
     * @type {import('discord-api-types/v10').LocalizationMap}
     */
    localizedDescriptions: {
        'en-GB': 'Edit or Toggle the Welcome Screen for this Server',
        'en-US': 'Edit or Toggle the Welcome Screen for this Server'
    },

    /** Command's cooldown, in seconds (whole number integers!)
     * @type {Number}
     */
    cooldown: 10,

    /**
     * Cooldowns for specific Subcommands
     */
    // Where "exampleName" is either the Subcommand's Name, or a combo of both Subcommand Group Name and Subcommand Name
    //  For ease in handling cooldowns, this should also include the root Command name as a prefix
    // In either "rootCommandName_subcommandName" or "rootCommandName_groupName_subcommandName" formats
    subcommandCooldown: {
        "welcome_enable": 10,
        "welcome_disable": 10,
        "welcome_edit": 20
    },
    

    /** Get the Command's data in a format able to be registered with via Discord's API
     * @returns {import('discord-api-types/v10').RESTPostAPIApplicationCommandsJSONBody}
     */
    getRegisterData() {
        /** @type {import('discord-api-types/v10').RESTPostAPIApplicationCommandsJSONBody} */
        const CommandData = {};

        CommandData.name = this.name;
        CommandData.description = this.description;
        CommandData.description_localizations = this.localizedDescriptions;
        CommandData.type = ApplicationCommandType.ChatInput;
        // Integration Types - 0 for GUILD_INSTALL, 1 for USER_INSTALL.
        //  MUST include at least one. 
        CommandData.integration_types = [ ApplicationIntegrationType.GuildInstall ];
        // Contexts - 0 for GUILD, 1 for BOT_DM (DMs with the App), 2 for PRIVATE_CHANNEL (DMs/GDMs that don't include the App).
        //  MUST include at least one. PRIVATE_CHANNEL can only be used if integration_types includes USER_INSTALL
        CommandData.contexts = [ InteractionContextType.Guild ];
        CommandData.options = [
            {
                type: ApplicationCommandOptionType.Subcommand,
                name: "edit",
                description: "Starts the editing process for configuring this Server's Welcome Screen"
            },
            {
                type: ApplicationCommandOptionType.Subcommand,
                name: "enable",
                description: "Enables the Welcome Screen, showing it to new Server Members"
            },
            {
                type: ApplicationCommandOptionType.Subcommand,
                name: "disable",
                description: "Disables the Welcome Screen, hiding it from new Server Members"
            }
        ];

        return CommandData;
    },

    /** Handles given Autocomplete Interactions, should this Command use Autocomplete Options
     * @param {import('discord-api-types/v10').APIApplicationCommandAutocompleteInteraction} interaction 
     * @param {import('discord-api-types/v10').APIUser} interactionUser 
     */
    async handleAutoComplete(interaction, interactionUser) {
        return new JsonResponse({
            type: InteractionResponseType.ApplicationCommandAutocompleteResult,
            data: {
                choices: [ {name: "Not implemented yet!", value: "NOT_IMPLEMENTED"} ]
            }
        });
    },

    /** Runs the Command
     * @param {import('discord-api-types/v10').APIChatInputApplicationCommandInteraction} interaction 
     * @param {import('discord-api-types/v10').APIUser} interactionUser 
     * @param {String} usedCommandName 
     * @param {*} ctx Sent by Cloudflare Worker
     */
    async executeCommand(interaction, interactionUser, usedCommandName, ctx) {
        // See what Subcommand was used
        const InputSubcommand = interaction.data.options.find(option => option.type === ApplicationCommandOptionType.Subcommand);

        switch (InputSubcommand.name) {
            case "enable":
                return await enableWelcome(interaction, interactionUser);
            
            case "disable":
                return await disableWelcome(interaction, interactionUser);

            case "edit":
                return await editWelcome(interaction, interactionUser);
        }
    }
}



/** Turns on Welcome Screen
 * @param {import('discord-api-types/v10').APIChatInputApplicationCommandInteraction} interaction 
 * @param {import('discord-api-types/v10').APIUser} interactionUser 
 */
async function enableWelcome(interaction, interactionUser) {
    // Check App *does* have MANAGE_GUILD Permission first!
    let appPerms = BigInt(interaction.app_permissions);

    if ( !((appPerms & PermissionFlagsBits.ManageGuild) == PermissionFlagsBits.ManageGuild) ) {
        return new JsonResponse({
            type: InteractionResponseType.ChannelMessageWithSource,
            data: {
                content: localize(interaction.locale, 'WELCOME_COMMAND_ERROR_MISSING_PERMISSION'),
                flags: MessageFlags.Ephemeral
            }
        });
    }


    // Fetch Guild Feature Flags
    let fetchedGuildRaw = await fetch(`https://discord.com/api/v10/guilds/${interaction.guild_id}`, {
        headers: InteractionResponseHeaders,
        method: 'GET'
    });
    let fetchedGuild = await fetchedGuildRaw.json();

    // Check if Guild is Community-enabled first. Welcome Screen requires Community to be enabled
    if ( !fetchedGuild["features"].includes("COMMUNITY") ) {
        return new JsonResponse({
            type: InteractionResponseType.ChannelMessageWithSource,
            data: {
                content: localize(interaction.locale, 'WELCOME_COMMAND_ERROR_GUILD_NOT_COMMUNITY'),
                flags: MessageFlags.Ephemeral
            }
        });
    }

    // Ensure Welcome Screen is not already enabled
    if ( fetchedGuild["features"].includes("WELCOME_SCREEN_ENABLED") ) {
        return new JsonResponse({
            type: InteractionResponseType.ChannelMessageWithSource,
            data: {
                content: localize(interaction.locale, 'WELCOME_COMMAND_ERROR_ALREADY_ENABLED'),
                flags: MessageFlags.Ephemeral
            }
        });
    }

    // Ensure Server Guide is DISABLED
    if ( fetchedGuild["features"].includes("GUILD_SERVER_GUIDE") ) {
        return new JsonResponse({
            type: InteractionResponseType.ChannelMessageWithSource,
            data: {
                content: localize(interaction.locale, 'WELCOME_COMMAND_ERROR_CANNOT_ENABLE_DUE_TO_SERVER_GUIDE'),
                flags: MessageFlags.Ephemeral
            }
        });
    }


    // Enable Welcome Screen!
    try {
        let req = await fetch(`https://discord.com/api/v10/guilds/${interaction.guild_id}/welcome-screen`, {
            method: 'PATCH',
            headers: InteractionResponseHeaders,
            body: JSON.stringify({
                enabled: true
            })
        });
        
        if ( req.status === 200 ) {
            return new JsonResponse({
                type: InteractionResponseType.ChannelMessageWithSource,
                data: {
                    content: localize(interaction.locale, 'WELCOME_COMMAND_ENABLE_SUCCESS'),
                    flags: MessageFlags.Ephemeral
                }
            });
        }
        else {
            return new JsonResponse({
                type: InteractionResponseType.ChannelMessageWithSource,
                data: {
                    content: localize(interaction.locale, 'WELCOME_COMMAND_ERROR_ENABLE_GENERIC'),
                    flags: MessageFlags.Ephemeral
                }
            });
        }
    }
    catch (err) {
        return new JsonResponse({
            type: InteractionResponseType.ChannelMessageWithSource,
            data: {
                content: localize(interaction.locale, 'WELCOME_COMMAND_ERROR_ENABLE_GENERIC'),
                flags: MessageFlags.Ephemeral
            }
        });
    }
}



/** Turns off Welcome Screen
 * @param {import('discord-api-types/v10').APIChatInputApplicationCommandInteraction} interaction 
 * @param {import('discord-api-types/v10').APIUser} interactionUser 
 */
async function disableWelcome(interaction, interactionUser) {
    // Check App *does* have MANAGE_GUILD Permission first!
    let appPerms = BigInt(interaction.app_permissions);

    if ( !((appPerms & PermissionFlagsBits.ManageGuild) == PermissionFlagsBits.ManageGuild) ) {
        return new JsonResponse({
            type: InteractionResponseType.ChannelMessageWithSource,
            data: {
                content: localize(interaction.locale, 'WELCOME_COMMAND_ERROR_MISSING_PERMISSION'),
                flags: MessageFlags.Ephemeral
            }
        });
    }


    // Fetch Guild Feature Flags
    let fetchedGuildRaw = await fetch(`https://discord.com/api/v10/guilds/${interaction.guild_id}`, {
        headers: InteractionResponseHeaders,
        method: 'GET'
    });
    let fetchedGuild = await fetchedGuildRaw.json();

    // Check if Guild is Community-enabled first. Welcome Screen requires Community
    if ( !fetchedGuild["features"].includes("COMMUNITY") ) {
        return new JsonResponse({
            type: InteractionResponseType.ChannelMessageWithSource,
            data: {
                content: localize(interaction.locale, 'WELCOME_COMMAND_ERROR_GUILD_NOT_COMMUNITY'),
                flags: MessageFlags.Ephemeral
            }
        });
    }

    // Ensure Welcome Screen is not already disabled
    if ( !fetchedGuild["features"].includes("WELCOME_SCREEN_ENABLED") ) {
        return new JsonResponse({
            type: InteractionResponseType.ChannelMessageWithSource,
            data: {
                content: localize(interaction.locale, 'WELCOME_COMMAND_ERROR_ALREADY_DISABLED'),
                flags: MessageFlags.Ephemeral
            }
        });
    }

    // Ensure Server Guide is DISABLED
    if ( fetchedGuild["features"].includes("GUILD_SERVER_GUIDE") ) {
        return new JsonResponse({
            type: InteractionResponseType.ChannelMessageWithSource,
            data: {
                content: localize(interaction.locale, 'WELCOME_COMMAND_ERROR_CANNOT_DISABLE_DUE_TO_SERVER_GUIDE'),
                flags: MessageFlags.Ephemeral
            }
        });
    }


    // Disable Welcome Screen!
    try {
        let req = await fetch(`https://discord.com/api/v10/guilds/${interaction.guild_id}/welcome-screen`, {
            method: 'PATCH',
            headers: InteractionResponseHeaders,
            body: JSON.stringify({
                enabled: false
            })
        });

        if ( req.status === 200 ) {
            return new JsonResponse({
                type: InteractionResponseType.ChannelMessageWithSource,
                data: {
                    content: localize(interaction.locale, 'WELCOME_COMMAND_DISABLE_SUCCESS'),
                    flags: MessageFlags.Ephemeral
                }
            });
        }
        else {
            return new JsonResponse({
                type: InteractionResponseType.ChannelMessageWithSource,
                data: {
                    content: localize(interaction.locale, 'WELCOME_COMMAND_ERROR_DISABLE_GENERIC'),
                    flags: MessageFlags.Ephemeral
                }
            });
        }
    }
    catch (err) {
        return new JsonResponse({
            type: InteractionResponseType.ChannelMessageWithSource,
            data: {
                content: localize(interaction.locale, 'WELCOME_COMMAND_ERROR_DISABLE_GENERIC'),
                flags: MessageFlags.Ephemeral
            }
        });
    }
}



/** Edits the Welcome Screen
 * @param {import('discord-api-types/v10').APIChatInputApplicationCommandInteraction} interaction 
 * @param {import('discord-api-types/v10').APIUser} interactionUser 
 */
async function editWelcome(interaction, interactionUser) {
    //.
}
