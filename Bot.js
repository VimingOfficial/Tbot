const TelegramBot = require('node-telegram-bot-api');
const botToken = 'Bot token';
const proxy = 'socks5://127.0.0.1:10808';
const requestOptions = {
  request: {
    agentClass: 'socks5-https-agent',
    agentOptions: {
      socksHost: '127.0.0.1',
      socksPort: 10808
    }
  }
};
const bot = new TelegramBot(botToken, { polling: true, requestOptions: requestOptions });

function sendToAllUsers(message) {
    bot.getUpdates().then(updates => {
        updates.forEach(update => {
            const chatId = update.message.chat.id;
            bot.sendMessage(chatId, message);
        });
    });
}

bot.onText(/\/send/, (msg) => {
    const message = 'Hi, the bot startrd';
    sendToAllUsers(message);
});
