package com.github.hellengi.flowershop.service;

import com.github.hellengi.flowershop.config.RabbitConfig;
import com.github.hellengi.flowershop.dto.CustomFlowerDTO;
import com.github.hellengi.flowershop.dto.MessageDTO;
import com.github.hellengi.flowershop.dto.MessageEventDTO;
import com.github.hellengi.flowershop.dto.UserDTO;
import com.github.hellengi.flowershop.entity.AdminEntity;
import com.github.hellengi.flowershop.entity.MessageEntity;
import com.github.hellengi.flowershop.entity.SellerEntity;
import com.github.hellengi.flowershop.entity.UserEntity;
import com.github.hellengi.flowershop.repository.AdminRepository;
import com.github.hellengi.flowershop.repository.MessageRepository;
import com.github.hellengi.flowershop.repository.SellerRepository;
import com.github.hellengi.flowershop.repository.UserRepository;
import jakarta.servlet.http.HttpSession;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class MessageService {
    @Autowired
    private MessageRepository messageRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private AdminRepository adminRepository;
    @Autowired
    private SellerRepository sellerRepository;
    @Autowired
    private RabbitTemplate rabbitTemplate;

    private final AuthService authService;

    public MessageService(AuthService authService) {
        this.authService = authService;
    }

    public ResponseEntity<List<UserDTO>> getChats(HttpSession session) {
        UserEntity user = (UserEntity) session.getAttribute("user");
        if (user == null) {
            authService.logIn(session);
            user = (UserEntity) session.getAttribute("user");
        }
        Set<UserEntity> partnerSet = new HashSet<>();
        partnerSet.addAll(messageRepository.findAllFromUsers(user.getId()));
        partnerSet.addAll(messageRepository.findAllToUsers(user.getId()));
        List<UserEntity> partnerList = partnerSet.stream()
                .sorted(Comparator.comparing(UserEntity::getName))
                .toList();
        List<UserDTO> dtoList = partnerList.stream().map(partner -> {
            Optional<AdminEntity> admin = adminRepository.findByUserId(partner.getId());
            Optional<SellerEntity> seller = sellerRepository.findByUserId(partner.getId());
            return new UserDTO(
                    partner.getId(),
                    partner.getName(),
                    partner.getEmail(),
                    partner.getDateRegistration(),
                    partner.getAvatarUrl(),
                    admin.map(AdminEntity::getId).orElse(-1L),
                    seller.map(SellerEntity::getId).orElse(-1L),
                    seller.map(SellerEntity::getName).orElse("")
            );
        }).toList();
        return new ResponseEntity<>(dtoList, HttpStatus.OK);
    }

    public ResponseEntity<List<MessageDTO>> getMessageHistory(Long id, HttpSession session) {
        UserEntity user = (UserEntity) session.getAttribute("user");
        if (user == null) {
            authService.logIn(session);
            user = (UserEntity) session.getAttribute("user");
        }
        List<MessageEntity> messagesList = messageRepository.getMessagesBetweenUsers(user.getId(), id);
        List<MessageDTO> dtoList = messagesList.stream()
                .map(m -> new MessageDTO(
                        m.getId(),
                        m.getFromUser(),
                        m.getToUser(),
                        m.getContent(),
                        m.getCreatedAt(),
                        m.getUpdatedAt(),
                        m.getPictureUrl(),
                        m.getStatus()
                ))
                .toList();
        return new ResponseEntity<>(dtoList, HttpStatus.OK);
    }

        public void sendMessage(Long id, String message, HttpSession session) {
        UserEntity user = (UserEntity) session.getAttribute("user");
        if (user == null) {
            authService.logIn(session);
            user = (UserEntity) session.getAttribute("user");
        }
        UserEntity toUser = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));
        MessageEntity newMessage = new MessageEntity(toUser, user, message);
        messageRepository.save(newMessage);
        /*
        MessageEventDTO dto = new MessageEventDTO(user.getId(), toUser.getId(), message);
        rabbitTemplate.convertAndSend(RabbitConfig.EXCHANGE, RabbitConfig.ROUTING_KEY, dto);
        */
    }
}
