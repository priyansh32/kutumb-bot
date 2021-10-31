import Client from "./client";
import { Intents } from "discord.js";

new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
}).init();
