package com.example.tasklist.domain.music;

public class MusicFactory {
    public MusicFactory() {
    }
    public static Music playMusic(MusicType genre){
        Music music = null;
        Country country = Country.RUSSIA;
        switch(country){
            case GERMANY:
                music = GERMANYMusicFactory.playMusic(genre);
                break;
            case RUSSIA:
                music = RUSSIAMusicFactory.playMusic(genre);
            default:
                music = DefaultMusicFactory.playMusic(genre);
        }
        return music;
    }
}
