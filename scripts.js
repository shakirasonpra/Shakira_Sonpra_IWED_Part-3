// scripts.js - simple DOM helpers & validation for bakery site

document.addEventListener('DOMContentLoaded', () => {
  // Mobile nav toggle
  const toggle = document.querySelector('.menu-toggle');
  const mobile = document.querySelector('.mobile-nav');
  if(toggle){
    toggle.addEventListener('click', ()=> {
      if(mobile.style.display === 'block') mobile.style.display = 'none';
      else mobile.style.display = 'block';
    });
    document.addEventListener('click', (e)=>{
      if(!toggle.contains(e.target) && !mobile.contains(e.target)) mobile.style.display = 'none';
    });
  }

  // Modal / order popup
  const backdrop = document.querySelector('.modal-backdrop');
  const orderButtons = document.querySelectorAll('.order-btn-js');
  const closeBtns = document.querySelectorAll('.close-modal');
  const orderForm = document.getElementById('orderForm');

  orderButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const card = e.currentTarget.closest('.card');
      const title = card ? card.querySelector('h3').innerText : '';
      // prefill pastry
      const pastryInput = document.querySelector('#order_pastry');
      if(pastryInput) pastryInput.value = title;
      openModal();
    });
  });
  closeBtns.forEach(b => b.addEventListener('click', closeModal));
  if(backdrop) backdrop.addEventListener('click', (e) => { if(e.target === backdrop) closeModal(); });

  function openModal(){ if(backdrop) backdrop.style.display = 'flex'; }
  function closeModal(){ if(backdrop) backdrop.style.display = 'none'; resetOrderForm(); }

  function resetOrderForm(){
    if(orderForm){
      orderForm.reset();
      const feedback = document.getElementById('orderFeedback');
      if(feedback){ feedback.style.display='none'; feedback.innerText=''; }
    }
  }

  // Basic validation helpers
  function isValidEmail(email){
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }
  function isNotEmpty(val){ return val && val.trim().length>0; }

  // Order form submit
  if(orderForm){
    orderForm.addEventListener('submit', (ev) => {
      ev.preventDefault();
      const name = document.getElementById('order_name').value;
      const email = document.getElementById('order_email').value;
      const phone = document.getElementById('order_phone').value;
      const qty = parseInt(document.getElementById('order_qty').value || '0', 10);
      const pastry = document.getElementById('order_pastry').value;
      const notes = document.getElementById('order_notes').value;

      let errors = [];
      if(!isNotEmpty(name)) errors.push('Please enter your full name.');
      if(!isValidEmail(email)) errors.push('Enter a valid email.');
      if(!isNotEmpty(phone) || phone.replace(/\D/g,'').length < 8) errors.push('Enter a valid phone number.');
      if(!qty || qty < 1) errors.push('Quantity must be 1 or more.');
      if(!isNotEmpty(pastry)) errors.push('Select a pastry.');

      const feedback = document.getElementById('orderFeedback');
      if(errors.length){
        if(feedback){ feedback.style.display='block'; feedback.innerHTML = '<strong>Errors:</strong><br>' + errors.map(e => `• ${e}`).join('<br>'); feedback.style.color='crimson'; }
        return;
      }

      // Simulate success (replace with AJAX or form action to send to server)
      if(feedback){ feedback.style.display='block'; feedback.innerHTML = 'Thanks! Your order request has been received. We will contact you to confirm payment & delivery.'; feedback.style.color='green'; }
      orderForm.reset();
      setTimeout(()=> closeModal(), 2000);
    });
  }

  // Contact form validation
  const contactForm = document.getElementById('contactForm');
  if(contactForm){
    contactForm.addEventListener('submit', ev => {
      ev.preventDefault();
      const name = document.getElementById('contact_name').value;
      const email = document.getElementById('contact_email').value;
      const msg = document.getElementById('contact_message').value;
      const phone = document.getElementById('contact_phone').value;
      const fdbk = document.getElementById('contactFeedback');

      let errs = [];
      if(!isNotEmpty(name)) errs.push('Name is required.');
      if(!isValidEmail(email)) errs.push('Valid email required.');
      if(!isNotEmpty(msg) || msg.trim().length < 10) errs.push('Message must be at least 10 characters.');
      if (phone.replace(/\D/g, '').length !== 10 || phone.replace(/\D/g, '')[0] !== '0') errs.push('Phone must be 10 digits, start with 0, and contain numbers only.');

      if(errs.length){
        fdbk.style.display='block'; fdbk.style.color='crimson';
        fdbk.innerHTML = '<strong>Errors:</strong><br>' + errs.map(e => `• ${e}`).join('<br>');
        return;
      }

      fdbk.style.display='block'; fdbk.style.color='green';
      fdbk.innerHTML = 'Thanks — we received your message and will reply shortly.';
      contactForm.reset();
    });
  }

});


//for the time display
function updateFooterDateTime() {
        const now = new Date();
        const date = now.toLocaleDateString('en-ZA');
        const time = now.toLocaleTimeString('en-ZA');
        document.getElementById("currentDateTime").innerHTML = `${date} | ${time}`;
    }

    setInterval(updateFooterDateTime, 1000);
    updateFooterDateTime();
