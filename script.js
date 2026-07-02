// ===== Footer year =====
document.getElementById('year').textContent = new Date().getFullYear();

// ===== Mobile nav toggle =====
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', isOpen);
});

document.querySelectorAll('[data-nav]').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

// ===== Active nav link on scroll =====
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a[data-nav]');

const highlightNav = () => {
  let currentId = '';
  const scrollPos = window.scrollY + 120;

  sections.forEach(section => {
    if (scrollPos >= section.offsetTop) {
      currentId = section.id;
    }
  });

  navAnchors.forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === `#${currentId}`);
  });
};

window.addEventListener('scroll', highlightNav, { passive: true });
highlightNav();

// ===== Back to top button =====
const toTop = document.getElementById('toTop');
window.addEventListener('scroll', () => {
  toTop.classList.toggle('visible', window.scrollY > 600);
}, { passive: true });

toTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ===== Scroll reveal =====
const revealTargets = document.querySelectorAll(
  '.edu-card, .tl-card, .project-card, .cert-row, .skill-block, .standing-row, .podium-step'
);
revealTargets.forEach(el => el.classList.add('reveal'));

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealTargets.forEach(el => observer.observe(el));

// ===== Header shadow on scroll =====
const header = document.getElementById('siteHeader');
window.addEventListener('scroll', () => {
  header.style.boxShadow = window.scrollY > 10 ? '0 8px 24px rgba(0,0,0,0.4)' : 'none';
}, { passive: true });

// ===== F1 Gantry Start Lights & Sound Animation =====
const gantryCols = document.querySelectorAll('.f1-gantry .gantry-col');
const gantryLabel = document.getElementById('gantryLabel');
const introLoader = document.getElementById('introLoader');
const launchBtn = document.getElementById('launchBtn');

// Web Audio Synth for F1 Start Beeps
let audioCtx = null;
function playBeep(frequency, duration) {
  try {
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    const osc = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();
    
    osc.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    
    osc.type = 'sine';
    osc.frequency.setValueAtTime(frequency, audioCtx.currentTime);
    
    // Smooth volume envelope to prevent clicking sound
    gainNode.gain.setValueAtTime(0.01, audioCtx.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.15, audioCtx.currentTime + 0.02);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + duration);
    
    osc.start(audioCtx.currentTime);
    osc.stop(audioCtx.currentTime + duration);
  } catch (e) {
    console.error("Audio playback error:", e);
  }
}

if (launchBtn && gantryCols.length > 0) {
  launchBtn.addEventListener('click', () => {
    // Hide the button
    launchBtn.classList.add('fade-out');
    
    // Initialize audio context on user gesture
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    
    // Light up columns one by one + play beeps
    gantryCols.forEach((col, idx) => {
      setTimeout(() => {
        col.classList.add('red-light');
        if (gantryLabel) {
          gantryLabel.textContent = `RED LIGHTS ${idx + 1}...`;
        }
        playBeep(600, 0.15); // play low pitch F1 starting beep
      }, idx * 1000); // 1000ms intervals for start lights
    });

    // After all 5 are on, set status to standby
    setTimeout(() => {
      if (gantryLabel) {
        gantryLabel.textContent = "STANDBY...";
      }
    }, 4500);

    // Turn all lights out and play "LIGHTS OUT" (launch!)
    setTimeout(() => {
      gantryCols.forEach(col => {
        col.classList.remove('red-light');
        col.classList.add('green-light'); // flash green for launch!
      });
      if (gantryLabel) {
        gantryLabel.textContent = "LIGHTS OUT AND AWAY WE GO!";
        gantryLabel.classList.add('launch');
      }
      
      // Play high buzzer launch sound!
      playBeep(1000, 0.4);
      
      // Trigger main content fade-in and loader fade-out
      document.body.classList.add('race-active');
      if (introLoader) {
        introLoader.classList.add('fade-out');
      }
      
      // Add speed/flash effect to hero title
      const heroTitle = document.querySelector('.hero-title');
      if (heroTitle) {
        heroTitle.classList.add('launch-flash');
      }
    }, 6000); // 1.5s hold after 5 red lights

    // Turn off green lights and completely remove loader from DOM
    setTimeout(() => {
      gantryCols.forEach(col => {
        col.classList.remove('green-light');
      });
      if (introLoader) {
        introLoader.style.display = 'none';
      }
    }, 7500);
  });
}

// ===== F1 RPM LED Scroll Indicator =====
const rpmBar = document.createElement('div');
rpmBar.className = 'rpm-led-bar';
rpmBar.id = 'rpmBar';
const headerWrap = document.querySelector('.site-header');
if (headerWrap) {
  headerWrap.appendChild(rpmBar);
}

// Generate 20 LED dots: 5 green, 5 yellow, 5 red, 5 blue
const ledColors = [
  ...Array(5).fill('green'),
  ...Array(5).fill('yellow'),
  ...Array(5).fill('red'),
  ...Array(5).fill('blue')
];

ledColors.forEach(color => {
  const led = document.createElement('span');
  led.className = `led led-${color}`;
  rpmBar.appendChild(led);
});

const leds = rpmBar.querySelectorAll('.led');

window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const scrollPercent = docHeight > 0 ? scrollTop / docHeight : 0;
  
  // Map scrollPercent (0 to 1) to number of active LEDs (0 to 20)
  const activeCount = Math.floor(scrollPercent * (leds.length + 1));
  
  leds.forEach((led, idx) => {
    if (idx < activeCount) {
      led.classList.add('active');
    } else {
      led.classList.remove('active');
    }
  });

  // If we reach the very bottom, make all LEDs flash (shift point!)
  if (scrollPercent >= 0.98) {
    rpmBar.classList.add('shift-now');
  } else {
    rpmBar.classList.remove('shift-now');
  }
}, { passive: true });
