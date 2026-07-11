/* =====================================================================
   LIFE IS A GAME — DATA FILE
   =====================================================================
   Tutti i testi, link, download e coordinate stanno QUI.
   Modifica questo file per aggiornare i contenuti: non serve toccare
   index.html, styles.css o script.js.

   ── COME MODIFICARE ─────────────────────────────────────────────────
   1. LINK SOCIAL       -> LIAG.profile.links   (TODO: GitHub)
   2. PDF / DOWNLOAD    -> LIAG.downloads       (ready:true quando il
                           file esiste davvero in /downloads)
   3. TESTI POPUP       -> LIAG.content.it  /  LIAG.content.en
   4. IMMAGINI POPUP    -> metti il file in assets/popup-images/ con il
                           nome indicato in "image" (il placeholder
                           sparisce da solo)
   5. POSIZIONI AVATAR  -> LIAG.roles[n].d (desktop) / .m (mobile)
                           cx = centro orizzontale %, bottom = distanza
                           dal fondo %, w = larghezza %
   ===================================================================== */

window.LIAG = {

  defaultLang: "it",

  profile: {
    name: "FRANCESCO NAPPI",
    payoff: "Life Is A Game",
    email: "franappi@gmail.com",
    links: {
      linkedin: "https://www.linkedin.com/in/franappi",
      github:   "",                                   /* TODO: aggiungi URL GitHub */
      whatsapp: "",                                   /* TODO: aggiungi link/numero WhatsApp */
      mail:     "mailto:franappi@gmail.com",
      /* non più nel footer (sostituiti da GitHub/WhatsApp/Email): tenuti per uso futuro */
      facebook: "https://www.facebook.com/franappi",
      instagram: "https://www.instagram.com/napukisan/"
    }
  },

  /* ---- PDF scaricabili (ready:false = bottone "in preparazione") ---- */
  downloads: {
    actor:     { file: "downloads/francesco-nappi-actor-speaker.pdf",      ready: false },
    copy:      { file: "downloads/francesco-nappi-creative-copywriter.pdf",ready: false },
    trainer:   { file: "downloads/francesco-nappi-trainer-coach.pdf",      ready: false },
    creative:  { file: "downloads/francesco-nappi-creative-projects.pdf",  ready: false },
    technical: { file: "downloads/francesco-nappi-technical-builder.pdf",  ready: false },
    pitch:     { file: "downloads/virtoo-pitch-deck.pdf",                  ready: false },
    complete:  { file: "downloads/francesco-nappi-complete-cv.pdf",        ready: true  }
  },

  /* ---- ruoli: ordine, avatar, tier, coordinate sulle dashboard ------
         d = layout desktop (2560x1440) · m = layout mobile (941x1672)
         cx:     centro orizzontale in % della dashboard
         bottom: distanza piedi-avatar dal fondo in % (= bordo mensola)
         h:      ALTEZZA avatar in % dell'altezza dashboard
         (la larghezza si adatta da sola alle proporzioni del PNG)      */
  /* sign = insegna "skills" nella cella (cx/cy = centro %, w = larghezza cqw).
     null = nessuna insegna separata (l'avatar mostra già le skill / titolo). */
  roles: [
    { id: "actor-speaker",      tier: "play",   n: 1, avatar: "assets/avatars/actor-speaker.png",
      d: { cx: 28.4, bottom: 61.0, h: 16.6 }, m: { cx: 24.0, bottom: 63.0, h: 13.2 },
      label: { cx: 20.9, cy: 39.7 }, lm: { cx: 24.0, cy: 41.0 },
      sign: { img: "assets/skills/actor-speaker.png", cx: 15.7, cy: 28.9, w: 9.2 } },
    { id: "copywriter",         tier: "play",   n: 2, avatar: "assets/avatars/copywriter.png",
      d: { cx: 59.2, bottom: 60.9, h: 15.5 }, m: { cx: 50.0, bottom: 63.0, h: 12.4 },
      label: { cx: 49.3, cy: 39.6 }, lm: { cx: 50.0, cy: 41.0 },
      sign: { img: "assets/skills/copywriter.png", cx: 40.9, cy: 28.8, w: 7.8 } },
    { id: "tech-addicted",      tier: "play",   n: 3, avatar: "assets/avatars/tech-addicted.png",
      d: { cx: 86.2, bottom: 61.0, h: 14.7 }, m: { cx: 80.0, bottom: 63.0, h: 12.0 },
      label: { cx: 79.8, cy: 39.7 }, lm: { cx: 80.0, cy: 41.0 },
      sign: { img: "assets/skills/tech-addicted.png", cx: 73.4, cy: 28.6, w: 10.4 } },
    { id: "trainer-coach",      tier: "evolve", n: 4, avatar: "assets/avatars/trainer-coach.png",
      d: { cx: 16.4, bottom: 38.5, h: 18.2 }, m: { cx: 24.0, bottom: 42.5, h: 14.0 },
      label: { cx: 21.8, cy: 63.0 }, lm: { cx: 24.0, cy: 61.5 },
      sign: { img: "assets/skills/trainer-coach.png", cx: 27.1, cy: 50.9, w: 10.5 } },
    { id: "freelance-creative", tier: "evolve", n: 5, avatar: "assets/avatars/freelance-creative.png",
      d: { cx: 58.8, bottom: 38.2, h: 18.4 }, m: { cx: 50.0, bottom: 42.5, h: 14.0 },
      label: { cx: 49.6, cy: 62.8 }, lm: { cx: 50.0, cy: 61.5 },
      sign: { img: "assets/skills/freelance-creative.png", cx: 41.9, cy: 50.6, w: 11.5 } },
    { id: "vibe-coder",         tier: "evolve", n: 6, avatar: "assets/avatars/vibe-coder.png",
      d: { cx: 87.0, bottom: 38.0, h: 18.5 }, m: { cx: 80.0, bottom: 42.5, h: 14.0 },
      label: { cx: 79.6, cy: 62.9 }, lm: { cx: 80.0, cy: 61.5 },
      sign: [
        { img: "assets/skills/vibe-3.png",    cx: 71.1, cy: 47.2, w: 5.3 },
        { img: "assets/skills/vibe-1.png",    cx: 76.5, cy: 47.1, w: 5.0 },
        { img: "assets/skills/vibe-2.png",    cx: 71.1, cy: 54.3, w: 4.5 },
        { img: "assets/skills/robot-ai.png",  cx: 76.6, cy: 56.1, w: 4.4 }
      ] },
    { id: "founder",            tier: "unlock", n: 7, avatar: "assets/avatars/founder.png",
      d: { cx: 48.0, bottom: 15.0, h: 19.0 }, m: { cx: 50.0, bottom: 22.0, h: 14.0 },
      label: null, sign: null }
  ],

  /* intestazioni di colonna incise sul metallo (sopra la prima riga) */
  columns: [
    { label: "PERFORM", cx: 19.0 },
    { label: "CREATE",  cx: 49.0 },
    { label: "BUILD",   cx: 78.5 }
  ],

  tiers: {
    play:   { no: "01", label: "PLAY"   },
    evolve: { no: "02", label: "EVOLVE" },
    unlock: { no: "03", label: "UNLOCK" }
  },

  /* ---- stringhe interfaccia ---------------------------------------- */
  ui: {
    it: {
      fullDossier: "CV completo (PDF)",
      close: "Chiudi dossier",
      comingSoon: "In preparazione",
      download: "Scarica",
      open: "Apri",
      openRole: "Apri dossier",
      imageMissing: "Immagine in arrivo",
      socials: { linkedin: "LinkedIn", github: "GitHub (link da aggiungere)", whatsapp: "WhatsApp (link da aggiungere)", email: "Email" }
    },
    en: {
      fullDossier: "Full resume (PDF)",
      close: "Close dossier",
      comingSoon: "Coming soon",
      download: "Download",
      open: "Open",
      openRole: "Open dossier",
      imageMissing: "Image coming soon",
      socials: { linkedin: "LinkedIn", github: "GitHub (add link)", whatsapp: "WhatsApp (add link)", email: "Email" }
    }
  },

  /* =====================================================================
     CONTENUTI POPUP — bozze dal documento "popup format semplificato".
     Le label ROLE / MAIN CHALLENGES / UNLOCKED SKILLS / DOWNLOAD & LINKS
     restano in inglese in entrambe le lingue (identità grafica).
     link.kind: "pdf" (download) · "web" · "video"
     link.dl:   chiave in LIAG.downloads (per i PDF)
     ===================================================================== */
  content: {

    /* ────────────────────────────── ITALIANO ───────────────────────── */
    it: {
      "actor-speaker": {
        name: "Actor & Speaker",
        role: "La mia formazione parte dalla scena: teatro, cinema, radio, voce, corpo, ritmo, presenza. Prima di lavorare su brand, piattaforme o percorsi formativi, ho studiato come una storia diventa viva quando passa attraverso una persona. Questa radice performativa continua a influenzare il modo in cui parlo, insegno, presento, costruisco format e progetto esperienze pensate per essere capite, ricordate e sentite.",
        challenges: [
          "Formazione in recitazione e Storytelling & Performing Arts alla Scuola Holden, con percorso di acting con Gabriele Vacis.",
          "Esperienze in teatro, cinema, cortometraggi, spot, radio e opera lirica.",
          "Autore e speaker di The Turiner; autore di (S)Talkin' to me?, finalista al Premio Riccione Pier Vittorio Tondelli."
        ],
        skills: ["Public speaking", "Presenza scenica", "Voce e ritmo", "Scrittura performativa", "Storytelling live", "Gestione dell'attenzione", "Drammaturgia"],
        links: [
          { label: "CV Actor & Speaker", kind: "pdf", dl: "actor" },
          { label: "Showreel", kind: "video", href: "", ready: false }
        ],
        image: "assets/popup-images/actor-speaker.jpg",
        imageNote: "Foto di scena · teatro / cinema / radio"
      },

      "copywriter": {
        name: "Copywriter",
        role: "Uso la scrittura per chiarire idee, posizionare progetti e costruire voci riconoscibili. Ho lavorato su copywriting, transcreation, brand voice, manifesti, cataloghi, siti, contenuti editoriali e progetti di comunicazione. Per me scrivere non significa solo trovare la frase giusta: significa capire il mondo dietro un prodotto, un'azienda o un progetto e trasformarlo in un messaggio che le persone possano seguire.",
        challenges: [
          "Copy e transcreation per clienti internazionali tramite Copywriter Collective, tra cui Google, Manfrotto, Amazon e Coin Excelsior.",
          "Testi, payoff e manifesti per This Is Ideal e altri progetti di brand communication.",
          "Direzione del gruppo copy per i testi del programma Matera 2019 Capitale Europea della Cultura; collaborazioni con Eggers 2.0, Weevo e Scuola Holden."
        ],
        skills: ["Copywriting", "Transcreation", "Brand voice", "Manifesto writing", "Content strategy", "Struttura editoriale", "Naming e payoff"],
        links: [
          { label: "CV Creative & Copywriter", kind: "pdf", dl: "copy" },
          { label: "Writing samples", kind: "web", href: "", ready: false }
        ],
        image: "assets/popup-images/copywriter.jpg",
        imageNote: "Testi · manifesti · loghi clienti"
      },

      "tech-addicted": {
        name: "Tech Addicted",
        role: "La tecnologia è sempre stata parte del mio modo di esplorare e costruire. Ho seguito corsi di coding, game design e strumenti digitali non per presentarmi come sviluppatore puro, ma per capire come un'idea diventa sistema, interfaccia, esperienza o prototipo. Questa curiosità mi permette di parlare con profili tecnici, imparare strumenti nuovi e usare software, AI e workflow digitali come estensioni del processo creativo.",
        challenges: [
          "Android Basics Nanodegree by Google/Udacity, con basi di programmazione Java.",
          "Attestato Game Designer — percorso Young Talent In Action / Manpower.",
          "Uso pratico di strumenti creativi, AI tool, OBS, GitHub, Figma, Adobe tools e workflow di produzione digitale."
        ],
        skills: ["Alfabetizzazione tecnica", "Tool learning", "Digital prototyping", "AI-assisted workflow", "Problem solving tecnico", "Creative software", "Game logic basics", "Android/Java basics"],
        links: [],
        image: "assets/popup-images/tech-addicted.jpg",
        imageNote: "Toolbox · badge corsi · software"
      },

      "trainer-coach": {
        name: "Trainer & Coach",
        role: "Progetto e conduco percorsi di formazione su storytelling, comunicazione e public speaking. Il mio metodo nasce dall'incrocio tra scrittura, teatro, formazione e lavoro sul campo: non mi interessa solo spiegare come funziona una buona comunicazione, ma creare esercizi e contesti in cui le persone possano provarla, correggerla e farla propria.",
        challenges: [
          "Docente per Scuola Holden Academy, Holden Pro e percorsi di corporate storytelling.",
          "Digital & Learning Strategist per Chora Academy.",
          "Percorsi e consulenze su storytelling, comunicazione e public speaking per professionisti, team e contesti educativi."
        ],
        skills: ["Storytelling", "Public speaking", "Training design", "Comunicazione efficace", "Audience engagement", "Message clarity", "Feedback facilitation"],
        links: [
          { label: "CV Trainer & Coach", kind: "pdf", dl: "trainer" }
        ],
        image: "assets/popup-images/trainer-coach.jpg",
        imageNote: "Aula · workshop · lavagna"
      },

      "freelance-creative": {
        name: "Freelance Creative",
        role: "Come freelance creative lavoro spesso nello spazio tra concept, narrazione, produzione e project management. Mi interessano i progetti che non stanno in una sola casella: percorsi di impatto sociale, identità educative, brand storytelling, format, campagne, siti e sistemi di comunicazione. Il mio ruolo è trovare il motore narrativo, dare forma all'esperienza e rendere il progetto comprensibile per chi deve crederci.",
        challenges: [
          "Sami Around The World — ideazione, direzione creativa, project management, comunicazione, raccolta fondi, sponsor, sito, social e format video.",
          "Scuola Verna — posizionamento, manifesto, identità narrativa e concept del sito immersivo.",
          "Progetti di brand storytelling, format e comunicazione integrata per aziende, scuole e realtà culturali."
        ],
        skills: ["Creative direction", "Project design", "Narrative strategy", "Brand storytelling", "Format development", "Content system", "Fundraising communication", "Community building"],
        links: [
          { label: "Creative Projects Dossier", kind: "pdf", dl: "creative" },
          { label: "Sami Around The World", kind: "web", href: "", ready: false },
          { label: "Scuola Verna", kind: "web", href: "", ready: false }
        ],
        image: "assets/popup-images/freelance-creative.jpg",
        imageNote: "Sami Around The World · Scuola Verna"
      },

      "vibe-coder": {
        name: "Vibe Coder",
        role: "Uso codice, AI tool e workflow tecnici per costruire cose che altrimenti resterebbero idee. Non mi presento come sviluppatore senior: la mia forza è collegare visione di prodotto, design narrativo, logica d'interfaccia e prototipazione rapida. So scrivere specifiche, guidare scelte tecniche, testare, correggere e usare strumenti di sviluppo assistito dall'AI per creare siti, plugin, tool e esperienze interattive funzionanti.",
        challenges: [
          "Virtòó — lato tecnico dei workflow desktop, integrazione OBS, virtual camera, share, presentazioni e prototipazione prodotto.",
          "Plugin OBS Background Removal — percorso di sviluppo, test e preparazione alla release open source.",
          "giuliafilippone.com e questo CV interattivo — progettazione, sviluppo assistito, interfacce e messa online."
        ],
        skills: ["AI-assisted development", "Product prototyping", "Technical specification", "Frontend thinking", "OBS workflows", "GitHub workflow", "Debugging mindset", "Creative technology"],
        links: [
          { label: "GitHub", kind: "web", href: "", ready: false },
          { label: "giuliafilippone.com", kind: "web", href: "https://giuliafilippone.com", ready: true },
          { label: "Technical Builder Dossier", kind: "pdf", dl: "technical" }
        ],
        image: "assets/popup-images/vibe-coder.jpg",
        imageNote: "Virtòó · plugin OBS · interfacce"
      },

      "founder": {
        name: "Founder",
        role: "Virtòó è il punto in cui convergono molte parti del mio percorso: public speaking, formazione, storytelling, video, interfacce e tecnologia. È uno strumento pensato per chi deve presentare, insegnare o comunicare online con più controllo, ritmo e impatto visivo. Come founder sto lavorando non solo sul prodotto, ma anche su posizionamento, modello commerciale, validazione, pitch, partnership e go-to-market.",
        challenges: [
          "Virtòó — The Virtual Revolution Tool: software desktop per lezioni, presentazioni, webinar e format online con regia più controllata.",
          "Percorso imprenditoriale e di validazione: target, pricing, offerta commerciale, test utenti, pitch e business model.",
          "Percorso ESCP: sviluppo dell'approccio imprenditoriale, posizionamento e strumenti per trasformare il prodotto in una proposta di mercato."
        ],
        skills: ["Product vision", "Business model design", "Pitching", "Go-to-market", "Market validation", "Creative entrepreneurship", "Commercial positioning", "Partnership thinking"],
        links: [
          { label: "Virtòó Pitch Deck", kind: "pdf", dl: "pitch" },
          { label: "Complete CV", kind: "pdf", dl: "complete" }
        ],
        image: "assets/popup-images/founder.jpg",
        imageNote: "Virtòó · pitch deck · mockup prodotto"
      }
    },

    /* ────────────────────────────── ENGLISH ────────────────────────────
       Bozza di traduzione: rivedere prima della versione finale.        */
    en: {
      "actor-speaker": {
        name: "Actor & Speaker",
        role: "My training starts on stage: theatre, film, radio — voice, body, rhythm, presence. Before working on brands, platforms or training programmes, I studied how a story comes alive when it passes through a person. That performing root still shapes the way I speak, teach, present, build formats and design experiences meant to be understood, remembered and felt.",
        challenges: [
          "Acting and Storytelling & Performing Arts training at Scuola Holden, including an acting path with Gabriele Vacis.",
          "Experience in theatre, film, short films, commercials, radio and opera.",
          "Author and host of The Turiner; author of (S)Talkin' to me?, finalist at the Riccione Pier Vittorio Tondelli Award."
        ],
        skills: ["Public speaking", "Stage presence", "Voice & rhythm", "Performative writing", "Live storytelling", "Attention management", "Dramaturgy"],
        links: [
          { label: "CV Actor & Speaker", kind: "pdf", dl: "actor" },
          { label: "Showreel", kind: "video", href: "", ready: false }
        ],
        image: "assets/popup-images/actor-speaker.jpg",
        imageNote: "Stage photo · theatre / film / radio"
      },

      "copywriter": {
        name: "Copywriter",
        role: "I use writing to clarify ideas, position projects and build recognisable voices. I've worked on copywriting, transcreation, brand voice, manifestos, catalogues, websites, editorial content and communication projects. To me writing isn't just finding the right line: it's understanding the world behind a product, a company or a project — and turning it into a message people can follow.",
        challenges: [
          "Copy and transcreation for international clients via Copywriter Collective, including Google, Manfrotto, Amazon and Coin Excelsior.",
          "Copy, payoffs and manifestos for This Is Ideal and other brand-communication projects.",
          "Led the copy group for the Matera 2019 European Capital of Culture programme; collaborations with Eggers 2.0, Weevo and Scuola Holden."
        ],
        skills: ["Copywriting", "Transcreation", "Brand voice", "Manifesto writing", "Content strategy", "Editorial structure", "Naming & payoff"],
        links: [
          { label: "CV Creative & Copywriter", kind: "pdf", dl: "copy" },
          { label: "Writing samples", kind: "web", href: "", ready: false }
        ],
        image: "assets/popup-images/copywriter.jpg",
        imageNote: "Copy · manifestos · client logos"
      },

      "tech-addicted": {
        name: "Tech Addicted",
        role: "Technology has always been part of how I explore and build. I've taken courses in coding, game design and digital tools — not to present myself as a pure developer, but to understand how an idea becomes a system, an interface, an experience or a prototype. That curiosity lets me talk with technical profiles, learn new tools fast and use software, AI and digital workflows as extensions of the creative process.",
        challenges: [
          "Android Basics Nanodegree by Google/Udacity, with Java programming foundations.",
          "Game Designer certificate — Young Talent In Action / Manpower programme.",
          "Hands-on use of creative tools, AI tools, OBS, GitHub, Figma, Adobe apps and digital production workflows."
        ],
        skills: ["Technical literacy", "Tool learning", "Digital prototyping", "AI-assisted workflow", "Technical problem solving", "Creative software", "Game logic basics", "Android/Java basics"],
        links: [],
        image: "assets/popup-images/tech-addicted.jpg",
        imageNote: "Toolbox · course badges · software"
      },

      "trainer-coach": {
        name: "Trainer & Coach",
        role: "I design and run training programmes on storytelling, communication and public speaking. My method comes from the crossroads of writing, theatre, training and field work: I'm not interested in just explaining how good communication works — I create exercises and contexts where people can try it, correct it and make it their own.",
        challenges: [
          "Teacher for Scuola Holden Academy, Holden Pro and corporate storytelling programmes.",
          "Digital & Learning Strategist for Chora Academy.",
          "Programmes and consulting on storytelling, communication and public speaking for professionals, teams and educational contexts."
        ],
        skills: ["Storytelling", "Public speaking", "Training design", "Effective communication", "Audience engagement", "Message clarity", "Feedback facilitation"],
        links: [
          { label: "CV Trainer & Coach", kind: "pdf", dl: "trainer" }
        ],
        image: "assets/popup-images/trainer-coach.jpg",
        imageNote: "Classroom · workshop · whiteboard"
      },

      "freelance-creative": {
        name: "Freelance Creative",
        role: "As a freelance creative I often work in the space between concept, narrative, production and project management. I'm drawn to projects that don't fit a single box: social-impact journeys, educational identities, brand storytelling, formats, campaigns, websites and communication systems. My role is to find the narrative engine, shape the experience and make the project easy to believe in.",
        challenges: [
          "Sami Around The World — concept, creative direction, project management, communication, fundraising, sponsors, website, social and video format.",
          "Scuola Verna — positioning, manifesto, narrative identity and concept for the immersive website.",
          "Brand storytelling, formats and integrated communication for companies, schools and cultural organisations."
        ],
        skills: ["Creative direction", "Project design", "Narrative strategy", "Brand storytelling", "Format development", "Content systems", "Fundraising communication", "Community building"],
        links: [
          { label: "Creative Projects Dossier", kind: "pdf", dl: "creative" },
          { label: "Sami Around The World", kind: "web", href: "", ready: false },
          { label: "Scuola Verna", kind: "web", href: "", ready: false }
        ],
        image: "assets/popup-images/freelance-creative.jpg",
        imageNote: "Sami Around The World · Scuola Verna"
      },

      "vibe-coder": {
        name: "Vibe Coder",
        role: "I use code, AI tools and technical workflows to build things that would otherwise stay ideas. I don't present myself as a senior developer: my strength is connecting product vision, narrative design, interface logic and rapid prototyping. I can write specs, drive technical choices, test, fix and use AI-assisted development to create working websites, plugins, tools and interactive experiences.",
        challenges: [
          "Virtòó — technical side of the desktop workflows: OBS integration, virtual camera, sharing, presentations and product prototyping.",
          "OBS Background Removal plugin — development, testing and preparation for the open-source release.",
          "giuliafilippone.com and this interactive CV — design, AI-assisted development, interfaces and shipping."
        ],
        skills: ["AI-assisted development", "Product prototyping", "Technical specification", "Frontend thinking", "OBS workflows", "GitHub workflow", "Debugging mindset", "Creative technology"],
        links: [
          { label: "GitHub", kind: "web", href: "", ready: false },
          { label: "giuliafilippone.com", kind: "web", href: "https://giuliafilippone.com", ready: true },
          { label: "Technical Builder Dossier", kind: "pdf", dl: "technical" }
        ],
        image: "assets/popup-images/vibe-coder.jpg",
        imageNote: "Virtòó · OBS plugin · interfaces"
      },

      "founder": {
        name: "Founder",
        role: "Virtòó is where many parts of my path converge: public speaking, training, storytelling, video, interfaces and technology. It's a tool for anyone who needs to present, teach or communicate online with more control, rhythm and visual impact. As a founder I'm working not only on the product, but on positioning, business model, validation, pitch, partnerships and go-to-market.",
        challenges: [
          "Virtòó — The Virtual Revolution Tool: desktop software for lessons, presentations, webinars and online formats with tighter direction.",
          "Entrepreneurial and validation path: target, pricing, commercial offer, user tests, pitch and business model.",
          "ESCP programme: developing the entrepreneurial approach, positioning and the tools to turn the product into a market proposition."
        ],
        skills: ["Product vision", "Business model design", "Pitching", "Go-to-market", "Market validation", "Creative entrepreneurship", "Commercial positioning", "Partnership thinking"],
        links: [
          { label: "Virtòó Pitch Deck", kind: "pdf", dl: "pitch" },
          { label: "Complete CV", kind: "pdf", dl: "complete" }
        ],
        image: "assets/popup-images/founder.jpg",
        imageNote: "Virtòó · pitch deck · product mockup"
      }
    }
  }
};
