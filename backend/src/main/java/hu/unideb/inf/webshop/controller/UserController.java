package hu.unideb.inf.webshop.controller;


import hu.unideb.inf.webshop.data.entity.OrderEntity;
import hu.unideb.inf.webshop.data.entity.ProductOrderEntity;
import hu.unideb.inf.webshop.data.entity.UserEntity;
import hu.unideb.inf.webshop.data.repository.UserRepository;
import hu.unideb.inf.webshop.data.repository.OrderRepository;
import hu.unideb.inf.webshop.service.dto.OrderDto;
import hu.unideb.inf.webshop.service.dto.ProfileDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/webshop/users")
public class UserController {
    @Autowired
    private UserRepository userRepository;

    @Autowired OrderRepository orderRepository;

    @GetMapping("")
    public ResponseEntity<List<UserEntity>> getAllUsers() {
        try {
            List<UserEntity> users = userRepository.findAll();
            return ResponseEntity.ok(users);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @PreAuthorize("hasAuthority('admin') or @userService.hasId(#id)")
    @GetMapping("/{id}")
    public List<ProfileDto> getUser(@PathVariable("id") int id){

        List<UserEntity> users = userRepository.findAll();

        return users.stream()
                .filter(userId -> userId.getId() == id)
                .map(user -> new ProfileDto(
                        user.getId(),
                        user.getFirstName(),
                        user.getLastName(),
                        user.getEmailAddress(),
                        user.getBirthDate().toString(),
                        user.getRole().getRoleName()
                )).collect(Collectors.toList());

    }

    @PreAuthorize("hasAuthority('admin') or @userService.hasId(#id)")
    @GetMapping("/{id}/order")
    public List<OrderDto> getUserOrder(@PathVariable("id") int id){

        List<OrderEntity> orders = orderRepository.findAll();

        return orders.stream()
                .filter(order -> order.getUserId().getId() == id)
                .map(order -> new OrderDto(
                        order.getId(),
                        order.getDate(),
                        order.getPaymentStatus(),
                        order.getStatus(),
                        order.getUserId().getId(),
                        order.getUserId().getFirstName(),
                        order.getUserId().getLastName(),
                        order.getProductOrders() != null ?
                                order.getProductOrders().stream()
                                        .map(po -> po.getProduct().getName())
                                        .collect(Collectors.toList())
                                :List.of(),
                        order.getProductOrders() != null ?
                                order.getProductOrders().stream()
                                        .map(po -> po.getAmount())
                                        .collect(Collectors.toList())
                                :List.of()
                                ))
                .collect(Collectors.toList());
    }

    @PreAuthorize("hasAuthority('admin')")
    @PostMapping()
    public UserEntity saveUser(@RequestBody UserEntity user){
        return userRepository.save(user);
    }

    @PreAuthorize("hasAuthority('admin')")
    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable("id") int id){
        userRepository.deleteById(id);
    }

    @PreAuthorize("hasAuthority('admin') or @userService.hasId(#id)")
    @PutMapping("/{id}")
    public UserEntity updateUser(@PathVariable("id") int id, @RequestBody UserEntity userDetails){
        UserEntity user = userRepository.getReferenceById(id);

        user.setFirstName(userDetails.getFirstName());
        user.setLastName(userDetails.getLastName());
        user.setEmailAddress(userDetails.getEmailAddress());

        return userRepository.save(user);
    }
}
