package com.github.hellengi.flowershop.controller;
import java.util.ArrayList;

import com.github.hellengi.flowershop.entity.BouquetEntity;
import com.github.hellengi.flowershop.entity.FlowerEntity;
import com.github.hellengi.flowershop.repository.Repository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/")
public class Controller {
    @Autowired
    Repository repository;

    @GetMapping("/bouquets")
    public ResponseEntity<ArrayList<BouquetEntity>> getBouquets() {
        ArrayList<BouquetEntity> bouquetsList = new ArrayList<>();
        for (int i = 1; i <= 20; i++) {
            bouquetsList.add(new BouquetEntity("Bouquet-" + i, 2000, 60));
        }
        return new ResponseEntity<>(bouquetsList, HttpStatus.OK);
    }
    @GetMapping("/flowers")
    public ResponseEntity<ArrayList<FlowerEntity>> getFlowers() {
        ArrayList<FlowerEntity> flowerList = new ArrayList<>();
        for (int i = 1; i <= 20; i++) {
            flowerList.add(new FlowerEntity("Flower-" + i, 500, 60));
        }
        return new ResponseEntity<>(flowerList, HttpStatus.OK);
    }
    @GetMapping("/")
    public String method() {
        return ("Hi!");
    }
    @GetMapping("/hello")
    public String hello(@RequestParam(value = "name", defaultValue = "World") String name) {
        return String.format("Hello %s!", name);
    }
}
