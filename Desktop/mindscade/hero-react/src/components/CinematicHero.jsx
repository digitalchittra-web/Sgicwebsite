import { useState, useEffect, useRef } from 'react'
import {
  Search, User, Menu, X,
  ChevronLeft, ChevronRight,
  Zap, Film, Share2, Code, Bot, Wrench, Palette, Brain,
  ArrowRight, ArrowUpRight, Mail, Phone, MapPin,
} from 'lucide-react'

/* ── DATA ───────────────────────────────────────────────────────── */
const NAV_LINKS = [
  { label: 'Services', href: '#services', delay: 100 },
  { label: 'Work',     href: '#work',     delay: 150 },
  { label: 'Process',  href: '#process',  delay: 200 },
  { label: 'Contact',  href: '#contact',  delay: 250 },
]

const SERVICES = [
  { id:1, Icon:Film,    title:'AI Content Creation',        desc:'Scripts, captions, blogs, and newsletters — generated and refined by AI trained on your brand voice. Consistent content, at scale, every time.',             tags:['Instagram','TikTok','Reels'],    color:'#A855F7', glow:'rgba(168,85,247,0.4)',  bg:'rgba(168,85,247,0.09)',  border:'rgba(168,85,247,0.22)' },
  { id:2, Icon:Share2,  title:'Social Media Management',    desc:'Full-service social presence — strategy, scheduling, community engagement, analytics, and measurable audience growth.',                                        tags:['Strategy','Analytics','Growth'], color:'#3B82F6', glow:'rgba(59,130,246,0.4)',  bg:'rgba(59,130,246,0.09)',  border:'rgba(59,130,246,0.22)' },
  { id:3, Icon:Zap,     title:'AI Video & Ad Production',   desc:'High-converting ads and cinematic brand videos produced at scale with generative AI — faster and cheaper than traditional production.',                       tags:['Ads','Reels','YouTube'],          color:'#F59E0B', glow:'rgba(245,158,11,0.4)',  bg:'rgba(245,158,11,0.09)',  border:'rgba(245,158,11,0.22)' },
  { id:4, Icon:Code,    title:'Website & App Development',  desc:'Blazing-fast, conversion-optimised web and mobile experiences built with modern stacks like React, Next.js, and native frameworks.',                          tags:['React','Next.js','Mobile'],       color:'#10B981', glow:'rgba(16,185,129,0.4)',  bg:'rgba(16,185,129,0.09)',  border:'rgba(16,185,129,0.22)' },
  { id:5, Icon:Bot,     title:'AI Automation Solutions',    desc:'Eliminate repetitive tasks with AI-driven workflows that save hours every day — connecting your tools, data, and teams seamlessly.',                           tags:['Zapier','n8n','APIs'],            color:'#6366F1', glow:'rgba(99,102,241,0.4)',  bg:'rgba(99,102,241,0.09)',  border:'rgba(99,102,241,0.22)' },
  { id:6, Icon:Wrench,  title:'Custom AI Tools',            desc:'Bespoke AI assistants, chatbots, and internal tools purpose-built for your business — trained on your data, aligned with your workflow.',                     tags:['GPT','Fine-tuning','RAG'],        color:'#EF4444', glow:'rgba(239,68,68,0.4)',   bg:'rgba(239,68,68,0.09)',   border:'rgba(239,68,68,0.22)'  },
  { id:7, Icon:Palette, title:'Branding & Creative Design', desc:'AI-assisted brand identities, motion graphics, and visual systems that stop the scroll and make your business impossible to forget.',                         tags:['Identity','Motion','UI/UX'],      color:'#EC4899', glow:'rgba(236,72,153,0.4)',  bg:'rgba(236,72,153,0.09)',  border:'rgba(236,72,153,0.22)' },
  { id:8, Icon:Brain,   title:'AI Consulting & Strategy',   desc:'End-to-end AI adoption roadmaps — from opportunity mapping and model selection to team training and production deployment.',                                   tags:['Roadmap','Training','LLMs'],      color:'#14B8A6', glow:'rgba(20,184,166,0.4)',  bg:'rgba(20,184,166,0.09)',  border:'rgba(20,184,166,0.22)' },
]

const STEPS = [
  { n:'01', title:'Discover',       desc:'We understand your business, challenges, and goals to craft the perfect AI strategy.',   Icon: Search  },
  { n:'02', title:'Design',         desc:'We plan and architect the right AI solution tailored precisely for your needs.',          Icon: Palette },
  { n:'03', title:'Develop',        desc:'We build and train models with precision and care for maximum real-world performance.',   Icon: Code    },
  { n:'04', title:'Deploy & Scale', desc:'We ship, monitor, and scale your AI solution for lasting, measurable real-world impact.',Icon: Zap     },
]

