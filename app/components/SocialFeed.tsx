"use client";

import { useState, useEffect } from "react";
import { io } from "socket.io-client";

const SOCKET_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

interface SocialPost {
  id: number;
  playerId: number;
  playerName: string;
  avatar: string;
  content: string;
  timestamp: string;
  likes: number;
  liked: boolean;
}

const mockPosts: SocialPost[] = [
  {
    id: 1,
    playerId: 2,
    playerName: "Ada C.",
    avatar: "AC",
    content: "Just bought a new property in Victoria Island! 🏠",
    timestamp: new Date(Date.now() - 3600000).toISOString(),
    likes: 24,
    liked: false,
  },
  {
    id: 2,
    playerId: 3,
    playerName: "Kunle B.",
    avatar: "KB",
    content: "Won big on the betting market today! 💰",
    timestamp: new Date(Date.now() - 7200000).toISOString(),
    likes: 42,
    liked: false,
  },
];

export default function SocialFeed() {
  const [posts, setPosts] = useState<SocialPost[]>(mockPosts);
  const [newPost, setNewPost] = useState("");
  const [socket, setSocket] = useState<any>(null);

  useEffect(() => {
    const newSocket = io(SOCKET_URL);
    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, []);

  const handlePostCreate = () => {
    if (!newPost.trim()) return;

    const post: SocialPost = {
      id: posts.length + 1,
      playerId: 1,
      playerName: "You",
      avatar: "YO",
      content: newPost,
      timestamp: new Date().toISOString(),
      likes: 0,
      liked: false,
    };

    setPosts([post, ...posts]);
    setNewPost("");
  };

  const handleLike = (postId: number) => {
    setPosts(
      posts.map((post) =>
        post.id === postId
          ? { ...post, likes: post.liked ? post.likes - 1 : post.likes + 1, liked: !post.liked }
          : post
      )
    );
  };

  return (
    <div className="min-h-screen bg-[#07131f] text-white p-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-black mb-8">Social Feed</h1>

        {/* Post Creator */}
        <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-6 mb-6">
          <div className="flex gap-4 mb-4">
            <div className="w-12 h-12 rounded-full bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-300 font-bold">
              YO
            </div>
            <textarea
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
              placeholder="Share what's happening in your Lagos life..."
              className="flex-1 rounded-2xl border border-white/10 bg-white/5 p-4 text-white outline-none placeholder:text-slate-500 resize-none"
              rows={3}
            />
          </div>
          <div className="flex justify-end">
            <button
              onClick={handlePostCreate}
              disabled={!newPost.trim()}
              className="px-6 py-2 rounded-full bg-emerald-500/30 text-emerald-300 hover:bg-emerald-500/50 disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              Post
            </button>
          </div>
        </div>

        {/* Feed Posts */}
        <div className="space-y-4">
          {posts.map((post) => (
            <div key={post.id} className="rounded-3xl border border-white/10 bg-slate-900/80 p-6">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-400 to-violet-500 flex items-center justify-center text-white font-bold text-sm">
                  {post.avatar}
                </div>
                <div className="flex-1">
                  <p className="font-bold">{post.playerName}</p>
                  <p className="text-xs text-slate-500">{new Date(post.timestamp).toLocaleDateString()}</p>
                </div>
              </div>

              <p className="text-slate-300 mb-4">{post.content}</p>

              <div className="flex gap-4 pt-4 border-t border-white/5">
                <button
                  onClick={() => handleLike(post.id)}
                  className={`flex items-center gap-2 text-sm transition ${
                    post.liked
                      ? "text-rose-400"
                      : "text-slate-400 hover:text-rose-400"
                  }`}
                >
                  <span>{post.liked ? "❤️" : "🤍"}</span>
                  <span>{post.likes}</span>
                </button>
                <button className="flex items-center gap-2 text-sm text-slate-400 hover:text-cyan-400 transition">
                  <span>💬</span>
                  <span>Reply</span>
                </button>
                <button className="flex items-center gap-2 text-sm text-slate-400 hover:text-emerald-400 transition">
                  <span>🔄</span>
                  <span>Share</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
