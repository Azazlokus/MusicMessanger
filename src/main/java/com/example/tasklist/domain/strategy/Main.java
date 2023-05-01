package com.example.tasklist.domain.strategy;

public class Main {
    public static void main(String[] args) {
        System.out.println("\n\tStrategy");
        JumpBehavior shortJump = new ShortJump();
        JumpBehavior longJump = new LongJump();
        KickBehavior brutality = new Brutality();
        KickBehavior fatality = new Fatality();
        GigaMark gigaMark = new GigaMark(fatality, longJump);

        gigaMark.display();
        gigaMark.kick();
        gigaMark.jump();
        gigaMark.kick();
        gigaMark.setJumpBehavior(shortJump);
        gigaMark.jump();
        gigaMark.setKickBehavior(brutality);
        gigaMark.kick();
    }
}
