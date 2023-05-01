package com.example.tasklist.domain.strategy;

public class ShortJump implements JumpBehavior{

    @Override
    public void jump() {
        System.out.println("Short jump");
    }
}
