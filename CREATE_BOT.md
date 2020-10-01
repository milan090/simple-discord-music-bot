# Creating a Bot Account
In order to work with the Music Bot and the Discord API in general, we must first create a Discord Bot account.

Creating a Bot account is pretty straightforward process.

1. Make sure you're logged on to the [Discord website](https://discord.com/)
2. Navigate to the [application page](https://discord.com/developers/applications)
3. Click on the “New Application” button.
4. Give the application a name and click “Create”.
5. Create a Bot User by navigating to the “Bot” tab and clicking “Add Bot”.
    * Click “Yes, do it!” to continue.
6. Make sure that Public Bot is ticked if you want others to invite your bot.
    * You should also make sure that Require OAuth2 Code Grant is unchecked unless you are developing a service that needs it. If you’re unsure, then leave it unchecked.
7. Copy the token using the “Copy” button and paste it in your "config.json" file.
    * This is not the Client Secret at the General Information page. 
    * Warning: It should be worth noting that this token is essentially your bot’s password. You should never share this to someone else. In doing so, someone can log in to your bot and do malicious things, such as leaving servers, ban all members inside a server, or pinging everyone maliciously.

And that’s it. You now have a bot account and you can login with that token.

# Inviting Your Bot

So you’ve made a Bot User but it’s not actually in any server.

If you want to invite your bot you must create an invite URL for it.

1. Make sure you're logged on to the [Discord website](https://discord.com/)
2. Navigate to the [application page](https://discord.com/developers/applications)
3. Click on your bot's page.
4. Go to the "OAuth2" tab.
5. Tick the “bot” checkbox under “scopes”.
6. Tick the permissions required for your bot to function under “Bot Permissions”. In this case `Connect`, `Speak`, `Send Messages`, `View Channels` and `Add Reactions`.
    * Please be aware of the consequences of requiring your bot to have the “Administrator” permission.
    * Bot owners must have 2FA enabled for certain actions and permissions when added in servers that have Server-Wide 2FA enabled. Check the [2FA support page](https://support.discord.com/hc/en-us/articles/219576828-Setting-up-Two-Factor-Authentication) for more information.
7. Now the resulting URL can be used to add your bot to a server. Copy and paste the URL into your browser, choose a server to invite the bot to, and click “Authorize”.
    * Note: The person adding the bot needs “Manage Server” permissions to do so.
	
