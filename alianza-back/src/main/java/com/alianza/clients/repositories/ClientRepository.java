package com.alianza.clients.repositories;

import com.alianza.clients.models.Client;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface ClientRepository extends
JpaRepository<Client, Long>,
JpaSpecificationExecutor<Client> {

    Optional<List<Client>> getAllBySharedKeyLike(String key);
    Optional<List<Client>> getAllBySharedKeyContains(String key);
    Optional<List<Client>> getAllBySharedKeyContainsAndBusinessIdContainsAndEmailContainsAndPhoneEqualsAndCreatedAtIsBetween(String key, String bussinesId, String email, Long phone, LocalDate dateStart, LocalDate dateEnd );
    Optional<List<Client>> getAllBySharedKeyContainsAndBusinessIdContainsAndEmailContainsAndCreatedAtIsBetween(String key, String bussinesId, String email, LocalDate dateStart, LocalDate dateEnd );

}
