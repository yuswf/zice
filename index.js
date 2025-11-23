require('dotenv').config();
const Client = require('node-telegram-bot-api');

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

client.setMyCommands([
    {command: 'start', description: 'bot sends dice to chat.'},
    {command: 'stop', description: 'bot stops and sends result.'},
    {command: 'result', description: 'bot sends instant results.'},
]);

client.onText(/\/start/, (msg) => {
    interval = setInterval(async () => {
        await client.sendDice(msg.chat.id)
            .then((result) => {
                dice_values.push(result.dice.value);
                averages.push(average_calc(dice_values).toFixed(4));
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
