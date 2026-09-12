import type ru from "./ru";

const de: typeof ru = {
  nav: {
    services: "Leistungen",
    process: "Ablauf",
    cases: "Referenzen",
    contact: "Kontakt",
    cabinetShort: "Kundenbereich",
    cabinetFull: "Kundenbereich",
  },
  header: {
    tagline: "Automatisierung und Websites",
    ctaPrimary: "Projekt besprechen",
    menuLabel: "Menü",
    closeLabel: "Schließen",
  },
  hero: {
    badge: "Versilia, Italien — nehme Projekte an",
    title1: "Ich sorge dafür,",
    title2: "dass die Routine läuft",
    titleGradient: "ohne Sie",
    description:
      "Ich automatisiere Anfragen, Rechnungen und Berichte, baue Websites und Telegram-Bots und verbinde Ihren Shop mit Lager und CRM. Sie kümmern sich ums Geschäft — das System erledigt den Rest.",
    ctaPrimary: "Projekt besprechen",
    ctaSecondary: "Referenzen ansehen",
    highlights: ["n8n-Workflows", "Telegram-Bots", "Shopify und Websites"],
  },
  services: {
    label: "Leistungen",
    heading: "Was Sie mir überlassen können",
    headingGradient: " und vergessen",
    items: {
      automation: {
        title: "Automatisierung von Geschäftsprozessen",
        pitch: "Ich beseitige manuelle Routine: Anfragen, Rechnungen, Berichte und Erinnerungen laufen von selbst, ohne dass Sie sie per Hand aus der E-Mail in eine Tabelle übertragen.",
        bullets: [
          "Anfragen aus allen Kanälen an einem Ort",
          "Automatische Benachrichtigungen an Verantwortliche",
          "Berichte, die sich jeden Morgen von selbst erstellen",
        ],
      },
      websites: {
        title: "Websites und Landingpages",
        pitch: "Eine Website, die erklärt, warum Sie nützlich sind, und aus Besuchern Anfragen macht. Keine Vorlage aus dem Baukasten — gebaut für Ihr Ziel.",
        bullets: [
          "Schnelles Laden und korrekte Darstellung auf dem Handy",
          "Ein klares Kontaktformular statt eines vagen „Schreiben Sie uns“",
          "Texte und Struktur passend zu dem, wonach Kunden wirklich suchen",
        ],
      },
      bots: {
        title: "Telegram-Bots",
        pitch: "Der Bot nimmt Bestellungen an, beantwortet häufige Fragen und erinnert an Termine, während Sie arbeiten.",
        bullets: [
          "Bestellungen mit Warenkorb und Bestätigung",
          "Antworten auf häufige Fragen ohne Ihr Zutun",
          "Benachrichtigungen fürs Team direkt im Arbeitschat",
        ],
      },
      integrations: {
        title: "Integrationen und APIs",
        pitch: "Ich verbinde, was Sie bereits haben: Shop, Lager, CRM, Tabellen, Buchhaltung. Daten hören auf, in getrennten Welten zu leben.",
        bullets: [
          "Shopify, CRM, Google Sheets, E-Mail",
          "Synchronisierung von Beständen und Bestellungen",
          "Datenaustausch per Webhook und REST",
        ],
      },
      dashboards: {
        title: "Dashboards und Analysen",
        pitch: "Ein Bildschirm, auf dem Umsatz, Anfragen und Auslastung sichtbar sind — damit Entscheidungen auf Zahlen basieren, nicht auf Gefühl.",
        bullets: [
          "Wichtige Kennzahlen auf einem Bildschirm",
          "Diagramme nach Woche und Monat",
          "Zugriff vom Handy jederzeit",
        ],
      },
      extras: {
        title: "Extras und Widgets",
        pitch: "Preisrechner, Auswahlformulare, Online-Buchung, kleine Widgets — kleine Dinge, die die Belastung spürbar senken.",
        bullets: [
          "Preisrechner auf der Website",
          "Online-Buchung mit Bestätigung",
          "Einbettbare Widgets für jede Website",
        ],
      },
    },
  },
  process: {
    label: "Ablauf",
    heading: "Vom Gespräch bis zum Start — vier Schritte",
    items: {
      "1": {
        title: "Gespräch",
        duration: "30–40 Minuten",
        description: "Wir telefonieren und klären, was genau Zeit und Geld kostet. Manchmal zeigt sich schon hier, dass die Lösung einfacher und günstiger ist als gedacht.",
      },
      "2": {
        title: "Angebot und Plan",
        duration: "1–2 Tage",
        description: "Ich schicke Ihnen ein klares Lösungskonzept, den Zeitrahmen und einen Festpreis. Kein „ungefähr“ und keine Überraschungen mittendrin.",
      },
      "3": {
        title: "Umsetzung",
        duration: "1–3 Wochen",
        description: "Ich zeige Ihnen Zwischenversionen, damit Sie unterwegs korrigieren können, statt am Ende zu sagen: „Das ist es nicht.“",
      },
      "4": {
        title: "Start und Support",
        duration: "danach — bei Bedarf",
        description: "Wir gehen live, ich zeige Ihnen die Bedienung und bleibe erreichbar. Kleine Korrekturen nach dem Start — ohne separate Rechnung.",
      },
    },
  },
  cases: {
    label: "Referenzen",
    heading: "Problem — Lösung — Ergebnis",
    categories: {
      all: "Alle",
      website: "Website",
      shop: "Online-Shop",
      automation: "Automatisierung",
      bot: "Telegram-Bot",
      integrations: "Integrationen",
    },
    before: "Vorher",
    after: "Umgesetzt",
    open: "Öffnen",
    empty: "In dieser Kategorie gibt es noch keine Referenzen.",
    items: {
      "evdokimov-costruzioni": {
        title: "Website für ein Bauunternehmen",
        problem: "Ein Bauunternehmen (Dächer, Haustechnik, Renovierungen und schlüsselfertige Villen in der Versilia) wickelte alle Aufträge per Telefon und Mundpropaganda ab — es gab keine Möglichkeit, Kunden das Portfolio zu zeigen.",
        solution: "Ich habe eine React-Website mit Leistungsübersicht, Projektportfolio und Kontaktformular erstellt — die gesamte Angebotspalette ist jetzt in einer Minute vom Handy aus sichtbar.",
        result: "Das Unternehmen hat eine Visitenkarte, die es mit einem Link verschicken kann, statt langer mündlicher Erklärungen",
      },
      "versilia-trasporti": {
        title: "Website für einen Umzugs- und Entrümpelungsservice",
        problem: "Ein Transport- und Entrümpelungsservice in der Versilia, Massa und Lucca nahm Anfragen nur telefonisch an — Kunden mussten den Arbeitsumfang mündlich beschreiben.",
        solution: "Ich habe eine Website mit Leistungsbeschreibung und einem schnellen WhatsApp-Anfrageformular erstellt — Kunden sehen sofort, was das Unternehmen macht, und hinterlassen eine Anfrage ohne langes Telefonat.",
        result: "Eine Anfrage dauert jetzt ein paar Klicks statt eines langen Telefonats",
      },
      "rc-verniciatura": {
        title: "Website für eine Bootslackiererei",
        problem: "Die Werkstatt lackiert Rümpfe und führt Antifouling, Polieren und Osmosebehandlung für Yachten durch — die Qualität der Arbeit ließ sich bisher nur per Foto in Chats zeigen.",
        solution: "Ich habe eine Visitenkarten-Website mit Beschreibung aller Arbeiten und einem klaren Formular für die Bootsbesichtigung erstellt.",
        result: "Die Werkstatt hat jetzt ein Portfolio statt Fotoaustausch über WhatsApp",
      },
    },
  },
  contact: {
    label: "Anfrage",
    heading1: "Erzählen Sie mir,",
    headingGradient: " was Zeit kostet",
    description: "Beschreiben Sie die Aufgabe mit eigenen Worten — ohne Fachbegriffe. Ich antworte innerhalb eines Tages und sage ehrlich, ob es sich lohnt und wie lange es dauert.",
    bullets: [
      "Erstes Gespräch kostenlos",
      "Festpreis vor Arbeitsbeginn",
      "Kleine Korrekturen nach dem Start ohne Rechnung",
    ],
    nameLabel: "Wie heißen Sie",
    namePlaceholder: "Paul",
    contactLabel: "Telegram, E-Mail oder Telefon",
    contactPlaceholder: "@username oder mail@example.com",
    taskLabel: "Was soll gemacht werden",
    taskPlaceholder: "Zum Beispiel: Anfragen kommen per E-Mail und Telegram und gehen verloren. Ich möchte, dass alles in eine Tabelle läuft und eine Benachrichtigung kommt.",
    errorRequired: "Füllen Sie alle drei Felder aus — so verstehe ich sofort, worum es geht.",
    submit: "Anfrage senden",
    sending: "Wird gesendet…",
    successTitle: "Anfrage erhalten",
    successBody: "Ich melde mich innerhalb eines Tages. Bei Dringendem schreiben Sie mir auf Telegram — dort antworte ich schneller.",
    sendAnother: "Weitere Anfrage senden",
    privacyNote: "Kein Spam und keine Weitergabe der Kontaktdaten an Dritte.",
  },
  footer: {
    tagline: "Pavel — Automatisierung von Geschäftsprozessen, Websites und Telegram-Bots. Ich arbeite von der Versilia aus, Projekte in ganz Italien und remote.",
    servicesLabel: "Leistungen",
    contactsLabel: "Kontakt",
    address: "Versilia, Italien",
    cabinet: "Kundenbereich",
  },
  notFound: {
    message: "Diese Seite gibt es nicht.",
    backHome: "Zur Startseite",
  },
};

export default de;
