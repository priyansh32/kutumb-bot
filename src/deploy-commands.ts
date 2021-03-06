import { readdirSync } from 'fs';
import * as path from 'path';

import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v9';

const rest = new REST({ version: '9' }).setToken(process.env.TOKEN);

const commands: object[] = [];

const commandPath = path.join(__dirname, 'commands');
console.log(commandPath);
readdirSync(commandPath).forEach(async (dir) => {
  const commandFiles = readdirSync(path.join(commandPath, dir)).filter((file) =>
    file.endsWith('.ts'),
  );

  for (const file of commandFiles) {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const command = require(path.join(commandPath, dir, file)).default;
    commands.push(command.data.toJSON());
  }
  (async () => {
    try {
      await rest.put(
        // use this route for production:
        // Routes.applicationCommands(process.env.CLIENT_ID),
        Routes.applicationGuildCommands(
          process.env.CLIENT_ID,
          process.env.GUILD_ID,
        ),
        { body: commands },
      );

      console.log('Successfully registered application commands.');
    } catch (error) {
      console.error(error);
    }
  })();
});
