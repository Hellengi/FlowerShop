package com.github.hellengi.flowershop.service;

import com.github.hellengi.flowershop.entity.BouquetEntity;
import com.github.hellengi.flowershop.repository.BouquetRepository;
import com.github.hellengi.flowershop.repository.ItemRepository;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

@Service
public class BouquetService {
    @Autowired
    private BouquetRepository bouquetRepository;

    @Autowired
    private ItemRepository itemRepository;

    private final UserService userService;

    public BouquetService(UserService userService) {
        this.userService = userService;
    }

    public ResponseEntity<List<BouquetEntity>> getBouquets() {
        List<BouquetEntity> bouquetsList = bouquetRepository.findBouquetsOrderByTitle();
        return new ResponseEntity<>(bouquetsList, HttpStatus.OK);
    }

    public ResponseEntity<BouquetEntity> getBouquetById(Long id) {
        Optional<BouquetEntity> optionalBouquet = bouquetRepository.findById(id);
        if (optionalBouquet.isPresent()) {
            BouquetEntity bouquet = optionalBouquet.get();
            return new ResponseEntity<>(bouquet, HttpStatus.OK);
        }
        else {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
    }

    public ResponseEntity<List<BouquetEntity>> searchBouquets(String searchName, Integer minPrice, Integer maxPrice) {
        List<BouquetEntity> bouquetList = bouquetRepository.searchBouquet(searchName, minPrice, maxPrice);
        return new ResponseEntity<>(bouquetList, HttpStatus.OK);
    }

    public void createBouquet(BouquetEntity bouquet, HttpSession session) {
        String role = userService.getAccountRole(session);
        if (!role.equals("admin")) return;
        bouquetRepository.save(bouquet);
    }

    public void updateBouquet(Long id, BouquetEntity bouquet, HttpSession session) {
        String role = userService.getAccountRole(session);
        if (!role.equals("admin")) return;
        String title;
        BigDecimal price;
        Optional<BouquetEntity> optionalBouquet = bouquetRepository.findById(id);
        if (optionalBouquet.isPresent()) {
            if (bouquet.getTitle().isEmpty()) {
                title = optionalBouquet.get().getTitle();
            } else {
                title = bouquet.getTitle();
            }
            if (bouquet.getPrice().compareTo(BigDecimal.valueOf(-1)) == 0) {
                price = optionalBouquet.get().getPrice();
            } else {
                price = bouquet.getPrice();
            }
            bouquetRepository.updateBouquet(id, title, price);
        }
    }

    public void deleteBouquet(Long id, HttpSession session) {
        String role = userService.getAccountRole(session);
        if (!role.equals("admin")) return;
        bouquetRepository.deleteById(id);
    }
}
