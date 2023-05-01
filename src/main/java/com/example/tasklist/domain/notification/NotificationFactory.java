package com.example.tasklist.domain.notification;

public class NotificationFactory {
    public Notification createNotification(String channel){
        if(channel == null || channel.isEmpty()){
            return null;
        }
        switch (channel){
            case "SMS":
                return new SMSNotification();
            case "EMAIL":
                return new EmailNotification();
            case "PUSH":
                return new PushNotification();
            default:
                throw new IllegalArgumentException("Unknown channel "+ channel);
        }
    }

    public static void main(String[] args) {
        System.out.println("\tFactory method");
        NotificationFactory notificationFactory = new NotificationFactory();
        Notification notification = notificationFactory.createNotification("SMS");
        notification.notifyUser();
    }
}
