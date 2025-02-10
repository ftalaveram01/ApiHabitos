package com.ftalaveram.apihabitos.business.services.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.ftalaveram.apihabitos.business.model.Habito;
import com.ftalaveram.apihabitos.business.services.HabitoServices;
import com.ftalaveram.apihabitos.integration.repositories.HabitoRepository;

@Service
public class HabitoServicesImpl implements HabitoServices{
	
	private final HabitoRepository habitoRepository;
	
	public HabitoServicesImpl(HabitoRepository habitoRepository) {
		this.habitoRepository = habitoRepository;
	}

	@Override
	public Long create(Habito habito) {

		if(habito.getId() != null) {
			throw new IllegalStateException("Para crear un habito el id debe de ser null");
		}
		
		Habito habitoCreado = habitoRepository.save(habito);
		
		return habitoCreado.getId();
	}

	@Override
	public Optional<Habito> read(Long id) {
		return habitoRepository.findById(id);
	}

	@Override
	public void update(Habito habito) {
		
		if(!habitoRepository.existsById(habito.getId())) {
			throw new IllegalStateException("El habito con id [" + habito.getId() + "] no existe.");
		}
		
		habitoRepository.save(habito);
		
	}

	//TODO --> Mirar el caso de que el habito pertenezca al usuario, no a cualquiera como ahora
	@Override
	public void delete(Long id) {
		
		if(!habitoRepository.existsById(id)) {
			throw new IllegalStateException("El habito con id [" + id + "] no existe.");
		}
		
		habitoRepository.deleteById(id);
		
	}

	@Override
	public List<Habito> getAll() {
		return habitoRepository.findAll();
	}

}
