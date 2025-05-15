package com.rihemwadaa.reclamations.backend.service;

import com.rihemwadaa.reclamations.backend.entity.Reclamation;
import com.rihemwadaa.reclamations.backend.repository.ReclamationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ReclamationService {
    @Autowired
    private ReclamationRepository reclamationRepository;

    public List<Reclamation> findAll() { return reclamationRepository.findAll(); }
    public Optional<Reclamation> findById(Long id) { return reclamationRepository.findById(id); }
    public Reclamation save(Reclamation reclamation) { return reclamationRepository.save(reclamation); }
    public void delete(Long id) { reclamationRepository.deleteById(id); }
}
