import type ru from "./ru";

const it: typeof ru = {
  nav: {
    services: "Servizi",
    process: "Come lavoro",
    cases: "Case study",
    contact: "Contatti",
    cabinetShort: "Area riservata",
    cabinetFull: "Area riservata",
  },
  header: {
    tagline: "Automazione e siti web",
    ctaPrimary: "Parliamo del progetto",
    menuLabel: "Menu",
    closeLabel: "Chiudi",
  },
  hero: {
    badge: "Versilia, Italia — accetto progetti",
    title1: "Faccio in modo che",
    title2: "la routine funzioni",
    titleGradient: "senza di te",
    description:
      "Automatizzo richieste, fatture e report, creo siti e bot Telegram, collego il negozio a magazzino e CRM. Tu ti occupi del lavoro — il sistema fa il resto.",
    ctaPrimary: "Parliamo del progetto",
    ctaSecondary: "Guarda i case study",
    highlights: ["Workflow n8n", "Bot Telegram", "Shopify e siti web"],
  },
  services: {
    label: "Servizi",
    heading: "Cosa puoi affidarmi",
    headingGradient: " e dimenticare",
    items: {
      automation: {
        title: "Automazione dei processi aziendali",
        pitch: "Elimino la routine manuale: richieste, fatture, report e promemoria iniziano a muoversi da soli, senza copiare a mano dalla posta al foglio di calcolo.",
        bullets: [
          "Richieste da tutti i canali in un unico posto",
          "Notifiche automatiche ai responsabili",
          "Report che si generano da soli ogni mattina",
        ],
      },
      websites: {
        title: "Siti web e landing page",
        pitch: "Un sito che spiega perché sei utile e trasforma il visitatore in una richiesta. Non un modello da un costruttore — pensato per il tuo obiettivo.",
        bullets: [
          "Caricamento veloce e visualizzazione corretta da telefono",
          "Un modulo di contatto chiaro, non un generico «scrivici»",
          "Testi e struttura pensati su ciò che i clienti cercano davvero",
        ],
      },
      bots: {
        title: "Bot Telegram",
        pitch: "Il bot accetta ordini, risponde alle domande frequenti e ricorda gli appuntamenti mentre tu sei occupato a lavorare.",
        bullets: [
          "Ordini con carrello e conferma",
          "Risposte alle domande frequenti senza il tuo intervento",
          "Notifiche al team direttamente nella chat di lavoro",
        ],
      },
      integrations: {
        title: "Integrazioni e API",
        pitch: "Collego ciò che hai già: negozio, magazzino, CRM, fogli di calcolo, contabilità. I dati smettono di vivere in mondi separati.",
        bullets: [
          "Shopify, CRM, Google Sheets, email",
          "Sincronizzazione di giacenze e ordini",
          "Scambio dati via webhook e REST",
        ],
      },
      dashboards: {
        title: "Dashboard e analisi",
        pitch: "Un'unica schermata dove vedi fatturato, richieste e carico di lavoro. Perché le decisioni si prendano sui numeri, non sulle sensazioni.",
        bullets: [
          "Indicatori chiave in un'unica schermata",
          "Grafici per settimana e per mese",
          "Accesso da telefono in qualsiasi momento",
        ],
      },
      extras: {
        title: "Chicche e widget",
        pitch: "Calcolatori di prezzo, moduli di selezione, prenotazioni online, mini-widget — piccole cose che alleggeriscono notevolmente il carico di lavoro.",
        bullets: [
          "Calcolatore del prezzo sul sito",
          "Prenotazione online con conferme",
          "Widget integrabili su qualsiasi sito",
        ],
      },
    },
  },
  process: {
    label: "Come lavoro",
    heading: "Dalla telefonata al lancio — quattro passi",
    items: {
      "1": {
        title: "Chiamata",
        duration: "30–40 minuti",
        description: "Facciamo una chiamata e analizziamo cosa esattamente ti sta portando via tempo e denaro. A volte già qui emerge che il problema si risolve in modo più semplice ed economico di quanto sembrasse.",
      },
      "2": {
        title: "Preventivo e piano",
        duration: "1–2 giorni",
        description: "Ti invio uno schema chiaro della soluzione, i tempi e un prezzo fisso. Niente «più o meno» e nessuna sorpresa a metà progetto.",
      },
      "3": {
        title: "Sviluppo",
        duration: "1–3 settimane",
        description: "Realizzo e mostro versioni intermedie, così puoi correggere man mano invece di vedere il risultato finito e dire «non è questo».",
      },
      "4": {
        title: "Lancio e supporto",
        duration: "da qui in poi — quando serve",
        description: "Lanciamo, ti mostro come usarlo e resto in contatto. Piccole modifiche dopo il lancio — senza fattura a parte.",
      },
    },
  },
  cases: {
    label: "Case study",
    heading: "Problema — soluzione — risultato",
    categories: {
      all: "Tutti",
      website: "Sito web",
      shop: "E-commerce",
      automation: "Automazione",
      bot: "Bot Telegram",
      integrations: "Integrazioni",
    },
    before: "Prima",
    after: "Ho fatto",
    open: "Apri",
    empty: "In questa categoria non ci sono ancora case study.",
    items: {
      "evdokimov-costruzioni": {
        title: "Sito web per un'impresa edile",
        problem: "Un'impresa edile (tetti, impianti, ristrutturazioni e ville chiavi in mano in Versilia) gestiva tutti gli ordini tramite telefonate e passaparola — non c'era modo di mostrare il portfolio dei lavori al cliente.",
        solution: "Ho realizzato un sito vetrina in React con sezioni servizi, portfolio lavori e modulo di contatto — ora tutta la gamma di lavori è visibile da telefono in un minuto.",
        result: "L'azienda ha ottenuto una vetrina da inviare al cliente con un link, invece di una lunga spiegazione a voce",
      },
      "versilia-trasporti": {
        title: "Sito per un servizio di traslochi e sgomberi",
        problem: "Un servizio di trasporti e sgombero locali in Versilia, Massa e Lucca accettava richieste solo per telefono — il cliente doveva spiegare a voce il volume del lavoro.",
        solution: "Ho realizzato un sito con la descrizione dei servizi e un modulo di richiesta rapida su WhatsApp — il cliente vede subito cosa fa l'azienda e lascia la richiesta senza una lunga telefonata.",
        result: "La richiesta ora si compila in pochi clic invece di una lunga telefonata",
      },
      "rc-verniciatura": {
        title: "Vetrina per un'officina di verniciatura nautica",
        problem: "L'officina verniciа scafi ed esegue trattamento antivegetativo, lucidatura e trattamento osmosi per yacht — ma poteva mostrare la qualità del lavoro solo con foto in chat.",
        solution: "Ho realizzato un sito vetrina con la descrizione di tutti i tipi di lavoro e un modulo chiaro per prenotare un sopralluogo dell'imbarcazione.",
        result: "L'officina ha ora una vetrina con portfolio invece di uno scambio di foto su WhatsApp",
      },
    },
  },
  contact: {
    label: "Richiesta",
    heading1: "Raccontami cosa",
    headingGradient: " ti porta via tempo",
    description: "Descrivi l'attività con parole tue — senza termini tecnici. Ti rispondo entro un giorno e ti dico onestamente se vale la pena farlo e quanto tempo richiede.",
    bullets: [
      "Prima chiamata gratuita",
      "Prezzo fisso prima di iniziare i lavori",
      "Piccole modifiche dopo il lancio senza fattura",
    ],
    nameLabel: "Come ti chiami",
    namePlaceholder: "Paolo",
    contactLabel: "Telegram, email o telefono",
    contactPlaceholder: "@username o mail@example.com",
    taskLabel: "Cosa serve fare",
    taskPlaceholder: "Ad esempio: le richieste arrivano su email e Telegram e si perdono. Vorrei che finissero tutte in un'unica tabella con una notifica.",
    errorRequired: "Compila tutti e tre i campi — così capisco subito di cosa si tratta.",
    submit: "Invia la richiesta",
    sending: "Invio…",
    successTitle: "Richiesta ricevuta",
    successBody: "Ti contatterò entro un giorno. Se è urgente, scrivimi su Telegram: lì rispondo più velocemente.",
    sendAnother: "Invia un'altra richiesta",
    privacyNote: "Niente spam e nessuna cessione dei contatti a terzi.",
  },
  footer: {
    tagline: "Pavel — automazione dei processi aziendali, siti web e bot Telegram. Lavoro dalla Versilia, progetti in tutta Italia e da remoto.",
    servicesLabel: "Servizi",
    contactsLabel: "Contatti",
    address: "Versilia, Italia",
    cabinet: "Area riservata",
  },
  notFound: {
    message: "Questa pagina non esiste.",
    backHome: "Torna alla home",
  },
};

export default it;
