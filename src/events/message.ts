import { Event, Command } from "../interfaces";
import { Message } from "discord.js";

export const event: Event = {
  name: "messageCreate",
  run: async (client, message: Message) => {
    console.log(message.content);
    if (message.author.bot || !message.content.startsWith(client.config.prefix))
      return;
    const args = message.content
      .slice(client.config.prefix.length)
      .trim()
      .split(/ +/g);

    const cmd = args.shift()!.toLowerCase();
    if (!cmd) return;
    const command = client.commands.get(cmd) || client.aliases.get(cmd);
    if (command) (command as Command).run(client, message, args);
  },
};
