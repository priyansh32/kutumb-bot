import { SlashCommandBuilder } from '@discordjs/builders';

export interface Command {
  data: SlashCommandBuilder;
  execute;
}
