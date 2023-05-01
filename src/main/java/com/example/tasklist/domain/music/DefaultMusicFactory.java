package com.example.tasklist.domain.music;

public class DefaultMusicFactory {
    public static Music playMusic(MusicType genre){
    Music music = null;
    switch(genre){
        case CLASSIC:
            music = new ClassicMusic(Country.DEFAULT);
            break;
        case ROCK:
            music = new RockMusic(Country.DEFAULT);
            break;

        default:
            break;
    }
    return music;
    }
}

