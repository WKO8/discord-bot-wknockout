import { MongoClient } from 'mongodb';
import 'dotenv/config';
import { GetGuildInfo, SendMessageToChannel } from './utils.js';

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
        name: "algemas",
        description: "Controle de algemas",
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
            description: "Insira a quantidade de algemas",
            required: true,
          },
        ],
      },
      {
        name: "capuz",
        description: "Controle de capuz",
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
            description: "Insira a quantidade de capuz",
            required: true,
          },
        ],
      },
      {
        name: "kits_de_reparo",
        description: "Controle de kits de reparo",
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
            description: "Insira a quantidade de kits de reparo",
            required: true,
          },
        ],
      },
      {
        name: "micro_ondas",
        description: "Controle de micro-ondas",
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
            description: "Insira a quantidade de micro-ondas",
            required: true,
          },
        ],
      },
      {
        name: "c4",
        description: "Controle de c4",
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
            description: "Insira a quantidade de c4",
            required: true,
          },
        ],
      },
      {
        name: "pistolas_mk2",
        description: "Controle de pistolas MK2",
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
            description: "Insira a quantidade de pistolas MK2",
            required: true,
          },
        ],
      },
      {
        name: "escopetas",
        description: "Controle de escopetas",
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
            description: "Insira a quantidade de escopetas",
            required: true,
          },
        ],
      },
      {
        name: "municoes_pistola_MK2",
        description: "Controle de munições de pistola MK2",
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
            description: "Insira a quantidade de munições de pistola MK2",
            required: true,
          },
        ],
      },
      {
        name: "municoes_escopeta",
        description: "Controle de munições de escopeta",
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
            description: "Insira a quantidade de munições de escopeta",
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
      },
      {
        name: "calcular_porcentagem_farm",
        description: "Calcular a porcentagem de farm de cada membro",
        options: [
          {
            type: 4,
            name: "quantidade",
            description: "Insira o salário total a ser distribuído",
            required: true,
          },
        ],
      },
      {
        name: "reset_farm",
        description: "Zerar o farm de todos os membros",
      }
    ],
    data: {
      folhas_de_coca: 87865,
      cocainas_prontas: 3987,
      lockpicks: 0,
      bandagens: 59,
      algemas: 4,
      capuz: 4,
      kits_de_reparo: 18,
      micro_ondas: 1,
      c4: 13,
      pistolas_mk2: 0,
      escopetas: 0,
      municoes_pistola_MK2: 0,
      municoes_escopeta: 0,
      dinheiro_sujo: 2271688,
      dinheiro_limpo: 152563,
      mesas_de_droga: 0,
    },
    membersFarm: [],
    ticketCategory: "1288898918943293440",
    userRegistrationChannelID: "1290290502939316287",
    roleAfterRegistrationID: "1269680196001206424",
    modRole: "🚀 Gerente",
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

async function updateModRoleAtDatabase(serverId, modRole) {
  const db = await connectDB();
  const collection = db.collection(serverId);

  try {
    const serverData = await collection.findOne({ serverID: serverId });
    
    if (serverData) {
      await collection.updateOne({ serverID: serverId }, { $set: {'modRole': modRole} });
      console.log("Mod role updated successfully.");
    } else {
      console.log("No data found for server:", serverId);
    }
  } catch (error) {
    console.error("Error updating commands from DB: ", error);
  }
  return;
}

// const guildInfo = await GetGuildInfo(process.env.GUILD_ID);

// const message = {
//   embeds: [
//     {
//       title: `${guildInfo.name}`,
//       description: "**Sistema de Registro Automático**\n\nClique no botão abaixo para iniciar seu **Registro**.",
//       color: 0xff0000, // Cor da borda do embed (em hexadecimal)
//     }
//   ],
//   components: [
//         {
//             "type": 1,
//             "components": [
//                 {
//                     "type": 2,
//                     "label": "Registrar",
//                     "style": 1,
//                     "custom_id": "create_register"
//                 }
//             ]

//         }
//     ]
// }

// await SendMessageToChannel('1290290502939316287', message);


// Call the function to send the modal
// SendRegisterModal();



// Update the mod role in the collection's document
// await updateModRoleAtDatabase(process.env.GUILD_ID, "🚀 Gerente");

// Insert the commands to a document in the collection database
insertData();