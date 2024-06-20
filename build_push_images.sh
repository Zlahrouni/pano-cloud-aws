#!/bin/bash

docker pull postgres
docker tag postgres 127.0.0.1:5000/postgres
docker push 127.0.0.1:5000/postgres

docker build -t 127.0.0.1:5000/backend:1.0 -f ./backend/Dockerfile ./backend
docker push 127.0.0.1:5000/backend:1.0

docker build -t 127.0.0.1:5000/frontend:1.0 -f ./frontend/Dockerfile ./frontend
docker push 127.0.0.1:5000/frontend:1.0

docker pull nginx:alpine
docker tag nginx:alpine 127.0.0.1:5000/nginx:alpine
docker push 127.0.0.1:5000/nginx:alpine
