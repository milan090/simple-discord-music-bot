# Simple Discord Music Bot

### Steps to run the bot

1. Clone the repo and cd into it.
2. `npm install` to install the dependencies.
3. [Create a bot on discord developer portal](CREATE_BOT.md) and get the TOKEN.
4. Create a new `config.json` file in root directory (refer example_config.json).
5. Paste the discord TOKEN for the bot in the newly created `config.json`.
6. `npm start` or `npm dev:start`(run with nodemon) to run the bot.

### Testing the bot

1. [Invite](CREATE_BOT.md) the bot into a guild/server ([Join our server for testing and feedback](https://discord.gg/yBB2bF))
2. Run the bot with `npm dev:start`.

## Available Commands

- `^play <SONG_NAME>`
- `^queue`
- `^skip`
- `^stop`
- `^seek 2:31`
- `^change <SONG_INDEX>:<NEW_INDEX>`
- `^suggest`
