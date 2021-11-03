import { Message } from 'discord.js';
import { Event } from '../interfaces';

// probably move them to some json file
const helloGifs = [
  'https://media.tenor.com/images/58725865c95fe20cfc595725fca0d6a3/tenor.gif',
  'https://media.tenor.com/images/6ff6bae3314470a2136e39ba65edaf9e/tenor.gif',
  'https://media.tenor.com/images/4b74bbf5197ab483c311f6cb078c3ddb/tenor.gif',
  'https://media.tenor.com/images/b8df6620ac67eeec4b7d6a8f36849dfb/tenor.gif',
  'https://media.tenor.com/images/6fa0c838009b722305f4006f42327ed7/tenor.gif',
  'https://media.tenor.com/images/c175bb6d660548b402e9b67797754c6c/tenor.gif',
  'https://media.tenor.com/images/c40123ced12dfc19cf94108d0e5008a2/tenor.gif',
  'https://media.tenor.com/images/6666edb28d3d315c03de453e85e6a077/tenor.gif',
  'https://media.tenor.com/images/3d06d6ac5a22d245bce66d453f2fad7c/tenor.gif',
  'https://media.tenor.com/images/98522296a44b4dade86484016d96c735/tenor.gif',
  'https://media.tenor.com/images/9910e123e91ec7f2f4d0dc2684089e0a/tenor.gif',
  'https://media.tenor.com/images/0ac966011c5a79189516b30758950db1/tenor.gif',
  'https://media.tenor.com/images/e3c747b1bf7b80b066f62d629209e694/tenor.gif',
  'https://media.tenor.com/images/37bb2dcbef08e30239133f38475397f8/tenor.gif',
  'https://media.tenor.com/images/d24cd09febdc7b6e2606d00e820adf99/tenor.gif',
  'https://media.tenor.com/images/0ed8b6e0b69defc406010a69a33492fe/tenor.gif',
  'https://media.tenor.com/images/f951c5364a7aaeb764eb63e1089c563a/tenor.gif',
  'https://media.tenor.com/images/fb47c13036491018852a4e4493c1c757/tenor.gif',
  'https://media.tenor.com/images/9969d2bc836ee216a3319d0c15d8ad35/tenor.gif',
  'https://media.tenor.com/images/b440fe8b087416820258b711b91ca18a/tenor.gif',
  'https://media.tenor.com/images/ffc0c39b3116b260f8cd2b15b719c97a/tenor.gif',
  'https://media.tenor.com/images/9ea72ef078139ced289852e8a4ea0c5c/tenor.gif',
  'https://media.tenor.com/images/0b4bdb72acffe55e9dda0339578319ef/tenor.gif',
  'https://media.tenor.com/images/d20fa3f1dc60227de7eee080748b024c/tenor.gif',
  'https://media.tenor.com/images/a0afeb9cc47a7baf61be453b9a5736b2/tenor.gif',
  'https://media.tenor.com/images/5a5d4cb96391a60e8809e1471c912dff/tenor.gif',
  'https://media.tenor.com/images/d42a87274d2b62fda7f23fe7a095f813/tenor.gif',
  'https://media.tenor.com/images/812b65281437fd306a24407eaaa36132/tenor.gif',
  'https://media.tenor.com/images/b2f01ca41fafc7f1267887c81eeca1a6/tenor.gif',
  'https://media.tenor.com/images/6a7840375bc4af3ff5307849c9aaec42/tenor.gif',
  'https://media.tenor.com/images/02cc02c7efbd71c8987f318698fe6425/tenor.gif',
  'https://media.tenor.com/images/a8576524ac7c50ac64591754be3b8cde/tenor.gif',
  'https://media.tenor.com/images/d97ffb2fe80f32c157ef9a883f59c279/tenor.gif',
  'https://media.tenor.com/images/6dda3f82322b902d1b1694432c5315e3/tenor.gif',
  'https://media.tenor.com/images/6dcd94c7c4bf4800648ef7cbe0113c33/tenor.gif',
  'https://media.tenor.com/images/25de5ae4b3a35de905166d6a8cc92411/tenor.gif',
  'https://media.tenor.com/images/86b15e84c4521cdebc739e6581e9f31e/tenor.gif',
  'https://media.tenor.com/images/78ad45ea867b073dea47ae086c5837a2/tenor.gif',
  'https://media.tenor.com/images/087606825bdde62d90ad6d87d8113c33/tenor.gif',
  'https://media.tenor.com/images/e4a2e558234284ea158baf335fec447b/tenor.gif',
  'https://media.tenor.com/images/c43646477ba87924a7213b56cf3455a2/tenor.gif',
  'https://media.tenor.com/images/ed06a57e1a9ac68bc80295b3e2859734/tenor.gif',
  'https://media.tenor.com/images/b1b71ac186723271dfc64d0fddc0bcbe/tenor.gif',
  'https://media.tenor.com/images/bf104af3928d02b2a9d982a0b9eefc48/tenor.gif',
  'https://media.tenor.com/images/fb6f5504556225553e10dfb4a9c5d7f5/tenor.gif',
  'https://media.tenor.com/images/5506a0a8bdb0f00558a93e0e25fd5dfa/tenor.gif',
  'https://media.tenor.com/images/9b55102ba97d45828dbed1db587cbee0/tenor.gif',
  'https://media.tenor.com/images/a36057a20ab0b261315d9384dcc6b561/tenor.gif',
  'https://media.tenor.com/images/1d59b2456f9e81c1092dbeddf5d3dca8/tenor.gif',
  'https://media.tenor.com/images/4debaa32cf4ee7832eeee26bf566429a/tenor.gif',
];

function getGif(): string {
  // pick random gif from helloGifs array
  const randomGif = helloGifs[Math.floor(Math.random() * helloGifs.length)];
  return randomGif;
}

export const event: Event = {
  name: 'messageCreate',
  run: async (client, message: Message) => {
    if (!message.mentions.has(client.user)) return;
    message.reply(getGif());
  },
};
