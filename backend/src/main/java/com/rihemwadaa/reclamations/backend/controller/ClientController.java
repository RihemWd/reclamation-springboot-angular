package com.rihemwadaa.reclamations.backend.controller;

import com.rihemwadaa.reclamations.backend.entity.Client;
import com.rihemwadaa.reclamations.backend.service.ClientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.PessimisticLockingFailureException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/clients")
public class ClientController {
    private static final Logger logger = LoggerFactory.getLogger(ClientController.class);

    @Autowired
    private ClientService clientService;

    @GetMapping
    public List<Client> getAll() { return clientService.findAll(); }

    @GetMapping("/{id}")
    public Optional<Client> getById(@PathVariable Long id) { return clientService.findById(id); }

    @PostMapping
    public Client create(@RequestBody Client client) { return clientService.save(client); }

    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable Long id, @RequestBody Client client) {
        logger.info("Updating client with ID: {}", id);
        logger.info("Client data received: {}", client);

        try {
            boolean updated = clientService.updateClient(id, client);
            if (updated) {
                logger.info("Client updated successfully with ID: {}", id);
                return ResponseEntity.ok().build();
            } else {
                logger.warn("Client with ID {} not found for update", id);
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            logger.error("Error updating client: {}", e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body("Une erreur est survenue lors de la mise à jour du client: " + e.getMessage());
        }
    }

    @PostMapping("/update/{id}")
    public ResponseEntity<?> updateWithPost(@PathVariable Long id, @RequestBody Client client) {
        logger.info("Updating client with POST method, ID: {}", id);
        logger.info("Client data received: {}", client);

        try {
            client.setId(id);
            Client updatedClient = clientService.save(client);
            logger.info("Client updated successfully with POST: {}", updatedClient);
            return ResponseEntity.ok(updatedClient);
        } catch (Exception e) {
            logger.error("Error updating client with POST: {}", e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body("Une erreur est survenue lors de la mise à jour du client: " + e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) { clientService.delete(id); }
}
