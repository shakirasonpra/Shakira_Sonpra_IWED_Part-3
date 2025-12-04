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

//contact form validation


document.getElementById("contactForm").addEventListener("submit", function(e) {
    e.preventDefault(); // stop form from submitting
    
    // get values
    const name = document.getElementById("contact_name").value.trim();
    const email = document.getElementById("contact_email").value.trim();
    const phone = document.getElementById("contact_phone").value.trim();
    const subject = document.getElementById("contactFeedback").value.trim();
    const message = document.getElementById("contact_message").value.trim();

    const error = document.getElementById("formError");
    const success = document.getElementById("formSuccess");

    error.innerHTML = "";
    success.innerHTML = "";

    // regex patterns
    const namePattern = /^[A-Za-z\s]+$/;
    const phonePattern = /^[0-9]{10,12}$/;
    const subjectPattern = /^[A-Za-z0-9\s]+$/;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // name validation
    if (!namePattern.test(name)) {
        error.innerHTML = "Please enter a valid name (letters only).";
        return;
    }

    // email validation
    if (!emailPattern.test(email)) {
        error.innerHTML = "Please enter a valid email address.";
        return;
    }

    // phone number validation
    if (!phonePattern.test(phone)) {
        error.innerHTML = "Cellphone number must be 10–12 digits.";
        return;
    }

    // subject validation
    if (!subjectPattern.test(subject)) {
        error.innerHTML = "Subject may only include letters, numbers and spaces.";
        return;
    }

    // message validation
    if (message.length < 10) {
        error.innerHTML = "Message must be at least 10 characters long.";
        return;
    }

    // SUCCESS
    success.innerHTML = "Form submitted successfully!";

  
});


//date and time 
function updateFooterDateTime() {
        const now = new Date();
        const date = now.toLocaleDateString('en-ZA');
        const time = now.toLocaleTimeString('en-ZA');
        document.getElementById("currentDateTime").innerHTML = `${date} | ${time}`;
    }

    setInterval(updateFooterDateTime, 1000);
    updateFooterDateTime();


