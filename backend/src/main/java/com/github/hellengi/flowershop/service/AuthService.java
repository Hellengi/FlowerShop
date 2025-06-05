package com.github.hellengi.flowershop.service;

import com.github.hellengi.flowershop.entity.CartEntity;
import com.github.hellengi.flowershop.entity.CustomEntity;
import com.github.hellengi.flowershop.entity.UserEntity;
import com.github.hellengi.flowershop.repository.CartRepository;
import com.github.hellengi.flowershop.repository.CustomRepository;
import com.github.hellengi.flowershop.repository.UserRepository;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AuthService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private CartRepository cartRepository;
    @Autowired
    private CustomRepository customRepository;

    public String createName(UserEntity user) {
        int num = 1;
        while (customRepository.existsByUserAndTitle(user, "Букет №" + num)) num++;
        return "Букет №" + num;
    }

    public Boolean signUp(UserEntity userEntity, HttpSession session) {
        String name = userEntity.getName();
        String email = userEntity.getEmail();
        String password = userEntity.getPassword();
        if (userRepository.existsByEmail(email)) {
            return false;
        }
        UserEntity user = new UserEntity(name, email, password);
        userRepository.save(user);
        CartEntity cart = new CartEntity(user);
        cartRepository.save(cart);
        String title = createName(user);
        CustomEntity customEntity = new CustomEntity(user, title);
        customRepository.save(customEntity);
        session.setAttribute("user", user);
        return true;
    }

    public void logIn(HttpSession session) {
        if (session.getAttribute("user") == null) {
            UserEntity user = userRepository.getUser("-");
            session.setAttribute("user", user);
        }
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
        logIn(session);
    }

    public Boolean isLogged(HttpSession session) {
        if (session.getAttribute("user") != null) {
            UserEntity user = (UserEntity) session.getAttribute("user");
            return !user.getEmail().equals("-");
        }
        return false;
    }
}
