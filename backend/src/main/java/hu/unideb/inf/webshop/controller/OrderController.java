package hu.unideb.inf.webshop.controller;

import hu.unideb.inf.webshop.data.entity.OrderEntity;

import hu.unideb.inf.webshop.data.entity.UserEntity;
import hu.unideb.inf.webshop.data.repository.OrderRepository;
import hu.unideb.inf.webshop.data.repository.UserRepository;
import hu.unideb.inf.webshop.service.dto.OrderDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/webshop/orders")
public class OrderController {
    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private UserRepository userRepository;

    @GetMapping("")
    public List<OrderDto> getOrders(/*@PathVariable("userId") int userId*/){
        List<OrderEntity> orders = orderRepository.findAll();
        return orders.stream()
                .map(order -> new OrderDto(
                        order.getId(),
                        order.getDate(),
                        order.getPaymentStatus(),
                        order.getStatus(),
                        order.getUserId().getId(),
                        order.getProductName()))
                .collect(Collectors.toList());
    }

    @GetMapping("/{id}")
    public OrderDto getOrderById(@PathVariable("id") int id){

        OrderEntity order = orderRepository.findById(id).orElseThrow(() ->
                new RuntimeException("Order not found with id: " + id));

        return new OrderDto(
                order.getId(),
                order.getDate(),
                order.getPaymentStatus(),
                order.getStatus(),
                order.getUserId().getId(),
                order.getProductName()
        );
    }

    @PostMapping()
    public OrderEntity saveOrder(@RequestBody OrderEntity order){
        if(order.getUserId() != null && order.getUserId().getId() != 0){
            UserEntity user = userRepository.findById(order.getUserId().getId())
                    .orElseThrow(() -> new RuntimeException("Department not found"));
            order.setUserId(user);
        }else{
            order.setUserId(null);
        }

        return orderRepository.save(order);
    }

    @DeleteMapping("/{id}")
    public void deleteOrder(@PathVariable("id") int id){
        orderRepository.deleteById(id);
    }

    @PutMapping("/{id}")
    public OrderEntity updateOrder(@RequestBody OrderEntity order) {
        if(order.getId() > 0L){
            return orderRepository.save(order);
        } else {
            return null;
        }
    }


}
