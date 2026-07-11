# Life Is A Game — CV interattivo di Francesco Nappi

Micro web app statica (vanilla HTML/CSS/JS, nessuna build, nessuna dipendenza).
La dashboard è un'interfaccia a layer: sfondo bitmap + nome, avatar, label,
bottoni e popup come veri elementi HTML posizionati sopra.

## Struttura

```
index.html      shell della pagina (header, hotspot container, popup, footer)
styles.css      tutti gli stili + coordinate CSS di socials/targhe/bottoni
script.js       rendering data-driven, popup, hash routing, language switch
data.js         ★ TUTTI I CONTENUTI: testi IT/EN, link, download, coordinate avatar
assets/
  backgrounds/  dashboard-desktop.png (16:9) · dashboard-mobile.png (verticale)
  avatars/      7 PNG dei ruoli
  popup-images/ immagini dei popup (vedi sotto — per ora placeholder)
downloads/      PDF scaricabili
uploads/        materiali sorgente originali (non usati dal sito)
```

## Dove modificare le cose (quasi sempre `data.js`)

| Cosa                      | Dove                                                    |
| ------------------------- | ------------------------------------------------------- |
| Testi popup IT / EN       | `data.js` → `LIAG.content.it` / `LIAG.content.en`       |
| Link social (footer)      | `data.js` → `LIAG.profile.links` — **TODO: GitHub URL** |
| PDF / download            | `data.js` → `LIAG.downloads` (vedi sotto)               |
| Posizione/misura avatar   | `data.js` → `LIAG.roles[n].d` / `.m` (`cx` centro %, `bottom` piedi dal fondo %, `h` altezza %) |
| Immagini popup            | metti il file in `assets/popup-images/` (vedi sotto)    |
| Nome / payoff             | `data.js` → `LIAG.profile`                              |

### Attivare un PDF
1. Copia il file in `downloads/` col nome già previsto, es.
   `downloads/francesco-nappi-trainer-coach.pdf`
2. In `data.js` metti `ready: true` sulla voce corrispondente di `LIAG.downloads`.
   Finché `ready: false` il bottone appare come "In preparazione".

Già attivo: `downloads/francesco-nappi-complete-cv.pdf` (CV completo).

### Immagini popup
Ogni popup cerca `assets/popup-images/<id-ruolo>.jpg`
(`actor-speaker.jpg`, `copywriter.jpg`, `tech-addicted.jpg`, `trainer-coach.jpg`,
`freelance-creative.jpg`, `vibe-coder.jpg`, `founder.jpg`).
Se il file non esiste appare automaticamente un placeholder con la nota di cosa
metterci. Basta aggiungere il file: nessun'altra modifica necessaria.

### Link nei popup
In `LIAG.content.<lingua>.<ruolo>.links`:
- `{ label, kind:"pdf", dl:"chiave-downloads" }` → bottone download
- `{ label, kind:"web"|"video", href:"https://…", ready:true }` → link esterno
- `ready:false` → bottone disabilitato "In preparazione"

## Deep link
Ogni ruolo ha un hash: `#actor-speaker`, `#copywriter`, `#tech-addicted`,
`#trainer-coach`, `#freelance-creative`, `#vibe-coder`, `#founder`.
Aprire l'URL con l'hash apre direttamente il dossier. ESC / click fuori chiude.

## Lingue
Switch IT/EN in alto a destra. La scelta è salvata nel browser
(`localStorage`). Le label ROLE / MAIN CHALLENGES / UNLOCKED SKILLS /
DOWNLOAD & LINKS restano in inglese per identità grafica.
I testi EN in `data.js` sono una **bozza di traduzione da rivedere**.

## Layout responsive
- Desktop / landscape: dashboard orizzontale, scalata per stare nel viewport.
- Portrait o viewport ≤ 820px (telefoni e tablet verticali): dashboard
  verticale a tutta larghezza. Il payoff su mobile è già dipinto nella grafica.
- Le coordinate degli avatar sono in % della dashboard: si regolano in
  `data.js` (`cx` = centro orizzontale, `bottom` = distanza dal fondo, `w` = larghezza).

## Note
- Footer: LinkedIn, Facebook, GitHub, Instagram come bottoni; l'email è
  testo cliccabile nella targa inferiore (desktop) / sotto i social (mobile).
- Il bottone GitHub è disattivato finché non inserisci l'URL in
  `LIAG.profile.links.github`.
- Il bottone "CV completo (PDF)" sta nella targa inferiore a destra
  (desktop) e sulla trave sotto il nome (mobile).
- Deploy: è un sito statico — basta servire la cartella (GitHub Pages, Netlify…).
