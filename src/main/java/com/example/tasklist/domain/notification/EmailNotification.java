package com.example.tasklist.domain.notification;

public class EmailNotification implements Notification{
    @Override
    public void notifyUser() {
        System.out.println("Sending a email notification");
    }
}
