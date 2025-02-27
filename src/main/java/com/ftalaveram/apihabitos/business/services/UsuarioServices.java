package com.ftalaveram.apihabitos.business.services;

import java.util.Optional;

import com.ftalaveram.apihabitos.business.model.Usuario;

public interface UsuarioServices {
	
	Long create(Usuario usuario);
	
	Optional<Usuario> read(Long id);
	
	void update(Usuario usuario);
	
	void delete(Long id);
	
	Long register(Usuario usuario) throws Exception;
	
	Optional<Usuario> login(String email, String password) throws Exception;
	
}
