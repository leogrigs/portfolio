import type { Content } from "./types";

export const pt: Content = {
  meta: {
    title: "Leonardo Grigorio Ferreira · Forward Deployed Engineer",
    description:
      "Engenheiro de software focado em automação com IA. Forward Deployed Engineer na Tela.",
    skip: "Pular para o conteúdo",
  },
  nav: {
    chapters: {
      home: "Início",
      impact: "Impacto",
      path: "Trajetória",
      contact: "Contato",
    },
    chapterNav: "Capítulos",
    resume: "Currículo",
    switchLanguage: "Switch to English",
    switchLanguageShort: "EN",
    theme: {
      toDark: "Ativar tema escuro",
      toLight: "Ativar tema claro",
    },
  },
  intro: {
    caption: "Engenharia de software · IA",
  },
  hero: {
    name: "Leonardo Grigorio Ferreira",
    nameWords: ["LEONARDO", "GRIGORIO", "FERREIRA"],
    tagline: "Engenheiro de software focado em *automação com IA*.",
    facts: [
      "Forward Deployed Engineer na Tela",
      "São Paulo · remoto",
      "5 anos de experiência",
    ],
    scroll: "Role para baixo",
  },
  impact: {
    title: "Tempo por tarefa, *antes e depois*.",
    beforeLabel: "antes",
    afterLabel: "depois",
    steps: [
      {
        before: "~30 min",
        after: "1 min",
        context: "onboarding de cliente",
        where: "Tela",
        ratio: 1 / 30,
      },
      {
        before: "10-15 min",
        after: "1 clique",
        context: "cadastro de produto em catálogos de até 10 mil itens",
        where: "Kodaris",
        ratio: 0.05,
      },
      {
        before: "5-10 min",
        after: "0",
        context: "trabalho manual por evento de marketplace",
        where: "Suger",
        ratio: 0,
      },
      {
        before: "dias",
        after: "minutos",
        context: "atualização de conteúdo de um app de private banking",
        where: "NTT DATA · Itaú",
        ratio: 0.02,
      },
    ],
  },
  path: {
    nowLabel: "Hoje",
    sinceLabel: "desde",
    milestones: [
      {
        year: "2021",
        company: "Luft Brasil",
        role: "Estágio em TI",
        place: "São Paulo",
        story: "Infraestrutura, backup e firewall. Custo de backup 70% menor.",
      },
      {
        year: "2021",
        company: "NTT DATA · Itaú",
        role: "Engenheiro de Software Jr.",
        place: "São Paulo",
        story:
          "Mapa de agências: 800% mais acessos, 400 mil usuários por mês e páginas 100% acessíveis.",
      },
      {
        year: "2023",
        company: "NTT DATA · Itaú Private",
        role: "Engenheiro de Software",
        place: "São Paulo",
        story:
          "App em três idiomas para clientes no Brasil, em Miami e em Zurique. Liderança de um time de cinco engenheiros.",
      },
      {
        year: "2024",
        company: "Kodaris",
        role: "UX Engineer",
        place: "Atlanta · remoto",
        story:
          "Primeira ferramenta de IA em produção. Contato direto com clientes, inclusive o maior da empresa.",
      },
      {
        year: "2025",
        company: "Suger",
        role: "Software Engineer",
        place: "São Francisco · remoto",
        story: "Go e AWS Marketplace. Dezenas de workflows orientados a eventos.",
      },
      {
        year: "2025",
        company: "Tela",
        role: "Forward Deployed Engineer",
        place: "São Francisco · remoto",
        story:
          "Extração de dados de processos jurídicos, antifraude em documentos e um chatbot interno sobre os arquivos da empresa.",
        current: true,
      },
    ],
    stackLabel: "Ferramentas",
    stack: [
      "TypeScript",
      "Vue",
      "Nuxt",
      "Go",
      "Python",
      "PostgreSQL",
      "AWS",
      "Trigger.dev",
      "LLMs",
      "Claude Code",
      "Railway",
      "Datadog",
      "Metabase",
      "React",
      "Angular",
      "Node.js",
    ],
  },
  contact: {
    greeting: "olá",
    emailLabel: "E-mail",
    copy: "Copiar e-mail",
    copied: "Copiado",
    links: {
      linkedin: "LinkedIn",
      github: "GitHub",
      resume: "Currículo",
    },
    clockLabel: "São Paulo",
    backToTop: "Voltar ao início",
  },
};
