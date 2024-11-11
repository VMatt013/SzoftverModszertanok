package hu.unideb.inf.webshop.serviceImpl;

import hu.unideb.inf.webshop.POJO.User;
import hu.unideb.inf.webshop.constents.WebShopConstants;
import hu.unideb.inf.webshop.dao.UserRepository;
import hu.unideb.inf.webshop.service.UserService;
import hu.unideb.inf.webshop.utils.WebShopUtils;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.Objects;

@Slf4j
@Service
public class UserServiceImpl implements UserService {

    @Autowired
    UserRepository userRepository;

    @Override
    public ResponseEntity<String> signUp(Map<String, String> requestMap) {
    log.info("Inside signup {}",requestMap);
    try {
        if (validateSignUpMap(requestMap)) {
            User user = userRepository.findByEmailId(requestMap.get("email"));
            if (Objects.isNull(user)) {
                userRepository.save(getUserFromMap(requestMap));
                return WebShopUtils.getResponseEntity("Succesfully Registered.", HttpStatus.OK);
            } else {
                return WebShopUtils.getResponseEntity("Email already exists", HttpStatus.BAD_REQUEST);
            }
        } else {
            return WebShopUtils.getResponseEntity(WebShopConstants.INVALID_DATA, HttpStatus.BAD_REQUEST);
        }
    } catch (Exception ex) {
        ex.printStackTrace();
    }
    return WebShopUtils.getResponseEntity(WebShopConstants.SOMETHING_WENT_WRONG, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    private boolean  validateSignUpMap(Map<String,String> requestMap){
        if (requestMap.containsKey("email") && requestMap.containsKey("password")
                && requestMap.containsKey("first_name") && requestMap.containsKey("last_name")){
            return true;
        }
        return false;
    }

    private User getUserFromMap(Map<String,String> requestMap) {
        User user = new User();
        user.setFirstName(requestMap.get("first_name"));
        user.setLastName(requestMap.get("last_name"));
        user.setEmailAddress(requestMap.get("email"));
        user.setPassword(requestMap.get("password"));
        return user;
    }

}
