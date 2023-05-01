package com.example.tasklist.domain.strategy;

public class Fatality implements KickBehavior{
    @Override
    public void kick() {
        System.out.println("Fatality kick!!!");
    }
}
