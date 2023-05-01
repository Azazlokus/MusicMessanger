package com.example.tasklist.domain.strategy;

public class LongJump implements  JumpBehavior{
    @Override
    public void jump() {
        System.out.println("Long jump");
    }
}
