import { SlashCommandBuilder } from '@discordjs/builders';
import {
  Interaction,
  MessageEmbed,
  MessageReaction,
  ReactionCollector,
} from 'discord.js';
import Client from '../../client';

async function execute(client: Client, interaction: Interaction, args) {
  if (!interaction.isCommand()) return;
  //   interaction.reply("Plis wait bhai, abhi kaam krrha hu");
  //   const ideaChannel = client.channels.cache.get(
  //     "903303063446646785"
  //   ) as Channel;

  const ideaEmbed = new MessageEmbed()
    .setColor('#0099ff')
    .setTitle(interaction.options.get('title').value as string)
    .setURL('https://discord.js.org/')
    .setAuthor(interaction.user.username, interaction.user.avatarURL())
    .setDescription(interaction.options.get('description').value as string)
    .addFields(
      {
        name: 'Upvotes',
        value: '0',
        inline: true,
      },
      {
        name: 'Downvotes',
        value: '0',
        inline: true,
      },
      {
        name: 'Thread',
        value: '<#905524055543795722>',
        inline: true,
      },
    )
    .setTimestamp()
    .setFooter(
      'Idea by ' + interaction.user.username,
      interaction.user.avatarURL(),
    );

  await interaction.reply('Idea has been successfully submitted');
  const ideaMessage = await interaction.channel.send({ embeds: [ideaEmbed] });
  await ideaMessage.react('👍');
  await ideaMessage.react('👎');

  new ReactionCollector(ideaMessage)
    .on('collect', (reaction: MessageReaction, user) => {
      //ignores bot reactions
      if (user.bot) return;

      if (
        user.id === interaction.user.id ||
        reaction.users.cache.has(user.id) ||
        !['👍', '👎'].includes(reaction.emoji.name)
      ) {
        reaction.users.remove(user);
        return;
      }

      if (reaction.emoji.name === '👍') {
        ideaEmbed.fields[0].value = (
          parseInt(ideaEmbed.fields[0].value) + 1
        ).toString();
      }
      if (reaction.emoji.name === '👎') {
        ideaEmbed.fields[1].value = (
          parseInt(ideaEmbed.fields[1].value) + 1
        ).toString();
      }
      ideaMessage.edit({ embeds: [ideaEmbed] });
    })
    .on('remove', (reaction, user) => {
      if (user.bot) return;
      if (user.id === interaction.user.id) return;
      if (reaction.emoji.name === '👍') {
        ideaEmbed.fields[0].value = (
          parseInt(ideaEmbed.fields[0].value) - 1
        ).toString();
      }
      if (reaction.emoji.name === '👎') {
        ideaEmbed.fields[1].value = (
          parseInt(ideaEmbed.fields[1].value) - 1
        ).toString();
      }
      ideaMessage.edit({ embeds: [ideaEmbed] });
    })
    .on('end', (collected) => {
      console.log(`Collected ${collected.size} items`);
    });
}

export default {
  data: new SlashCommandBuilder()
    .setName('idea')
    .addStringOption((option) =>
      option
        .setName('title')
        .setDescription('short title for the idea')
        .setRequired(true),
    )
    .addStringOption((option) =>
      option
        .setName('description')
        .setDescription('description of the idea')
        .setRequired(true),
    )
    .setDescription('Creates a thread for a idea'),
  execute,
};
