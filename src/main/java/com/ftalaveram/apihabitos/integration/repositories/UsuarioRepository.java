package com.ftalaveram.apihabitos.integration.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ftalaveram.apihabitos.business.model.Usuario;

public interface UsuarioRepository extends JpaRepository<Usuario, Long>{

}
