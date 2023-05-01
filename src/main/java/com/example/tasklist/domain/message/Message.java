package com.example.tasklist.domain.message;

import com.example.tasklist.domain.user.User;

public class Message {
    private String content;
    private User user;
    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Message(String content) {
        this.content = content;
    }
}
