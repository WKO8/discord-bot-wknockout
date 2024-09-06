import 'dotenv/config';

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

export function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
