"use client";

import { useState, useEffect } from "react";

interface Transaction {
  id: number;
  type: "income" | "expense" | "bet-win" | "bet-loss";
  amount: number;
  description: string;
  timestamp: string;
}

interface Job {
  name: string;
  dailyIncome: number;
  hourlyRate: number;
  workHoursNeeded: number;
  energyCost: number;
}

const jobs: Job[] = [
  { name: "Graphic Designer", dailyIncome: 34000, hourlyRate: 4250, workHoursNeeded: 8, energyCost: 15 },
  { name: "Software Developer", dailyIncome: 58000, hourlyRate: 7250, workHoursNeeded: 8, energyCost: 12 },
  { name: "Business Consultant", dailyIncome: 45000, hourlyRate: 5625, workHoursNeeded: 8, energyCost: 10 },
  { name: "Trader", dailyIncome: 75000, hourlyRate: 9375, workHoursNeeded: 8, energyCost: 18 },
];

export default function PlayerDashboard({ playerId, initialBalance }: { playerId: number; initialBalance: number }) {
  const [balance, setBalance] = useState(initialBalance);
  const [energy, setEnergy] = useState(82);
  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: 1,
      type: "income",
      amount: 34000,
      description: "Freelance work",
      timestamp: new Date().toISOString(),
    },
  ]);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [workProgress, setWorkProgress] = useState(0);
  const [isWorking, setIsWorking] = useState(false);
  const [schoolBalance, setSchoolBalance] = useState(80000);
  const [isInSchool, setIsInSchool] = useState(false);

  const workJob = async (job: Job) => {
    if (energy < job.energyCost) {
      alert("Not enough energy!");
      return;
    }

    setSelectedJob(job);
    setIsWorking(true);
    setWorkProgress(0);

    const interval = setInterval(() => {
      setWorkProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          // Add income
          setBalance((prev) => prev + job.dailyIncome);
          setEnergy((prev) => Math.max(0, prev - job.energyCost));
          addTransaction("income", job.dailyIncome, `Earned from ${job.name}`);
          setIsWorking(false);
          return 0;
        }
        return prev + 10;
      });
    }, 300);
  };

  const paySchoolFee = async () => {
    const fee = 80000;
    if (balance < fee) {
      alert("Insufficient funds!");
      return;
    }
    setBalance((prev) => prev - fee);
    setSchoolBalance(0);
    setIsInSchool(true);
    addTransaction("expense", fee, "School fees - Business Administration");
    alert("Enrolled in Business Administration program!");
  };

  const addTransaction = (type: "income" | "expense" | "bet-win" | "bet-loss", amount: number, description: string) => {
    setTransactions((prev) => [
      {
        id: prev.length + 1,
        type,
        amount,
        description,
        timestamp: new Date().toISOString(),
      },
      ...prev,
    ]);
  };

  return (
    <div className="min-h-screen bg-[#07131f] text-white p-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-black mb-2">Player Dashboard</h1>
          <p className="text-slate-400">Manage your life, career, and assets</p>
        </div>

        {/* Key Stats */}
        <div className="grid gap-4 md:grid-cols-4 mb-8">
          <div className="rounded-2xl border border-emerald-400/20 bg-emerald-500/10 p-4">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Balance</p>
            <p className="text-3xl font-bold text-emerald-300">₦{balance.toLocaleString()}</p>
          </div>
          <div className="rounded-2xl border border-amber-400/20 bg-amber-500/10 p-4">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Energy</p>
            <p className="text-3xl font-bold text-amber-300">{energy}%</p>
          </div>
          <div className="rounded-2xl border border-cyan-400/20 bg-cyan-500/10 p-4">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-400">School Balance</p>
            <p className="text-3xl font-bold text-cyan-300">₦{schoolBalance.toLocaleString()}</p>
          </div>
          <div className="rounded-2xl border border-rose-400/20 bg-rose-500/10 p-4">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Status</p>
            <p className="text-3xl font-bold text-rose-300">{isInSchool ? "Studying" : "Available"}</p>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
          {/* Career Section */}
          <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-6">
            <h2 className="text-2xl font-bold mb-4">Career</h2>

            {isWorking && selectedJob ? (
              <div className="rounded-2xl border border-emerald-400/30 bg-emerald-500/10 p-4">
                <p className="font-semibold mb-2">{selectedJob.name} - In Progress</p>
                <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-emerald-400 to-cyan-400 transition-all duration-200"
                    style={{ width: `${workProgress}%` }}
                  />
                </div>
                <p className="text-sm text-slate-400 mt-2">{workProgress}% Complete</p>
              </div>
            ) : (
              <div className="space-y-3">
                {jobs.map((job) => (
                  <button
                    key={job.name}
                    onClick={() => workJob(job)}
                    disabled={energy < job.energyCost}
                    className={`w-full p-4 rounded-2xl border transition ${
                      energy < job.energyCost
                        ? "border-slate-600 bg-slate-800/40 cursor-not-allowed opacity-50"
                        : "border-white/10 bg-slate-950/40 hover:border-emerald-400/40 hover:bg-slate-950/60"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="text-left">
                        <p className="font-semibold">{job.name}</p>
                        <p className="text-sm text-slate-400">₦{job.dailyIncome.toLocaleString()}/day • -{job.energyCost}% energy</p>
                      </div>
                      <p className="text-emerald-300 font-bold">Work</p>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Education Section */}
          <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-6">
            <h2 className="text-2xl font-bold mb-4">Education</h2>
            {isInSchool ? (
              <div className="rounded-2xl border border-cyan-400/30 bg-cyan-500/10 p-4">
                <p className="font-semibold text-cyan-300 mb-2">✓ Enrolled</p>
                <p className="text-sm text-slate-400">Business Administration</p>
                <p className="text-sm text-slate-500 mt-2">Status: Active</p>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-4">
                  <p className="font-semibold mb-2">Business Administration</p>
                  <p className="text-sm text-slate-400 mb-3">Fee: ₦80,000</p>
                  <button
                    onClick={paySchoolFee}
                    disabled={balance < 80000}
                    className={`w-full py-2 rounded-lg ${
                      balance < 80000
                        ? "bg-slate-700 text-slate-500 cursor-not-allowed"
                        : "bg-cyan-500/30 text-cyan-300 hover:bg-cyan-500/50"
                    } transition`}
                  >
                    Enroll Now
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Transaction History */}
        <div className="mt-8 rounded-3xl border border-white/10 bg-slate-900/80 p-6">
          <h2 className="text-2xl font-bold mb-4">Transaction History</h2>
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {transactions.map((txn) => (
              <div key={txn.id} className="flex items-center justify-between rounded-lg border border-white/5 bg-slate-950/40 p-3">
                <div>
                  <p className="font-semibold text-sm">{txn.description}</p>
                  <p className="text-xs text-slate-500">{new Date(txn.timestamp).toLocaleTimeString()}</p>
                </div>
                <p
                  className={`font-bold text-sm ${
                    txn.type === "income" || txn.type === "bet-win"
                      ? "text-emerald-300"
                      : "text-rose-300"
                  }`}
                >
                  {txn.type === "income" || txn.type === "bet-win" ? "+" : "-"}₦{txn.amount.toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
