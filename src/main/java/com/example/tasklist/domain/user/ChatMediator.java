package com.example.tasklist.domain.user;

import java.util.ArrayList;
import java.util.List;

public class ChatMediator {
    private List<User> users;
    public ChatMediator(){
        this.users = new ArrayList<>();
    }
    public void addUser(User user){
        this.users.add(user);
    }
    public void sendMessage(String msg, User user){
        for(User u: this.users){
            if(u != user){
                u.receive(msg);
            }
        }
    }

    public static void main(String[] args) {
        System.out.println("\tMediator");
        ChatMediator mediator = new ChatMediator();
        User user1 = new User(mediator, "David");
        User user2 = new User(mediator, "Mark");
        User user3 = new User(mediator, "Borisovich");
        User user4 = new User(mediator, "Darkosyan");
        mediator.addUser(user1);
        mediator.addUser(user2);
        mediator.addUser(user3);
        mediator.addUser(user4);
        user1.send("Hello everyone...");

    }
}
