package com.example.demo;

import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

@RestController // This means endpoint returns a JSON response
@RequestMapping("/test")
public class HelloController {
    private class Message {
        public String message;
        public String author;

        public Message(String message) {
            this.message = message;
            author = "Anonymous";
        }
    }
    @GetMapping("/")
    public Message index() {
        return new Message("Hello World!");
    }

}