const CLIENTS = [
  'SBI','Max Healthcare','Adani','Berger Paints','Jio',
  'AstraZeneca','Flipkart','HDFC Bank','Tata Group','Infosys',
  // duplicate for seamless loop
  'SBI','Max Healthcare','Adani','Berger Paints','Jio',
  'AstraZeneca','Flipkart','HDFC Bank','Tata Group','Infosys',
]

/* ── COMPONENT ──────────────────────────────────────────────────── */
export default function CinematicHero() {
  const [menuOpen, setMenuOpen] = useState(false)

  /* refs */
  const videoRef          = useRef(null)
  const dotRef            = useRef(null)
  const ringRef           = useRef(null)
  const auraRef           = useRef(null)
  const rafRef            = useRef(null)
  const mouse             = useRef({ x: -400, y: -400 })
  const ring              = useRef({ x: -400, y: -400 })
  const aura              = useRef({ x: -400, y: -400 })
  const hue               = useRef(0)
  const hovering          = useRef(false)
  const logoWrapRef       = useRef(null)
  const logoWhiteRef      = useRef(null)
  const logoGlowRef       = useRef(null)

  /* ── VIDEO AUTOPLAY at 0.7× speed ───────────────────────────── */
  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    const set = () => { v.playbackRate = 0.45 }
    v.addEventListener('loadedmetadata', set)
    set()
    return () => v.removeEventListener('loadedmetadata', set)
  }, [])

  /* ── LOGO MASK + GLOW rAF ────────────────────────────────────── */
  useEffect(() => {
    let raf
    let glowPhase = 0
    const loop = () => {
      if (logoWrapRef.current && logoWhiteRef.current && logoGlowRef.current) {
        const rect    = logoWrapRef.current.getBoundingClientRect()
        const lx      = mouse.current.x - rect.left
        const ly      = mouse.current.y - rect.top
        const scrollT = Math.min(1, window.scrollY / (window.innerHeight * 0.35))

        /* white overlay opacity fades with scroll */
        logoWhiteRef.current.style.opacity = String((1 - scrollT).toFixed(3))

        /* hole mask: hard 50px core, soft 20px feather */
        const mask = `radial-gradient(circle at ${lx}px ${ly}px, transparent 0px, transparent 50px, black 70px)`
        logoWhiteRef.current.style.maskImage       = mask
        logoWhiteRef.current.style.WebkitMaskImage = mask

        /* glow layer: animated pulsing halo + radial gradient */
        glowPhase += 0.08
        const pulse = Math.sin(glowPhase) * 0.3 + 0.7  // 0.4 → 1.0
        const glowGrad = `radial-gradient(circle at ${lx}px ${ly}px,
          rgba(167,139,250,${(0.9 * pulse).toFixed(2)}) 0px,
          rgba(96,165,250,${(0.6 * pulse).toFixed(2)}) 30px,
          rgba(52,211,153,${(0.3 * pulse).toFixed(2)}) 80px,
          transparent 140px)`
        logoGlowRef.current.style.background = glowGrad
        logoGlowRef.current.style.opacity = String(Math.max(0.3, scrollT * 0.6 + 0.4).toFixed(2))
      }
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(raf)
  }, [])

  /* ── CURSOR LOOP ─────────────────────────────────────────────── */
  useEffect(() => {
    const onMove = e => { mouse.current.x = e.clientX; mouse.current.y = e.clientY }
    window.addEventListener('mousemove', onMove)

    const onEnter = () => { hovering.current = true }
    const onLeave = () => { hovering.current = false }
    document.querySelectorAll('a,button,[data-hover]').forEach(el => {
      el.addEventListener('mouseenter', onEnter)
      el.addEventListener('mouseleave', onLeave)
    })

    const tick = () => {
      const { x: mx, y: my } = mouse.current
      const rx = ring.current.x  += (mx - ring.current.x)  * 0.14
      const ry = ring.current.y  += (my - ring.current.y)  * 0.14
      const ax = aura.current.x  += (mx - aura.current.x)  * 0.055
      const ay = aura.current.y  += (my - aura.current.y)  * 0.055
      hue.current = (hue.current + 0.9) % 360

      const dot   = dotRef.current
      const ring_ = ringRef.current
      const aura_ = auraRef.current
      if (dot)   dot.style.transform   = `translate(${mx}px,${my}px)`
      if (ring_) {
        const s = hovering.current ? 'scale(2.2)' : 'scale(1)'
        ring_.style.transform  = `translate(${rx}px,${ry}px) ${s}`
        ring_.style.borderColor = `hsl(${hue.current},90%,65%)`
      }
      if (aura_) {
        aura_.style.transform  = `translate(${ax}px,${ay}px)`
        aura_.style.background = `radial-gradient(circle, hsl(${hue.current},100%,62%) 0%, transparent 70%)`
        aura_.style.opacity    = hovering.current ? '0.22' : '0.13'
      }
      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(rafRef.current)
    }
  }, [])

  /* ── SERVICE CARD 3-D TILT ───────────────────────────────────── */
  const handleCardMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width  - 0.5) * 18
    const y = ((e.clientY - rect.top)  / rect.height - 0.5) * 18
    e.currentTarget.style.transform = `perspective(700px) rotateY(${x}deg) rotateX(${-y}deg) scale(1.03)`
  }
  const handleCardLeave = e => {
    e.currentTarget.style.transform = 'perspective(700px) rotateY(0deg) rotateX(0deg) scale(1)'
  }

  /* ── SMOOTH SCROLL helper ────────────────────────────────────── */
  const scrollTo = (href) => {
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  /* ──────────────────────────────────────────────────────────────
     RENDER
  ────────────────────────────────────────────────────────────── */
  return (
    <div className="relative w-full text-white select-none" style={{ background: '#04060c' }}>

      {/* ── FIXED CURSOR ─────────────────────────────────────────── */}
      <div ref={dotRef}  className="cursor-dot"  />
      <div ref={ringRef} className="cursor-ring" />
      <div ref={auraRef} className="cursor-aura" />

      {/* ── FIXED BACKGROUND VIDEO ───────────────────────────────── */}
      <video
        ref={videoRef}
        autoPlay muted loop playsInline
        className="fixed inset-0 w-full h-full object-cover"
        style={{ zIndex: 0 }}
      >
        <source src="/gif.mp4" type="video/mp4" />
      </video>

      {/* ── FIXED BOTTOM BLUR OVERLAY (hero only) ────────────────── */}
      <div className="fixed inset-0 pointer-events-none" style={{
        zIndex: 1,
        backdropFilter: 'blur(22px)', WebkitBackdropFilter: 'blur(22px)',
        maskImage: 'linear-gradient(to top, black 0%, transparent 42%)',
        WebkitMaskImage: 'linear-gradient(to top, black 0%, transparent 42%)',
      }} />

      {/* ══════════════════════════════════════════════
          HERO SECTION
      ══════════════════════════════════════════════ */}
      <section
        id="home"
        className="relative h-screen w-full overflow-hidden"
        style={{ zIndex: 2 }}
      >
        <div className="relative flex flex-col h-full" style={{ zIndex: 10 }}>

          {/* ── NAVBAR ─────────────────────────────────────────── */}
          <nav className="flex items-center justify-between px-4 sm:px-6 md:px-12 py-4 md:py-6">

            {/* Logo — coloured base + white overlay with cursor-hole + animated glow */}
            <div
              ref={logoWrapRef}
              className="animate-blur-fade-up relative inline-block"
              style={{ animationDelay: '0ms' }}
            >
              {/* Layer 1: true brand colours */}
              <img
                src="/logo.png" alt="Mindscade"
                className="h-9 sm:h-11 w-auto object-contain block"
                style={{ filter: 'brightness(1.1) drop-shadow(0 0 8px rgba(167,139,250,0.35))' }}
              />

              {/* Layer 2: white overlay with cursor-hole mask */}
              <img
                ref={logoWhiteRef}
                src="/logo.png" alt="" aria-hidden="true"
                className="h-9 sm:h-11 w-auto object-contain absolute inset-0"
                style={{
                  filter: 'brightness(20) saturate(0)',
                  pointerEvents: 'none',
                  maskImage: 'radial-gradient(circle at -999px -999px, transparent 0px, black 1px)',
                  WebkitMaskImage: 'radial-gradient(circle at -999px -999px, transparent 0px, black 1px)',
                }}
              />

              {/* Layer 3: animated glow halo around cursor */}
              <div
                ref={logoGlowRef}
                className="absolute inset-0 rounded-full pointer-events-none"
                style={{
                  filter: 'blur(12px)',
                  mixBlendMode: 'screen',
                }}
              />
            </div>

            <div className="hidden lg:flex items-center gap-8">
              {NAV_LINKS.map(({ label, href, delay }) => (
                <a key={label} href={href}
                  className="text-sm text-gray-300 hover:text-white transition-colors duration-200 animate-blur-fade-up"
                  style={{ animationDelay: `${delay}ms` }}
                  onClick={e => { e.preventDefault(); scrollTo(href) }}
                >
                  {label}
                </a>
              ))}
            </div>

            <div className="flex items-center gap-2 sm:gap-3">
              <button className="hidden sm:flex items-center gap-2 liquid-glass rounded-full px-4 md:px-6 py-2 text-sm text-white animate-blur-fade-up" style={{ animationDelay: '350ms' }}>
                <Search size={18} /> Search
              </button>
              <button className="hidden sm:flex items-center justify-center w-10 h-10 liquid-glass rounded-full text-white animate-blur-fade-up" style={{ animationDelay: '400ms' }}>
                <User size={18} />
              </button>
              <button
                className="lg:hidden flex items-center justify-center w-10 h-10 liquid-glass rounded-full text-white animate-blur-fade-up"
                style={{ animationDelay: '350ms' }}
                onClick={() => setMenuOpen(v => !v)}
              >
                <span className="relative w-[18px] h-[18px] flex items-center justify-center">
                  <Menu size={18} className={`absolute transition-all duration-500 ease-out ${menuOpen ? 'opacity-0 rotate-180 scale-50' : 'opacity-100 rotate-0 scale-100'}`} />
                  <X    size={18} className={`absolute transition-all duration-500 ease-out ${menuOpen ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-180 scale-50'}`} />
                </span>
              </button>
            </div>
          </nav>

          {/* ── MOBILE MENU ────────────────────────────────────── */}
          <div
            className={`lg:hidden absolute left-0 right-0 z-40 bg-gray-900/95 backdrop-blur-lg border-t border-b border-gray-800 shadow-2xl transition-all duration-500 ease-out ${menuOpen ? 'translate-y-0 opacity-100 pointer-events-auto' : '-translate-y-4 opacity-0 pointer-events-none'}`}
            style={{ top: '72px' }}
          >
            <div className="px-4 py-4 flex flex-col gap-1">
              {NAV_LINKS.map(({ label, href }, i) => (
                <a key={label} href={href}
                  className="py-3 px-3 rounded-lg hover:bg-gray-800/50 text-sm"
                  style={{
                    transform: menuOpen ? 'translateX(0)' : 'translateX(-10px)',
                    opacity: menuOpen ? 1 : 0,
                    transition: `transform 300ms ease-out ${i*50}ms, opacity 300ms ease-out ${i*50}ms`,
                  }}
                  onClick={e => { e.preventDefault(); setMenuOpen(false); scrollTo(href) }}
                >
                  {label}
                </a>
              ))}
            </div>
          </div>

          {/* ── HERO CONTENT ───────────────────────────────────── */}
          <div className="flex-1 flex flex-col justify-end px-4 sm:px-6 md:px-12 pb-8 md:pb-16">
            <div className="flex flex-col md:flex-row items-end gap-8">

              {/* Left */}
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-3 sm:gap-6 mb-6 md:mb-8 text-xs sm:text-sm animate-blur-fade-up" style={{ animationDelay: '300ms' }}>
                  <span className="flex items-center gap-1.5">
                    <Zap size={15} className="text-yellow-400" fill="currentColor" strokeWidth={0} />
                    <span className="font-medium">8 AI Services</span>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-emerald-400 font-medium">Available Now</span>
                  </span>
                  <span className="text-gray-400">Est. 2024</span>
                </div>

                <h1
                  className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-normal mb-4 md:mb-6 leading-none animate-blur-fade-up"
                  style={{ letterSpacing: '-0.04em', animationDelay: '400ms' }}
                >
                  Build Smarter.<br />Create Faster.<br />
                  <span className="hero-gradient">Grow Beyond.</span>
                </h1>

                <p className="text-base sm:text-lg md:text-xl text-gray-400 mb-6 md:mb-12 max-w-2xl animate-blur-fade-up" style={{ animationDelay: '500ms' }}>
                  Mindscade powers your brand with AI-driven content, automation, and strategy —
                  so you can focus on what matters most.
                </p>

                <div className="flex flex-wrap gap-3 sm:gap-4">
                  <button
                    className="flex items-center gap-2 bg-white text-black rounded-full font-medium px-6 sm:px-8 py-2.5 sm:py-3 hover:bg-gray-200 transition-colors duration-200 animate-blur-fade-up"
                    style={{ animationDelay: '600ms' }}
                    onClick={() => scrollTo('#services')}
                  >
                    Explore Services <ArrowRight size={18} />
                  </button>
                  <button
                    className="flex items-center gap-2 liquid-glass rounded-full font-medium text-white px-6 sm:px-8 py-2.5 sm:py-3 animate-blur-fade-up"
                    style={{ animationDelay: '700ms' }}
                    onClick={() => scrollTo('#contact')}
                  >
                    Get Started <ArrowUpRight size={16} />
                  </button>
                </div>
              </div>

              {/* Right: Prev / Next */}
              <div className="flex gap-3 shrink-0">
                <button className="flex items-center gap-2 liquid-glass rounded-full text-white text-sm font-medium px-4 sm:px-6 py-2.5 sm:py-3 animate-blur-fade-up" style={{ animationDelay: '800ms' }}>
                  <ChevronLeft size={18} /> Previous
                </button>
                <button className="flex items-center gap-2 liquid-glass rounded-full text-white text-sm font-medium px-4 sm:px-6 py-2.5 sm:py-3 animate-blur-fade-up" style={{ animationDelay: '900ms' }}>
                  Next <ChevronRight size={18} />
                </button>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          BODY  (solid bg covers fixed video below)
      ══════════════════════════════════════════════ */}
      <div className="relative" style={{ zIndex: 3 }}>

        {/* ── CLIENTS MARQUEE ──────────────────────────────────── */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', borderBottom: '1px solid rgba(255,255,255,0.06)', padding: '40px 0', background: 'rgba(4,6,12,0.60)', backdropFilter: 'blur(6px)', WebkitBackdropFilter: 'blur(6px)' }}>
          <p style={{ textAlign:'center', fontSize:'10px', fontWeight:700, letterSpacing:'4px', textTransform:'uppercase', color:'rgba(255,255,255,0.3)', marginBottom:'24px' }}>
            Trusted by Innovative Companies
          </p>
          <div className="marquee-wrap">
            <div className="marquee-track">
              {CLIENTS.map((c, i) => (
                <div key={i} style={{
                  display:'flex', alignItems:'center', gap:'8px',
                  padding:'7px 20px', borderRadius:'100px', whiteSpace:'nowrap',
                  background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.08)',
                  fontSize:'13px', fontWeight:600, color:'rgba(255,255,255,0.5)',
                }}>
                  <span style={{ width:'6px', height:'6px', borderRadius:'50%', background:'rgba(167,139,250,0.7)', display:'inline-block', flexShrink:0 }} />
                  {c}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── SERVICES SECTION ─────────────────────────────────── */}
        <section id="services" style={{ padding: '100px 0', borderBottom: '1px solid rgba(255,255,255,0.05)', background: 'rgba(4,6,12,0.70)', backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)' }}>
          <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 5%' }}>

            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-end', flexWrap:'wrap', gap:'32px', marginBottom:'64px' }}>
              <div>
                <span style={{ fontSize:'11px', fontWeight:700, letterSpacing:'3px', textTransform:'uppercase', color:'rgba(167,139,250,0.8)', display:'block', marginBottom:'12px' }}>
                  What We Do
                </span>
                <h2 style={{ fontFamily:'Inter,sans-serif', fontSize:'clamp(28px,3.5vw,48px)', fontWeight:300, lineHeight:1.13, letterSpacing:'-0.03em', color:'#f1f5f9' }}>
                  AI Solutions That Solve<br />Real-World Problems
                </h2>
              </div>
              <p style={{ fontSize:'16px', color:'rgba(255,255,255,0.45)', maxWidth:'420px', lineHeight:1.75 }}>
                From automation to analytics, we build custom AI solutions that help businesses work smarter and grow faster.
              </p>
            </div>

            <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(260px, 1fr))', gap:'18px' }}>
              {SERVICES.map(({ id, Icon, title, desc, tags, color, glow, bg, border }) => (
                <div
                  key={id}
                  className="svc-card"
                  data-hover="true"
                  onMouseMove={handleCardMove}
                  onMouseLeave={handleCardLeave}
                  style={{
                    background: bg,
                    border: `1px solid ${border}`,
                    borderRadius: '16px',
                    padding: '28px 24px',
                  }}
                >
                  {/* Icon */}
                  <div style={{
                    display:'flex', alignItems:'center', justifyContent:'center',
                    width:'48px', height:'48px', borderRadius:'12px', marginBottom:'20px',
                    background:`${color}18`, border:`1px solid ${color}30`,
                  }}>
                    <Icon size={22} style={{ color }} />
                  </div>

                  <h3 style={{ fontSize:'16px', fontWeight:600, color:'#f1f5f9', marginBottom:'10px', lineHeight:1.3 }}>{title}</h3>
                  <p  style={{ fontSize:'13.5px', color:'rgba(255,255,255,0.42)', lineHeight:1.72, marginBottom:'18px' }}>{desc}</p>

                  {/* Tags */}
                  <div style={{ display:'flex', flexWrap:'wrap', gap:'6px', marginBottom:'20px' }}>
                    {tags.map(t => (
                      <span key={t} style={{
                        fontSize:'11px', fontWeight:600, padding:'3px 10px', borderRadius:'100px',
                        background:`${color}15`, color, border:`1px solid ${color}28`,
                      }}>{t}</span>
                    ))}
                  </div>

                  {/* Arrow */}
                  <div style={{ display:'flex', alignItems:'center', gap:'6px', fontSize:'13px', fontWeight:600, color }}>
                    Explore <ArrowRight size={14} />
                  </div>

                  {/* Glow overlay */}
                  <div className="svc-glow" style={{
                    position:'absolute', inset:0, borderRadius:'16px', pointerEvents:'none',
                    boxShadow:`0 0 42px 0 ${glow}`, opacity:0,
                  }} />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── PROCESS SECTION ──────────────────────────────────── */}
        <section id="work" style={{ padding: '100px 0', borderBottom: '1px solid rgba(255,255,255,0.05)', background: 'rgba(4,6,12,0.75)', backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)' }}>
          <div style={{ maxWidth:'1100px', margin:'0 auto', padding:'0 5%' }}>

            <div style={{ textAlign:'center', marginBottom:'72px' }}>
              <span style={{ fontSize:'11px', fontWeight:700, letterSpacing:'3px', textTransform:'uppercase', color:'rgba(96,165,250,0.8)', display:'block', marginBottom:'12px' }}>
                How We Work
              </span>
              <h2 id="process" style={{ fontFamily:'Inter,sans-serif', fontSize:'clamp(28px,3.5vw,48px)', fontWeight:300, lineHeight:1.13, letterSpacing:'-0.03em', color:'#f1f5f9' }}>
                Our Proven 4-Step Process
              </h2>
            </div>

            <div style={{ display:'grid', gridTemplateColumns:'repeat(4, 1fr)', gap:'32px', position:'relative' }}>
              <div className="process-line hidden md:block" />

              {STEPS.map(({ n, title, desc, Icon }, i) => (
                <div key={n} style={{ textAlign:'center', padding:'0 12px' }}>
                  <div style={{
                    width:'88px', height:'88px', borderRadius:'50%', margin:'0 auto 28px',
                    border:'1px solid rgba(255,255,255,0.1)',
                    background:'rgba(255,255,255,0.03)',
                    display:'flex', alignItems:'center', justifyContent:'center',
                    position:'relative', color:'rgba(167,139,250,0.9)',
                    transition:'all 0.3s ease',
                  }}
                    onMouseEnter={e => { e.currentTarget.style.background='rgba(167,139,250,0.12)'; e.currentTarget.style.borderColor='rgba(167,139,250,0.4)' }}
                    onMouseLeave={e => { e.currentTarget.style.background='rgba(255,255,255,0.03)'; e.currentTarget.style.borderColor='rgba(255,255,255,0.1)' }}
                  >
                    <Icon size={30} />
                    <span style={{
                      position:'absolute', top:'-6px', right:'-6px',
                      width:'24px', height:'24px', borderRadius:'50%',
                      background:'linear-gradient(135deg,#a78bfa,#60a5fa)',
                      fontSize:'10px', fontWeight:800,
                      display:'flex', alignItems:'center', justifyContent:'center',
                    }}>{n}</span>
                  </div>
                  <h3 style={{ fontSize:'17px', fontWeight:600, color:'#f1f5f9', marginBottom:'10px' }}>{title}</h3>
                  <p  style={{ fontSize:'13.5px', color:'rgba(255,255,255,0.42)', lineHeight:1.7 }}>{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA SECTION ──────────────────────────────────────── */}
        <section id="contact" style={{
          padding:'110px 5%', textAlign:'center', position:'relative', overflow:'hidden',
          background:'rgba(8,11,22,0.82)',
          backdropFilter:'blur(14px)', WebkitBackdropFilter:'blur(14px)',
          borderBottom:'1px solid rgba(255,255,255,0.05)',
        }}>
          {/* ambient glow */}
          <div style={{
            position:'absolute', top:'50%', left:'50%', transform:'translate(-50%,-50%)',
            width:'700px', height:'700px', borderRadius:'50%',
            background:'radial-gradient(ellipse, rgba(99,102,241,0.12) 0%, transparent 65%)',
            pointerEvents:'none',
          }} />

          <div style={{ position:'relative', zIndex:1, maxWidth:'640px', margin:'0 auto' }}>
            <span style={{ fontSize:'11px', fontWeight:700, letterSpacing:'3px', textTransform:'uppercase', color:'rgba(52,211,153,0.8)', display:'block', marginBottom:'20px' }}>
              Ready to Start?
            </span>
            <h2 style={{ fontFamily:'Inter,sans-serif', fontSize:'clamp(32px,4vw,56px)', fontWeight:300, lineHeight:1.1, letterSpacing:'-0.035em', color:'#f1f5f9', marginBottom:'18px' }}>
              Let's Build the Future<br /><span className="hero-gradient">Together</span>
            </h2>
            <p style={{ fontSize:'17px', color:'rgba(255,255,255,0.5)', lineHeight:1.75, marginBottom:'44px' }}>
              Have a project in mind? Let's turn your ideas into intelligent solutions that drive real impact.
            </p>
            <div style={{ display:'flex', gap:'16px', justifyContent:'center', flexWrap:'wrap' }}>
              <a
                href="mailto:hello@mindscade.ai"
                style={{
                  display:'inline-flex', alignItems:'center', gap:'10px',
                  background:'white', color:'#04060c',
                  padding:'14px 36px', borderRadius:'100px',
                  fontSize:'15px', fontWeight:700,
                  transition:'all 0.2s',
                  textDecoration:'none',
                }}
                onMouseEnter={e => { e.currentTarget.style.transform='translateY(-2px)'; e.currentTarget.style.boxShadow='0 16px 48px rgba(0,0,0,0.5)' }}
                onMouseLeave={e => { e.currentTarget.style.transform=''; e.currentTarget.style.boxShadow='' }}
              >
                Get In Touch <ArrowRight size={18} />
              </a>
              <a
                href="https://www.instagram.com/mindscade/"
                target="_blank" rel="noopener noreferrer"
                className="liquid-glass"
                style={{
                  display:'inline-flex', alignItems:'center', gap:'10px',
                  padding:'14px 36px', borderRadius:'100px',
                  fontSize:'15px', fontWeight:600, color:'white',
                  textDecoration:'none',
                }}
              >
                View Our Work
              </a>
            </div>
          </div>
        </section>

        {/* ── FOOTER ───────────────────────────────────────────── */}
        <footer style={{ padding:'80px 5% 36px', background:'rgba(2,4,8,0.94)', backdropFilter:'blur(16px)', WebkitBackdropFilter:'blur(16px)' }}>
          <div style={{
            maxWidth:'1280px', margin:'0 auto',
            display:'grid', gridTemplateColumns:'1.8fr 1fr 1fr 1fr 1.4fr',
            gap:'48px', paddingBottom:'60px',
            borderBottom:'1px solid rgba(255,255,255,0.07)',
            marginBottom:'36px',
          }}
            className="footer-grid"
          >
            {/* Brand */}
            <div>
              <img src="/logo.png" alt="Mindscade"
                style={{ height:'40px', width:'auto', marginBottom:'18px', display:'block',
                  filter:'brightness(1.1) drop-shadow(0 0 8px rgba(167,139,250,0.4))' }}
              />
              <p style={{ fontSize:'14px', color:'rgba(255,255,255,0.38)', lineHeight:1.75, marginBottom:'28px' }}>
                Mindscade AI builds intelligent solutions that empower businesses to automate, analyze, and accelerate like never before.
              </p>
              {/* Social */}
              <div style={{ display:'flex', gap:'10px' }}>
                {[
                  { href:'https://www.instagram.com/mindscade/', label:'Instagram', path:'M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5A4.25 4.25 0 0 0 7.75 20.5h8.5A4.25 4.25 0 0 0 20.5 16.25v-8.5A4.25 4.25 0 0 0 16.25 3.5zm4.25 3.25a5.25 5.25 0 1 1 0 10.5 5.25 5.25 0 0 1 0-10.5zm0 1.5a3.75 3.75 0 1 0 0 7.5 3.75 3.75 0 0 0 0-7.5zM17 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z' },
                  { href:'https://np.linkedin.com/in/mindscade-ai-016848372', label:'LinkedIn', path:'M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zm-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93zM6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68zm1.39 9.94v-8.37H5.5v8.37z' },
                  { href:'mailto:hello@mindscade.ai', label:'Email', path:'M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z' },
                ].map(({ href, label, path }) => (
                  <a key={label} href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer"
                    aria-label={label}
                    style={{
                      width:'38px', height:'38px', borderRadius:'10px',
                      background:'rgba(255,255,255,0.05)', border:'1px solid rgba(255,255,255,0.08)',
                      display:'flex', alignItems:'center', justifyContent:'center',
                      color:'rgba(255,255,255,0.55)', transition:'all 0.25s',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.background='rgba(167,139,250,0.2)'; e.currentTarget.style.color='#a78bfa'; e.currentTarget.style.borderColor='rgba(167,139,250,0.4)'; e.currentTarget.style.transform='translateY(-2px)' }}
                    onMouseLeave={e => { e.currentTarget.style.background='rgba(255,255,255,0.05)'; e.currentTarget.style.color='rgba(255,255,255,0.55)'; e.currentTarget.style.borderColor='rgba(255,255,255,0.08)'; e.currentTarget.style.transform='' }}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d={path}/></svg>
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <FooterCol title="Quick Links" links={[
              { label:'Home',        href:'#home' },
              { label:'About Us',    href:'#about' },
              { label:'Services',    href:'#services' },
              { label:'Case Studies',href:'#work' },
              { label:'Process',     href:'#process' },
              { label:'Contact',     href:'#contact' },
            ]} onNav={scrollTo} />

            {/* Services */}
            <FooterCol title="Services" links={[
              { label:'AI Content Creation',    href:'#services' },
              { label:'Social Media Mgmt',      href:'#services' },
              { label:'AI Video & Ads',         href:'#services' },
              { label:'Web & App Dev',          href:'#services' },
              { label:'AI Automation',          href:'#services' },
              { label:'Custom AI Tools',        href:'#services' },
            ]} onNav={scrollTo} />

            {/* Industries */}
            <FooterCol title="Industries" links={[
              { label:'Healthcare', href:'#' },
              { label:'Finance',    href:'#' },
              { label:'Retail',     href:'#' },
              { label:'Manufacturing', href:'#' },
              { label:'Logistics',  href:'#' },
              { label:'Education',  href:'#' },
            ]} onNav={scrollTo} />

            {/* Contact */}
            <div>
              <h5 style={{ fontSize:'11px', fontWeight:700, letterSpacing:'2.5px', textTransform:'uppercase', color:'rgba(255,255,255,0.3)', marginBottom:'20px' }}>Contact</h5>
              {[
                { Icon: Mail,    text: 'hello@mindscade.ai' },
                { Icon: Phone,   text: '+91 78920 07842' },
                { Icon: MapPin,  text: 'Kolkata, India' },
              ].map(({ Icon, text }) => (
                <div key={text} style={{ display:'flex', alignItems:'flex-start', gap:'10px', marginBottom:'12px', fontSize:'13.5px', color:'rgba(255,255,255,0.45)' }}>
                  <Icon size={15} style={{ flexShrink:0, marginTop:'2px', color:'rgba(167,139,250,0.7)' }} />
                  {text}
                </div>
              ))}
            </div>
          </div>

          {/* Bottom bar */}
          <div style={{ maxWidth:'1280px', margin:'0 auto', display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:'12px', fontSize:'12px', color:'rgba(255,255,255,0.22)' }}>
            <span>© 2024 Mindscade AI. All rights reserved.</span>
            <span>Built with passion in Kolkata, India</span>
          </div>
        </footer>

      </div>{/* end body wrapper */}
    </div>
  )
}

/* ── FOOTER COLUMN helper ───────────────────────────────────────── */
function FooterCol({ title, links, onNav }) {
  return (
    <div>
      <h5 style={{ fontSize:'11px', fontWeight:700, letterSpacing:'2.5px', textTransform:'uppercase', color:'rgba(255,255,255,0.3)', marginBottom:'20px' }}>{title}</h5>
      <ul style={{ listStyle:'none' }}>
        {links.map(({ label, href }) => (
          <li key={label} style={{ marginBottom:'10px' }}>
            <a
              href={href}
              style={{ fontSize:'13.5px', color:'rgba(255,255,255,0.45)', textDecoration:'none', transition:'color 0.2s' }}
              onMouseEnter={e => { e.currentTarget.style.color='rgba(167,139,250,0.9)' }}
              onMouseLeave={e => { e.currentTarget.style.color='rgba(255,255,255,0.45)' }}
              onClick={e => { if (href.startsWith('#')) { e.preventDefault(); onNav(href) } }}
            >
              {label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}
