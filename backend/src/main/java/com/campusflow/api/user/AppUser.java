package com.campusflow.api.user;

import jakarta.persistence.*;
import java.time.Instant;
import java.util.UUID;

@Entity @Table(name = "app_users")
public class AppUser {
    @Id @GeneratedValue private UUID id;
    @Column(nullable = false, unique = true, length = 320) private String email;
    @Column(nullable = false, length = 80) private String displayName;
    @Column(nullable = false) private String passwordHash;
    @Column(nullable = false) private Instant createdAt = Instant.now();
    protected AppUser() {}
    public AppUser(String email, String displayName, String passwordHash) { this.email=email; this.displayName=displayName; this.passwordHash=passwordHash; }
    public UUID getId() { return id; }
    public String getEmail() { return email; }
    public String getDisplayName() { return displayName; }
    public String getPasswordHash() { return passwordHash; }
}
