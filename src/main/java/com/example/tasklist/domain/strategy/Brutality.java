package com.example.tasklist.domain.strategy;

public class Brutality implements KickBehavior{
    @Override
    public void kick() {
        System.out.println("Brutality");
    }
}
