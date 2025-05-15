package com.rihemwadaa.reclamations.backend.controller;

import com.rihemwadaa.reclamations.backend.entity.Reclamation;
import com.rihemwadaa.reclamations.backend.service.ReclamationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/reclamations")
public class ReclamationController {
    @Autowired
    private ReclamationService reclamationService;

    @GetMapping
    public List<Reclamation> getAll() { return reclamationService.findAll(); }

    @GetMapping("/{id}")
    public Optional<Reclamation> getById(@PathVariable Long id) { return reclamationService.findById(id); }

    @PostMapping
    public Reclamation create(@RequestBody Reclamation reclamation) { return reclamationService.save(reclamation); }

    @PutMapping("/{id}")
    public Reclamation update(@PathVariable Long id, @RequestBody Reclamation reclamation) {
        reclamation.setId(id);
        return reclamationService.save(reclamation);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) { reclamationService.delete(id); }
}
