# Laravel Project Setup

This project is built using Laravel, a popular PHP web application framework, and VueJS, a progressive JavaScript framework for building user interfaces.

## Prerequisites

- PHP 8.0 or higher
- Composer
- Node.js 14.x or higher
- npm

## Getting Started

1. **Clone the repository**:
```
git clone https://github.com/zorenleolumosbog/laravel-vue-crud-tasks
cd project-folder
```

2. **Install PHP dependencies**:
  ```
  composer install
  ```

3. **Setup the environment**:
- Copy the `.env.example` file to `.env`:
  ```
  cp .env.example .env
  ```
- Update the `.env` file with your database credentials and other configuration settings.

4. **Generate an application key**:
```
php artisan key:generate
```

5. **Setup the database**:
- Create a new database for your project.
- Update the database connection details in the `.env` file:
  ```
  DB_CONNECTION=mysql
  DB_HOST=127.0.0.1
  DB_PORT=3306
  DB_DATABASE=laravel_tasks
  DB_USERNAME=root
  DB_PASSWORD=
  ```
- Run the database migrations:
  ```
  php artisan migrate
  ```

6. **Run the backend locally**:
```
  php artisan serve
```

7. **Install and build the frontend dependencies**:
cd project-folder/public/vue folder
Using npm
```
npm install
npm run dev
```