package com.rihemwadaa.reclamations.backend.entity;

import jakarta.persistence.*;

@Entity
public class AgentSAV {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nom;
    private String competence;

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getNom() { return nom; }
    public void setNom(String nom) { this.nom = nom; }
    public String getCompetence() { return competence; }
    public void setCompetence(String competence) { this.competence = competence; }
}
