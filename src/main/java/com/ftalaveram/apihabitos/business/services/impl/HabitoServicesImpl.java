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
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Optional<Habito> read(Long id) {
		return habitoRepository.findById(id);
	}

	@Override
	public void update(Habito habito) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void delete(Long id) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public List<Habito> getAll() {
		return habitoRepository.findAll();
	}

}
