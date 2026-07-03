FROM php:8.4-alpine

# Install sqlite and composer dependencies (git, unzip are needed by composer)
RUN apk add --no-cache sqlite-dev sqlite git unzip

# Install PHP extensions if needed (pdo_sqlite is built-in or easy to install)
RUN docker-php-ext-install pdo pdo_sqlite

# Copy composer from official image
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

WORKDIR /var/www/html

COPY . .

# Run composer install to generate the vendor directory and autoload files
RUN composer install --no-dev --optimize-autoloader --no-interaction

# Make sure permissions are correct for sqlite database writes
RUN touch database/database.sqlite && chmod -R 777 database storage

CMD sh -c "php artisan migrate:fresh --seed --force && php artisan serve --host=0.0.0.0 --port=${PORT:-8000}"
