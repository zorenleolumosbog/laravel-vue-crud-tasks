# Laravel Project Setup

This project is built using Laravel, a popular PHP web application framework, and VueJS, a progressive JavaScript framework for building user interfaces.

## Prerequisites

- PHP 8.2 or higher
- Composer
- Node.js 14.x or higher
- npm

## Backend

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
```
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=laravel_tasks
DB_USERNAME=root
DB_PASSWORD=
```

4. **Generate an application key**:
```
php artisan key:generate
```

- Run the database migrations:
```
php artisan migrate
```

5. **Run tags seeder**:
```
php artisan db:seed
```

6. **Create a symbolic link for public storage, run this command:**:
```
php artisan storage:link
```

7. **Run the backend locally**:
```
php artisan serve
```

8. **To delete tasks that have been archived for more than a week automatically, run this command**:
```
php artisan schedule:work
```

## Frontend

1. **Install frontend dependencies and run locally**:
```
cd project-folder/client-vue
```

3. **Setup the environment**:
- Copy the `.env.example` file to `.env`:
```
cp .env.example .env
```
- Update the `.env` file with api base url.
```
VITE_API_URL = 'http://localhost:8000/api'
```

- Using npm
```
npm install
npm run dev
```

## API Documentation Link
https://documenter.getpostman.com/view/6492451/2sAY51AM28