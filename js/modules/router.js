/* ============================================
   Router.js — intercepta a navegação e decide
   qual template renderizar, sem recarregar a página
   ============================================ */

const Router = {
  rotas: {},
  ancoras: {},
  rotaPadrao: "#inicio",

  /**
   * Associa um hash (ex: "#projetos") a uma função de template
   * que retorna o HTML correspondente.
   */
  registrar(hash, funcaoTemplate) {
    this.rotas[hash] = funcaoTemplate;
  },

  /**
   * Associa uma âncora secundária (ex: "#doacoes") à rota onde ela
   * realmente vive (ex: "#projetos"). Usado por links de dropdown
   * que apontam para uma seção específica dentro de outra "página".
   */
  registrarAncora(hashSecundario, hashBase) {
    this.ancoras[hashSecundario] = hashBase;
  },

  /**
   * Lê o hash atual da URL, busca o template correspondente
   * e manda o DOM.render injetar o conteúdo.
   */
  navegar() {
    let hashAtual = window.location.hash || this.rotaPadrao;
    let idParaRolar = null;

    // Se o hash não é uma rota direta, verifica se é uma âncora
    // secundária (ex: "#doacoes" mora dentro de "#projetos")
    if (!this.rotas[hashAtual] && this.ancoras[hashAtual]) {
      idParaRolar = hashAtual.replace("#", "");
      hashAtual = this.ancoras[hashAtual];
    }

    const template = this.rotas[hashAtual] || this.rotas[this.rotaPadrao];
    if (!template) return;

    DOM.render(template());

    // Atualiza o link ativo no menu de navegação
    document.querySelectorAll(".nav-lista > li > a").forEach((link) => {
      link.classList.toggle(
        "ativo",
        link.getAttribute("href") === hashAtual
      );
    });

    // Permite que cada template rode alguma lógica extra depois de
    // ser inserido no DOM (ex: iniciar máscaras, restaurar rascunho)
    if (typeof window.aposRenderizar === "function") {
      window.aposRenderizar(hashAtual);
    }

    // Se veio de uma âncora secundária, rola suavemente até a seção
    // correspondente; caso contrário, sobe a página para o topo
    if (idParaRolar) {
      const elemento = document.getElementById(idParaRolar);
      if (elemento) {
        elemento.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      window.scrollTo(0, 0);
    }
  },

  /**
   * Registra os listeners que capturam a intenção de navegação:
   * - "hashchange": disparado sempre que o usuário clica em um link #...
   * - "DOMContentLoaded": garante que a primeira tela renderize
   *   assim que a página carrega, mesmo sem hash na URL
   */
  iniciar() {
    window.addEventListener("hashchange", () => this.navegar());
    window.addEventListener("DOMContentLoaded", () => this.navegar());
  }
};
