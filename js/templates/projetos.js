/* ============================================
   Template da tela "Projetos"
   Demonstra geração de elementos dinâmicos a
   partir de um array de dados (Template Literals + map)
   ============================================ */

const Templates = window.Templates || {};

/* Fonte de dados: cada projeto social é um objeto.
   Se amanhã a ONG cadastrar um novo projeto, basta adicionar
   um item aqui — nenhum HTML precisa ser escrito manualmente. */
const dadosProjetos = [
  {
    titulo: "Mesa Solidária",
    badge: "Alimentação",
    classeBadge: "badge-primaria",
    descricao:
      "Projeto de distribuição semanal de cestas básicas para famílias em situação de vulnerabilidade social."
  },
  {
    titulo: "Reforço Escolar",
    badge: "Educação",
    classeBadge: "badge-secundaria",
    descricao:
      "Aulas de reforço gratuitas para crianças e adolescentes da comunidade, com apoio de voluntários da área da educação."
  },
  {
    titulo: "Oficinas de Capacitação",
    badge: "Capacitação",
    classeBadge: "badge-neutra",
    descricao:
      "Cursos gratuitos de capacitação profissional para jovens e adultos em busca de recolocação no mercado de trabalho."
  }
];

/**
 * Converte UM objeto de projeto em uma string HTML (um "componente").
 * Usa Template Literals para interpolar os dados diretamente na marcação.
 */
function criarCartaoProjeto(projeto) {
  return `
    <article class="cartao">
      <span class="badge ${projeto.classeBadge}">${projeto.badge}</span>
      <h3>${projeto.titulo}</h3>
      <p>${projeto.descricao}</p>
    </article>
  `;
}

Templates.projetos = function () {
  // .map() transforma cada objeto de dado em uma string HTML,
  // .join("") junta todas as strings em uma só, sem separador
  const cartoesHTML = dadosProjetos.map(criarCartaoProjeto).join("");

  return `
    <section>
      <h2>Nossos projetos sociais</h2>
      <p>
        A ONG Esperança desenvolve diferentes ações voltadas para
        pessoas em situação de vulnerabilidade, com foco em
        educação, alimentação e apoio comunitário.
      </p>

      <div class="grade-cartoes">
        ${cartoesHTML}
      </div>
    </section>

    <section id="doacoes">
      <h2>Doações</h2>
      <p>
        Você pode contribuir financeiramente com a ONG Esperança
        através de doações únicas ou mensais. Toda contribuição é
        revertida diretamente para os projetos em andamento.
      </p>
    </section>

    <section id="voluntariado">
      <h2>Voluntariado</h2>
      <p>
        Também buscamos voluntários para atuar diretamente nos
        projetos sociais, seja aplicando aulas de reforço, ajudando
        na organização das doações ou apoiando eventos comunitários.
      </p>
    </section>

    <section>
      <h2>Formas de participação</h2>
      <ul>
        <li>Fazer uma doação financeira (única ou mensal)</li>
        <li>Tornar-se voluntário em um dos projetos</li>
        <li>Divulgar as ações da ONG para mais pessoas</li>
        <li>Cadastrar-se como apoiador para receber novidades</li>
      </ul>
      <p>
        Para se tornar um apoiador oficial, acesse a página de
        <a href="#cadastro">Cadastro</a>.
      </p>
    </section>
  `;
};

window.Templates = Templates;
