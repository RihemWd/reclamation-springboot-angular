package com.rihemwadaa.reclamations.backend.service;

import com.rihemwadaa.reclamations.backend.entity.AgentSAV;
import com.rihemwadaa.reclamations.backend.repository.AgentSAVRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AgentSAVService {
    @Autowired
    private AgentSAVRepository agentSAVRepository;

    public List<AgentSAV> findAll() { return agentSAVRepository.findAll(); }
    public Optional<AgentSAV> findById(Long id) { return agentSAVRepository.findById(id); }
    public AgentSAV save(AgentSAV agentSAV) { return agentSAVRepository.save(agentSAV); }
    public void delete(Long id) { agentSAVRepository.deleteById(id); }
}
