package com.example.tasklist.domain.music;

public class RockMusic extends Music{
    RockMusic(Country country) {
        super(MusicType.ROCK,country);
        play();
    }

    @Override
    void play() {
        System.out.println("Playing a rock music");
    }
}
