# Projeto Final Web Academy Hands-On

Projeto FullStack Modularizado Backend e Frontend.

## UFAM - Instituto de Computação (ICOMP)

Web Academy - Capacitação e Desenvolvimento em Web Full Stack

Equipe:
- Gleides Vinente
- Nathália Santos
- Solano Lima
- André Xavier
- Laura Lima
- Luiz Carlos

### Objetivo

O objetivo deste trabalho prático é colocarmos em prática os conceitos aprendidos durante o curso Web Academy, colocando
uma aplicação web no ar utilizando contêineres na nuvem do Azure.

## Descrição

Você foi responsável por colocar no ar a aplicação de listagem de livros do Web Academy. Foi sugerido que a aplicação
funcionasse de maneira flexível e de fácil configuração entre ambientes, então você decidiu utilizar o Docker para rodar
as aplicações.

A infraestrutura dessa aplicação consiste em:

- Um servidor de banco de dados MySQL
- Uma aplicação backend escrita em Node.js com Typescript
- Uma aplicação frontend escrita em React com Typescript
- Uma aplicação de gerenciamento de banco de dados no Azure

## Repositório Remoto

O repositório remoto do projeto está disponível no GitHub.
Você pode acessá-lo
em: [https://github.com/gleideveloper/gpd-plannig-tool](https://github.com/gleideveloper/gpd-plannig-tool).

## Pré-condição

Antes de executar o projeto, certifique-se de ter o Docker instalado em sua máquina.

## Estrutura de Pasta

Certifique-se de que a estrutura de pasta do projeto esteja organizada da seguinte forma:

```
Docker-FullStack/
  ├── backend/
  │   ├── ... arquivos e pastas do backend ...
  │   └── Dockerfile
  ├── frontend/
  │   ├── ... arquivos e pastas do frontend ...
  │   └── Dockerfile
  └── docker-compose.yml
```

## Comandos Docker

### Executar o projeto

```
docker-compose up -d
```

Este comando irá executar o projeto utilizando o Docker Compose, criando e iniciando os containers necessários em
segundo plano (-d).

