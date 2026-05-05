package com.petstore.backend.controller;

import com.petstore.backend.model.Pet;
import com.petstore.backend.repository.PetRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/pets")
@CrossOrigin(origins = "http://localhost:5173") // Allow Vite frontend
public class PetController {

    @Autowired
    private PetRepository petRepository;

    @GetMapping
    public List<Pet> getAllPets() {
        return petRepository.findAll();
    }

    @GetMapping("/category/{category}")
    public List<Pet> getPetsByCategory(@PathVariable String category) {
        return petRepository.findByCategoryIgnoreCase(category);
    }

    @GetMapping("/search")
    public List<Pet> searchPets(@RequestParam String query) {
        return petRepository.findByNameContainingIgnoreCaseOrBreedContainingIgnoreCase(query, query);
    }

    @PostMapping
    public Pet createPet(@RequestBody Pet pet) {
        return petRepository.save(pet);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Pet> getPetById(@PathVariable Long id) {
        return petRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Pet> updatePet(@PathVariable Long id, @RequestBody Pet petDetails) {
        return petRepository.findById(id)
                .map(pet -> {
                    pet.setName(petDetails.getName());
                    pet.setBreed(petDetails.getBreed());
                    pet.setCategory(petDetails.getCategory());
                    pet.setStatus(petDetails.getStatus());
                    pet.setImageUrl(petDetails.getImageUrl());
                    pet.setPrice(petDetails.getPrice());
                    pet.setDescription(petDetails.getDescription());
                    return ResponseEntity.ok(petRepository.save(pet));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePet(@PathVariable Long id) {
        if (petRepository.existsById(id)) {
            petRepository.deleteById(id);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }
}
