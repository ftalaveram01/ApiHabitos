package com.ftalaveram.apihabitos.presentation.restcontrollers;

import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.util.UriComponentsBuilder;

import com.ftalaveram.apihabitos.business.model.Usuario;
import com.ftalaveram.apihabitos.business.services.UsuarioServices;
import com.ftalaveram.apihabitos.presentation.config.PresentationException;

@RestController
@RequestMapping("/rest/usuarios")
public class UsuarioController {
	
	private final UsuarioServices usuarioServices;
	
	public UsuarioController(UsuarioServices usuarioServices) {
		this.usuarioServices = usuarioServices;
	}
	
	@GetMapping("/{id}")
	public Usuario getUsuario(@PathVariable Long id) throws Exception{
		System.out.println("GET HABITO HA SIDO LLAMADO");
		
		Optional<Usuario> optional = usuarioServices.read(id);
		
		if(optional.isEmpty()) {
			throw new Exception("No se ha podido encontrar el usuario con dicha id");
		}
		
		return optional.get();
	}
	
	@PostMapping
	public ResponseEntity<String> createUsuario(@RequestBody Usuario usuario, UriComponentsBuilder ucb){
		
		Long id = usuario.getId();
		
		try {
			id = usuarioServices.create(usuario);
		}catch (IllegalStateException ise) {
			throw new PresentationException(ise.getMessage(), HttpStatus.BAD_REQUEST);
		}
		
		return ResponseEntity.created(ucb.path("/rest/usuarios/{id}").build(id)).build();
	}
	
}
