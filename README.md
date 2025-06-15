# Izam E-commerce Platform

This is a modular e-commerce platform built with Laravel and React, utilizing Docker for a streamlined development and deployment workflow.

## Table of Contents

- [Features](#features)
- [API Endpoints](#api-endpoints)
- [Authentication Flow](#authentication-flow)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
  - [Running the Application](#running-the-application)
- [Architecture](#architecture)
  - [Backend (Laravel Modules)](#backend-laravel-modules)
  - [Frontend (React Application)](#frontend-react-application)

## Features

This platform provides core e-commerce functionalities, including:

-   **User Management:** Secure authentication (login) and user profiles.
-   **Product Catalog:** Browse products, apply filters (category, price range, search).
-   **Shopping Cart:** Add, update, and remove products from the cart.
-   **Order Management:** Place orders and view order history.

## API Endpoints

The API endpoints are versioned and prefixed with `/api/v1`.

### User Module

-   `POST /api/v1/login`: Authenticate a user and receive an API token.
-   `POST /api/v1/logout`: Invalidate the current user's API token (requires authentication).

### Product Module

-   `GET /api/v1/products`: Retrieve a paginated list of products with optional filters (category, price range, search).

### Order Module

-   `POST /api/v1/orders`: Create a new order (requires authentication).


## Authentication Flow

The application uses Laravel Sanctum for API token authentication.

1.  **Login**: Users send their credentials (`email` and `password`) to the `POST /api/v1/login` endpoint.
2.  **Token Generation**: Upon successful authentication, the backend generates a `plainTextToken` (API token) and returns it along with user details and token expiration.
3.  **Client-side Storage**: The frontend (React application) stores this token (e.g., in a cookie or local storage) for subsequent authenticated requests.
4.  **Authenticated Requests**: For protected routes (e.g., creating an order, viewing user-specific orders), the client includes this token in the `Authorization` header as a Bearer token (`Authorization: Bearer YOUR_API_TOKEN`).
5.  **Logout**: Users can invalidate their current session token by sending a request to the `POST /api/v1/logout` endpoint.

## Technologies Used

-   **Backend:**
    -   Laravel 12
    -   Laravel Modules (nwidart/laravel-modules)
    -   MySQL 8.0.32
    -   Redis
    -   PHP-FPM 8.2
-   **Frontend:**
    -   React 18
    -   TypeScript
    -   Vite
    -   Redux Toolkit (for state management)
    -   React Router DOM (for navigation)
    -   Axios (for API communication)
    -   Sass (for styling)
    -   Tailwind
    -   Lucide React (for icons)
-   **DevOps/Infrastructure:**
    -   Docker
    -   Docker Compose
    -   Nginx (as a web server)
    -   Supervisor (for PHP processes)
-   **Database Management:**
    -   phpMyAdmin

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine.

### Prerequisites

Ensure you have the following installed on your system:

-   [Git](https://git-scm.com/)
-   [Docker](https://www.docker.com/get-started)
-   [Docker Compose](https://docs.docker.com/compose/install/)

### Environment Variables

The project uses two environment files:

-   `.env`: For Laravel application-specific configurations.
-   `.env.docker`: For Docker Compose service configurations.

Make sure to configure them according to your needs. Examples are provided in `.env.example` and `.env.docker.example`.

### Running the Application

1.  **Clone the repository:**
    ```bash
    git clone <repository_url>
    cd izam-ecommerce
    ```

2.  **Create environment files:**
    ```bash
    cp .env.example .env
    cp .env.docker.example .env.docker
    ```

To start all Docker services (Nginx, PHP, MySQL, Redis, phpMyAdmin):

```bash
cd devops && docker compose up -d
```

To start the React development server with hot reloading:

```bash
npm run dev
```

Access the application in your browser:

-   **Frontend:** `http://localhost:80` (or `APP_PORT` if changed)
-   **phpMyAdmin:** `http://localhost:9090` (or `PHPMYADMIN_PORT` if changed)

## Architecture

### Backend (Laravel Modules)

The Laravel backend is structured using the `nwidart/laravel-modules` package, promoting a modular and scalable architecture. Each major domain (e.g., User, Product, Order) is encapsulated within its own module.

**Example: `Modules/Order` Structure**

```
Modules/Order/
├── app/
│   ├── Events/          # Application events (e.g., OrderCreated)
│   ├── Http/
│   │   ├── Controllers/ # API controllers for order-related actions
│   │   ├── Requests/    # Form requests for validation
│   │   └── Resources/   # API resources for data transformation
│   ├── Listeners/       # Event listeners (e.g., LogOrderCreated)
│   ├── Models/          # Eloquent models (e.g., Order)
│   ├── Providers/       # Module-specific service providers (OrderServiceProvider, EventServiceProvider, RouteServiceProvider)
│   ├── Repositories/   # Abstraction layer for data access (OrderRepositoryInterface, OrderRepository)
│   └── Services/        # Business logic for orders (OrderService)
├── config/
│   └── config.php       # Module-specific configuration (tax rate, shipping rate, etc.)
├── database/
│   ├── factories/       # Model factories for testing and seeding
│   ├── migrations/      # Database migration files
│   └── seeders/         # Database seeders
├── routes/
│   ├── api.php          # API routes for the module
│   └── web.php          # Web routes (if any)
├── tests/
│   ├── Feature/         # Feature tests
│   └── Unit/            # Unit tests
└── module.json          # Module manifest file
```

This structure ensures a clear separation of concerns, making the codebase easier to manage, test, and scale.

### Frontend (React Application)

The React frontend follows a feature-centric organization, where code related to a specific feature (e.g., Products, Cart, Auth) is grouped together. Redux Toolkit is used for centralized state management.

**Example: `resources/ts/src/` Structure**

```
resources/ts/src/
├── App.tsx              # Main application component with routing
├── components/          # Reusable UI components
│   ├── Layout/          # Layout components (e.g., Header)
│   ├── Cart/            # Cart-specific components (CartItems, CartSummary, OrderSummary)
│   ├── Product/         # Product-specific components (ProductCard, ProductFilters, ProductGrid, ProductPagination)
│   └── shared/          # Generic reusable components (Button, Input, SearchInput)
├── hooks/               # Custom React hooks
├── pages/               # Top-level page components (e.g., Login, Products, Cart)
│   ├── Login/
│   ├── Products/
│   └── Cart/
├── store/               # Redux Toolkit store and slices
│   ├── auth/            # Authentication slice (auth.slice.ts, auth.service.ts, auth.types.ts)
│   ├── cart/            # Shopping cart slice (cart.slice.ts, cart.service.ts, cart.types.ts, cart.utils.ts)
│   └── product/         # Product catalog slice (product.slice.ts, product.service.ts, product.types.ts, product.utils.ts)
│   └── index.ts         # Redux store configuration
├── styles/              # Global styles and variables
├── config/              # Application configurations (e.g., axios instance)
├── data/                # Mock data or static data
└── main.tsx             # Entry point for the React application
```

This structure promotes modularity and maintainability, allowing developers to easily locate and work on specific features.
