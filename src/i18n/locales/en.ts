import type ru from "./ru";

const en: typeof ru = {
  nav: {
    services: "Services",
    process: "How I work",
    cases: "Case studies",
    contact: "Contact",
    cabinetShort: "Client area",
    cabinetFull: "Client area",
  },
  header: {
    tagline: "Automation and websites",
    ctaPrimary: "Discuss a project",
    menuLabel: "Menu",
    closeLabel: "Close",
  },
  hero: {
    badge: "Versilia, Italy — taking on projects",
    title1: "I make sure",
    title2: "routine work runs",
    titleGradient: "without you",
    description:
      "I automate leads, invoices and reports, build websites and Telegram bots, and connect your store to your warehouse and CRM. You focus on the business — the system handles the rest.",
    ctaPrimary: "Discuss a project",
    ctaSecondary: "View case studies",
    highlights: ["n8n workflows", "Telegram bots", "Shopify and websites"],
  },
  services: {
    label: "Services",
    heading: "What you can hand off to me",
    headingGradient: " and forget",
    items: {
      automation: {
        title: "Business process automation",
        pitch: "I remove manual routine: leads, invoices, reports and reminders start moving on their own, without copying from email into a spreadsheet.",
        bullets: [
          "Leads from every channel in one place",
          "Automatic notifications to the right people",
          "Reports that build themselves every morning",
        ],
      },
      websites: {
        title: "Websites and landing pages",
        pitch: "A site that explains why you're worth choosing and turns a visitor into a lead. Not a template from a builder — built for your goal.",
        bullets: [
          "Fast loading and correct display on phones",
          "A clear contact form, not just a generic \"contact us\"",
          "Copy and structure built around what clients actually search for",
        ],
      },
      bots: {
        title: "Telegram bots",
        pitch: "The bot takes orders, answers common questions and reminds people about appointments while you're busy working.",
        bullets: [
          "Orders with a cart and confirmation",
          "Answers to common questions without your involvement",
          "Notifications to your team right in the work chat",
        ],
      },
      integrations: {
        title: "Integrations and APIs",
        pitch: "I connect what you already have: store, warehouse, CRM, spreadsheets, accounting. Data stops living in separate worlds.",
        bullets: [
          "Shopify, CRM, Google Sheets, email",
          "Syncing stock and orders",
          "Data exchange via webhook and REST",
        ],
      },
      dashboards: {
        title: "Dashboards and analytics",
        pitch: "One screen showing revenue, leads and workload — so decisions are made on numbers, not gut feeling.",
        bullets: [
          "Key metrics on a single screen",
          "Charts by week and month",
          "Access from your phone anytime",
        ],
      },
      extras: {
        title: "Extras and widgets",
        pitch: "Price calculators, selection forms, online booking, small widgets — small things that noticeably lighten the load.",
        bullets: [
          "Price calculator on the site",
          "Online booking with confirmations",
          "Embeddable widgets for any site",
        ],
      },
    },
  },
  process: {
    label: "How I work",
    heading: "From first call to launch — four steps",
    items: {
      "1": {
        title: "Call",
        duration: "30–40 minutes",
        description: "We talk through what's actually costing you time and money. Sometimes this alone shows the problem is simpler and cheaper to solve than it looked.",
      },
      "2": {
        title: "Estimate and plan",
        duration: "1–2 days",
        description: "I send a clear outline of the solution, the timeline and a fixed price. No \"roughly\" and no surprises halfway through.",
      },
      "3": {
        title: "Build",
        duration: "1–3 weeks",
        description: "I build and show you interim versions, so you can adjust along the way instead of seeing the finished thing and saying \"that's not it\".",
      },
      "4": {
        title: "Launch and support",
        duration: "after that — as needed",
        description: "We launch, I show you how to use it, and stay in touch. Small fixes after launch — no extra invoice.",
      },
    },
  },
  cases: {
    label: "Case studies",
    heading: "Problem — solution — result",
    categories: {
      all: "All",
      website: "Website",
      shop: "Online store",
      automation: "Automation",
      bot: "Telegram bot",
      integrations: "Integrations",
    },
    before: "Before",
    after: "Did",
    open: "Open",
    empty: "No case studies in this category yet.",
    items: {
      "evdokimov-costruzioni": {
        title: "Website for a construction company",
        problem: "A construction company (roofing, systems, renovations and turnkey villas in Versilia) ran every order by phone and word of mouth — there was no way to show a client its portfolio.",
        solution: "Built a React showcase site with service sections, a project portfolio and a contact form — the whole range of work is now visible from a phone in a minute.",
        result: "The company got a showcase it can send with one link instead of a long verbal explanation",
      },
      "versilia-trasporti": {
        title: "Website for a moving and clearance service",
        problem: "A removals and property-clearance service in Versilia, Massa and Lucca took requests by phone only — clients had to describe the scope of work out loud.",
        solution: "Built a site describing the services with a quick WhatsApp request form — clients instantly see what the company does and leave a request without a long call.",
        result: "A request now takes a couple of clicks instead of a long phone call",
      },
      "rc-verniciatura": {
        title: "Showcase for a boat-painting workshop",
        problem: "The workshop paints hulls and does antifouling, polishing and osmosis treatment for yachts — but could only show the quality of the work through photos in messages.",
        solution: "Built a showcase site describing every type of work with a clear form for booking a boat inspection.",
        result: "The workshop now has a portfolio showcase instead of exchanging photos over WhatsApp",
      },
    },
  },
  contact: {
    label: "Get in touch",
    heading1: "Tell me what's",
    headingGradient: " costing you time",
    description: "Describe the task in your own words — no technical terms needed. I'll reply within a day and tell you honestly whether it's worth doing and how long it'll take.",
    bullets: [
      "First call is free",
      "Fixed price before work starts",
      "Small fixes after launch, no invoice",
    ],
    nameLabel: "Your name",
    namePlaceholder: "Paul",
    contactLabel: "Telegram, email or phone",
    contactPlaceholder: "@username or mail@example.com",
    taskLabel: "What needs to be done",
    taskPlaceholder: "For example: leads arrive by email and Telegram and get lost. I want everything to land in one table with a notification.",
    errorRequired: "Fill in all three fields — that way I immediately understand what it's about.",
    submit: "Send request",
    sending: "Sending…",
    successTitle: "Request received",
    successBody: "I'll get in touch within a day. If it's urgent, message me on Telegram — I reply faster there.",
    sendAnother: "Send another one",
    privacyNote: "No spam, no sharing your contacts with third parties.",
  },
  footer: {
    tagline: "Pavel — business process automation, websites and Telegram bots. Based in Versilia, working across Italy and remotely.",
    servicesLabel: "Services",
    contactsLabel: "Contact",
    address: "Versilia, Italy",
    cabinet: "Client area",
  },
  notFound: {
    message: "This page doesn't exist.",
    backHome: "Back home",
  },
};

export default en;
