# API Specification

The backend provides a RESTful API for managing pets and orders. All endpoints are prefixed with `/manese`.

## Pet API (`/manese/pets`)

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/` | Retrieve all pets. |
| `GET` | `/category/{category}` | Retrieve pets by category. |
| `GET` | `/search?query={query}` | Search pets by name or breed. |
| `GET` | `/{id}` | Retrieve a specific pet by ID. |
| `POST` | `/` | Create a new pet entry. |
| `PUT` | `/{id}` | Update an existing pet's details. |
| `DELETE` | `/{id}` | Delete a pet entry. |

## Order API (`/manese/orders`)

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/` | Retrieve all orders. |
| `POST` | `/` | Create a new order. This updates the status of the purchased pets to "Sold". |
