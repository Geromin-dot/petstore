package com.petstore.backend.controller;

import com.petstore.backend.model.Order;
import com.petstore.backend.model.OrderItem;
import com.petstore.backend.model.Pet;
import com.petstore.backend.repository.OrderRepository;
import com.petstore.backend.repository.PetRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin(origins = "http://localhost:5173")
public class OrderController {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private PetRepository petRepository;

    @GetMapping
    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    @PostMapping
    public ResponseEntity<Order> createOrder(@RequestBody Order order) {
        order.setOrderDate(new Date());
        
        // Calculate total amount and update pet statuses
        double total = 0.0;
        if (order.getItems() != null) {
            for (OrderItem item : order.getItems()) {
                if (item.getPet() != null && item.getPet().getId() != null) {
                    Pet pet = petRepository.findById(item.getPet().getId()).orElse(null);
                    if (pet != null && "Available".equalsIgnoreCase(pet.getStatus())) {
                        pet.setStatus("Sold");
                        petRepository.save(pet);
                        item.setPet(pet);
                        item.setPriceAtPurchase(pet.getPrice() != null ? pet.getPrice() : 0.0);
                        total += item.getPriceAtPurchase();
                    }
                }
            }
        }
        
        order.setTotalAmount(total);
        return ResponseEntity.ok(orderRepository.save(order));
    }
}
