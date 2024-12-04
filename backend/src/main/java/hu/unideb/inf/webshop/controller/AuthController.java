package hu.unideb.inf.webshop.controller;

import hu.unideb.inf.webshop.service.AuthService;
import hu.unideb.inf.webshop.service.dto.LoginDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    AuthService service;

    @PostMapping("/login")
    public String login(@RequestBody LoginDto dto){
        return service.login(dto);
    }
}
