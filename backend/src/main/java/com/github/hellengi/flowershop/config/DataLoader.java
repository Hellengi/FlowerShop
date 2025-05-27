package com.github.hellengi.flowershop.config;

import com.github.hellengi.flowershop.entity.AdminEntity;
import com.github.hellengi.flowershop.entity.BouquetEntity;
import com.github.hellengi.flowershop.entity.UserEntity;
import com.github.hellengi.flowershop.entity.FlowerEntity;
import com.github.hellengi.flowershop.repository.*;
import jakarta.annotation.PostConstruct;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Random;

@Component
public class DataLoader {
    @Autowired
    private BouquetRepository bouquetRepository;
    @Autowired
    private FlowerRepository flowerRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private AdminRepository adminRepository;

    Random random = new Random();
    public Integer RandomBouquetPrice(boolean SingleFlower) {
        return (random.nextInt(26) + 15) * 100;
    }
    public Integer RandomFlowerPrice(boolean SingleFlower) {
        return (random.nextInt(26) + 5) * 10;
    }

    @PostConstruct
    @Transactional
    public void init() {
        if (bouquetRepository.count() == 0 && flowerRepository.count() == 0) {
            bouquetRepository.save(new BouquetEntity("Герберы красные и желтые", RandomBouquetPrice(false), 0));
            bouquetRepository.save(new BouquetEntity("Герберы красные и розовые", RandomBouquetPrice(false), 0));
            bouquetRepository.save(new BouquetEntity("Герберы розовые", RandomBouquetPrice(false), 0));
            bouquetRepository.save(new BouquetEntity("Герберы, хризантемы, розы", RandomBouquetPrice(false), 0));
            bouquetRepository.save(new BouquetEntity("Гортензия", RandomBouquetPrice(false), 0));
            bouquetRepository.save(new BouquetEntity("Ирисы синие и розы белые", RandomBouquetPrice(false), 0));
            bouquetRepository.save(new BouquetEntity("Ирисы синие и розы розовые", RandomBouquetPrice(false), 0));
            bouquetRepository.save(new BouquetEntity("Лизиантусы и орхидеи", RandomBouquetPrice(false), 0));
            bouquetRepository.save(new BouquetEntity("Пионы розовые и белые", RandomBouquetPrice(false), 0));
            bouquetRepository.save(new BouquetEntity("Розы багровые", RandomBouquetPrice(false), 0));
            bouquetRepository.save(new BouquetEntity("Розы желтые", RandomBouquetPrice(false), 0));
            bouquetRepository.save(new BouquetEntity("Розы и орхидеи", RandomBouquetPrice(false), 0));
            bouquetRepository.save(new BouquetEntity("Розы красные", RandomBouquetPrice(false), 0));
            bouquetRepository.save(new BouquetEntity("Розы красные и белые", RandomBouquetPrice(false), 0));
            bouquetRepository.save(new BouquetEntity("Розы оранжевые", RandomBouquetPrice(false), 0));
            bouquetRepository.save(new BouquetEntity("Розы розовые", RandomBouquetPrice(false), 0));
            bouquetRepository.save(new BouquetEntity("Тюльпаны красные и белые", RandomBouquetPrice(false), 0));
            bouquetRepository.save(new BouquetEntity("Тюльпаны розовые", RandomBouquetPrice(false), 0));
            bouquetRepository.save(new BouquetEntity("Флорина", RandomBouquetPrice(false), 0));
            bouquetRepository.save(new BouquetEntity("Флористика", RandomBouquetPrice(false), 0));
            bouquetRepository.save(new BouquetEntity("Хризантемы белые и фиолетовые", RandomBouquetPrice(false), 0));
            bouquetRepository.save(new BouquetEntity("Хризантемы розовые и зеленые", RandomBouquetPrice(false), 0));
            bouquetRepository.save(new BouquetEntity("Эустома", RandomBouquetPrice(false), 0));
            flowerRepository.save(new FlowerEntity("Альстометрия сиреневая", RandomFlowerPrice(true)));
            flowerRepository.save(new FlowerEntity("Георгина", RandomFlowerPrice(true)));
            flowerRepository.save(new FlowerEntity("Герберы белые", RandomFlowerPrice(true)));
            flowerRepository.save(new FlowerEntity("Герберы желтые", RandomFlowerPrice(true)));
            flowerRepository.save(new FlowerEntity("Герберы красные", RandomFlowerPrice(true)));
            flowerRepository.save(new FlowerEntity("Герберы розовые", RandomFlowerPrice(true)));
            flowerRepository.save(new FlowerEntity("Герберы фиолетовые", RandomFlowerPrice(true)));
            flowerRepository.save(new FlowerEntity("Герберы оранжевые", RandomFlowerPrice(true)));
            flowerRepository.save(new FlowerEntity("Ирисы синие", RandomFlowerPrice(true)));
            flowerRepository.save(new FlowerEntity("Лизантусы белые", RandomFlowerPrice(true)));
            flowerRepository.save(new FlowerEntity("Магнолия", RandomFlowerPrice(true)));
            flowerRepository.save(new FlowerEntity("Обриета", RandomFlowerPrice(true)));
            flowerRepository.save(new FlowerEntity("Орхидеи синие", RandomFlowerPrice(true)));
            flowerRepository.save(new FlowerEntity("Пионы белые", RandomFlowerPrice(true)));
            flowerRepository.save(new FlowerEntity("Пионы розовые", RandomFlowerPrice(true)));
            flowerRepository.save(new FlowerEntity("Подсолнух", RandomFlowerPrice(true)));
            flowerRepository.save(new FlowerEntity("Розы белые", RandomFlowerPrice(true)));
            flowerRepository.save(new FlowerEntity("Розы красные", RandomFlowerPrice(true)));
            flowerRepository.save(new FlowerEntity("Розы розовые", RandomFlowerPrice(true)));
            flowerRepository.save(new FlowerEntity("Статица розовая", RandomFlowerPrice(true)));
            flowerRepository.save(new FlowerEntity("Тюльпан розовый", RandomFlowerPrice(true)));
            flowerRepository.save(new FlowerEntity("Тюльпаны бело-красные", RandomFlowerPrice(true)));
            flowerRepository.save(new FlowerEntity("Тюльпаны белые", RandomFlowerPrice(true)));
            flowerRepository.save(new FlowerEntity("Тюльпаны красные", RandomFlowerPrice(true)));
            flowerRepository.save(new FlowerEntity("Хризантемы белые", RandomFlowerPrice(true)));
            flowerRepository.save(new FlowerEntity("Хризантемы зеленые", RandomFlowerPrice(true)));
            flowerRepository.save(new FlowerEntity("Хризантемы кустовые", RandomFlowerPrice(true)));
            flowerRepository.save(new FlowerEntity("Хризантемы розовые", RandomFlowerPrice(true)));
        }
        String email = "admin@gmail.com";
        UserEntity user;

        if (!userRepository.existsByEmail(email)) {
            user = new UserEntity("admin", email, "password");
            user = userRepository.save(user);
        } else {
            user = userRepository.getUser(email);
        }

        if (!adminRepository.existsByEmail(email)) {
            AdminEntity admin = new AdminEntity(user);
            adminRepository.save(admin);
        }
    }
}
