package com.github.hellengi.flowershop.config;

import com.github.hellengi.flowershop.entity.*;
import com.github.hellengi.flowershop.repository.*;
import jakarta.annotation.PostConstruct;
import jakarta.transaction.Transactional;
import jdk.dynalink.linker.LinkerServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
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
    @Autowired
    private SellerRepository sellerRepository;
    @Autowired
    private CartRepository cartRepository;
    @Autowired
    private CustomRepository customRepository;

    Random random = new Random();
    public BigDecimal RandomBouquetPrice() {
        return BigDecimal.valueOf((random.nextInt(26) + 15) * 100);
    }
    public BigDecimal RandomFlowerPrice() {
        return BigDecimal.valueOf((random.nextInt(26) + 5) * 10);
    }

    @PostConstruct
    @Transactional
    public void init() {
        String email = "admin@gmail.com";
        String nameLegal = "Flower Shop";
        UserEntity superUser;

        if (!userRepository.existsByEmail(email)) {
            superUser = new UserEntity("admin", email, "password");
            superUser = userRepository.save(superUser);
        } else {
            superUser = userRepository.getUser(email);
        }

        if (!cartRepository.existsActiveCartByUser(superUser)) {
            CartEntity cart = new CartEntity(superUser);
            cartRepository.save(cart);
        }

        if (!customRepository.existsActiveCustomByUser(superUser)) {
            String title = "Букет №1";
            CustomEntity customEntity = new CustomEntity(superUser, title);
            customRepository.save(customEntity);
        }

        if (!adminRepository.existsByEmail(email)) {
            AdminEntity admin = new AdminEntity(superUser);
            adminRepository.save(admin);
        }

        if (!sellerRepository.existsByName(nameLegal)) {
            if (sellerRepository.existsByEmail(email)) {
                sellerRepository.deleteByEmail(email);
            }
            SellerEntity mainSeller = new SellerEntity(superUser, nameLegal);
            sellerRepository.save(mainSeller);
        }

        SellerEntity mainSeller = sellerRepository.findByUser(superUser);

        String guestEmail = "-";
        UserEntity guest;

        if (!userRepository.existsByEmail(guestEmail)) {
            guest = new UserEntity("guest", guestEmail, "-");
            userRepository.save(guest);
        } else {
            guest = userRepository.getUser(guestEmail);
        }

        if (!cartRepository.existsActiveCartByUser(guest)) {
            CartEntity cart = new CartEntity(guest);
            cartRepository.save(cart);
        }

        if (!customRepository.existsActiveCustomByUser(guest)) {
            String title = "Букет №1";
            CustomEntity customEntity = new CustomEntity(guest, title);
            customRepository.save(customEntity);
        }

        List<SellerEntity> sellerList = new ArrayList<>();
        for (int i = 1; i <= 5; i++) {
            String sellerEmail = "seller_" + i + "@gmail.com";
            UserEntity user;
            if (!userRepository.existsByEmail(sellerEmail)) {
                user = new UserEntity("seller_" + i, sellerEmail, "password");
                userRepository.save(user);
            } else {
                user = userRepository.getUser(sellerEmail);
            }
            if (!cartRepository.existsActiveCartByUser(user)) {
                CartEntity cart = new CartEntity(user);
                cartRepository.save(cart);
            }
            if (!customRepository.existsActiveCustomByUser(user)) {
                String title = "Букет №1";
                CustomEntity customEntity = new CustomEntity(user, title);
                customRepository.save(customEntity);
            }
            SellerEntity seller;
            if (!sellerRepository.existsByEmail(sellerEmail)) {
                seller = new SellerEntity(user, "Seller #" + i);
                sellerRepository.save(seller);
            }
            else {
                seller = (sellerRepository.findByUser(user));
            }
            sellerList.add(seller);
        }

        if (bouquetRepository.count() == 0) {
            bouquetRepository.save(new BouquetEntity(sellerList.get(random.nextInt(sellerList.size())), "Герберы красные и желтые", RandomBouquetPrice(), 7, "red_and_yellow_gerberas.jpg"));
            bouquetRepository.save(new BouquetEntity(sellerList.get(random.nextInt(sellerList.size())), "Герберы красные и розовые", RandomBouquetPrice(), 7, "red_and_pink_gerberas.jpg"));
            bouquetRepository.save(new BouquetEntity(sellerList.get(random.nextInt(sellerList.size())), "Герберы розовые", RandomBouquetPrice(), 7, "pink_gerberas.jpg"));
            bouquetRepository.save(new BouquetEntity(sellerList.get(random.nextInt(sellerList.size())), "Герберы, хризантемы, розы", RandomBouquetPrice(), 7, "gerberas_chrysanthemums_roses.jpg"));
            bouquetRepository.save(new BouquetEntity(sellerList.get(random.nextInt(sellerList.size())), "Гортензия", RandomBouquetPrice(), 7, "hydrangea.jpg"));
            bouquetRepository.save(new BouquetEntity(sellerList.get(random.nextInt(sellerList.size())), "Ирисы синие и розы белые", RandomBouquetPrice(), 7, "blue_irises_white_roses.jpg"));
            bouquetRepository.save(new BouquetEntity(sellerList.get(random.nextInt(sellerList.size())), "Ирисы синие и розы розовые", RandomBouquetPrice(), 7, "blue_irises_pink_roses.jpg"));
            bouquetRepository.save(new BouquetEntity(sellerList.get(random.nextInt(sellerList.size())), "Лизиантусы и орхидеи", RandomBouquetPrice(), 7, "lisianthus_orchids.jpg"));
            bouquetRepository.save(new BouquetEntity(sellerList.get(random.nextInt(sellerList.size())), "Пионы розовые и белые", RandomBouquetPrice(), 7, "pink_and_white_peonies.jpg"));
            bouquetRepository.save(new BouquetEntity(sellerList.get(random.nextInt(sellerList.size())), "Розы багровые", RandomBouquetPrice(), 7, "crimson_roses.jpg"));
            bouquetRepository.save(new BouquetEntity(sellerList.get(random.nextInt(sellerList.size())), "Розы желтые", RandomBouquetPrice(), 7, "yellow_roses.jpg"));
            bouquetRepository.save(new BouquetEntity(sellerList.get(random.nextInt(sellerList.size())), "Розы и орхидеи", RandomBouquetPrice(), 7, "roses_orchids.jpg"));
            bouquetRepository.save(new BouquetEntity(sellerList.get(random.nextInt(sellerList.size())), "Розы красные", RandomBouquetPrice(), 7, "red_roses.jpg"));
            bouquetRepository.save(new BouquetEntity(sellerList.get(random.nextInt(sellerList.size())), "Розы красные и белые", RandomBouquetPrice(), 7, "red_and_white_roses.jpg"));
            bouquetRepository.save(new BouquetEntity(sellerList.get(random.nextInt(sellerList.size())), "Розы оранжевые", RandomBouquetPrice(), 7, "orange_roses.jpg"));
            bouquetRepository.save(new BouquetEntity(sellerList.get(random.nextInt(sellerList.size())), "Розы розовые", RandomBouquetPrice(), 7, "pink_roses.jpg"));
            bouquetRepository.save(new BouquetEntity(sellerList.get(random.nextInt(sellerList.size())), "Тюльпаны красные и белые", RandomBouquetPrice(), 7, "red_and_white_tulips.jpg"));
            bouquetRepository.save(new BouquetEntity(sellerList.get(random.nextInt(sellerList.size())), "Тюльпаны розовые", RandomBouquetPrice(), 7, "pink_tulips.jpg"));
            bouquetRepository.save(new BouquetEntity(sellerList.get(random.nextInt(sellerList.size())), "Флорина", RandomBouquetPrice(), 7, "florina.jpg"));
            bouquetRepository.save(new BouquetEntity(sellerList.get(random.nextInt(sellerList.size())), "Флористика", RandomBouquetPrice(), 7, "floristry.jpg"));
            bouquetRepository.save(new BouquetEntity(sellerList.get(random.nextInt(sellerList.size())), "Хризантемы белые и фиолетовые", RandomBouquetPrice(), 7, "white_and_purple_chrysanthemums.jpg"));
            bouquetRepository.save(new BouquetEntity(sellerList.get(random.nextInt(sellerList.size())), "Хризантемы розовые и зеленые", RandomBouquetPrice(), 7, "pink_and_green_chrysanthemums.jpg"));
            bouquetRepository.save(new BouquetEntity(sellerList.get(random.nextInt(sellerList.size())), "Эустома", RandomBouquetPrice(), 7, "eustoma.jpg"));
        }

        if (flowerRepository.count() == 0) {
            flowerRepository.save(new FlowerEntity(sellerList.get(random.nextInt(sellerList.size())), "Альстометрия сиреневая", RandomFlowerPrice(), 7, "purple_alstroemeria.jpg"));
            flowerRepository.save(new FlowerEntity(sellerList.get(random.nextInt(sellerList.size())), "Георгина", RandomFlowerPrice(), 7, "dahlia.jpg"));
            flowerRepository.save(new FlowerEntity(sellerList.get(random.nextInt(sellerList.size())), "Герберы белые", RandomFlowerPrice(), 7, "white_gerberas.jpg"));
            flowerRepository.save(new FlowerEntity(sellerList.get(random.nextInt(sellerList.size())), "Герберы желтые", RandomFlowerPrice(), 7, "yellow_gerberas.jpg"));
            flowerRepository.save(new FlowerEntity(sellerList.get(random.nextInt(sellerList.size())), "Герберы красные", RandomFlowerPrice(), 7, "red_gerberas.jpg"));
            flowerRepository.save(new FlowerEntity(sellerList.get(random.nextInt(sellerList.size())), "Герберы оранжевые", RandomFlowerPrice(), 7, "orange_gerberas.jpg"));
            flowerRepository.save(new FlowerEntity(sellerList.get(random.nextInt(sellerList.size())), "Герберы розовые", RandomFlowerPrice(), 7, "pink_gerberas.jpg"));
            flowerRepository.save(new FlowerEntity(sellerList.get(random.nextInt(sellerList.size())), "Герберы фиолетовые", RandomFlowerPrice(), 7, "purple_gerberas.jpg"));
            flowerRepository.save(new FlowerEntity(sellerList.get(random.nextInt(sellerList.size())), "Ирисы синие", RandomFlowerPrice(), 7, "blue_irises.jpg"));
            flowerRepository.save(new FlowerEntity(sellerList.get(random.nextInt(sellerList.size())), "Лизантусы белые", RandomFlowerPrice(), 7, "white_lisianthus.jpg"));
            flowerRepository.save(new FlowerEntity(sellerList.get(random.nextInt(sellerList.size())), "Магнолия", RandomFlowerPrice(), 7, "magnolia.jpg"));
            flowerRepository.save(new FlowerEntity(sellerList.get(random.nextInt(sellerList.size())), "Обриета", RandomFlowerPrice(), 7, "aubrieta.jpg"));
            flowerRepository.save(new FlowerEntity(sellerList.get(random.nextInt(sellerList.size())), "Орхидеи синие", RandomFlowerPrice(), 7, "blue_orchids.jpg"));
            flowerRepository.save(new FlowerEntity(sellerList.get(random.nextInt(sellerList.size())), "Пионы белые", RandomFlowerPrice(), 7, "white_peonies.jpg"));
            flowerRepository.save(new FlowerEntity(sellerList.get(random.nextInt(sellerList.size())), "Пионы розовые", RandomFlowerPrice(), 7, "pink_peonies.jpg"));
            flowerRepository.save(new FlowerEntity(sellerList.get(random.nextInt(sellerList.size())), "Подсолнух", RandomFlowerPrice(), 7, "sunflower.jpg"));
            flowerRepository.save(new FlowerEntity(sellerList.get(random.nextInt(sellerList.size())), "Розы белые", RandomFlowerPrice(), 7, "white_roses.jpg"));
            flowerRepository.save(new FlowerEntity(sellerList.get(random.nextInt(sellerList.size())), "Розы красные", RandomFlowerPrice(), 7, "red_roses.jpg"));
            flowerRepository.save(new FlowerEntity(sellerList.get(random.nextInt(sellerList.size())), "Розы розовые", RandomFlowerPrice(), 7, "pink_roses.jpg"));
            flowerRepository.save(new FlowerEntity(sellerList.get(random.nextInt(sellerList.size())), "Статица розовая", RandomFlowerPrice(), 7, "pink_statice.jpg"));
            flowerRepository.save(new FlowerEntity(sellerList.get(random.nextInt(sellerList.size())), "Тюльпан розовый", RandomFlowerPrice(), 7, "pink_tulip.jpg"));
            flowerRepository.save(new FlowerEntity(sellerList.get(random.nextInt(sellerList.size())), "Тюльпаны бело-красные", RandomFlowerPrice(), 7, "white_red_tulips.jpg"));
            flowerRepository.save(new FlowerEntity(sellerList.get(random.nextInt(sellerList.size())), "Тюльпаны белые", RandomFlowerPrice(), 7, "white_tulips.jpg"));
            flowerRepository.save(new FlowerEntity(sellerList.get(random.nextInt(sellerList.size())), "Тюльпаны красные", RandomFlowerPrice(), 7, "red_tulips.jpg"));
            flowerRepository.save(new FlowerEntity(sellerList.get(random.nextInt(sellerList.size())), "Хризантемы белые", RandomFlowerPrice(), 7, "white_chrysanthemums.jpg"));
            flowerRepository.save(new FlowerEntity(sellerList.get(random.nextInt(sellerList.size())), "Хризантемы зеленые", RandomFlowerPrice(), 7, "green_chrysanthemums.jpg"));
            flowerRepository.save(new FlowerEntity(sellerList.get(random.nextInt(sellerList.size())), "Хризантемы кустовые", RandomFlowerPrice(), 7, "bushy_chrysanthemums.jpg"));
            flowerRepository.save(new FlowerEntity(sellerList.get(random.nextInt(sellerList.size())), "Хризантемы розовые", RandomFlowerPrice(), 7, "pink_chrysanthemums.jpg"));
            flowerRepository.save(new FlowerEntity(sellerList.get(random.nextInt(sellerList.size())), "Хризантемы фиолетовые", RandomFlowerPrice(), 7, "purple_chrysanthemums.jpg"));
        }
    }
}
