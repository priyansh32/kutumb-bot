import Client from "../client";
import { Message } from "discord.js";
import { SlashCommandBuilder } from "@discordjs/builders";

export interface Command {
  data: SlashCommandBuilder;
  execute;
}
