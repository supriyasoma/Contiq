package com.contiq.userservice.config;

import com.contiq.userservice.entity.UserEntity;
import com.contiq.userservice.repository.UserRepository;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import java.security.Key;
import java.util.Date;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class JwtService {

  @Value("${SECRET_ID}")
  private String SECRET;

  private final UserRepository userRepository;

  public String generateToken(String email, String password) {
    try {
      UserEntity user = userRepository.findByEmail(email);
      PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
      if (passwordEncoder.matches(password, user.getPassword())) {
        return createToken(email);
      } else {
        throw new RuntimeException("Password Doesn't match");
      }
    } catch (Exception e) {
      throw new RuntimeException("Email Doesn't exist");
    }
  }

  private String createToken(String userName) {
    return Jwts
      .builder()
      .setSubject(userName)
      .setIssuedAt(new Date(System.currentTimeMillis()))
      .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 30))
      .signWith(getSignKey(), SignatureAlgorithm.HS256)
      .compact();
  }

  private Key getSignKey() {
    byte[] keyByte = Decoders.BASE64.decode(SECRET);
    return Keys.hmacShaKeyFor(keyByte);
  }
}
