"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.event = void 0;
exports.event = {
    name: "message",
    run: (client, message) => __awaiter(void 0, void 0, void 0, function* () {
        console.log(message.content);
        if (message.author.bot ||
            message.guild ||
            !message.content.startsWith(client.config.prefix))
            return;
        const args = message.content
            .slice(client.config.prefix.length)
            .trim()
            .split(/ +/g);
        const cmd = args.shift().toLowerCase();
        if (!cmd)
            return;
        const command = client.commands.get(cmd) || client.aliases.get(cmd);
        if (command)
            command.run(client, message, args);
    }),
};
//# sourceMappingURL=message.js.map