import { DISCORD_APP_USER_ID, DISCORD_TOKEN } from './config.js';

// SLASH COMMANDS
import * as WelcomeCommand from './Commands/SlashCommands/Management/welcome.js';
import * as InviteCommand from './Commands/SlashCommands/General/invite.js';
import * as SupportCommand from './Commands/SlashCommands/General/support.js';

/** URL used to register Interaction Commands */
const url = `https://discord.com/api/v10/applications/${DISCORD_APP_USER_ID}/commands`;

/** Array of Commands to register */
const CommandArray = [
    WelcomeCommand.SlashCommand.getRegisterData(),
    InviteCommand.SlashCommand.getRegisterData(),
    SupportCommand.SlashCommand.getRegisterData()
];

const response = await fetch(url, {
    headers: {
        'Content-Type': 'application/json',
        Authorization: `Bot ${DISCORD_TOKEN}`
    },
    method: 'PUT',
    body: JSON.stringify(CommandArray)
});

if ( response.ok ) {
    console.log(`Deployed!`);
    const data = await response.json();
}
else {
    console.error(`Error deploying`);
    let errorText = `Error deploying commands. \n ${response.url}: ${response.status} ${response.statusText}`;
    try {
        const error = await response.text();
        if ( error ) {
            errorText = `${errorText} \n\n ${error}`;
        }
    }
    catch (err) {
        console.error(`Error reading body from request:`, err);
    }
    console.error(errorText);
}
