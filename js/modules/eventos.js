/* ============================================
   Eventos.js — captura e gerencia todas as
   interações do usuário com a aplicação
   ============================================ */

const Eventos = {

  /**
   * Fecha o menu mobile automaticamente ao clicar em um link,
   * evitando que ele fique aberto depois da navegação.
   */
  iniciarMenu() {
    const nav = document.querySelector("header nav");
    const checkbox = document.getElementById("menu-toggle");

    nav.addEventListener("click", (evento) => {
      if (evento.target.tagName === "A") {
        checkbox.checked = false;
      }
    });
  },

  /**
   * Usa EVENT DELEGATION no <main id="app">: como o formulário é
   * recriado a cada navegação da SPA (innerHTML é substituído), um
   * listener preso diretamente no <form> seria destruído junto com
   * ele. Prendendo o listener no contêiner fixo (#app), que nunca é
   * substituído, ele continua funcionando mesmo após re-renderizações.
   */
  iniciarFormulario() {
    const app = document.getElementById("app");

    // Durante a digitação: validação "suave" — só reconhece sucesso
    // antecipadamente, nunca marca erro enquanto o campo ainda
    // está sendo preenchido (evita o campo piscar vermelho a cada tecla)
    app.addEventListener("input", (evento) => {
      if (evento.target.closest("#form-cadastro")) {
        Validacao.validarEnquantoDigita(evento.target);
        this.salvarRascunhoAtual();
      }
    });

    // "change" cobre select/radio/checkbox, cuja interação é discreta
    // (não faz sentido "suavizar" — o valor muda de uma vez só)
    app.addEventListener("change", (evento) => {
      if (evento.target.closest("#form-cadastro")) {
        Validacao.validarCampo(evento.target);
        this.salvarRascunhoAtual();
      }
    });

    // Ao sair do campo (blur): validação completa, agora sim
    // marcando erro se o valor final ainda estiver incorreto.
    // blur não borbulha, por isso o listener usa a fase de CAPTURA
    // (terceiro parâmetro "true") para funcionar com delegation.
    app.addEventListener(
      "blur",
      (evento) => {
        if (
          evento.target.closest &&
          evento.target.closest("#form-cadastro") &&
          (evento.target.tagName === "INPUT" || evento.target.tagName === "TEXTAREA")
        ) {
          Validacao.validarCampo(evento.target);
        }
      },
      true
    );

    // Submissão do formulário
    app.addEventListener("submit", (evento) => {
      const form = evento.target.closest("#form-cadastro");
      if (!form) return;

      // Impede o comportamento nativo do navegador (que recarregaria
      // a página e descartaria todo o controle da SPA)
      evento.preventDefault();

      const formularioValido = Validacao.validarFormulario(form);
      if (!formularioValido) return;

      const dados = Object.fromEntries(new FormData(form).entries());
      Armazenamento.adicionarApoiador(dados);
      Armazenamento.limparRascunho();

      form.reset();
      document.querySelectorAll(".campo-valido, .campo-invalido").forEach((el) => {
        el.classList.remove("campo-valido", "campo-invalido");
      });

      alert("Cadastro realizado com sucesso! Obrigado por apoiar a ONG Esperança.");
    });
  },

  /** Lê os valores atuais do formulário e salva como rascunho */
  salvarRascunhoAtual() {
    const form = document.getElementById("form-cadastro");
    if (!form) return;
    const dados = Object.fromEntries(new FormData(form).entries());
    Armazenamento.salvarRascunho(dados);
  },

  /** Restaura um rascunho salvo anteriormente, se existir */
  restaurarRascunho() {
    const form = document.getElementById("form-cadastro");
    const rascunho = Armazenamento.obterRascunho();
    if (!form || !rascunho) return;

    Object.keys(rascunho).forEach((nomeCampo) => {
      const campo = form.querySelector(`[name="${nomeCampo}"]`);
      if (!campo) return;

      if (campo.type === "radio") {
        const opcao = form.querySelector(`[name="${nomeCampo}"][value="${rascunho[nomeCampo]}"]`);
        if (opcao) opcao.checked = true;
      } else if (campo.type === "checkbox") {
        campo.checked = rascunho[nomeCampo] === "on";
      } else {
        campo.value = rascunho[nomeCampo];
      }
    });
  },

  /**
   * Integração com a biblioteca externa IMask.js: aplica máscara
   * de digitação em tempo real nos campos que exigem formato rígido.
   */
  iniciarMascaras() {
    if (typeof IMask === "undefined") return;

    const cpf = document.getElementById("cpf");
    const telefone = document.getElementById("telefone");
    const cep = document.getElementById("cep");

    if (cpf) IMask(cpf, { mask: "000.000.000-00" });
    if (telefone) IMask(telefone, { mask: "(00) 00000-0000" });
    if (cep) IMask(cep, { mask: "00000-000" });
  }
};
