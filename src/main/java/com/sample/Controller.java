package com.sample;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
public class Controller {
    @RequestMapping("/world")
    public String helloController() {
        return "<h1>Hi everyone! Have fun traveling! </h1>";
    }
}