import 'dotenv/config';
import express from 'express';
import {
  InteractionType,
  InteractionResponseType,
  verifyKeyMiddleware,
} from 'discord-interactions';

// library to read and write files
import { getAllItems, incrementItem, decrementItem, setItem, getItem, getCommandList } from './db.js';
import { GetGuildInfo, GetRoleNamesForMember, CreateTextChannel, 
  SendMessageToChannel, GetSpecificChannel, SendTicketOpenedMessage, 
  CloseTextChannel, SendRegisterModal, GiveRoleToMember, ChangeUserNickname } from './utils.js';

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
  const { type, member, data, guild_id, channel_id, token, id } = req.body;

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
    const guildID = guild_id.toString();
    let allData = await getAllItems(guildID);
    const commandsList = await getCommandList(guildID);
    const roleNames = await GetRoleNamesForMember(guildID, member.roles);
    const hasModRole = roleNames.includes(allData.modRole);

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
          if (!hasModRole) {
            return res.send({
              type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
              data: {
                content: 'Você não é digno(a) para fazer isso.',
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
              components: [
                    {
                        "type": 1,
                        "components": [
                            {
                                "type": 2,
                                "label": "Click me!",
                                "style": 1,
                                "custom_id": "click_one"
                            }
                        ]
            
                    }
                ]
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

  /**
   * Handle button response interaction
   */
  if (type === InteractionType.MESSAGE_COMPONENT) {
    const { custom_id } = data;
    const interactionID = id;
    const interactionToken = token;
    const guildID = guild_id.toString();
    let allData = await getAllItems(guildID);
    const guildInfo = await GetGuildInfo(guildID);
    const guildRoles = guildInfo.roles;
    const ticketName = `ticket-${member.user.username.replace(/[_\.]/g, '')}`;
    
    if (custom_id == "create_ticket") {
      try {
        const channelData = await GetSpecificChannel(guildID, ticketName)

        if (channelData !== undefined) {
          const message = {
            content: `||<@${member.user.id}>|| Você já possui este ticket aberto, feche-o para abrir outro.`,
            embeds: [],
            components: []
          }
          SendMessageToChannel(channelData.id, message);
          return;
        }
        
        // Find mod role ID
        let modRoleID;
        guildRoles.forEach(role => {
          if (role.name == allData.modRole) modRoleID = role.id
        })

        const response = await CreateTextChannel(guildID, ticketName, member.user.id, modRoleID, allData.ticketCategory);
        await SendTicketOpenedMessage(guildInfo.name, response.id, member.user.id);
        
        return res.send({
          type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
          data: {
            content: `**Ticket criado com sucesso! ➡️ <#${response.id}>**`,
            flags: 1 << 6
          },
        });

      } catch (err) {
        console.error(`Error creating ticket for user ${member.user.username}:`, err);
        return err;
      }
    }

    if (custom_id == "close_ticket") {
      try {
        let modRoleID;
        guildRoles.forEach(role => {
          if (role.name == allData.modRole) modRoleID = role.id
        })

        if (!member.roles.includes(modRoleID)) {
          return res.send({
            type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
            data: {
              content: `||<@${member.user.id}>|| Você não possui permissão para fechar este ticket.`,
              flags: 1 << 6
            },
          })
        }

        const result = await CloseTextChannel(channel_id);
        return result;
      } catch (err) {
        console.error(`Error closing ticket for user ${member.user.username}:`, err);
        return err;
      }
    }

    if (custom_id === "create_register") {
      const modalMessage = {
        title: "Registro - Informações do RP",
        custom_id: "register_modal",
        components: [
          {
            type: 1, // Action Row
            components: [
              {
                type: 4, // Text Input
                custom_id: "name",
                label: "Nome",
                style: 1, // Short text input
                min_length: 1,
                max_length: 100,
                placeholder: "John",
                required: true,
              },
            ],
          },
          {
            type: 1, // Action Row
            components: [
              {
                type: 4, // Text Input
                custom_id: "aka",
                label: "Vulgo",
                style: 1, // Short text input
                min_length: 1,
                max_length: 100,
                placeholder: "Flash",
                required: true,
              },
            ],
          },
          {
            type: 1, // Action Row
            components: [
              {
                type: 4, // Text Input
                custom_id: "passport",
                label: "Passaporte",
                style: 1, // Short text input
                min_length: 1,
                max_length: 7,
                placeholder: "1234",
                required: true,
              },
            ],
          },
          {
            type: 1, // Action Row
            components: [
              {
                type: 4, // Text Input
                custom_id: "phone",
                label: "Telefone",
                style: 1, // Short text input
                min_length: 7,
                max_length: 7,
                placeholder: "123-456",
                required: true,
              },
            ],
          },
        ],
      };
      
      try {
        // Send the modal
        await SendRegisterModal(interactionID, interactionToken, modalMessage);
    
        return res.send({
          type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
          data: {
            content: `**Registro iniciado com sucesso!**`,
            flags: 1 << 6 // Ephemeral message
          },
        });
        
      } catch (err) {
        console.error(`Error sending modal:`, err);
        return res.status(500).send('Internal Server Error');
      }
    }
  }

  /**
   * Handle modal submit interaction
   */
  if (type === InteractionType.MODAL_SUBMIT) {
    const { custom_id } = data;
    const guildID = guild_id.toString();
    let allData = await getAllItems(guildID);

    let userInfo = {
      name: '',
      aka:' ',
      passport: '',
      phone: ''
    }

    if (custom_id === "register_modal") {
      let message = {
        content: `**Registro de: **||<@${member.user.id}>||\n`,
        embeds: [],
        components: [],
      }

      data.components.forEach((actionRow) => {
        actionRow.components.forEach((component) => {
          const dict = {
            name: 'Nome',
            aka: 'Vulgo',
            passport: 'Passaporte',
            phone: 'Telefone'
          }

          if (component.custom_id in dict) userInfo[component.custom_id] = component.value;

          message.content += `\n**${dict[component.custom_id]}:** ${component.value}`;
        })
      })

      message.content += `\n\n=-=-=-=-=-=-=-=-==-=-=-=-=-=-=-=-=\n\n `

      await SendMessageToChannel(allData.userRegistrationChannelID, message);
      await GiveRoleToMember(guildID, member.user.id, allData.roleAfterRegistrationID);
      await ChangeUserNickname(guildID, member.user.id, `${userInfo.aka} - ${userInfo.passport}`);

      return res.send({
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        data: {
          content: "**Registro realizado com sucesso!**",
          flags: 1 << 6 // Ephemeral message
        },
      })
    }
  }

  console.error('unknown interaction type', type);
  return res.status(400).json({ error: 'unknown interaction type' });
});

app.listen(PORT, () => {
  console.log('Listening on port', PORT);
});
