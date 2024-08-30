import 'dotenv/config';
import express from 'express';
import {
  InteractionType,
  InteractionResponseType,
  verifyKeyMiddleware,
} from 'discord-interactions';

// library to read and write files
import { promises as fs } from 'fs';

// Create an express app
const app = express();
// Get port, or default to 3000
const PORT = process.env.PORT || 3000;

// Load json data 
async function loadData() {
  const empty_data = {
    "data": {
      "folhas_de_coca": 0,
      "cocaina_pronta": 0,
      "lockpick": 0,
      "bandagem": 0,
      "dinheiro_sujo": 0,
      "dinheiro_limpo": 0,
      "mesa_de_droga": 0
    },
    "mods": ["444639884150308864"]
  }
  try {
    // Check if the file exists
    if (!fsSync.existsSync('data.json')) {
      // If the file doesn't exist, create it with an empty object
      await fs.writeFile('data.json', JSON.stringify(empty_data), 'utf8');
      console.log('data.json file created');
    }
    const data = await fs.readFile('data.json', 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading data file:', error);
    return {};
  }
}

// Write json data 
async function saveData(data) {
  try {
    await fs.writeFile('data.json', JSON.stringify(data));
  } catch (error) {
    console.error('Error writing data file:', error);
  }
}

/**
 * Interactions endpoint URL where Discord will send HTTP requests
 * Parse request body and verifies incoming requests using discord-interactions package
 */
app.post('/interactions', verifyKeyMiddleware(process.env.PUBLIC_KEY), async function (req, res) {
  // Interaction type and data
  const { type, member, data } = req.body;

  /**
   * Handle verification requests
   */
  if (type === InteractionType.PING) {
    return res.send({ type: InteractionResponseType.PONG });
  }

  /**
   * Handle slash command requests
   * See https://discord.com/developers/docs/interactions/application-commands#slash-commands
   */
  if (type === InteractionType.APPLICATION_COMMAND) {
    const { name } = data;

    const actionSelected = data.options[0].value;
    const amount = data.options[1] ? data.options[1].value : 0;
    const userID = member.user.id
    let jsonData = await loadData();
    const userIsMod = jsonData.mods.includes(userID)

    // "folha_de_coca" command
    if (name === 'folhas_de_coca') {
      switch (actionSelected) {
        case 'add':
          jsonData.data.folhas_de_coca += amount;
          saveData(jsonData);

          return res.send({
            type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
            data: {
              content: `Adicionada(s) ${amount} folha(s) de coca.`,
            },
          });
        case 'sub':
          jsonData.data.folhas_de_coca -= amount;
          saveData(jsonData);

          return res.send({
            type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
            data: {
              content: `Retirada(s) ${amount} folha(s) de coca.`,
            },
          });
        case 'update':
          if (!userIsMod) {
            return res.send({
              type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
              data: {
                content: 'Você não tem permissão para fazer isso.',
              },
            });
          }

          jsonData.data.folhas_de_coca = amount;
          saveData(jsonData);

          return res.send({
            type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
            data: {
              content: `Atualizada a quantidade de folhas de coca para ${amount}.`,
            },
          });
        case 'total':
          const total = jsonData.data.folhas_de_coca

          return res.send({
            type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
            data: {
              content: `O número total de folhas de coca é ${total}!`,
            },
          });
        default:
          return res.send({
            type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
            data: {
              content: 'Ação inválida! Por favor, escolha entre "adicionar", "retirar", "atualizar", ou "total".',
            },
          });
      }
    }

    // "cocaina_pronta" command
    if (name === 'cocaina_pronta') {
      switch (actionSelected) {
        case 'add':
          jsonData.data.cocaina_pronta += amount;
          saveData(jsonData);

          return res.send({
            type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
            data: {
              content: `Adicionada(s) ${amount} cocaína(s) pronta(s).`,
            },
          });
        case 'sub':
          jsonData.data.cocaina_pronta -= amount;
          saveData(jsonData);

          return res.send({
            type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
            data: {
              content: `Retirada(s) ${amount} cocaína(s) pronta(s).`,
            },
          });
        case 'update':
          if (!userIsMod) {
            return res.send({
              type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
              data: {
                content: 'Você não tem permissão para fazer isso.',
              },
            });
          }

          jsonData.data.cocaina_pronta = amount;
          saveData(jsonData);

          return res.send({
            type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
            data: {
              content: `Atualizada a quantidade de cocaínas prontas para ${amount}.`,
            },
          });
        case 'total':
          const total = jsonData.data.cocaina_pronta

          return res.send({
            type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
            data: {
              content: `O número total de cocaínas prontas é ${total}!`,
            },
          });
        default:
          return res.send({
            type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
            data: {
              content: 'Ação inválida! Por favor, escolha entre "adicionar", "retirar", "atualizar", ou "total".',
            },
          });
      }
    }

    // "lockpick" command
    if (name === 'lockpick') {
      switch (actionSelected) {
        case 'add':
          jsonData.data.lockpick += amount;
          saveData(jsonData);

          return res.send({
            type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
            data: {
              content: `Adicionada(s) ${amount} lockpick(s).`,
            },
          });
        case 'sub':
          jsonData.data.lockpick -= amount;
          saveData(jsonData);

          return res.send({
            type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
            data: {
              content: `Retirada(s) ${amount} lockpick(s).`,
            },
          });
        case 'update':
          if (!userIsMod) {
            return res.send({
              type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
              data: {
                content: 'Você não tem permissão para fazer isso.',
              },
            });
          }

          jsonData.data.lockpick = amount;
          saveData(jsonData);

          return res.send({
            type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
            data: {
              content: `Atualizada a quantidade de lockpicks para ${amount}.`,
            },
          });
        case 'total':
          const total = jsonData.data.lockpick

          return res.send({
            type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
            data: {
              content: `O número total de lockpicks é ${total}!`,
            },
          });
        default:
          return res.send({
            type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
            data: {
              content: 'Ação inválida! Por favor, escolha entre "adicionar", "retirar", "atualizar", ou "total".',
            },
          });
      }
    }

    // "bandagem" command
    if (name === 'bandagem') {
      switch (actionSelected) {
        case 'add':
          jsonData.data.bandagem += amount;
          saveData(jsonData);

          return res.send({
            type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
            data: {
              content: `Adicionada(s) ${amount} bandagem(ns).`,
            },
          });
        case 'sub':
          jsonData.data.bandagem -= amount;
          saveData(jsonData);

          return res.send({
            type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
            data: {
              content: `Retirada(s) ${amount} bandagem(ns).`,
            },
          });
        case 'update':
          if (!userIsMod) {
            return res.send({
              type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
              data: {
                content: 'Você não tem permissão para fazer isso.',
              },
            });
          }

          jsonData.data.bandagem = amount;
          saveData(jsonData);

          return res.send({
            type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
            data: {
              content: `Atualizada a quantidade de bandagens para ${amount}.`,
            },
          });
        case 'total':
          const total = jsonData.data.bandagem

          return res.send({
            type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
            data: {
              content: `O número total de bandagens é ${total}!`,
            },
          });
        default:
          return res.send({
            type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
            data: {
              content: 'Ação inválida! Por favor, escolha entre "adicionar", "retirar", "atualizar", ou "total".',
            },
          });
      }
    }

    // "dinheiro_sujo" command
    if (name === 'dinheiro_sujo') {
      switch (actionSelected) {
        case 'add':
          jsonData.data.dinheiro_sujo += amount;
          saveData(jsonData);

          return res.send({
            type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
            data: {
              content: `Adicionado(s) ${amount} dinheiro sujo.`,
            },
          });
        case 'sub':
          jsonData.data.dinheiro_sujo -= amount;
          saveData(jsonData);

          return res.send({
            type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
            data: {
              content: `Retirado(s) ${amount} dinheiro sujo.`,
            },
          });
        case 'update':
          if (!userIsMod) {
            return res.send({
              type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
              data: {
                content: 'Você não tem permissão para fazer isso.',
              },
            });
          }

          jsonData.data.dinheiro_sujo = amount;
          saveData(jsonData);

          return res.send({
            type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
            data: {
              content: `Atualizada a quantidade de dinheiro sujo para ${amount}.`,
            },
          });
        case 'total':
          const total = jsonData.data.dinheiro_sujo

          return res.send({
            type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
            data: {
              content: `O número total de dinheiro sujo é ${total}!`,
            },
          });
        default:
          return res.send({
            type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
            data: {
              content: 'Ação inválida! Por favor, escolha entre "adicionar", "retirar", "atualizar", ou "total".',
            },
          });
      }
    }

    // "dinheiro_limpo" command
    if (name === 'dinheiro_limpo') {
      switch (actionSelected) {
        case 'add':
          jsonData.data.dinheiro_limpo += amount;
          saveData(jsonData);

          return res.send({
            type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
            data: {
              content: `Adicionado(s) ${amount} dinheiro limpo.`,
            },
          });
        case 'sub':
          jsonData.data.dinheiro_limpo -= amount;
          saveData(jsonData);

          return res.send({
            type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
            data: {
              content: `Retirado(s) ${amount} dinheiro limpo.`,
            },
          });
        case 'update':
          if (!userIsMod) {
            return res.send({
              type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
              data: {
                content: 'Você não tem permissão para fazer isso.',
              },
            });
          }

          jsonData.data.dinheiro_limpo = amount;
          saveData(jsonData);

          return res.send({
            type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
            data: {
              content: `Atualizada a quantidade de dinheiro limpo para ${amount}.`,
            },
          });
        case 'total':
          const total = jsonData.data.dinheiro_limpo

          return res.send({
            type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
            data: {
              content: `O número total de dinheiro limpo é ${total}!`,
            },
          });
        default:
          return res.send({
            type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
            data: {
              content: 'Ação inválida! Por favor, escolha entre "adicionar", "retirar", "atualizar", ou "total".',
            },
          });
      }
    }

    // "mesa_de_droga" command
    if (name === 'mesa_de_droga') {
      switch (actionSelected) {
        case 'add':
          jsonData.data.mesa_de_droga += amount;
          saveData(jsonData);

          return res.send({
            type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
            data: {
              content: `Adicionada(s) ${amount} mesa(s) de droga.`,
            },
          });
        case 'sub':
          jsonData.data.mesa_de_droga -= amount;
          saveData(jsonData);

          return res.send({
            type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
            data: {
              content: `Retirada(s) ${amount} mesas(s) de droga.`,
            },
          });
        case 'update':
          if (!userIsMod) {
            return res.send({
              type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
              data: {
                content: 'Você não tem permissão para fazer isso.',
              },
            });
          }

          jsonData.data.mesa_de_droga = amount;
          saveData(jsonData);

          return res.send({
            type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
            data: {
              content: `Atualizada a quantidade de mesas de droga para ${amount}.`,
            },
          });
        case 'total':
          const total = jsonData.data.mesa_de_droga

          return res.send({
            type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
            data: {
              content: `O número total de mesas de droga é ${total}!`,
            },
          });
        default:
          return res.send({
            type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
            data: {
              content: 'Ação inválida! Por favor, escolha entre "adicionar", "retirar", "atualizar", ou "total".',
            },
          });
      }
    }

    console.error(`unknown command: ${name}`);
    return res.status(400).json({ error: 'unknown command' });
  }

  console.error('unknown interaction type', type);
  return res.status(400).json({ error: 'unknown interaction type' });
});

app.listen(PORT, () => {
  console.log('Listening on port', PORT);
});
