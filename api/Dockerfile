FROM php:8.4-alpine

# Install sqlite dependencies
RUN apk add --no-cache sqlite-dev sqlite

WORKDIR /var/www/html

COPY . .

# Make sure permissions are correct for sqlite database writes
RUN touch database/database.sqlite && chmod -R 777 database storage

EXPOSE 8000

CMD ["php", "artisan", "serve", "--host=0.0.0.0", "--port=8000"]
