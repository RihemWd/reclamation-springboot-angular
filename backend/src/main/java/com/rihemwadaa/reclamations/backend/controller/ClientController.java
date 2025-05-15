package com.rihemwadaa.reclamations.backend.controller;

import com.rihemwadaa.reclamations.backend.entity.Client;
import com.rihemwadaa.reclamations.backend.service.ClientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/clients")
public class ClientController {
    @Autowired
    private ClientService clientService;

    @GetMapping
    public List<Client> getAll() { return clientService.findAll(); }

    @GetMapping("/{id}")
    public Optional<Client> getById(@PathVariable Long id) { return clientService.findById(id); }

    @PostMapping
    public Client create(@RequestBody Client client) { return clientService.save(client); }

    @PutMapping("/{id}")
    public Client update(@PathVariable Long id, @RequestBody Client client) {
        client.setId(id);
        return clientService.save(client);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) { clientService.delete(id); }
}
