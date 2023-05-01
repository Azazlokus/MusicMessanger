package com.example.tasklist.domain.user;

import com.example.tasklist.domain.task.Task;
import lombok.Data;

import java.util.List;
import java.util.Set;

@Data
public class User {
    private final ChatMediator chatMediator;
    public User() {
        this.chatMediator = new ChatMediator();
    }

    public User(ChatMediator mediator, String name){
        this.chatMediator = mediator;
        this.name = name;
    }
    public void send(String msg){
        System.out.println(this.name+": Sending message: "+msg);
        chatMediator.sendMessage(msg, this);
    }
    public void receive(String msg){
        System.out.println(this.name+": Received Message: "+msg);
    }
    private Long id;
    private String name;
    private String username;
    private String password;
    private String passwordConfirmation;
    private Set<Role> roles;
    private List<Task> tasks;



}
