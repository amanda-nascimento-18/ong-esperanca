# ONG Esperança — Plataforma Web

Site institucional para a ONG Esperança, organização fictícia do terceiro setor, desenvolvido como projeto acadêmico ao longo da disciplina de Desenvolvimento Front-end.

A aplicação é uma **Single Page Application (SPA)** construída em HTML5, CSS3 e JavaScript puro (Vanilla JS), sem frameworks, com roteamento via hash e templates gerados dinamicamente.

## Funcionalidades

- Navegação entre 3 telas (Início, Projetos, Cadastro) sem recarregar a página
- Design System com variáveis CSS (cores, tipografia, espaçamentos)
- Layout responsivo com CSS Grid (12 colunas) e Flexbox
- Menu com dropdown e versão "hambúrguer" para mobile (100% CSS)
- Formulário de cadastro com validação nativa + JavaScript, máscaras via IMask.js
- Persistência de dados no `localStorage` (rascunho do formulário + lista de apoiadores)
- Modo escuro automático (`prefers-color-scheme`)
- Conformidade com WCAG 2.1 nível AA (contraste, navegação por teclado, ARIA)

## Tecnologias utilizadas

- HTML5 semântico
- CSS3 (Custom Properties, Grid, Flexbox, media queries)
- JavaScript (ES6+), Vanilla, sem frameworks
- [IMask.js](https://imask.js.org/) — máscaras de input (via CDN)
- Google Fonts: Fraunces e Public Sans

## Estrutura de pastas

```
/projeto
  /html
    index.html          → ponto de entrada da SPA
  /css
    estilos.css         → Design System + todos os estilos
    estilos.min.css      → versão minificada (produção)
  /imagens
    ong.jpg / ong.webp   → imagens otimizadas
  /js
    main.js               → inicializa rotas e eventos
    /modules
      dom.js, router.js, validacao.js, armazenamento.js, eventos.js
    /templates
      home.js, projetos.js, cadastro.js
```

## Como rodar localmente

Não há dependências para instalar — é um projeto 100% estático.

1. Clone o repositório:
   ```bash
   git clone https://github.com/SEU-USUARIO/ong-esperanca.git
   cd ong-esperanca
   ```
2. Abra `html/index.html` diretamente no navegador, **ou** sirva a pasta com um servidor local (recomendado, para evitar restrições de CORS em alguns navegadores):
   ```bash
   npx serve .
   # ou, com Python:
   python3 -m http.server 8000
   ```
3. Acesse `http://localhost:8000/html/` (se usou servidor) ou o arquivo direto.

## Versionamento

Este projeto segue o modelo **GitFlow**:

- `main` — versões estáveis, prontas para produção
- `develop` — integração contínua das funcionalidades
- `feature/*` — uma branch por funcionalidade (ex: `feature/formulario-cadastro`)
- `hotfix/*` — correções urgentes direto a partir de `main`

Commits seguem o padrão **Conventional Commits** (`feat:`, `fix:`, `docs:`, `style:`, `refactor:`, `test:`, `chore:`).

## Acessibilidade

Testado manualmente com navegação por teclado (Tab/Shift+Tab) e verificação de contraste de cores (cálculo WCAG 2.1 — razão de luminância relativa). Todos os pares de cor texto/fundo do projeto atingem no mínimo 4.5:1 (texto normal) ou 3:1 (texto grande/elementos gráficos).

## Autor

Amanda — Bacharelado em Ciências da Computação
