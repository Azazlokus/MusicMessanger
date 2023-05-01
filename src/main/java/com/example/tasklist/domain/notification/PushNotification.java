package com.example.tasklist.domain.notification;

public class PushNotification implements Notification{
    @Override
    public void notifyUser(){
        System.out.println("Sending a push notification");

    }
}
