class Mediator {
    constructor() {
        this.users = [];
    }

    addUser(user) {
        this.users.push(user);
    }

    sendMessage(sender, message) {
        for (const user of this.users) {
            if (user !== sender) {
                user.receiveMessage(sender, message);
            }
        }
    }
}

class User {
    constructor(name, mediator) {
        this.name = name;
        this.mediator = mediator;
    }

    sendMessage(message) {
        console.log(`User ${this.name} sends message: ${message}`);
        this.mediator.sendMessage(this, message);
    }

    receiveMessage(sender, message) {
        console.log(`User ${this.name} received message from ${sender.name}: ${message}`);
    }
}

// Создание объектов медиатора и пользователей
const mediator = new Mediator();
const user1 = new User('John', mediator);
const user2 = new User('Alice', mediator);
const user3 = new User('Bob', mediator);

// Добавление пользователей в медиатор
mediator.addUser(user1);
mediator.addUser(user2);
mediator.addUser(user3);

// Отправка сообщения от пользователя 1 всем остальным пользователям
user1.sendMessage('Hello everyone!');


