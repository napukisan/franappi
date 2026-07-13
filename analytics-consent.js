(function () {
  "use strict";
  var ID = "G-PZLCC228KM", KEY = "franappi_analytics_consent_v1", MONTHS = 182 * 86400000;
  var state = null, ready = false, sent = {};
  window.dataLayer = window.dataLayer || [];
  function gtag(){ window.dataLayer.push(arguments); }
  gtag("consent", "default", { analytics_storage:"denied", ad_storage:"denied", ad_user_data:"denied", ad_personalization:"denied" });
  function load() {
    if (ready) return;
    ready = true; gtag("consent", "update", { analytics_storage:"granted", ad_storage:"denied", ad_user_data:"denied", ad_personalization:"denied" });
    var s = document.createElement("script"); s.async = true; s.src = "https://www.googletagmanager.com/gtag/js?id=" + ID; document.head.appendChild(s);
    gtag("js", new Date()); gtag("config", ID, { send_page_view:true, allow_google_signals:false, allow_ad_personalization_signals:false });
  }
  function save(status) { state = { status:status, timestamp:Date.now(), version:1 }; try { localStorage.setItem(KEY, JSON.stringify(state)); } catch(e) {} }
  function valid() { try { state = JSON.parse(localStorage.getItem(KEY)); } catch(e) { state = null; } return state && (state.status === "accepted" || state.status === "denied") && Date.now()-state.timestamp < MONTHS; }
  function text(it, en) { return document.documentElement.lang === "en" ? en : it; }
  function removeCookies() { ["_ga", "_ga_" + ID.slice(2)].forEach(function(n){ document.cookie = n+"=; Max-Age=0; path=/"; document.cookie = n+"=; Max-Age=0; path=/; domain=.franappi.com"; }); }
  function close() { var b=document.getElementById("analytics-banner"); if(b) b.hidden=true; }
  function choose(status) { save(status); if(status === "accepted") load(); else { gtag("consent","update",{analytics_storage:"denied",ad_storage:"denied",ad_user_data:"denied",ad_personalization:"denied"}); removeCookies(); } close(); }
  function revoke() { choose("denied"); window.location.reload(); }
  function banner() { var b=document.createElement("aside"); b.id="analytics-banner"; b.className="analytics-banner"; b.setAttribute("role","dialog"); b.setAttribute("aria-labelledby","analytics-title"); b.innerHTML='<div><h2 id="analytics-title">'+text("Statistiche del sito","Website analytics")+'</h2><p>'+text("Con il tuo consenso utilizziamo Google Analytics per capire come viene utilizzato il sito e migliorarlo. Il sito funziona anche senza accettare.","With your consent, we use Google Analytics to understand how the site is used and improve it. The website works normally even if you decline.")+'</p><a href="privacy.html">'+text("Privacy e cookie","Privacy and cookies")+'</a></div><div class="analytics-actions"><button type="button" data-analytics="deny">'+text("Rifiuta","Decline")+'</button><button type="button" data-analytics="accept">'+text("Accetta statistiche","Accept analytics")+'</button><button type="button" data-analytics="revoke">'+text("Revoca","Withdraw")+'</button></div>'; document.body.appendChild(b); b.addEventListener("click",function(e){var a=e.target.getAttribute("data-analytics"); if(a === "revoke") revoke(); else if(a) choose(a === "accept" ? "accepted":"denied");}); }
  function prefs() { var b=document.getElementById("analytics-banner"); if(!b){ banner(); b=document.getElementById("analytics-banner"); } b.hidden=false; }
  window.frAnalytics = { track:function(name, params){ if(state && state.status === "accepted" && ready && typeof window.gtag === "function") window.gtag("event",name,params||{}); } };
  window.gtag = gtag;
  document.addEventListener("click", function(e){ var p=e.target.closest("[data-analytics-preferences]"); if(p){e.preventDefault(); prefs();} var a=e.target.closest("a[href]"); if(!a)return; var type=a.getAttribute("data-contact-type") || ({linkedin:"linkedin",github:"github",whatsapp:"whatsapp"}[Object.keys({linkedin:1,github:1,whatsapp:1}).find(function(k){return (a.href||"").indexOf(k) >= 0;})]); if(type) window.frAnalytics.track("contact_click",{contact_type:type}); if(a.classList.contains("profile-link")) window.frAnalytics.track("profile_link_click",{profile_language:a.getAttribute("data-lang")}); if(a.hasAttribute("download")) window.frAnalytics.track("cv_download",{document_id:a.getAttribute("data-analytics-document")||a.getAttribute("href"),language:document.documentElement.lang}); });
  document.addEventListener("DOMContentLoaded", function(){ if(valid()){ if(state.status === "accepted") load(); } else banner(); var c=document.createElement("a"); c.href="#"; c.className="analytics-preferences"; c.setAttribute("data-analytics-preferences","1"); c.textContent=text("Privacy e cookie","Privacy and cookies"); document.body.appendChild(c); });
  window.addEventListener("beforeunload", function(){});
  window.frAnalytics.revoke = revoke;
})();
