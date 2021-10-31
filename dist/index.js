"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("./client");
const discord_js_1 = require("discord.js");
new client_1.default({
    intents: [discord_js_1.Intents.FLAGS.GUILDS],
}).init();
//# sourceMappingURL=index.js.map