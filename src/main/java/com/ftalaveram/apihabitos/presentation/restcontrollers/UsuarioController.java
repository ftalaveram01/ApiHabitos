package com.ftalaveram.apihabitos.presentation.restcontrollers;

import java.util.Optional;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ftalaveram.apihabitos.business.model.Usuario;
import com.ftalaveram.apihabitos.business.services.UsuarioServices;

@RestController
@RequestMapping("/rest/usuarios")
public class UsuarioController {
	
	private final UsuarioServices usuarioServices;
	
	public UsuarioController(UsuarioServices usuarioServices) {
		this.usuarioServices = usuarioServices;
	}
	
	@GetMapping("/{id}")
	public Usuario getUsuario(@PathVariable Long id) throws Exception{
		
		Optional<Usuario> optional = usuarioServices.read(id);
		
		if(optional.isEmpty()) {
			throw new Exception("No se ha podido encontrar el usuario con dicha id");
		}
		
		return optional.get();
	}
	
	public Usuario getUsuario(@RequestParam(required = true)String email, String password) {
		
		
		
		
		return null;
	}
	
}
