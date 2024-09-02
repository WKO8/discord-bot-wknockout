# Discord BOT Project

This project is a Discord bot designed to manage in-game resources with various slash commands. It uses Node.js and the `discord-interactions` package to handle interactions with the Discord API.

## Features of a Drug Faction

- **/folhas_de_coca**: Control lockpick quantities.
- **/cocainas_prontas**: Control cocaine quantities.
- **/lockpicks**: Control lockpick quantities.
- **/bandagens**:Control bandage quantities.
- **/dinheiro_sujo**: Control legal money quantities.
- **/dinheiro_limpo**: Control illegal money quantities.
- **/mesas_de_droga**: Control drug tables quantities.
- **/mostrar_todos**: Show all items and their quantities.

## Getting Started

### Prerequisites

- Git
- Node.js
- Docker
- Heroku CLI
- MongoDB account

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
      MONGO_URI=your_mongodb_uri
      MONGO_DB=your_mongodb_name
      ```
      - For install the commands in the discord server:
      ```
      GUILD_ID=your_guild_id
      USER_MOD_ID=your_user_id
      ```
# MongoDB Setup
1. Create a MongoDB Atlas Account:
- If you don’t have a MongoDB Atlas account, you can sign up at MongoDB Atlas.

2. Create a Cluster:
- Follow the instructions on MongoDB Atlas to create a new cluster.

3. Create a Database and Collection:
- Within your cluster, create a database (e.g., `database_name`) and a collection (e.g., `collection_name`).

4. Add Data:
- Use the MongoDB Atlas web interface or a tool like MongoDB Compass to insert initial data. For example:

5. Update Your `.env` File:
- Ensure your `.env` file includes your MongoDB connection string and database name.

# Running locally
1. Install the commands
    ```bash
    npm run register

    or

    node commands.js
    ```
1. Start the application:
    ```bash
    npm run start 

    or

    node app.js
    ```

2. Your app should be running on http://localhost:3000.