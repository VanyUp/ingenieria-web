(() => {
  const API_URL = '/api/contactos/';

  const $ = id => document.getElementById(id);
  const qs = sel => document.querySelector(sel);

  const form = $('contactForm');
  const btn  = $('submitBtn');
  const msg  = $('formSuccess');

  // CSRF cookie
  function getCookie(name){
    const m = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)');
    return m ? m.pop() : '';
  }
  const csrftoken = getCookie('csrftoken');

  // Helpers de UI
  const setOK  = (id, text='') => {
    const group = $(id).closest('.field');
    group.classList.remove('is-err'); group.classList.add('is-ok');
    (qs(`#${id}Msg`)||{}).textContent = text;
  };
  const setErr = (id, text) => {
    const group = $(id).closest('.field');
    group.classList.remove('is-ok'); group.classList.add('is-err');
    (qs(`#${id}Msg`)||{}).textContent = text;
  };
  const clear  = (id) => {
    const g = $(id).closest('.field');
    g.classList.remove('is-ok','is-err');
    (qs(`#${id}Msg`)||{}).textContent = '';
  };

  // Reglas
  const isName  = v => /^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ' -]{2,80}$/.test(v);
  const isEmail = v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
  const isCelCO = v => /^3\d{9}$/.test(v);

  // Validación por campo (on input/blur)
  function validateField(id){
    const v = $(id).value.trim();
    switch(id){
      case 'name':      if(!isName(v))  return setErr(id,'Escribe tu nombre (mín. 2 letras).');  return setOK(id);
      case 'surname':   if(!isName(v))  return setErr(id,'Escribe tu apellido válido.');          return setOK(id);
      case 'email':     if(!isEmail(v)) return setErr(id,'Correo no válido.');                     return setOK(id);
      case 'celular':   if(!isCelCO(v)) return setErr(id,'Debe iniciar en 3 y tener 10 dígitos.'); return setOK(id);
      case 'message':   if(v.length<10) return setErr(id,'Cuéntame un poco más (≥10 caracteres).');return setOK(id);
    }
  }

  ['name','surname','email','celular','message'].forEach(id=>{
    $(id).addEventListener('input', () => validateField(id));
    $(id).addEventListener('blur',  () => validateField(id));
    $(id).addEventListener('focus', () => clear(id));
  });

  // Rate limit suave (5s)
  const canSubmit = () => Date.now() - +(localStorage.getItem('last_submit_ts')||0) > 5000;
  const markSubmit = () => localStorage.setItem('last_submit_ts', Date.now());

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    msg.textContent = '';

    // honeypot
    if(($('website')?.value||'').trim()!=='') return;

    // Validación final
    const ids = ['name','surname','email','celular','message'];
    ids.forEach(validateField);
    const hasErr = ids.some(id => $(id).closest('.field').classList.contains('is-err'));
    if(hasErr){ msg.textContent='❌ Revisa los campos marcados.'; msg.style.color='#f43f5e'; return; }

    if(!canSubmit()){ msg.textContent='⏱️ Espera unos segundos antes de reenviar.'; msg.style.color='#f43f5e'; return; }

    const payload = Object.fromEntries(new FormData(form).entries());
    btn.disabled = true; btn.textContent = 'Enviando…';

    try{
      const res = await fetch(API_URL,{
        method:'POST',
        headers:{'Content-Type':'application/json','X-CSRFToken':csrftoken},
        body: JSON.stringify({
          name: payload.name.trim(),
          surname: payload.surname.trim(),
          email: payload.email.trim().toLowerCase(),
          celular: payload.celular.trim(),
          message: payload.message.trim(),
        })
      });

      if(res.ok){
        markSubmit();
        msg.textContent = '✅ Mensaje enviado con éxito.';
        msg.style.color = '#22c55e';
        form.reset();
        ids.forEach(clear);
      }else{
        const data = await res.json().catch(()=>({}));
        msg.textContent = `Error ${res.status}: ${JSON.stringify(data)}`;
        msg.style.color = '#f43f5e';
      }
    }catch{
      msg.textContent = 'No hay conexión con el servidor.';
      msg.style.color = '#f43f5e';
    }finally{
      btn.disabled = false; btn.textContent = 'Enviar';
    }
  });
})();
