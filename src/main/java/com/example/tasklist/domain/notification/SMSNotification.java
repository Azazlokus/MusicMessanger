package com.example.tasklist.domain.notification;

public class SMSNotification implements Notification{
    @Override
    public void notifyUser() {
        System.out.println("Sending a SMS notification");
    }
}
