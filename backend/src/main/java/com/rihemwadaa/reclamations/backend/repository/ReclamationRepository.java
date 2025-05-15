package com.rihemwadaa.reclamations.backend.repository;

import com.rihemwadaa.reclamations.backend.entity.Reclamation;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReclamationRepository extends JpaRepository<Reclamation, Long> {
}
