"use client";

import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import {
  ArrowRightIcon, FileTextIcon, ImageIcon, LayoutGridIcon,
  LinkIcon, TextIcon, UsersIcon, StickyNoteIcon, SparklesIcon,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ThemeToggle } from "./components/ThemeToggle";

// Animated multicolour cycling word
function CyclingWord() {
  const words = ["beautiful", "powerful", "visual", "organised", "inspired"];
  const colors = ["text-rainbow", "text-aurora", "text-fire", "text-ocean", "text-rainbow"];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setIndex(i => (i + 1) % words.length), 2400);
    return () => clearInterval(t);
  }, []);

  return (
    <AnimatePresence mode="wait">
      <motion.span
        key={index}
        initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        exit={{ opacity: 0, y: -20, filter: "blur(8px)" }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className={`inline-block ${colors[index]}`}
      >
        {words[index]}
      </motion.span>
    </AnimatePresence>
  );
}

// Floating particle
function Particle({ x, y, color, delay, size }: { x: string; y: string; color: string; delay: number; size: number }) {
  return (
    <motion.div
      className={`absolute rounded-full ${color} opacity-60`}
      style={{ left: x, top: y, width: size, height: size }}
      animate={{ y: [0, -20, 0], opacity: [0.4, 0.9, 0.4], scale: [1, 1.3, 1] }}
      transition={{ duration: 4 + delay, repeat: Infinity, delay, ease: "easeInOut" }}
    />
  );
}

