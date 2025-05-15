package com.rihemwadaa.reclamations.backend.service;

import com.rihemwadaa.reclamations.backend.entity.SuiviReclamation;
import com.rihemwadaa.reclamations.backend.repository.SuiviReclamationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SuiviReclamationService {
    @Autowired
    private SuiviReclamationRepository suiviReclamationRepository;

    public List<SuiviReclamation> findAll() { return suiviReclamationRepository.findAll(); }
    public Optional<SuiviReclamation> findById(Long id) { return suiviReclamationRepository.findById(id); }
    public SuiviReclamation save(SuiviReclamation suiviReclamation) { return suiviReclamationRepository.save(suiviReclamation); }
    public void delete(Long id) { suiviReclamationRepository.deleteById(id); }
}
