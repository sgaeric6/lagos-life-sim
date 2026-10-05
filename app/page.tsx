"use client";

import { useMemo, useState } from "react";

type District = {
  name: string;
  vibe: string;
  wealth: string;
  tags: string[];
};

type Player = {
  name: string;
  status: string;
  mood: string;
  distance: string;
  action: string;
};

type Message = {
  user: string;
  text: string;
  time: string;
  tone: "mine" | "them";
};

const districts: District[] = [
  { name: "Victoria Island", vibe: "Corporate energy", wealth: "High net worth", tags: ["Finance", "Night life", "Beach"] },
  { name: "Lekki", vibe: "Luxury living", wealth: "Premium", tags: ["Residences", "Mall", "Yatch club"] },
  { name: "Ikoyi", vibe: "Elite district", wealth: "Affluent", tags: ["Schools", "Culture", "Events"] },
  { name: "Yaba", vibe: "Creative heartbeat", wealth: "Startup", tags: ["Campus", "Tech", "Coffee"] },
  { name: "Surulere", vibe: "Community living", wealth: "Balanced", tags: ["Market", "Transport", "Food"] },
  { name: "Ikeja", vibe: "Metro core", wealth: "Commercial", tags: ["Transit", "Offices", "Shopping"] },
];

const nearbyPlayers: Player[] = [
  { name: "Ada C.", status: "Nearby", mood: "Looking for a coffee meetup", distance: "0.4 km", action: "Chat" },
  { name: "Kunle B.", status: "At the gym", mood: "Freshly worked out", distance: "0.9 km", action: "Friend" },
  { name: "Zainab T.", status: "At the mall", mood: "Shopping & exploring", distance: "1.2 km", action: "Meet" },
];

const transportOptions = [
  { name: "Keke", duration: "12 min", price: "₦2,500", energy: "-5" },
  { name: "Taxi", duration: "9 min", price: "₦7,000", energy: "-4" },
  { name: "Bus", duration: "18 min", price: "₦1,500", energy: "-3" },
  { name: "Plane", duration: "38 min", price: "₦45,000", energy: "-8" },
];

const initialMessages: Message[] = [
  { user: "Ada", text: "You should come to the beach tonight. It’s popping.", time: "Now", tone: "them" },
  { user: "You", text: "I’m on my way. Need a quick workout first.", time: "1m ago", tone: "mine" },
  { user: "Kunle", text: "Let’s do a business meetup after work.", time: "3m ago", tone: "them" },
];

const betMarkets = [
  { label: "Match winner", odds: 2.4 },
  { label: "Daily hustle", odds: 1.9 },
  { label: "Beach meetup", odds: 3.1 },
  { label: "Property flip", odds: 4.2 },
];

