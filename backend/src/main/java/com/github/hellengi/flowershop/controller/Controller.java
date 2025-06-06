package com.github.hellengi.flowershop.controller;
import java.util.*;

import com.github.hellengi.flowershop.dto.*;
import com.github.hellengi.flowershop.entity.*;
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
    private final MessageService messageService;

    public Controller(AuthService authService,
                      UserService userService,
                      BouquetService bouquetService,
                      FlowerService flowerService,
                      CustomService customService,
                      CartService cartService,
                      MessageService messageService) {
        this.authService = authService;
        this.userService = userService;
        this.bouquetService = bouquetService;
        this.flowerService = flowerService;
        this.customService = customService;
        this.cartService = cartService;
        this.messageService = messageService;
    }

    @PostMapping("/auth/signup")
    @ResponseStatus(HttpStatus.OK)
    public Boolean signUp(@RequestBody UserEntity userEntity,
                          HttpSession session) {
        return authService.signUp(userEntity, session);
    }

    @PostMapping("/auth/login")
    @ResponseStatus(HttpStatus.OK)
    public Boolean logIn(@RequestBody UserEntity userEntity,
                         HttpSession session) {
        return authService.logIn(userEntity, session);
    }

    @PostMapping("/auth/logout")
    public void logOut(HttpSession session) {
        authService.logOut(session);
    }

    @GetMapping("/auth/status")
    public Boolean isLogged(HttpSession session) {
        return authService.isLogged(session);
    }

    @GetMapping("/users/{id}")
    public ResponseEntity<UserDTO> getUser(@PathVariable("id") Long id) {
        return userService.getUser(id);
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

    @GetMapping("/bouquets/search")
    public ResponseEntity<List<BouquetEntity>> searchBouquets(@RequestParam(value = "text") String searchName,
                                                            @RequestParam(value = "minPrice", defaultValue = "0") Integer minPrice,
                                                            @RequestParam(value = "maxPrice", required = false) Integer maxPrice) {
        if (maxPrice == null) maxPrice = Integer.MAX_VALUE;
        return bouquetService.searchBouquets(searchName, minPrice, maxPrice);
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
    public ResponseEntity<List<FlowerEntity>> searchFlowers(@RequestParam(value = "text") String searchName,
                                                            @RequestParam(value = "minPrice", defaultValue = "0") Integer minPrice,
                                                            @RequestParam(value = "maxPrice", required = false) Integer maxPrice) {
        if (maxPrice == null) maxPrice = Integer.MAX_VALUE;
        return flowerService.searchFlowers(searchName, minPrice, maxPrice);
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
    public ResponseEntity<List<CustomFlowerDTO>> getFlowersInCustom(HttpSession session) {
        return customService.getFlowersInCustom(session);
    }

    @PutMapping("/custom/current/flowers/{id}")
    public void addFlowerToCustom(@PathVariable("id") Long id,
                                  @RequestParam(value = "amount", defaultValue = "1") Integer amount,
                                  HttpSession session) {
        customService.addFlowerToCustom(id, amount, session);
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

    @GetMapping("/custom/current")
    public String getCustomTitle(HttpSession session) {
        return customService.getCustomTitle(session);
    }

    @PatchMapping("/custom/current")
    public void setCustomTitle(@RequestParam(value = "title") String title,
                              HttpSession session) {
        customService.setCustomTitle(title, session);
    }

    @DeleteMapping("/custom/current")
    public void deleteCurrentCustom(HttpSession session) {
        customService.deleteCurrentCustom(session);
    }

    @GetMapping("/cart/bouquets")
    public ResponseEntity<List<CartBouquetDTO>> getBouquetsInCart(HttpSession session) {
        return cartService.getBouquetsInCart(session);
    }

    @PutMapping("/cart/bouquets/{id}")
    public void addBouquetToCart(@PathVariable("id") Long id,
                                 @RequestParam(value = "amount", defaultValue = "1") Integer amount,
                                 HttpSession session) {
        cartService.addBouquetToCart(id, amount, session);
    }

    @GetMapping("/cart/bouquets/{id}")
    public Integer getAmountOfBouquetInCart(@PathVariable("id") Long id,
                                            HttpSession session) {
        return cartService.getAmountOfBouquetInCart(id, session);
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
    public ResponseEntity<List<CartCustomDTO>> getCustomBouquetsInCart(HttpSession session) {
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

    @GetMapping("/messages")
    public ResponseEntity<List<UserDTO>> getChats(HttpSession session) {
        return messageService.getChats(session);
    }

    @GetMapping("/messages/{id}")
    public ResponseEntity<List<MessageDTO>> getMessageHistory(@PathVariable("id") Long id,
                                                           HttpSession session) {
        return messageService.getMessageHistory(id, session);
    }

    @PostMapping("/messages/{id}")
    public void sendMessage(@PathVariable("id") Long id,
                            @RequestParam(value = "message") String message,
                            HttpSession session) {
        messageService.sendMessage(id, message, session);
    }

    @GetMapping("/")
    public String helloWorld(@RequestParam(value = "name", defaultValue = "World") String name,
                             HttpSession session) {
        return String.format("Hello %s!", name);
    }
}
