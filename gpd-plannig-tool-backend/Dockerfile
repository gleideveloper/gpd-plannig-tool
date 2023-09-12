# Estágio de construção da aplicação
FROM node:18.16 AS build

WORKDIR /appbuild

COPY package.json .
COPY package-lock.json .
COPY tsconfig.json .
COPY ./src ./src

RUN npm install --save-dev
RUN npm run build

# Estágio de execução da aplicação
FROM node:18.16

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./
COPY .env .

COPY --from=build /appbuild/dist ./dist

RUN npm install --production

EXPOSE 4444

CMD npm start
