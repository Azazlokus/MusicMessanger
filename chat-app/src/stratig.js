
class Calculator {
    constructor(strategy) {
        this.strategy = strategy;
    }

    setStrategy(strategy) {
        this.strategy = strategy;
    }

    executeStrategy(num1, num2) {
        return this.strategy.execute(num1, num2);
    }
}

// класс стратегии
class OperationStrategy {
    execute(num1, num2) {
        throw new Error('Метод execute() должен быть реализован.');
    }
}

// Конкретная стратегия сложения
class AdditionStrategy extends OperationStrategy {
    execute(num1, num2) {
        return num1 + num2;
    }
}

// Конкретная стратегия вычитания
class SubtractionStrategy extends OperationStrategy {
    execute(num1, num2) {
        return num1 - num2;
    }
}

// Конкретная стратегия умножения
class MultiplicationStrategy extends OperationStrategy {
    execute(num1, num2) {
        return num1 * num2;
    }
}



const calculator = new Calculator(new AdditionStrategy());

// Выполнение операции сложения
const result1 = calculator.executeStrategy(5, 3);
console.log(`Результат сложения: ${result1}`);

// Переключение на стратегию вычитания
calculator.setStrategy(new SubtractionStrategy());

// Выполнение операции вычитания
const result2 = calculator.executeStrategy(8, 4);
console.log(`Результат вычитания: ${result2}`);

// Переключение на стратегию умножения
calculator.setStrategy(new MultiplicationStrategy());

// Выполнение операции умножения
const result3 = calculator.executeStrategy(6, 2);
console.log(`Результат умножения: ${result3}`);


class NotificationService {
    constructor(notificationStrategy) {
        this.notificationStrategy = notificationStrategy;
    }

    setNotificationStrategy(notificationStrategy) {
        this.notificationStrategy = notificationStrategy;
    }

    sendNotification(user, message) {
        this.notificationStrategy.sendNotification(user, message);
    }
}

class EmailNotificationStrategy {
    sendNotification(user, message) {
        console.log(`Sending email notification to ${user}: ${message}`);
    }
}

class SMSNotificationStrategy {
    sendNotification(user, message) {
        console.log(`Sending SMS notification to ${user}: ${message}`);
    }
}

class PushNotificationStrategy {
    sendNotification(user, message) {
        console.log(`Sending push notification to ${user}: ${message}`);
    }
}

// Создаем объекты стратегий
const emailStrategy = new EmailNotificationStrategy();
const smsStrategy = new SMSNotificationStrategy();
const pushStrategy = new PushNotificationStrategy();

// Создаем сервис уведомлений и устанавливаем стратегию по умолчанию
const notificationService = new NotificationService(emailStrategy);

// Тестирование различных стратегий
notificationService.sendNotification('John', 'New message received');
notificationService.setNotificationStrategy(smsStrategy);
notificationService.sendNotification('Alice', 'You have a new friend request');
notificationService.setNotificationStrategy(pushStrategy);
notificationService.sendNotification('Bob', 'Reminder: Meeting at 3 PM');
