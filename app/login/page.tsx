"use client";

import { useState, useEffect, Suspense } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { StickyNoteIcon, SparklesIcon } from "lucide-react";
import { ThemeToggle } from "@/app/components/ThemeToggle";

function LoginContent() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const searchParams = useSearchParams();

  useEffect(() => {
    if (searchParams.get("error")) setError("Authentication failed. Please try again.");
  }, [searchParams]);

  useEffect(() => {
    if (status === "authenticated" && session) router.push("/dashboard");
  }, [status, session, router]);

  const handleGoogleSignIn = async () => {
    try {
      setError(""); setIsLoading(true);
      await signIn("google", { callbackUrl: "/dashboard", redirect: true });
    } catch {
      setError("Authentication failed. Please try again.");
      setIsLoading(false);
    }
  };

  if (status === "loading") return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: "var(--background)" }}>
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500" />
    </div>
  );

  // Floating sticky decorations
  const stickies = [
    { color: "bg-yellow-200/60 dark:bg-yellow-800/30", r: "-8deg",  top: "8%",  left: "5%",  w: 64, h: 64  },
    { color: "bg-teal-200/60 dark:bg-teal-800/30",    r: "6deg",   top: "15%", right: "7%", w: 48, h: 48  },
    { color: "bg-pink-200/60 dark:bg-pink-800/30",    r: "4deg",   bottom:"10%",left:"8%",  w: 56, h: 56  },
    { color: "bg-blue-200/60 dark:bg-blue-800/30",    r: "-5deg",  bottom:"12%",right:"6%", w: 52, h: 52  },
    { color: "bg-purple-200/60 dark:bg-purple-800/30",r: "10deg",  top:"50%",  left:"3%",   w: 40, h: 40  },
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 relative overflow-hidden" style={{ background: "var(--background)" }}>

      {/* Theme toggle top-right */}
      <div className="absolute top-4 right-4"><ThemeToggle /></div>

      {/* Decorative blobs */}
      <div className="absolute top-0 left-0 w-96 h-96 rounded-full blur-3xl opacity-20 pointer-events-none" style={{ background: "var(--primary-light)" }} />
      <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full blur-3xl opacity-20 pointer-events-none" style={{ background: "var(--secondary-light)" }} />

      {/* Floating sticky notes */}
      {stickies.map((s, i) => (
        <motion.div key={i}
          className={`absolute rounded-lg shadow-md hidden md:block ${s.color}`}
          style={{ top: s.top, left: (s as Record<string, string | number>).left as string, right: (s as Record<string, string | number>).right as string, bottom: (s as Record<string, string | number>).bottom as string, width: s.w, height: s.h, transform: `rotate(${s.r})` }}
          animate={{ y: [0, -10, 0], rotate: [s.r, `${parseFloat(s.r) + 3}deg`, s.r] }}
          transition={{ duration: 4 + i, repeat: Infinity, delay: i * 0.7, ease: "easeInOut" }}
        />
      ))}

      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, type: "spring", stiffness: 200 }}
        className="w-full max-w-md relative">

        {/* Card */}
        <div className="rounded-3xl border p-10 shadow-2xl" style={{ background: "var(--card-bg)", borderColor: "var(--border)" }}>

          {/* Logo */}
          <Link href="/" className="flex flex-col items-center gap-2 mb-8">
            <motion.div animate={{ rotate: [0, -10, 10, 0] }} transition={{ duration: 3, repeat: Infinity, repeatDelay: 4 }}>
              <StickyNoteIcon className="w-10 h-10 text-teal-500" />
            </motion.div>
            <span className="text-3xl font-black text-aurora">NextBoard_Sticky</span>
          </Link>

          <h2 className="text-xl font-bold text-center mb-1">Welcome back</h2>
          <p className="text-sm text-center mb-8" style={{ color: "var(--muted)" }}>
            Sign in to access your boards ·{" "}
            <Link href="/" className="text-teal-500 hover:underline">Go home</Link>
          </p>

          {/* Error */}
          <AnimatePresence>
            {error && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}
                className="mb-4 p-3 rounded-xl border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-950/30 text-sm text-red-600 dark:text-red-400">
                {error}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Google button */}
          <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
            onClick={handleGoogleSignIn} disabled={isLoading}
            className="w-full flex items-center justify-center gap-3 py-3.5 px-4 rounded-2xl border font-semibold text-sm transition-all shadow-sm disabled:opacity-60"
            style={{ background: "var(--surface)", borderColor: "var(--border)", color: "var(--foreground)" }}>
            <svg className="h-5 w-5 flex-shrink-0" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            {isLoading ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                </svg>
                Signing in…
              </span>
            ) : "Continue with Google"}
          </motion.button>

          {/* Feature chips */}
          <div className="flex flex-wrap justify-center gap-2 mt-8">
            {["Infinite Canvas","Sticky Notes","Auto-save","Dark Mode"].map(f => (
              <span key={f} className="flex items-center gap-1 text-xs px-3 py-1 rounded-full border" style={{ background: "var(--surface)", borderColor: "var(--border)", color: "var(--muted)" }}>
                <SparklesIcon className="w-3 h-3 text-teal-500" /> {f}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center" style={{ background: "var(--background)" }}><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500" /></div>}>
      <LoginContent />
    </Suspense>
  );
}
