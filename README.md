# All4Pets - Visual (Frontend) 🐾

Este repositório contém o código-fonte do Frontend da **All4Pets**, desenvolvido como projeto de Programação Web e Engenharia de Software.

O sistema visa automatizar o agendamento de banhos, tosas e consultas, além de gerenciar o estoque e financeiro da clínica.

## 🛠 Tech Stack

As principais tecnologias já configuradas no projeto são:

* **Framework:** Next.js 15 (App Router)
* **Linguagem:** React / TypeScript
* **Estilização:** Tailwind CSS v3
* **Componentes UI:** shadcn
* **Ícones:** Lucide React

---

## 🚀 Como Rodar o Projeto

Siga os passos abaixo para baixar e iniciar o ambiente de desenvolvimento na sua máquina.

### 1. Clonar o Repositório

Abra o terminal e clone o projeto para sua máquina:

```bash
git clone [https://github.com/seu-usuario/all4pets-visual.git](https://github.com/seu-usuario/all4pets-visual.git)
cd all4pets-visual
````

 
Este comando irá baixar e configurar automaticamente o React, Next.js, Tailwind, os componentes do shadcn e todas as bibliotecas auxiliares:

```bash
npm install
```

### 3\. Iniciar o Servidor

Após a instalação, rode o servidor de desenvolvimento:

```bash
npm run dev
```

Acesse **`http://localhost:3000`** no seu navegador. Você deverá ver a tela inicial do sistema.

-----

## 📂 Organização das Pastas

Para facilitar o desenvolvimento em equipe, o projeto segue esta estrutura:

  * **`src/app/`**: Onde ficam as páginas e rotas (Login, Dashboard, Agendamento).
  * **`src/components/ui/`**: Componentes base do shadcn (Botões, Inputs, Modais). **Não altere estes arquivos diretamente se possível.**
  * **`src/components/shared/`**: Nossos componentes personalizados (Navbar, Cards de Pets, Tabelas específicas).
  * **`src/lib/`**: Utilitários e configurações (como o cliente da API `axios`).

-----

## 🤝 Fluxo de Trabalho (Scrum)

1.  Crie uma **branch** para sua tarefa (ex: `feat/tela-login` ou `fix/botao-agendar`).
2.  Faça seus commits.
3.  Abra um **Pull Request (PR)** para a branch `main` quando terminar.