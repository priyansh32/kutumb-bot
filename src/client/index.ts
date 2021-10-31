import { Client, Collection } from "discord.js";
import * as path from "path";
import { readdirSync } from "fs";
import { Command, Event, Config } from "../interfaces";
import { connect } from "mongoose";

class ExtendedClient extends Client {
  public commands = new Collection();
  public events = new Collection();
  public config: Config = {
    token: process.env.TOKEN,
    mongoURI: process.env.MONGO_URI,
    prefix: "!",
  };
  public aliases: Collection<string, Command> = new Collection();

  public async init() {
    this.login(this.config.token);
    connect(this.config.mongoURI, {});

    // Load commands
    const commandPath = path.join(__dirname, "..", "commands");
    readdirSync(commandPath).forEach(async (dir) => {
      const commands = readdirSync(path.join(commandPath, dir)).filter((file) =>
        file.endsWith(".ts")
      );

      for (const file of commands) {
        const command = await import(path.join(commandPath, dir, file));
        this.commands.set(command.name, command);

        if (command?.aliases?.length > 0) {
          command.aliases.forEach((alias) => this.aliases.set(alias, command));
        }
      }
    });

    // Load events
    const eventPath = path.join(__dirname, "..", "events");
    readdirSync(eventPath).forEach(async (dir) => {
      const { event } = await import(path.join(eventPath, dir));
      this.events.set(event.name, event);
      console.log(`Loaded event: ${event.name}`);
      this.on(event.name, event.run.bind(null, this));
    });
  }
}
export default ExtendedClient;
