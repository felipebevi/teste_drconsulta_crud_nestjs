# Teste Dr.Consulta
**Felipe Bevilacqua**  
*2024-09-16*

## Descrição do Projeto
Este projeto é um CRUD simples desenvolvido em **NestJS** para a gestão de usuários. O sistema permite criar, listar, atualizar e excluir usuários via API. Além das funcionalidades básicas, o projeto foi incrementado com melhorias como uma página HTML para operação manual, testes automatizados, workflows para linting e testes, e a documentação automática via Swagger.

## Funcionalidades

- **CRUD completo via API**
  - Rotas para criar, listar, buscar, atualizar e excluir usuários.
  - DTOs para validar os dados de entrada nas operações.
  

## Comandos Básicos Utilizados

- Iniciando o projeto:

```bash
git init
nest new crud-drconsulta
cd crud-drconsulta
nest g res users
npm run start
```

- Executar com Docker:

```bash
docker build -t crud-drconsulta . && docker run -p 3000:3000 crud-drconsulta
```

## Melhorias Implementadas

### 1. CRUD via API
As rotas principais do CRUD foram implementadas com operações para criar, listar, buscar, atualizar e deletar usuários.  Seguindo as convenções RESTful POST PATCH DELETE.

### 2. Página HTML para Operação Manual
Uma interface simples em HTML foi desenvolvida para facilitar a interação com o sistema, onde o usuário pode realizar operações de CRUD sem ferramentas externas.

### 3. Testes Automatizados
Foram criados testes End-to-End para garantir a confiabilidade das APIs. O processo de criação, atualização e deleção de usuários foi validado.

### 4. Workflows de Linting e Testes no GitHub Actions - CICD
Dois workflows (para CICD) foram configurados:
- **Linting**: Para garantir que o código segue os padrões definidos.
- **Testes**: Para rodar automaticamente os testes end-to-end em cada commit.

### 5. Documentação com Swagger (/api)
Foi implementada a documentação interativa das APIs utilizando Swagger, permitindo visualizar e testar as rotas diretamente no navegador.


## Melhorias a fazer quando necessário

### 1. .ENV
Criar um .env caso seja necessário usar outro banco de dados ou deseje armazenar informações sensíveis

### 2. Sistema de autenticação
Caso seja pertinente, implementar um sistema de autenticação, podendo usar OAuth, JWToken ou outros métodos