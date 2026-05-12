# Implementation Plan - Petstore Commerce

## Overview
This project is a full-stack e-commerce platform for a pet store, featuring a Spring Boot backend and a React (Vite) frontend.

## Technology Stack

### Backend
- **Framework**: Spring Boot 3
- **Language**: Java
- **Persistence**: Spring Data JPA with H2/PostgreSQL
- **Build Tool**: Maven
- **Utilities**: Lombok for boilerplate reduction

### Frontend
- **Framework**: React with Vite
- **Styling**: Vanilla CSS / Modular CSS
- **Routing**: React Router DOM
- **State Management**: React Hooks (useState, useEffect)

## Architecture
- **Monorepo Structure**: Backend and Frontend are housed in the same repository.
- **RESTful Design**: Frontend communicates with the backend via a set of standard REST endpoints.
- **Deployment**: Configured for deployment on Render (see `render.yaml`).
