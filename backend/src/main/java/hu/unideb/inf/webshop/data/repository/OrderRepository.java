package hu.unideb.inf.webshop.data.repository;

import hu.unideb.inf.webshop.data.entity.OrderEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<OrderEntity, Integer> {

    List<OrderEntity> findByUserId(int userId);
}
