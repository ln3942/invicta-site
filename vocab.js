
(async function () {
  function el(id){ return document.getElementById(id); }

  function getParam(name){
    const u = new URL(window.location.href);
    return u.searchParams.get(name);
  }

  function parsePathId(){
    // Supports /vocabulary/<id> or /vocabulary/<id>/v/<n> via 404 redirect (see 404.html)
    return getParam("id");
  }

  function esc(s){
    return String(s).replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
  }

  function pretty(obj){
    return JSON.stringify(obj, null, 2);
  }

  async function loadIndex(){
    const res = await fetch("../data/vocabulary/index.json", {cache: "no-store"});
    if(!res.ok) return [];
    return await res.json();
  }

  async function loadRecord(id){
    const res = await fetch(`../data/vocabulary/${encodeURIComponent(id)}.json`, {cache: "no-store"});
    if(!res.ok) return null;
    return await res.json();
  }

  function renderIndex(list){
    const ul = el("vocab-index");
    if(!ul) return;
    ul.innerHTML = "";
    list.forEach(item => {
      const li = document.createElement("li");
      const a = document.createElement("a");
      a.href = `./?id=${encodeURIComponent(item["(ID)"])}`;
      a.textContent = `${item["(ID)"]} — ${item["(Type)"]}`;
      li.appendChild(a);
      ul.appendChild(li);
    });
  }

  function renderRecord(rec){
    const out = el("vocab-record");
    if(!out) return;
    out.innerHTML = "";
    if(!rec){
      out.innerHTML = `<div class="card"><p><strong>Not found.</strong> Try another ClosedVocabularyID.</p></div>`;
      return;
    }

    const title = `${rec["(ID)"]} — ${rec["(Type)"]}`;
    el("record-title").textContent = title;

    const blocks = [];

    function addBlock(label, value){
      blocks.push(`<h3>${esc(label)}</h3><pre><code>${esc(typeof value === "string" ? value : pretty(value))}</code></pre>`);
    }

    addBlock("(IRI)", rec["(IRI)"]);
    addBlock("(Type)", rec["(Type)"]);
    addBlock("(Version)", rec["(Version)"]);
    addBlock("(New)", rec["(New)"]);
    addBlock("(Review + Status)", rec["(Review + Status)"]);
    if(rec["(Source + Link)"]) addBlock("(Source + Link)", rec["(Source + Link)"]);
    if(rec["(Evidence + Link)"]) addBlock("(Evidence + Link)", rec["(Evidence + Link)"]);
    if(rec["(Atom + Count)"] != null) addBlock("(Atom + Count)", rec["(Atom + Count)"]);
    if(rec["(Atom + List)"]) addBlock("(Atom + List)", rec["(Atom + List)"]);
    if(rec["(SSM)"]) addBlock("(SSM)", rec["(SSM)"]);
    if(rec["(PUO + Left)"]) addBlock("(PUO + Left)", rec["(PUO + Left)"]);
    if(rec["(CWW + Right)"]) addBlock("(CWW + Right)", rec["(CWW + Right)"]);
    if(rec["(WFF + Level)"]) addBlock("(WFF + Level)", rec["(WFF + Level)"]);
    if(rec["(WFF + Link)"]) addBlock("(WFF + Link)", rec["(WFF + Link)"]);
    if(rec["(WFF + Text)"]) addBlock("(WFF + Text)", rec["(WFF + Text)"]);
    if(rec["(Sign)"]) addBlock("(Sign)", rec["(Sign)"]);

    out.innerHTML = `<div class="card">${blocks.join("\n")}</div>`;
  }

  // Index + resolve
  const list = await loadIndex();
  renderIndex(list);

  const id = parsePathId();
  if(id){
    if(el("id-input")) el("id-input").value = id;
    const rec = await loadRecord(id);
    renderRecord(rec);
  }else{
    // default: show first item if present
    if(list.length){
      const firstId = list[0]["(ID)"];
      if(el("id-input")) el("id-input").value = firstId;
      const rec = await loadRecord(firstId);
      renderRecord(rec);
    }
  }

  // Hook form submit if present
  const form = el("resolver-form");
  if(form){
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const val = (el("id-input").value || "").trim();
      if(!val) return;
      window.history.pushState({}, "", `./?id=${encodeURIComponent(val)}`);
      const rec = await loadRecord(val);
      renderRecord(rec);
    });
  }
})();
