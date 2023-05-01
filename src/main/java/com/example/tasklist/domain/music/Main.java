package com.example.tasklist.domain.music;

public class Main {
    public static void main(String[] args) {
        System.out.println("\tAbstractFactory");
        System.out.println(MusicFactory.playMusic(MusicType.ROCK));
        System.out.println(MusicFactory.playMusic(MusicType.CLASSIC));

    }
}
