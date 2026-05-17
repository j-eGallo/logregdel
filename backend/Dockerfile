FROM php:8.3-cli

WORKDIR /app

RUN apt-get update && apt-get install -y \
  git \
  unzip \
  libicu-dev \
  libzip-dev \
  libpq-dev \
  zip \
  ca-certificates

RUN docker-php-ext-install intl pdo pdo_pgsql zip

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

COPY . .

RUN composer install

EXPOSE 8000

CMD php -S 0.0.0.0:8000 -t public