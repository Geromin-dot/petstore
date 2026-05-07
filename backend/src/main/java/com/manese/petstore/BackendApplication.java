package com.manese.petstore;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class BackendApplication {

	public static void main(String[] args) {
		String dbUrl = System.getenv("DATABASE_URL");
		if (dbUrl != null && dbUrl.startsWith("postgres://")) {
			String jdbcUrl = dbUrl.replace("postgres://", "jdbc:postgresql://");
			System.setProperty("JDBC_DATABASE_URL", jdbcUrl);
		}
		SpringApplication.run(BackendApplication.class, args);
	}

}
