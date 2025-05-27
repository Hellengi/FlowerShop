package com.github.hellengi.flowershop.service;

import com.github.hellengi.flowershop.entity.BouquetEntity;
import com.github.hellengi.flowershop.entity.CustomEntity;
import com.github.hellengi.flowershop.entity.FlowerEntity;
import com.github.hellengi.flowershop.repository.BouquetRepository;
import com.github.hellengi.flowershop.repository.CustomRepository;
import com.github.hellengi.flowershop.repository.FlowerRepository;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class CartService {
    @Autowired
    private BouquetRepository bouquetRepository;
    @Autowired
    private FlowerRepository flowerRepository;
    @Autowired
    private CustomRepository customRepository;

    private final CustomService customService;

    public CartService(CustomService customService) {
        this.customService = customService;
    }

    public ResponseEntity<List<BouquetEntity>> getBouquetsInCart(HttpSession session) {
        List<BouquetEntity> bouquetsList = bouquetRepository.findSelectedBouquets();
        return new ResponseEntity<>(bouquetsList, HttpStatus.OK);
    }

    public void addBouquetToCart(Long id, HttpSession session) {
        return;
    }

    public void setAmountForBouquetInCart(Long id, Integer amount, HttpSession session) {
        Optional<BouquetEntity> optionalBouquet = bouquetRepository.findById(id);
        if (optionalBouquet.isPresent()) {
            BouquetEntity bouquet = optionalBouquet.get();
            bouquet.setAmount(amount);
            bouquetRepository.save(bouquet);
        }
    }

    public void removeBouquetFromCart(Long id, HttpSession session) {
        return;
    }

    public void addCustomToCart(HttpSession session) {
        HashMap<Long, Integer> customBouquet = customService.getFlowersInCustom(session);
        if (customBouquet.isEmpty()) return;
        int price = 0;
        List<CustomEntity> customList = customRepository.findAll();
        int num = 1;
        while (customRepository.containsTitle("Букет №" + num)) num++;
        String title = "Букет №" + num;
        String FinalFlower = "";
        for (Map.Entry<Long, Integer> entryFlower : customBouquet.entrySet()) {
            Optional<FlowerEntity> optionalFlower = flowerRepository.findById(entryFlower.getKey());
            if (optionalFlower.isPresent()) {
                FlowerEntity flower = optionalFlower.get();
                FinalFlower = FinalFlower.concat(flower.getTitle() + ":" + entryFlower.getValue() + ";");
                price += flower.getPrice() * entryFlower.getValue();
            }
        }
        FinalFlower = FinalFlower.substring(0, FinalFlower.length() - 1);
        customRepository.save(new CustomEntity(title, FinalFlower, price));
    }

    public ResponseEntity<List<CustomEntity>> getCustomBouquetsInCart(HttpSession session) {
        List<CustomEntity> customList = customRepository.findAll(Sort.by(Sort.Direction.ASC, "id"));
        return new ResponseEntity<>(customList, HttpStatus.OK);
    }

    public void setAmountForCustomBouquetInCart(Long id, Integer amount, HttpSession session) {
        return;
    }

    public void removeCustomBouquetFromCart(Long id, HttpSession session) {
        customRepository.deleteById(id);
    }
}
