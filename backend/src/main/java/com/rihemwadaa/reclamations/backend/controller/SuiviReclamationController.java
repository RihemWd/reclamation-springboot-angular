package com.rihemwadaa.reclamations.backend.controller;

import com.rihemwadaa.reclamations.backend.entity.SuiviReclamation;
import com.rihemwadaa.reclamations.backend.service.SuiviReclamationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/suivis")
public class SuiviReclamationController {
    @Autowired
    private SuiviReclamationService suiviReclamationService;

    @GetMapping
    public List<SuiviReclamation> getAll() { return suiviReclamationService.findAll(); }

    @GetMapping("/{id}")
    public Optional<SuiviReclamation> getById(@PathVariable Long id) { return suiviReclamationService.findById(id); }

    @PostMapping
    public SuiviReclamation create(@RequestBody SuiviReclamation suiviReclamation) { return suiviReclamationService.save(suiviReclamation); }

    @PutMapping("/{id}")
    public SuiviReclamation update(@PathVariable Long id, @RequestBody SuiviReclamation suiviReclamation) {
        suiviReclamation.setId(id);
        return suiviReclamationService.save(suiviReclamation);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) { suiviReclamationService.delete(id); }
}
