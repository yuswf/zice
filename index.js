require('dotenv').config();
const Client = require('node-telegram-bot-api');
const path = require('path');
const {spawn} = require('child_process');

const token = process.env.TOKEN;
const client = new Client(token, {polling: true});

let interval;
const dice_values = [];
const averages = [];

const average_calc = (arr) => arr.reduce((acc, cur) => acc + cur) / arr.length;
const result = (msg) => {
    client.sendMessage(msg.chat.id, `\`\`\`Result\nDice Roll: ${dice_values.length}\nAverage: ${average_calc(dice_values).toFixed(4)}\`\`\``, {
        parse_mode: 'Markdown',
    });
}
const chart_gen = (msg) => {
    const arr = averages.map(i => Number(i));

    const py = spawn('py', ['script.py', arr, arr.map((_, i) => i + 1)]);
    py.stdout.on("data", data => {
        const chart = data.toString().trim();
        const filePath = path.join(__dirname, '\\charts\\' + chart);

        client.sendPhoto(msg.chat.id, filePath);
    });
    py.stderr.on("data", err => console.error(err.toString()));
}

client.setMyCommands([
    {command: 'start', description: 'bot sends dice to chat.'},
    {command: 'result', description: 'bot sends instant results.'},
    {command: 'graph', description: 'bot sends instant result as graph.'},
    {command: 'stop', description: 'bot stops and sends result.'},
]);

client.onText(/\/start/, (msg) => {
    if (interval) return;

    interval = setInterval(async () => {
        await client.sendDice(msg.chat.id)
            .then((result) => {
                dice_values.push(result.dice.value);
                averages.push(average_calc(dice_values).toFixed(4));
            });
    }, 300);
});

client.onText(/\/result/, (msg) => {
    result(msg);
});

client.onText(/\/graph/, (msg) => {
    chart_gen();
});

client.onText(/\/stop/, (msg) => {
    clearInterval(interval);
    interval = null;

    result(msg);
    chart_gen(msg);
    client.sendMessage(msg.chat.id, 'Stopped!');
});