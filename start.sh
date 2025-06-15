chmod -R 777 .
composer install
npm install
npm run build
php artisan migrate --seed
npm run dev & /usr/bin/supervisord
