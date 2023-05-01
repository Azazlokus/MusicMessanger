package com.example.tasklist.domain.music;

public class RUSSIAMusicFactory {
    public static Music playMusic(MusicType genre){
        Country country = Country.RUSSIA;
        Music music = null;
            switch (genre){
                case CLASSIC:
                    music = new ClassicMusic(Country.GERMANY);
                    break;
                case ROCK:
                    music = new RockMusic(Country.GERMANY);
                default:
                    break;
            }
            return music;
        }

    }

