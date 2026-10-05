"use client";

import { useState, useEffect } from "react";
import { io } from "socket.io-client";

const SOCKET_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

type Screen = "auth" | "dashboard" | "creator" | "map" | "social" | "properties" | "businesses" | "3d-map";

interface Player {
  id: number;
  username: string;
  display_name: string;
  balance: number;
  energy: number;
  health: number;
  reputation: number;
  current_district: string;
}

interface AuthData {
  token?: string;
  player?: Player;
}

export default function GameApp() {
  const [screen, setScreen] = useState<Screen>("auth");
  const [authData, setAuthData] = useState<AuthData>({});
  const [socket, setSocket] = useState<any>(null);
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ email: "", password: "", username: "", display_name: "" });
  const [error, setError] = useState("");
  const [chatMessages, setChatMessages] = useState<any[]>([]);
  const [selectedRoom, setSelectedRoom] = useState("victoria-island");

  // Initialize Socket.io
  useEffect(() => {
    const newSocket = io(SOCKET_URL);
    setSocket(newSocket);

    newSocket.on("chat:message", (message) => {
      setChatMessages((prev) => [...prev, message].slice(-50));
    });

    return () => {
      newSocket.disconnect();
    };
  }, []);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const endpoint = isLogin ? "/api/auth/login" : "/api/auth/register";
      const payload = isLogin ? { email: formData.email, password: formData.password } : formData;

      const res = await fetch(`http://localhost:4000${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      setAuthData({ token: data.token, player: data.player });
      setScreen("dashboard");

      if (socket) {
        socket.emit("join-room", { roomName: selectedRoom, playerId: data.player.id });
      }
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleSendMessage = (text: string) => {
    if (socket && authData.player) {
      socket.emit("chat:send", {
        roomName: selectedRoom,
        playerId: authData.player.id,
        playerName: authData.player.display_name,
        text,
      });
    }
  };

  const handleSocialAction = (action: string) => {
    if (socket && authData.player) {
      socket.emit("social:action", {
        roomName: selectedRoom,
        action,
        fromPlayerName: authData.player.display_name,
        targetPlayerId: 2,
      });
    }
  };

  // AUTH SCREEN
  if (screen === "auth") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="rounded-3xl border border-emerald-400/30 bg-slate-900/80 backdrop-blur-xl p-8">
            <h1 className="text-4xl font-black text-center mb-2">Lagos Life Sim</h1>
            <p className="text-center text-slate-400 mb-8">Build a life, meet people, own the city</p>

            <form onSubmit={handleAuth} className="space-y-4">
              {!isLogin && (
                <>
                  <input
                    type="text"
                    placeholder="Username"
                    value={formData.username}
                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white outline-none focus:border-emerald-400/50"
                  />
                  <input
                    type="text"
                    placeholder="Display name"
                    value={formData.display_name}
                    onChange={(e) => setFormData({ ...formData, display_name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white outline-none focus:border-emerald-400/50"
                  />
                </>
              )}
              <input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white outline-none focus:border-emerald-400/50"
              />
              <input
                type="password"
                placeholder="Password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white outline-none focus:border-emerald-400/50"
              />
              {error && <p className="text-red-400 text-sm">{error}</p>}
              <button
                type="submit"
                className="w-full py-3 rounded-full bg-gradient-to-r from-emerald-400 to-cyan-400 font-bold text-slate-950"
              >
                {isLogin ? "Login" : "Register"}
              </button>
            </form>

            <button
              onClick={() => setIsLogin(!isLogin)}
              className="w-full mt-4 py-3 text-slate-400 hover:text-emerald-400 transition"
            >
              {isLogin ? "New player? Register here" : "Already have an account? Login"}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // DASHBOARD (placeholder for full game UI)
  if (screen === "dashboard") {
    return (
      <div className="min-h-screen bg-[#07131f] text-white p-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-black">Lagos Life Sim</h1>
            <div className="flex gap-4">
              <button
                onClick={() => setScreen("properties")}
                className="px-4 py-2 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-200 hover:bg-emerald-500/30 transition"
              >
                Properties
              </button>
              <button
                onClick={() => setScreen("businesses")}
                className="px-4 py-2 rounded-full bg-cyan-500/20 border border-cyan-400/40 text-cyan-200 hover:bg-cyan-500/30 transition"
              >
                Businesses
              </button>
              <button
                onClick={() => setScreen("3d-map")}
                className="px-4 py-2 rounded-full bg-purple-500/20 border border-purple-400/40 text-purple-200 hover:bg-purple-500/30 transition"
              >
                3D Map
              </button>
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
            <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-6">
              <h2 className="text-2xl font-bold mb-4">Welcome, {authData.player?.display_name}</h2>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-2xl border border-emerald-400/20 bg-emerald-500/10 p-4">
                  <p className="text-sm text-slate-400">Balance</p>
                  <p className="text-2xl font-bold text-emerald-300">₦{authData.player?.balance?.toLocaleString()}</p>
                </div>
                <div className="rounded-2xl border border-amber-400/20 bg-amber-500/10 p-4">
                  <p className="text-sm text-slate-400">Reputation</p>
                  <p className="text-2xl font-bold text-amber-300">{authData.player?.reputation || 0}</p>
                </div>
                <div className="rounded-2xl border border-cyan-400/20 bg-cyan-500/10 p-4">
                  <p className="text-sm text-slate-400">Energy</p>
                  <p className="text-2xl font-bold text-cyan-300">{authData.player?.energy || 82}%</p>
                </div>
                <div className="rounded-2xl border border-rose-400/20 bg-rose-500/10 p-4">
                  <p className="text-sm text-slate-400">Health</p>
                  <p className="text-2xl font-bold text-rose-300">{authData.player?.health || 91}%</p>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-6">
              <h3 className="text-xl font-bold mb-4">Location</h3>
              <p className="text-emerald-300 text-lg mb-4">{authData.player?.current_district}</p>
              <div className="space-y-2">
                {["Victoria Island", "Lekki", "Yaba"].map((place) => (
                  <button
                    key={place}
                    className="w-full px-3 py-2 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 transition text-left"
                  >
                    {place}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-8 rounded-3xl border border-white/10 bg-slate-900/80 p-6">
            <h3 className="text-xl font-bold mb-4">Multiplayer Chat - {selectedRoom}</h3>
            <div className="space-y-3 mb-4 h-64 overflow-y-auto rounded-xl border border-white/10 bg-slate-950/50 p-3">
              {chatMessages.map((msg, idx) => (
                <div key={idx} className="text-sm text-slate-300">
                  <span className="text-emerald-400">{msg.playerName}:</span> {msg.text}
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Send a message..."
                onKeyPress={(e) => {
                  if (e.key === "Enter" && e.currentTarget.value) {
                    handleSendMessage(e.currentTarget.value);
                    e.currentTarget.value = "";
                  }
                }}
                className="flex-1 px-4 py-2 rounded-lg border border-white/10 bg-white/5 text-white outline-none"
              />
              <button className="px-4 py-2 rounded-lg bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30 transition">Send</button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // PROPERTIES SCREEN
  if (screen === "properties") {
    return (
      <div className="min-h-screen bg-[#07131f] text-white p-4">
        <button onClick={() => setScreen("dashboard")} className="mb-6 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 transition">
          ← Back
        </button>
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-6">My Properties</h2>
          <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-6">
            <p className="text-slate-400">No properties yet. Build your real estate empire!</p>
          </div>
        </div>
      </div>
    );
  }

  // BUSINESSES SCREEN
  if (screen === "businesses") {
    return (
      <div className="min-h-screen bg-[#07131f] text-white p-4">
        <button onClick={() => setScreen("dashboard")} className="mb-6 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 transition">
          ← Back
        </button>
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-6">My Businesses</h2>
          <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-6">
            <p className="text-slate-400">No businesses yet. Start your entrepreneurial journey!</p>
          </div>
        </div>
      </div>
    );
  }

  // 3D MAP SCREEN (Three.js placeholder)
  if (screen === "3d-map") {
    return (
      <div className="min-h-screen bg-[#07131f] text-white p-4">
        <button onClick={() => setScreen("dashboard")} className="mb-6 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 transition">
          ← Back
        </button>
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-6">3D Lagos Map</h2>
          <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-12 h-96 flex items-center justify-center">
            <p className="text-slate-400 text-lg">3D Map with Three.js (Canvas rendering ready)</p>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
