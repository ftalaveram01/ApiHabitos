package com.ftalaveram.apihabitos.business.services.impl;

import java.util.Optional;

import org.springframework.stereotype.Service;

import com.ftalaveram.apihabitos.business.model.Usuario;
import com.ftalaveram.apihabitos.business.services.UsuarioServices;
import com.ftalaveram.apihabitos.integration.repositories.UsuarioRepository;

@Service
public class UsuarioServicesImpl implements UsuarioServices{

	private UsuarioRepository usuarioRepository;
	
	public UsuarioServicesImpl(UsuarioRepository usuarioRepository) {
		this.usuarioRepository = usuarioRepository;
	}
	
	@Override
	public Long create(Usuario usuario) {
		// TODO Auto-generated method stub
		return null;
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
	public Long register(Usuario usuario) throws Exception{
		
		if(usuario.getId() != null) {
			throw new IllegalStateException();
		}
		
		usuario.setPassword("");
		
		usuarioRepository.save(usuario);
		
		return null;
	}

	@Override
	public Optional<Usuario> login(String email, String password) {
		// TODO Auto-generated method stub
		return Optional.empty();
	}

}
