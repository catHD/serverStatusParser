import { config } from 'dotenv';
import { parse } from 'node-html-parser';
import fetch from 'node-fetch';
import { sendToAll } from './bot';

config();

if (!process.env.WEB_PAGE) {
    throw new TypeError('process.env.WEB_PAGE is undefined')
}
const url = process.env.WEB_PAGE;
const retryTime = () => 25000 + Math.random() * 10000; // дефолтный таймаут между вызовом страницы страниц
const delay = async (ms: number) => await new Promise(resolve => setTimeout(resolve, ms));
let pageStatus = globalThis.pageStatus;

/**
 * Основной модуль
 * @desс Main Основной модуль
 */
async function main() {
    while (true) {
        try {
            await parsePage()
            await delay(retryTime())
        } catch (e) {
            console.error(e)
        }
    }
}
async function parsePage() {
    try {
        const page = await fetch(url)
            .then((resp) => resp.text())
            .catch((e) => { console.log(e) });
        if (!page) {
            return;
        }

        const html = parse(page);
        const items = html.querySelectorAll('div.server-status-checker');
        console.log(items)
        if (pageStatus === 'online') sendToAll('Server OFFLINE')
    } catch (e) {
        console.log(e);
    }
}

main();