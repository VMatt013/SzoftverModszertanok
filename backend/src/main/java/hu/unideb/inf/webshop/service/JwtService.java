package hu.unideb.inf.webshop.service;

import hu.unideb.inf.webshop.data.entity.RoleEntity;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Service
public class JwtService {

    public static final String SECRET = "t7zu7zgzuhgtgzttzugttz7t7ztt7ztz67ftz7tz7frz67tfrrzt6fr5tdrfzgzughui8g7zfr67ztfrz67tftz6fd67zfrtdt67zfd67zfd67zgzt";

    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    public String generateToken(UserDetails userDetails, int id, RoleEntity role) {
        Map<String, Object> claims = new HashMap<>();
        userDetails.getAuthorities().forEach(authority -> claims.put(authority.getAuthority(), authority));

        claims.put("id", id);
        claims.put("role", role.getRoleName());
        byte[] keyBytes = Decoders.BASE64.decode(SECRET);
        SecretKey key = Keys.hmacShaKeyFor(keyBytes);

        return Jwts.builder()
                .claims(claims)
                .subject(userDetails.getUsername())
                .issuedAt(new Date(System.currentTimeMillis()))
                .expiration(new Date(System.currentTimeMillis() + 600000))
                .signWith(key)
                .compact();
    }

    public boolean validateToken(String token, UserDetails userDetails) {
        final String username = extractUsername(token);
        return (username.equals(userDetails.getUsername()) && !isTokenExpired(token));
    }

    private boolean isTokenExpired(String token) {
        Date date = extractClaim(token, Claims::getExpiration);
        return date.before(new Date());
    }

    private <T> T extractClaim(String token, Function<Claims, T> claimsResolvers) {
        byte[] keyBytes = Decoders.BASE64.decode(SECRET);
        SecretKey key = Keys.hmacShaKeyFor(keyBytes);

        final Claims claims = Jwts.parser()
                .verifyWith(key)
                .build()
                .parseSignedClaims(token)
                .getPayload();

        return claimsResolvers.apply(claims);
    }
}
