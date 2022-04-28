FROM node:17.9-alpine as build-step

RUN mkdir -p /app

WORKDIR /app
COPY package.json /app
RUN npm install
COPY . /app

RUN npm run build --prod