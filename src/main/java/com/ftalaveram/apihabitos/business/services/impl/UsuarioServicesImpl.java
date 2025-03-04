package com.ftalaveram.apihabitos.business.services.impl;

import java.util.Optional;

import org.springframework.stereotype.Service;

import com.ftalaveram.apihabitos.business.model.Usuario;
import com.ftalaveram.apihabitos.business.services.UsuarioServices;
import com.ftalaveram.apihabitos.integration.repositories.UsuarioRepository;

@Service
public class UsuarioServicesImpl implements UsuarioServices{

	private UsuarioRepository usuarioRepository;
	
	private PasswordServicesImpl passwordServicesImpl;
	
	public UsuarioServicesImpl(UsuarioRepository usuarioRepository) {
		this.usuarioRepository = usuarioRepository;
		this.passwordServicesImpl = new PasswordServicesImpl();
	}
	
	@Override
	public Long create(Usuario usuario) {

		if(usuario.getId() != null) {
			throw new IllegalStateException("No se puede crear un usuario con id distinto de null");
		}
		
		usuario.setPassword(passwordServicesImpl.ecryptPassword(usuario.getPassword()));
		
		Usuario usuarioCreado = usuarioRepository.save(usuario);
		
		return usuarioCreado.getId();
	}

	@Override
	public Optional<Usuario> read(Long id) {
		return usuarioRepository.findById(id);
	}

	@Override
	public void update(Usuario usuario) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void delete(Long id) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public Long register(Usuario usuario) throws IllegalStateException{
		
		if(usuario.getId() != null || usuarioRepository.findByEmail(usuario.getEmail()).isEmpty()) {
			throw new IllegalStateException();
		}
		
		usuario.setPassword(passwordServicesImpl.ecryptPassword(usuario.getPassword()));
		
		Usuario usuarioCreado = usuarioRepository.save(usuario);
		
		return usuarioCreado.getId();
	}

	@Override
	public Optional<Usuario> login(String email, String password) {
		
		Optional<Usuario> usuarioLogin = usuarioRepository.findByEmail(email);
		
		if(!usuarioLogin.isEmpty() && passwordServicesImpl.verifyPassword(password, usuarioLogin.get().getPassword())) {
			return usuarioLogin;
		}
		
		return Optional.empty();
	}

}
