package com.example.tasklist.patterns;

public class DBSingletonExample {
    private static DBSingletonExample instance;

    private DBSingletonExample(){

    }
    public static DBSingletonExample getInstance(){
        if(instance == null) {
            instance = new DBSingletonExample();
        }
        return instance;
    }

}
