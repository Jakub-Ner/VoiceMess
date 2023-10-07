package com.example.demo;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController // This means endpoint returns a JSON response
public class HelloController {

    @GetMapping("/") // GET request with path "/"
    public String index() {
        return "Greetings from Spring Boot!";
    }

}