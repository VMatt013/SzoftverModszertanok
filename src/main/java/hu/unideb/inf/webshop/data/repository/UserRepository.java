package hu.unideb.inf.webshop.data.repository;

import hu.unideb.inf.webshop.data.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<UserEntity, Integer> {

}
