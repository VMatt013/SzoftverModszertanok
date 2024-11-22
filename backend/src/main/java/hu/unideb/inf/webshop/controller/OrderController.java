package hu.unideb.inf.webshop.controller;

import hu.unideb.inf.webshop.data.entity.OrderEntity;

import hu.unideb.inf.webshop.data.repository.OrderRepository;
import hu.unideb.inf.webshop.service.dto.OrderDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/webshop/users/{userId}/orders")
public class OrderController {
    @Autowired
    private OrderRepository orderRepository;

    @GetMapping("")
    public List<OrderEntity> getOrdersByUserId(@PathVariable("userId") int userId){
        return orderRepository.findByUserId(userId);
    }

    @GetMapping("/{id}")
    public OrderEntity getOrderById(@PathVariable("id") int id){

        OrderEntity order = orderRepository.findById(id).orElseThrow(() ->
                new RuntimeException("Order not found with id: " + id));

        return order;
    }

    @PostMapping()
    public OrderEntity saveOrder(
            @PathVariable("userId") int userId,
            @RequestBody OrderDto orderDto
    ){
        OrderEntity order = new OrderEntity();
        order.setDate(orderDto.getDate());
        order.setUserId(userId);
        order.setPaymentStatus(orderDto.getPaymentStatus());
        order.setStatus(orderDto.getStatus());

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
