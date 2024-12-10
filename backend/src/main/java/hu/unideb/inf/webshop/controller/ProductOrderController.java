
package hu.unideb.inf.webshop.controller;

import hu.unideb.inf.webshop.data.entity.ProductOrderEntity;
import hu.unideb.inf.webshop.data.repository.ProductOrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/webshop/product-orders")
public class ProductOrderController {

    @Autowired
    private ProductOrderRepository productOrderRepository;


    @PostMapping()
    public ProductOrderEntity saveProductOrder(@RequestBody ProductOrderEntity productOrder) {
        return productOrderRepository.save(productOrder);
    }
}

