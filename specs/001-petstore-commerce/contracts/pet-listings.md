# Contract: Pet Listings API

Base path: `/manese`

## Common Response Shape

Each listing response includes the pet's identifier, name, category, breed, price, availability status, description, and image reference.

## List Pet Listings

- `GET /manese/pets`
- Returns the catalog of pet listings with fields needed for browsing, filtering, and detail display.
- Supports optional query parameters for search and category.

## Get Pet Listing

- `GET /manese/pets/{id}`
- Returns one pet listing or a not-found response.

## Create Pet Listing

- `POST /manese/pets`
- Creates a new pet listing.
- Requires validation for required catalog fields (name, category, price).

## Update Pet Listing

- `PUT /manese/pets/{id}`
- Replaces or updates a pet listing.
- Returns the updated record.

## Delete Pet Listing

- `DELETE /manese/pets/{id}`
- Removes a pet listing from the catalog.

## Admin List Pet Listings

- `GET /manese/pets`
- Returns the editable catalog view used by the admin screen (sharing the same endpoint as the main catalog for this implementation).

## Expected Behavior

- Validation failures return clear client errors.
- Unavailable pets (marked as "Sold") remain in the catalog data but should be handled appropriately by the storefront (e.g., hidden or disabled purchase actions).
- Responses are shaped so the frontend can render cards, detail views, and filters without extra transformation.
