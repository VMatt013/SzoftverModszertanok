package hu.unideb.inf.webshop.controller;


import hu.unideb.inf.webshop.data.entity.UserEntity;
import hu.unideb.inf.webshop.data.repository.UserRepository;
import org.apache.catalina.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/webshop/users")
public class UserController {
    @Autowired
    private UserRepository userRepository;

    @GetMapping("")
    public List<UserEntity> getUsers(){
        return userRepository.findAll();
    }

    @GetMapping("/{id}")
    public UserEntity getUser(@PathVariable("id") int id){
        return userRepository.findById(id).get();
    }

    @PostMapping()
    public UserEntity saveUser(@RequestBody UserEntity user){
        return userRepository.save(user);
    }

    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable("id") int id){
        userRepository.deleteById(id);
    }
}
