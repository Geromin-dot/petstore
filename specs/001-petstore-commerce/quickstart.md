# Quickstart Guide

## Prerequisites
- Java 17 or higher
- Node.js 18 or higher
- Maven

## Running the Backend
1. Navigate to the `backend` directory.
2. Run the command:
   ```bash
   ./mvnw spring-boot:run
   ```
3. The API will be available at `http://localhost:8080`.

## Running the Frontend
1. Navigate to the `frontend` directory.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
4. The application will be available at `http://localhost:5173`.

## Deployment
The project includes a `render.yaml` file for easy deployment on Render.
- **Backend Service**: Java/Maven service.
- **Frontend Service**: Static site service.
