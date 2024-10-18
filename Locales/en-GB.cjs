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



    // ******* WELCOME COMMAND
    WELCOME_COMMAND_ENABLE_SUCCESS: `Successfully enabled the Welcome Screen for this Server.\n\nNew Members to this Server will now be shown it when joining.`,
    WELCOME_COMMAND_DISABLE_SUCCESS: `Successfully disabled the Welcome Screen for this Server.\n\nNew Members to this Server will no longer be shown it when joining.`,

    WELCOME_COMMAND_ERROR_MISSING_PERMISSION: `Sorry, I cannot toggle or edit this Server's Welcome Screen since I am missing the "**Manage Server**" Permission!\nPlease grant me this Permission, then try again.`,
    WELCOME_COMMAND_ERROR_ALREADY_ENABLED: `The Welcome Screen is already enabled for this Server!`,
    WELCOME_COMMAND_ERROR_ALREADY_DISABLED: `The Welcome Screen is already disabled for this Server!`,
    WELCOME_COMMAND_ERROR_CANNOT_ENABLE_DUE_TO_SERVER_GUIDE: `Sorry, the Welcome Screen cannot be enabled while Server Guide is enabled.\nThis is a restriction imposed by Discord themselves. If you want to enable Welcome Screen, please disable Server Guide first via **Server Settings -> Onboarding**.`,
    WELCOME_COMMAND_ERROR_CANNOT_DISABLE_DUE_TO_SERVER_GUIDE: `The Welcome Screen is already force-disabled by Discord since Server Guide is enabled in this Server!`,
    WELCOME_COMMAND_ERROR_GUILD_NOT_COMMUNITY: `Sorry, I cannot edit or toggle the Welcome Screen here since this Server is not Community-enabled.\nIf you want to make use of the Welcome Screen, please get the Server Owner (or someone with the **Admin** Permission) to enable Community within Server Settings.`,
}
