"use client";

import axios from "axios";
import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  PlusIcon, SearchIcon, LayoutGridIcon, ListIcon,
  MoreHorizontalIcon, FolderIcon, Loader2Icon, AlertCircleIcon,
  StickyNoteIcon,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { Board } from "@/lib/models";
import { GeneralObject } from "@/types/definitions";
import { v4 } from "uuid";
import { toast } from "sonner";
import Image from "next/image";
import { ThemeToggle } from "@/app/components/ThemeToggle";

export default function Dashboard() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [boards, setBoards] = useState<Board[]>([]);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const [newBoardTitle, setNewBoardTitle] = useState("");
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const boardsRef = useRef<Board[]>([]);

  useEffect(() => { boardsRef.current = boards; }, [boards]);

  const fetchBoards = useCallback(async () => {
    try {
      setIsLoading(true); setError(null);
      await axios.get("/api/boards").then((res: GeneralObject) => {
        setBoards(res.data); setIsLoading(false);
      });
    } catch { setError("Failed to load your boards. Please try refreshing."); setIsLoading(false); }
  }, []);

  const handleSignOut = useCallback(async () => {
    try { await signOut({ callbackUrl: "/login" }); }
    catch { router.push("/login"); }
  }, [router]);

  useEffect(() => {
    if (status !== "authenticated") return;
    const interval = setInterval(async () => {
      const res = await fetch("/api/auth/session");
      if (!res.ok) handleSignOut();
    }, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, [status, handleSignOut]);

  useEffect(() => { fetchBoards(); }, [fetchBoards]);

  const createNewBoard = async () => {
    if (!newBoardTitle.trim()) return;
    try {
      setIsCreating(true); setError(null);
      const newBoard = { id: v4(), title: newBoardTitle, description: "", cards: [], createdAt: new Date(), updatedAt: new Date(), userId: session?.user?.email || "" };
      await axios.post("/api/boards", newBoard).then(() => {
        fetchBoards(); setNewBoardTitle(""); setShowCreateForm(false); setIsCreating(false);
        toast.success("Board created!");
      });
    } catch { toast.error("Failed to create board."); setIsCreating(false); }
  };

  const filteredBoards = boards.filter(b => b.title.toLowerCase().includes(searchQuery.toLowerCase()));

  const formatDate = (date: Date) => {
    const diff = Date.now() - new Date(date).getTime();
    const d = Math.floor(diff / 86400000), h = Math.floor(diff / 3600000), m = Math.floor(diff / 60000);
    return d > 0 ? (d === 1 ? "Yesterday" : `${d} days ago`) : h > 0 ? `${h}h ago` : m > 0 ? `${m}m ago` : "Just now";
  };

  const stickyColors = ["bg-yellow-100 dark:bg-yellow-900/30","bg-teal-100 dark:bg-teal-900/30","bg-pink-100 dark:bg-pink-900/30","bg-blue-100 dark:bg-blue-900/30","bg-amber-100 dark:bg-amber-900/30","bg-purple-100 dark:bg-purple-900/30"];

  if (status === "loading") return <div className="min-h-screen flex items-center justify-center" style={{ background: "var(--background)" }}><Loader2Icon className="h-8 w-8 animate-spin text-teal-500" /></div>;
  if (status === "unauthenticated") { router.push("/login"); return null; }

  return (
    <div className="min-h-screen" style={{ background: "var(--background)", color: "var(--foreground)" }}>

      {/* Header */}
      <header className="border-b sticky top-0 z-20 glass" style={{ borderColor: "var(--border)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center gap-2">
              <StickyNoteIcon className="w-6 h-6 text-teal-500" />
              <span className="text-xl font-bold text-aurora">NextBoard_Sticky</span>
            </Link>
            <div className="flex items-center gap-3">
              <ThemeToggle />
              <button className="p-2 rounded-lg transition-colors hover:bg-red-50 dark:hover:bg-red-950/30 text-gray-400 hover:text-red-500" onClick={handleSignOut} title="Sign out">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
              </button>
              {session?.user?.image
                ? <Image src={session.user.image} alt={session.user.name || "User"} width={32} height={32} className="rounded-full object-cover ring-2 ring-teal-500/30" />
                : <div className="h-8 w-8 rounded-full bg-teal-500 flex items-center justify-center text-white font-bold text-sm">{session?.user?.name?.charAt(0) || "U"}</div>}
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-black">My Boards</h1>
            <p className="text-sm mt-1" style={{ color: "var(--muted)" }}>{boards.length} board{boards.length !== 1 ? "s" : ""}</p>
          </div>
          <div className="flex items-center gap-3 flex-wrap">
            {/* Search */}
            <div className="relative">
              <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4" style={{ color: "var(--muted)" }} />
              <input type="text" placeholder="Search boards..." className="pl-9 pr-4 py-2 rounded-xl border text-sm w-56 transition-all focus:ring-2 focus:ring-teal-500/40 focus:border-teal-500"
                style={{ background: "var(--surface)", borderColor: "var(--border)", color: "var(--foreground)" }}
                value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
            </div>
            {/* View toggle */}
            <div className="flex rounded-xl overflow-hidden border" style={{ borderColor: "var(--border)" }}>
              {(["grid","list"] as const).map(m => (
                <button key={m} className="p-2 transition-colors" style={{ background: viewMode === m ? "var(--primary-light)" : "var(--surface)", color: viewMode === m ? "var(--primary)" : "var(--muted)" }} onClick={() => setViewMode(m)}>
                  {m === "grid" ? <LayoutGridIcon className="h-5 w-5" /> : <ListIcon className="h-5 w-5" />}
                </button>
              ))}
            </div>
            {/* New board */}
            <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
              className="btn-3d flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white bg-teal-500"
              onClick={() => setShowCreateForm(true)}>
              <PlusIcon className="h-4 w-4" /> New Board
            </motion.button>
          </div>
        </div>

        {/* Error */}
        <AnimatePresence>
          {error && (
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              className="mb-6 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 p-4 rounded-xl flex items-start gap-3">
              <AlertCircleIcon className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm text-red-700 dark:text-red-400">{error}</p>
                <button className="text-xs text-red-600 underline mt-1" onClick={() => { setError(null); fetchBoards(); }}>Try again</button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {isLoading ? (
          <div className="flex justify-center py-20"><Loader2Icon className="h-8 w-8 animate-spin text-teal-500" /></div>
        ) : (
          <>
            {/* Create form */}
            <AnimatePresence>
              {showCreateForm && (
                <motion.div initial={{ opacity: 0, y: -16, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -16, scale: 0.97 }}
                  className="mb-8 p-6 rounded-2xl border" style={{ background: "var(--card-bg)", borderColor: "var(--border)" }}>
                  <h3 className="text-lg font-bold mb-4">Create New Board</h3>
                  <div className="flex items-center gap-3">
                    <input type="text" placeholder="Board title..." autoFocus
                      className="flex-1 px-4 py-2.5 rounded-xl border text-sm focus:ring-2 focus:ring-teal-500/40 focus:border-teal-500 transition-all"
                      style={{ background: "var(--surface)", borderColor: "var(--border)", color: "var(--foreground)" }}
                      value={newBoardTitle} onChange={e => setNewBoardTitle(e.target.value)}
                      onKeyDown={e => e.key === "Enter" && createNewBoard()} />
                    <button onClick={createNewBoard} disabled={isCreating || !newBoardTitle.trim()}
                      className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-teal-500 hover:bg-teal-600 disabled:opacity-50 transition-colors">
                      {isCreating ? <Loader2Icon className="h-4 w-4 animate-spin" /> : <PlusIcon className="h-4 w-4" />} Create
                    </button>
                    <button onClick={() => setShowCreateForm(false)}
                      className="px-4 py-2.5 rounded-xl text-sm font-medium border transition-colors hover:bg-gray-50 dark:hover:bg-white/5"
                      style={{ borderColor: "var(--border)", color: "var(--muted)" }}>Cancel</button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Grid view */}
            {viewMode === "grid" ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {/* New board card */}
                <motion.div whileHover={{ y: -6, scale: 1.02 }} whileTap={{ scale: 0.97 }}
                  className="border-2 border-dashed rounded-2xl p-6 flex flex-col items-center justify-center text-center h-56 cursor-pointer transition-colors"
                  style={{ borderColor: "var(--border)", background: "var(--surface)" }}
                  onClick={() => setShowCreateForm(true)}>
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-3" style={{ background: "var(--primary-light)" }}>
                    <PlusIcon className="h-6 w-6 text-teal-500" />
                  </div>
                  <p className="font-semibold text-sm">New Board</p>
                  <p className="text-xs mt-1" style={{ color: "var(--muted)" }}>Start organising ideas</p>
                </motion.div>

                {/* Boards */}
                <AnimatePresence>
                  {filteredBoards.length === 0 ? (
                    <div className="col-span-full text-center py-16" style={{ color: "var(--muted)" }}>
                      No boards found. Create your first board!
                    </div>
                  ) : filteredBoards.map((board, i) => (
                    <motion.div key={board.id}
                      initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: i * 0.05 }}
                      whileHover={{ y: -6 }}
                      className="rounded-2xl overflow-hidden border shadow-sm transition-shadow hover:shadow-md"
                      style={{ background: "var(--card-bg)", borderColor: "var(--border)" }}>
                      <Link href={`/dashboard/board/${board.id}`}>
                        <div className={`h-36 p-4 ${stickyColors[i % stickyColors.length]}`}>
                          {board.cards?.length > 0 ? (
                            <div className="grid grid-cols-2 gap-2 h-full opacity-60">
                              {[0,1,2,3].map(j => <div key={j} className="rounded-lg" style={{ background: "rgba(255,255,255,0.6)" }} />)}
                            </div>
                          ) : (
                            <div className="flex items-center justify-center h-full" style={{ color: "var(--muted)" }}>
                              <p className="text-xs">No cards yet</p>
                            </div>
                          )}
                        </div>
                        <div className="p-4">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-bold text-sm mb-0.5 truncate">{board.title}</h3>
                              <p className="text-xs" style={{ color: "var(--muted)" }}>{board.cards?.length || 0} cards · {formatDate(board.updatedAt)}</p>
                            </div>
                            <MoreHorizontalIcon className="h-4 w-4 flex-shrink-0" style={{ color: "var(--muted)" }} />
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            ) : (
              /* List view */
              <div className="rounded-2xl border overflow-hidden" style={{ background: "var(--card-bg)", borderColor: "var(--border)" }}>
                <div className="divide-y" style={{ borderColor: "var(--border)" }}>
                  <div className="px-6 py-4 flex items-center gap-4 cursor-pointer hover:bg-black/3 dark:hover:bg-white/3 transition-colors" onClick={() => setShowCreateForm(true)}>
                    <div className="h-10 w-10 rounded-xl flex items-center justify-center" style={{ background: "var(--primary-light)" }}>
                      <PlusIcon className="h-5 w-5 text-teal-500" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-teal-500">Create New Board</p>
                      <p className="text-xs" style={{ color: "var(--muted)" }}>Start organising your ideas</p>
                    </div>
                  </div>
                  {filteredBoards.map((board, i) => (
                    <motion.div key={board.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.04 }}>
                      <Link href={`/dashboard/board/${board.id}`} className="block hover:bg-black/2 dark:hover:bg-white/2 transition-colors">
                        <div className="px-6 py-4 flex items-center gap-4">
                          <div className={`h-10 w-10 rounded-xl flex items-center justify-center ${stickyColors[i % stickyColors.length]}`}>
                            <FolderIcon className="h-5 w-5 text-teal-600" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold truncate">{board.title}</p>
                            <p className="text-xs" style={{ color: "var(--muted)" }}>{board.cards?.length || 0} cards · {formatDate(board.updatedAt)}</p>
                          </div>
                          <MoreHorizontalIcon className="h-4 w-4" style={{ color: "var(--muted)" }} />
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}
