import { Client, Collection } from 'discord.js';
import * as path from 'path';
import { readdirSync } from 'fs';
import { connect } from 'mongoose';
import { Command, Config } from '../interfaces';

class ExtendedClient extends Client {
  public commands = new Collection();

  public events = new Collection();

  public config: Config = {
    token: process.env.TOKEN,
    guild: process.env.GUILD_ID,
    clientId: process.env.CLIENT_ID,
    mongoURI: process.env.MONGO_URI,
  };

  public aliases: Collection<string, Command> = new Collection();

  public async init() {
    this.login(this.config.token);
    connect(this.config.mongoURI, {});

    // Load commands
    const commandPath = path.join(__dirname, '..', 'commands');
    readdirSync(commandPath).forEach(async (dir) => {
      const commandFiles = readdirSync(path.join(commandPath, dir)).filter(
        (file) => file.endsWith('.ts'),
      );

      commandFiles.forEach((file) => {
        const command = require(path.join(commandPath, dir, file)).default;
        this.commands.set(command.data.name, command);
      });
    });

    // Load events
    const eventPath = path.join(__dirname, '..', 'events');
    readdirSync(eventPath).forEach(async (file) => {
      const { event } = await import(path.join(eventPath, file));
      this.events.set(event.name, event);
      console.log(`Loaded event: ${event.name}`);
      this.on(event.name, event.run.bind(null, this));
    });
  }
}
export default ExtendedClient;
