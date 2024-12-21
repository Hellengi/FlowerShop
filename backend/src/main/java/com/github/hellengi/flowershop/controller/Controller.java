package com.github.hellengi.flowershop.controller;
import java.util.*;
import java.util.logging.Filter;

import com.github.hellengi.flowershop.entity.BouquetEntity;
import com.github.hellengi.flowershop.entity.CustomEntity;
import com.github.hellengi.flowershop.entity.FlowerEntity;
import com.github.hellengi.flowershop.entity.ClientEntity;
import com.github.hellengi.flowershop.entity.SellerEntity;
import com.github.hellengi.flowershop.entity.AdminEntity;
import com.github.hellengi.flowershop.repository.BouquetRepository;
import com.github.hellengi.flowershop.repository.CustomRepository;
import com.github.hellengi.flowershop.repository.FlowerRepository;
import com.github.hellengi.flowershop.repository.ClientRepository;
import com.github.hellengi.flowershop.repository.SellerRepository;
import com.github.hellengi.flowershop.repository.AdminRepository;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/")
public class Controller {
    Random random = new Random();
    public Integer RandomBouquetPrice(boolean SingleFlower) {
        return (random.nextInt(26) + 15) * 100;
    }

    public Integer RandomFlowerPrice(boolean SingleFlower) {
        return (random.nextInt(26) + 5) * 10;
    }

    @Autowired
    private BouquetRepository bouquetRepository;
    @Autowired
    private FlowerRepository flowerRepository;
    @Autowired
    private CustomRepository customRepository;
    @Autowired
    private ClientRepository clientRepository;
    @Autowired
    private SellerRepository sellerRepository;
    @Autowired
    private AdminRepository adminRepository;

    ClientEntity client = null;
    HashMap<Long, Integer> CustomFlower = new HashMap<>();

