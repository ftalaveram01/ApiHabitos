package com.ftalaveram.apihabitos.business.services.impl;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

public class PasswordServicesImpl {
	
	private final PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
	
	public String ecryptPassword(String password) {
		return passwordEncoder.encode(password);
	}
	
	public boolean verifyPassword(String rawPassword, String encryptedPassword) {
		return passwordEncoder.matches(rawPassword, encryptedPassword);
	}
	
}
