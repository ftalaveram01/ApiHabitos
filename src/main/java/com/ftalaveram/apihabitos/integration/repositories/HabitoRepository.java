package com.ftalaveram.apihabitos.integration.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ftalaveram.apihabitos.business.model.Habito;

public interface HabitoRepository extends JpaRepository<Habito, Long>{
	
}
