package hu.unideb.inf.webshop.controller;

import hu.unideb.inf.webshop.data.entity.OrderEntity;

import hu.unideb.inf.webshop.data.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/webshop/users/{userId}/orders")
public class OrderController {
    @Autowired
    private OrderRepository orderRepository;

    @GetMapping("")
    public List<OrderEntity> getOrders(){
        return orderRepository.findAll();
    }

    @GetMapping("/{id}")
    public OrderEntity getOrderById(@PathVariable("id") int id){

        OrderEntity order = orderRepository.findById(id).orElseThrow(() ->
                new RuntimeException("Order not found with id: " + id));

        return order;
    }

    @PostMapping()
    public OrderEntity saveOrder(@RequestBody OrderEntity order){
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
