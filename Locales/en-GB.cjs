module.exports = {

    // ******* GENERIC STUFF
    ERROR_GENERIC: `An error has occurred.`,
    ERROR_GENERIC_WITH_PREVIEW: `An error has occurred. A preview of the raw error is as follows:\n\`\`\`{{0}}\`\`\``,



    // ******* GENERIC SLASH COMMAND STUFF
    SLASH_COMMAND_ERROR_GENERIC: `Sorry, but there was a problem trying to run this Slash Command...`,

    SLASH_COMMAND_ERROR_COOLDOWN_SECONDS: `Please wait {{0}} more seconds before using this Slash Command again.`,
    SLASH_COMMAND_ERROR_COOLDOWN_MINUTES: `Please wait {{0}} more minutes before using this Slash Command again.`,
    SLASH_COMMAND_ERROR_COOLDOWN_HOURS: `Please wait {{0}} more hours before using this Slash Command again.`,
    SLASH_COMMAND_ERROR_COOLDOWN_DAYS: `Please wait {{0}} more days before using this Slash Command again.`,
    SLASH_COMMAND_ERROR_COOLDOWN_MONTHS: `Please wait {{0}} more months before using this Slash Command again.`,



    // ******* GENERIC CONTEXT COMMAND STUFF
    CONTEXT_COMMAND_ERROR_GENERIC: `Sorry, an error occurred while trying to run this Context Command...`,

    CONTEXT_COMMAND_ERROR_COOLDOWN_SECONDS: `Please wait {{0}} more seconds before using this Context Command again.`,
    CONTEXT_COMMAND_ERROR_COOLDOWN_MINUTES: `Please wait {{0}} more minutes before using this Context Command again.`,
    CONTEXT_COMMAND_ERROR_COOLDOWN_HOURS: `Please wait {{0}} more hours before using this Context Command again.`,
    CONTEXT_COMMAND_ERROR_COOLDOWN_DAYS: `Please wait {{0}} more days before using this Context Command again.`,
    CONTEXT_COMMAND_ERROR_COOLDOWN_MONTHS: `Please wait {{0}} more months before using this Context Command again.`,



    // ******* GENERIC BUTTON STUFF
    BUTTON_ERROR_GENERIC: `An error occurred while trying to process that Button press...`,

    BUTTON_ERROR_COOLDOWN_SECONDS: `Please wait {{0}} more seconds before using this Button again.`,
    BUTTON_ERROR_COOLDOWN_MINUTES: `Please wait {{0}} more minutes before using this Button again.`,
    BUTTON_ERROR_COOLDOWN_HOURS: `Please wait {{0}} more hours before using this Button again.`,
    BUTTON_ERROR_COOLDOWN_DAYS: `Please wait {{0}} more days before using this Button again.`,
    BUTTON_ERROR_COOLDOWN_MONTHS: `Please wait {{0}} more months before using this Button again.`,



    // ******* GENERIC SELECT MENU STUFF
    SELECT_ERROR_GENERIC: `An error occurred while trying to process that Select Menu choice...`,

    SELECT_ERROR_COOLDOWN_SECONDS: `Please wait {{0}} more seconds before using this Select Menu again.`,
    SELECT_ERROR_COOLDOWN_MINUTES: `Please wait {{0}} more minutes before using this Select Menu again.`,
    SELECT_ERROR_COOLDOWN_HOURS: `Please wait {{0}} more hours before using this Select Menu again.`,
    SELECT_ERROR_COOLDOWN_DAYS: `Please wait {{0}} more days before using this Select Menu again.`,
    SELECT_ERROR_COOLDOWN_MONTHS: `Please wait {{0}} more months before using this Select Menu again.`,



    // ******* GENERIC MODAL STUFF
    MODAL_ERROR_GENERIC: `An error occurred while trying to process that Modal submission...`,



    // ******* GENERIC AUTOCOMPLETE STUFF
    AUTOCOMPLETE_ERROR_GENERIC: `Error: Unable to process.`,



    // ******* MAIN WELCOME COMMANDS
    WELCOME_COMMAND_ENABLE_SUCCESS: `Successfully enabled the Welcome Screen for this Server.\n\nNew Members to this Server will now be shown it when joining.`,
    WELCOME_COMMAND_DISABLE_SUCCESS: `Successfully disabled the Welcome Screen for this Server.\n\nNew Members to this Server will no longer be shown it when joining.`,
    
    WELCOME_COMMAND_PREVIEW_EMPTY_PLACEHOLDER: `-# *There is nothing in this Server's Welcome Screen...*`,
    WELCOME_COMMAND_PREVIEW_EMBED_CHANNELS_HEADER: `Welcome Channels:`,
    WELCOME_COMMAND_PREVIEW_INTRODUCTION: `## __Welcome Screen Preview__\nBelow is a preview of this Server's current Welcome Screen.\nYou can make changes to it using the \`/welcome edit\` Subcommands.\n\nThis Server's Welcome Screen is currently: **{{0}}**\n\n-# *Can't see the preview? Make sure you have Embeds enabled in **User Settings -> Chat -> "Show embeds and preview website links"***`,
    WELCOME_COMMAND_PREVIEW_ENABLED: `Enabled`,
    WELCOME_COMMAND_PREVIEW_DISABLED: `Disabled`,

    WELCOME_COMMAND_ERROR_MISSING_PERMISSION: `Sorry, I cannot toggle or edit this Server's Welcome Screen since I am missing the "**Manage Server**" Permission!\nPlease grant me this Permission, then try again.`,
    WELCOME_COMMAND_ERROR_GUILD_NOT_COMMUNITY: `Sorry, I cannot edit or toggle the Welcome Screen here since this Server is not Community-enabled.\nIf you want to make use of the Welcome Screen, please get the Server Owner (or someone with the **Admin** Permission) to enable Community within Server Settings.`,
    WELCOME_COMMAND_ERROR_EDIT_FETCH_GENERIC: `Sorry, something went wrong while trying to fetch this Server's current Welcome Screen data.`,

    WELCOME_COMMAND_ERROR_ALREADY_ENABLED: `The Welcome Screen is already enabled for this Server!`,
    WELCOME_COMMAND_ERROR_CANNOT_ENABLE_DUE_TO_SERVER_GUIDE: `Sorry, the Welcome Screen cannot be enabled while Server Guide is enabled.\nThis is a restriction imposed by Discord themselves. If you want to enable Welcome Screen, please disable Server Guide first via **Server Settings -> Onboarding**.`,
    WELCOME_COMMAND_ERROR_ENABLE_GENERIC: `Sorry, something went wrong while trying to enable the Welcome Screen for this Server.`,

    WELCOME_COMMAND_ERROR_ALREADY_DISABLED: `The Welcome Screen is already disabled for this Server!`,
    WELCOME_COMMAND_ERROR_CANNOT_DISABLE_DUE_TO_SERVER_GUIDE: `The Welcome Screen is already force-disabled by Discord since Server Guide is enabled in this Server!`,
    WELCOME_COMMAND_ERROR_DISABLE_GENERIC: `Sorry, something went wrong while trying to disable the Welcome Screen for this Server.`,
    
    WELCOME_COMMAND_ERROR_CANNOT_EDIT_DUE_TO_SERVER_GUIDE: `Sorry, the Welcome Screen cannot be edited while Server Guide is enabled.\nThis is due to how Discord made Server Guide force-disable the Welcome Screen feature when Server Guide is enabled.\nIf you want to edit the Welcome Screen, please disable Server Guide first via **Server Settings -> Onboarding**.`,
    WELCOME_COMMAND_ERROR_EDIT_SAVE_GENERIC: `Sorry, something went wrong while trying to save your changes to the Welcome Screen.`,
    WELCOME_COMMAND_ERROR_EDIT_GENERIC: `Sorry, something went wrong while while processing this Command.`,

    WELCOME_COMMAND_ERROR_PREVIEW_MISSING_PERMISSION: `Sorry, I cannot fetch this Server's current Welcome Screen data since I am missing the "**Manage Server**" Permission!\nPlease grant me this Permission, then try again.`,
    WELCOME_COMMAND_ERROR_PREVIEW_NOT_COMMUNITY: `Sorry, I cannot fetch this Server's current Welcome Screen data as this Server is not Community-enabled.\nThe Welcome Screen requires Community to be enabled for it to exist in this Server.`,



    // ******* WELCOME SCREEN EDITING COMMANDS
    WELCOME_EDIT_DESCRIPTION_SUCCESS: `Successfully updated the description of this Server's Welcome Screen.\n\n**Previously (Old):**\n\`\`\`{{0}}\`\`\`\n**Updated (New):**\n\`\`\`{{1}}\`\`\``,
    WELCOME_EDIT_DESCRIPTION_ERROR_GENERIC: `Sorry, an error occurred while trying to save the updated description for this Server's Welcome Screen.`,

    WELCOME_EDIT_ADD_CHANNEL_SUCCESS: `Successfully added the <#{{0}}> Channel to this Server's Welcome Screen.`,
    WELCOME_EDIT_ADD_CHANNEL_ERROR_DUPLICATE: `The <#{{0}}> Channel already exists on this Server's Welcome Screen!`,
    WELCOME_EDIT_ADD_CHANNEL_ERROR_GENERIC: `Sorry, an error occurred while trying to add the <#{{0}}> Channel to this Server's Welcome Screen.`,
    WELCOME_EDIT_ADD_CHANNEL_ERROR_MAXIMUM_AMOUNT_REACHED: `Sorry, you cannot add the <#{{0}}> Channel to this Server's Welcome Screen, as there are already 5 other Channels added.\n-# Welcome Screens only support a maximum of 5 Channels.`,

    WELCOME_EDIT_EDIT_CHANNEL_SUCCESS: `Successfully edited the <#{{0}}> Channel's listing on this Server's Welcome Screen.`,
    WELCOME_EDIT_EDIT_CHANNEL_ERROR_NOT_FOUND: `The <#{{0}}> Channel was not found on this Server's Welcome Screen.`,
    WELCOME_EDIT_EDIT_CHANNEL_ERROR_GENERIC: `Sorry, an error occurred while trying to edit the <#{{0}}> Channel's listing on this Server's Welcome Screen.`,

    WELCOME_EDIT_REMOVE_CHANNEL_SUCCESS: `Successfully removed the <#{{0}}> Channel from this Server's Welcome Screen.`,
    WELCOME_EDIT_REMOVE_CHANNEL_ERROR_NOT_FOUND: `The <#{{0}}> Channel was not found on this Server's Welcome Screen.`,
    WELCOME_EDIT_REMOVE_CHANNEL_ERROR_GENERIC: `Sorry, an error occurred while trying to remove the <#{{0}}> Channel from this Server's Welcome Screen.`,



    // ******* INVITE COMMAND
    INVITE_COMMAND_RESPONSE: `Use the below link to add **Welcome Editor** to your Server!\n\n[Add App to Server]( {{0}} )`,



    // ******* SUPPORT COMMAND
    SUPPORT_COMMAND_RESPONSE: `Need help/support with using **Welcome Editor** App?\nFeel free to ask on GitHub, linked below.`,
    SUPPORT_COMMAND_BUTTON_GITHUB_LABEL: `Ask on GitHub`,
}
