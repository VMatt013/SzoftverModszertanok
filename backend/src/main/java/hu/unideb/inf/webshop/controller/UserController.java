package hu.unideb.inf.webshop.controller;


import hu.unideb.inf.webshop.data.entity.UserEntity;
import hu.unideb.inf.webshop.data.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
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

        UserEntity user = userRepository.findById(id).orElseThrow(() ->
                new RuntimeException("User not found with id: " + id));

        return user;
    }

    @PostMapping()
    public UserEntity saveUser(@RequestBody UserEntity user){
        return userRepository.save(user);
    }

    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable("id") int id){
        userRepository.deleteById(id);
    }

    @PutMapping("/{id}")
    public UserEntity updateUser(@PathVariable("id") int id, @RequestBody UserEntity userDetails){
        UserEntity user = userRepository.getReferenceById(id);

        user.setFirstName(userDetails.getFirstName());
        user.setLastName(userDetails.getLastName());
        user.setEmailAddress(userDetails.getEmailAddress());

        return userRepository.save(user);
    }
}
