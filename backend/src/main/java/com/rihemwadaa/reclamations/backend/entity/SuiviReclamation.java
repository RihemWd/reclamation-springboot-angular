package com.rihemwadaa.reclamations.backend.entity;

import jakarta.persistence.*;
import java.util.Date;

@Entity
public class SuiviReclamation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String message;

    @ManyToOne
    @JoinColumn(name = "reclamation_id")
    private Reclamation reclamation;

    private String employe;
    private String action;
    private Date date;

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }
    public Reclamation getReclamation() { return reclamation; }
    public void setReclamation(Reclamation reclamation) { this.reclamation = reclamation; }
    public String getEmploye() { return employe; }
    public void setEmploye(String employe) { this.employe = employe; }
    public String getAction() { return action; }
    public void setAction(String action) { this.action = action; }
    public Date getDate() { return date; }
    public void setDate(Date date) { this.date = date; }
}
