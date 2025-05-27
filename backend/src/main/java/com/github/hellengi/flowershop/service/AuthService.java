package com.github.hellengi.flowershop.service;

import com.github.hellengi.flowershop.entity.ClientEntity;
import com.github.hellengi.flowershop.repository.ClientRepository;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AuthService {
    @Autowired
    private ClientRepository clientRepository;

    public Boolean signUp(ClientEntity clientEntity, HttpSession session) {
        String name = clientEntity.getName();
        String email = clientEntity.getEmail();
        String password = clientEntity.getPassword();
        ClientEntity client = new ClientEntity(name, email, password);
        if (clientRepository.existsByEmail(email)) {
            return false;
        }
        clientRepository.save(client);
        session.setAttribute("client", client);
        return true;
    }

    public Boolean logIn(ClientEntity clientEntity, HttpSession session) {
        String email = clientEntity.getEmail();
        String password = clientEntity.getPassword();
        ClientEntity client = clientRepository.checkPassword(email, password);
        if (client == null) {
            return false;
        }
        session.setAttribute("client", client);
        return true;
    }

    public void logOut(HttpSession session) {
        session.removeAttribute("client");
    }

    public Boolean isLogged(HttpSession session) {
        return session.getAttribute("client") != null;
    }
}
