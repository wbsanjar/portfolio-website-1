// If you want to inject this CSS from JavaScript, use the following:
const style = document.createElement('style');
style.textContent = `
/* contact */
.contact-grid{display:grid; grid-template-columns:1fr 320px; gap:2rem}
.contact-form label{display:block; margin-bottom:10px}
.contact-form input, .contact-form textarea{
  width:100%;
  padding:10px;
  background:rgba(255,255,255,0.03);
  border:1px solid rgba(255,255,255,0.04);
  border-radius:8px;
  color:inherit;
  font-size:0.95rem;
}
.form-msg{margin-top:8px; color:var(--muted)}

/* footer */
.site-footer{padding:2rem 0; text-align:center; color:var(--muted); border-top:1px solid rgba(255,255,255,0.02);}

/* responsive */
@media (max-width:900px){
  .hero-inner{grid-template-columns:1fr; text-align:center}
  .about-grid{grid-template-columns:1fr}
  .contact-grid{grid-template-columns:1fr}
  .nav{display:none}
  .nav-toggle{display:block}
  .header-inner{gap:12px}
}

/* mobile nav open state (class toggled in JS) */
.nav-open .nav{display:block; position:absolute; top:64px; right:20px; background:rgba(2,6,23,0.9); padding:12px; border-radius:10px}
.nav-open .nav ul{flex-direction:column}
`;
document.head.appendChild(style);
// simple contact form client-side handler
  const form = document.getElementById('contact-form');
  const formMsg = document.getElementById('form-msg');

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const name = form.name.value.trim();
      const email = form.email.value.trim();
      const message = form.message.value.trim();

      // basic validation
      if (!name || !email || !message) {
        formMsg.textContent = 'Please fill out all fields.';
        formMsg.style.color = '#fca5a5';
        return;
      }
      if (!validateEmail(email)) {
        formMsg.textContent = 'Please enter a valid email address.';
        formMsg.style.color = '#fca5a5';
        return;
      }

      // fake "send" (for demo) — you would replace with fetch to your backend or email service
      formMsg.textContent = 'Sending...';
      formMsg.style.color = '#9aa7b2';

      setTimeout(() => {
        formMsg.textContent = 'Thanks — your message has been received (demo).';
        formMsg.style.color = '#7ee787';
        form.reset();
      }, 900);
    });
  }

function validateEmail(email) {
  // simple regex
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
const crewMembers = [
  { name: "Manthan", role: "CEO" },
  { name: "Bhawana", role: "Design Lead" },
  { name: "Himanshu", role: "Full Stack Developer" },
  { name: "krishna", role: "Marketing Head" },
  { name: "Nitya", role: "Project Manager" },
  { name: "Sanjar", role: "Content Strategist" }
];

const crewCards = document.querySelectorAll(".crew-card");
const crewDots = document.querySelectorAll(".crew-dot");
const crewName = document.querySelector(".crew-name");
const crewRole = document.querySelector(".crew-role");
const leftBtn = document.querySelector(".crew-left");
const rightBtn = document.querySelector(".crew-right");

let crewIndex = 0;
let crewAnimating = false;

function updateCrewCarousel(newIndex) {
  if (crewAnimating) return;
  crewAnimating = true;

  crewIndex = (newIndex + crewCards.length) % crewCards.length;

  crewCards.forEach((card, i) => {
    const offset = (i - crewIndex + crewCards.length) % crewCards.length;
    card.classList.remove("center", "left-1", "left-2", "right-1", "right-2", "hidden");

    if (offset === 0) card.classList.add("center");
    else if (offset === 1) card.classList.add("right-1");
    else if (offset === 2) card.classList.add("right-2");
    else if (offset === crewCards.length - 1) card.classList.add("left-1");
    else if (offset === crewCards.length - 2) card.classList.add("left-2");
    else card.classList.add("hidden");
  });

  crewDots.forEach((dot, i) => {
    dot.classList.toggle("active", i === crewIndex);
  });

  crewName.style.opacity = "0";
  crewRole.style.opacity = "0";

  setTimeout(() => {
    crewName.textContent = crewMembers[crewIndex].name;
    crewRole.textContent = crewMembers[crewIndex].role;
    crewName.style.opacity = "1";
    crewRole.style.opacity = "1";
  }, 300);

  setTimeout(() => {
    crewAnimating = false;
  }, 800);
}

leftBtn.addEventListener("click", () => updateCrewCarousel(crewIndex - 1));
rightBtn.addEventListener("click", () => updateCrewCarousel(crewIndex + 1));
crewDots.forEach((dot, i) => dot.addEventListener("click", () => updateCrewCarousel(i)));
crewCards.forEach((card, i) => card.addEventListener("click", () => updateCrewCarousel(i)));

document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft") updateCrewCarousel(crewIndex - 1);
  else if (e.key === "ArrowRight") updateCrewCarousel(crewIndex + 1);
});

let touchStart = 0;
let touchEnd = 0;

document.addEventListener("touchstart", (e) => {
  touchStart = e.changedTouches[0].screenX;
});
document.addEventListener("touchend", (e) => {
  touchEnd = e.changedTouches[0].screenX;
  const diff = touchStart - touchEnd;
  if (Math.abs(diff) > 50) {
    if (diff > 0) updateCrewCarousel(crewIndex + 1);
    else updateCrewCarousel(crewIndex - 1);
  }
});

updateCrewCarousel(0);
