package com.alianza.clients.services;

import com.alianza.clients.AdvancedSearchDto;
import com.alianza.clients.models.Client;
import com.alianza.clients.repositories.ClientRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service
public class ClientService {
    private static final Logger logger = LoggerFactory.getLogger(ClientService.class);

    @Autowired
    private ClientRepository clientRepository;


    public List<Client> getClients() {

        logger.info("INIT getClients service");

        List<Client> clients = clientRepository.findAll();

        logger.info("END getClients service with results [{}]", clients);

        return clients;

    }

    public Client createClient(Client client) {

        logger.info("INIT createClient service");

        Client newClient = clientRepository.save(client);

        logger.info("END createClient service with results [{}]", newClient);

        return newClient;

    }

    public List<Client> getClientsByKey(String key) {

        logger.info("INIT getClientsByKey service");

        Optional<List<Client>> clientsOptional = clientRepository.getAllBySharedKeyContains(key);

        return clientsOptional.orElseGet(Collections::emptyList);
    }

    public List<Client> getClientsByAdvancedSearch(AdvancedSearchDto client) {

        logger.info("INIT getClientsByKey service");

        Optional<List<Client>> clientsOptional;
        if (client.getPhone() == 0)
            clientsOptional =
            clientRepository.getAllBySharedKeyContainsAndBusinessIdContainsAndEmailContainsAndCreatedAtIsBetween(client.getSharedKey(), client.getBusinessId(), client.getEmail(), client.getStartsAt(), client.getEndsAt());
        else {
            clientsOptional =
            clientRepository.getAllBySharedKeyContainsAndBusinessIdContainsAndEmailContainsAndPhoneEqualsAndCreatedAtIsBetween(client.getSharedKey(), client.getBusinessId(), client.getEmail(), client.getPhone(), client.getStartsAt(), client.getEndsAt());
        }
        return clientsOptional.orElseGet(Collections::emptyList);
    }
}
