package com.rihemwadaa.reclamations.backend.entity;

import jakarta.persistence.*;
import java.util.List;
import java.util.Date;

@Entity
public class Reclamation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "client_id")
    private Client client;

    private String produit;
    private String statut;
    private String description;
    private Date date;
    private Integer note;
    private String objet;

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public Client getClient() { return client; }
    public void setClient(Client client) { this.client = client; }
    public String getProduit() { return produit; }
    public void setProduit(String produit) { this.produit = produit; }
    public String getStatut() { return statut; }
    public void setStatut(String statut) { this.statut = statut; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public Date getDate() { return date; }
    public void setDate(Date date) { this.date = date; }
    public Integer getNote() { return note; }
    public void setNote(Integer note) { this.note = note; }
    public String getObjet() { return objet; }
    public void setObjet(String objet) { this.objet = objet; }
}
