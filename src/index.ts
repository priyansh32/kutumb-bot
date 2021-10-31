import Client from "./client";
import { Intents } from "discord.js";

new Client({
  intents: [Intents.FLAGS.GUILDS],
}).init();
