package com.example.tasklist.domain.music;

public class ClassicMusic extends Music{

    ClassicMusic(Country country) {
        super(MusicType.CLASSIC,country);
        play();
    }

    @Override
    void play() {
        System.out.println("Playing a classic music");
    }
}
