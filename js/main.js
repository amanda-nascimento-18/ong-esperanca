/* ============================================
   main.js — ponto de entrada da aplicação
   ============================================ */

Router.registrar("#inicio", Templates.home);
Router.registrar("#projetos", Templates.projetos);
Router.registrar("#cadastro", Templates.cadastro);

// Âncoras do dropdown "Projetos" — vivem dentro da rota #projetos
Router.registrarAncora("#doacoes", "#projetos");
Router.registrarAncora("#voluntariado", "#projetos");

// Eventos fixos (não dependem de qual template está na tela)
Eventos.iniciarMenu();
Eventos.iniciarFormulario();

/**
 * Chamada pelo Router toda vez que uma nova "rota" é renderizada.
 * Usada para rodar lógica que só faz sentido depois que o HTML
 * daquele template específico já existe na árvore do DOM.
 */
window.aposRenderizar = function (hash) {
  if (hash === "#cadastro") {
    Eventos.iniciarMascaras();
    Eventos.restaurarRascunho();
  }
};

Router.iniciar();
