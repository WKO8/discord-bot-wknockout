// library to connect to MongoDB
import { MongoClient } from 'mongodb';

const uri = process.env.MONGO_URI; // Add your connection URI in the .env file
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

let db;

// Function to connect to MongoDB
async function connectDB() {
  if (!db) {
    try {
      await client.connect();
      console.log('Connected to MongoDB');
      db = client.db(process.env.MONGO_DB); // Replace with your database name
    } catch (error) {
      console.error('Error connecting to MongoDB:', error);
    }
  }
  return db;
}

// DB functions
export async function getCommandList(serverId) {
  await connectDB(); // Ensure connection is established
  let commandsList = [];

  try {
    const collection = db.collection(serverId); // Collection name
    const serverData = await collection.findOne({ serverID: serverId });

    if (serverData && serverData.commands) {
      commandsList = serverData.commands;
    }
  } catch (error) {
    console.error('Error fetching commands:', error);
  }

  return commandsList;
}

export async function incrementItem(serverId, item, increment) {
  await connectDB(); // Ensure connection is established

  try {
    const collection = db.collection(serverId); // Collection name
    const existingDocument = await collection.findOne({ serverID: serverId });

    if (!existingDocument) return null;

    const result = await collection.updateOne(
      { serverID: serverId }, // Filter to find the correct document
      { $inc: { [`data.${item}`]: increment } } // Function to increment the value
    );
    
    console.log(`${result.matchedCount} document(s) matched the filter, ${result.modifiedCount} document(s) updated`);
    
    if (result.matchedCount === 0) {
      console.log('No document matched the filter');
    }
  } catch (error) {
    console.error('Error incrementing item:', error);
  }
}

export async function decrementItem(serverId, item, decrement) {
  await connectDB(); // Ensure connection is established

  try {
    const collection = db.collection(serverId); // Collection name
    const existingDocument = await collection.findOne({ serverID: serverId });

    if (!existingDocument) return null;

    const result = await collection.updateOne(
      { serverID: serverId }, // Filter to find the correct document
      { $inc: { [`data.${item}`]: -decrement } } // Function to decrement the value
    );
    
    console.log(`${result.matchedCount} document(s) matched the filter, ${result.modifiedCount} document(s) updated`);
    
    if (result.matchedCount === 0) {
      console.log('No document matched the filter');
    }
  } catch (error) {
    console.error('Error decrementing item:', error);
  }
}

export async function setItem(serverId, item, value) {
  await connectDB(); // Ensure connection is established

  try {
    const collection = db.collection(serverId); // Collection name
    const existingDocument = await collection.findOne({ serverID: serverId });

    if (!existingDocument) return null;

    const result = await collection.updateOne(
      { serverID: serverId }, // Filter to find the correct document
      { $set: { [`data.${item}`]: value } } // Function to set the value
    );
    
    console.log(`${result.matchedCount} document(s) matched the filter, ${result.modifiedCount} document(s) updated`);
    
    if (result.matchedCount === 0) {
      console.log('No document matched the filter');
    }
  } catch (error) {
    console.error('Error setting item:', error);
  }
}

export async function getItem(serverId, item) {
  await connectDB(); // Ensure connection is established

  try {
    const collection = db.collection(serverId); // Collection name
    const existingDocument = await collection.findOne({ serverID: serverId });
    
    if (!existingDocument) return null;
    
    return existingDocument.data[item];

  } catch (error) {
    console.error('Error getting item:', error);
  }

  return 0;
}

export async function getAllItems(serverId) {
  await connectDB(); // Ensure connection is established

  try {
    const collection = db.collection(serverId); // Collection name
    const existingDocument = await collection.findOne({ serverID: serverId });
    
    if (!existingDocument) return null;
    
    return existingDocument;
    
  } catch (error) {
    console.error('Error getting all items:', error);
  }
}
