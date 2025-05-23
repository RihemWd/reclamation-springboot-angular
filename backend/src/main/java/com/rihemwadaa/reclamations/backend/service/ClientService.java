package com.rihemwadaa.reclamations.backend.service;

import com.rihemwadaa.reclamations.backend.entity.Client;
import com.rihemwadaa.reclamations.backend.repository.ClientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class ClientService {
    @Autowired
    private ClientRepository clientRepository;

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Transactional(readOnly = true)
    public List<Client> findAll() { return clientRepository.findAll(); }

    @Transactional(readOnly = true)
    public Optional<Client> findById(Long id) { return clientRepository.findById(id); }

    @Transactional
    public Client save(Client client) { return clientRepository.save(client); }

    public boolean updateClient(Long id, Client client) {
        String sql = "UPDATE client SET nom = ?, email = ?, telephone = ? WHERE id = ?";
        int rowsAffected = jdbcTemplate.update(sql, client.getNom(), client.getEmail(), client.getTelephone(), id);
        return rowsAffected > 0;
    }

    @Transactional
    public void delete(Long id) { clientRepository.deleteById(id); }
}
