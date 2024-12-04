package hu.unideb.inf.webshop.data.repository;

import hu.unideb.inf.webshop.data.entity.RoleEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RoleRepository extends JpaRepository<RoleEntity, Integer> {

}
