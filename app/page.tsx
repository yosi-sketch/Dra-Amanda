"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import { motion, type Variants } from "framer-motion";
import {
  Scale,
  Shield,
  Gavel,
  CheckCircle2,
  Phone,
  Mail,
  MapPin,
  Star,
  Quote,
  ArrowRight,
  Sparkles,
  ChevronRight,
  Building2,
  Users,
} from "lucide-react";

function InstagramIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

// Dynamically import Three.js canvas to prevent SSR issues
const LadyJusticeCanvas = dynamic(() => import("./components/LadyJusticeCanvas"), {
  ssr: false,
  loading: () => null,
});

import GlowingButton from "./components/GlowingButton";

const HIGHLIGHTS = [
  {
    icon: <Scale className="w-7 h-7 sm:w-8 sm:h-8 text-blue-400" strokeWidth={1.5} />,
    title: "TÉCNICA E FIRMEZA",
    description: "Rigor processual e estratégia analítica para soluções de alta complexidade",
  },
  {
    icon: <Shield className="w-7 h-7 sm:w-8 sm:h-8 text-blue-400" strokeWidth={1.5} />,
    title: "ATUAÇÃO EM TODO O BRASIL",
    description: "Representação ágil e combativa em comarcas, tribunais estaduais e superiores",
  },
  {
    icon: <Gavel className="w-7 h-7 sm:w-8 sm:h-8 text-blue-400" strokeWidth={1.5} />,
    title: "ATENDIMENTO DIRETO",
    description: "Contato direto com o advogado titular, com sigilo e transparência absoluta",
  },
];

const REVIEWS = [
  {
    author: "Junio Magalhaes",
    time: "4 meses atrás",
    rating: 5,
    text: "Profissional dedicado e resiliente, sempre tratando o cliente com simplicidade e empatia. Destaca-se pela sua capacidade de solucionar problemas técnicos e processuais, demonstrando um trabalho ético e de qualidade. Além disso, demonstrou uma habilidade excepcional de aplicar soluções criativas para problemas mais complexos, obtendo credibilidade. Recomendo sempre.",
    tag: "Atendimento Estratégico",
  },
  {
    author: "Diego Luiz",
    time: "4 meses atrás",
    rating: 5,
    text: "Desde o primeiro contato até a resolução do meu caso o Dr Matheus foi extremamente prestativo e atencioso. Me esclareceu as dúvidas e conduziu meu caso de forma profissional, ética e coesa. Indico e recomendo o trabalho do seu escritório.",
    tag: "Condução Ética e Coesa",
  },
  {
    author: "Eduarda Vargas",
    time: "4 meses atrás",
    rating: 5,
    text: "Excelente profissional/empresa! Fui muito bem atendido(a) desde o primeiro contato. A equipe é extremamente competente e atenciosa, sempre disposta a ajudar e esclarecer todas as dúvidas. Super recomendo a todos que buscam um profissional de confiança e excelência. Parabéns pelo excelente trabalho!",
    tag: "Confiança e Excelência",
  },
  {
    author: "Leonardo Almeida",
    time: "4 meses atrás",
    rating: 5,
    text: "O Dr. Matheus é um excelente advogado, extremamente profissional, com alto grau de conhecimento, proativo e sempre disposto a ajudar o cliente. Ele é um advogado acima da média, tive a experiência de contratar outros advogados e nenhum possui o conhecimento e a clareza do Dr. Matheus e ainda sabe conversar com as pessoas que não são da área, explicando detalhe por detalhe sem utilizar os termos técnicos, agindo de forma sincera e com honestidade. Super indico!!",
    tag: "Clareza Sem Juridiquês",
  },
  {
    author: "Vava Calisto",
    time: "4 meses atrás",
    rating: 5,
    text: "Ele atuou na demanda da minha empresa, em um processo licitatório onde eu estava injustamente inabilitado, ele atuou de forma absoluta, onde ganhamos a licitação do município onde estávamos participando.",
    tag: "Vitória em Licitação Pública",
  },
  {
    author: "Wander Tavares",
    time: "4 meses atrás",
    rating: 5,
    text: "Profissional qualificado, competente e atualizado no meio jurídico, muito conhecido e respeitado por sua ética e profissionalismo, super recomendo.",
    tag: "Ética e Profissionalismo",
  },
];

const highlightCardVariants: Variants = {
  hidden: { opacity: 0, y: 45, scale: 0.96 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.75,
      delay: i * 0.16,
      ease: [0.215, 0.61, 0.355, 1] as const,
      staggerChildren: 0.12,
      delayChildren: i * 0.16 + 0.1,
    },
  }),
};

const highlightItemVariants: Variants = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.215, 0.61, 0.355, 1] as const,
    },
  },
};

