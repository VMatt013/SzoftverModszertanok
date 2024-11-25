package hu.unideb.inf.webshop.data.repository;

import hu.unideb.inf.webshop.data.entity.ProductOderId;
import hu.unideb.inf.webshop.data.entity.ProductOrderEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductOrderRepository extends JpaRepository<ProductOrderEntity, ProductOderId> {
}
