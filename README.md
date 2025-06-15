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
- [Manual Installation (without Docker)](#manual-installation-without-docker)
- [Architecture](#architecture)
  - [Backend (Laravel Modules)](#backend-laravel-modules)
  - [Frontend (React Application)](#frontend-react-application)
- [DevOps Environment](#devops-environment)
- [Logging](#logging)

## Features

This platform provides core e-commerce functionalities, including:

-   **User Management:** Secure authentication (login).
-   **Product Catalog:** Browse products, apply filters (category, price range, search).
-   **Shopping Cart:** Add, update, and remove products from the cart.
-   **Order Management:** Place orders and view order history.

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
    git clone https://github.com/mohamedjs/izam-ecommerce
    cd izam-ecommerce
    ```

2.  **Create environment files:**
    ```bash
    cp .env.example .env
    ```
4. **Create Docker environment files:**
    ```bash
        cd devops
        cp .env.docker.example .env
    ```
5. To start all Docker services (Nginx, PHP, MySQL, Redis, phpMyAdmin):

    ```bash
    cd devops && docker compose up -d
    ```

Access the application in your browser:

-   **Application:** `http://localhost:8000` (or `APP_PORT` if changed)
-   **phpMyAdmin:** `http://localhost:9090` (or `PHPMYADMIN_PORT` if changed)

## Manual Installation (without Docker)

If you prefer to run the application directly on your host machine without Docker, follow these steps. Ensure you have PHP (8.2+), Composer, Node.js, NPM, MySQL, and Redis installed and configured.

### Prerequisites (Manual Installation)

-   [PHP](https://www.php.net/downloads.php) (8.2 or higher)
-   [Composer](https://getcomposer.org/download/)
-   [Node.js](https://nodejs.org/en/download/) (LTS version) and NPM
-   [MySQL Server](https://dev.mysql.com/downloads/mysql/)
-   [Redis Server](https://redis.io/docs/getting-started/installation/)

### Installation Steps (Manual)

1.  **Clone the repository:**
    ```bash
    git clone <repository_url>
    cd izam-ecommerce
    ```

2.  **Create environment file:**
    ```bash
    cp .env.example .env
    ```

3.  **Configure `.env`:**
    -   Update `DB_HOST`, `DB_PORT`, `DB_DATABASE`, `DB_USERNAME`, and `DB_PASSWORD` to match your local MySQL setup.
    -   Ensure `REDIS_HOST`, `REDIS_PASSWORD`, and `REDIS_PORT` are configured for your local Redis instance.
    -   Set `CACHE_DRIVER=redis` and `QUEUE_CONNECTION=redis` to utilize Redis for caching and queues, as intended by the application architecture.
    -   Set `APP_URL` and `VITE_API_URL` to match your local serving address (e.g., `http://localhost:8000`).

4.  **Generate Application Key:**
    ```bash
    php artisan key:generate
    ```

5.  **Install PHP Dependencies:**
    ```bash
    composer install
    ```

6.  **Run Migrations and Seeders:**
    ```bash
    php artisan migrate --seed
    ```

7.  **Install Node.js Dependencies:**
    ```bash
    npm install
    ```

8.  **Build Frontend Assets:**
    ```bash
    npm run build
    ```

9.  **Serve the Laravel Application:**
    ```bash
    php artisan serve
    ```

10. **Start the Frontend Development Server (for development):**
    If you are developing, you will also need to start the Vite development server:
    ```bash
    npm run dev
    ```
    Access the application at `http://localhost:5173` (or your configured Vite port).

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
│   └── product/         # Product management slice
│       ├── product.slice.ts    # Redux slice for product state management
│       ├── product.service.ts  # API service for product operations
│       ├── product.types.ts    # TypeScript interfaces and types
│       ├── product.utils.ts    # Helper functions for product data manipulation
│       └── product.actions.ts  # Action creators for product operations
│   └── index.ts         # Redux store configuration
├── styles/              # Global styles and variables
├── config/              # Application configurations (e.g., axios instance)
├── data/                # Mock data or static data
└── main.tsx             # Entry point for the React application
```

This structure promotes modularity and maintainability, allowing developers to easily locate and work on specific features.

## API Endpoints

The API endpoints are versioned and prefixed with `/api/v1`.

### User Module

-   `POST /api/v1/login`: Authenticate a user and receive an API token.
-   `POST /api/v1/logout`: Invalidate the current user's API token (requires authentication).

### Product Module

-   `GET /api/v1/products`: Retrieve a paginated list of products with optional filters (category, price range, search).

### Order Module

-   `POST /api/v1/orders`: Create a new order (requires authentication).

## DevOps Environment

The `docker-compose.yml` file defines and orchestrates the multi-container Docker environment for the Izam E-commerce platform. It sets up essential services like Nginx, PHP-FPM, MySQL, Redis, and phpMyAdmin, ensuring a robust and reproducible development environment.

### Services Overview:

-   **`nginx`:** (defined in `devops/docker-compose.yml`, image `nginx:latest`, custom `devops/nginx/Dockerfile`, config `devops/nginx/config/default.conf`)
    -   Acts as the primary web server, handling incoming HTTP requests.
    -   Serves static frontend assets (from `public/build`, etc.) and proxies API requests to the `php` service.
    -   Crucially, during development, it proxies requests for Vite's hot-reloading (`/@vite/`) and frontend assets (`/resources/.*\.js$`) directly to the `php` container, which is configured to run the Vite development server.
    -   Communicates with the `php` service over the `izam` network.

-   **`php`:** (defined in `devops/docker-compose.yml`, custom `devops/php/Dockerfile`, image `php:8.2-fpm`, config `devops/php/www.conf` and `devops/php/supervisord.conf`)
    -   The core application container for the Laravel backend.
    -   Runs `php-fpm` to process PHP requests received from Nginx.
    -   Uses `supervisor` to manage background processes, including the Laravel queue worker (`artisan queue:work redis`).
    -   The `APP_PATH` (`./`) and `APP_DOCUMENT_ROOT` (`/var/www/html/app`) volumes map your local project directory into the container, allowing for live code changes.
    -   During frontend development, this container also hosts the Vite development server, which Nginx proxies to.
    -   Communicates with `redis` and `db` services over the `izam` network.

-   **`redis`:** (defined in `devops/docker-compose.yml`, image `redis:latest`, config `devops/redis/redis.conf`)
    -   Provides an in-memory data store used by Laravel for caching and as a queue driver.
    -   Data persistence is handled via a Docker volume (`redis_data`).
    -   Accessible by the `php` service over the `izam` network.

-   **`db`:** (defined in `devops/docker-compose.yml`, image `mysql:8.0.32`)
    -   The MySQL database server where all application data is stored.
    -   Data persistence is handled via a Docker volume (`dbdata`).
    -   Accessible by the `php` and `phpmyadmin` services over the `izam` network.

-   **`phpmyadmin`:** (defined in `devops/docker-compose.yml`, image `phpmyadmin/phpmyadmin`)
    -   A web-based interface for managing the MySQL database.
    -   Links directly to the `db` service for database connectivity.

### Internal Communication:

All services are interconnected via a custom Docker bridge network named `izam`. This network allows containers to communicate with each other using their service names as hostnames (e.g., `php` can access the database at `db:3306`). The `depends_on` directive in `docker-compose.yml` ensures that services start in the correct order, establishing dependencies between them.

For example:
-   `nginx` forwards PHP requests to `php:9000`.
-   `php` connects to the database at `db:3306` and Redis at `redis:6379`.
-   `phpmyadmin` connects to the database at `db:3306`.

### Accessing Docker Services (CLI)

You can access the shell of each running Docker service using `docker compose exec`:

-   **PHP Service:**
    ```bash
    docker compose exec php bash
    ```

-   **Redis Service:**
    ```bash
    docker compose exec redis bash
    ```

-   **Database Service (MySQL):**
    ```bash
    docker compose exec db bash
    ```

-   **Nginx Service:**
    ```bash
    docker compose exec nginx bash
    ```

This setup provides a consistent and isolated development environment, mimicking a production setup while offering ease of management and rapid iteration capabilities.

## Logging

The platform includes a comprehensive logging system for monitoring various aspects of the application.

-   **Supervisor Logs:** Located at `devops/logs/supervisord.log`, this file records logs from the Supervisor process manager, including the status of PHP-FPM and queue workers.
-   **Queue Worker Logs:** The Laravel queue worker, managed by Supervisor, logs its activities to `devops/logs/worker.log`. This includes output from processed jobs.
-   **PHP-FPM Logs:** PHP-FPM process logs can be found at `devops/logs/php-fpm.log`.
-   **Laravel Application Logs:** General Laravel application logs, including errors and queries, are stored in `storage/logs/laravel.log` within the Laravel application container.
-   **Order Creation Logs:** Specific logs for order creation events are managed by the `LogOrderCreated` listener `storage/logs/orders-date`
-   **Query Creation Logs:** Specific logs for any database query  `storage/logs/query`