    @PostConstruct
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
    }

    @PostMapping("/signup")
    @ResponseStatus(HttpStatus.OK)
    public void signup(@RequestBody ClientEntity clientEntity) {
        String name = clientEntity.getName();
        String email = clientEntity.getEmail();
        String password = clientEntity.getPassword();
        client = new ClientEntity(name, email, password);
        clientRepository.save(client);
    }

    @PostMapping("/login")
    @ResponseStatus(HttpStatus.OK)
    public Boolean login(@RequestBody ClientEntity clientEntity) {
        String email = clientEntity.getEmail();
        String password = clientEntity.getPassword();
        client = clientRepository.checkPassword(email, password);
        return client != null;
    }

    @GetMapping("/logout")
    public void logout() {
        client = null;
    }

    @PostMapping("/drop")
    public void drop() {
        clientRepository.dropClient(client);
        client = null;
    }

    @GetMapping("/logged")
    public Boolean logged() {
        return client != null;
    }

    @GetMapping("/profile")
    @ResponseStatus(HttpStatus.OK)
    public Map<String, String> profile() {
        if (client == null) {
            throw new IllegalStateException("User is not logged in.");
        }
        String role = "client";
        if (sellerRepository.check(client)) role = "seller";
        if (adminRepository.check(client)) role = "admin";
        Map<String, String> profile = new HashMap<>();
        profile.put("name", client.getName());
        profile.put("email", client.getEmail());
        profile.put("password", client.getPassword());
        profile.put("avatar", client.getAvatar());
        profile.put("role", role);
        return (profile);
    }

    @GetMapping("/role")
    @ResponseStatus(HttpStatus.OK)
    public String role() {
        String role = "unauthorized";
        if (client != null) {
            role = "client";
            if (sellerRepository.check(client)) role = "seller";
            if (adminRepository.check(client)) role = "admin";
        }
        return role;
    }

    @GetMapping("/bouquets")
    public ResponseEntity<List<BouquetEntity>> getBouquets() {
        List<BouquetEntity> bouquetsList = bouquetRepository.findAll(Sort.by(Sort.Direction.ASC, "title"));
        return new ResponseEntity<>(bouquetsList, HttpStatus.OK);
    }

    @GetMapping("/flowers")
    public ResponseEntity<List<FlowerEntity>> getFlowers() {
        List<FlowerEntity> flowerList = flowerRepository.findAll(Sort.by(Sort.Direction.ASC, "title"));
        return new ResponseEntity<>(flowerList, HttpStatus.OK);
    }

    @GetMapping("/search-flowers")
    public ResponseEntity<List<FlowerEntity>> searchFlowers(@RequestParam(value = "searchText") String searchText,
                                                            @RequestParam(value = "minPrice") Integer minPrice,
                                                            @RequestParam(value = "maxPrice") Integer maxPrice) {
        List<FlowerEntity> flowerList = flowerRepository.search(searchText, minPrice, maxPrice);
        return new ResponseEntity<>(flowerList, HttpStatus.OK);
    }

    @GetMapping("/set-bouquet-amount")
    public void setBouquetAmount(@RequestParam(value = "id") Long id, @RequestParam(value = "amount") Integer amount) {
        Optional<BouquetEntity> optionalBouquet = bouquetRepository.findById(id);
        if (optionalBouquet.isPresent()) {
            BouquetEntity bouquet = optionalBouquet.get();
            bouquet.setAmount(amount);
            bouquetRepository.save(bouquet);
        }
    }

    @GetMapping("/selected-bouquets")
    public ResponseEntity<List<BouquetEntity>> getSelectedBouquets() {
        List<BouquetEntity> bouquetsList = bouquetRepository.findSelectedBouquets();
        return new ResponseEntity<>(bouquetsList, HttpStatus.OK);
    }

    @GetMapping("/set-custom-flower")
    public void setCustomFlower(@RequestParam(value = "id") Long id, @RequestParam(value = "amount") Integer amount) {
        if (amount > 0) {
            CustomFlower.put(id, amount);
        }
        else {
            CustomFlower.remove(id);
        }
    }

    @GetMapping("/get-custom-flower")
    public Integer getCustomFlower(@RequestParam(value = "id") Long id) {
        return CustomFlower.getOrDefault(id, 0);
    }

    @GetMapping("/get-all-custom-flowers")
    public HashMap<Long, Integer> getAllCustomFlowers() {
        return CustomFlower;
    }

    @GetMapping("/get-flower")
    public ResponseEntity<FlowerEntity> getFlowerById(@RequestParam(value = "id") Long id) {
        Optional<FlowerEntity> optionalFlower = flowerRepository.findById(id);
        if (optionalFlower.isPresent()) {
            FlowerEntity flower = optionalFlower.get();
            return new ResponseEntity<>(flower, HttpStatus.OK);
        }
        else {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/accept-custom")
    public void acceptCustom() {
        if (CustomFlower.isEmpty()) {
            return;
        }
        int price = 0;
        List<CustomEntity> customList = customRepository.findAll();
        int num = 1;
        while (customRepository.containsTitle("Букет №" + num)) num++;
        String title = "Букет №" + num;
        String FinalFlower = "";
        for (Map.Entry<Long, Integer> entryFlower : CustomFlower.entrySet()) {
            Optional<FlowerEntity> optionalFlower = flowerRepository.findById(entryFlower.getKey());
            if (optionalFlower.isPresent()) {
                FlowerEntity flower = optionalFlower.get();
                FinalFlower = FinalFlower.concat(flower.getTitle() + ":" + entryFlower.getValue() + ";");
                price += flower.getPrice() * entryFlower.getValue();
            }
        }
        FinalFlower = FinalFlower.substring(0, FinalFlower.length() - 1);
        customRepository.save(new CustomEntity(title, FinalFlower, price));
        CustomFlower = new HashMap<>();
    }

    @GetMapping("/get-custom")
    public ResponseEntity<List<CustomEntity>> getCustom() {
        List<CustomEntity> customList = customRepository.findAll(Sort.by(Sort.Direction.ASC, "id"));
        return new ResponseEntity<>(customList, HttpStatus.OK);
    }

    @GetMapping("/delete-custom")
    public void deleteCustom(@RequestParam(value = "id") Long id) {
        customRepository.deleteById(id);
    }

    @PostMapping("/create-bouquet")
    public void createBouquet(@RequestBody BouquetEntity bouquetEntity) {
       bouquetRepository.save(bouquetEntity);
    }

    @PostMapping("/create-flower")
    public void createFlower(@RequestBody FlowerEntity flowerEntity) {
       flowerRepository.save(flowerEntity);
    }

    @PostMapping("/update-bouquet")
    public void updateBouquet(@RequestBody BouquetEntity bouquetEntity, @RequestParam(value = "id") Long id) {
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

    @PostMapping("/update-flower")
    public void updateFlower(@RequestBody FlowerEntity flowerEntity, @RequestParam(value = "id") Long id) {
        if (flowerEntity.getTitle().isEmpty()) {
            flowerRepository.findById(id).ifPresent(existingFlower ->
                    flowerEntity.setTitle(existingFlower.getTitle())
            );
        }
        if (flowerEntity.getPrice() == -1) {
            flowerRepository.findById(id).ifPresent(existingFlower ->
                    flowerEntity.setPrice(existingFlower.getPrice())
            );
        }
        flowerRepository.update(flowerEntity, id);
    }

    @GetMapping("/drop-bouquet")
    public void dropBouquet(@RequestParam(value = "id") Long id) {
        bouquetRepository.deleteById(id);
    }

    @GetMapping("/drop-flower")
    public void dropFlower(@RequestParam(value = "id") Long id) {
        flowerRepository.deleteById(id);
    }

    @GetMapping("/")
    public String hello(@RequestParam(value = "name", defaultValue = "World") String name) {
        return String.format("Hello %s!", name);
    }
}
