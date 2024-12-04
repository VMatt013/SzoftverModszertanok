package hu.unideb.inf.webshop.controller;

import hu.unideb.inf.webshop.service.AuthService;
import hu.unideb.inf.webshop.service.dto.LoginDto;
import hu.unideb.inf.webshop.service.dto.RegistrationDto;
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

    @PostMapping("/registration")
    public String registration(@RequestBody RegistrationDto dto){
        return service.registration(dto);
    }

    @PostMapping("/login")
    public String login(@RequestBody LoginDto dto){
        return service.login(dto);
    }
}
