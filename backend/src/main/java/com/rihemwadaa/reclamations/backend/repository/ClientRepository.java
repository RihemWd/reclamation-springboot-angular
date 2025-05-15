package com.rihemwadaa.reclamations.backend.repository;

import com.rihemwadaa.reclamations.backend.entity.Client;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ClientRepository extends JpaRepository<Client, Long> {
}
