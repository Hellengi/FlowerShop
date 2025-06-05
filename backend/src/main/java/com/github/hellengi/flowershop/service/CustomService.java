package com.github.hellengi.flowershop.service;

import com.github.hellengi.flowershop.dto.CustomFlowerDTO;
import com.github.hellengi.flowershop.entity.*;
import com.github.hellengi.flowershop.entity.id.CustomFlowerId;
import com.github.hellengi.flowershop.repository.CustomFlowerRepository;
import com.github.hellengi.flowershop.repository.CustomRepository;
import com.github.hellengi.flowershop.repository.FlowerRepository;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;

@Service
public class CustomService {
    @Autowired
    private CustomRepository customRepository;
    @Autowired
    private FlowerRepository flowerRepository;
    @Autowired
    private CustomFlowerRepository customFlowerRepository;

    private final AuthService authService;

    public CustomService(AuthService authService) {
        this.authService = authService;
    }

    public String createName(UserEntity user) {
        int num = 1;
        while (customRepository.existsByUserAndTitle(user, "Букет №" + num)) num++;
        return "Букет №" + num;
    }

    public ResponseEntity<List<CustomFlowerDTO>> getFlowersInCustom(HttpSession session) {
        UserEntity user = (UserEntity) session.getAttribute("user");
        if (user == null) {
            authService.logIn(session);
            user = (UserEntity) session.getAttribute("user");
        }
        CustomEntity custom = customRepository.findActiveCustomByUser(user);
        if (custom == null) throw new IllegalStateException("Active custom not found.");
        List<CustomFlowerEntity> flowersList = customFlowerRepository.findFlowersInCustom(custom);
        List<CustomFlowerDTO> dtoList = flowersList.stream()
                .map(cb -> new CustomFlowerDTO(
                        cb.getFlower().getId(),
                        cb.getFlower().getImage(),
                        cb.getFlower().getItem().getTitle(),
                        cb.getFlower().getItem().getDescription(),
                        cb.getFlower().getItem().getStock(),
                        cb.getFlower().getItem().getPrice(),
                        cb.getFlower().getItem().getStatus(),
                        cb.getQuantity()
                ))
                .toList();
        return new ResponseEntity<>(dtoList, HttpStatus.OK);
    }

    public void addFlowerToCustom(Long flowerId, Integer quantity, HttpSession session) {
        UserEntity user = (UserEntity) session.getAttribute("user");
        if (user == null) {
            authService.logIn(session);
            user = (UserEntity) session.getAttribute("user");
        }
        CustomEntity custom = customRepository.findActiveCustomByUser(user);
        if (custom == null) throw new IllegalStateException("Active custom not found.");
        FlowerEntity flower = flowerRepository.findById(flowerId)
                .orElseThrow(() -> new IllegalArgumentException("Flower not found."));
        CustomFlowerId id = new CustomFlowerId(custom.getId(), flower.getId());
        CustomFlowerEntity existing = customFlowerRepository.findById(id).orElse(null);
        if (existing != null) {
            existing.setQuantity(quantity);
            customFlowerRepository.save(existing);
        } else {
            CustomFlowerEntity newEntry = new CustomFlowerEntity(id, custom, flower, quantity);
            customFlowerRepository.save(newEntry);
        }
    }

    public Integer getAmountOfFlowerInCustom(Long flowerId, HttpSession session) {
        UserEntity user = (UserEntity) session.getAttribute("user");
        if (user == null) {
            authService.logIn(session);
            user = (UserEntity) session.getAttribute("user");
        }
        CustomEntity custom = customRepository.findActiveCustomByUser(user);
        if (custom == null) throw new IllegalStateException("Active custom not found.");
        CustomFlowerId id = new CustomFlowerId(custom.getId(), flowerId);
        CustomFlowerEntity existing = customFlowerRepository.findById(id).orElse(null);
        if (existing != null) {
            return existing.getQuantity();
        } else {
            return 0;
        }
    }

    public void setAmountForFlowerInCustom(Long flowerId, Integer quantity, HttpSession session) {
        UserEntity user = (UserEntity) session.getAttribute("user");
        if (user == null) {
            authService.logIn(session);
            user = (UserEntity) session.getAttribute("user");
        }
        CustomEntity custom = customRepository.findActiveCustomByUser(user);
        if (custom == null) throw new IllegalStateException("Active custom not found.");
        CustomFlowerId id = new CustomFlowerId(custom.getId(), flowerId);
        CustomFlowerEntity existing = customFlowerRepository.findById(id).orElse(null);
        if (existing != null) {
            existing.setQuantity(quantity);
            customFlowerRepository.save(existing);
        }
    }

    public String getCustomTitle(HttpSession session) {
        UserEntity user = (UserEntity) session.getAttribute("user");
        if (user == null) {
            authService.logIn(session);
            user = (UserEntity) session.getAttribute("user");
        }
        CustomEntity custom = customRepository.findActiveCustomByUser(user);
        return custom.getTitle();
    }

    public void setCustomTitle(String title, HttpSession session) {
        UserEntity user = (UserEntity) session.getAttribute("user");
        if (user == null) {
            authService.logIn(session);
            user = (UserEntity) session.getAttribute("user");
        }
        CustomEntity custom = customRepository.findActiveCustomByUser(user);
        custom.setTitle(title);
        customRepository.save(custom);
    }

    public void deleteCurrentCustom(HttpSession session) {
        HashMap<Long, Integer> customBouquet = new HashMap<>();
    }
}
