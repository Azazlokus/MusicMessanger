package com.example.tasklist.domain.state;

public class Silent implements MobileAlertState{
    @Override
    public void alert(AlertStateContext ctx) {
        System.out.println("silent...");
    }
}
