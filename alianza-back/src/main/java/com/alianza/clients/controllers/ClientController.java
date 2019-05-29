package com.alianza.clients.controllers;


import com.alianza.clients.AdvancedSearchDto;
import com.alianza.clients.Router;
import com.alianza.clients.models.Client;
import com.alianza.clients.services.ClientService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletResponse;
import java.util.List;

import static org.springframework.web.bind.annotation.RequestMethod.OPTIONS;

@Controller
public class ClientController {
    private static final Logger logger = LoggerFactory.getLogger(ClientController.class);

    @Autowired
    private ClientService clientService;

    @GetMapping(path = Router.BASE_PATH, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity getClients() {

        logger.info("[CLIENT_CONTROLLER] GET request arrived to {}", Router.BASE_PATH);
        ResponseEntity response;

        try {
            List clients = clientService.getClients();
            logger.info("[CLIENT_CONTROLLER] success GET request  to {} results {}", Router.BASE_PATH,clients);

            response = new ResponseEntity<>(clients, HttpStatus.OK);

        } catch (Exception e) {
            logger.error("[CLIENT_CONTROLLER] error in GET request  {} , due to {}", Router.BASE_PATH, e.getMessage(),e);
            response = new ResponseEntity<>( HttpStatus.INTERNAL_SERVER_ERROR);
        }

        return response;
    }

    @GetMapping(path = Router.GET_CLIENTS_BY_SHARED_KEY, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity getClients( @PathVariable(value = "key")  String key) {

        logger.info("[CLIENT_CONTROLLER] GET request arrived to {}", Router.GET_CLIENTS_BY_SHARED_KEY);
        ResponseEntity response;

        try {
            List clients = clientService.getClientsByKey(key);
            logger.info("[CLIENT_CONTROLLER] success GET request  to {} results {}", Router.GET_CLIENTS_BY_SHARED_KEY,clients);

            response = new ResponseEntity<>(clients, HttpStatus.OK);

        } catch (Exception e) {
            logger.error("[CLIENT_CONTROLLER] error in GET request  {} , due to {}", Router.GET_CLIENTS_BY_SHARED_KEY, e.getMessage(),e);
            response = new ResponseEntity<>( HttpStatus.INTERNAL_SERVER_ERROR);
        }

        return response;
    }

    @PostMapping(path = Router.BASE_PATH, produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity createClient(@RequestBody Client client) {

        logger.info("[CLIENT_CONTROLLER] POST request arrived to {} with values", Router.BASE_PATH,client.toString());
        ResponseEntity response;

        try {
            Client responseClient = clientService.createClient(client);
            logger.info("[CLIENT_CONTROLLER] success POST  request  to {} results {}", Router.BASE_PATH,responseClient.toString());

            response = new ResponseEntity<>(responseClient, HttpStatus.OK);

        } catch (Exception e) {
            logger.error("[CLIENT_CONTROLLER] error in  POST  request  {} , due to {}", Router.BASE_PATH, e.getMessage(),e);
            response = new ResponseEntity<>( HttpStatus.INTERNAL_SERVER_ERROR);
        }

        return response;
    }

    @PostMapping(path = Router.GET_CLIENTS_BY_ADVANCED, produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity createClient(@RequestBody AdvancedSearchDto client) {

        logger.info("[CLIENT_CONTROLLER] POST request arrived to {} with values", Router.BASE_PATH,client.toString());
        ResponseEntity response;

        try {
            List<Client> responseClient = clientService.getClientsByAdvancedSearch(client);
            logger.info("[CLIENT_CONTROLLER] success POST  request  to {} results {}", Router.GET_CLIENTS_BY_ADVANCED,responseClient.toString());

            response = new ResponseEntity<>(responseClient, HttpStatus.OK);

        } catch (Exception e) {
            logger.error("[CLIENT_CONTROLLER] error in  POST  request  {} , due to {}", Router.GET_CLIENTS_BY_ADVANCED, e.getMessage(),e);
            response = new ResponseEntity<>( HttpStatus.INTERNAL_SERVER_ERROR);
        }

        return response;
    }

    @RequestMapping(value= "/api/**", method= OPTIONS)
    public void corsHeaders(HttpServletResponse response) {
        response.addHeader("Access-Control-Allow-Origin", "*");
        response.addHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
        response.addHeader("Access-Control-Allow-Headers", "origin, content-type, accept, x-requested-with");
        response.addHeader("Access-Control-Max-Age", "3600");
    }

}
