package com.ftalaveram.apihabitos.presentation.restcontrollers;

import java.util.List;
import java.util.Optional;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ftalaveram.apihabitos.business.model.Habito;
import com.ftalaveram.apihabitos.business.services.HabitoServices;

@RestController
@RequestMapping("/rest/habitos")
public class HabitoController {

	private final HabitoServices habitoServices;

	public HabitoController(HabitoServices habitoServices) {
		this.habitoServices = habitoServices;
	}
	
	@CrossOrigin(origins = "*")
	@GetMapping
	public List<Habito> getAll(){
		return habitoServices.getAll();
	}
	
	@GetMapping("/{id}")
	public Habito getHabito(@PathVariable Long id) throws Exception{
		
		Optional<Habito> optional = habitoServices.read(id);
		
		if(optional.isEmpty()) {
			throw new Exception("No se ha podido encontrar el habito con dicha id");
		}
		
		return optional.get();
	}
}