export default function Home() {
  const [selectedDistrict, setSelectedDistrict] = useState(districts[0]);
  const [selectedTransport, setSelectedTransport] = useState(transportOptions[0]);
  const [betAmount, setBetAmount] = useState(25000);
  const [selectedOdds, setSelectedOdds] = useState(betMarkets[0]);
  const [messages, setMessages] = useState(initialMessages);
  const [chatInput, setChatInput] = useState("");

  const potentialWin = useMemo(() => Math.round(betAmount * selectedOdds.odds), [betAmount, selectedOdds]);

  const addMessage = () => {
    if (!chatInput.trim()) return;
    setMessages((prev) => [
      ...prev,
      { user: "You", text: chatInput.trim(), time: "Now", tone: "mine" },
    ]);
    setChatInput("");
  };

  return (
    <main className="min-h-screen bg-[#07131f] text-white">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <header className="mb-6 rounded-full border border-white/10 bg-white/5 px-5 py-3 backdrop-blur-xl">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 to-cyan-500 text-lg font-bold text-slate-950">
                L
              </div>
              <div>
                <p className="text-lg font-semibold">Lagos Life Sim</p>
                <p className="text-xs text-slate-300">Real-life city simulation</p>
              </div>
            </div>

            <nav className="hidden items-center gap-6 text-sm text-slate-200 md:flex">
              <a href="#explore">Explore</a>
              <a href="#social">Social</a>
              <a href="#economy">Economy</a>
              <a href="#bets">Bets</a>
            </nav>

            <div className="flex items-center gap-3">
              <div className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs text-emerald-300">
                Balance: ₦1,250,000
              </div>
              <button className="rounded-full bg-gradient-to-r from-emerald-400 to-cyan-400 px-4 py-2 text-sm font-semibold text-slate-950">
                Play now
              </button>
            </div>
          </div>
        </header>

        <section className="grid gap-6 lg:grid-cols-[1.35fr_0.65fr]">
          <div className="rounded-[32px] border border-emerald-400/30 bg-city-glow bg-[#0a1827] p-7 shadow-glow">
            <div className="mb-5 flex flex-wrap gap-2">
              <span className="rounded-full border border-emerald-400/35 bg-emerald-500/10 px-2.5 py-1 text-[10px] uppercase tracking-[0.2em] text-emerald-300">
                Welcome to Lagos
              </span>
              <span className="rounded-full border border-cyan-400/35 bg-cyan-500/10 px-2.5 py-1 text-[10px] uppercase tracking-[0.2em] text-cyan-300">
                Real-time multiplayer
              </span>
            </div>

            <h1 className="max-w-lg text-4xl font-black leading-tight sm:text-5xl">
              Build a life, meet people, and own the city.
            </h1>

            <p className="mt-4 max-w-xl text-base text-slate-300">
              Live as a resident in Lagos. Work, study, travel, flirt, build businesses, place smart bets, and grow your legacy across the city’s districts.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <button className="rounded-full bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 px-6 py-3 font-semibold text-slate-950 transition hover:scale-[1.02]">
                Create character
              </button>
              <button className="rounded-full border border-white/15 bg-white/5 px-6 py-3 font-semibold text-white transition hover:border-emerald-300/50 hover:bg-emerald-500/5">
                View map
              </button>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {[
                { label: "Players online", value: "12,840" },
                { label: "Areas unlocked", value: "18" },
                { label: "Empire value", value: "₦84.2M" },
              ].map((stat) => (
                <div key={stat.label} className="rounded-2xl border border-white/10 bg-slate-950/30 p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-400">{stat.label}</p>
                  <p className="mt-2 text-2xl font-bold">{stat.value}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="overflow-hidden rounded-[32px] border border-white/10 bg-gradient-to-b from-slate-900 to-slate-950">
            <div className="h-52 bg-[radial-gradient(circle_at_center,_rgba(59,130,246,0.4),_transparent_40%),linear-gradient(180deg,_rgba(10,88,102,0.8),_rgba(7,19,31,1))] p-4">
              <div className="flex h-full items-end justify-between">
                <div className="w-full">
                  <img src="/lagos-skyline.svg" alt="Lagos skyline" className="h-40 w-full object-cover opacity-90" />
                </div>
                <div className="absolute right-6 top-6 hidden h-24 w-24 rounded-full border border-emerald-300/60 bg-emerald-400/20 blur-sm md:block" />
              </div>
            </div>

            <div className="space-y-4 p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Current life</p>
                  <p className="mt-1 text-xl font-bold">Freelance designer</p>
                </div>
                <span className="rounded-full bg-emerald-500/10 px-2.5 py-1 text-xs text-emerald-300">+₦24k / day</span>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
                  <p className="text-xs text-slate-400">Energy</p>
                  <p className="mt-2 text-xl font-bold text-amber-300">82%</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
                  <p className="text-xs text-slate-400">Health</p>
                  <p className="mt-2 text-xl font-bold text-rose-300">91%</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="explore" className="mt-8 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-[30px] border border-white/10 bg-slate-900/80 p-5">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-slate-400">City map</p>
                <h2 className="mt-1 text-2xl font-bold">Explore Lagos</h2>
              </div>
              <button className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-slate-200">
                Travel history
              </button>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
              {districts.map((district) => (
                <button
                  key={district.name}
                  onClick={() => setSelectedDistrict(district)}
                  className={`cursor-pointer rounded-2xl border p-4 text-left transition ${
                    selectedDistrict.name === district.name
                      ? "border-emerald-400/60 bg-emerald-500/10 shadow-glow"
                      : "border-white/10 bg-slate-950/40 hover:border-white/20"
                  }`}
                >
                  <p className="text-lg font-semibold">{district.name}</p>
                  <p className="mt-2 text-sm text-slate-300">{district.vibe}</p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {district.tags.map((tag) => (
                      <span key={tag} className="rounded-full bg-slate-800 px-2 py-1 text-[10px] tracking-wide text-slate-200">
                        {tag}
                      </span>
                    ))}
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-[30px] border border-white/10 bg-slate-900/80 p-5">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Travel</p>
            <h3 className="mt-1 text-2xl font-bold">Select destination</h3>

            <div className="mt-5 rounded-2xl border border-emerald-400/30 bg-emerald-500/10 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-emerald-100/80">Destination</p>
                  <p className="mt-2 text-xl font-bold">{selectedDistrict.name}</p>
                </div>
                <span className="rounded-full bg-slate-950/40 px-2 py-1 text-xs text-emerald-200">{selectedDistrict.wealth}</span>
              </div>
            </div>

            <div className="mt-5 space-y-3">
              {transportOptions.map((option) => (
                <button
                  key={option.name}
                  onClick={() => setSelectedTransport(option)}
                  className={`flex w-full items-center justify-between rounded-2xl border p-3 text-left transition ${
                    selectedTransport.name === option.name
                      ? "border-cyan-400/60 bg-cyan-500/10"
                      : "border-white/10 bg-slate-950/40 hover:border-white/20"
                  }`}
                >
                  <div>
                    <p className="font-semibold">{option.name}</p>
                    <p className="text-sm text-slate-400">{option.duration}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-emerald-200">{option.price}</p>
                    <p className="text-xs text-slate-400">energy {option.energy}</p>
                  </div>
                </button>
              ))}
            </div>

            <button className="mt-5 w-full rounded-full bg-gradient-to-r from-cyan-400 to-emerald-400 px-4 py-3 font-semibold text-slate-950">
              Travel to {selectedDistrict.name}
            </button>
          </div>
        </section>

        <section id="economy" className="mt-8 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-[30px] border border-white/10 bg-slate-900/80 p-5">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Life systems</p>
            <h3 className="mt-1 text-2xl font-bold">Run your daily life</h3>

            <div className="mt-5 space-y-3">
              {[
                { name: "Work", value: "Graphic design", amount: "+₦34,000" },
                { name: "Study", value: "Business admin", amount: "School fee: ₦80k" },
                { name: "Property", value: "2-bedroom flat", amount: "Value: ₦10.5M" },
                { name: "Business", value: "Cafe branch", amount: "+₦58,000" },
              ].map((entry) => (
                <div key={entry.name} className="flex items-center justify-between rounded-2xl border border-white/10 bg-slate-950/40 p-3">
                  <div>
                    <p className="font-semibold">{entry.name}</p>
                    <p className="text-sm text-slate-400">{entry.value}</p>
                  </div>
                  <span className="rounded-full bg-emerald-500/10 px-2 py-1 text-xs text-emerald-300">{entry.amount}</span>
                </div>
              ))}
            </div>
          </div>

          <div id="bets" className="rounded-[30px] border border-amber-400/30 bg-gradient-to-br from-amber-500/10 via-slate-900 to-slate-950 p-5">
            <p className="text-xs uppercase tracking-[0.2em] text-amber-200/80">Betting & stakes</p>
            <h3 className="mt-1 text-2xl font-bold">Stake your money</h3>

            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {betMarkets.map((market) => (
                <button
                  key={market.label}
                  onClick={() => setSelectedOdds(market)}
                  className={`rounded-2xl border p-3 text-left transition ${
                    selectedOdds.label === market.label
                      ? "border-amber-300 bg-amber-500/10"
                      : "border-white/10 bg-slate-950/40 hover:border-white/20"
                  }`}
                >
                  <p className="text-sm text-slate-300">{market.label}</p>
                  <p className="mt-2 text-2xl font-bold text-amber-200">{market.odds.toFixed(1)}x</p>
                </button>
              ))}
            </div>

            <div className="mt-5 rounded-2xl border border-white/10 bg-slate-950/60 p-4">
              <div className="flex items-center justify-between">
                <label className="text-sm text-slate-300">Stake amount</label>
                <span className="text-xs uppercase tracking-[0.2em] text-amber-200">Cash</span>
              </div>

              <div className="mt-3 flex items-center gap-3">
                <input
                  type="number"
                  value={betAmount}
                  onChange={(e) => setBetAmount(Number(e.target.value) || 0)}
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-lg font-semibold text-white outline-none"
                />
                <span className="text-sm text-slate-300">₦</span>
              </div>

              <div className="mt-4 flex items-center justify-between rounded-xl bg-amber-500/10 px-3 py-2 text-sm text-amber-100">
                <span>Potential win</span>
                <span className="font-bold">₦{potentialWin.toLocaleString()}</span>
              </div>

              <button className="mt-4 w-full rounded-full bg-gradient-to-r from-amber-300 to-orange-400 px-4 py-3 font-semibold text-slate-950">
                Place bet
              </button>
            </div>
          </div>
        </section>

        <section id="social" className="mt-8 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-[30px] border border-white/10 bg-slate-900/80 p-5">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Nearby players</p>
            <h3 className="mt-1 text-2xl font-bold">Meet new people</h3>

            <div className="mt-5 space-y-3">
              {nearbyPlayers.map((player) => (
                <div key={player.name} className="flex items-center justify-between rounded-2xl border border-white/10 bg-slate-950/40 p-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-pink-400 to-violet-500 font-bold text-white">
                      {player.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-semibold">{player.name}</p>
                      <p className="text-xs text-slate-400">{player.status} • {player.distance}</p>
                    </div>
                  </div>
                  <button className="rounded-full border border-emerald-400/40 bg-emerald-500/10 px-3 py-1.5 text-xs font-semibold text-emerald-200">
                    {player.action}
                  </button>
                </div>
              ))}
            </div>

            <div className="mt-5 rounded-2xl border border-pink-400/30 bg-pink-500/10 p-4">
              <p className="text-sm text-pink-100">Relationship vibe</p>
              <div className="mt-3 flex gap-2">
                {['Wave', 'Flirt', 'Kiss', 'Gift', 'Invite'].map((action) => (
                  <button key={action} className="rounded-full border border-pink-300/30 bg-white/5 px-3 py-1.5 text-xs text-pink-100">
                    {action}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="rounded-[30px] border border-white/10 bg-slate-900/80 p-5">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Live chat</p>
                <h3 className="mt-1 text-2xl font-bold">City conversations</h3>
              </div>
              <button className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-slate-200">
                Upload image
              </button>
            </div>

            <div className="space-y-3 rounded-2xl border border-white/10 bg-slate-950/40 p-3">
              {messages.map((message, index) => (
                <div key={`${message.user}-${index}`} className={`flex ${message.tone === "mine" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[80%] rounded-2xl px-3 py-2 ${message.tone === "mine" ? "bg-emerald-500/15 text-emerald-100" : "bg-slate-800 text-slate-100"}`}>
                    <p className="mb-1 text-[10px] uppercase tracking-[0.2em] text-slate-300">{message.user} • {message.time}</p>
                    <p>{message.text}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 flex gap-2">
              <input
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="Send a message to the city..."
                className="flex-1 rounded-full border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-400"
              />
              <button onClick={addMessage} className="rounded-full bg-gradient-to-r from-emerald-400 to-cyan-400 px-5 py-3 font-semibold text-slate-950">
                Send
              </button>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
