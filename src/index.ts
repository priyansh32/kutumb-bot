import { Intents } from 'discord.js';
import Client from './client';

new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
}).init();
