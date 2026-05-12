# Data Model

## Entities

### Pet
Represents an animal available for sale in the pet store.

- `id` (Long): Unique identifier, auto-generated.
- `name` (String): Name of the pet.
- `breed` (String): Breed of the pet.
- `category` (String): Category (e.g., Dog, Cat, Bird).
- `status` (String): Availability status (`Available`, `Pending`, `Sold`).
- `imageUrl` (String): URL to the pet's image.
- `price` (Double): Price of the pet.
- `description` (String): Detailed description of the pet.

### Order
Represents a customer purchase.

- `id` (Long): Unique identifier, auto-generated.
- `customerName` (String): Name of the customer.
- `customerEmail` (String): Email of the customer.
- `totalAmount` (Double): Total price of the order.
- `orderDate` (Date): Date and time the order was placed.
- `items` (List<OrderItem>): List of items included in the order.

### OrderItem
Represents a specific pet included in an order.

- `id` (Long): Unique identifier, auto-generated.
- `pet` (Pet): Reference to the purchased pet.
- `priceAtPurchase` (Double): The price of the pet at the time it was bought.
