require('dotenv').config();
const Client = require('node-telegram-bot-api');

const token = process.env.TOKEN;
const client = new Client(token, {polling: true});

let interval;
const arr = [];

const result = (msg) => {
    const average = arr.reduce((a, b) => a + b) / arr.length;

    client.sendMessage(msg.chat.id, `\`\`\`Result\nDice Roll: ${arr.length}\nAvg: ${average.toFixed(4)}\`\`\``, {
        parse_mode: 'Markdown',
    });
}

client.setMyCommands([
    {command: 'start', description: 'bot sends dice to chat.'},
    {command: 'stop', description: 'bot stops and sends result.'},
    {command: 'result', description: 'bot sends instant results.'},
]);

client.onText(/\/start/, (msg) => {
    interval = setInterval(async () => {
        await client.sendDice(msg.chat.id)
            .then((result) => {
                arr.push(result.dice.value);
            });
    }, 3000);
});

client.onText(/\/result/, (msg) => {
    result(msg);
});

client.onText(/\/stop/, (msg) => {
    clearInterval(interval);

    result(msg);
    client.sendMessage(msg.chat.id, 'Stopped!');
});
