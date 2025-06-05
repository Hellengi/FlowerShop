package com.github.hellengi.flowershop.service;

import com.github.hellengi.flowershop.dto.CartBouquetDTO;
import com.github.hellengi.flowershop.dto.CartCustomDTO;
import com.github.hellengi.flowershop.dto.CustomFlowerDTO;
import com.github.hellengi.flowershop.entity.*;
import com.github.hellengi.flowershop.entity.id.CartBouquetId;
import com.github.hellengi.flowershop.entity.id.CartCustomId;
import com.github.hellengi.flowershop.enums.ItemStatus;
import com.github.hellengi.flowershop.repository.*;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CartService {
    @Autowired
    private BouquetRepository bouquetRepository;
    @Autowired
    private FlowerRepository flowerRepository;
    @Autowired
    private CustomRepository customRepository;
    @Autowired
    private CartRepository cartRepository;
    @Autowired
    private CartBouquetRepository cartBouquetRepository;
    @Autowired
    private CartCustomRepository cartCustomRepository;
    @Autowired
    private CustomFlowerRepository customFlowerRepository;

    private final AuthService authService;
    private final CustomService customService;

    public CartService(AuthService authService, CustomService customService) {
        this.authService = authService;
        this.customService = customService;
    }

    public ResponseEntity<List<CartBouquetDTO>> getBouquetsInCart(HttpSession session) {
        UserEntity user = (UserEntity) session.getAttribute("user");
        if (user == null) {
            authService.logIn(session);
            user = (UserEntity) session.getAttribute("user");
        }
        CartEntity cart = cartRepository.findActiveCartByUser(user);
        if (cart == null) throw new IllegalStateException("Active cart not found.");
        List<CartBouquetEntity> bouquetsList = cartBouquetRepository.findBouquetsInCart(cart);
        List<CartBouquetDTO> dtoList = bouquetsList.stream()
                .map(cb -> new CartBouquetDTO(
                        cb.getBouquet().getId(),
                        cb.getBouquet().getImage(),
                        cb.getBouquet().getItem().getTitle(),
                        cb.getBouquet().getItem().getDescription(),
                        cb.getBouquet().getItem().getStock(),
                        cb.getBouquet().getItem().getPrice(),
                        cb.getBouquet().getItem().getStatus(),
                        cb.getQuantity()
                ))
                .toList();
        return new ResponseEntity<>(dtoList, HttpStatus.OK);
    }

    public void addBouquetToCart(Long bouquetId, Integer quantity, HttpSession session) {
        UserEntity user = (UserEntity) session.getAttribute("user");
        if (user == null) {
            authService.logIn(session);
            user = (UserEntity) session.getAttribute("user");
        }
        CartEntity cart = cartRepository.findActiveCartByUser(user);
        if (cart == null) throw new IllegalStateException("Active cart not found.");
        BouquetEntity bouquet = bouquetRepository.findById(bouquetId)
                .orElseThrow(() -> new IllegalArgumentException("Bouquet not found."));
        CartBouquetId id = new CartBouquetId(cart.getId(), bouquet.getId());
        CartBouquetEntity existing = cartBouquetRepository.findById(id).orElse(null);
        if (existing != null) {
            existing.setQuantity(quantity);
            cartBouquetRepository.save(existing);
        } else {
            CartBouquetEntity newEntry = new CartBouquetEntity(id, cart, bouquet, quantity);
            cartBouquetRepository.save(newEntry);
        }
    }

    public Integer getAmountOfBouquetInCart(Long bouquetId, HttpSession session) {
        UserEntity user = (UserEntity) session.getAttribute("user");
        if (user == null) {
            authService.logIn(session);
            user = (UserEntity) session.getAttribute("user");
        }
        CartEntity cart = cartRepository.findActiveCartByUser(user);
        if (cart == null) throw new IllegalStateException("Active cart not found.");
        CartBouquetId id = new CartBouquetId(cart.getId(), bouquetId);
        CartBouquetEntity existing = cartBouquetRepository.findById(id).orElse(null);
        if (existing != null) {
            return existing.getQuantity();
        } else {
            return 0;
        }
    }

    public void setAmountForBouquetInCart(Long bouquetId, Integer quantity, HttpSession session) {
        UserEntity user = (UserEntity) session.getAttribute("user");
        if (user == null) {
            authService.logIn(session);
            user = (UserEntity) session.getAttribute("user");
        }
        CartEntity cart = cartRepository.findActiveCartByUser(user);
        if (cart == null) throw new IllegalStateException("Active cart not found.");
        CartBouquetId id = new CartBouquetId(cart.getId(), bouquetId);
        CartBouquetEntity existing = cartBouquetRepository.findById(id).orElse(null);
        if (existing != null) {
            existing.setQuantity(quantity);
            cartBouquetRepository.save(existing);
        }
    }

    public void removeBouquetFromCart(Long bouquetId, HttpSession session) {
        UserEntity user = (UserEntity) session.getAttribute("user");
        if (user == null) {
            authService.logIn(session);
            user = (UserEntity) session.getAttribute("user");
        }
        CartEntity cart = cartRepository.findActiveCartByUser(user);
        if (cart == null) throw new IllegalStateException("Active cart not found.");
        CartBouquetId id = new CartBouquetId(cart.getId(), bouquetId);
        cartBouquetRepository.findById(id).ifPresent(existing ->
                cartBouquetRepository.delete(existing));
    }

    public void addCustomToCart(HttpSession session) {
        UserEntity user = (UserEntity) session.getAttribute("user");
        if (user == null) {
            authService.logIn(session);
            user = (UserEntity) session.getAttribute("user");
        }
        CartEntity cart = cartRepository.findActiveCartByUser(user);
        if (cart == null) throw new IllegalStateException("Active cart not found.");
        CustomEntity custom = customRepository.findActiveCustomByUser(user);
        CartCustomId id = new CartCustomId(cart.getId(), custom.getId());
        CartCustomEntity newEntry = new CartCustomEntity(id, cart, custom);
        cartCustomRepository.save(newEntry);
        custom.setIsActive(false);
        String title = customService.createName(user);
        CustomEntity customEntity = new CustomEntity(user, title);
        customRepository.save(customEntity);
    }

    public ResponseEntity<List<CartCustomDTO>> getCustomBouquetsInCart(HttpSession session) {
        UserEntity user = (UserEntity) session.getAttribute("user");
        if (user == null) {
            authService.logIn(session);
            user = (UserEntity) session.getAttribute("user");
        }
        CartEntity cart = cartRepository.findActiveCartByUser(user);
        if (cart == null) throw new IllegalStateException("Active cart not found.");
        List<CartCustomEntity> customList = cartCustomRepository.findCustomsInCart(cart);
        List<CartCustomDTO> dtoList = customList.stream()
                .map(cc -> {
                    CustomEntity custom = cc.getCustom();
                    List<CustomFlowerEntity> flowerList = customFlowerRepository.findFlowersInCustom(custom);
                    List<CustomFlowerDTO> flowers = flowerList.stream()
                            .map(cf -> new CustomFlowerDTO(
                                    cf.getFlower().getId(),
                                    cf.getFlower().getImage(),
                                    cf.getFlower().getItem().getTitle(),
                                    cf.getFlower().getItem().getDescription(),
                                    cf.getFlower().getItem().getStock(),
                                    cf.getFlower().getItem().getPrice(),
                                    cf.getFlower().getItem().getStatus(),
                                    cf.getQuantity()
                            ))
                            .toList();
                    return new CartCustomDTO(
                            cc.getCustom().getId(),
                            "flower-icon.png",
                            cc.getCustom().getTitle(),
                            flowers,
                            (int) Math.floor(Optional.ofNullable(customFlowerRepository
                                    .getStockByCustom(cc.getCustom())).orElse(0.0)),
                            customFlowerRepository.getPriceByCustom(cc.getCustom()),
                            ItemStatus.valueOf(customFlowerRepository.getStatusByCustom(cc.getCustom())),
                            cc.getQuantity()
                    );
                })
                .toList();
        return new ResponseEntity<>(dtoList, HttpStatus.OK);
    }

    public void setAmountForCustomBouquetInCart(Long customId, Integer quantity, HttpSession session) {
        UserEntity user = (UserEntity) session.getAttribute("user");
        if (user == null) {
            authService.logIn(session);
            user = (UserEntity) session.getAttribute("user");
        }
        CartEntity cart = cartRepository.findActiveCartByUser(user);
        if (cart == null) throw new IllegalStateException("Active cart not found.");
        CartCustomId id = new CartCustomId(cart.getId(), customId);
        CartCustomEntity existing = cartCustomRepository.findById(id).orElse(null);
        if (existing != null) {
            existing.setQuantity(quantity);
            cartCustomRepository.save(existing);
        }
    }

    public void removeCustomBouquetFromCart(Long customId, HttpSession session) {
        UserEntity user = (UserEntity) session.getAttribute("user");
        if (user == null) {
            authService.logIn(session);
            user = (UserEntity) session.getAttribute("user");
        }
        CartEntity cart = cartRepository.findActiveCartByUser(user);
        if (cart == null) throw new IllegalStateException("Active cart not found.");
        CartCustomId id = new CartCustomId(cart.getId(), customId);
        cartCustomRepository.findById(id).ifPresent(existing ->
                cartCustomRepository.delete(existing));
    }
}
