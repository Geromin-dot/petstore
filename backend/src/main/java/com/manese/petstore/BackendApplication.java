package com.manese.petstore;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class BackendApplication {

	public static void main(String[] args) {
		String dbUrl = System.getenv("DATABASE_URL");
		if (dbUrl != null && dbUrl.startsWith("postgres://")) {
			String jdbcUrl = dbUrl.replace("postgres://", "jdbc:postgresql://");
			System.setProperty("spring.datasource.url", jdbcUrl);
		}
		SpringApplication.run(BackendApplication.class, args);
	}

}
