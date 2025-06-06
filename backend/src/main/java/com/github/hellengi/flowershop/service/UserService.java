package com.github.hellengi.flowershop.service;

import com.github.hellengi.flowershop.dto.MessageDTO;
import com.github.hellengi.flowershop.dto.UserDTO;
import com.github.hellengi.flowershop.entity.AdminEntity;
import com.github.hellengi.flowershop.entity.SellerEntity;
import com.github.hellengi.flowershop.entity.UserEntity;
import com.github.hellengi.flowershop.repository.AdminRepository;
import com.github.hellengi.flowershop.repository.UserRepository;
import com.github.hellengi.flowershop.repository.SellerRepository;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private SellerRepository sellerRepository;
    @Autowired
    private AdminRepository adminRepository;

    public ResponseEntity<UserDTO> getUser(@PathVariable("id") Long id) {
        Optional<UserEntity> optionalUser = userRepository.findById(id);
        if (optionalUser.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        UserEntity user = optionalUser.get();
        Optional<AdminEntity> admin = adminRepository.findByUserId(user.getId());
        Optional<SellerEntity> seller = sellerRepository.findByUserId(user.getId());
        UserDTO userDTO = new UserDTO(
                user.getId(),
                user.getName(),
                user.getEmail(),
                user.getDateRegistration(),
                user.getAvatarUrl(),
                admin.map(AdminEntity::getId).orElse(-1L),
                seller.map(SellerEntity::getId).orElse(-1L),
                seller.map(SellerEntity::getName).orElse("")
        );
        return ResponseEntity.ok(userDTO);
    }

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
        String role = "guest";
        if (user != null && !user.getEmail().equals("-")) {
            role = "user";
            if (sellerRepository.existsByUser(user)) role = "seller";
            if (adminRepository.existsByUser(user)) role = "admin";
        }
        return role;
    }

    public void deleteAccount(HttpSession session) {
        UserEntity user = (UserEntity) session.getAttribute("user");
        userRepository.deleteUser(user);
        session.removeAttribute("user");
    }
}
