const y=document.getElementById('year'); if(y) y.textContent=new Date().getFullYear();
const menuToggle=document.querySelector('.menu-toggle'); const navLinks=document.querySelector('.nav-links');
if(menuToggle&&navLinks){menuToggle.addEventListener('click',()=>{const o=navLinks.classList.toggle('open');menuToggle.setAttribute('aria-expanded',String(o));});}
const openModal=document.querySelector('[data-open-modal]');const modal=document.querySelector('[data-modal]');const closeModal=document.querySelector('[data-close-modal]');
if(openModal&&modal){openModal.addEventListener('click',()=>modal.hidden=false);} if(closeModal&&modal){closeModal.addEventListener('click',()=>modal.hidden=true);}
document.querySelectorAll('[data-prompt]').forEach(c=>c.addEventListener('click',()=>{const i=document.querySelector('#chatInput'); if(i){i.value=c.textContent.trim(); i.focus();}}));
