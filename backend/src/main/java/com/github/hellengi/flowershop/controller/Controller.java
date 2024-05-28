package com.github.hellengi.flowershop.controller;
import java.util.ArrayList;
import java.util.Random;

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
    Random random = new Random();
    public Integer RandomPrice(boolean SingleFlower) {
        if (SingleFlower) {
            return (random.nextInt(26) + 5) * 10;
        }
        else {
            return (random.nextInt(26) + 15) * 100;
        }
    }
    @Autowired
    Repository repository;

    @GetMapping("/bouquets")
    public ResponseEntity<ArrayList<BouquetEntity>> getBouquets() {
        ArrayList<BouquetEntity> bouquetsList = new ArrayList<>();
        bouquetsList.add(new BouquetEntity("Герберы красные и желтые", RandomPrice(false), 60));
        bouquetsList.add(new BouquetEntity("Герберы красные и розовые", RandomPrice(false), 60));
        bouquetsList.add(new BouquetEntity("Герберы розовые", RandomPrice(false), 60));
        bouquetsList.add(new BouquetEntity("Герберы, хризантемы, розы", RandomPrice(false), 60));
        bouquetsList.add(new BouquetEntity("Гортензия", RandomPrice(false), 60));
        bouquetsList.add(new BouquetEntity("Ирисы синие и розы белые", RandomPrice(false), 60));
        bouquetsList.add(new BouquetEntity("Ирисы синие и розы розовые", RandomPrice(false), 60));
        bouquetsList.add(new BouquetEntity("Лизиантусы и орхидеи", RandomPrice(false), 60));
        bouquetsList.add(new BouquetEntity("Пионы розовые и белые", RandomPrice(false), 60));
        bouquetsList.add(new BouquetEntity("Розы багровые", RandomPrice(false), 60));
        bouquetsList.add(new BouquetEntity("Розы желтые", RandomPrice(false), 60));
        bouquetsList.add(new BouquetEntity("Розы и орхидеи", RandomPrice(false), 60));
        bouquetsList.add(new BouquetEntity("Розы красные", RandomPrice(false), 60));
        bouquetsList.add(new BouquetEntity("Розы красные и белые", RandomPrice(false), 60));
        bouquetsList.add(new BouquetEntity("Розы оранжевые", RandomPrice(false), 60));
        bouquetsList.add(new BouquetEntity("Розы розовые", RandomPrice(false), 60));
        bouquetsList.add(new BouquetEntity("Тюльпаны красные и белые", RandomPrice(false), 60));
        bouquetsList.add(new BouquetEntity("Тюльпаны розовые", RandomPrice(false), 60));
        bouquetsList.add(new BouquetEntity("Флорина", RandomPrice(false), 60));
        bouquetsList.add(new BouquetEntity("Флористика", RandomPrice(false), 60));
        bouquetsList.add(new BouquetEntity("Хризантемы белые и фиолетовые", RandomPrice(false), 60));
        bouquetsList.add(new BouquetEntity("Хризантемы розовые и зеленые", RandomPrice(false), 60));
        bouquetsList.add(new BouquetEntity("Эустома", RandomPrice(false), 60));
        return new ResponseEntity<>(bouquetsList, HttpStatus.OK);
    }
    @GetMapping("/flowers")
    public ResponseEntity<ArrayList<FlowerEntity>> getFlowers() {
        ArrayList<FlowerEntity> flowerList = new ArrayList<>();
        flowerList.add(new FlowerEntity("Альстометрия сиреневая", RandomPrice(true), 60));
        flowerList.add(new FlowerEntity("Георгина", RandomPrice(true), 60));
        flowerList.add(new FlowerEntity("Герберы белые", RandomPrice(true), 60));
        flowerList.add(new FlowerEntity("Герберы желтые", RandomPrice(true), 60));
        flowerList.add(new FlowerEntity("Герберы красные", RandomPrice(true), 60));
        flowerList.add(new FlowerEntity("Герберы розовые", RandomPrice(true), 60));
        flowerList.add(new FlowerEntity("Герберы фиолетовые", RandomPrice(true), 60));
        flowerList.add(new FlowerEntity("Гереберы оранжевые", RandomPrice(true), 60));
        flowerList.add(new FlowerEntity("Ирисы синие", RandomPrice(true), 60));
        flowerList.add(new FlowerEntity("Лизантусы белые", RandomPrice(true), 60));
        flowerList.add(new FlowerEntity("Магнолия", RandomPrice(true), 60));
        flowerList.add(new FlowerEntity("Обриета", RandomPrice(true), 60));
        flowerList.add(new FlowerEntity("Орхидеи синие", RandomPrice(true), 60));
        flowerList.add(new FlowerEntity("Пионы белые", RandomPrice(true), 60));
        flowerList.add(new FlowerEntity("Пионы розовые", RandomPrice(true), 60));
        flowerList.add(new FlowerEntity("Подсолнух", RandomPrice(true), 60));
        flowerList.add(new FlowerEntity("Розы белые", RandomPrice(true), 60));
        flowerList.add(new FlowerEntity("Розы красные", RandomPrice(true), 60));
        flowerList.add(new FlowerEntity("Розы розовые", RandomPrice(true), 60));
        flowerList.add(new FlowerEntity("Статица розовая", RandomPrice(true), 60));
        flowerList.add(new FlowerEntity("Тюльпан розовый", RandomPrice(true), 60));
        flowerList.add(new FlowerEntity("Тюльпаны бело-красные", RandomPrice(true), 60));
        flowerList.add(new FlowerEntity("Тюльпаны белые", RandomPrice(true), 60));
        flowerList.add(new FlowerEntity("Тюльпаны красные", RandomPrice(true), 60));
        flowerList.add(new FlowerEntity("Хризантемы белые", RandomPrice(true), 60));
        flowerList.add(new FlowerEntity("Хризантемы зеленые", RandomPrice(true), 60));
        flowerList.add(new FlowerEntity("Хризантемы кустовые", RandomPrice(true), 60));
        flowerList.add(new FlowerEntity("Хризантемы розовые", RandomPrice(true), 60));
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
