import 'dotenv/config';
import express from 'express';
import {
  InteractionType,
  InteractionResponseType,
  verifyKeyMiddleware,
} from 'discord-interactions';

// library to read and write files
import { getAllItems, incrementItem, decrementItem, setItem, getItem, getCommandList } from './db.js';

// Create an express app
const app = express();
// Get port, or default to 3000
const PORT = process.env.PORT || 3000;

/**
 * Interactions endpoint URL where Discord will send HTTP requests
 * Parse request body and verifies incoming requests using discord-interactions package
 */
app.post('/interactions', verifyKeyMiddleware(process.env.PUBLIC_KEY), async function (req, res) {
  // Interaction type and data
  const { type, member, data, guild_id } = req.body;

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

    const actionSelected = data.options ? data.options[0].value : 'total';
    const amount = data.options ? data.options[1].value : 0;
    const userID = member.user.id
    const guildID = guild_id.toString();
    let allData = await getAllItems(guildID);
    const userIsMod = allData.mods.includes(userID);
    const commandsList = await getCommandList(guildID);

    // "mostrar_todos" specific command
    if (name === 'mostrar_todos') {
      let message = `\`\`\`
        ITENS                   | QUANTIDADE
      ----------------------------------------`;

      commandsList.forEach(item => {
        if (allData.data[item.name] !== undefined) {
          // Format the item name
          let itemFormatted = item.name.replace(/_/g, " ");
          itemFormatted = itemFormatted.charAt(0).toUpperCase() + itemFormatted.slice(1);
          
          // Calculate padding
          let itemNamePadded = itemFormatted.padEnd(23, ' ');
          let itemQuantity = allData.data[item.name].toString().padStart(10, ' ');
          
          // Append formatted item to message
          message += `
        ${itemNamePadded} |${itemQuantity}`;
        }
      });

      message += `
      ----------------------------------------\`\`\``;

      return res.send({
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        data: {
          content: message,
        },
      });
    }

    // Check if the command exists in our list of commands
    else if (commandsList.some(cmd => cmd.name === name)) {
      switch (actionSelected) {
        case 'add':
          await incrementItem(guildID, name, amount)
          return res.send({
            type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
            data: {
              content: `Adicionados(as) ${amount} ${name.replace(/_/g, " ")}.\nTotal atualizado: ${allData.data[name] + amount}`,
            },
          });
        case 'sub':
          await decrementItem(guildID, name, amount)
          return res.send({
            type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
            data: {
              content: `Retirado(as) ${amount} ${name.replace(/_/g, " ")}.\nTotal atualizado: ${allData.data[name] - amount}`,
            },
          });
        case 'update':
          if (!userIsMod) {
            return res.send({
              type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
              data: {
                content: 'Você não é digno para fazer isso.',
              },
            });
          }
          await setItem(guildID, name, amount)
          return res.send({
            type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
            data: {
              content: `Atualizada a quantidade de ${name.replace(/_/g, " ")} para ${amount}.`,
            },
          });
        case 'total':
          const total = await getItem(guildID, name)
          return res.send({
            type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
            data: {
              content: `O número total de ${name.replace(/_/g, " ")} é ${total}!`,
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
