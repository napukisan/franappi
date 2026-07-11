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
      github:   "https://github.com/napukisan",
      whatsapp: "https://wa.me/393331825543",
      mail:     "mailto:franappi@gmail.com",
      /* non più nel footer (sostituiti da GitHub/WhatsApp/Email): tenuti per uso futuro */
      facebook: "https://www.facebook.com/franappi",
      instagram: "https://www.instagram.com/napukisan/"
    }
  },

  /* ---- PDF scaricabili (ready:false = bottone "in preparazione") ---- */
  downloads: {
    actorIt:   { file: "downloads/Francesco Nappi - Actor & Speaker -ITA.pdf", ready: true  },
    actorEn:   { file: "downloads/Francesco Nappi - Actor & Speaker -ENG.pdf", ready: true  },
    copyIt:    { file: "downloads/Francesco Nappi - Creative & Copywriter -ITA.pdf", ready: true  },
    copyEn:    { file: "downloads/Francesco Nappi - Creative & Copywriter -ENG.pdf", ready: true  },
    trainerIt: { file: "downloads/Francesco Nappi - Trainer & Coach -ITA.pdf", ready: true },
    trainerEn: { file: "downloads/Francesco Nappi - Trainer & Coach -ENG.pdf", ready: true },
    samiProject: { file: "downloads/Sami Around The World - Scheda Progetto.pdf", ready: true },
    founderEscp: { file: "downloads/ESCP - From zero to Startup.jfif", ready: true },
    copy:      { file: "downloads/francesco-nappi-creative-copywriter.pdf",ready: false },
    trainer:   { file: "downloads/francesco-nappi-trainer-coach.pdf",      ready: false },
    creative:  { file: "downloads/francesco-nappi-creative-projects.pdf",  ready: false },
    technical: { file: "downloads/francesco-nappi-technical-builder.pdf",  ready: false },
    pitch:     { file: "downloads/virtoo-pitch-deck.pdf",                  ready: false },
    complete:  { file: "downloads/francesco-nappi-complete-cv.pdf",        ready: false }
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
    { id: "actor-speaker",      tier: "play",   n: 1, avatar: "assets/avatars/actor-speaker.webp",
      d: { cx: 28.4, bottom: 61.0, h: 16.6 }, m: { cx: 24.0, bottom: 63.0, h: 13.2 },
      label: { cx: 20.9, cy: 39.7 }, lm: { cx: 24.5, cy: 38.4 },
      sign: { img: "assets/skills/actor-speaker.webp", cx: 15.7, cy: 28.9, w: 9.2 } },
    { id: "copywriter",         tier: "play",   n: 2, avatar: "assets/avatars/copywriter.webp",
      d: { cx: 59.2, bottom: 60.9, h: 15.5 }, m: { cx: 50.0, bottom: 63.0, h: 12.4 },
      label: { cx: 49.3, cy: 39.6 }, lm: { cx: 50.0, cy: 38.6 },
      sign: { img: "assets/skills/copywriter.webp", cx: 40.9, cy: 28.8, w: 7.8 } },
    { id: "tech-addicted",      tier: "play",   n: 3, avatar: "assets/avatars/tech-addicted.webp",
      d: { cx: 86.2, bottom: 61.0, h: 14.7 }, m: { cx: 74.1, bottom: 62.9, h: 12.0 },
      label: { cx: 79.8, cy: 39.7 }, lm: { cx: 75.8, cy: 38.4 },
      sign: { img: "assets/skills/tech-addicted.webp", cx: 73.4, cy: 28.6, w: 10.4 } },
    { id: "trainer-coach",      tier: "evolve", n: 4, avatar: "assets/avatars/trainer-coach.webp",
      d: { cx: 16.4, bottom: 38.5, h: 18.2 }, m: { cx: 25.8, bottom: 43.4, h: 14.0 },
      label: { cx: 21.8, cy: 63.0 }, lm: { cx: 24.0, cy: 57.8 },
      sign: { img: "assets/skills/trainer-coach.webp", cx: 27.1, cy: 50.9, w: 10.5 } },
    { id: "freelance-creative", tier: "evolve", n: 5, avatar: "assets/avatars/freelance-creative.webp",
      d: { cx: 58.8, bottom: 38.2, h: 18.4 }, m: { cx: 49.9, bottom: 43.3, h: 14.0 },
      label: { cx: 49.6, cy: 62.8 }, lm: { cx: 50.0, cy: 58.0 },
      sign: { img: "assets/skills/freelance-creative.webp", cx: 41.9, cy: 50.6, w: 11.5 } },
    { id: "vibe-coder",         tier: "evolve", n: 6, avatar: "assets/avatars/vibe-coder.webp",
      d: { cx: 87.0, bottom: 38.0, h: 18.5 }, m: { cx: 77.9, bottom: 43.5, h: 14.4 },
      mAvatar: "assets/avatars/vibe-coder-mobile.webp",
      label: { cx: 79.6, cy: 62.9 }, lm: { cx: 75.6, cy: 58.0 },
      sign: [
        { img: "assets/skills/vibe-3.webp",  cx: 71.1, cy: 47.2, w: 5.3 },
        { img: "assets/skills/vibe-1.webp",  cx: 76.5, cy: 47.1, w: 5.0 },
        { img: "assets/skills/vibe-2.webp",  cx: 71.1, cy: 54.3, w: 4.5 },
        { img: "assets/skills/robot-ai.webp", cx: 76.6, cy: 56.1, w: 4.4 }
      ] },
    { id: "founder",            tier: "unlock", n: 7, avatar: "assets/avatars/founder.webp",
      d: { cx: 48.0, bottom: 16.5, h: 18.0 }, m: { cx: 48.2, bottom: 27.65, h: 12.75 },
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
        role: "**La mia formazione parte dalla scena: teatro, cinema, radio e una laurea in Arti e Scienze dello Spettacolo. Questa radice performativa continua a influenzare il modo in cui parlo, insegno, presento e progetto esperienze pensate per essere capite, ricordate e sentite.**",
        challenges: [
          "Formazione in **Storytelling & Performing Arts alla Scuola Holden**, con percorso di acting con Gabriele Vacis.",
          "Esperienze in teatro, cinema, cortometraggi, spot, radio e opera lirica.",
          "Autore e speaker di **\"The Turiner\"** per Radio MBun;",
          "Autore di **\"(S)Talkin' to me?\"**, finalista al Premio Riccione Pier Vittorio Tondelli 2013."
        ],
        skills: ["**Public speaking**", "**Presenza scenica**", "**Voce e ritmo**", "**Scrittura performativa**", "**Gestione dell'attenzione**", "**Drammaturgia**"],
        links: [
          { label: "CV Attore & Speaker", kind: "pdf", dl: "actorIt" },
          { label: "Showreel / video selezionati", kind: "video", href: "https://www.youtube.com/watch?v=BMj9e3N5IOQ", ready: true }
        ],
        image: "assets/popup-images/actor-speaker.jpg",
        imageNote: ""
      },

      "copywriter": {
        name: "Copywriter",
        role: "Uso la scrittura per chiarire idee, posizionare progetti e costruire voci riconoscibili. Ho lavorato su copywriting, transcreation, brand voice, manifesti, cataloghi, siti, contenuti editoriali e progetti di comunicazione. Per me scrivere significa capire il mondo dietro un prodotto, un'azienda o un progetto e trovare le parole e i mezzi giusti per raccontarlo.",
        challenges: [
          "Copy e transcreation per clienti internazionali tramite **Copywriter Collective**, tra cui Google, Manfrotto, Amazon e Coin Excelsior.",
          "Testi, payoff e manifesti per **This Is Ideal** e altri progetti di brand communication.",
          "Direzione del gruppo copy per i testi del programma **MATERA 2019 CAPITALE EUROPEA DELLA CULTURA**;",
          "Collaborazioni con **Eggers 2.0**, Weevo e Scuola Holden."
        ],
        skills: ["**Copywriting**", "**Transcreation**", "**Brand voice**", "**Manifesto writing**", "**Content strategy**", "**Struttura editoriale**", "**Naming e payoff**"],
        links: [
          { label: "CV Creative & Copywriter", kind: "pdf", dl: "copyIt" }
        ],
        image: "assets/popup-images/copywriter.png",
        imageNote: ""
      },

      "tech-addicted": {
        name: "Tech Addicted",
        role: "**La tecnologia è sempre stata parte del mio modo di esplorare e costruire. Ho studiato coding, game design e strumenti digitali per esprimere le mie idee attraverso forme e linguaggi sempre nuovi. Software, AI e workflow tecnici sono diventati estensioni del mio processo creativo.**",
        challenges: [
          "Android Basics Nanodegree by Google/Udacity, con basi di programmazione Java.",
          "Attestato Game Designer — percorso Young Talent In Action / Manpower.",
          "Corsi di Python, C# e sviluppo minigames."
        ],
        skills: ["**Coding**", "**Gamification**", "**Ux design**", "**Android/Java basics**"],
        links: [
          { label: "Android Basics Nanodegree by Google", kind: "web", href: "downloads/Android Basics Nanodegree by Google.png", ready: true }
        ],
        image: "assets/popup-images/tech-addicted.gif",
        imageNote: ""
      },

      "trainer-coach": {
        name: "Trainer & Coach",
        role: "Dopo il diploma alla Scuola Holden, ho progettato e condotto percorsi su storytelling, comunicazione e public speaking, oltre a insegnamenti sperimentali come \"Instabilità\" e \"Plotting\". Per me insegnare significa disegnare esperienze memorabili, capaci di trasmettere informazioni ed emozioni.",
        challenges: [
          "Docente per **Scuola Holden** in Storytelling & Comunicazione per professionisti e aziende.",
          "Instructional designer con **Alessandro Baricco** per i corsi di \"Plotting\" e \"Instabilità\" di Scuola Holden.",
          "Digital & Learning Strategist per Chora Academy di **Chora Media**.",
          "Coaching di comunicazione e public speaking per professionisti, team e aziende."
        ],
        skills: ["**Storytelling**", "**Public speaking**", "**Instructional design**", "**Comunicazione efficace**", "**Pensiero Laterale**"],
        links: [
          { label: "CV Trainer & Coach", kind: "pdf", dl: "trainerIt" }
        ],
        image: "assets/popup-images/trainer-coach.jpg",
        imageNote: "Foto aula/workshop, lavagna Storytelling Communication Public Speaking, slide o contesto formativo"
      },

      "freelance-creative": {
        name: "Freelance Creative",
        role: "**Come creativo lavoro tra concept, narrazione, produzione e project management, soprattutto su progetti che non appartengono a una sola categoria. Individuo il loro universo narrativo e lo trasformo in identità, format ed esperienze capaci di coinvolgere ed emozionare.**",
        challenges: [
          "**Sami Around The World** — ideazione, direzione creativa, project management, comunicazione, raccolta fondi, sponsor, sito, social e format video. Un progetto di viaggio di tre amici per abbattere limiti e barriere fisici e mentali all'insegna del Paradventuring, terminato con la fiaccola olimpica di **Milano Cortina 2026**.",
          "**Scuola Verna** — posizionamento, manifesto, identità narrativa e concept del sito immersivo.",
          "Progetti di brand storytelling, format e comunicazione integrata per aziende, scuole e realtà culturali."
        ],
        skills: ["**Creative direction**", "**Project design**", "**Narrative strategy**", "**Brand storytelling**", "**Format development**", "**Fundraising**"],
        links: [
          { label: "Sami Around The World – Slideshow finale", kind: "video", href: "https://www.youtube.com/watch?v=I7uEfQPBzQI", ready: true },
          { label: "Sami Around The World – Scheda Progetto", kind: "pdf", dl: "samiProject" },
          { label: "Sami Around The World – Il racconto", kind: "video", href: "https://www.youtube.com/watch?v=ok-uibfgJqI&t=1s", ready: true }
        ],
        image: "assets/popup-images/freelance-creative.jpg",
        imageNote: "Immagine Sami Around The World, screenshot Scuola Verna, moodboard o collage progetti"
      },

      "vibe-coder": {
        name: "Vibe Coder",
        role: "Uso codice, AI tool e workflow tecnici per costruire progetti che altrimenti resterebbero idee. So scrivere specifiche, guidare scelte tecniche, testare, correggere e usare strumenti di sviluppo assistito dall'AI per creare siti, plugin, tool e esperienze interattive funzionanti.",
        challenges: [
          "**Virtòó** — software desktop che migliora lezioni, webinar e presentazioni online attraverso regia automatica e scenari virtuali.",
          "**Plugin OBS Background Removal** — plugin per rimuovere lo sfondo della webcam tramite elaborazione software, senza green screen.",
          "Creazione e sviluppo di **giuliafilippone.com** e **questo CV interattivo** — modi creativi per raccontarsi online."
        ],
        skills: ["**AI-assisted development**", "**Product prototyping**", "**Version Control**"],
        links: [
          { label: "GitHub – Background Removal", kind: "web", href: "", ready: false },
          { label: "giuliafilippone.com", kind: "web", href: "https://giuliafilippone.com", ready: true },
          
        ],
        image: "assets/popup-images/vibe-coder.png",
        imageNote: "Screenshot Virtòó, GitHub, OBS plugin, codice/interfaccia, sito giuliafilippone.com o dashboard CV"
      },

      "founder": {
        name: "Founder",
        role: "**Virtòó è un software creato in vibe coding che si propone di rivoluzionare lezioni, webinar e presentazioni online grazie a scenari immersivi e regia automatica. Nasce dall'unione delle mie competenze in performance, comunicazione, storytelling e tecnologia ed è il progetto di startup in cui sono attualmente impegnato.**",
        challenges: [
          "Sviluppo di un software desktop stand-alone con integrazione di dipendenze, driver e flussi audio-video, dalla prototipazione all'hardening.",
          "Percorso imprenditoriale e di validazione: target, pricing, offerta commerciale, test utenti, pitch e business model.",
          "Percorso ESCP \"From zero to Startup\": sviluppo dell'approccio imprenditoriale, posizionamento e strumenti per trasformare il prodotto in una proposta di mercato."
        ],
        skills: ["**Product vision**", "**Business model design**", "**Pitching**", "**Go-to-market**", "**Market validation**", "**Creative entrepreneurship**"],
        links: [
          { label: "Virtòó – Demo", kind: "video", href: "https://youtu.be/YYjLBOxgwNY", ready: true },
          { label: "Virtòó – Spot", kind: "video", href: "https://youtu.be/ICgZiA20YP8?si=psfSJ0y4LdeICYTX", ready: true },
          { label: "ESCP – From zero to Startup", kind: "web", href: "downloads/ESCP - From zero to Startup.jfif", ready: true }
        ],
        image: "assets/popup-images/founder.jpg",
        imageNote: "Mockup Virtòó, screenshot prodotto, immagine pitch/deck, logo o visual startup"
      }
    },

    /* ────────────────────────────── ENGLISH ────────────────────────────
       Bozza di traduzione: rivedere prima della versione finale.        */
    en: {
      "actor-speaker": {
        name: "Actor & Speaker",
        role: "**My training began on stage: theatre, cinema, radio and a degree in Performing Arts and Sciences. This performance background continues to influence the way I speak, teach, present and design experiences intended to be understood, remembered and felt.**",
        challenges: [
          "Training in **Storytelling & Performing Arts at Scuola Holden**, including acting training with Gabriele Vacis.",
          "Experience in theatre, film, short films, commercials, radio and opera.",
          "Writer and host of **\"The Turiner\"** for Radio MBun;",
          "Writer of **\"(S)Talkin' to me?\"**, finalist for the 2013 Premio Riccione Pier Vittorio Tondelli."
        ],
        skills: ["**Public speaking**", "**Stage presence**", "**Voice and rhythm**", "**Performance writing**", "**Attention management**", "**Dramaturgy**"],
        links: [
          { label: "CV Actor & Speaker", kind: "pdf", dl: "actorEn" },
          { label: "Showreel / selected videos", kind: "video", href: "https://www.youtube.com/watch?v=BMj9e3N5IOQ", ready: true }
        ],
        image: "assets/popup-images/actor-speaker.jpg",
        imageNote: ""
      },

      "copywriter": {
        name: "Copywriter",
        role: "I use writing to clarify ideas, position projects and build distinctive voices. I have worked on copywriting, transcreation, brand voice, manifestos, catalogues, websites, editorial content and communication projects. To me, writing means understanding the world behind a product, a company or a project and finding the right words and media to tell its story.",
        challenges: [
          "Copywriting and transcreation for international clients through **Copywriter Collective**, including Google, Manfrotto, Amazon and Coin Excelsior.",
          "Copy, taglines and manifestos for **This Is Ideal** and other brand communication projects.",
          "Led the copy team for the **MATERA 2019 EUROPEAN CAPITAL OF CULTURE** programme;",
          "Collaborations with **Eggers 2.0**, Weevo and Scuola Holden."
        ],
        skills: ["**Copywriting**", "**Transcreation**", "**Brand voice**", "**Manifesto writing**", "**Content strategy**", "**Editorial structure**", "**Naming and taglines**"],
        links: [
          { label: "CV Creative & Copywriter", kind: "pdf", dl: "copyEn" }
        ],
        image: "assets/popup-images/copywriter.png",
        imageNote: ""
      },

      "tech-addicted": {
        name: "Tech Addicted",
        role: "**Technology has always been part of how I explore and build. I studied coding, game design and digital tools to express my ideas through ever-new forms and languages. Software, AI and technical workflows have become extensions of my creative process.**",
        challenges: [
          "Android Basics Nanodegree by Google/Udacity, with Java programming foundations.",
          "Game Designer certificate — Young Talent In Action / Manpower programme.",
          "Courses in Python, C# and minigame development."
        ],
        skills: ["**Coding**", "**Gamification**", "**UX design**", "**Android/Java basics**"],
        links: [
          { label: "Android Basics Nanodegree by Google", kind: "web", href: "downloads/Android Basics Nanodegree by Google.png", ready: true }
        ],
        image: "assets/popup-images/tech-addicted.gif",
        imageNote: ""
      },

      "trainer-coach": {
        name: "Trainer & Coach",
        role: "After graduating from Scuola Holden, I designed and delivered programmes on storytelling, communication and public speaking, as well as experimental courses such as \"Instabilità\" and \"Plotting\". To me, teaching means designing memorable experiences capable of conveying information and emotions.",
        challenges: [
          "Lecturer at **Scuola Holden** in Storytelling & Communication for professionals and companies.",
          "Instructional designer with **Alessandro Baricco** for Scuola Holden's \"Plotting\" and \"Instabilità\" courses.",
          "Digital & Learning Strategist for Chora Academy at **Chora Media**.",
          "Communication and public speaking coaching for professionals, teams and companies."
        ],
        skills: ["**Storytelling**", "**Public speaking**", "**Instructional design**", "**Effective communication**", "**Lateral thinking**"],
        links: [
          { label: "CV Trainer & Coach", kind: "pdf", dl: "trainerEn" }
        ],
        image: "assets/popup-images/trainer-coach.jpg",
        imageNote: "Photo from a classroom/workshop, Storytelling Communication Public Speaking board, slide or training setting"
      },

      "freelance-creative": {
        name: "Freelance Creative",
        role: "**As a creative, I work across concept development, storytelling, production and project management, especially on projects that do not fit into a single category. I identify their narrative universe and turn it into identities, formats and experiences capable of engaging and moving people.**",
        challenges: [
          "**Sami Around The World** — concept, creative direction, project management, communication, fundraising, sponsors, website, social media and video formats. A journey by three friends to break physical and mental limits through Paradventuring, ending with the Olympic torch of **Milano Cortina 2026**.",
          "**Scuola Verna** — positioning, manifesto, narrative identity and immersive website concept.",
          "Brand storytelling, formats and integrated communication for companies, schools and cultural organisations."
        ],
        skills: ["**Creative direction**", "**Project design**", "**Narrative strategy**", "**Brand storytelling**", "**Format development**", "**Fundraising**"],
        links: [
          { label: "Sami Around The World – Final slideshow", kind: "video", href: "https://www.youtube.com/watch?v=I7uEfQPBzQI", ready: true },
          { label: "Sami Around The World – Project sheet", kind: "pdf", dl: "samiProject" },
          { label: "Sami Around The World – The story", kind: "video", href: "https://www.youtube.com/watch?v=ok-uibfgJqI&t=1s", ready: true }
        ],
        image: "assets/popup-images/freelance-creative.jpg",
        imageNote: "Sami Around The World image, Scuola Verna screenshot, moodboard or project collage"
      },

      "vibe-coder": {
        name: "Vibe Coder",
        role: "I use code, AI tools and technical workflows to build projects that would otherwise remain ideas. I can write specifications, guide technical decisions, test, debug and use AI-assisted development tools to create functional websites, plugins, tools and interactive experiences.",
        challenges: [
          "**Virtòó** — desktop software that improves online lessons, webinars and presentations through automated direction and virtual environments.",
          "**OBS Background Removal Plugin** — a plugin that removes webcam backgrounds through software processing, without a green screen.",
          "Creation and development of **giuliafilippone.com** and **this interactive CV** — creative ways to present oneself online."
        ],
        skills: ["**AI-assisted development**", "**Product prototyping**", "**Version Control**"],
        links: [
          { label: "GitHub – Background Removal", kind: "web", href: "", ready: false },
          { label: "giuliafilippone.com", kind: "web", href: "https://giuliafilippone.com", ready: true },
          
        ],
        image: "assets/popup-images/vibe-coder.png",
        imageNote: "Virtòó screenshot, GitHub, OBS plugin, code/interface, giuliafilippone.com website or CV dashboard"
      },

      "founder": {
        name: "Founder",
        role: "**Virtòó is a software product created through vibe coding that aims to revolutionise online lessons, webinars and presentations with immersive environments and automated direction. It brings together my skills in performance, communication, storytelling and technology, and it is the startup project I am currently working on.**",
        challenges: [
          "Development of a stand-alone desktop application integrating dependencies, drivers and audio-video workflows, from prototyping to hardening.",
          "Entrepreneurial and validation journey: target audience, pricing, commercial offering, user testing, pitching and business model.",
          "ESCP \"From zero to Startup\" programme: developing an entrepreneurial approach, positioning and tools to turn the product into a market offering."
        ],
        skills: ["**Product vision**", "**Business model design**", "**Pitching**", "**Go-to-market**", "**Market validation**", "**Creative entrepreneurship**"],
        links: [
          { label: "Virtòó – Demo", kind: "video", href: "https://youtu.be/YYjLBOxgwNY", ready: true },
          { label: "Virtòó – Spot", kind: "video", href: "https://youtu.be/ICgZiA20YP8?si=psfSJ0y4LdeICYTX", ready: true },
          { label: "ESCP – From zero to Startup", kind: "web", href: "downloads/ESCP - From zero to Startup.jfif", ready: true }
        ],
        image: "assets/popup-images/founder.jpg",
        imageNote: "Virtòó mockup, product screenshot, pitch/deck image, logo or startup visual"
      }
    }
  }
};
