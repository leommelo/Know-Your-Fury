# Frontend - Know Your Fury

Este é o frontend do projeto **Know Your Fury**, uma aplicação web que permite aos fãs da FURIA criar perfis personalizados, interagir com conteúdos exclusivos e obter uma carteirinha digital.

---

## 🚀 Tecnologias Utilizadas

- **React**: Biblioteca para construção de interfaces de usuário.
- **Vite**: Ferramenta de build para desenvolvimento rápido.
- **Material-UI (MUI)**: Componentes estilizados para React.
- **Axios**: Para requisições HTTP.
- **Tesseract.js**: OCR (reconhecimento de texto em imagens).
- **DND Kit**: Funcionalidade de drag-and-drop.

---

## 📂 Estrutura do Projeto

```
front-kyf/
├── public/                  # Arquivos públicos
├── src/                     # Código-fonte
│   ├── assets/              # Imagens e outros recursos estáticos
│   ├── components/          # Componentes reutilizáveis
│   ├── Pages/               # Páginas principais da aplicação
│   ├── Utils/               # Funções utilitárias
│   ├── App.jsx              # Componente principal da aplicação
│   ├── main.jsx             # Ponto de entrada do React
│   ├── index.css            # Estilos globais
├── .gitignore               # Arquivos ignorados pelo Git
├── package.json             # Dependências e scripts do projeto
├── vite.config.js           # Configuração do Vite
└── README.md                # Documentação do frontend
```

---

## 🌟 Funcionalidades

- **Cadastro de Usuários**:
  - Validação de RG via OCR utilizando Tesseract.js.
  - Máscaras para CPF e data de nascimento.
- **Configuração de Interesses**:
  - Drag-and-drop para ordenar jogos favoritos.
  - Adição de eventos e produtos comprados.
- **Carteirinha Digital**:
  - Geração de carteirinha personalizada com nome, foto e pontuação.
  - Download da carteirinha em formato PNG.
- **Integração com Redes Sociais**:
  - Botões para conectar-se a redes sociais.

---

## 🧪 Como Rodar o Frontend Localmente

### Pré-requisitos:
- Node.js instalado (versão 16 ou superior).

### Passos:
1. Navegue até a pasta do frontend:
   ```bash
   cd front-kyf
   ```
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```

O frontend estará disponível em: [http://localhost:5173](http://localhost:5173)

---

## 🌐 Ambiente de Produção

O frontend foi implantado no Vercel e está disponível no seguinte endereço:

**URL de Produção**: [https://know-your-fury.vercel.app](https://know-your-fury.vercel.app)

---

## 📂 Componentes Principais

- **SprayButton**: Botão estilizado com animação e suporte a estado de carregamento.  
  Local: `src/components/SprayButton/SprayButton.jsx`

- **DragAndDropLista**: Componente para ordenar jogos favoritos com funcionalidade de drag-and-drop.  
  Local: `src/components/DragAndDropList/DragAndDropList.jsx`

- **Carteirinha**: Componente para exibir a carteirinha digital do usuário.  
  Local: `src/components/Carteirinha/Carteirinha.jsx`

- **BlocoPergunta**: Componente para perguntas com opções de resposta e campos adicionais.  
  Local: `src/components/BlocoPergunta/BlocoPergunta.jsx`

- **RedeSocial**: Botões para conectar-se a redes sociais.  
  Local: `src/components/RedeSocial/RedeSocial.jsx`

---

## 📄 Páginas Principais

- **MainPage**: Página inicial com introdução ao projeto.  
  Local: `src/Pages/MainPage/MainPage.jsx`

- **Cadastro**: Página para cadastro de usuários com validação de RG.  
  Local: `src/Pages/Cadastro/Cadastro.jsx`

- **Interesses**: Página para configuração de interesses (jogos, eventos, produtos).  
  Local: `src/Pages/Interesses/Interesses.jsx`

- **CarteirinhaPage**: Página para exibir e baixar a carteirinha digital.  
  Local: `src/Pages/CarteirinhaPage/CarteirinhaPage.jsx`

---

## 📦 Dependências

### Principais:
- `react`
- `axios`
- `tesseract.js`
- `@mui/material`
- `@dnd-kit/core`

### Dev:
- `vite`
- `eslint`

---

## 🛠 Próximos Passos

- Melhorar a responsividade da interface.
- Adicionar testes automatizados para os componentes.
- Implementar animações adicionais para melhorar a experiência do usuário.
