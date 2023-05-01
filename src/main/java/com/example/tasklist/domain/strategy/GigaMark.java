package com.example.tasklist.domain.strategy;

public class GigaMark extends Fighter{
    public GigaMark(KickBehavior kickBehavior, JumpBehavior jumpBehavior) {
        super(kickBehavior, jumpBehavior);
    }
    public void display(){
        System.out.println("GigaMark");
    }
}
