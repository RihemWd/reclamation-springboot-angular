package com.rihemwadaa.reclamations.backend.controller;

import com.rihemwadaa.reclamations.backend.entity.AgentSAV;
import com.rihemwadaa.reclamations.backend.service.AgentSAVService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/agentsav")
public class AgentSAVController {
    @Autowired
    private AgentSAVService agentSAVService;

    @GetMapping
    public List<AgentSAV> getAll() { return agentSAVService.findAll(); }

    @GetMapping("/{id}")
    public Optional<AgentSAV> getById(@PathVariable Long id) { return agentSAVService.findById(id); }

    @PostMapping
    public AgentSAV create(@RequestBody AgentSAV agentSAV) { return agentSAVService.save(agentSAV); }

    @PutMapping("/{id}")
    public AgentSAV update(@PathVariable Long id, @RequestBody AgentSAV agentSAV) {
        agentSAV.setId(id);
        return agentSAVService.save(agentSAV);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) { agentSAVService.delete(id); }
}
