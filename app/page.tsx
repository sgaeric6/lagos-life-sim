@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  color-scheme: dark;
}

html {
  scroll-behavior: smooth;
}

body {
  margin: 0;
  min-height: 100vh;
  background:
    radial-gradient(circle at top, rgba(34, 197, 94, 0.18), transparent 25%),
    radial-gradient(circle at bottom, rgba(14, 165, 233, 0.18), transparent 30%),
    #07131f;
  font-family: Arial, Helvetica, sans-serif;
}

* {
  box-sizing: border-box;
}

button,
input {
  font: inherit;
}

img {
  display: block;
  max-width: 100%;
}

::selection {
  background: rgba(16, 185, 129, 0.4);
}

.game-shell {
  background-image: radial-gradient(circle at top, rgba(45, 212, 191, 0.14), transparent 20%), radial-gradient(circle at right, rgba(59, 130, 246, 0.12), transparent 35%);
}

.panel {
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: rgba(15, 23, 42, 0.8);
  border-radius: 30px;
  box-shadow: 0 18px 40px rgba(2, 6, 23, 0.45);
}

.hero-panel {
  border-color: rgba(45, 212, 191, 0.3);
  background: radial-gradient(circle at top, rgba(16, 185, 129, 0.08), rgba(15, 23, 42, 0.88));
}

