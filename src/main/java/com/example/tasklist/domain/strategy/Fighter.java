package com.example.tasklist.domain.strategy;

public abstract class Fighter {
    KickBehavior kickBehavior;
    JumpBehavior jumpBehavior;

    public Fighter(KickBehavior kickBehavior,
                   JumpBehavior jumpBehavior){
        this.jumpBehavior = jumpBehavior;
        this.kickBehavior = kickBehavior;
    }

    public void setJumpBehavior(JumpBehavior jumpBehavior) {
        this.jumpBehavior = jumpBehavior;
    }

    public void punch(){
        System.out.println("Default punch");
    }
    public void kick(){
        kickBehavior.kick();
    }
    public void jump(){
        jumpBehavior.jump();
    }

    public void setKickBehavior(KickBehavior kickBehavior) {
    this.kickBehavior =  kickBehavior;
    }
}
