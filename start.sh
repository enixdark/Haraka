#!/bin/bash

for f in /usr/local/haraka/config/*.ini; do
  echo $f
  sed -i -e "s/{{MYSQL_USERNAME}}/$MYSQL_USERNAME/g" \
         -e "s/{{MYSQL_HOST}}/$MYSQL_HOST/g" \
         -e "s/{{MYSQL_PORT}}/$MYSQL_PORT/g" \
         -e "s/{{MYSQL_DATABASE}}/$MYSQL_DATABASE/g" \
         -e "s/{{MYSQL_PASSWORD}}/$MYSQL_PASSWORD/g" \
         -e "s/{{MYSQL_TABLE}}/$MYSQL_TABLE/g" \
         -e "s/{{REJECTUNAUTHORIZED}}/$REJECTUNAUTHORIZED/g" \
         -e "s/{{RABBITMQ_EXCHANGE}}/$RABBITMQ_EXCHANGE/g" \
         -e "s/{{RABBITMQ_HOST}}/$RABBITMQ_HOST/g" \
         -e "s/{{RABBITMQ_USERNAME}}/$RABBITMQ_USERNAME/g" \
         -e "s/{{RABBITMQ_PORT}}/$RABBITMQ_PORT/g" \
         -e "s/{{RABBITMQ_PASSWORD}}/$RABBITMQ_PASSWORD/g" \
         -e "s/{{RABBITMQ_QUEUE}}/$RABBITMQ_QUEUE/g" \
         -e "s/{{RABBITMQ_DELIVERY_MODE}}/$RABBITMQ_DELIVERY_MODE/g" \
         -e "s/{{RABBITMQ_DURABLE}}/$RABBITMQ_DURABLE/g" \
         -e "s/{{RABBITMQ_AUTO_DELETE}}/$RABBITMQ_AUTO_DELETE/g" \
         -e "s/{{RABBITMQ_CONFIRM}}/$RABBITMQ_CONFIRM/g" \
         -e "s/{{RABBITMQ_EXCHANGE_TYPE}}/$RABBITMQ_EXCHANGE_TYPE/g" \
         -e "s/{{M_WORKER_CONNECT_URI}}/$M_WORKER_CONNECT_URI/g" \
         -e "s/{{M_WORKER_TLS}}/$M_WORKER_TLS/g" \
         -e "s/{{RABBITMQ_ROUTING}}/$RABBITMQ_ROUTING/g" $f
done

http-server
#node haraka.js
