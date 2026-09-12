import type ru from "./ru";

const fr: typeof ru = {
  nav: {
    services: "Services",
    process: "Comment je travaille",
    cases: "Études de cas",
    contact: "Contact",
    cabinetShort: "Espace client",
    cabinetFull: "Espace client",
  },
  header: {
    tagline: "Automatisation et sites web",
    ctaPrimary: "Discuter du projet",
    menuLabel: "Menu",
    closeLabel: "Fermer",
  },
  hero: {
    badge: "Versilia, Italie — je prends des projets",
    title1: "Je fais en sorte que",
    title2: "la routine tourne",
    titleGradient: "sans vous",
    description:
      "J'automatise les demandes, les factures et les rapports, je crée des sites et des bots Telegram, je relie votre boutique à l'entrepôt et au CRM. Vous vous occupez du métier — le système fait le reste.",
    ctaPrimary: "Discuter du projet",
    ctaSecondary: "Voir les études de cas",
    highlights: ["Workflows n8n", "Bots Telegram", "Shopify et sites web"],
  },
  services: {
    label: "Services",
    heading: "Ce que vous pouvez me confier",
    headingGradient: " et oublier",
    items: {
      automation: {
        title: "Automatisation des processus métier",
        pitch: "Je supprime la routine manuelle : demandes, factures, rapports et rappels commencent à circuler seuls, sans copier à la main depuis l'e-mail vers un tableau.",
        bullets: [
          "Les demandes de tous les canaux au même endroit",
          "Notifications automatiques aux bonnes personnes",
          "Des rapports qui se génèrent seuls chaque matin",
        ],
      },
      websites: {
        title: "Sites web et landing pages",
        pitch: "Un site qui explique pourquoi vous êtes utile et transforme un visiteur en demande. Pas un modèle de constructeur — pensé pour votre objectif.",
        bullets: [
          "Chargement rapide et bon affichage sur mobile",
          "Un formulaire de contact clair, pas un vague « écrivez-nous »",
          "Textes et structure pensés pour ce que les clients cherchent vraiment",
        ],
      },
      bots: {
        title: "Bots Telegram",
        pitch: "Le bot prend les commandes, répond aux questions fréquentes et rappelle les rendez-vous pendant que vous travaillez.",
        bullets: [
          "Commandes avec panier et confirmation",
          "Réponses aux questions fréquentes sans votre intervention",
          "Notifications à l'équipe directement dans le chat de travail",
        ],
      },
      integrations: {
        title: "Intégrations et API",
        pitch: "Je relie ce que vous avez déjà : boutique, entrepôt, CRM, tableurs, comptabilité. Les données cessent de vivre dans des mondes séparés.",
        bullets: [
          "Shopify, CRM, Google Sheets, e-mail",
          "Synchronisation des stocks et des commandes",
          "Échange de données via webhook et REST",
        ],
      },
      dashboards: {
        title: "Tableaux de bord et analyses",
        pitch: "Un seul écran où voir le chiffre d'affaires, les demandes et la charge de travail. Pour décider avec des chiffres, pas au feeling.",
        bullets: [
          "Indicateurs clés sur un seul écran",
          "Graphiques par semaine et par mois",
          "Accès depuis le téléphone à tout moment",
        ],
      },
      extras: {
        title: "Petits plus et widgets",
        pitch: "Calculateurs de prix, formulaires de sélection, réservation en ligne, mini-widgets — de petites choses qui allègent nettement la charge.",
        bullets: [
          "Calculateur de prix sur le site",
          "Réservation en ligne avec confirmations",
          "Widgets intégrables sur n'importe quel site",
        ],
      },
    },
  },
  process: {
    label: "Comment je travaille",
    heading: "De l'appel au lancement — quatre étapes",
    items: {
      "1": {
        title: "Appel",
        duration: "30–40 minutes",
        description: "On échange pour identifier ce qui vous coûte vraiment du temps et de l'argent. Parfois, cela suffit à montrer que le problème se résout plus simplement et moins cher que prévu.",
      },
      "2": {
        title: "Devis et plan",
        duration: "1–2 jours",
        description: "Je vous envoie un schéma clair de la solution, un délai et un prix fixe. Pas d'« environ » et pas de surprise en cours de route.",
      },
      "3": {
        title: "Réalisation",
        duration: "1–3 semaines",
        description: "Je fais et montre des versions intermédiaires, pour que vous ajustiez en cours de route plutôt que de découvrir le résultat final et dire « ce n'est pas ça ».",
      },
      "4": {
        title: "Lancement et support",
        duration: "ensuite — au besoin",
        description: "On lance, je vous montre comment l'utiliser et je reste disponible. Petites corrections après le lancement — sans facture séparée.",
      },
    },
  },
  cases: {
    label: "Études de cas",
    heading: "Problème — solution — résultat",
    categories: {
      all: "Tous",
      website: "Site web",
      shop: "Boutique en ligne",
      automation: "Automatisation",
      bot: "Bot Telegram",
      integrations: "Intégrations",
    },
    before: "Avant",
    after: "Réalisé",
    open: "Ouvrir",
    empty: "Pas encore d'étude de cas dans cette catégorie.",
    items: {
      "evdokimov-costruzioni": {
        title: "Site web pour une entreprise du bâtiment",
        problem: "Une entreprise du bâtiment (toitures, systèmes, rénovations et villas clés en main en Versilia) gérait toutes ses commandes par téléphone et bouche-à-oreille — impossible de montrer son portfolio à un client.",
        solution: "J'ai créé un site vitrine en React avec sections services, portfolio de projets et formulaire de contact — toute la gamme de travaux est désormais visible depuis un téléphone en une minute.",
        result: "L'entreprise dispose d'une vitrine à envoyer en un lien plutôt que d'une longue explication orale",
      },
      "versilia-trasporti": {
        title: "Site pour un service de déménagement et débarras",
        problem: "Un service de transport et débarras en Versilia, Massa et Lucca ne prenait les demandes que par téléphone — le client devait décrire le volume de travail à l'oral.",
        solution: "J'ai créé un site décrivant les services avec un formulaire de demande rapide sur WhatsApp — le client voit immédiatement ce que fait l'entreprise et laisse une demande sans long appel.",
        result: "Une demande se fait désormais en quelques clics plutôt qu'un long appel téléphonique",
      },
      "rc-verniciatura": {
        title: "Vitrine pour un atelier de peinture nautique",
        problem: "L'atelier peint les coques et réalise l'antifouling, le polissage et le traitement de l'osmose pour les yachts — mais ne pouvait montrer la qualité du travail que par des photos en message.",
        solution: "J'ai créé un site vitrine décrivant tous les types de travaux avec un formulaire clair pour réserver une inspection du bateau.",
        result: "L'atelier dispose désormais d'une vitrine avec portfolio plutôt que d'échanges de photos sur WhatsApp",
      },
    },
  },
  contact: {
    label: "Demande",
    heading1: "Dites-moi ce qui",
    headingGradient: " vous prend du temps",
    description: "Décrivez la tâche avec vos propres mots — sans jargon technique. Je réponds sous un jour et vous dis honnêtement si ça vaut le coup et combien de temps ça prendra.",
    bullets: [
      "Premier échange gratuit",
      "Prix fixe avant le début des travaux",
      "Petites retouches après le lancement sans facture",
    ],
    nameLabel: "Votre nom",
    namePlaceholder: "Paul",
    contactLabel: "Telegram, e-mail ou téléphone",
    contactPlaceholder: "@username ou mail@example.com",
    taskLabel: "Ce qu'il faut faire",
    taskPlaceholder: "Par exemple : les demandes arrivent par e-mail et Telegram et se perdent. Je voudrais que tout tombe dans un seul tableau avec une notification.",
    errorRequired: "Remplissez les trois champs — je comprendrai tout de suite de quoi il s'agit.",
    submit: "Envoyer la demande",
    sending: "Envoi…",
    successTitle: "Demande reçue",
    successBody: "Je vous recontacte sous un jour. Si c'est urgent, écrivez-moi sur Telegram, j'y réponds plus vite.",
    sendAnother: "Envoyer une autre demande",
    privacyNote: "Pas de spam, pas de partage de vos coordonnées avec des tiers.",
  },
  footer: {
    tagline: "Pavel — automatisation des processus métier, sites web et bots Telegram. Basé en Versilia, projets dans toute l'Italie et à distance.",
    servicesLabel: "Services",
    contactsLabel: "Contact",
    address: "Versilia, Italie",
    cabinet: "Espace client",
  },
  notFound: {
    message: "Cette page n'existe pas.",
    backHome: "Retour à l'accueil",
  },
};

export default fr;
