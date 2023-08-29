import { Telegraf } from 'telegraf';

const chats: Set<number> = new Set();
const ROWS_PER_MESSAGE = 50;

const token = process.env.BOT_TOKEN;
if (!token) {
    throw new TypeError('process.env.BOT_TOKEN is undefined')
}

export const bot = new Telegraf(token ?? '');

bot.command('start', (ctx) => {
    chats.add(ctx.chat.id);
    ctx.reply('chat id saved');
});

bot.command('stop', (ctx) => {
    const deleted = chats.delete(ctx.chat.id);
    if (deleted) {
        ctx.reply('chat id deleted');
    } else {
        ctx.reply('chat not found');
    }
});

bot.command('list', async (ctx) => {
    try {
        ctx.reply('Server status: ' + globalThis.pageStatus)
    } catch (e) {
        console.log(e);
    }
});

bot.launch();

export const sendToAll = (msg: string): void => {
    chats.forEach((id) => {
        bot.telegram.sendMessage(id, msg, { parse_mode: 'Markdown' });
    });
}