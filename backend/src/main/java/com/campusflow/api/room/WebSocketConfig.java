package com.campusflow.api.room;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.simp.config.ChannelRegistration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.messaging.support.ChannelInterceptor;
import org.springframework.messaging.support.MessageHeaderAccessor;
import org.springframework.messaging.simp.stomp.StompCommand;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;
import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.security.Principal;

@Configuration @EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {
    private final String origin;
    private final SecretKey key;
    public WebSocketConfig(@Value("${app.cors.allowed-origin}") String origin,@Value("${app.jwt.secret}") String secret) {
        this.origin=origin; this.key=Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));
    }
    @Override public void configureMessageBroker(MessageBrokerRegistry registry) {
        registry.enableSimpleBroker("/topic"); registry.setApplicationDestinationPrefixes("/app");
    }
    @Override public void registerStompEndpoints(StompEndpointRegistry registry) {
        registry.addEndpoint("/ws").setAllowedOrigins(origin);
    }
    @Override public void configureClientInboundChannel(ChannelRegistration registration) {
        registration.interceptors(new ChannelInterceptor() {
            @Override public Message<?> preSend(Message<?> message,MessageChannel channel) {
                StompHeaderAccessor accessor=MessageHeaderAccessor.getAccessor(message,StompHeaderAccessor.class);
                if(accessor==null) return message;
                if(accessor.getCommand()==StompCommand.CONNECT) {
                    String header=accessor.getFirstNativeHeader("Authorization");
                    if(header==null || !header.startsWith("Bearer ")) throw new IllegalArgumentException("Authentication required");
                    String userId=Jwts.parser().verifyWith(key).build().parseSignedClaims(header.substring(7)).getPayload().getSubject();
                    accessor.setUser((Principal)()->userId);
                } else if(accessor.getCommand()==StompCommand.SEND || accessor.getCommand()==StompCommand.SUBSCRIBE) {
                    if(accessor.getUser()==null) throw new IllegalArgumentException("Authentication required");
                    String destination=accessor.getDestination();
                    if(destination==null || !destination.matches("/(app|topic)/room/[A-Z0-9]{6,12}")) throw new IllegalArgumentException("Invalid room destination");
                }
                return message;
            }
        });
    }
}
