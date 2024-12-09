package hu.unideb.inf.webshop.controller;

import hu.unideb.inf.webshop.data.entity.ProductEntity;
import hu.unideb.inf.webshop.data.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/webshop/products")
public class ProductController {
    @Autowired
    private ProductRepository productRepository;

    @GetMapping("")
    public List<ProductEntity> getProducts(){
        return productRepository.findAll();
    }

    @GetMapping("/{id}")
    public ProductEntity getProductById(@PathVariable("id") int id){

        ProductEntity product = productRepository.findById(id).orElseThrow(() ->
                new RuntimeException("Product not found with id: " + id));

        return product;
    }

    @PreAuthorize("hasAuthority('admin')")
    @PostMapping()
    public ProductEntity saveProduct(@RequestBody ProductEntity product){
        return productRepository.save(product);
    }

    @PreAuthorize("hasAuthority('admin')")
    @DeleteMapping("/{id}")
    public void deleteProduct(@PathVariable("id") int id){
        productRepository.deleteById(id);
    }

    @PreAuthorize("hasAuthority('admin')")
    @PutMapping("/{id}")
    public ProductEntity updateProduct(@RequestBody ProductEntity product) {
        if(product.getId() > 0L){
            return productRepository.save(product);
        } else {
            return null;
        }
    }
}
