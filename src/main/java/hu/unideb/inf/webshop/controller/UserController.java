package hu.unideb.inf.webshop.controller;


import hu.unideb.inf.webshop.data.entity.UserEntity;
import hu.unideb.inf.webshop.data.repository.UserRepository;
import org.apache.catalina.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/fitness/users")
public class UserController {
    @Autowired
    private UserRepository userRepository;

    @GetMapping("")
    public List<UserEntity> getUsers(){
        return userRepository.findAll();
    }

    @PostMapping()
    public UserEntity saveTermek(@RequestBody UserEntity user){
        return userRepository.save(user);
    }
}