export default function Home() {
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 400], [0, -80]);
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0.3]);

  const particles = [
    { x: "8%",  y: "20%", color: "bg-teal-400",   delay: 0,   size: 8  },
    { x: "15%", y: "60%", color: "bg-amber-400",  delay: 1.2, size: 6  },
    { x: "80%", y: "15%", color: "bg-purple-400", delay: 0.5, size: 10 },
    { x: "88%", y: "55%", color: "bg-pink-400",   delay: 1.8, size: 7  },
    { x: "50%", y: "8%",  color: "bg-blue-400",   delay: 0.8, size: 5  },
    { x: "30%", y: "85%", color: "bg-teal-300",   delay: 2.1, size: 9  },
    { x: "70%", y: "80%", color: "bg-amber-300",  delay: 1.5, size: 6  },
  ];

  const features = [
    { icon: <LayoutGridIcon className="h-6 w-6" />, color: "text-teal-500",   bg: "bg-teal-500/10",   title: "Infinite Canvas",       desc: "An endless board with no creative boundaries — pan, zoom and arrange freely.",           delay: 0.1 },
    { icon: <FileTextIcon   className="h-6 w-6" />, color: "text-amber-500",  bg: "bg-amber-500/10",  title: "Rich Sticky Notes",     desc: "Formatted notes with headings, lists, code and images — like real sticky notes.",        delay: 0.2 },
    { icon: <UsersIcon      className="h-6 w-6" />, color: "text-purple-500", bg: "bg-purple-500/10", title: "Collaboration",         desc: "Share boards and work together in real-time with your team across the world.",            delay: 0.3 },
    { icon: <ImageIcon      className="h-6 w-6" />, color: "text-pink-500",   bg: "bg-pink-500/10",   title: "Image Boards",          desc: "Pin images for mood boards, design inspiration and visual research.",                    delay: 0.4 },
    { icon: <TextIcon       className="h-6 w-6" />, color: "text-blue-500",   bg: "bg-blue-500/10",   title: "Rich Text Editor",      desc: "A full-featured TipTap editor right inside your sticky cards.",                        delay: 0.5 },
    { icon: <LinkIcon       className="h-6 w-6" />, color: "text-green-500",  bg: "bg-green-500/10",  title: "Smart Link Previews",   desc: "Paste URLs and get beautiful previews with titles, images and descriptions.",           delay: 0.6 },
  ];

  const steps = [
    { n: "01", title: "Create a Board",   desc: "Give your project a canvas — named, yours, infinite.", grad: "from-teal-400 to-cyan-500",    delay: 0.1 },
    { n: "02", title: "Add Sticky Cards", desc: "Drop notes, todos, images, and links anywhere.",       grad: "from-amber-400 to-orange-500", delay: 0.25 },
    { n: "03", title: "Connect Ideas",    desc: "Draw edges between cards to reveal relationships.",    grad: "from-purple-400 to-pink-500",  delay: 0.4 },
  ];

  const stickyCards = [
    { color: "bg-yellow-100 dark:bg-yellow-900/40",  delay: 0.9,  rotate: "-2deg",  label: "Ideas",  labelColor: "text-yellow-700 dark:text-yellow-400"  },
    { color: "bg-teal-100 dark:bg-teal-900/40",     delay: 1.0,  rotate: "1.5deg", label: "Tasks",  labelColor: "text-teal-700 dark:text-teal-400"     },
    { color: "bg-pink-100 dark:bg-pink-900/40",     delay: 1.1,  rotate: "-1deg",  label: "Notes",  labelColor: "text-pink-700 dark:text-pink-400"     },
    { color: "bg-blue-100 dark:bg-blue-900/40",     delay: 1.2,  rotate: "2deg",   label: "Links",  labelColor: "text-blue-700 dark:text-blue-400"     },
    { color: "bg-amber-100 dark:bg-amber-900/40",   delay: 1.3,  rotate: "-1.5deg",label: "Images", labelColor: "text-amber-700 dark:text-amber-400"   },
    { color: "bg-green-100 dark:bg-green-900/40",   delay: 1.4,  rotate: "1deg",   label: "Todos",  labelColor: "text-green-700 dark:text-green-400"   },
  ];

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "var(--background)", color: "var(--foreground)" }}>

      {/* ── NAV ── */}
      <nav className="flex justify-between items-center py-4 px-6 md:px-12 sticky top-0 z-50 glass border-b" style={{ borderColor: "var(--border)" }}>
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }} className="flex items-center gap-2">
          <motion.div animate={{ rotate: [0, -10, 10, 0] }} transition={{ duration: 3, repeat: Infinity, repeatDelay: 5 }}>
            <StickyNoteIcon className="w-7 h-7 text-teal-500" />
          </motion.div>
          <Link href="/">
            <span className="text-2xl font-bold text-aurora">NextBoard_Sticky</span>
          </Link>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }} className="hidden md:flex items-center gap-6">
          {["#features", "/about"].map((href, i) => (
            <Link key={i} href={href} className="text-sm font-medium transition-colors hover:text-teal-500" style={{ color: "var(--muted)" }}>
              {["Features", "About"][i]}
            </Link>
          ))}
          <ThemeToggle />
          <Link href="/dashboard" className="btn-3d bg-teal-500 hover:bg-teal-600 text-white px-5 py-2 rounded-lg text-sm font-semibold">
            Get Started
          </Link>
        </motion.div>

        {/* Mobile nav */}
        <div className="flex md:hidden items-center gap-3">
          <ThemeToggle />
          <Link href="/dashboard" className="bg-teal-500 text-white px-4 py-1.5 rounded-lg text-sm font-medium">Go</Link>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="relative flex flex-col items-center justify-center text-center px-6 py-20 md:py-32 overflow-hidden min-h-[90vh]">
        {/* Background blobs */}
        <motion.div style={{ y: heroY }} className="absolute inset-0 -z-10 pointer-events-none">
          <div className="absolute top-10 left-0 w-96 h-96 rounded-full blur-3xl opacity-25" style={{ background: "var(--primary-light)" }} />
          <div className="absolute bottom-10 right-0 w-96 h-96 rounded-full blur-3xl opacity-25" style={{ background: "var(--secondary-light)" }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full blur-3xl opacity-15" style={{ background: "var(--accent-light)" }} />
        </motion.div>

        {/* Dotted grid */}
        <div className="absolute inset-0 -z-10 dotted-bg opacity-20 pointer-events-none" />

        {/* Floating particles */}
        {particles.map((p, i) => <Particle key={i} {...p} />)}

        {/* Badge */}
        <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 border text-sm font-medium px-4 py-1.5 rounded-full mb-8 animate-border-glow"
          style={{ background: "var(--primary-light)", borderColor: "var(--primary)", color: "var(--primary)" }}>
          <SparklesIcon className="w-4 h-4" />
          Visual Sticky Board for Modern Teams
        </motion.div>

        {/* Headline */}
        <motion.h1 style={{ opacity: heroOpacity }} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }}
          className="text-5xl md:text-7xl font-black max-w-5xl mb-6 leading-tight">
          Your ideas deserve a{" "}
          <span className="inline-block min-w-[260px]">
            <CyclingWord />
          </span>{" "}
          board
        </motion.h1>

        {/* Sub */}
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.4 }}
          className="text-lg md:text-xl max-w-2xl mb-12 leading-relaxed" style={{ color: "var(--muted)" }}>
          Capture, arrange and connect your ideas with sticky notes on an infinite canvas.{" "}
          <span className="text-rainbow font-semibold">Think visually</span>,{" "}
          <span className="text-aurora font-semibold">work better</span>.
        </motion.p>

        {/* CTA */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 mb-20">
          <Link href="/dashboard"
            className="btn-3d bg-teal-500 hover:bg-teal-600 text-white px-10 py-4 rounded-2xl text-lg font-bold flex items-center gap-2 animate-glow">
            Start for free <ArrowRightIcon size={20} />
          </Link>
          <Link href="#features"
            className="px-10 py-4 rounded-2xl text-lg font-semibold border transition-all hover:scale-105"
            style={{ borderColor: "var(--border)", background: "var(--surface)", color: "var(--foreground)" }}>
            See features
          </Link>
        </motion.div>

        {/* Hero Board Preview */}
        <motion.div initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.8 }}
          className="relative w-full max-w-5xl rounded-3xl overflow-hidden shadow-2xl border animate-board-entrance"
          style={{ borderColor: "var(--border)", height: "clamp(320px, 45vw, 560px)" }}>
          <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, var(--surface) 0%, var(--background) 50%, var(--surface-2) 100%)` }}>
            {/* Grid */}
            <div className="absolute inset-0 dotted-bg opacity-30" />
            {/* Cards grid */}
            <div className="absolute inset-0 p-8 grid grid-cols-3 gap-5">
              {stickyCards.map((item, index) => (
                <motion.div key={index}
                  initial={{ opacity: 0, scale: 0.7 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: item.delay, type: "spring", stiffness: 200 }}
                  className={`${item.color} rounded-2xl shadow-lg p-4 flex flex-col card-hover border`}
                  style={{ transform: `rotate(${item.rotate})`, borderColor: "rgba(255,255,255,0.3)" }}>
                  <div className="w-full flex-1 rounded-lg mb-3" style={{ background: "rgba(255,255,255,0.4)", minHeight: 60 }} />
                  <div className="h-2 rounded w-3/4 mb-2" style={{ background: "rgba(255,255,255,0.6)" }} />
                  <div className="h-2 rounded w-1/2 mb-3" style={{ background: "rgba(255,255,255,0.6)" }} />
                  <div className={`text-xs font-bold ${item.labelColor}`}>{item.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* ── FEATURES ── */}
      <section id="features" className="py-24 px-6 md:px-12" style={{ background: "var(--surface)" }}>
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}
            className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black mb-4">
              Everything you need to{" "}
              <span className="text-rainbow">think visually</span>
            </h2>
            <p className="text-lg max-w-2xl mx-auto" style={{ color: "var(--muted)" }}>
              Powerful tools to capture, connect and develop your best ideas
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ duration: 0.5, delay: f.delay }}
                whileHover={{ y: -8, rotate: 0.4, transition: { type: "spring", stiffness: 300 } }}
                className="p-8 rounded-2xl border card-hover cursor-default"
                style={{ background: "var(--card-bg)", borderColor: "var(--border)" }}>
                <div className={`w-12 h-12 ${f.bg} rounded-xl flex items-center justify-center mb-5 ${f.color}`}>
                  {f.icon}
                </div>
                <h3 className="text-lg font-bold mb-2">{f.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="py-24 px-6 md:px-12" style={{ background: "var(--background)" }}>
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}
            className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black mb-4">
              How{" "}
              <span className="text-aurora">NextBoard_Sticky</span>{" "}
              works
            </h2>
            <p className="text-lg" style={{ color: "var(--muted)" }}>Three steps to visual clarity</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((s, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ duration: 0.5, delay: s.delay }}
                whileHover={{ scale: 1.04 }}
                className="relative p-8 rounded-3xl border overflow-hidden"
                style={{ background: "var(--card-bg)", borderColor: "var(--border)" }}>
                {/* Background number watermark */}
                <div className={`absolute top-2 right-4 text-8xl font-black bg-gradient-to-r ${s.grad} bg-clip-text text-transparent opacity-10 select-none`}>{s.n}</div>
                <div className={`text-5xl font-black bg-gradient-to-r ${s.grad} bg-clip-text text-transparent mb-4`}>{s.n}</div>
                <h3 className="text-xl font-bold mb-3">{s.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-24 px-6 md:px-12 relative overflow-hidden" style={{ background: "var(--surface-2)" }}>
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-64 h-64 rounded-full blur-3xl opacity-20" style={{ background: "var(--primary)" }} />
          <div className="absolute bottom-0 right-1/4 w-64 h-64 rounded-full blur-3xl opacity-20" style={{ background: "var(--accent)" }} />
        </div>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}
          className="max-w-3xl mx-auto text-center relative">
          <h2 className="text-4xl md:text-5xl font-black mb-6">
            Ready to{" "}
            <span className="text-fire">organise</span>{" "}
            your ideas?
          </h2>
          <p className="text-lg mb-10" style={{ color: "var(--muted)" }}>
            Join creators, developers and teams who use NextBoard_Sticky to think visually and ship faster.
          </p>
          <Link href="/dashboard"
            className="btn-3d bg-teal-500 hover:bg-teal-600 text-white px-12 py-4 rounded-2xl text-xl font-bold inline-flex items-center gap-3 animate-glow">
            Get started for free <ArrowRightIcon size={22} />
          </Link>
        </motion.div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="py-10 px-6 md:px-12 border-t" style={{ background: "var(--background)", borderColor: "var(--border)" }}>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <StickyNoteIcon className="w-5 h-5 text-teal-500" />
            <span className="font-bold text-aurora">NextBoard_Sticky</span>
          </div>
          <p className="text-sm" style={{ color: "var(--muted)" }}>
            © {new Date().getFullYear()} NextBoard_Sticky. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
