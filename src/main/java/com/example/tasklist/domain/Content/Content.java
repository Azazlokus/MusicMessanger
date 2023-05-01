package com.example.tasklist.domain.Content;

public class Content implements IContent{

    @Override
    public void isOk(String content) {
        System.out.println("The message '"+content +"' does not contain a prohibited message");
    }
}