.logo-mark {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: linear-gradient(135deg, #34d399, #22d3ee);
  color: #05131f;
  font-size: 1.25rem;
  font-weight: 900;
  box-shadow: 0 0 30px rgba(45, 212, 191, 0.55);
}

.primary-button,
.secondary-button,
.ghost-button,
.nav-button {
  transition: 0.2s ease;
}

.primary-button {
  border-radius: 9999px;
  background: linear-gradient(135deg, #34d399, #22d3ee);
  color: #07131f;
  padding: 0.8rem 1.4rem;
  font-weight: 800;
  box-shadow: 0 0 30px rgba(45, 212, 191, 0.35);
}

.primary-button:hover,
.secondary-button:hover,
.ghost-button:hover,
.nav-button:hover {
  transform: translateY(-1px);
}

.primary-button.small {
  padding: 0.6rem 1rem;
  font-size: 0.8rem;
}

.secondary-button {
  border: 1px solid rgba(255, 255, 255, 0.12);
  background: rgba(255, 255, 255, 0.04);
  color: rgb(255, 255, 255);
  border-radius: 9999px;
  padding: 0.8rem 1.4rem;
  font-weight: 700;
}

.ghost-button {
  border: 1px solid rgba(255, 255, 255, 0.12);
  background: rgba(255, 255, 255, 0.04);
  color: rgb(255, 255, 255);
  border-radius: 9999px;
  padding: 0.5rem 0.9rem;
  font-size: 0.72rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.nav-button {
  color: rgba(255, 255, 255, 0.8);
  background: transparent;
  border: none;
  padding: 0.2rem 0.1rem;
}

.pill {
  border-radius: 9999px;
  border: 1px solid rgba(45, 212, 191, 0.35);
  background: rgba(16, 185, 129, 0.1);
  color: rgba(153, 246, 228, 1);
  padding: 0.42rem 0.8rem;
  font-size: 0.7rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
}

.pill.soft {
  border-color: rgba(96, 165, 250, 0.3);
  background: rgba(59, 130, 246, 0.08);
  color: rgba(191, 219, 254, 1);
}

.pill.success {
  border-color: rgba(52, 211, 153, 0.35);
  background: rgba(52, 211, 153, 0.08);
  color: rgba(167, 243, 208, 1);
  letter-spacing: 0.08em;
  text-transform: none;
}

.eyebrow {
  font-size: 0.68rem;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: rgba(148, 163, 184, 1);
}

.section-title {
  margin-top: 0.25rem;
  font-size: clamp(1.5rem, 2vw, 2rem);
  font-weight: 800;
}

.section-title.small {
  font-size: clamp(1.2rem, 1.6vw, 1.8rem);
}

.district-tile,
.district-card {
  border-radius: 1.2rem;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: rgba(2, 6, 23, 0.35);
  padding: 1rem;
  text-align: left;
  color: white;
  transition: 0.2s ease;
}

.district-tile.active,
.district-card.active,
.transport-row.active,
.bet-card.active {
  border-color: rgba(45, 212, 191, 0.6);
  background: rgba(16, 185, 129, 0.08);
  box-shadow: 0 0 25px rgba(45, 212, 191, 0.18);
}

.transport-row {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 1rem;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: rgba(2, 6, 23, 0.35);
  padding: 0.85rem 1rem;
  text-align: left;
  color: white;
  transition: 0.2s ease;
}

.bet-card {
  border-radius: 1.2rem;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: rgba(2, 6, 23, 0.4);
  padding: 0.9rem 1rem;
  text-align: left;
  color: white;
  transition: 0.2s ease;
}

.chip {
  display: inline-flex;
  align-items: center;
  border-radius: 9999px;
  background: rgba(148, 163, 184, 0.12);
  color: rgba(226, 232, 240, 1);
  padding: 0.3rem 0.55rem;
  font-size: 0.62rem;
  line-height: 1;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.chip.soft {
  background: rgba(14, 165, 233, 0.1);
  color: rgba(191, 219, 254, 1);
}

.chip.success {
  background: rgba(16, 185, 129, 0.12);
  color: rgba(187, 247, 208, 1);
}

.character-scene {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 170px;
  margin-top: 10px;
  border-radius: 22px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: linear-gradient(180deg, rgba(14, 116, 144, 0.28), rgba(2, 6, 23, 0.7));
  overflow: hidden;
}

.character-scene.large {
  height: 260px;
}

.character-scene::before {
  content: "";
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at center, rgba(45, 212, 191, 0.18), transparent 38%);
}

.character-avatar {
  position: relative;
  width: 130px;
  height: 130px;
  animation: floatCharacter 2.8s ease-in-out infinite;
}

.character-head {
  position: absolute;
  left: 50%;
  top: 10px;
  width: 46px;
  height: 46px;
  transform: translateX(-50%);
  border-radius: 50%;
  background: linear-gradient(180deg, #f7d2ab, #ddab7d);
  box-shadow: inset 0 -4px 8px rgba(0, 0, 0, 0.12);
}

.character-body {
  position: absolute;
  left: 50%;
  top: 54px;
  width: 58px;
  height: 54px;
  transform: translateX(-50%);
  border-radius: 18px 18px 12px 12px;
  background: linear-gradient(180deg, #1fd6b2, #0c8a9e);
  box-shadow: 0 12px 25px rgba(16, 185, 129, 0.32);
}

.character-arm,
.character-leg {
  position: absolute;
  background: linear-gradient(180deg, #f2c79b, #dca266);
  border-radius: 999px;
}

.character-arm-left {
  left: 26px;
  top: 58px;
  width: 12px;
  height: 42px;
  transform: rotate(22deg);
}

.character-arm-right {
  right: 26px;
  top: 58px;
  width: 12px;
  height: 42px;
  transform: rotate(-22deg);
}

.character-leg-left {
  left: 44px;
  top: 102px;
  width: 14px;
  height: 34px;
}

.character-leg-right {
  right: 44px;
  top: 102px;
  width: 14px;
  height: 34px;
}

.kiss-burst {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  margin-top: 18px;
  height: 45px;
  font-size: 24px;
  animation: burstUp 1.1s ease-out forwards;
}

.kiss-burst span {
  display: inline-block;
  animation: pop 0.7s ease-out both;
}

.kiss-burst span:nth-child(2) {
  animation-delay: 0.12s;
}

.kiss-burst span:nth-child(3) {
  animation-delay: 0.22s;
}

.city-map-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 0.9rem;
}

@keyframes floatCharacter {
  0%,
  100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-8px);
  }
}

@keyframes burstUp {
  0% {
    opacity: 0;
    transform: translateY(12px) scale(0.8);
  }
  20% {
    opacity: 1;
  }
  100% {
    opacity: 0;
    transform: translateY(-20px) scale(1.1);
  }
}

@keyframes pop {
  0% {
    transform: scale(0.5) translateY(10px);
  }
  60% {
    transform: scale(1.3) translateY(-8px);
  }
  100% {
    transform: scale(1) translateY(0);
  }
}

@media (max-width: 768px) {
  .pill {
    letter-spacing: 0.08em;
  }
}

