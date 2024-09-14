import "dotenv/config";
import { MongoClient } from 'mongodb';
import { InstallGuildCommands, ClearGuildCommands } from "./utils.js";

// Function to connect to MongoDB
async function connectDB() {
  const uri = process.env.MONGO_URI;
  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log("Connected to MongoDB");
    return client.db(process.env.MONGO_DB);
  } catch (error) { 
    console.error("Error connecting to MongoDB:", error);
  }
}

// Function to fetch MongoDB commands and install globally
async function installCommandsFromDB(serverId) {
  const db = await connectDB();
  const collection = db.collection(serverId);
  
  try {
    const serverData = await collection.findOne({ serverID: serverId });
    
    if (serverData && serverData.commands) {
      const commands = serverData.commands;
      await InstallGuildCommands(process.env.APP_ID, process.env.GUILD_ID, commands);
      console.log("Commands installed successfully for server:", serverId);
    } else {
      console.log("No commands found for server:", serverId);
    }
  } catch (error) {
    console.error("Error installing commands from DB: ", error);
  }
}

// Delete guild's commands from a specified guild
await ClearGuildCommands(process.env.APP_ID, process.env.GUILD_ID);

// Insert the commands of the document in the collection database to the discord guild 
await installCommandsFromDB(process.env.GUILD_ID)
  .then(() => {
    console.log("Command installation process completed")
  })
  .catch(console.error);