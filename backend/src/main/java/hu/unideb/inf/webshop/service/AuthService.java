package hu.unideb.inf.webshop.service;

import hu.unideb.inf.webshop.data.repository.UserRepository;
import hu.unideb.inf.webshop.service.dto.LoginDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService{
    @Autowired
    UserRepository repo;
    @Autowired
    PasswordEncoder encoder;
    @Autowired
    AuthenticationManager manager;

    @Autowired
    JwtService jwtService;

    public String login(LoginDto dto) {
        manager.authenticate(
                new UsernamePasswordAuthenticationToken(dto.getEmailAddress(),dto.getPassword())
        );
        var user = repo.findByEmailAddress(dto.getEmailAddress());
        return jwtService.generateToken(user, user.getId(), user.getRole());
    }
}