package com.ftalaveram.apihabitos.business.services;

import java.util.List;
import java.util.Optional;

import com.ftalaveram.apihabitos.business.model.Habito;

public interface HabitoServices {
	
	Long create(Habito habito);
	
	Optional<Habito> read(Long id);
	
	void update(Habito habito);
	
	void delete(Long id);
	
	List<Habito> getAll();

}
