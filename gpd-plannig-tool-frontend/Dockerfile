# Estágio de construção da aplicação
FROM node:20 AS build

WORKDIR /appbuild

COPY . .

RUN npm install --save-dev
RUN npm run build

# Estágio de execução da aplicação
FROM nginx:latest

COPY --from=build /appbuild/dist /usr/share/nginx/html

EXPOSE 80
