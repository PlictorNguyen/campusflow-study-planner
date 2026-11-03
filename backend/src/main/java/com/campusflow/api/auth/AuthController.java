package com.campusflow.api.auth;

import com.campusflow.api.user.AppUser;
import com.campusflow.api.user.AppUserRepository;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.time.Instant;
import java.util.Date;
import java.util.UUID;

@RestController @RequestMapping("/api/auth")
public class AuthController {
    private final AppUserRepository users;
    private final PasswordEncoder encoder;
    private final SecretKey key;
    private final long expiryHours;
    public AuthController(AppUserRepository users, PasswordEncoder encoder,
        @Value("${app.jwt.secret}") String secret, @Value("${app.jwt.expiration-hours}") long expiryHours) {
        this.users=users; this.encoder=encoder; this.expiryHours=expiryHours;
        if(secret==null || secret.getBytes(StandardCharsets.UTF_8).length<32) throw new IllegalStateException("Set JWT_SECRET to a random value of at least 32 bytes.");
        key=Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));
    }
    public record RegisterRequest(@Email @NotBlank String email,@NotBlank @Size(min=2,max=80) String displayName,@NotBlank @Size(min=10,max=72) String password) {}
    public record LoginRequest(@Email @NotBlank String email,@NotBlank String password) {}
    public record AuthResponse(String token,String email,String displayName,UUID userId) {}
    @PostMapping("/register") public AuthResponse register(@Valid @RequestBody RegisterRequest body) {
        String email=body.email().trim().toLowerCase();
        if(users.existsByEmailIgnoreCase(email)) throw new ResponseStatusException(HttpStatus.CONFLICT,"Email is already registered");
        return token(users.save(new AppUser(email,body.displayName().trim(),encoder.encode(body.password()))));
    }
    @PostMapping("/login") public AuthResponse login(@Valid @RequestBody LoginRequest body) {
        AppUser user=users.findByEmailIgnoreCase(body.email().trim()).orElseThrow(()->new ResponseStatusException(HttpStatus.UNAUTHORIZED,"Invalid email or password"));
        if(!encoder.matches(body.password(),user.getPasswordHash())) throw new ResponseStatusException(HttpStatus.UNAUTHORIZED,"Invalid email or password");
        return token(user);
    }
    private AuthResponse token(AppUser user) {
        Instant now=Instant.now();
        String jwt=Jwts.builder().subject(user.getId().toString()).claim("email",user.getEmail()).issuedAt(Date.from(now))
            .expiration(Date.from(now.plusSeconds(expiryHours*3600))).signWith(key).compact();
        return new AuthResponse(jwt,user.getEmail(),user.getDisplayName(),user.getId());
    }
}
