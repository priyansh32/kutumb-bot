import { Command } from "../../interfaces";

export const command: Command = {
  name: "ping",
  description: "Ping the bot",
  usage: "pinging the bot",
  aliases: ["pong"],
  run: async (client, message, args) => {
    const m = await message.channel.send("Pinging...");
    m.edit(
      `Pong! Latency is ${
        m.createdTimestamp - message.createdTimestamp
      }ms. API Latency is ${Math.round(client.ws.ping)}ms`
    );
  },
};
