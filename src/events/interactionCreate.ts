import { Interaction } from 'discord.js';
import { Event, Command } from '../interfaces';

export const event: Event = {
  name: 'interactionCreate',
  run: async (client, interaction: Interaction) => {
    if (interaction.isCommand()) {
      const command = client.commands.get(interaction.commandName);
      if (!command) return;

      try {
        await (command as Command).execute(client, interaction);
      } catch (error) {
        console.error(error);
        await interaction.reply({
          content: 'There was an error while executing this command!',
          ephemeral: true,
        });
      }
    }
  },
};
