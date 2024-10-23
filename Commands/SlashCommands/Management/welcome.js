import { ApplicationCommandType, InteractionContextType, ApplicationIntegrationType, MessageFlags, InteractionResponseType, ApplicationCommandOptionType, PermissionFlagsBits, ChannelType } from 'discord-api-types/v10';
import { ActionRowBuilder, EmbedBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder } from '@discordjs/builders';
import { localize } from '../../../Utility/localizeResponses.js';
import { JsonResponse } from '../../../Utility/utilityMethods.js';
import { InteractionResponseHeaders } from '../../../Utility/utilityConstants.js';


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
        "welcome_edit": 20,
        "welcome_edit_description": 20,
        "welcome_edit_add-channel": 20,
        "welcome_edit_edit-channel": 20,
        "welcome_edit_remove-channel": 20,
        "welcome_preview": 20
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
        CommandData.default_member_permissions = `${PermissionFlagsBits.ManageGuild}`;
        CommandData.options = [
            {
                type: ApplicationCommandOptionType.SubcommandGroup,
                name: "edit",
                description: "Subcommands for editing specific parts of the Welcome Screen",
                options: [
                    {
                        type: ApplicationCommandOptionType.Subcommand,
                        name: "description",
                        description: "Edit the main description for the Welcome Screen",
                        options: [{
                            type: ApplicationCommandOptionType.String,
                            name: "description",
                            description: "The new description you want to set",
                            max_length: 150,
                            required: true
                        }]
                    },
                    {
                        type: ApplicationCommandOptionType.Subcommand,
                        name: "add-channel",
                        description: "Add a Channel to be shown on the Welcome Screen",
                        options: [{
                            type: ApplicationCommandOptionType.Channel,
                            name: "channel",
                            description: "The Channel you want added",
                            channel_types: [ ChannelType.GuildAnnouncement, ChannelType.GuildForum, ChannelType.GuildMedia, ChannelType.GuildText ],
                            required: true
                        }, {
                            type: ApplicationCommandOptionType.String,
                            name: "label",
                            description: "A label or description for the selected Channel",
                            max_length: 50,
                            required: true
                        }, /* {
                            type: ApplicationCommandOptionType.String,
                            name: "emoji",
                            description: "[OPTIONAL] An emoji, default or custom, to be displayed with the selected Channel",
                            max_length: 100,
                            required: false
                        } */]
                    },
                    {
                        type: ApplicationCommandOptionType.Subcommand,
                        name: "edit-channel",
                        description: "Edit an existing Channel listing on the Welcome Screen",
                        options: [{
                            type: ApplicationCommandOptionType.Channel,
                            name: "channel",
                            description: "The Channel listing to be edited",
                            channel_types: [ ChannelType.GuildAnnouncement, ChannelType.GuildForum, ChannelType.GuildMedia, ChannelType.GuildText ],
                            required: true
                        }, {
                            type: ApplicationCommandOptionType.String,
                            name: "label",
                            description: "A new label or description for the selected Channel",
                            max_length: 50,
                            required: true
                        }, /* {
                            type: ApplicationCommandOptionType.String,
                            name: "emoji",
                            description: "[OPTIONAL] A new emoji, default or custom, to be displayed with the selected Channel",
                            max_length: 100,
                            required: false
                        } */]
                    },
                    {
                        type: ApplicationCommandOptionType.Subcommand,
                        name: "remove-channel",
                        description: "Remove a Channel from the Welcome Screen",
                        options: [{
                            type: ApplicationCommandOptionType.Channel,
                            name: "channel",
                            description: "The Channel to remove",
                            channel_types: [ ChannelType.GuildAnnouncement, ChannelType.GuildForum, ChannelType.GuildMedia, ChannelType.GuildText ],
                            required: true
                        }]
                    }
                ]
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
            },
            {
                type: ApplicationCommandOptionType.Subcommand,
                name: "preview",
                description: "Shows you the current setup for this Server's Welcome Screen"
            },
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
        const InputEditGroup = interaction.data.options.find(option => option.type === ApplicationCommandOptionType.SubcommandGroup);

        if ( InputSubcommand != undefined )
        {
            switch (InputSubcommand.name) {
                case "enable":
                    return await enableWelcome(interaction, interactionUser);
            
                case "disable":
                    return await disableWelcome(interaction, interactionUser);

                case "preview":
                    return await previewWelcome(interaction, interactionUser);
            }
        }
        else if ( InputEditGroup != undefined ) {
            // Grab which Subcommand of this Command Group was used
            const InputEditSubcommand = InputEditGroup.options.find(option => option.type === ApplicationCommandOptionType.Subcommand);

            // Simplify/De-dupe code

            // Permission check
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


            // Check if Welcome Screen *can* be edited
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

            // Ensure Server Guide is DISABLED
            if ( fetchedGuild["features"].includes("GUILD_SERVER_GUIDE") ) {
                return new JsonResponse({
                    type: InteractionResponseType.ChannelMessageWithSource,
                    data: {
                        content: localize(interaction.locale, 'WELCOME_COMMAND_ERROR_CANNOT_EDIT_DUE_TO_SERVER_GUIDE'),
                        flags: MessageFlags.Ephemeral
                    }
                });
            }


            // Fetch current Welcome Screen
            let welcomeRequest = await fetch(`https://discord.com/api/v10/guilds/${interaction.guild_id}/welcome-screen`, {
                method: 'GET',
                headers: InteractionResponseHeaders
            });
            let welcomeData = await welcomeRequest.json();

            
            switch (InputEditSubcommand.name) {
                case "description":
                    return await editDescription(interaction, InputEditSubcommand, welcomeData);
            
                case "add-channel":
                    return await addChannel(interaction, InputEditSubcommand, welcomeData);

                case "edit-channel":
                    return await editChannel(interaction, InputEditSubcommand, welcomeData);

                case "remove-channel":
                    return await removeChannel(interaction, InputEditSubcommand, welcomeData);
            }
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



/** Previews the current Welcome Screen
 * @param {import('discord-api-types/v10').APIChatInputApplicationCommandInteraction} interaction 
 * @param {import('discord-api-types/v10').APIUser} interactionUser 
 */
async function previewWelcome(interaction, interactionUser) {
    // Check App *does* have MANAGE_GUILD Permission first!
    let appPerms = BigInt(interaction.app_permissions);

    if ( !((appPerms & PermissionFlagsBits.ManageGuild) == PermissionFlagsBits.ManageGuild) ) {
        return new JsonResponse({
            type: InteractionResponseType.ChannelMessageWithSource,
            data: {
                content: localize(interaction.locale, 'WELCOME_COMMAND_ERROR_PREVIEW_MISSING_PERMISSION'),
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
                content: localize(interaction.locale, 'WELCOME_COMMAND_ERROR_PREVIEW_NOT_COMMUNITY'),
                flags: MessageFlags.Ephemeral
            }
        });
    }


    // Fetch Welcome Screen data
    let screenRequest = await fetch(`https://discord.com/api/v10/guilds/${interaction.guild_id}/welcome-screen`, {
        method: 'GET',
        headers: InteractionResponseHeaders
    });

    if ( screenRequest.status !== 200 ) {
        return new JsonResponse({
            type: InteractionResponseType.ChannelMessageWithSource,
            data: {
                content: localize(interaction.locale, 'WELCOME_COMMAND_ERROR_EDIT_FETCH_GENERIC'),
                flags: MessageFlags.Ephemeral
            }
        });
    }

    const welcomeData = await screenRequest.json();
    // Format into Embed for readability
    const previewEmbed = new EmbedBuilder().setDescription(localize(interaction.locale, 'WELCOME_COMMAND_PREVIEW_EMPTY_PLACEHOLDER'));

    if ( welcomeData["description"] != null ) { previewEmbed.setDescription(welcomeData["description"]); }
    
    if ( welcomeData["welcome_channels"].length > 0 ) {
        let channelStringArray = [];    

        welcomeData["welcome_channels"].forEach(channel => {
            let tempEmoji = "";

            // Emoji
            if ( channel["emoji_name"] != null && channel["emoji_id"] == null ) { tempEmoji = channel["emoji_name"]; }
            else if ( channel["emoji_name"] != null && channel["emoji_id"] != null ) { tempEmoji = `<:${channel["emoji_name"]}:${channel["emoji_id"]}>`; }
            
            channelStringArray.push(`${tempEmoji} <#${channel["channel_id"]}>\n> ${channel["description"]}`);
        });

        previewEmbed.addFields({ name: localize(interaction.locale, 'WELCOME_COMMAND_PREVIEW_EMBED_CHANNELS_HEADER'), value: channelStringArray.join(`\n\n`) });
    }

    // Welcome Screen enabled status
    let welcomeScreenEnabledStatus = "";
    if ( fetchedGuild["features"].includes("WELCOME_SCREEN_ENABLED") ) { welcomeScreenEnabledStatus = localize(interaction.locale, 'WELCOME_COMMAND_PREVIEW_ENABLED'); }
    else { welcomeScreenEnabledStatus = localize(interaction.locale, 'WELCOME_COMMAND_PREVIEW_DISABLED'); }

    // ACK
    return new JsonResponse({
        type: InteractionResponseType.ChannelMessageWithSource,
        data: {
            content: localize(interaction.locale, 'WELCOME_COMMAND_PREVIEW_INTRODUCTION', welcomeScreenEnabledStatus),
            embeds: [previewEmbed],
            flags: MessageFlags.Ephemeral
        }
    });
}



/** Edits the Welcome Screen's description
 * @param {import('discord-api-types/v10').APIChatInputApplicationCommandInteraction} interaction 
 * @param {import('discord-api-types/v10').APIApplicationCommandInteractionDataSubcommandOption} subcommand 
 * @param {*} welcomeData API Welcome Screen data
 */
async function editDescription(interaction, subcommand, welcomeData) {
    // Grab input
    const InputDescription = subcommand.options.find(option => option.type === ApplicationCommandOptionType.String);
    let requestBody = JSON.stringify({ description: InputDescription.value });

    // Send patch
    let patchRequest = await fetch(`https://discord.com/api/v10/guilds/${interaction.guild_id}/welcome-screen`, {
        method: 'PATCH',
        headers: InteractionResponseHeaders,
        body: requestBody
    });

    if ( patchRequest.status != 200 ) {
        return new JsonResponse({
            type: InteractionResponseType.ChannelMessageWithSource,
            data: {
                content: localize(interaction.locale, 'WELCOME_EDIT_DESCRIPTION_ERROR_GENERIC'),
                flags: MessageFlags.Ephemeral
            }
        });
    }
    else {
        let oldDescription = welcomeData["description"] == null ? " " : welcomeData["description"];

        return new JsonResponse({
            type: InteractionResponseType.ChannelMessageWithSource,
            data: {
                content: localize(interaction.locale, 'WELCOME_EDIT_DESCRIPTION_SUCCESS', oldDescription, InputDescription.value),
                flags: MessageFlags.Ephemeral
            }
        });
    }
}



/** Add a Channel to the Welcome Screen
 * @param {import('discord-api-types/v10').APIChatInputApplicationCommandInteraction} interaction 
 * @param {import('discord-api-types/v10').APIApplicationCommandInteractionDataSubcommandOption} subcommand 
 * @param {*} welcomeData API Welcome Screen data
 */
async function addChannel(interaction, subcommand, welcomeData) {
    // Grab inputs
    const InputChannel = subcommand.options.find(option => option.type === ApplicationCommandOptionType.Channel);
    const InputLabel = subcommand.options.find(option => option.type === ApplicationCommandOptionType.String && option.name === "label");

    // If there are already five, reject!
    if ( welcomeData["welcome_channels"].length === 5 ) {
        return new JsonResponse({
            type: InteractionResponseType.ChannelMessageWithSource,
            data: {
                content: localize(interaction.locale, 'WELCOME_EDIT_ADD_CHANNEL_ERROR_MAXIMUM_AMOUNT_REACHED', InputChannel.value),
                flags: MessageFlags.Ephemeral
            }
        });
    }

    // Assemble into the correct Object format
    let newChannel = { "channel_id": InputChannel.value, description: InputLabel.value };

    // Patch into current data (reject if duplicate is found)
    let updatedData = welcomeData["welcome_channels"];
    let checkIndex = updatedData.findIndex(welcomeChannel => welcomeChannel["channel_id"] === InputChannel.value);

    if ( checkIndex !== -1 ) {
        // Duplicate was found, reject!
        return new JsonResponse({
            type: InteractionResponseType.ChannelMessageWithSource,
            data: {
                content: localize(interaction.locale, 'WELCOME_EDIT_ADD_CHANNEL_ERROR_DUPLICATE', InputChannel.value),
                flags: MessageFlags.Ephemeral
            }
        });
    }

    updatedData.push(newChannel);
    let requestBody = JSON.stringify({ "welcome_channels": updatedData });

    // Send patch
    let patchRequest = await fetch(`https://discord.com/api/v10/guilds/${interaction.guild_id}/welcome-screen`, {
        method: 'PATCH',
        headers: InteractionResponseHeaders,
        body: requestBody
    });

    if ( patchRequest.status != 200 ) {
        return new JsonResponse({
            type: InteractionResponseType.ChannelMessageWithSource,
            data: {
                content: localize(interaction.locale, 'WELCOME_EDIT_ADD_CHANNEL_ERROR_GENERIC', InputChannel.value),
                flags: MessageFlags.Ephemeral
            }
        });
    }
    else {
        return new JsonResponse({
            type: InteractionResponseType.ChannelMessageWithSource,
            data: {
                content: localize(interaction.locale, 'WELCOME_EDIT_ADD_CHANNEL_SUCCESS', InputChannel.value),
                flags: MessageFlags.Ephemeral
            }
        });
    }
}



/** Edits an existing Channel listing on the Welcome Screen
 * @param {import('discord-api-types/v10').APIChatInputApplicationCommandInteraction} interaction 
 * @param {import('discord-api-types/v10').APIApplicationCommandInteractionDataSubcommandOption} subcommand 
 * @param {*} welcomeData API Welcome Screen data
 */
async function editChannel(interaction, subcommand, welcomeData) {
    // Grab inputs
    const InputChannel = subcommand.options.find(option => option.type === ApplicationCommandOptionType.Channel);
    const InputLabel = subcommand.options.find(option => option.type === ApplicationCommandOptionType.String && option.name === "label");

    // Assemble into the correct Object format
    let updatedChannel = { "channel_id": InputChannel.value, description: InputLabel.value };

    // Patch into current data (reject if no Channel is found)
    let updatedData = welcomeData["welcome_channels"];
    let checkIndex = updatedData.findIndex(welcomeChannel => welcomeChannel["channel_id"] === InputChannel.value);

    if ( checkIndex === -1 ) {
        // The Channel wasn't found, reject
        return new JsonResponse({
            type: InteractionResponseType.ChannelMessageWithSource,
            data: {
                content: localize(interaction.locale, 'WELCOME_EDIT_EDIT_CHANNEL_ERROR_NOT_FOUND', InputChannel.value),
                flags: MessageFlags.Ephemeral
            }
        });
    }

    updatedData.splice(checkIndex, 1, updatedChannel);
    let requestBody = JSON.stringify({ "welcome_channels": updatedData });

    // Send patch
    let patchRequest = await fetch(`https://discord.com/api/v10/guilds/${interaction.guild_id}/welcome-screen`, {
        method: 'PATCH',
        headers: InteractionResponseHeaders,
        body: requestBody
    });

    if ( patchRequest.status != 200 ) {
        return new JsonResponse({
            type: InteractionResponseType.ChannelMessageWithSource,
            data: {
                content: localize(interaction.locale, 'WELCOME_EDIT_EDIT_CHANNEL_ERROR_GENERIC', InputChannel.value),
                flags: MessageFlags.Ephemeral
            }
        });
    }
    else {
        return new JsonResponse({
            type: InteractionResponseType.ChannelMessageWithSource,
            data: {
                content: localize(interaction.locale, 'WELCOME_EDIT_EDIT_CHANNEL_SUCCESS', InputChannel.value),
                flags: MessageFlags.Ephemeral
            }
        });
    }
}



/** Removes a Channel from the Welcome Screen
 * @param {import('discord-api-types/v10').APIChatInputApplicationCommandInteraction} interaction 
 * @param {import('discord-api-types/v10').APIApplicationCommandInteractionDataSubcommandOption} subcommand 
 * @param {*} welcomeData API Welcome Screen data
 */
async function removeChannel(interaction, subcommand, welcomeData) {
    // Grab inputs
    const InputChannel = subcommand.options.find(option => option.type === ApplicationCommandOptionType.Channel);

    // Patch into current data (reject if no Channel is found)
    let updatedData = welcomeData["welcome_channels"];
    let checkIndex = updatedData.findIndex(welcomeChannel => welcomeChannel["channel_id"] === InputChannel.value);

    if ( checkIndex === -1 ) {
        // The Channel wasn't found, reject
        return new JsonResponse({
            type: InteractionResponseType.ChannelMessageWithSource,
            data: {
                content: localize(interaction.locale, 'WELCOME_EDIT_REMOVE_CHANNEL_ERROR_NOT_FOUND', InputChannel.value),
                flags: MessageFlags.Ephemeral
            }
        });
    }

    updatedData.splice(checkIndex, 1);
    let requestBody = JSON.stringify({ "welcome_channels": updatedData });

    // Send patch
    let patchRequest = await fetch(`https://discord.com/api/v10/guilds/${interaction.guild_id}/welcome-screen`, {
        method: 'PATCH',
        headers: InteractionResponseHeaders,
        body: requestBody
    });

    if ( patchRequest.status != 200 ) {
        return new JsonResponse({
            type: InteractionResponseType.ChannelMessageWithSource,
            data: {
                content: localize(interaction.locale, 'WELCOME_EDIT_REMOVE_CHANNEL_ERROR_GENERIC', InputChannel.value),
                flags: MessageFlags.Ephemeral
            }
        });
    }
    else {
        return new JsonResponse({
            type: InteractionResponseType.ChannelMessageWithSource,
            data: {
                content: localize(interaction.locale, 'WELCOME_EDIT_REMOVE_CHANNEL_SUCCESS', InputChannel.value),
                flags: MessageFlags.Ephemeral
            }
        });
    }
}
