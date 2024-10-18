import { Collection } from '@discordjs/collection';
import { DISCORD_APP_USER_ID, DISCORD_TOKEN } from '../config.js';


// *******************************
//  Exports

/** Utility & Command/Interaction Collections */
export const UtilityCollections = {
    /** Holds all Cooldowns for Slash Commands, mapped by "commandName_userID"
     * @type {Collection<String, Number>} 
     */
    SlashCooldowns: new Collection(),

    /** Holds all Cooldowns for Context Commands, mapped by "commandName_userID"
     * @type {Collection<String, Number>} 
     */
    ContextCooldowns: new Collection(),

    /** Holds all Cooldowns for Button Interactions, mapped by "buttonName_userID"
     * @type {Collection<String, Number>} 
     */
    ButtonCooldowns: new Collection(),

    /** Holds all Cooldowns for Select Menu Interactions, mapped by "selectName_userID"
     * @type {Collection<String, Number>}
     */
    SelectCooldowns: new Collection()
};

/**
 * Use to respond to Interactions indirectly from the receiving Interaction
 * @param {String} interactionId 
 * @param {String} interactionToken 
 * @returns {String}
 */
export const UriInteractionCallback = (interactionId, interactionToken) => `https://discord.com/api/v10/interactions/${interactionId}/${interactionToken}/callback`;

/**
 * Use to edit original Interaction Responses 
 * @param {String} interactionToken 
 * @returns {String}
 */
export const UriEditOriginalInteraction = (interactionToken) => `https://discord.com/api/v10/webhooks/${DISCORD_APP_USER_ID}/${interactionToken}/messages/@original`;

/** Default Response Headers for responding to Interactions */
export const InteractionResponseHeaders = {
    'Content-Type': 'application/json',
    Authorization: `Bot ${DISCORD_TOKEN}`
};
