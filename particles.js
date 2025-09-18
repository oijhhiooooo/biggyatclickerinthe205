
const MAX_PARTICLES = 200; // Limit of particles on screen
let activeParticles = []; // Store active particles

function spawnParticles(event) {
        const count = 20
const xOrigin = event.clientX;
const yOrigin = event.clientY;

for (let i = 0; i < count; i++) { // Number of particles per click
          if (activeParticles.length >= MAX_PARTICLES) {
            const oldestParticle = activeParticles.shift(); // Remove oldest particle
oldestParticle.remove();
          }

const particle = document.createElement("div");
particle.classList.add("particle");

// Random direction and distance
const angle = (i/count) * 2 * Math.PI;
const distance = Math.random() * 30 + 90;
const x = Math.cos(angle) * distance;
const y = Math.sin(angle) * distance;

// Set position
particle.style.left = `${xOrigin}px`;
particle.style.top = `${yOrigin}px`;
particle.style.setProperty("--x", `${x}px`);
particle.style.setProperty("--y", `${y}px`);

document.body.appendChild(particle);
activeParticles.push(particle);

          // Remove particle after animation
          setTimeout(() => {
  particle.remove();
activeParticles.shift(); // Remove from list
          }, 600);
        }
      }


function triggerAchievement() {
  const achievement = document.getElementById("achievement");

  // Add class to show animation
  achievement.classList.add("show");

  // Remove class after animation ends
  setTimeout(() => {
    achievement.classList.remove("show");
  }, 400);
}