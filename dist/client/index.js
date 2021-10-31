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
const discord_js_1 = require("discord.js");
const path = require("path");
const fs_1 = require("fs");
const mongoose_1 = require("mongoose");
class ExtendedClient extends discord_js_1.Client {
    constructor() {
        super(...arguments);
        this.commands = new discord_js_1.Collection();
        this.events = new discord_js_1.Collection();
        this.config = {
            token: process.env.TOKEN,
            mongoURI: process.env.MONGO_URI,
            prefix: "!",
        };
        this.aliases = new discord_js_1.Collection();
    }
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            this.login(this.config.token);
            (0, mongoose_1.connect)(this.config.mongoURI, {});
            // Load commands
            const commandPath = path.join(__dirname, "..", "commands");
            (0, fs_1.readdirSync)(commandPath).forEach((dir) => __awaiter(this, void 0, void 0, function* () {
                var _a;
                const commands = (0, fs_1.readdirSync)(path.join(commandPath, dir)).filter((file) => file.endsWith(".ts"));
                for (const file of commands) {
                    const command = yield Promise.resolve().then(() => require(path.join(commandPath, dir, file)));
                    this.commands.set(command.name, command);
                    if (((_a = command === null || command === void 0 ? void 0 : command.aliases) === null || _a === void 0 ? void 0 : _a.length) > 0) {
                        command.aliases.forEach((alias) => this.aliases.set(alias, command));
                    }
                }
            }));
            // Load events
            const eventPath = path.join(__dirname, "..", "events");
            (0, fs_1.readdirSync)(eventPath).forEach((dir) => __awaiter(this, void 0, void 0, function* () {
                const { event } = yield Promise.resolve().then(() => require(path.join(eventPath, dir)));
                this.events.set(event.name, event);
                console.log(`Loaded event: ${event.name}`);
                this.on(event.name, event.run.bind(null, this));
            }));
        });
    }
}
exports.default = ExtendedClient;
//# sourceMappingURL=index.js.map