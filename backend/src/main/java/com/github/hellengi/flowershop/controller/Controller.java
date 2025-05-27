package com.github.hellengi.flowershop.controller;
import java.util.*;

import com.github.hellengi.flowershop.entity.BouquetEntity;
import com.github.hellengi.flowershop.entity.CustomEntity;
import com.github.hellengi.flowershop.entity.FlowerEntity;
import com.github.hellengi.flowershop.entity.ClientEntity;
import com.github.hellengi.flowershop.service.*;
import jakarta.servlet.http.HttpSession;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api")
public class Controller {
    private final AuthService authService;
    private final UserService userService;
    private final BouquetService bouquetService;
    private final FlowerService flowerService;
    private final CustomService customService;
    private final CartService cartService;

    public Controller(AuthService authService,
                      UserService userService,
                      BouquetService bouquetService,
                      FlowerService flowerService,
                      CustomService customService,
                      CartService cartService) {
        this.authService = authService;
        this.userService = userService;
        this.bouquetService = bouquetService;
        this.flowerService = flowerService;
        this.customService = customService;
        this.cartService = cartService;
    }

    @PostMapping("/auth/signup")
    @ResponseStatus(HttpStatus.OK)
    public Boolean signUp(@RequestBody ClientEntity clientEntity,
                          HttpSession session) {
        return authService.signUp(clientEntity, session);
    }

    @PostMapping("/auth/login")
    @ResponseStatus(HttpStatus.OK)
    public Boolean logIn(@RequestBody ClientEntity clientEntity,
                         HttpSession session) {
        return authService.logIn(clientEntity, session);
    }

    @PostMapping("/auth/logout")
    public void logOut(HttpSession session) {
        authService.logOut(session);
    }

    @GetMapping("/auth/status")
    public Boolean isLogged(HttpSession session) {
        return authService.isLogged(session);
    }

    @GetMapping("/users/me")
    @ResponseStatus(HttpStatus.OK)
    public Map<String, String> getAccount(HttpSession session) {
        return userService.getAccount(session);
    }

    @GetMapping("/users/me/role")
    @ResponseStatus(HttpStatus.OK)
    public String getAccountRole(HttpSession session) {
        return userService.getAccountRole(session);
    }

    @DeleteMapping("/users/me")
    public void deleteAccount(HttpSession session) {
        userService.deleteAccount(session);
    }

    @GetMapping("/bouquets")
    public ResponseEntity<List<BouquetEntity>> getBouquets() {
        return bouquetService.getBouquets();
    }

    @GetMapping("/bouquets/{id}")
    public ResponseEntity<BouquetEntity> getBouquetById(@PathVariable("id") Long id) {
        return bouquetService.getBouquetById(id);
    }

    @PostMapping("/bouquets")
    public void createBouquet(@RequestBody BouquetEntity bouquetEntity,
                              HttpSession session) {
        bouquetService.createBouquet(bouquetEntity, session);
    }

    @PutMapping("/bouquets/{id}")
    public void updateBouquet(@PathVariable("id") Long id,
                              @RequestBody BouquetEntity bouquetEntity,
                              HttpSession session) {
        bouquetService.updateBouquet(id, bouquetEntity, session);
    }

    @DeleteMapping("/bouquets/{id}")
    public void deleteBouquet(@PathVariable("id") Long id,
                              HttpSession session) {
        bouquetService.deleteBouquet(id, session);
    }

    @GetMapping("/flowers")
    public ResponseEntity<List<FlowerEntity>> getFlowers() {
        return flowerService.getFlowers();
    }

    @GetMapping("/flowers/{id}")
    public ResponseEntity<FlowerEntity> getFlowerById(@PathVariable("id") Long id) {
        return flowerService.getFlowerById(id);
    }

    @GetMapping("/flowers/search")
    public ResponseEntity<List<FlowerEntity>> searchFlowers(@RequestParam(value = "text") String searchText,
                                                            @RequestParam(value = "minPrice") Integer minPrice,
                                                            @RequestParam(value = "maxPrice") Integer maxPrice) {
        return flowerService.searchFlowers(searchText, minPrice, maxPrice);
    }

