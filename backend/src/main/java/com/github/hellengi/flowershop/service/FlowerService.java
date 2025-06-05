package com.github.hellengi.flowershop.service;

import com.github.hellengi.flowershop.entity.BouquetEntity;
import com.github.hellengi.flowershop.entity.FlowerEntity;
import com.github.hellengi.flowershop.repository.FlowerRepository;
import com.github.hellengi.flowershop.repository.ItemRepository;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

@Service
public class FlowerService {
    @Autowired
    private FlowerRepository flowerRepository;

    @Autowired
    private ItemRepository itemRepository;

    private final UserService userService;

    public FlowerService(UserService userService) {
        this.userService = userService;
    }

    public ResponseEntity<List<FlowerEntity>> getFlowers() {
        List<FlowerEntity> flowerList = flowerRepository.findFlowersOrderByTitle();
        return new ResponseEntity<>(flowerList, HttpStatus.OK);
    }

    public ResponseEntity<FlowerEntity> getFlowerById(Long id) {
        Optional<FlowerEntity> optionalFlower = flowerRepository.findById(id);
        if (optionalFlower.isPresent()) {
            FlowerEntity flower = optionalFlower.get();
            return new ResponseEntity<>(flower, HttpStatus.OK);
        }
        else {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
    }

    public ResponseEntity<List<FlowerEntity>> searchFlowers(String searchName, Integer minPrice, Integer maxPrice) {
        List<FlowerEntity> flowerList = flowerRepository.searchFlower(searchName, minPrice, maxPrice);
        return new ResponseEntity<>(flowerList, HttpStatus.OK);
    }

    public void createFlower(FlowerEntity flowerEntity, HttpSession session) {
        String role = userService.getAccountRole(session);
        if (!role.equals("admin")) return;
        flowerRepository.save(flowerEntity);
    }

    public void updateFlower(Long id, FlowerEntity flower, HttpSession session) {
        String role = userService.getAccountRole(session);
        if (!role.equals("admin")) return;
        String title;
        BigDecimal price;
        Optional<FlowerEntity> optionalFlower = flowerRepository.findById(id);
        if (optionalFlower.isPresent()) {
            if (flower.getTitle().isEmpty()) {
                title = optionalFlower.get().getTitle();
            } else {
                title = flower.getTitle();
            }
            if (flower.getPrice().compareTo(BigDecimal.valueOf(-1)) == 0) {
                price = optionalFlower.get().getPrice();
            } else {
                price = flower.getPrice();
            }
            flowerRepository.updateFlower(id, title, price);
        }
    }

    public void deleteFlower(Long id, HttpSession session) {
        String role = userService.getAccountRole(session);
        if (!role.equals("admin")) return;
        flowerRepository.deleteById(id);
    }
}
