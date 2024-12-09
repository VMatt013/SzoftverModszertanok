package hu.unideb.inf.webshop.controller;


import hu.unideb.inf.webshop.data.entity.OrderEntity;
import hu.unideb.inf.webshop.data.entity.ProductOrderEntity;
import hu.unideb.inf.webshop.data.entity.RoleEntity;
import hu.unideb.inf.webshop.data.entity.UserEntity;
import hu.unideb.inf.webshop.data.repository.RoleRepository;
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

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private RoleRepository roleRepository;

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
        List<RoleEntity> roles = roleRepository.findAll();

        return users.stream()
                .filter(userId -> userId.getId() == id)
                .map(user -> new ProfileDto(
                        user.getId(),
                        user.getFirstName(),
                        user.getLastName(),
                        user.getEmailAddress(),
                        user.getBirthDate(),
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
    public UserEntity updateUser(@PathVariable("id") int id, @RequestBody ProfileDto profileDto){
        UserEntity user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));

        user.setFirstName(profileDto.getFirstName());
        user.setLastName(profileDto.getLastName());
        user.setEmailAddress(profileDto.getEmail());

        if (profileDto.getRole() != null) {
            // Convert role string to RoleEntity
            RoleEntity roleEntity = roleRepository.findByRoleName(profileDto.getRole());
            user.setRole(roleEntity);
        }

        return userRepository.save(user);
    }
}
