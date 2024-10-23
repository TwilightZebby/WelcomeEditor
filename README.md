# Welcome Editor App
A Server App to allow Discord Servers to edit & toggle the [Welcome Screen feature](https://support.discord.com/hc/en-us/articles/360043913591) again. Hosted using CloudFlare Workers.

> [!IMPORTANT]
> Since Discord favours their [Server Guide feature](https://support.discord.com/hc/en-us/articles/13497665141655) over Welcome Screen, you will NOT be able to enable the Welcome Screen in your Server if you also have Server Guide enabled.
> This is a limitation/restriction on Discord's end, so if you want anyone to blame, blame them! Not this App's developer!

> [!WARNING]
> This Server App **requires** the App to have been granted the "**Manage Server**" Permission in order to edit and/or toggle the Welcome Screen in your Server. This is just what the Welcome Screen requires (even for Users) and this App's developer has no control over that requirement. 🙃

---

# Commands

## `/welcome enable`
Use to enable the Welcome Screen in your Server, allowing it to show to new Members joining your Server.

## `/welcome disable`
Use to disable the Welcome Screen in your Server, preventing it from showing to new Members.

## `/welcome preview`
Use to view a preview of the current Welcome Screen setup for your Server.

## `/welcome edit`
Use to edit parts of, or all of, the Welcome Screen for your Server.

This includes:
- The description shown in the Welcome Screen
- The Channels shown in the Welcome Screen (up to 5 maximum) and a custom description & emoji for each of them

This is actually a subcommand group, allowing you to edit specific parts of the Welcome Screen using the following subcommands:

### `/welcome edit description`
Edit the main description shown in the Welcome Screen.

### `/welcome edit add-channel`
Add a Channel to be shown on the Welcome Screen.

> [!NOTE]
> Only Text-based Channels can be added to the Welcome Screen. This is a limitation imposed by Discord themselves.
>
> The exact supported Channel types are: Text, [Announcement](https://support.discord.com/hc/en-us/articles/360032008192), [Forum](https://support.discord.com/hc/en-us/articles/6208479917079), and [Media](https://creator-support.discord.com/hc/en-us/articles/14346342766743).

### `/welcome edit edit-channel`
Edit the emoji and/or label for an existing listed Channel on the Welcome Screen.

### `/welcome edit remove-channel`
Remove a Channel from being shown on the Welcome Screen.

---

# Questions

## Why did you make this App?
> Someone in the [Discord Admins Server](https://dis.gd/dac-faq) really wants Discord to un-deprecate the Welcome Screen feature and allow it to be editible/toggleable in-client again - and brought up a really good use-case/point for why when I discussed this with them.
> 
> Afterwards, it got me thinking and I decided to make this App for that purpose, since the Welcome Screen is still editible & toggleable via the public API. :)
