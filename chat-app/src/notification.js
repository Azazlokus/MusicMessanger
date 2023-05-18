class Notification {
    send() {
        throw new Error('Метод send() должен быть реализован.');
    }
}


class EmailNotification extends Notification {
    send() {
        console.log('Отправка Email уведомления...');
        // Реализация отправки Email уведомления
    }
}


class SMSNotification extends Notification {
    send() {
        console.log('Отправка SMS уведомления...');
        // Реализация отправки SMS уведомления
    }
}


class NotificationFactory {
    createNotification(type) {
        if (type === 'email') {
            return new EmailNotification();
        } else if (type === 'sms') {
            return new SMSNotification();
        } else {
            throw new Error(`Неизвестный тип уведомления: ${type}`);
        }
    }
}


const factory = new NotificationFactory();


const emailNotification = factory.createNotification('email');
emailNotification.send();


const smsNotification = factory.createNotification('sms');
smsNotification.send();


try {
    const unknownNotification = factory.createNotification('push');
    unknownNotification.send();
} catch (error) {
    console.log(error.message);
}
