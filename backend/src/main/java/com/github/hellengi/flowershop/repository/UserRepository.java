package com.github.hellengi.flowershop.repository;

import com.github.hellengi.flowershop.entity.UserEntity;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<UserEntity, Long> {
    @Query("SELECT u FROM UserEntity u WHERE " +
            "(u.email = :email AND u.password = :password)")
    UserEntity checkPassword(@Param("email") String mail,
                             @Param("password") String password);
    @Query("SELECT u FROM UserEntity u WHERE u.email = :email")
    UserEntity getUser(@Param("email") String email);
    @Modifying
    @Transactional
    @Query("DELETE FROM UserEntity c WHERE c = :user")
    void deleteUser(@Param("user") UserEntity user);
    boolean existsByEmail(String email);
}
