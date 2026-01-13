(function(){
  const btns = document.querySelectorAll("[data-copy]");
  btns.forEach(btn=>{
    btn.addEventListener("click", async ()=>{
      const id = btn.getAttribute("data-copy");
      const el = document.getElementById(id);
      if(!el) return;
      const text = el.innerText;
      try{
        await navigator.clipboard.writeText(text);
        const old = btn.innerText;
        btn.innerText = "Copied";
        setTimeout(()=>btn.innerText=old, 900);
      }catch(e){
        // fallback
        const ta = document.createElement("textarea");
        ta.value = text;
        document.body.appendChild(ta);
        ta.select();
        document.execCommand("copy");
        document.body.removeChild(ta);
        const old = btn.innerText;
        btn.innerText = "Copied";
        setTimeout(()=>btn.innerText=old, 900);
      }
    });
  });
})();
