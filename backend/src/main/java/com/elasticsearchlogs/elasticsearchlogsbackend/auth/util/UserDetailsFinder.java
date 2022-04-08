package com.elasticsearchlogs.elasticsearchlogsbackend.auth.util;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Collections;

@Service
public class UserDetailsFinder implements UserDetailsService {

    private static final Logger LOG = LoggerFactory.getLogger(UserDetailsFinder.class);

    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    @Value("${user.username}")
    public String username;

    @Value("${user.password}")
    public String password;

    public UserDetailsFinder(BCryptPasswordEncoder bCryptPasswordEncoder) {
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        if (!this.username.equals(username)){
            LOG.info("The provided user wasn't found in the system");
            throw new UsernameNotFoundException("User not found!");
        }

        return new User(
                this.username,
                this.password,
                Collections.singletonList(new SimpleGrantedAuthority("ROLE_USER")));
    }
}
