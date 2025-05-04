# Backend - Know Your Fury

Este é o backend do projeto **Know Your Fury**, responsável por gerenciar a API REST, autenticação, análise de textos e persistência de dados no banco de dados MySQL.

---

## 🚀 Tecnologias Utilizadas

* **Node.js**: Ambiente de execução JavaScript no servidor.
* **Express**: Framework para construção de APIs.
* **MySQL**: Banco de dados relacional.
* **JWT (jsonwebtoken)**: Autenticação baseada em tokens.
* **Multer**: Upload de arquivos.
* **Hugging Face API**: Análise de texto com machine learning.
* **Axios**: Para requisições HTTP.

---

## 📂 Estrutura do Projeto

```
back-kyf/
├── .env                     # Variáveis de ambiente
├── .gitignore              # Arquivos ignorados pelo Git
├── package.json            # Dependências e scripts do projeto
├── src/                    # Código-fonte
│   ├── app.js              # Ponto de entrada do servidor
│   ├── config/             # Configurações
│   │   └── db.js           # Configuração do banco de dados
│   ├── controllers/        # Controladores das rotas
│   │   ├── interesseController.js
│   │   ├── socialAnalysisController.js
│   │   └── userController.js
│   ├── db/                 # Scripts do banco de dados
│   │   └── script.sql      # Script de criação do banco de dados
│   ├── middlewares/        # Middlewares
│   │   ├── authMiddleware.js
│   │   └── upload.js
│   ├── models/             # Modelos de dados
│   │   ├── Interesse.js
│   │   └── User.js
│   ├── routes/             # Rotas da API
│   │   ├── interesseRoutes.js
│   │   ├── socialAnalysis.js
│   │   └── userRoutes.js
│   ├── services/           # Serviços auxiliares
│   │   ├── huggingFaceService.js
│   │   └── usuariosService.js
│   └── utils/              # Utilitários
│       └── keywords.js
└── uploads/                # Diretório para upload de imagens
    └── usuarios/          # Imagens de usuários
```

---

## 🌟 Funcionalidades

* **Gerenciamento de Usuários**:
  * Cadastro de usuários com autenticação via JWT.
  * Upload de fotos para carteirinha digital.

* **Gerenciamento de Interesses**:
  * Criação e atualização de interesses (jogos, eventos, produtos).
  * Retorno de interesses do usuário autenticado.

* **Análise de Textos**:
  * Integração com a API Hugging Face para calcular o "Fandometro Score".
  * Identificação de palavras-chave e análise de sentimentos.

* **Banco de Dados**:
  * Persistência de dados no MySQL com tabelas para usuários e interesses.

---

## 🧪 Como Rodar o Backend Localmente

### Pré-requisitos:

* Node.js instalado (versão 16 ou superior).
* MySQL instalado e configurado.

### Passos:

1. Navegue até a pasta do backend:

```bash
cd back-kyf
```

2. Instale as dependências:

```bash
npm install
```

3. Configure o arquivo `.env` com as seguintes variáveis:

```env
MYSQL_URL=mysql://<usuario>:<senha>@<host>:<porta>/<banco_de_dados>
JWT_SECRET=<sua_chave_secreta>
JWT_EXPIRES_IN=1d
HUGGINGFACE_TOKEN=<seu_token_huggingface>
```

4. Inicie o servidor:

```bash
node app.js
```

O backend estará disponível em: [http://localhost:3000](http://localhost:3000)

---

## 🌐 Ambiente de Produção

O backend foi implantado no Railway e está disponível no seguinte endereço:

**URL de Produção**: [https://know-your-fury-production-6ce7.up.railway.app](https://know-your-fury-production-6ce7.up.railway.app)

---

## 🔗 Endpoints Principais

### Usuários:
- `POST /usuarios`: Criação de usuário.
- `GET /usuarios/perfil`: Retorna os dados do usuário autenticado.
- `POST /usuarios/upload-imagem`: Upload de foto do usuário.

### Interesses:
- `POST /interesses`: Criação ou atualização de interesses.
- `GET /interesses`: Retorna os interesses do usuário autenticado.

### Social Analysis:
- `POST /social/fandometro`: Calcula o "Fandometro Score" com base nos textos fornecidos.

---

## 🗃 Estrutura do Banco de Dados

### Tabela `usuarios`:

| Campo             | Tipo         | Descrição                      |
|------------------|--------------|-------------------------------|
| id               | INT          | ID único do usuário.          |
| cpf              | VARCHAR(14)  | CPF do usuário.               |
| nome             | VARCHAR(100) | Nome do usuário.              |
| data_nascimento  | DATE         | Data de nascimento.           |
| fandometro_score | INT          | Pontuação do Fandometro.      |
| foto_url         | VARCHAR(255) | URL da foto do usuário.       |

### Tabela `interesses`:

| Campo   | Tipo         | Descrição                           |
|---------|--------------|--------------------------------------|
| id      | INT          | ID único do registro.               |
| cpf     | VARCHAR(14)  | CPF do usuário.                     |
| jogos   | JSON         | Lista de jogos favoritos.           |
| eventos | JSON         | Lista de eventos participados.      |
| compras | JSON         | Lista de produtos comprados.        |

---

## 📦 Dependências

### Principais:
- `express`: Framework para construção de APIs.
- `mysql2`: Conexão com o banco de dados MySQL.
- `jsonwebtoken`: Autenticação baseada em tokens.
- `multer`: Upload de arquivos.
- `axios`: Requisições HTTP.
- `dotenv`: Gerenciamento de variáveis de ambiente.

### Dev:
- `nodemon`: Reinício automático do servidor durante o desenvolvimento.

---

## 🛠 Próximos Passos

- Adicionar testes automatizados para os endpoints.
- Melhorar o tratamento de erros e validações.
- Implementar logs detalhados para monitoramento em produção.