const highlightLineVariants: Variants = {
  hidden: { opacity: 0, scaleX: 0, originX: 0 },
  visible: {
    opacity: 1,
    scaleX: 1,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
};

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    telefone: "",
    descricao: "",
  });
  const [activeModal, setActiveModal] = useState<string | null>(null);

  // Scroll Progress Tracking for 3D Statue & Second Fold
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [exitOffset, setExitOffset] = useState(0);
  const [statueOpacity, setStatueOpacity] = useState(1);

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const filosofiaEl = document.getElementById("filosofia");

      if (filosofiaEl) {
        const rect = filosofiaEl.getBoundingClientRect();
        const filosofiaTopDoc = window.scrollY + rect.top;
        const targetScrollEnd = Math.max(1, filosofiaTopDoc - windowHeight * 0.25);
        const progress = Math.min(Math.max(window.scrollY / targetScrollEnd, 0), 1);
        setScrollProgress(progress);

        if (rect.bottom < windowHeight) {
          const diff = windowHeight - rect.bottom;
          setExitOffset(diff);
          const op = Math.max(0, 1 - diff / 350);
          setStatueOpacity(op);
        } else {
          setExitOffset(0);
          setStatueOpacity(1);
        }
      } else {
        const scrollY = window.scrollY;
        const progress = Math.min(Math.max(scrollY / (windowHeight * 0.85), 0), 1);
        setScrollProgress(progress);
        setExitOffset(0);
        setStatueOpacity(1);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);

    // Optional direct redirect/open to WhatsApp with pre-filled message
    const whatsappMessage = encodeURIComponent(
      `Olá, Dr. Matheus! Meu nome é ${formData.nome}. Gostaria de uma consultoria jurídica. Telefone: ${formData.telefone}. Caso: ${formData.descricao || "Não informado"}`
    );
    const waUrl = `https://wa.me/5531974006704?text=${whatsappMessage}`;
    
    // Automatically trigger WhatsApp after subtle delay or allow user to click
    setTimeout(() => {
      window.open(waUrl, "_blank");
    }, 1200);

    setTimeout(() => {
      setFormSubmitted(false);
      setFormData({ nome: "", email: "", telefone: "", descricao: "" });
    }, 4500);
  };

  const whatsappDirectUrl =
    "https://wa.me/5531974006704?text=" +
    encodeURIComponent("Olá, Dr. Matheus Ferreira! Gostaria de agendar uma consulta jurídica.");

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen bg-[#07090e] text-[#f1f5f9] overflow-x-clip selection:bg-[#2563eb] selection:text-white"
    >
      {/* 1. Persistent 3D Lady Justice Canvas (Fixed Layer, active in Hero & Filosofia, desktop only) */}
      <div className="hidden lg:block">
        <LadyJusticeCanvas
          scrollProgress={scrollProgress}
          exitOffset={exitOffset}
          opacity={statueOpacity}
        />
      </div>

      {/* 2. Top Header / Navigation */}
      <header className="sticky top-0 z-40 w-full border-b border-white/10 bg-[#07090e]/92 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-22 lg:h-26 flex items-center justify-between gap-4">
          {/* Logo / Brand Name (25% maior) */}
          <a href="#" className="flex items-center gap-3.5 group shrink-0 py-2">
            <div className="relative flex items-center justify-center h-13 sm:h-15 lg:h-16 w-auto shrink-0">
              <img
                src="/logo_semfundo.png"
                alt="Matheus Ferreira Escritório de Advocacia"
                className="h-11 sm:h-13 lg:h-15 w-auto object-contain filter brightness-0 invert drop-shadow-[0_2px_14px_rgba(255,255,255,0.3)] group-hover:opacity-95 transition-all duration-300"
              />
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-4 xl:gap-6 2xl:gap-7">
            <a
              href="#inicio"
              className="text-[11px] xl:text-xs font-semibold uppercase tracking-[0.16em] text-blue-400 relative py-1 after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-blue-500 whitespace-nowrap"
            >
              INÍCIO
            </a>
            <a
              href="#filosofia"
              className="text-[11px] xl:text-xs font-medium uppercase tracking-[0.16em] text-zinc-300 hover:text-white transition-colors whitespace-nowrap"
            >
              FILOSOFIA
            </a>
            <a
              href="#conduta"
              className="text-[11px] xl:text-xs font-medium uppercase tracking-[0.16em] text-zinc-300 hover:text-white transition-colors whitespace-nowrap"
            >
              POSICIONAMENTO
            </a>
            <a
              href="#advogado"
              className="text-[11px] xl:text-xs font-medium uppercase tracking-[0.16em] text-zinc-300 hover:text-white transition-colors whitespace-nowrap"
            >
              O ADVOGADO
            </a>
            <a
              href="#avaliacoes"
              className="text-[11px] xl:text-xs font-medium uppercase tracking-[0.16em] text-zinc-300 hover:text-white transition-colors whitespace-nowrap flex items-center gap-1.5"
            >
              <span>AVALIAÇÕES</span>
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
            </a>
            <button
              onClick={() => setActiveModal("areas")}
              className="text-[11px] xl:text-xs font-medium uppercase tracking-[0.16em] text-zinc-300 hover:text-white transition-colors cursor-pointer whitespace-nowrap"
            >
              ÁREAS DE ATUAÇÃO
            </button>
            <button
              onClick={() => setActiveModal("contato")}
              className="text-[11px] xl:text-xs font-medium uppercase tracking-[0.16em] text-zinc-300 hover:text-white transition-colors cursor-pointer whitespace-nowrap"
            >
              CONTATO
            </button>
          </nav>

          {/* Top Right Header CTA Button */}
          <div className="hidden lg:flex items-center gap-2.5 shrink-0">
            <a
              href="https://www.instagram.com/adv_matheusferreira/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-[12px] bg-[#0c1017] hover:bg-[#141b27] border border-white/10 hover:border-pink-500/50 flex items-center justify-center text-zinc-400 hover:text-pink-400 transition-all shadow-sm group"
              aria-label="Instagram @adv_matheusferreira"
              title="Instagram Oficial @adv_matheusferreira"
            >
              <InstagramIcon className="w-4 h-4 group-hover:scale-110 transition-transform" />
            </a>
            <a
              href={whatsappDirectUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-[12px] bg-blue-950/60 hover:bg-blue-900/80 border border-blue-600/40 text-blue-300 hover:text-white text-xs font-medium tracking-wide transition-all shadow-sm"
            >
              <Phone className="w-3.5 h-3.5 text-blue-400" />
              <span>(31) 97400-6704</span>
            </a>
            <GlowingButton href="#consultoria" size="sm">
              Agendar Consulta
            </GlowingButton>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2.5 text-zinc-300 hover:text-white rounded-lg border border-white/10 bg-[#0c1017]"
            aria-label="Abrir Menu"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#07090e]/98 border-b border-white/10 px-6 py-6 space-y-4 backdrop-blur-2xl animate-in slide-in-from-top duration-200">
            <a
              href="#inicio"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-xs font-semibold tracking-[0.18em] uppercase text-blue-400"
            >
              INÍCIO
            </a>
            <a
              href="#filosofia"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-xs font-medium tracking-[0.18em] uppercase text-zinc-300 hover:text-white"
            >
              FILOSOFIA
            </a>
            <a
              href="#conduta"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-xs font-medium tracking-[0.18em] uppercase text-zinc-300 hover:text-white"
            >
              POSICIONAMENTO
            </a>
            <a
              href="#advogado"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-xs font-medium tracking-[0.18em] uppercase text-zinc-300 hover:text-white"
            >
              O ADVOGADO
            </a>
            <a
              href="#avaliacoes"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-xs font-medium tracking-[0.18em] uppercase text-zinc-300 hover:text-white"
            >
              AVALIAÇÕES (5.0 ★)
            </a>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setActiveModal("areas");
              }}
              className="block w-full text-left text-xs font-medium tracking-[0.18em] uppercase text-zinc-300 hover:text-white"
            >
              ÁREAS DE ATUAÇÃO
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setActiveModal("contato");
              }}
              className="block w-full text-left text-xs font-medium tracking-[0.18em] uppercase text-zinc-300 hover:text-white"
            >
              CONTATO
            </button>
            <div className="pt-2 flex flex-col gap-3">
              <a
                href={whatsappDirectUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-3 rounded-xl bg-blue-950/60 border border-blue-500/40 text-blue-300 text-xs font-semibold uppercase tracking-wider"
              >
                <Phone className="w-4 h-4 text-blue-400" />
                <span>WhatsApp: (31) 97400-6704</span>
              </a>
              <a
                href="https://www.instagram.com/adv_matheusferreira/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-3 rounded-xl bg-[#0c1017] border border-white/10 text-zinc-300 hover:text-white text-xs font-semibold uppercase tracking-wider"
              >
                <InstagramIcon className="w-4 h-4 text-pink-400" />
                <span>Instagram: @adv_matheusferreira</span>
              </a>
              <GlowingButton
                href="#consultoria"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full"
              >
                Agendar Consulta
              </GlowingButton>
            </div>
          </div>
        )}
      </header>

      {/* 3. FIRST FOLD: Hero Section */}
      <div className="relative">
        {/* Background Layer: Cinematic Library strictly confined to Hero */}
        <div className="pointer-events-none absolute -top-24 inset-x-0 bottom-0 z-0 overflow-hidden">
          <div className="absolute inset-0 scale-105 filter blur-[3px] brightness-[0.78] contrast-[1.10] saturate-[0.9] transform-gpu">
            <Image
              src="/biblioteca-background.webp"
              alt="Ambiente Jurídico Executivo"
              fill
              priority
              className="object-cover object-center"
              sizes="100vw"
              quality={75}
            />
          </div>

          {/* Left-Side Localized Reading Shadow */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_45%,rgba(7,9,14,0.94)_0%,rgba(7,9,14,0.72)_48%,transparent_80%)]" />

          {/* Outer Vignette */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(7,9,14,0.50)_75%,rgba(7,9,14,0.95)_100%)]" />

          {/* Seamless Header & Bottom Fade into deep dark obsidian */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#07090e]/80 via-transparent via-45% to-[#07090e]" />

          {/* Ambient Sapphire Glow */}
          <div className="absolute top-1/4 left-1/4 h-[440px] w-[520px] rounded-full bg-blue-600/12 blur-[140px]" />
        </div>

        <section
          id="inicio"
          className="relative z-20 min-h-[calc(100vh-5rem)] flex flex-col justify-start lg:justify-between max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-10 lg:pt-12 pb-10"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start lg:items-center flex-1 lg:my-auto">
            {/* Left Column: Headlines & Action CTAs */}
            <div className="lg:col-span-6 flex flex-col justify-start lg:justify-center space-y-4 sm:space-y-6 lg:space-y-7 pointer-events-auto">
              {/* Kicker Badge */}
              <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#0c121d]/90 border border-blue-500/35 w-fit shadow-sm">
                <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
                <span className="text-xs font-semibold tracking-[0.22em] text-blue-300 uppercase">
                  ADVOCACIA EMPRESARIAL & CRIMINAL
                </span>
              </div>

              {/* Main Headline */}
              <h1 className="flex flex-col">
                <span className="font-serif text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-medium tracking-tight text-white leading-[1.12]">
                  Soluções Jurídicas com
                </span>
                <span className="font-serif text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-semibold tracking-tight bg-gradient-to-r from-blue-300 via-blue-400 to-sky-200 bg-clip-text text-transparent leading-[1.12] mt-1 drop-shadow-[0_2px_14px_rgba(37,99,235,0.4)]">
                  Técnica, Firmeza e Estratégia
                </span>
              </h1>

              {/* Supporting Text */}
              <p className="text-zinc-300 text-base sm:text-lg lg:text-xl font-light leading-relaxed max-w-xl">
                Assessoria e consultoria jurídica de alta precisão para pessoas e empresas. Atuação combativa e estratégica em todo o Brasil para blindar seus interesses e seu patrimônio.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 pt-1">
                <GlowingButton href="#consultoria" size="md" className="w-full sm:w-auto py-3.5 text-xs tracking-[0.16em]">
                  Solicitar Análise de Caso
                </GlowingButton>
                <a
                  href={whatsappDirectUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative inline-flex items-center justify-center rounded-[15px] font-semibold uppercase bg-[#0c121d] hover:bg-[#141e30] backdrop-blur-md text-zinc-200 hover:text-white border border-white/10 hover:border-blue-500/60 px-7 py-3.5 text-xs tracking-[0.16em] transition-all duration-300 text-center cursor-pointer shadow-[0_4px_18px_rgba(0,0,0,0.5)] w-full sm:w-auto gap-2"
                >
                  <Phone className="w-4 h-4 text-blue-400 group-hover:scale-110 transition-transform" />
                  <span>Falar no WhatsApp</span>
                </a>
              </div>

              {/* Credentials Line */}
              <div className="flex items-center gap-3 text-xs text-zinc-400 pt-1">
                <div className="h-px w-8 bg-blue-500/60" />
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" />
                  Atuação em âmbito nacional • Belo Horizonte - MG
                </span>
              </div>
            </div>

            {/* Spacer Column in Center for 3D Statue View */}
            <div className="hidden lg:block lg:col-span-1" />

            {/* Right Column: Request a Consultation Form Card */}
            <div id="consultoria" className="lg:col-span-5 relative pointer-events-auto group mt-4 lg:mt-0">
              <div className="relative rounded-2xl bg-[#0c1017]/95 backdrop-blur-2xl border border-white/10 hover:border-blue-500/50 p-6 sm:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.85)] transition-all">
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="inline-block px-2.5 py-0.5 rounded-full bg-blue-950/80 border border-blue-500/40 text-[10px] font-semibold tracking-[0.2em] text-blue-300 uppercase">
                      ATENDIMENTO DIRETO
                    </span>
                    <span className="text-[11px] text-zinc-400 font-medium">Belo Horizonte / Nacional</span>
                  </div>
                  <h2 className="font-serif text-2xl sm:text-3xl font-bold tracking-wide text-white uppercase">
                    SOLICITAR CONSULTORIA
                  </h2>
                  <p className="text-zinc-400 text-xs sm:text-sm mt-1.5 leading-relaxed font-light">
                    Receba uma análise jurídica especializada e confidencial para o seu caso.
                  </p>
                </div>

                {formSubmitted ? (
                  <div className="py-10 text-center space-y-3 bg-[#0d1422] border border-blue-500/50 rounded-xl p-6 animate-in fade-in zoom-in-95 duration-300">
                    <div className="w-14 h-14 rounded-full bg-blue-600/20 border border-blue-500/60 flex items-center justify-center mx-auto text-blue-400 p-3 shadow-lg">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <h3 className="font-serif text-lg font-bold text-white">Solicitação Recebida!</h3>
                    <p className="text-xs text-zinc-300 leading-relaxed max-w-xs mx-auto">
                      Redirecionando para atendimento direto no WhatsApp com o Dr. Matheus Ferreira...
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-3.5">
                    <div>
                      <label htmlFor="nome" className="sr-only">Nome Completo</label>
                      <input
                        id="nome"
                        type="text"
                        required
                        placeholder="Nome Completo"
                        value={formData.nome}
                        onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-[#06080d] border border-white/10 text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="sr-only">E-mail</label>
                      <input
                        id="email"
                        type="email"
                        required
                        placeholder="E-mail"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-[#06080d] border border-white/10 text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                      />
                    </div>

                    <div>
                      <label htmlFor="telefone" className="sr-only">Telefone / WhatsApp</label>
                      <input
                        id="telefone"
                        type="tel"
                        required
                        placeholder="Telefone / WhatsApp com DDD"
                        value={formData.telefone}
                        onChange={(e) => setFormData({ ...formData, telefone: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-[#06080d] border border-white/10 text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                      />
                    </div>

                    <div>
                      <label htmlFor="descricao" className="sr-only">Breve Descrição</label>
                      <textarea
                        id="descricao"
                        rows={3}
                        placeholder="Breve descrição do seu caso ou necessidade (Confidencial)"
                        value={formData.descricao}
                        onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-[#06080d] border border-white/10 text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3.5 rounded-xl bg-gradient-to-r from-blue-700 via-blue-600 to-blue-500 hover:from-blue-600 hover:to-blue-400 text-white font-semibold text-xs tracking-[0.2em] uppercase transition-all duration-200 shadow-[0_4px_18px_rgba(37,99,235,0.45)] hover:shadow-[0_6px_24px_rgba(37,99,235,0.6)] active:scale-[0.99] border border-blue-400/40 cursor-pointer flex items-center justify-center gap-2"
                    >
                      <span>ENVIAR SOLICITAÇÃO</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>

                    <div className="pt-1 flex items-center justify-center gap-2 text-[11px] text-zinc-400">
                      <Shield className="w-3.5 h-3.5 text-blue-400" />
                      <span>Sigilo profissional e confidencialidade resguardados pela OAB</span>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>

          {/* Scroll down prompt */}
          <div className="pt-8 pb-2 flex justify-center items-center gap-2 text-xs text-zinc-400">
            <span className="tracking-widest uppercase text-[10px]">Role para conhecer a atuação</span>
            <svg className="w-4 h-4 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </section>
      </div>

      {/* 4. Bottom Highlights Bar (3 Highlights) */}
      <section className="relative z-20 w-full border-t border-b border-white/10 bg-[#06080d]/80 backdrop-blur-md shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-8">
            {HIGHLIGHTS.map((item, idx) => (
              <motion.div
                key={item.title}
                custom={idx}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.25 }}
                variants={highlightCardVariants}
                className="group relative flex flex-col sm:flex-row items-start gap-5 p-6 sm:p-7 rounded-2xl bg-[#0c1017]/85 hover:bg-[#121824]/90 backdrop-blur-md border border-white/10 hover:border-blue-500/50 shadow-[0_8px_24px_rgba(0,0,0,0.5)] transition-all duration-300"
              >
                <motion.div
                  variants={highlightItemVariants}
                  className="relative z-10 shrink-0 w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center rounded-xl bg-[#080b11] border border-white/10 group-hover:border-blue-500/50 text-blue-400 transition-all duration-300 shadow-sm"
                >
                  {item.icon}
                </motion.div>

                <div className="relative z-10 flex flex-col flex-1 overflow-hidden">
                  <motion.h3
                    variants={highlightItemVariants}
                    className="font-serif text-lg sm:text-xl font-bold text-white tracking-wide uppercase leading-tight group-hover:text-blue-200 transition-colors"
                  >
                    {item.title}
                  </motion.h3>

                  <motion.p
                    variants={highlightItemVariants}
                    className="text-xs sm:text-sm text-zinc-300 font-light mt-1.5 leading-relaxed"
                  >
                    {item.description}
                  </motion.p>

                  <motion.div
                    variants={highlightLineVariants}
                    className="h-0.5 w-8 bg-blue-500/60 group-hover:w-14 group-hover:bg-blue-400 transition-all duration-300 mt-3"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. SECOND FOLD: Filosofia de Atuação */}
      <section
        id="filosofia"
        className="relative min-h-screen flex items-center overflow-hidden"
      >
        {/* Cinematic Deeply Blurred Library Background */}
        <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
          <div className="absolute inset-0 scale-110 filter blur-[18px] brightness-[0.65] contrast-[1.15] saturate-[0.8] transform-gpu">
            <Image
              src="/biblioteca-background.webp"
              alt="Ambiente Jurídico Bokeh"
              fill
              className="object-cover object-center"
              sizes="100vw"
              quality={65}
            />
          </div>

          {/* Ambient Sapphire Glow */}
          <div className="absolute right-[10%] lg:right-[15%] top-1/2 -translate-y-1/2 w-[540px] h-[540px] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(37,99,235,0.22)_0%,rgba(30,58,138,0.12)_45%,transparent_72%)] blur-[80px]" />

          {/* Left-Side Localized Reading Shadow */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_22%_50%,rgba(7,9,14,0.96)_0%,rgba(7,9,14,0.75)_50%,transparent_85%)]" />

          {/* Seamless Top & Bottom Blends */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#07090e] via-transparent via-20% to-[#07090e]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(7,9,14,0.60)_75%,rgba(0,0,0,0.95)_100%)]" />
        </div>

        {/* Content Container */}
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-28 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center w-full">
            {/* Left Column */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="lg:col-span-7 flex flex-col space-y-7 pointer-events-auto bg-[#0c1017]/90 backdrop-blur-2xl p-6 sm:p-10 lg:p-12 rounded-2xl border border-white/10 shadow-[0_25px_60px_rgba(0,0,0,0.9)]"
            >
              <div className="inline-flex items-center gap-2.5 px-3.5 py-1 rounded-full bg-[#0e1422] border border-blue-500/40 w-fit">
                <span className="w-2 h-2 rounded-full bg-blue-400" />
                <span className="text-xs font-semibold tracking-[0.22em] text-blue-300 uppercase">
                  FILOSOFIA DE ATUAÇÃO
                </span>
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-white leading-[1.15]">
                A precisão técnica orienta a decisão. <br />
                <span className="text-blue-400 drop-shadow-[0_2px_12px_rgba(37,99,235,0.4)]">
                  A estratégia firme garante o resultado.
                </span>
              </h2>

              <p className="text-zinc-300 text-base sm:text-lg font-light leading-relaxed">
                Na advocacia contemporânea, não há espaço para soluções genéricas. Atuamos com dedicação pessoal e artesanal em cada caso, unindo profundo rigor processual à firmeza indispensável para proteger sua liberdade, sua reputação e a integridade de seus negócios.
              </p>

              {/* Bullet Points */}
              <div className="space-y-3.5 pt-1">
                <div className="flex items-start gap-4 p-3.5 rounded-xl bg-[#080b11] border border-white/10 hover:border-blue-500/40 transition-colors">
                  <div className="shrink-0 mt-0.5 p-2 rounded-lg bg-blue-950/60 border border-blue-500/30 text-blue-400">
                    <Building2 className="w-4 h-4" strokeWidth={1.75} />
                  </div>
                  <div className="text-sm leading-relaxed">
                    <strong className="text-white font-semibold block sm:inline mr-1.5">
                      Direito Empresarial Estratégico:
                    </strong>
                    <span className="text-zinc-300 font-light">
                      Assessoria preventiva, processos licitatórios, estruturação de contratos e blindagem de patrimônio corporativo.
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-3.5 rounded-xl bg-[#080b11] border border-white/10 hover:border-blue-500/40 transition-colors">
                  <div className="shrink-0 mt-0.5 p-2 rounded-lg bg-blue-950/60 border border-blue-500/30 text-blue-400">
                    <Gavel className="w-4 h-4" strokeWidth={1.75} />
                  </div>
                  <div className="text-sm leading-relaxed">
                    <strong className="text-white font-semibold block sm:inline mr-1.5">
                      Direito Criminal Combativo:
                    </strong>
                    <span className="text-zinc-300 font-light">
                      Defesa intransigente em inquéritos, audiências de custódia, habeas corpus e perante tribunais estaduais e superiores.
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-3.5 rounded-xl bg-[#080b11] border border-white/10 hover:border-blue-500/40 transition-colors">
                  <div className="shrink-0 mt-0.5 p-2 rounded-lg bg-blue-950/60 border border-blue-500/30 text-blue-400">
                    <Users className="w-4 h-4" strokeWidth={1.75} />
                  </div>
                  <div className="text-sm leading-relaxed">
                    <strong className="text-white font-semibold block sm:inline mr-1.5">
                      Relação Direta e Sem Ruídos:
                    </strong>
                    <span className="text-zinc-300 font-light">
                      Comunicação clara, sem juridiquês inacessível, informando o cliente de cada andamento com total lealdade e transparência.
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <GlowingButton href="#consultoria" size="md">
                  Solicitar Análise do Seu Caso
                </GlowingButton>
                <button
                  onClick={() => setActiveModal("areas")}
                  className="inline-flex items-center justify-center px-6 py-3.5 rounded-[15px] bg-[#0c121d] hover:bg-[#141e30] text-zinc-300 hover:text-white font-semibold text-xs tracking-[0.18em] uppercase transition-all duration-300 border border-white/10 hover:border-blue-500/50 text-center cursor-pointer"
                >
                  Conhecer Especialidades
                </button>
              </div>
            </motion.div>

            {/* Right Column: Space for 3D Lady Justice Profile view */}
            <div className="hidden lg:flex lg:col-span-5 items-center justify-center min-h-[500px] pointer-events-none" />
          </div>
        </div>
      </section>

      {/* 6. NOVA DOBRA: Posicionamento & Conduta (Com imagem no-background.png à direita olhando para a esquerda) */}
      <section
        id="conduta"
        className="relative z-20 w-full py-20 sm:py-28 bg-gradient-to-b from-[#07090e] via-[#0b0e17] to-[#07090e] border-t border-b border-white/10 overflow-hidden"
      >
        {/* Ambient Backlight Behind Lawyer */}
        <div className="absolute right-[5%] lg:right-[12%] top-1/2 -translate-y-1/2 w-[550px] h-[550px] rounded-full bg-[radial-gradient(circle,rgba(37,99,235,0.18)_0%,rgba(30,58,138,0.06)_50%,transparent_75%)] blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Left Column: Text in the opposite direction of his gaze (since he looks to the left) */}
            <motion.div
              initial={{ opacity: 0, x: -35 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="lg:col-span-7 flex flex-col space-y-6"
            >
              <div className="inline-flex items-center gap-2.5 px-3.5 py-1 rounded-full bg-[#0c121d] border border-blue-500/40 w-fit">
                <Sparkles className="w-3.5 h-3.5 text-blue-400" />
                <span className="text-xs font-semibold tracking-[0.22em] text-blue-300 uppercase">
                  POSICIONAMENTO & CONDUTA
                </span>
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-white leading-[1.15]">
                Compromisso inegociável com a sua liberdade e o seu patrimônio.
              </h2>

              <p className="text-zinc-300 text-base sm:text-lg font-light leading-relaxed">
                Nos momentos de maior incerteza e relevância, ter ao seu lado um profissional com preparo técnico e coragem estratégica faz toda a diferença. O Dr. Matheus Ferreira atua na linha de frente, construindo teses sólidas e combatendo arbitrariedades em qualquer instância do judiciário brasileiro.
              </p>

              {/* Grid of Badges / Pillars */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div className="p-4 rounded-xl bg-[#0c1017] border border-white/10 hover:border-blue-500/40 transition-colors">
                  <span className="text-2xl mb-2 block">⚖️</span>
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider">Técnica & Firmeza</h4>
                  <p className="text-[11px] text-zinc-400 mt-1 leading-relaxed">
                    Teses fundamentadas na doutrina e jurisprudência mais recente.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-[#0c1017] border border-white/10 hover:border-blue-500/40 transition-colors">
                  <span className="text-2xl mb-2 block">🌐</span>
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider">Atuação Nacional</h4>
                  <p className="text-[11px] text-zinc-400 mt-1 leading-relaxed">
                    Atendimento em todo o território nacional, comarcas e tribunais superiores.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-[#0c1017] border border-white/10 hover:border-blue-500/40 transition-colors">
                  <span className="text-2xl mb-2 block">🛡️</span>
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider">Sem Intermediários</h4>
                  <p className="text-[11px] text-zinc-400 mt-1 leading-relaxed">
                    Contato direto com o advogado titular em todas as fases do processo.
                  </p>
                </div>
              </div>

              {/* Direct CTA */}
              <div className="pt-3 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <a
                  href={whatsappDirectUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-xl bg-gradient-to-r from-blue-700 to-blue-600 hover:from-blue-600 hover:to-blue-500 text-white font-semibold text-xs tracking-[0.18em] uppercase transition-all duration-300 shadow-[0_4px_20px_rgba(37,99,235,0.4)] hover:shadow-[0_6px_25px_rgba(37,99,235,0.6)] cursor-pointer"
                >
                  <Phone className="w-4 h-4 text-blue-200" />
                  <span>Conversar Diretamente com Dr. Matheus</span>
                </a>
                <a
                  href="#advogado"
                  className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-[#0c1017] hover:bg-[#141b28] text-zinc-300 hover:text-white font-semibold text-xs tracking-[0.18em] uppercase transition-all duration-300 border border-white/10 hover:border-blue-500/50"
                >
                  <span>Conhecer o Advogado</span>
                  <ChevronRight className="w-4 h-4 text-blue-400" />
                </a>
              </div>
            </motion.div>

            {/* Right Column: Dr. Matheus looking to the left (no-background.png) */}
            <motion.div
              initial={{ opacity: 0, x: 40, scale: 0.95 }}
              whileInView={{ opacity: 1, x: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.85, ease: "easeOut" }}
              className="lg:col-span-5 relative flex justify-center lg:justify-end items-end pt-6 lg:pt-0"
            >
              {/* Backlight halo effect */}
              <div className="absolute inset-0 bg-gradient-to-t from-blue-600/10 via-transparent to-transparent rounded-3xl filter blur-xl pointer-events-none" />

              <div className="relative w-full max-w-[420px] lg:max-w-[460px]">
                {/* Main Lawyer Image Cutout - Sem obstruções */}
                <img
                  src="/no-background.png"
                  alt="Dr. Matheus Ferreira - Advogado Titular"
                  className="relative z-10 w-full h-auto object-contain object-bottom drop-shadow-[0_20px_45px_rgba(0,0,0,0.9)] filter brightness-[0.98] contrast-[1.04]"
                />

                {/* Subtle base gradient fade */}
                <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#07090e] via-[#07090e]/70 to-transparent z-15 pointer-events-none" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 7. DO BRA DO ADVOGADO TITULAR (Substitui o antigo Corpo Diretivo) */}
      <section
        id="advogado"
        className="relative z-20 w-full py-20 sm:py-28 bg-[#07090e] border-b border-white/10 overflow-hidden"
      >
        {/* Background Ambient Glow */}
        <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-[radial-gradient(ellipse_at_center,rgba(37,99,235,0.08)_0%,transparent_70%)] pointer-events-none blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="text-center max-w-3xl mx-auto mb-14 sm:mb-18 flex flex-col items-center"
          >
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1 rounded-full bg-[#0c121d] border border-blue-500/40 mb-4">
              <span className="w-2 h-2 rounded-full bg-blue-400" />
              <span className="text-xs font-semibold tracking-[0.22em] text-blue-300 uppercase">
                LIDERANÇA & ADVOCACIA TITULAR
              </span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-white leading-[1.15] mb-4">
              Dr. Matheus Ferreira
            </h2>

            <p className="text-zinc-300 text-base sm:text-lg font-light leading-relaxed">
              Advocacia combativa, estratégia sob medida e compromisso pessoal com cada cliente.
            </p>
          </motion.div>

          {/* 3 Blocos Editoriais Separados - Cada foto com seu respectivo bloco de texto */}
          <div className="space-y-10 sm:space-y-14">
            {/* Bloco 1: image1.jpg (Foto na Esquerda, Texto na Direita) */}
            <motion.div
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.75, ease: "easeOut" }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center bg-[#0a0d14]/90 backdrop-blur-xl border border-white/10 rounded-2xl p-6 sm:p-10 lg:p-12 shadow-2xl hover:border-blue-500/40 transition-colors"
            >
              <div className="lg:col-span-6 relative w-full h-[360px] sm:h-[440px] rounded-xl overflow-hidden border border-white/10 bg-[#05070a] shadow-lg group">
                <Image
                  src="/image1.jpg"
                  alt="Dr. Matheus Ferreira em Sala de Reuniões Executiva"
                  fill
                  className="object-cover object-center group-hover:scale-104 transition-transform duration-700 ease-out"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  quality={92}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#07090e] via-transparent to-transparent opacity-60 pointer-events-none" />
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-zinc-300 pointer-events-none">
                  <span className="bg-[#07090e]/85 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 text-[11px]">
                    Estrutura Executiva & Negociações
                  </span>
                  <span className="bg-[#07090e]/85 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 text-[11px] text-blue-400">
                    Sede Própria
                  </span>
                </div>
              </div>

              <div className="lg:col-span-6 flex flex-col space-y-5">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/70 border border-blue-500/40 w-fit">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                  <span className="text-[11px] font-semibold tracking-[0.2em] text-blue-300 uppercase">
                    DIREITO EMPRESARIAL & ESTRATÉGICO
                  </span>
                </div>

                <h3 className="font-serif text-2xl sm:text-3xl lg:text-[32px] font-bold text-white leading-tight">
                  Consultoria Preventiva, Licitações & Gestão de Riscos Corporativos
                </h3>

                <p className="text-zinc-300 text-sm sm:text-base font-light leading-relaxed">
                  No cenário corporativo contemporâneo, a antecipação de passivos e a assertividade negocial determinam a longevidade e a competitividade de uma empresa. O Dr. Matheus Ferreira assessora corporações na estruturação de contratos de alta complexidade, impugnações administrativas e reversão de inabilitações em processos licitatórios municipais, estaduais e federais.
                </p>

                <p className="text-zinc-400 text-xs sm:text-sm font-light leading-relaxed">
                  Estrutura executiva desenhada para reuniões estratégicas reservadas, garantindo sigilo absoluto e pareceres jurídicos ágeis para a tomada de decisão.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                  <div className="flex items-center gap-2 text-xs text-zinc-300 bg-[#06080d] p-3 rounded-lg border border-white/10">
                    <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                    <span>Licitações e Contratos Públicos</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-zinc-300 bg-[#06080d] p-3 rounded-lg border border-white/10">
                    <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                    <span>Blindagem e Governança Societária</span>
                  </div>
                </div>

                <div className="pt-2">
                  <GlowingButton href="#consultoria" size="sm">
                    Agendar Consultoria Empresarial
                  </GlowingButton>
                </div>
              </div>
            </motion.div>

            {/* Bloco 2: image2.jpg (Texto na Esquerda, Foto na Direita) */}
            <motion.div
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.75, ease: "easeOut" }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center bg-[#0a0d14]/90 backdrop-blur-xl border border-white/10 rounded-2xl p-6 sm:p-10 lg:p-12 shadow-2xl hover:border-blue-500/40 transition-colors"
            >
              <div className="lg:col-span-6 order-2 lg:order-1 flex flex-col space-y-5">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/70 border border-blue-500/40 w-fit">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                  <span className="text-[11px] font-semibold tracking-[0.2em] text-blue-300 uppercase">
                    DEFESA CRIMINAL & RIGOR PROCESSUAL
                  </span>
                </div>

                <h3 className="font-serif text-2xl sm:text-3xl lg:text-[32px] font-bold text-white leading-tight">
                  Atuação Criminal Combativa, Técnica e Imediata
                </h3>

                <p className="text-zinc-300 text-sm sm:text-base font-light leading-relaxed">
                  A salvaguarda da liberdade individual e da dignidade exige preparação minuciosa, discrição exemplar e atuação instantânea. Cada procedimento é conduzido com investigação defensiva técnica, análise cirúrgica das provas e formulação de teses customizadas para inquéritos policiais, medidas cautelares e audiências.
                </p>

                <p className="text-zinc-400 text-xs sm:text-sm font-light leading-relaxed">
                  Sem intermediários ou respostas padronizadas: o cliente e seus familiares contam com acompanhamento direto pelo Dr. Matheus Ferreira em todas as etapas decisivas.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                  <div className="flex items-center gap-2 text-xs text-zinc-300 bg-[#06080d] p-3 rounded-lg border border-white/10">
                    <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                    <span>Habeas Corpus & Cautelares de Urgência</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-zinc-300 bg-[#06080d] p-3 rounded-lg border border-white/10">
                    <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                    <span>Crimes Empresariais e Tributários</span>
                  </div>
                </div>

                <div className="pt-2">
                  <a
                    href={whatsappDirectUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs tracking-wider uppercase transition-all shadow-md w-fit"
                  >
                    <Phone className="w-4 h-4" />
                    <span>Atendimento Criminal Urgente</span>
                  </a>
                </div>
              </div>

              <div className="lg:col-span-6 order-1 lg:order-2 relative w-full h-[360px] sm:h-[440px] rounded-xl overflow-hidden border border-white/10 bg-[#05070a] shadow-lg group">
                <Image
                  src="/image2.jpg"
                  alt="Dr. Matheus Ferreira - Foco Analítico e Rigor Processual"
                  fill
                  className="object-cover object-center group-hover:scale-104 transition-transform duration-700 ease-out"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  quality={92}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#07090e] via-transparent to-transparent opacity-60 pointer-events-none" />
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-zinc-300 pointer-events-none">
                  <span className="bg-[#07090e]/85 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 text-[11px]">
                    Análise Cirúrgica de Provas
                  </span>
                  <span className="bg-[#07090e]/85 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 text-[11px] text-blue-400">
                    Defesa Incondicional
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Bloco 3: image3.jpg (Áreas de Atuação & Atuação em Todo o Brasil) */}
            <motion.div
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.75, ease: "easeOut" }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center bg-[#0a0d14]/90 backdrop-blur-xl border border-white/10 rounded-2xl p-6 sm:p-10 lg:p-12 shadow-2xl hover:border-blue-500/40 transition-colors"
            >
              <div className="lg:col-span-6 relative w-full h-[380px] sm:h-[480px] rounded-xl overflow-hidden border border-white/10 bg-[#05070a] shadow-lg group">
                <Image
                  src="/image3.jpg"
                  alt="Dr. Matheus Ferreira - Áreas de Atuação Jurídica"
                  fill
                  className="object-cover object-top group-hover:scale-103 transition-transform duration-700 ease-out"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  quality={92}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#07090e]/80 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-zinc-300 pointer-events-none">
                  <span className="bg-[#07090e]/85 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 text-[11px]">
                    Áreas de Atuação
                  </span>
                  <span className="bg-[#07090e]/85 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 text-[11px] text-blue-400">
                    Atuação em Todo o Brasil
                  </span>
                </div>
              </div>

              <div className="lg:col-span-6 flex flex-col space-y-5">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/70 border border-blue-500/40 w-fit">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                  <span className="text-[11px] font-semibold tracking-[0.2em] text-blue-300 uppercase">
                    ÁREAS DE ATUAÇÃO & ALCANCE NACIONAL
                  </span>
                </div>

                <h3 className="font-serif text-2xl sm:text-3xl lg:text-[32px] font-bold text-white leading-tight">
                  Especialidades Jurídicas com Rigor Técnico e Abrangência Nacional
                </h3>

                <p className="text-zinc-300 text-sm sm:text-base font-light leading-relaxed">
                  Com foco prioritário nas esferas <strong>Empresarial</strong> e <strong>Criminal</strong>, o escritório desenvolve estratégias customizadas para proteger o patrimônio, destravar operações econômicas e defender a liberdade individual de clientes em todo o território nacional.
                </p>

                <p className="text-zinc-400 text-xs sm:text-sm font-light leading-relaxed">
                  Atendimento perante comarcas de todo o país, Tribunais de Justiça estaduais, Tribunais Regionais Federais (TRFs) e instâncias superiores (STJ e STF) em Brasília.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                  <div className="flex items-center gap-2 text-xs text-zinc-300 bg-[#06080d] p-3 rounded-lg border border-white/10">
                    <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                    <span>Direito Empresarial & Societário</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-zinc-300 bg-[#06080d] p-3 rounded-lg border border-white/10">
                    <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                    <span>Direito Criminal Estratégico</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-zinc-300 bg-[#06080d] p-3 rounded-lg border border-white/10">
                    <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                    <span>Licitações & Contratos Administrativos</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-zinc-300 bg-[#06080d] p-3 rounded-lg border border-white/10">
                    <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                    <span>Tribunais Superiores (STJ e STF)</span>
                  </div>
                </div>

                <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                  <a
                    href={whatsappDirectUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs tracking-wider uppercase transition-all shadow-md"
                  >
                    <Phone className="w-4 h-4" />
                    <span>Falar com o Dr. Matheus</span>
                  </a>
                  <button
                    onClick={() => setActiveModal("areas")}
                    className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-[#0c121d] hover:bg-[#141e30] text-zinc-300 hover:text-white font-semibold text-xs tracking-wider uppercase border border-white/10 hover:border-blue-500/40 transition-all cursor-pointer"
                  >
                    <span>Ver Todas as Áreas</span>
                    <ChevronRight className="w-4 h-4 text-blue-400" />
                  </button>
                  <a
                    href="https://www.instagram.com/adv_matheusferreira/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-[#0c121d] hover:bg-[#141e30] text-zinc-300 hover:text-white font-semibold text-xs tracking-wider uppercase border border-white/10 hover:border-pink-500/40 transition-all"
                  >
                    <InstagramIcon className="w-4 h-4 text-pink-400" />
                    <span>@adv_matheusferreira</span>
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 8. NOVA DOBRA: Avaliações Reais de Clientes (Reviews) */}
      <section
        id="avaliacoes"
        className="relative z-20 w-full py-20 sm:py-28 bg-[#05070c] border-b border-white/10 overflow-hidden"
      >
        {/* Ambient Focal Light */}
        <div className="absolute top-1/3 right-1/4 w-[600px] h-[400px] bg-[radial-gradient(ellipse_at_center,rgba(37,99,235,0.1)_0%,transparent_70%)] blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header & Google Rating Badge */}
          <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-18 flex flex-col items-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0c121d] border border-blue-500/40 mb-4 shadow-sm">
              <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
              <span className="text-xs font-semibold tracking-[0.22em] text-blue-300 uppercase">
                AVALIAÇÕES & PROVA SOCIAL
              </span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-white leading-[1.15] mb-4">
              O Que Dizem Nossos Clientes
            </h2>

            <p className="text-zinc-300 text-base sm:text-lg font-light leading-relaxed mb-6">
              A confiança de quem confiou suas causas e empresas ao nosso escritório comprovada em avaliações autênticas.
            </p>

            {/* Google Reviews Trust Badge */}
            <div className="inline-flex flex-col sm:flex-row items-center gap-4 px-6 py-3.5 rounded-2xl bg-[#0a0e17] border border-white/10 shadow-lg">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                  />
                </svg>
                <span className="text-sm font-semibold text-white">Google Avaliações</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-sm font-bold text-white">5.0</span>
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <span className="text-xs text-zinc-400 ml-1">(Nota Máxima)</span>
              </div>
            </div>
          </div>

          {/* Reviews Grid (6 Cards) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {REVIEWS.map((review, idx) => (
              <motion.div
                key={review.author}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: idx * 0.1, ease: "easeOut" }}
                className="group relative flex flex-col justify-between p-6 sm:p-7 rounded-2xl bg-[#0a0d15]/90 hover:bg-[#0f1422]/95 backdrop-blur-xl border border-white/10 hover:border-blue-500/50 shadow-[0_8px_24px_rgba(0,0,0,0.6)] transition-all duration-300"
              >
                <div>
                  {/* Top: Stars & Quote Icon */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex gap-1">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                      ))}
                    </div>
                    <Quote className="w-5 h-5 text-zinc-600 group-hover:text-blue-400 transition-colors" />
                  </div>

                  {/* Review Quote Text */}
                  <p className="text-zinc-300 text-xs sm:text-[13px] font-light leading-relaxed italic">
                    "{review.text}"
                  </p>
                </div>

                {/* Bottom: Author Info & Tag */}
                <div className="pt-5 mt-5 border-t border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-900 to-blue-700 border border-blue-400/40 flex items-center justify-center text-xs font-bold text-white shadow-sm">
                      {review.author
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-white group-hover:text-blue-300 transition-colors">
                        {review.author}
                      </h4>
                      <span className="text-[11px] text-zinc-500 font-light block">{review.time}</span>
                    </div>
                  </div>

                  <span className="text-[10px] font-medium text-blue-400 bg-blue-950/60 border border-blue-500/30 px-2 py-0.5 rounded-md">
                    {review.tag}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Callout below reviews */}
          <div className="mt-12 text-center">
            <a
              href={whatsappDirectUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs sm:text-sm text-blue-400 hover:text-blue-300 font-medium transition-colors"
            >
              <span>Precisa de assistência jurídica estratégica para o seu caso? Fale conosco agora</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* 9. Minimal Footer */}
      <footer className="relative z-20 w-full border-t border-white/10 bg-[#05070a] py-10 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            {/* Col 1: Brand */}
            <div className="md:col-span-2 space-y-4">
              <div className="flex items-center gap-3">
                <img
                  src="/logo_semfundo.png"
                  alt="Matheus Ferreira Escritório de Advocacia"
                  className="h-13 sm:h-15 w-auto object-contain filter brightness-0 invert drop-shadow-[0_2px_12px_rgba(255,255,255,0.2)]"
                />
              </div>
              <p className="text-xs text-zinc-400 max-w-sm leading-relaxed font-light">
                Técnica, Firmeza e Estratégia. Soluções jurídicas empresariais e criminais de excelência para pessoas e corporações com atuação em todo o Brasil.
              </p>
              <div className="flex items-center gap-3 pt-1">
                <a
                  href="https://www.instagram.com/adv_matheusferreira/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg bg-[#0c1017] border border-white/10 hover:border-blue-500/40 flex items-center justify-center text-zinc-400 hover:text-pink-400 transition-colors"
                  aria-label="Instagram @adv_matheusferreira"
                >
                  <InstagramIcon className="w-4 h-4" />
                </a>
                <a
                  href={whatsappDirectUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg bg-[#0c1017] border border-white/10 hover:border-blue-500/40 flex items-center justify-center text-zinc-400 hover:text-green-400 transition-colors"
                  aria-label="WhatsApp"
                >
                  <Phone className="w-4 h-4" />
                </a>
                <a
                  href="mailto:contato@matheusferreiraadv.com.br"
                  className="w-9 h-9 rounded-lg bg-[#0c1017] border border-white/10 hover:border-blue-500/40 flex items-center justify-center text-zinc-400 hover:text-blue-400 transition-colors"
                  aria-label="E-mail"
                >
                  <Mail className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Col 2: Contato Oficial */}
            <div className="space-y-3 text-xs text-zinc-400">
              <h4 className="font-bold text-white uppercase tracking-wider text-xs">Atendimento</h4>
              <div className="flex items-start gap-2 pt-1">
                <MapPin className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <span>Rua Jesuína Ferraz Dos Santos, 210, Teixeira Dias, Belo Horizonte - MG</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-blue-400 shrink-0" />
                <a href="tel:+5531974006704" className="hover:text-white transition-colors">
                  (31) 97400-6704
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-blue-400 shrink-0" />
                <a href="mailto:contato@matheusferreiraadv.com.br" className="hover:text-white transition-colors">
                  contato@matheusferreiraadv.com.br
                </a>
              </div>
            </div>

            {/* Col 3: Navegação Rápida */}
            <div className="space-y-2.5 text-xs text-zinc-400">
              <h4 className="font-bold text-white uppercase tracking-wider text-xs">Navegação</h4>
              <div>
                <a href="#inicio" className="hover:text-white transition-colors">Início</a>
              </div>
              <div>
                <a href="#filosofia" className="hover:text-white transition-colors">Filosofia</a>
              </div>
              <div>
                <a href="#conduta" className="hover:text-white transition-colors">Posicionamento</a>
              </div>
              <div>
                <a href="#advogado" className="hover:text-white transition-colors">O Advogado</a>
              </div>
              <div>
                <a href="#avaliacoes" className="hover:text-white transition-colors">Avaliações (5.0 ★)</a>
              </div>
              <div>
                <button onClick={() => setActiveModal("areas")} className="hover:text-white transition-colors cursor-pointer">
                  Áreas de Atuação
                </button>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-500 gap-4">
            <span>
              © {new Date().getFullYear()} Matheus Ferreira Escritório de Advocacia. Todos os direitos reservados.
            </span>
            <div className="flex items-center gap-4">
              <span>OAB Regulamentada</span>
              <span>•</span>
              <button onClick={() => setActiveModal("contato")} className="hover:text-zinc-300 transition-colors cursor-pointer">
                Fale Conosco
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* 10. Interactive Modals */}
      {activeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-2xl bg-[#090d14] border border-blue-500/40 rounded-2xl p-6 sm:p-8 shadow-2xl">
            <button
              onClick={() => setActiveModal(null)}
              className="absolute top-4 right-4 p-2 text-zinc-400 hover:text-white rounded-lg border border-white/10 hover:border-white/30 cursor-pointer"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {activeModal === "sobre" && (
              <div className="space-y-4">
                <div className="flex items-center gap-3.5 mb-2">
                  <img
                    src="/logo_semfundo.png"
                    alt="Matheus Ferreira Logo"
                    className="h-10 w-auto object-contain filter brightness-0 invert"
                  />
                </div>
                <h3 className="font-serif text-2xl font-bold text-white">Matheus Ferreira Escritório de Advocacia</h3>
                <p className="text-sm text-zinc-300 leading-relaxed font-light">
                  Com sede em Belo Horizonte e atuação em todo o Brasil, o escritório foi construído sob o princípio fundamental de fornecer defesa jurídica técnica, combativa e estratégica para pessoas e corporações.
                </p>
                <p className="text-sm text-zinc-300 leading-relaxed font-light">
                  Sob a liderança do Dr. Matheus Ferreira, combinamos visão executiva a um profundo rigor processual, assegurando discrição absoluta e atendimento personalizado.
                </p>
                <div className="pt-4 border-t border-white/10 flex justify-end">
                  <button
                    onClick={() => setActiveModal(null)}
                    className="px-5 py-2.5 bg-blue-600 text-white text-xs font-semibold tracking-wider uppercase rounded-xl hover:bg-blue-500 cursor-pointer"
                  >
                    Fechar
                  </button>
                </div>
              </div>
            )}

            {activeModal === "areas" && (
              <div className="space-y-4">
                <span className="text-[10px] font-bold tracking-[0.25em] text-blue-400 uppercase">
                  ESPECIALIDADES JURÍDICAS
                </span>
                <h3 className="font-serif text-2xl font-bold text-white">Áreas de Atuação</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {[
                    {
                      title: "Direito Empresarial & Societário",
                      desc: "Consultoria preventiva, gestão de contratos, blindagem patrimonial e governança.",
                    },
                    {
                      title: "Direito Criminal Estratégico",
                      desc: "Defesa combativa em inquéritos policiais, habeas corpus, audiências e tribunais.",
                    },
                    {
                      title: "Licitações & Contratos Públicos",
                      desc: "Atuação contra inabilitações ilegais, recursos administrativos e defesas perante a administração.",
                    },
                    {
                      title: "Gestão e Prevenção de Passivos",
                      desc: "Diagnóstico precoce de riscos operacionais e redução de litígios corporativos.",
                    },
                    {
                      title: "Direito Civil & Contratos Complexos",
                      desc: "Elaboração, negociação e resolução estratégica de conflitos contratuais.",
                    },
                    {
                      title: "Atuação em Tribunais Superiores",
                      desc: "Sustentações orais e recursos perante TJMG, TRF, STJ e STF com alcance nacional.",
                    },
                  ].map((area, idx) => (
                    <div key={idx} className="p-3 bg-[#06080d] border border-white/10 rounded-xl">
                      <h4 className="text-xs font-bold text-white uppercase">{area.title}</h4>
                      <p className="text-[11px] text-zinc-400 mt-0.5 leading-relaxed">{area.desc}</p>
                    </div>
                  ))}
                </div>
                <div className="pt-4 border-t border-white/10 flex justify-end">
                  <button
                    onClick={() => setActiveModal(null)}
                    className="px-5 py-2.5 bg-blue-600 text-white text-xs font-semibold tracking-wider uppercase rounded-xl hover:bg-blue-500 cursor-pointer"
                  >
                    Entendido
                  </button>
                </div>
              </div>
            )}

            {activeModal === "contato" && (
              <div className="space-y-4">
                <span className="text-[10px] font-bold tracking-[0.25em] text-blue-400 uppercase">
                  CANAIS DE ATENDIMENTO
                </span>
                <h3 className="font-serif text-2xl font-bold text-white">Entre em Contato</h3>
                <div className="space-y-3 text-xs text-zinc-300 pt-1">
                  <p>
                    <strong className="text-white block">Endereço:</strong>
                    Rua Jesuína Ferraz Dos Santos, 210, Teixeira Dias, Belo Horizonte - MG
                  </p>
                  <p>
                    <strong className="text-white block">Telefone / WhatsApp:</strong>
                    (31) 97400-6704
                  </p>
                  <p>
                    <strong className="text-white block">E-mail:</strong>
                    contato@matheusferreiraadv.com.br
                  </p>
                  <p>
                    <strong className="text-white block">Instagram:</strong>
                    <a
                      href="https://www.instagram.com/adv_matheusferreira/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:text-blue-300 transition-colors inline-flex items-center gap-1.5 mt-0.5"
                    >
                      <InstagramIcon className="w-3.5 h-3.5 text-pink-400" />
                      <span>@adv_matheusferreira</span>
                    </a>
                  </p>
                  <p>
                    <strong className="text-white block">Atendimento:</strong>
                    Segunda a Sexta, com agendamento prévio. Atuação em todo o Brasil.
                  </p>
                </div>
                <div className="pt-4 border-t border-white/10 flex justify-between items-center">
                  <a
                    href={whatsappDirectUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2.5 bg-green-600 hover:bg-green-500 text-white text-xs font-semibold tracking-wider uppercase rounded-xl"
                  >
                    Falar no WhatsApp
                  </a>
                  <button
                    onClick={() => setActiveModal(null)}
                    className="px-5 py-2.5 bg-[#0c121d] border border-white/10 text-white text-xs font-semibold tracking-wider uppercase rounded-xl hover:bg-[#141e30] cursor-pointer"
                  >
                    Fechar
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
