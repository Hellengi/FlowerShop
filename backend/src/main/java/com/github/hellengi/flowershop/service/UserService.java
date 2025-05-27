package com.github.hellengi.flowershop.service;

import com.github.hellengi.flowershop.entity.ClientEntity;
import com.github.hellengi.flowershop.repository.AdminRepository;
import com.github.hellengi.flowershop.repository.ClientRepository;
import com.github.hellengi.flowershop.repository.SellerRepository;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class UserService {
    @Autowired
    private ClientRepository clientRepository;
    @Autowired
    private SellerRepository sellerRepository;
    @Autowired
    private AdminRepository adminRepository;

    public Map<String, String> getAccount(HttpSession session) {
        ClientEntity client = (ClientEntity) session.getAttribute("client");
        if (client == null) throw new IllegalStateException("User is not logged in.");
        String role = getAccountRole(session);
        Map<String, String> account = new HashMap<>();
        account.put("name", client.getName());
        account.put("email", client.getEmail());
        account.put("password", client.getPassword());
        account.put("avatar", client.getAvatar());
        account.put("role", role);
        return account;
    }

    public String getAccountRole(HttpSession session) {
        ClientEntity client = (ClientEntity) session.getAttribute("client");
        String role = "unauthorized";
        if (client != null) {
            role = "client";
            if (sellerRepository.check(client)) role = "seller";
            if (adminRepository.check(client)) role = "admin";
        }
        return role;
    }

    public void deleteAccount(HttpSession session) {
        ClientEntity client = (ClientEntity) session.getAttribute("client");
        clientRepository.dropClient(client);
        session.removeAttribute("client");
    }
}
