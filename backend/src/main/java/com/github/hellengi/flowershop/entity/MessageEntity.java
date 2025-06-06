package com.github.hellengi.flowershop.entity;

import com.github.hellengi.flowershop.enums.MessageStatus;
import jakarta.persistence.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.time.LocalDateTime;

@Entity
@Table(name = "message")
public class MessageEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_message")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_to", referencedColumnName = "id_user", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    private UserEntity toUser;

    @ManyToOne
    @JoinColumn(name = "user_from", referencedColumnName = "id_user", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    private UserEntity fromUser;

    @Column(nullable = false)
    private String content;

    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @Column(name = "picture_url")
    private String pictureUrl;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private MessageStatus status;

    public MessageEntity() {}

    public MessageEntity(UserEntity toUser, UserEntity fromUser, String content) {
        this.toUser = toUser;
        this.fromUser = fromUser;
        this.content = content;
        this.createdAt = LocalDateTime.now();
        this.status = MessageStatus.UNREAD;
    }

    public MessageEntity(UserEntity toUser, UserEntity fromUser, String content, String pictureUrl) {
        this.toUser = toUser;
        this.fromUser = fromUser;
        this.content = content;
        this.createdAt = LocalDateTime.now();
        this.pictureUrl = pictureUrl;
        this.status = MessageStatus.UNREAD;
    }

    public Long getId() {
        return id;
    }

    public UserEntity getToUser() {
        return toUser;
    }

    public UserEntity getFromUser() {
        return fromUser;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
        this.updatedAt = LocalDateTime.now();
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public String getPictureUrl() {
        return pictureUrl;
    }

    public void setPictureUrl(String pictureUrl) {
        this.pictureUrl = pictureUrl;
        this.updatedAt = LocalDateTime.now();
    }

    public MessageStatus getStatus() {
        return status;
    }

    public void setStatus(MessageStatus status) {
        this.status = status;
    }
}
