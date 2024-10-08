import 'dotenv/config';

// Function to handle request to Discord API
export async function DiscordRequest(endpoint, options) {
  // append endpoint to root API URL
  const url = 'https://discord.com/api/v10/' + endpoint;
  // Stringify payloads
  if (options.body) options.body = JSON.stringify(options.body);
  // Use fetch to make requests
  const res = await fetch(url, {
    headers: {
      'Authorization': `Bot ${process.env.DISCORD_TOKEN}`,
      'Content-Type': 'application/json; charset=UTF-8',
      'User-Agent': 'DiscordBotWKnockOut (https://github.com/WKO8/discord-bot-wknockout, 1.0.0)',
    },
    ...options
  });
  // throw API errors
  if (!res.ok) {
    const data = await res.json();
    console.log(res.status);
    throw new Error(JSON.stringify(data));
  }
  // return original response
  return res;
}

export async function InstallGlobalCommands(appId, commands) {
  // API endpoint to overwrite global commands
  const endpoint = `applications/${appId}/commands`;

  try {
    // This is calling the bulk overwrite endpoint: https://discord.com/developers/docs/interactions/application-commands#bulk-overwrite-global-application-commands
    await DiscordRequest(endpoint, { method: 'PUT', body: commands });
  } catch (err) {
    console.error(err);
  }
}

// Function to install guild-specific commands
export async function InstallGuildCommands(appId, guildId, commands) {
  // API endpoint to overwrite guild commands
  const endpoint = `applications/${appId}/guilds/${guildId}/commands`;

  try {
    // Bulk overwrite guild-specific commands
    await DiscordRequest(endpoint, { method: 'PUT', body: commands });
  } catch (err) {
    console.error(err);
  }
}

// Função para limpar (remover) os comandos globais
export async function ClearGlobalCommands(appId) {
  // Endpoint para sobrescrever os comandos globais
  const endpoint = `applications/${appId}/commands`;

  try {
    // Sobrescrever comandos globais com um array vazio para limpá-los
    await DiscordRequest(endpoint, { method: 'PUT', body: [] });
    console.log('Comandos globais removidos com sucesso!');
  } catch (err) {
    console.error('Erro ao remover comandos globais:', err);
  }
}

export async function ClearGuildCommands(appId, guildId) {
  // Endpoint para sobrescrever os comandos globais
  const endpoint = `applications/${appId}/guilds/${guildId}/commands`;

  try {
    // Sobrescrever comandos globais com um array vazio para limpá-los
    await DiscordRequest(endpoint, { method: 'PUT', body: [] });
    console.log('Comandos de guilda removidos com sucesso!');
  } catch (err) {
    console.error('Erro ao remover os comandos da guilda:', err);
  } 
}

export async function GetGuildInfo(guildId) {
  const endpoint = `guilds/${guildId}`; // Discord API endpoint to get guild info
  
  try {
    const res = await DiscordRequest(endpoint, { method: 'GET' });
    const guildInfo = await res.json(); // Parse the JSON response to get the guild info
    return guildInfo; // Return the guild info object
  } catch (err) {
    console.error('Erro ao obter informações da guilda:', err);
    throw err;
  }
}

// Function to get all roles from a specific guild
export async function GetGuildRoles(guildId) {
  const endpoint = `guilds/${guildId}/roles`; // Discord API endpoint to get roles
  
  try {
    const res = await DiscordRequest(endpoint, { method: 'GET' });
    const roles = await res.json(); // Parse the JSON response to get the roles
    return roles; // Return the roles array
  } catch (err) {
    console.error('Erro ao obter cargos da guilda:', err);
    throw err;
  }
}

// Function to map role IDs to role names for a specific guild
export async function GetRoleNamesForMember(guildId, memberRoles) {
  try {
    // Get all roles from the guild
    const roles = await GetGuildRoles(guildId);
    
    // Create a map of role IDs to role names
    const roleMap = {};
    roles.forEach(role => {
      roleMap[role.id] = role.name;
    });
    
    // Map member's role IDs to their names
    const roleNames = memberRoles.map(roleId => roleMap[roleId] || 'Cargo desconhecido');
    
    return roleNames; // Return array of role names
  } catch (err) {
    console.error('Erro ao mapear cargos:', err);
    throw err;
  }
}

