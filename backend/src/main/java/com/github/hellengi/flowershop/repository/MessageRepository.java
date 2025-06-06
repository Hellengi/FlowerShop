package com.github.hellengi.flowershop.repository;

import com.github.hellengi.flowershop.entity.MessageEntity;
import com.github.hellengi.flowershop.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MessageRepository extends JpaRepository<MessageEntity, Long> {
    @Query("SELECT m FROM MessageEntity m WHERE " +
            "(m.fromUser.id = :userId AND m.toUser.id = :otherId) OR " +
            "(m.fromUser.id = :otherId AND m.toUser.id = :userId) " +
            "ORDER BY m.createdAt ASC")
    List<MessageEntity> getMessagesBetweenUsers(@Param("userId") Long userId,
                                            @Param("otherId") Long otherId);
    @Query("SELECT DISTINCT m.toUser FROM MessageEntity m WHERE m.fromUser.id = :userId")
    List<UserEntity> findAllToUsers(@Param("userId") Long userId);

    @Query("SELECT DISTINCT m.fromUser FROM MessageEntity m WHERE m.toUser.id = :userId")
    List<UserEntity> findAllFromUsers(@Param("userId") Long userId);
}
