package hu.unideb.inf.webshop.restImpl;

import hu.unideb.inf.webshop.constents.WebShopConstants;
import hu.unideb.inf.webshop.rest.UserRest;
import hu.unideb.inf.webshop.service.UserService;
import hu.unideb.inf.webshop.utils.WebShopUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
public class UserRestImpl implements UserRest {

    @Autowired
    UserService userService;

    @Override
    public ResponseEntity<String> signUp(Map<String, String> requestMap) {
        try {
            return userService.signUp(requestMap);
        }catch (Exception ex){
            ex.printStackTrace();
        }
        return WebShopUtils.getResponseEntity(WebShopConstants.SOMETHING_WENT_WRONG,HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
