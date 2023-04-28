package com.market.backend.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Collection;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

@Component
public class JWTUtils {

    @Value("${secret.key.jwt}")
    private String jwtSecret;

    @Value("${expiration.jwt}")
    private Long expirationJwt;

    public String generateToken(String username, Collection<? extends GrantedAuthority> authorities) {
        SecretKey key = Keys.hmacShaKeyFor(jwtSecret.getBytes(StandardCharsets.UTF_8));

        return Jwts.builder()
                .setSubject(username)
                .claim("authorities", getClaims(authorities))
                .setExpiration(new Date(System.currentTimeMillis() + expirationJwt))
                .signWith(key)
                .compact();
    }

    public String getUsername(Claims claims) {
        return String.valueOf(claims.getSubject());
    }

    public String getAuthorities(Claims claims) {
        return (String) claims.get("authorities");
    }

    public Claims getClaims(String token) {
        SecretKey key = Keys.hmacShaKeyFor(jwtSecret.getBytes(StandardCharsets.UTF_8));

        return Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token.split(" ")[1].trim())
                .getBody();
    }

    private String getClaims(Collection<? extends GrantedAuthority> authorities) {
        Set<String> authoritiesSet = new HashSet<>();

        for (GrantedAuthority authority: authorities) {
            authoritiesSet.add(authority.getAuthority());
        }

        return String.join(",", authoritiesSet);
    }
}
