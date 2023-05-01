package com.example.tasklist.domain.Content;

import java.util.ArrayList;
import java.util.List;

public class ProxyContent implements IContent{
    private IContent contentReal = new Content();
    private static List<String> bannedContent;
    static {
        bannedContent = new ArrayList<String>();
        bannedContent.add("nig");
        bannedContent.add("*ger");
        bannedContent.add("*#!");
    }
    @Override
    public void isOk(String content) throws Exception {
        if(bannedContent.contains(content.toLowerCase())){
            throw new Exception("The message '"+content+"' contain a prohibited message");
        }
        contentReal.isOk(content);
    }

    public static void main(String[] args) {
        System.out.println("\n\tProxy");
        IContent content = new ProxyContent();
        try{
            content.isOk("Hello");
            content.isOk("nig");
            content.isOk("Good morning");
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
    }
}
