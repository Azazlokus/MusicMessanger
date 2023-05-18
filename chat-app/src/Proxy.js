class Messenger {
    constructor() {
        this.messages = [];
    }

    sendMessage(message) {
        this.messages.push(message);
        console.log(`Отправлено сообщение: ${message}`);
    }

    receiveMessage(message) {
        console.log(`Получено сообщение: ${message}`);
    }
}

// Прокси-класс для цензуры сообщений
class CensorshipProxy {
    constructor(messenger) {
        this.messenger = messenger;
    }

    sendMessage(message) {
        const censoredMessage = this.censorMessage(message);
        this.messenger.sendMessage(censoredMessage);
    }

    receiveMessage(message) {
        this.messenger.receiveMessage(message);
    }

    censorMessage(message) {
        // Реализация цензуры сообщения
        const censoredWords = ['тоxic', 'bad'];
        for (const word of censoredWords) {
            message = message.replace(new RegExp(word, 'gi'), '***');
        }
        return message;
    }
}


const messenger = new Messenger();

// Создание объекта прокси с цензурой
const proxy = new CensorshipProxy(messenger);

// Отправка сообщения через прокси
proxy.sendMessage('Это bad сообщение!');

// Получение сообщения
proxy.receiveMessage('Привет, как дела?');
