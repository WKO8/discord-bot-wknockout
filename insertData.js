import { MongoClient } from 'mongodb';
import 'dotenv/config';

const uri = process.env.MONGO_URI;  // Add your connection URI in the .env filemong
const client = new MongoClient(uri);

async function connectDB() {
  try {
    await client.connect();
    console.log('Connected to MongoDB');
    return client.db(process.env.MONGO_DB);   // Replace with your database name
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
}

async function insertData() {
  const db = await connectDB();
  const collection = db.collection(process.env.GUILD_ID);   // Collection name

  const serverData = {
    serverID: process.env.GUILD_ID,
    commands: [
      {
        name: "folhas_de_coca",
        description: "Controle de folhas de coca",
        options: [
          {
            type: 3,
            name: "acao",
            description: "Escolha o que deseja fazer",
            required: true,
            choices: [
              { name: "adicionar", value: "add" },
              { name: "retirar", value: "sub" },
              { name: "atualizar", value: "update" },
              { name: "total", value: "total" },
            ],
          },
          {
            type: 4,
            name: "quantidade",
            description: "Insira a quantidade de folhas de coca",
            required: true,
          },
        ],
      },
      {
        name: "cocainas_prontas",
        description: "Controle de cocaínas prontas",
        options: [
          {
            type: 3,
            name: "acao",
            description: "Escolha o que deseja fazer",
            required: true,
            choices: [
              { name: "adicionar", value: "add" },
              { name: "retirar", value: "sub" },
              { name: "atualizar", value: "update" },
              { name: "total", value: "total" },
            ],
          },
          {
            type: 4,
            name: "quantidade",
            description: "Insira a quantidade de cocaínas prontas",
            required: true,
          },
        ],
      },
      {
        name: "lockpicks",
        description: "Controle de lockpicks",
        options: [
          {
            type: 3,
            name: "acao",
            description: "Escolha o que deseja fazer",
            required: true,
            choices: [
              { name: "adicionar", value: "add" },
              { name: "retirar", value: "sub" },
              { name: "atualizar", value: "update" },
              { name: "total", value: "total" },
            ],
          },
          {
            type: 4,
            name: "quantidade",
            description: "Insira a quantidade de lockpicks",
            required: true,
          },
        ],
      },
      {
        name: "bandagens",
        description: "Controle de bandagens",
        options: [
          {
            type: 3,
            name: "acao",
            description: "Escolha o que deseja fazer",
            required: true,
            choices: [
              { name: "adicionar", value: "add" },
              { name: "retirar", value: "sub" },
              { name: "atualizar", value: "update" },
              { name: "total", value: "total" },
            ],
          },
          {
            type: 4,
            name: "quantidade",
            description: "Insira a quantidade de bandagens",
            required: true,
          },
        ],
      },
      {
        name: "dinheiro_sujo",
        description: "Controle de dinheiro_sujo",
        options: [
          {
            type: 3,
            name: "acao",
            description: "Escolha o que deseja fazer",
            required: true,
            choices: [
              { name: "adicionar", value: "add" },
              { name: "retirar", value: "sub" },
              { name: "atualizar", value: "update" },
              { name: "total", value: "total" },
            ],
          },
          {
            type: 4,
            name: "quantidade",
            description: "Insira a quantidade de dinheiro_sujo",
            required: true,
          },
        ],
      },
      {
        name: "dinheiro_limpo",
        description: "Controle de dinheiro_limpo",
        options: [
          {
            type: 3,
            name: "acao",
            description: "Escolha o que deseja fazer",
            required: true,
            choices: [
              { name: "adicionar", value: "add" },
              { name: "retirar", value: "sub" },
              { name: "atualizar", value: "update" },
              { name: "total", value: "total" },
            ],
          },
          {
            type: 4,
            name: "quantidade",
            description: "Insira a quantidade de dinheiro_limpo",
            required: true,
          },
        ],
      },
      {
        name: "mesas_de_droga",
        description: "Controle de mesas_de_droga",
        options: [
          {
            type: 3,
            name: "acao",
            description: "Escolha o que deseja fazer",
            required: true,
            choices: [
              { name: "adicionar", value: "add" },
              { name: "retirar", value: "sub" },
              { name: "atualizar", value: "update" },
              { name: "total", value: "total" },
            ],
          },
          {
            type: 4,
            name: "quantidade",
            description: "Insira a quantidade de mesas_de_droga",
            required: true,
          },
        ],
      },
      {
        name: "mostrar_todos",
        description: "Mostrar todos os itens e suas respectivas quantidades",
        options: []
      }
    ],
    data: {
      folhas_de_coca: 0,
      cocainas_prontas: 0,
      lockpicks: 0,
      bandagens: 0,
      dinheiro_sujo: 0,
      dinheiro_limpo: 0,
      mesas_de_droga: 0,
    },
    mods: [process.env.USER_MOD_ID],
  };

  try {
    const result = await collection.insertOne(serverData);
    console.log(`Data inserted with _id: ${result.insertedId}`);
  } catch (error) {
    console.error('Error inserting data:', error);
  } finally {
    await client.close();
  }
}

insertData();