    @PostMapping("/flowers")
    public void createFlower(@RequestBody FlowerEntity flowerEntity,
                             HttpSession session) {
        flowerService.createFlower(flowerEntity, session);
    }

    @PutMapping("/flowers/{id}")
    public void updateFlower(@PathVariable(value = "id") Long id,
                             @RequestBody FlowerEntity flowerEntity,
                             HttpSession session) {
        flowerService.updateFlower(id, flowerEntity, session);
    }

    @DeleteMapping("/flowers/{id}")
    public void deleteFlower(@PathVariable(value = "id") Long id,
                             HttpSession session) {
        flowerService.deleteFlower(id, session);
    }

    @GetMapping("/custom/current/flowers")
    public HashMap<Long, Integer> getFlowersInCustom(HttpSession session) {
        return customService.getFlowersInCustom(session);
    }

    @PostMapping("/custom/current/flowers/{id}")
    public void addFlowerToCustom(@PathVariable("id") Long id,
                                  HttpSession session) {
        customService.addFlowerToCustom(id, session);
    }

    @GetMapping("/custom/current/flowers/{id}")
    public Integer getAmountOfFlowerInCustom(@PathVariable("id") Long id,
                                             HttpSession session) {
        return customService.getAmountOfFlowerInCustom(id, session);
    }

    @PatchMapping("/custom/current/flowers/{id}")
    public void setAmountForFlowerInCustom(@PathVariable(value = "id") Long id,
                                           @RequestParam(value = "amount") Integer amount,
                                           HttpSession session) {
        customService.setAmountForFlowerInCustom(id, amount, session);
    }

    @DeleteMapping("/custom/current")
    public void deleteCurrentCustom(HttpSession session) {
        customService.deleteCurrentCustom(session);
    }

    @GetMapping("/cart/bouquets")
    public ResponseEntity<List<BouquetEntity>> getBouquetsInCart(HttpSession session) {
        return cartService.getBouquetsInCart(session);
    }

    @PostMapping("/cart/bouquets/{id}")
    public void addBouquetToCart(@PathVariable("id") Long id,
                                 HttpSession session) {
        cartService.addBouquetToCart(id, session);
    }

    @PatchMapping("/cart/bouquets/{id}")
    public void setAmountForBouquetInCart(@PathVariable("id") Long id,
                                          @RequestParam(value = "amount") Integer amount,
                                          HttpSession session) {
        cartService.setAmountForBouquetInCart(id, amount, session);
    }

    @DeleteMapping("/cart/bouquets/{id}")
    public void removeBouquetFromCart(@PathVariable("id") Long id,
                                      HttpSession session) {
        cartService.removeBouquetFromCart(id, session);
    }

    @PostMapping("/cart/custom/current")
    public void addCustomToCart(HttpSession session) {
        cartService.addCustomToCart(session);
    }

    @GetMapping("/cart/custom/bouquets")
    public ResponseEntity<List<CustomEntity>> getCustomBouquetsInCart(HttpSession session) {
        return cartService.getCustomBouquetsInCart(session);
    }

    @PatchMapping("cart/custom/bouquets/{id}")
    public void setAmountForCustomBouquetInCart(@PathVariable("id") Long id,
                                                @RequestParam(value = "amount") Integer amount,
                                                HttpSession session) {
        cartService.setAmountForCustomBouquetInCart(id, amount, session);
    }

    @DeleteMapping("/cart/custom/bouquets/{id}")
    public void removeCustomBouquetFromCart(@PathVariable("id") Long id,
                                            HttpSession session) {
        cartService.removeCustomBouquetFromCart(id, session);
    }

    @GetMapping("/")
    public String helloWorld(@RequestParam(value = "name", defaultValue = "World") String name,
                             HttpSession session) {
        return String.format("Hello %s!", name);
    }
}
