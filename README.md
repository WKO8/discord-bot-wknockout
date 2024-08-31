# Discord Bot Project

This project is a Discord bot designed to manage in-game resources with various slash commands. It uses Node.js and the `discord-interactions` package to handle interactions with the Discord API.

## Features of a Drug Faction (8 commands)

- **/folhas_de_coca**: Control lockpick quantities.
- **/cocaina_pronta**: Control cocaine quantities.
- **/lockpick**: Control lockpick quantities.
- **/bandagem**:Control bandage quantities.
- **/dinheiro_sujo**: Control legal money quantities.
- **/dinheiro_limpo**: Control illegal money quantities.
- **/mesa_de_droga**: Control drug tables quantities.
- **/mostrar_todos**: Show all items and their quantities.

## Getting Started

### Prerequisites

- Node.js
- Docker
- Heroku CLI

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/WKO8/discord-bot-wknockout.git
   cd discord-bot-wknockout
Install dependencies:

2. Install dependencies:
npm install
Create a .env file with your Discord bot token and public key:

3. Create a .env file with your Discord bot token and public key:
      ```bash
      DISCORD_TOKEN=your_discord_bot_token
      PUBLIC_KEY=your_discord_public_key
      APP_ID=your_discord_app_id
      Running Locally
      Start the application:
      ```

# Running locally
1. Start the application:
    ```bash
    npm start
    ```

2. Your app should be running on http://localhost:3000.
