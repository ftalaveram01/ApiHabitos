package com.ftalaveram.apihabitos.business.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@NoArgsConstructor
@Setter
@Getter
@Table(name = "HABITOS")
public class Habito {
	
	@Id
	private Long id;
	private String nombre;
	private String descripcion;
	
}
