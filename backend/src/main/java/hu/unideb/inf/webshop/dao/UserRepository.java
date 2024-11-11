package hu.unideb.inf.webshop.dao;

import hu.unideb.inf.webshop.POJO.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {

    User findByEmailId(@Param("emailAddress") String emailAddress);

}
