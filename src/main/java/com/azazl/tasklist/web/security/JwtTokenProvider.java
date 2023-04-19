package com.azazl.tasklist.web.security;

import com.azazl.tasklist.domain.exception.AccessDeniedException;
import com.azazl.tasklist.domain.user.Role;
import com.azazl.tasklist.domain.user.User;
import com.azazl.tasklist.service.UserService;
import com.azazl.tasklist.service.props.JwtProperties;
import com.azazl.tasklist.web.dto.auth.JwtResponse;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import jakarta.annotation.PostConstruct;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.util.Date;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class JwtTokenProvider {
   private final JwtProperties jwtProperties;
   private UserDetailsService userDetailsService;
   private final UserService userService;
   private  Key key;

   @PostConstruct
   public void init(){
      this.key = Keys.hmacShaKeyFor(jwtProperties.getSecret().getBytes());
   }
   public String createAccessToken(Long userId, String username, Set<Role> roles){
      Claims claims = Jwts.claims().setSubject(username);
      claims.put("id", userId);
      claims.put("roles", resolveRoles(roles));
      Date now = new Date();
      Date validity = new Date( now.getTime()+jwtProperties.getAccess());
      return  Jwts.builder()
              .setClaims(claims)
              .setIssuedAt(now)
              .setExpiration(validity)
              .signWith(key)
              .compact();
   }

   private List<String> resolveRoles(Set<Role> roles) {
      return roles.stream()
              .map(Enum::name)
              .collect(Collectors.toList());
   }
   public String createRefreshToken(Long userId, String username){
      Claims claims =  Jwts.claims().setSubject(username);
      claims.put("id", userId);
      Date now = new Date();
      Date validity = new Date( now.getTime()+jwtProperties.getRefresh());
      return  Jwts.builder()
              .setClaims(claims)
              .setIssuedAt(now)
              .setExpiration(validity)
              .signWith(key)
              .compact();
   }
   public JwtResponse refreshUserTokens(String refreshToken){
      JwtResponse jwtResponse = new JwtResponse();
      if(!validateToken(refreshToken)){
         throw new AccessDeniedException();
      }
      Long userId = Long.valueOf(getId(refreshToken));
      User user = userService.getById(userId);
      jwtResponse.setId(userId);
      jwtResponse.setUsername(user.getUsername());
      jwtResponse.setAccessToken(createAccessToken(userId, user.getName(), user.getRoles()));
      jwtResponse.setRefreshToken(createRefreshToken(userId, user.getName()));
      return jwtResponse;
   }
   public boolean validateToken(String token){
      Jws<Claims> claims = Jwts
              .parserBuilder()
              .setSigningKey(key)
              .build()
              .parseClaimsJws(token);
      return  !claims.getBody().getExpiration().before(new Date());
   }
   private String getId(String token){
      return Jwts
              .parserBuilder()
              .setSigningKey(key)
              .build()
              .parseClaimsJws(token)
              .getBody()
              .get("id")
              .toString();
   }
   private String getUsername(String token){
      return Jwts
              .parserBuilder()
              .setSigningKey(key)
              .build()
              .parseClaimsJws(token)
              .getBody()
              .getSubject();
   }
   public Authentication getAuthentication(String token) {
      String username = getUsername(token);
      UserDetails userDetails = userDetailsService.loadUserByUsername(username);
      return new UsernamePasswordAuthenticationToken(userDetails, "", userDetails.getAuthorities());
   }
}
