package com.github.hellengi.flowershop.rabbit;

import com.github.hellengi.flowershop.dto.MessageEventDTO;
import com.github.hellengi.flowershop.entity.MessageEntity;
import com.github.hellengi.flowershop.entity.UserEntity;
import com.github.hellengi.flowershop.repository.MessageRepository;
import com.github.hellengi.flowershop.repository.UserRepository;
import com.github.hellengi.flowershop.config.RabbitConfig;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Component;

@Component
public class MessageListener {

    private final UserRepository userRepository;
    private final MessageRepository messageRepository;

    public MessageListener(UserRepository userRepository, MessageRepository messageRepository) {
        this.userRepository = userRepository;
        this.messageRepository = messageRepository;
    }

    @RabbitListener(queues = RabbitConfig.QUEUE)
    public void handleMessage(MessageEventDTO dto) {
        UserEntity from = userRepository.findById(dto.fromUserId()).orElseThrow();
        UserEntity to = userRepository.findById(dto.toUserId()).orElseThrow();
        MessageEntity message = new MessageEntity(to, from, dto.content());
        messageRepository.save(message);
    }
}
