import { ApplicationCommandType, InteractionContextType, ApplicationIntegrationType, MessageFlags, InteractionResponseType, ButtonStyle } from 'discord-api-types/v10';
import { JsonResponse } from '../../../Utility/utilityMethods.js';
import { ActionRowBuilder, ButtonBuilder } from '@discordjs/builders';
import { localize } from '../../../Utility/localizeResponses.js';

const GitHubLink = "https://github.com/TwilightZebby/WelcomeEditor/issues/new/choose";


export const SlashCommand = {
    /** Command's Name, in fulllowercase (can include hyphens)
     * @type {String}
     */
    name: "support",

    /** Command's Description
     * @type {String}
     */
    description: "Shows where you can gain help with using this App.",

    /** Command's Localised Descriptions
     * @type {import('discord-api-types/v10').LocalizationMap}
     */
    localizedDescriptions: {
        'en-GB': 'Shows where you can gain help with using this App.',
        'en-US': 'Shows where you can gain help with using this App.'
    },

    /** Command's cooldown, in seconds (whole number integers!)
     * @type {Number}
     */
    cooldown: 3,

    /**
     * Cooldowns for specific Subcommands
     */
    // Where "exampleName" is either the Subcommand's Name, or a combo of both Subcommand Group Name and Subcommand Name
    //  For ease in handling cooldowns, this should also include the root Command name as a prefix
    // In either "rootCommandName_subcommandName" or "rootCommandName_groupName_subcommandName" formats
    subcommandCooldown: {
        "exampleName": 3
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
        // Create Link Buttons
        const LinkActionRow = new ActionRowBuilder().addComponents([
            new ButtonBuilder().setStyle(ButtonStyle.Link).setLabel(localize(interaction.locale, 'SUPPORT_COMMAND_BUTTON_GITHUB_LABEL')).setURL(GitHubLink)
        ]);

        return new JsonResponse({
            type: InteractionResponseType.ChannelMessageWithSource,
            data: {
                flags: MessageFlags.Ephemeral,
                content: localize(interaction.locale, 'SUPPORT_COMMAND_RESPONSE'),
                components: [LinkActionRow]
            }
        });
    }
}
