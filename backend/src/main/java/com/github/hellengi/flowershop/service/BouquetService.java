package com.github.hellengi.flowershop.service;

import com.github.hellengi.flowershop.entity.BouquetEntity;
import com.github.hellengi.flowershop.repository.BouquetRepository;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BouquetService {
    @Autowired
    private BouquetRepository bouquetRepository;

    private final UserService userService;

    public BouquetService(UserService userService) {
        this.userService = userService;
    }

    public ResponseEntity<List<BouquetEntity>> getBouquets() {
        List<BouquetEntity> bouquetsList = bouquetRepository.findAll(Sort.by(Sort.Direction.ASC, "title"));
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

    public void createBouquet(BouquetEntity bouquetEntity, HttpSession session) {
        String role = userService.getAccountRole(session);
        if (!role.equals("admin")) return;
        bouquetRepository.save(bouquetEntity);
    }

    public void updateBouquet(Long id, BouquetEntity bouquetEntity, HttpSession session) {
        String role = userService.getAccountRole(session);
        if (!role.equals("admin")) return;
        if (bouquetEntity.getTitle().isEmpty()) {
            bouquetRepository.findById(id).ifPresent(existingBouquet ->
                    bouquetEntity.setTitle(existingBouquet.getTitle())
            );
        }
        if (bouquetEntity.getPrice() == -1) {
            bouquetRepository.findById(id).ifPresent(existingBouquet ->
                    bouquetEntity.setPrice(existingBouquet.getPrice())
            );
        }
        bouquetRepository.update(bouquetEntity, id);
    }

    public void deleteBouquet(Long id, HttpSession session) {
        String role = userService.getAccountRole(session);
        if (!role.equals("admin")) return;
        bouquetRepository.deleteById(id);
    }
}
