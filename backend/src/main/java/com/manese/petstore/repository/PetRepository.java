package com.manese.petstore.repository;

import com.manese.petstore.model.Pet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface PetRepository extends JpaRepository<Pet, Long> {
    List<Pet> findByCategoryIgnoreCase(String category);
    List<Pet> findByNameContainingIgnoreCaseOrBreedContainingIgnoreCase(String name, String breed);
}
