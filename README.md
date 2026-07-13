# Life Is A Game — CV interattivo di Francesco Nappi

Sito statico pubblico: <https://franappi.com/>. La dashboard presenta sette ruoli professionali in modalità desktop e mobile, con popup, collegamenti e contenuti bilingui.

## Tecnologia e struttura

Il progetto usa HTML, CSS e JavaScript vanilla, senza build o dipendenze runtime.

- `index.html`: dashboard, popup, navigazione e consenso.
- `styles.css`, `profile.css`, `analytics-consent.css`: stile della dashboard e delle pagine testuali.
- `script.js`: rendering, responsive behavior, popup e deep link.
- `data.js`: contenuti IT/EN, ruoli, immagini, social e download.
- `profilo.html`, `profile.html`: pagine SEO testuali indicizzabili.
- `privacy.html`, `privacy-en.html`: privacy e cookie.
- `assets/`: immagini attive e relative sorgenti PNG conservate intenzionalmente.
- `downloads/`: PDF e documenti collegati dal sito.
- `sitemap.xml`, `robots.txt`, `CNAME`: SEO e configurazione GitHub Pages.

## Funzioni

La dashboard è responsive: desktop/landscape usa il layout orizzontale, mobile/portrait quello verticale. I popup sono disponibili in italiano e inglese, supportano deep link tramite hash e si chiudono con `Esc` o clic sul backdrop. I contenuti si aggiornano in `data.js`; le pagine SEO e privacy hanno versioni IT/EN. Analytics è Google Analytics 4 con consenso esplicito, rifiuto e riapertura delle preferenze.

## Sviluppo locale

Servire la cartella con un server HTTP, ad esempio:

```bash
python -m http.server 8000
```

Poi aprire `http://localhost:8000/`. Un server HTTP è necessario per verificare correttamente percorsi, moduli e asset.

## Aggiornamento di contenuti e immagini

Modificare testi, link e stato dei download in `data.js`. Per aggiornare un’immagine, mantenere i percorsi usati da `data.js`, sostituire l’asset WebP attivo e conservare il PNG sorgente per futuri aggiornamenti. Verificare sempre entrambe le lingue e i layout responsive.

## Deploy e rollback

Il deploy avviene tramite GitHub Pages dal branch configurato su GitHub; `CNAME` mantiene il dominio personalizzato `franappi.com` e HTTPS. Per un rollback, individuare il commit stabile con `git log`, creare un branch dal commit desiderato e pubblicarlo secondo la procedura del repository: non riscrivere la cronologia condivisa.

I PNG sorgente, le immagini ad alta risoluzione e i materiali di progetto sono conservati intenzionalmente quando possono essere utili per futuri aggiornamenti.
