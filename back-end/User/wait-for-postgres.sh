#!/bin/sh
until pg_isready -h db -p 5432 -U joaomiko; do
  echo "Aguardando PostgreSQL..."
  sleep 2
done

exec node userService.js
