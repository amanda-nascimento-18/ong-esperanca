/* ============================================
   Validacao.js — verificação de consistência
   dos campos do formulário de cadastro
   ============================================ */

const Validacao = {
  regras: {
    cpf: /^\d{3}\.\d{3}\.\d{3}-\d{2}$/,
    telefone: /^\(\d{2}\)\s\d{4,5}-\d{4}$/,
    cep: /^\d{5}-\d{3}$/,
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  },

  mensagens: {
    obrigatorio: "Este campo é obrigatório.",
    cpf: "CPF inválido. Use o formato 000.000.000-00.",
    telefone: "Telefone inválido. Use (00) 00000-0000.",
    cep: "CEP inválido. Use 00000-000.",
    email: "Digite um e-mail em formato válido."
  },

  /**
   * Valida um único campo e retorna true/false.
   * Também aciona o feedback visual (classe CSS + mensagem).
   */
  validarCampo(input) {
    const valor = input.value.trim();
    let valido = true;
    let mensagem = "";

    if (input.hasAttribute("required") && valor === "") {
      valido = false;
      mensagem = this.mensagens.obrigatorio;
    } else if (input.name === "cpf" && valor !== "" && !this.regras.cpf.test(valor)) {
      valido = false;
      mensagem = this.mensagens.cpf;
    } else if (input.name === "telefone" && valor !== "" && !this.regras.telefone.test(valor)) {
      valido = false;
      mensagem = this.mensagens.telefone;
    } else if (input.name === "cep" && valor !== "" && !this.regras.cep.test(valor)) {
      valido = false;
      mensagem = this.mensagens.cep;
    } else if (input.type === "email" && valor !== "" && !this.regras.email.test(valor)) {
      valido = false;
      mensagem = this.mensagens.email;
    }

    this.exibirFeedback(input, valido, mensagem);
    return valido;
  },

  /**
   * Aplica a classe CSS de sucesso/erro no campo e injeta (ou limpa)
   * a mensagem de erro logo abaixo dele.
   */
  exibirFeedback(input, valido, mensagem) {
    // BUGFIX: radios/checkboxes ficam dentro de .opcao-inline (flex de
    // 2 itens: input + label). Inserir um 3º elemento <small> ali dentro
    // quebrava o alinhamento. Nesses casos, destacamos a linha inteira
    // em vez de inserir uma mensagem individual por campo.
    if (input.type === "radio" || input.type === "checkbox") {
      const linha = input.closest(".opcao-inline");
      if (linha) linha.classList.toggle("opcao-invalida", !valido);
      return;
    }

    input.classList.remove("campo-valido", "campo-invalido");

    let elementoErro = input.parentElement.querySelector(".mensagem-erro");
    if (!elementoErro) {
      elementoErro = document.createElement("small");
      elementoErro.className = "mensagem-erro";
      elementoErro.setAttribute("role", "alert"); // leitores de tela anunciam o texto assim que ele muda
      elementoErro.id = `erro-${input.id}`;
      input.insertAdjacentElement("afterend", elementoErro);
      // Associa o campo à sua mensagem de erro para tecnologias assistivas
      input.setAttribute("aria-describedby", elementoErro.id);
    }

    if (valido) {
      input.classList.add("campo-valido");
      input.setAttribute("aria-invalid", "false");
      elementoErro.textContent = "";
    } else {
      input.classList.add("campo-invalido");
      input.setAttribute("aria-invalid", "true");
      elementoErro.textContent = mensagem;
    }
  },

  /**
   * Validação "suave", usada no evento input (a cada tecla digitada).
   * Diferente de validarCampo(), ela NUNCA marca o campo como
   * inválido enquanto a pessoa ainda está digitando — só reconhece
   * quando o valor já ficou correto (feedback positivo antecipado),
   * evitando que o campo pisque vermelho a cada caractere.
   */
  validarEnquantoDigita(input) {
    const valor = input.value.trim();

    if (valor === "") {
      input.classList.remove("campo-valido", "campo-invalido");
      this.limparMensagem(input);
      return;
    }

    const regra = this.regras[input.name] || (input.type === "email" ? this.regras.email : null);

    if (regra && regra.test(valor)) {
      input.classList.remove("campo-invalido");
      input.classList.add("campo-valido");
      this.limparMensagem(input);
    } else if (!regra && input.hasAttribute("required")) {
      // Campos sem RegEx específica (ex: nome, cidade): só remove
      // o estado de erro anterior, sem marcar sucesso nem falha ainda
      input.classList.remove("campo-invalido");
    }
  },

  limparMensagem(input) {
    const elementoErro = input.parentElement.querySelector(".mensagem-erro");
    if (elementoErro) elementoErro.textContent = "";
  },

  /**
   * Valida o formulário inteiro (usado no submit).
   * Retorna true somente se todos os campos obrigatórios passarem.
   */
  validarFormulario(form) {
    const campos = form.querySelectorAll("input[required], select[required]");
    let formularioValido = true;

    campos.forEach((campo) => {
      const valido = this.validarCampo(campo);
      if (!valido) formularioValido = false;
    });

    return formularioValido;
  }
};
