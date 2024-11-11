package hu.unideb.inf.webshop.service;

import org.apache.catalina.connector.Response;
import org.springframework.http.ResponseEntity;

import java.util.Map;

public interface UserService {

    ResponseEntity<String> signUp(Map<String,String> requestMap);
}
