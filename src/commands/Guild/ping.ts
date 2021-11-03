// import { Command } from "../../interfaces";
import { SlashCommandBuilder } from '@discordjs/builders';
import { Interaction } from 'discord.js';

async function execute(client, interaction: Interaction, args) {
  if (!interaction.isCommand()) return;
  await interaction.reply({ content: 'Pinging' });
  const m = await interaction.channel.send('...');
  m.edit(
    `Pong! Latency is ${
      m.createdTimestamp - interaction.createdTimestamp
    }ms. API Latency is ${Math.round(client.ws.ping)}ms`,
  );
  interaction.editReply('Done');
}

export default {
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('pings the API'),
  execute,
};
