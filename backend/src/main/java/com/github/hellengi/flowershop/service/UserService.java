package com.github.hellengi.flowershop.service;

import com.github.hellengi.flowershop.entity.UserEntity;
import com.github.hellengi.flowershop.repository.AdminRepository;
import com.github.hellengi.flowershop.repository.UserRepository;
import com.github.hellengi.flowershop.repository.SellerRepository;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private SellerRepository sellerRepository;
    @Autowired
    private AdminRepository adminRepository;

    public Map<String, String> getAccount(HttpSession session) {
        UserEntity user = (UserEntity) session.getAttribute("user");
        if (user == null) throw new IllegalStateException("User is not logged in.");
        String role = getAccountRole(session);
        Map<String, String> account = new HashMap<>();
        account.put("name", user.getName());
        account.put("email", user.getEmail());
        account.put("password", user.getPassword());
        account.put("avatar", user.getAvatarUrl());
        account.put("role", role);
        return account;
    }

    public String getAccountRole(HttpSession session) {
        UserEntity user = (UserEntity) session.getAttribute("user");
        String role = "unauthorized";
        if (user != null) {
            role = "user";
            if (sellerRepository.check(user)) role = "seller";
            if (adminRepository.check(user)) role = "admin";
        }
        return role;
    }

    public void deleteAccount(HttpSession session) {
        UserEntity user = (UserEntity) session.getAttribute("user");
        userRepository.deleteUser(user);
        session.removeAttribute("user");
    }
}
