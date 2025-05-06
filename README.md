# Know Your Fury

**Know Your Fury** é uma aplicação web interativa criada para os fãs da FURIA.  
Ela permite que você crie um perfil personalizado, explore conteúdos exclusivos e receba uma **carteirinha digital de torcedor**.

O diferencial da plataforma é o uso de **Inteligência Artificial**, que analisa seus interesses, preferências e interações para calcular **o seu nível de fanatismo pela FURIA**, de forma dinâmica e personalizada.

## 🎨 Protótipo no Figma

Você pode visualizar o protótipo do KnowYourFury no Figma clicando no link abaixo:

🔗 [Acessar protótipo no Figma](https://www.figma.com/design/Ms4a2hmAw2jYM4MZTTnQLh/Know-Your-Fury?m=auto&t=BEfdaso2xbz6DoDP-6)


## 🗂 Estrutura do Projeto

```
KnowYourFury/
├── front-kyf/       # Código do frontend (React)
├── back-kyf/        # Código do backend (Node.js)
```

## 🚀 Tecnologias Utilizadas

### Frontend
- **React**: Biblioteca para construção de interfaces de usuário.
- **Vite**: Ferramenta de build para desenvolvimento rápido.
- **Material-UI (MUI)**: Componentes estilizados para React.
- **Axios**: Para requisições HTTP.
- **Tesseract.js**: OCR (reconhecimento de texto em imagens).
- **DND Kit**: Funcionalidade de drag-and-drop.

### Backend
- **Node.js**: Ambiente de execução JavaScript no servidor.
- **Express**: Framework para construção de APIs.
- **MySQL**: Banco de dados relacional.
- **JWT (jsonwebtoken)**: Autenticação baseada em tokens.
- **Multer**: Upload de arquivos.
- **Hugging Face API**: Análise de texto com machine learning.

## 🎯 Funcionalidades

### Frontend
- Cadastro de usuários com validação de RG via OCR.
- Configuração de interesses (jogos favoritos, eventos, produtos).
- Upload de foto para carteirinha personalizada.
- Drag-and-drop para ordenar jogos favoritos.
- Integração com redes sociais.

### Backend
- API REST para gerenciamento de usuários e interesses.
- Autenticação com JWT.
- Upload de imagens e armazenamento local.
- Análise textual com Hugging Face para cálculo do "Fandometro Score".
- Banco de dados MySQL para persistência.

## 🧪 Como Rodar o Projeto Localmente

### Pré-requisitos
- Node.js (v16 ou superior)
- MySQL instalado e configurado
- Arquivo `.env` devidamente configurado

### 1. Backend

```bash
cd back-kyf
npm install
# Crie um arquivo .env com as variáveis de ambiente necessárias
npm run dev
```

> O backend estará disponível em: `http://localhost:3000`

### 2. Frontend

```bash
cd front-kyf
npm install
npm run dev
```

> O frontend estará disponível em: `http://localhost:5173`

## 🌐 Ambientes de Produção

### Frontend
- URL: [https://know-your-fury.vercel.app](https://know-your-fury.vercel.app)

## 🔗 Endpoints Principais

### Usuários
- `POST /usuarios`: Criação de usuário.
- `GET /usuarios/perfil`: Retorna os dados do usuário autenticado.
- `POST /usuarios/upload-imagem`: Upload de foto do usuário.

### Interesses
- `POST /interesses`: Criação ou atualização de interesses.
- `GET /interesses`: Retorna os interesses do usuário autenticado.

### Social Analysis
- `POST /social/fandometro`: Calcula o "Fandometro Score" com base nos textos fornecidos.

## 🗃 Estrutura do Banco de Dados

### Tabela `usuarios`

| Campo             | Tipo         | Descrição                     |
|------------------|--------------|-------------------------------|
| id               | INT          | ID único do usuário           |
| cpf              | VARCHAR(14)  | CPF do usuário                |
| nome             | VARCHAR(100) | Nome do usuário               |
| data_nascimento  | DATE         | Data de nascimento            |
| fandometro_score | INT          | Pontuação do Fandometro       |
| foto_url         | VARCHAR(255) | URL da foto do usuário        |

### Tabela `interesses`

| Campo   | Tipo         | Descrição                          |
|---------|--------------|------------------------------------|
| id      | INT          | ID único do registro               |
| cpf     | VARCHAR(14)  | CPF do usuário                     |
| jogos   | JSON         | Lista de jogos favoritos           |
| eventos | JSON         | Lista de eventos participados      |
| compras | JSON         | Lista de produtos comprados        |

---

Feito com 💙 por um fã da FURIA!
