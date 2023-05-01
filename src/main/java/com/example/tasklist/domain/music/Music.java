package com.example.tasklist.domain.music;

public abstract class Music {
    private Country country = null;
    private MusicType genre = null;

    public Music(Country country) {
        this.country = country;
    }

    Music(MusicType genre, Country country){
        this.genre = genre;
        this.country = country;
    }
    abstract void play();

    public Country getCountry() {
        return country;
    }

    public void setCountry(Country country) {
        this.country = country;
    }

    public MusicType getGenre() {
        return genre;
    }

    public void setGenre(MusicType genre) {
        this.genre = genre;
    }

    @Override
    public String toString() {
        return "Music from " +
                 country +
                ", genre: " + genre;
    }
}
