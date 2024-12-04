package hu.unideb.inf.webshop;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;

//@SpringBootApplication(exclude = SecurityAutoConfiguration.class)
@SpringBootApplication()
public class WebShopApplication {

    public static void main(String[] args) {
        SpringApplication.run(WebShopApplication.class, args);


    }

}
