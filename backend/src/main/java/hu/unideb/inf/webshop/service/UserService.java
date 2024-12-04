package hu.unideb.inf.webshop.service;

import hu.unideb.inf.webshop.data.entity.UserEntity;
import hu.unideb.inf.webshop.data.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    @Autowired
    UserRepository repository;

    public UserDetailsService userDetailsService() {

        return new UserDetailsService() {
            @Override
            public UserDetails loadUserByUsername(String email) {
                UserEntity user = repository.findByEmailAddress(email);
                user.authorities.add(new SimpleGrantedAuthority(user.getRole().getRoleName()));
                return user;
            }
        };
    }

    public boolean hasId(int id){
        String username =  ((UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getUsername();
        UserEntity user = repository.findByEmailAddress(username);
        return user.getId() == id;

    }
}
