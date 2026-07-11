/* =====================================================================
   LIFE IS A GAME — script.js
   Rendering data-driven: hotspot ruoli, popup/dossier, deep-link hash,
   language switch IT/EN. I contenuti stanno in data.js — non qui.
   ===================================================================== */
(function () {
  "use strict";

  var D = window.LIAG;
  if (!D) return;

  /* ---- layout desktop/mobile: classe sul body (testabile e robusta) */
  var FORCE = null;
  try { FORCE = new URLSearchParams(location.search).get("layout"); } catch (e) {}
  var mql = window.matchMedia("(orientation: portrait), (max-width: 820px)");
  function applyLayout() {
    var m = FORCE === "m" ? true : FORCE === "d" ? false : mql.matches;
    document.body.classList.toggle("layout-m", m);
    /* Render only the avatar variant used by the active breakpoint. */
    if (document.getElementById("roles") && lang) {
      renderRoles();
      renderSigns();
    }
  }
  if (mql.addEventListener) mql.addEventListener("change", applyLayout);
  else if (mql.addListener) mql.addListener(applyLayout);
  applyLayout();

  var LS_KEY = "liag-lang";
  var QUERY_LANG = null;
  var PDF_MODE = false;
  try {
    var query = new URLSearchParams(location.search);
    QUERY_LANG = query.get("lang");
    PDF_MODE = query.get("pdf") === "1";
  } catch (e) {}
  if (PDF_MODE) document.body.classList.add("pdf-mode");
  var lang = (function () {
    if (QUERY_LANG === "it" || QUERY_LANG === "en") return QUERY_LANG;
    try { var s = localStorage.getItem(LS_KEY); if (s === "it" || s === "en") return s; } catch (e) {}
    return D.defaultLang || "it";
  })();

  var openId = null;      /* ruolo attualmente aperto nel popup */
  var lastFocus = null;
  var closeTimer = null;  /* timeout che nasconde il modal a fine transizione */

  /* ------------------------------------------------ helpers ------- */
  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  }
  function rich(s) {
    return esc(s).replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
  }
  function plain(s) {
    return esc(String(s == null ? "" : s).replace(/\*\*/g, ""));
  }
  function dossierMedia(c) {
    if (c.media && c.media.type === "youtube") {
      return '<iframe class="dimage__video" src="' + esc(c.media.src) +
        '" title="' + esc(c.media.title || c.name) +
        '" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>';
    }
    return '<img class="dimage__img" src="' + esc(c.image) + '" alt="' + esc(c.name) + '" tabindex="0" role="button" aria-label="Ingrandisci immagine" onerror="this.closest(\'.dimage\').classList.add(\'is-empty\')" />';
  }
  function ui() { return D.ui[lang]; }
  function roleContent(id) { return (D.content[lang] || {})[id]; }
  function roleMeta(id) {
    for (var i = 0; i < D.roles.length; i++) if (D.roles[i].id === id) return D.roles[i];
    return null;
  }

  /* ------------------------------------------------ ruoli --------- */
  function renderRoles() {
    var wrap = document.getElementById("roles");
    wrap.innerHTML = "";
    D.roles.forEach(function (r) {
      var c = roleContent(r.id) || { name: r.id };
      var btn = document.createElement("button");
      btn.type = "button";
      btn.className = "role role--" + r.tier + (r.id === "founder" ? " role--founder" : "");
      btn.setAttribute("data-role", r.id);
      btn.setAttribute("aria-haspopup", "dialog");
      btn.setAttribute("aria-label", ui().openRole + ": " + c.name);
      btn.style.cssText =
        "--dcx:" + r.d.cx + "%;--db:" + r.d.bottom + "%;--dh:" + r.d.h + "cqh;" +
        "--mcx:" + r.m.cx + "%;--mb:" + r.m.bottom + "%;--mh:" + r.m.h + "cqh;";
      var isMobile = document.body.classList.contains("layout-m");
      var avatar = isMobile && r.mAvatar ? r.mAvatar : r.avatar;
      var imgs = '<img class="role__img' + (isMobile && r.mAvatar ? ' role__img--m' : '') +
        '" src="' + esc(avatar) + '" alt="" draggable="false" />';
      btn.innerHTML = imgs;
      wrap.appendChild(btn);
    });
    renderLabels();
  }

  /* ---- etichette ruolo sul bordo del pavimento (fascia per fascia) */
  function renderLabels() {
    var wrap = document.getElementById("labels");
    if (!wrap) return;
    wrap.innerHTML = "";
    D.roles.forEach(function (r) {
      if (!r.label) return;                    /* founder: nessuna etichetta */
      var c = roleContent(r.id) || { name: r.id };
      var b = document.createElement("button");
      b.type = "button";
      b.className = "role-label role-label--" + r.tier;
      b.setAttribute("data-role", r.id);
      b.setAttribute("tabindex", "-1");        /* già focusabile via avatar */
      b.setAttribute("aria-hidden", "true");
      var lm = r.lm || r.label;
      b.style.cssText =
        "--lcx:" + r.label.cx + "%;--lcy:" + r.label.cy + "%;" +
        "--lmx:" + lm.cx + "%;--lmy:" + lm.cy + "%;";
      b.textContent = c.name;
      wrap.appendChild(b);
    });
  }

  /* ------------------------------------------------ signs (insegne) */
  function renderSigns() {
    var wrap = document.getElementById("signs");
    if (!wrap) return;
    wrap.innerHTML = "";
    if (document.body.classList.contains("layout-m")) return;
    D.roles.forEach(function (r) {
      if (!r.sign) return;
      var list = Array.isArray(r.sign) ? r.sign : [r.sign];
      var c = roleContent(r.id) || { name: r.id };
      list.forEach(function (sg) {
        var s = document.createElement("img");
        s.className = "sign sign--" + r.tier;
        s.src = sg.img;
        s.alt = "";
        s.setAttribute("draggable", "false");
        s.setAttribute("data-role", r.id);
        s.setAttribute("role", "button");
        s.setAttribute("tabindex", "0");
        s.setAttribute("aria-label", ui().openRole + ": " + c.name);
        s.addEventListener("keydown", function (e) {
          if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openDossier(r.id); }
        });
        s.style.cssText =
          "--scx:" + sg.cx + "%;--scy:" + sg.cy + "%;--sw:" + sg.w + "cqw;";
        wrap.appendChild(s);
      });
    });
  }

  /* ------------------------------------------------ column headers */
  function renderColumns() {
    var wrap = document.getElementById("cols");
    if (!wrap || !D.columns) return;
    wrap.innerHTML = "";
    D.columns.forEach(function (c) {
      var el = document.createElement("span");
      el.className = "col-head";
      el.textContent = c.label;
      el.style.cssText = "--ccx:" + c.cx + "%;";
      wrap.appendChild(el);
    });
  }

  /* ------------------------------------------------ socials ------- */
  function applyLinks() {
    var L = D.profile.links;
    var S = ui().socials;
    var map = { linkedin: L.linkedin, github: L.github, whatsapp: L.whatsapp, email: L.mail };
    document.querySelectorAll(".social").forEach(function (a) {
      var k = a.getAttribute("data-soc");
      var href = map[k] || "";
      a.setAttribute("aria-label", S[k] || k);
      a.title = S[k] || k;
      if (href) {
        a.setAttribute("href", href);
        a.classList.remove("is-off");
        a.removeAttribute("aria-disabled");
      } else {
        a.setAttribute("href", "#");
        a.classList.add("is-off");            /* placeholder: aggiungi il link in data.js */
        a.setAttribute("aria-disabled", "true");
      }
    });
    var dl = D.downloads.complete;
    var btn = document.getElementById("dossierBtn");
    if (PDF_MODE) {
      btn.href = "https://franappi.com";
      btn.removeAttribute("download");
      btn.classList.remove("is-off");
      document.getElementById("dossierLabel").textContent = "franappi.com";
      return;
    }
    if (dl.ready) {
      btn.setAttribute("href", dl.file);
      btn.setAttribute("download", "");
      btn.classList.remove("is-off");
      btn.removeAttribute("aria-disabled");
    } else {
      btn.setAttribute("href", "#");
      btn.removeAttribute("download");
      btn.classList.add("is-off");
      btn.setAttribute("aria-disabled", "true");
    }
    document.getElementById("dossierLabel").textContent = ui().fullDossier;
  }

  /* ------------------------------------------------ dossier ------- */
  function linkRow(l) {
    var isPdf = l.kind === "pdf";
    var dl = isPdf && l.dl ? D.downloads[l.dl] : null;
    var href = isPdf ? (dl ? dl.file : "") : (l.href || "");
    var ready = isPdf ? !!(dl && dl.ready) : !!l.ready;
    var glyph = isPdf ? "▼" : (l.kind === "video" ? "▶" : "↗");
    var tagTxt = ready ? (isPdf ? "PDF" : (l.kind === "video" ? "VIDEO" : "LINK")) : ui().comingSoon;

    if (!ready) {
      return '<span class="dlink is-off" role="link" aria-disabled="true">' +
        '<span class="dlink__glyph" aria-hidden="true">' + glyph + "</span>" +
        '<span class="dlink__label">' + esc(l.label) + "</span>" +
        '<span class="dlink__tag">' + esc(tagTxt) + "</span></span>";
    }
    return '<a class="dlink" href="' + esc(href) + '"' +
      (isPdf ? " download" : ' target="_blank" rel="noopener noreferrer"') + ">" +
      '<span class="dlink__glyph" aria-hidden="true">' + glyph + "</span>" +
      '<span class="dlink__label">' + esc(l.label) + "</span>" +
      '<span class="dlink__tag">' + esc(tagTxt) + "</span></a>";
  }

  function buildDossier(id) {
    var c = roleContent(id);
    var links = (c.links || []).map(linkRow).join("");
    return (
      '<div class="dossier__col dossier__col--txt">' +
        '<section class="dsec"><h3 class="dsec__h">Role</h3>' +
          '<p class="dsec__lead">' + plain(c.role) + "</p></section>" +
        '<section class="dsec"><h3 class="dsec__h">Main Challenges</h3>' +
          '<ul class="challenges">' +
            c.challenges.map(function (x) { return "<li>" + rich(x) + "</li>"; }).join("") +
          "</ul></section>" +
        '<section class="dsec"><h3 class="dsec__h">Unlocked Skills</h3>' +
          '<ul class="skills">' +
            c.skills.map(function (x) { return '<li class="skill">' + rich(x) + "</li>"; }).join("") +
          "</ul></section>" +
      "</div>" +
      '<div class="dossier__col dossier__col--side">' +
        '<figure class="dimage" id="dImage">' +
          dossierMedia(c) +
        "</figure>" +
        (links ? '<section class="dsec"><h3 class="dsec__h">Download &amp; Links</h3>' +
          '<div class="dlinks">' + links + "</div></section>" : "") +
      "</div>"
    );
  }

  function openDossier(id, viaHash) {
    var c = roleContent(id);
    var meta = roleMeta(id);
    if (!c || !meta) return;
    if (!openId) lastFocus = document.activeElement;
    openId = id;

    var t = D.tiers[meta.tier];
    document.getElementById("dTier").textContent = "TIER " + t.no + " · " + t.label;
    document.getElementById("dTitle").textContent = c.name;
    document.getElementById("dFile").textContent = "FILE " + meta.n + "/7";
    document.getElementById("dClose").setAttribute("aria-label", ui().close);
    document.getElementById("dBody").innerHTML = buildDossier(id);
    var zoomImg = document.querySelector("#dImage .dimage__img");
    if (zoomImg) {
      zoomImg.addEventListener("click", function (e) {
        e.stopPropagation();
        this.closest(".dimage").classList.toggle("is-zoomed");
      });
      zoomImg.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          this.closest(".dimage").classList.toggle("is-zoomed");
        }
      });
    }

    var modal = document.getElementById("modal");
    if (closeTimer) { window.clearTimeout(closeTimer); closeTimer = null; }
    if (modal.hidden) {
      modal.hidden = false;
      void modal.offsetWidth;               /* reflow -> transizione */
    }
    modal.classList.add("is-open");         /* sempre, anche in riapertura rapida */
    document.body.classList.add("has-modal");
    if (!viaHash) setHash(id);
    document.getElementById("dClose").focus();
  }

  function closeDossier(viaHash) {
    var modal = document.getElementById("modal");
    if (modal.hidden) return;
    openId = null;
    modal.classList.remove("is-open");
    document.body.classList.remove("has-modal");
    if (closeTimer) window.clearTimeout(closeTimer);
    closeTimer = window.setTimeout(function () {
      closeTimer = null;
      if (!openId) modal.hidden = true;
    }, 240);
    if (!viaHash) setHash("");
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }

  /* ------------------------------------------------ hash ---------- */
  function setHash(id) {
    if (id) {
      if (("#" + id) !== location.hash) location.hash = id;   /* onHashChange ignora se già aperto */
    } else if (history.replaceState) {
      history.replaceState(null, "", location.pathname + location.search);
    } else {
      location.hash = "";
    }
  }

  function onHashChange() {
    var h = (location.hash || "").replace("#", "");
    if (h && roleContent(h)) {
      if (h !== openId) openDossier(h, true);   /* niente doppia apertura */
    } else {
      closeDossier(true);
    }
  }

  /* ------------------------------------------------ lingua -------- */
  function setLang(next) {
    if (next !== "it" && next !== "en") return;
    lang = next;
    try { localStorage.setItem(LS_KEY, lang); } catch (e) {}
    document.documentElement.setAttribute("lang", lang);
    document.getElementById("langIt").classList.toggle("is-on", lang === "it");
    document.getElementById("langEn").classList.toggle("is-on", lang === "en");
    document.getElementById("langIt").setAttribute("aria-pressed", lang === "it" ? "true" : "false");
    document.getElementById("langEn").setAttribute("aria-pressed", lang === "en" ? "true" : "false");
    var lt = document.getElementById("langToggle");
    if (lt) {
      lt.textContent = lang === "it" ? "ENG" : "ITA";
      lt.style.backgroundImage = 'url("assets/ui/btn-' + (lang === "it" ? "eng" : "ita") + '.png")';
    }
    renderRoles();
    applyLinks();
    if (openId) openDossier(openId, true);   /* stesso ruolo, testi nuovi */
  }

  /* ------------------------------------------------ eventi -------- */
  document.addEventListener("click", function (e) {
    var image = e.target.closest(".dimage__img");
    if (image) { image.closest(".dimage").classList.toggle("is-zoomed"); return; }
    var r = e.target.closest("[data-role]");
    if (r) { e.preventDefault(); openDossier(r.getAttribute("data-role")); return; }
    if (e.target.closest("[data-close]")) { closeDossier(); return; }
    var off = e.target.closest(".is-off");
    if (off && off.getAttribute("href") === "#") e.preventDefault();
  });

  document.addEventListener("keydown", function (e) {
    var image = e.target.closest && e.target.closest(".dimage__img");
    if (image && (e.key === "Enter" || e.key === " ")) { e.preventDefault(); image.closest(".dimage").classList.toggle("is-zoomed"); return; }
    if (e.key === "Escape") {
      var zoomed = document.querySelector(".dimage.is-zoomed");
      if (zoomed) { zoomed.classList.remove("is-zoomed"); return; }
      closeDossier(); return;
    }
    /* mini focus-trap dentro il dialog */
    if (e.key === "Tab" && openId) {
      var panel = document.querySelector(".dossier");
      var f = panel.querySelectorAll("button, a[href]");
      if (!f.length) return;
      var first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });

  document.getElementById("langIt").addEventListener("click", function () { setLang("it"); });
  document.getElementById("langEn").addEventListener("click", function () { setLang("en"); });
  (function () {
    var lt = document.getElementById("langToggle");
    if (lt) lt.addEventListener("click", function () {
      setLang(document.documentElement.lang === "it" ? "en" : "it");
    });
  })();
  window.addEventListener("hashchange", onHashChange);

  /* ---- hamburger menu (solo mobile) ---- */
  (function () {
    var hb = document.getElementById("hamburger");
    var menu = document.getElementById("hmenu");
    if (!hb || !menu) return;
    function setOpen(open) {
      document.body.classList.toggle("menu-open", open);
      hb.setAttribute("aria-expanded", open ? "true" : "false");
    }
    hb.addEventListener("click", function (e) {
      e.stopPropagation();
      setOpen(!document.body.classList.contains("menu-open"));
    });
    /* chiudi cliccando fuori o premendo Esc; la scelta lingua chiude il menu */
    document.addEventListener("click", function (e) {
      if (!document.body.classList.contains("menu-open")) return;
      if (!menu.contains(e.target) && e.target !== hb) setOpen(false);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") setOpen(false);
    });
    menu.addEventListener("click", function (e) {
      if (e.target.closest(".lang__btn")) setOpen(false);
    });
  })();

  /* ------------------------------------------------ avvio --------- */
  document.getElementById("name").textContent = D.profile.name;
  document.querySelector(".payoff").textContent = D.profile.payoff;
  renderSigns();
  renderColumns();
  setLang(lang);
  onHashChange();   /* deep-link: #trainer-coach apre subito il dossier */
})();
