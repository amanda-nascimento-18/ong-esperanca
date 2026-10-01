/* ============================================
   DOM.js — utilitários de manipulação do DOM
   ============================================ */

const DOM = {
  /**
   * Limpa o contêiner alvo (#app) e injeta o novo fragmento HTML.
   * Essa é a função central que torna a SPA possível: em vez de o
   * navegador carregar um novo documento, apenas substituímos o
   * conteúdo interno de uma única div fixa.
   */
  render(html) {
    const app = document.getElementById("app");
    if (!app) return;

    // Limpa o conteúdo anterior por completo
    app.innerHTML = "";

    // Injeta o novo fragmento correspondente à rota atual
    app.innerHTML = html;
  }
};
