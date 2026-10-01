/* ============================================
   Armazenamento.js — persistência de dados
   no localStorage do navegador
   ============================================ */

const Armazenamento = {
  CHAVE_APOIADORES: "ongEsperanca_apoiadores",
  CHAVE_RASCUNHO: "ongEsperanca_rascunhoCadastro",

  /* ---------- Lista de apoiadores cadastrados ---------- */

  obterApoiadores() {
    const dados = localStorage.getItem(this.CHAVE_APOIADORES);
    // Se nunca houve gravação, getItem retorna null — tratamos como lista vazia
    return dados ? JSON.parse(dados) : [];
  },

  adicionarApoiador(apoiador) {
    const lista = this.obterApoiadores();
    lista.push(apoiador);
    // JSON.stringify converte o array de objetos em uma string,
    // formato exigido pelo localStorage (que só armazena strings)
    localStorage.setItem(this.CHAVE_APOIADORES, JSON.stringify(lista));
  },

  /* ---------- Rascunho do formulário (autosave) ---------- */

  salvarRascunho(dadosFormulario) {
    // BUGFIX: o consentimento LGPD não deve ser restaurado automaticamente
    // em uma sessão futura — isso equivaleria a "assumir" a concordância
    // da pessoa sem que ela tenha marcado a caixa novamente. Removemos
    // esse campo antes de persistir o rascunho.
    const dadosSeguros = { ...dadosFormulario };
    delete dadosSeguros.consentimento;
    localStorage.setItem(this.CHAVE_RASCUNHO, JSON.stringify(dadosSeguros));
  },

  obterRascunho() {
    const dados = localStorage.getItem(this.CHAVE_RASCUNHO);
    return dados ? JSON.parse(dados) : null;
  },

  limparRascunho() {
    localStorage.removeItem(this.CHAVE_RASCUNHO);
  }
};