// Function to send a message to a specific channel
export async function SendMessageToChannel(channelId, messageContent) {
  const endpoint = `channels/${channelId}/messages`;

  try {
    // Make the API request to send the message
    const res = await DiscordRequest(endpoint, {
      method: 'POST',
      body: {
        content: messageContent.content,
        embeds: messageContent.embeds, // The message you want to send
        components: messageContent.components, 
      },
    });

    // Parse and return the response
    const data = await res.json();

    return data;
  } catch (err) {
    console.error('Error sending message to channel:', err);
    throw err;
  }
}

// Function to send a message when a ticket is opened 
export async function SendTicketOpenedMessage(guildName, channelId, userId) {
  const message = {
    content: `||<@${userId}>||`,
    embeds: [
      {
        title: `${guildName}`,
        description: "**Ticket Aberto, envie as informações necessárias neste canal.**\n\nClique no botão abaixo para fechar o **Ticket**.",
        color: 0xff0000, // Cor da borda do embed (em hexadecimal)
      }
    ],
    components: [
          {
              "type": 1,
              "components": [
                  {
                      "type": 2,
                      "label": "Fechar ticket",
                      "style":4,
                      "custom_id": "close_ticket"
                  }
              ]
  
          }
      ]
  }

  SendMessageToChannel(channelId, message);
}

// Function to get all text channels in the guild
export async function GetChannelsInGuild(guildId) {
  const endpoint = `guilds/${guildId}/channels`;

  try {
    const res = await DiscordRequest(endpoint, { method: 'GET' });
    const channels = await res.json();

    return channels;
  } catch (err) {
    console.error('Error fetching channels:', err);
    throw err;
  }
}

// Function to get specific channel
export async function GetSpecificChannel(guildId, channelName) {
  try {
    const channels = await GetChannelsInGuild(guildId);

    // Ensure channels is an array
    if (!Array.isArray(channels)) {
      throw new Error('Expected channels to be an array');
    }

    // Check if the channel exists using find
    const channel = channels.find(c => c.name === channelName);
    return channel;
  } catch (err) {
    console.error('Error checking if channel exists:', err);
    throw err;
  }
}

// Function to create a new text channel in the guild
export async function CreateTextChannel(guildId, channelName, userId, modRoleId, categoryId) {
  const endpoint = `guilds/${guildId}/channels`;

  try {
    const res = await DiscordRequest(endpoint, {
      method: 'POST',
      body: {
        name: channelName,
        parent_id: categoryId,
        type: 0, // 0 for text channels 
        permission_overwrites: [
          {
            id: userId,
            type: 1, 
            allow: 0x400, // View Channel
            deny: 0x040,
          },
          {
            id: modRoleId,
            type: 0, 
            allow: 0x400, // View Channel
            deny: 0,
          },
          {
            id: guildId,
            type: 0, 
            allow: 0, 
            deny: 0x400, // View Channel
          }
        ], // Array of permission overwrites
      },
    });
    // Retornar a resposta da API
    const data = await res.json();
    return data;
  } catch (err) {
    console.error('Error creating text channel:', err);
    throw err;
  }
}

export async function CloseTextChannel(channelId) {
  const endpoint = `/channels/${channelId}`;

  try {
    const res = await DiscordRequest(endpoint, {
      method: 'DELETE'
    });
    // Retornar a resposta da API
    const result = await res.json();
    return result;
  } catch (err) {
    console.error('Error creating text channel:', err);
    throw err;
  }
}

export async function SendRegisterModal(interactionId, interactionToken, message) {
  const endpoint = `interactions/${interactionId}/${interactionToken}/callback`;

  try {
    const res = await DiscordRequest(endpoint, {
      method: 'POST',
      body: {
        type: 9, // Modal type
        data: message
      }
    });
    // Retornar a resposta da API
    return res;
  } catch (err) {
    console.error('Error giving role to member:', err);
    throw err;
  }
}

export async function GiveRoleToMember(guildId, userId, roleId) {
  const endpoint = `guilds/${guildId}/members/${userId}/roles/${roleId}`;

  try {
    const res = await DiscordRequest(endpoint, {
      method: 'PUT'
    });
    // Retornar a resposta da API
    return res;
  } catch (err) {
    console.error('Error giving role to member:', err);
    throw err;
  }
}


export async function ChangeUserNickname(guildId, userId, newNickname) {
  const endpoint = `guilds/${guildId}/members/${userId}`;

  try {
    const res = await DiscordRequest(endpoint, {
      method: 'PATCH',
      body: {
        nick: newNickname
      }
    });
    // Retornar a resposta da API
    return res;
  } catch (err) {
    console.error('Error giving role to member:', err);
    throw err;
  }
}

export function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
