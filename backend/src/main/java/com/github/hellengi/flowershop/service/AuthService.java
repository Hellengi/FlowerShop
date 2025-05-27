package com.github.hellengi.flowershop.service;

import com.github.hellengi.flowershop.entity.UserEntity;
import com.github.hellengi.flowershop.repository.UserRepository;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AuthService {
    @Autowired
    private UserRepository userRepository;

    public Boolean signUp(UserEntity userEntity, HttpSession session) {
        String name = userEntity.getName();
        String email = userEntity.getEmail();
        String password = userEntity.getPassword();
        UserEntity user = new UserEntity(name, email, password);
        if (userRepository.existsByEmail(email)) {
            return false;
        }
        userRepository.save(user);
        session.setAttribute("user", user);
        return true;
    }

    public Boolean logIn(UserEntity userEntity, HttpSession session) {
        String email = userEntity.getEmail();
        String password = userEntity.getPassword();
        UserEntity user = userRepository.checkPassword(email, password);
        if (user == null) {
            return false;
        }
        session.setAttribute("user", user);
        return true;
    }

    public void logOut(HttpSession session) {
        session.removeAttribute("user");
    }

    public Boolean isLogged(HttpSession session) {
        return session.getAttribute("user") != null;
    }
}
