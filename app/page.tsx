"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, type Variants } from "framer-motion";
import {
  Scale,
  Shield,
  Gavel,
  CheckCircle2,
  Phone,
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

function ScrollTriggeredStatue() {
  const statueRef = useRef<HTMLDivElement>(null);
  const hasAnimatedRef = useRef(false);
  const [hasScrolledIntoView, setHasScrolledIntoView] = useState(false);

  useEffect(() => {
    let previousScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollingDown = currentScrollY > previousScrollY;
      previousScrollY = currentScrollY;

      if (!scrollingDown || hasAnimatedRef.current || !statueRef.current) return;

      const bounds = statueRef.current.getBoundingClientRect();
      const enteringViewport =
        bounds.top < window.innerHeight * 0.85 &&
        bounds.bottom > window.innerHeight * 0.15;

      if (enteringViewport) {
        hasAnimatedRef.current = true;
        setHasScrolledIntoView(true);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.div
      ref={statueRef}
      initial={{ opacity: 0, x: 110, scale: 0.96 }}
      animate={
        hasScrolledIntoView
          ? { opacity: 1, x: 0, scale: 1 }
          : { opacity: 0, x: 110, scale: 0.96 }
      }
      transition={{ duration: 1.05, ease: [0.22, 1, 0.36, 1] }}
      className="hidden lg:flex lg:col-span-5 relative h-[520px] xl:h-[600px] items-center justify-center pointer-events-none"
    >
      <Image
        src="/estátua%202D.png"
        alt="Estátua da Justiça com balança, em mármore e detalhes de bronze"
        fill
        className="object-contain drop-shadow-[0_18px_32px_rgba(0,0,0,0.24)]"
        sizes="(max-width: 1280px) 40vw, 480px"
      />
    </motion.div>
  );
}

import GlowingButton from "./components/GlowingButton";

const HIGHLIGHTS = [
  {
    icon: <Scale className="w-7 h-7 sm:w-8 sm:h-8 text-[#80643d]" strokeWidth={1.5} />,
    title: "ESCUTA ATENTA",
    description: "Cada história é acolhida com respeito, atenção e sigilo profissional.",
  },
  {
    icon: <Shield className="w-7 h-7 sm:w-8 sm:h-8 text-[#80643d]" strokeWidth={1.5} />,
    title: "ORIENTAÇÃO CLARA",
    description: "Explicações acessíveis para que você compreenda seus direitos e suas opções.",
  },
  {
    icon: <Gavel className="w-7 h-7 sm:w-8 sm:h-8 text-[#80643d]" strokeWidth={1.5} />,
    title: "ATUAÇÃO RESPONSÁVEL",
    description: "Acompanhamento próximo e diligente em cada etapa do atendimento.",
  },
];

const REVIEWS = [
  {
    author: "Lucilene Sergia",
    time: "7 meses atrás",
    rating: 5,
    text: "Uma excelente profissional. Atenciosa com o cliente, explica a situação do processo quantas vezes necessário. Fiquei muito satisfeita.",
    tag: "Clareza e atenção",
  },
  {
    author: "Marcelo Junior",
    time: "3 meses atrás",
    rating: 5,
    text: "Ótimo atendimento da Dra. Amanda, super atenciosa, gentil e resolveu rápido o meu problema.",
    tag: "Atendimento atencioso",
  },
  {
    author: "Flávia Ávila",
    time: "3 meses atrás",
    rating: 5,
    text: "Super bem atendida desde o primeiro momento e muito bem orientada. É prestativa, tira todas as dúvidas e começou a atuar rapidamente quando precisei de urgência.",
    tag: "Orientação e agilidade",
  },
  {
    author: "Marcela Ferraz",
    time: "5 meses atrás",
    rating: 5,
    text: "O atendimento dela é incrível. Foi super atenciosa do início ao fim do atendimento. Podem confiar de olhos fechados.",
    tag: "Confiança",
  },
  {
    author: "Lucas Rafael",
    time: "5 meses atrás",
    rating: 5,
    text: "Grato pelo trabalho e atendimento da Dra. Amanda. Sentimento de acolhimento e clareza em tudo que faz, satisfação enorme!",
    tag: "Acolhimento e clareza",
  },
  {
    author: "Elaine Elizia",
    time: "7 meses atrás",
    rating: 5,
    text: "Recomendo a Dra. Amanda para quem precisa resolver problemas com banco, Serasa, cobranças indevidas ou golpes digitais. Excelente profissional em BH.",
    tag: "Direito do consumidor",
  },
  {
    author: "Gabriel Vieira",
    time: "5 meses atrás",
    rating: 5,
    text: "Atendimento profissional. Me ajudou em um momento difícil de separação e fez prevalecer o que era meu por direito.",
    tag: "Direito de família",
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
    telefone: "",
    descricao: "",
  });
  const [activeModal, setActiveModal] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);

    // Optional direct redirect/open to WhatsApp with pre-filled message
    const whatsappMessage = encodeURIComponent(
      `Olá, Dra. Amanda! Meu nome é ${formData.nome}. Gostaria de conversar sobre uma questão jurídica. Telefone: ${formData.telefone}. Caso: ${formData.descricao || "Não informado"}`
    );
    const waUrl = `https://wa.me/5531975412091?text=${whatsappMessage}`;
    
    // Open WhatsApp within the submit gesture so browsers do not block the new tab.
    window.open(waUrl, "_blank", "noopener,noreferrer");

    setTimeout(() => {
      setFormSubmitted(false);
      setFormData({ nome: "", telefone: "", descricao: "" });
    }, 4500);
  };

  const whatsappDirectUrl =
    "https://wa.me/5531975412091?text=" +
    encodeURIComponent("Olá, Dra. Amanda! Gostaria de conversar sobre meu caso.");

  return (
    <div
      className="relative min-h-screen bg-[#f7f4ed] text-[#2b261e] overflow-x-clip selection:bg-[#80643d] selection:text-white"
    >
      {/* 2. Top Header / Navigation */}
      <header className="sticky top-0 z-40 w-full border-b border-[#80643d]/20 bg-[#f7f4ed]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-24 sm:h-26 lg:h-28 flex items-center justify-between gap-4">
          {/* Logo / Brand Name */}
          <a href="#" className="flex items-center gap-3.5 group shrink-0 py-2">
            <div className="relative flex items-center justify-center h-16 sm:h-[4.5rem] lg:h-20 w-16 sm:w-[4.5rem] lg:w-20 shrink-0">
              <Image
                src="/logo.png"
                width={128}
                height={128}
                alt="Dra. Amanda Ferraz — símbolo da balança dourada"
                className="h-full w-full object-contain"
              />
            </div>
            <span className="hidden sm:flex flex-col leading-tight">
              <span className="font-serif text-xl lg:text-2xl text-[#352a19]">Dra. Amanda Ferraz</span>
              <span className="mt-1 text-[10px] font-medium uppercase tracking-[0.2em] text-[#80643d]">Advogada</span>
            </span>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-3 2xl:gap-5">
            <a
              href="#inicio"
              className="text-[11px] xl:text-xs font-semibold uppercase tracking-[0.16em] text-[#80643d] relative py-1 after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-amber-500 whitespace-nowrap"
            >
              INÍCIO
            </a>
            <a
              href="#filosofia"
              className="text-[11px] xl:text-xs font-medium uppercase tracking-[0.16em] text-[#5e574c] hover:text-[#2b261e] transition-colors whitespace-nowrap"
            >
              ATENDIMENTO
            </a>
            <a
              href="#conduta"
              className="text-[11px] xl:text-xs font-medium uppercase tracking-[0.16em] text-[#5e574c] hover:text-[#2b261e] transition-colors whitespace-nowrap"
            >
              COMPROMISSO
            </a>
            <a
              href="#advogado"
              className="text-[11px] xl:text-xs font-medium uppercase tracking-[0.16em] text-[#5e574c] hover:text-[#2b261e] transition-colors whitespace-nowrap"
            >
              A ADVOGADA
            </a>
            <a
              href="#avaliacoes"
              className="text-[11px] xl:text-xs font-medium uppercase tracking-[0.16em] text-[#5e574c] hover:text-[#2b261e] transition-colors whitespace-nowrap flex items-center gap-1.5"
            >
              <span>AVALIAÇÕES</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#80643d]" />
            </a>
            <button
              onClick={() => setActiveModal("areas")}
              className="text-[11px] xl:text-xs font-medium uppercase tracking-[0.16em] text-[#5e574c] hover:text-[#2b261e] transition-colors cursor-pointer whitespace-nowrap"
            >
              ÁREAS DE ATUAÇÃO
            </button>
            <button
              onClick={() => setActiveModal("contato")}
              className="text-[11px] xl:text-xs font-medium uppercase tracking-[0.16em] text-[#5e574c] hover:text-[#2b261e] transition-colors cursor-pointer whitespace-nowrap"
            >
              CONTATO
            </button>
          </nav>

          {/* Top Right Header CTA Button */}
          <div className="hidden xl:flex items-center gap-2.5 shrink-0">
            <a
              href="https://www.instagram.com/advamandaferraz/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-[12px] bg-[#fffdf8] hover:bg-[#e9e0d1] border border-[#80643d]/20 hover:border-[#80643d]/35 flex items-center justify-center text-[#746c60] hover:text-[#80643d] transition-all shadow-sm group"
              aria-label="Instagram @advamandaferraz"
              title="Instagram @advamandaferraz"
            >
              <InstagramIcon className="w-4 h-4 group-hover:scale-110 transition-transform" />
            </a>
            <a
              href={whatsappDirectUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-[12px] bg-[#eee7d9]/60 hover:bg-[#e8decd]/80 border border-amber-600/40 text-[#80643d] hover:text-[#2b261e] text-xs font-medium tracking-wide transition-all shadow-sm"
            >
              <Phone className="w-3.5 h-3.5 text-[#80643d]" />
              <span>(31) 97541-2091</span>
            </a>
            <GlowingButton href="#consultoria" size="sm">
              Agendar Consulta
            </GlowingButton>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-2.5 text-[#5e574c] hover:text-[#2b261e] rounded-lg border border-[#80643d]/20 bg-[#fffdf8]"
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
          <div className="xl:hidden bg-[#f7f4ed]/98 border-b border-[#80643d]/20 px-6 py-6 space-y-4  animate-in slide-in-from-top duration-200">
            <a
              href="#inicio"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-xs font-semibold tracking-[0.18em] uppercase text-[#80643d]"
            >
              INÍCIO
            </a>
            <a
              href="#filosofia"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-xs font-medium tracking-[0.18em] uppercase text-[#5e574c] hover:text-[#2b261e]"
            >
              ATENDIMENTO
            </a>
            <a
              href="#conduta"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-xs font-medium tracking-[0.18em] uppercase text-[#5e574c] hover:text-[#2b261e]"
            >
              COMPROMISSO
            </a>
            <a
              href="#advogado"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-xs font-medium tracking-[0.18em] uppercase text-[#5e574c] hover:text-[#2b261e]"
            >
              A ADVOGADA
            </a>
            <a
              href="#avaliacoes"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-xs font-medium tracking-[0.18em] uppercase text-[#5e574c] hover:text-[#2b261e]"
            >
              AVALIAÇÕES (5,0 ★)
            </a>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setActiveModal("areas");
              }}
              className="block w-full text-left text-xs font-medium tracking-[0.18em] uppercase text-[#5e574c] hover:text-[#2b261e]"
            >
              ÁREAS DE ATUAÇÃO
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setActiveModal("contato");
              }}
              className="block w-full text-left text-xs font-medium tracking-[0.18em] uppercase text-[#5e574c] hover:text-[#2b261e]"
            >
              CONTATO
            </button>
            <div className="pt-2 flex flex-col gap-3">
              <a
                href={whatsappDirectUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-3 rounded-xl bg-[#eee7d9]/60 border border-[#806b48]/40 text-[#80643d] text-xs font-semibold uppercase tracking-wider"
              >
                <Phone className="w-4 h-4 text-[#80643d]" />
                <span>WhatsApp: (31) 97541-2091</span>
              </a>
              <a
                href="https://www.instagram.com/advamandaferraz/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-3 rounded-xl bg-[#fffdf8] border border-[#80643d]/20 text-[#5e574c] hover:text-[#2b261e] text-xs font-semibold uppercase tracking-wider"
              >
                <InstagramIcon className="w-4 h-4 text-[#80643d]" />
                <span>Instagram: @advamandaferraz</span>
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
          <div className="absolute inset-0 scale-105 filter brightness-[0.56] contrast-[1.08] saturate-[0.72] transform-gpu">
            <Image
              src="/biblioteca-background.webp"
              alt="Biblioteca jurídica do escritório"
              fill
              priority
              className="object-cover object-center"
              sizes="100vw"
              quality={75}
            />
          </div>

          <div className="absolute inset-0 bg-gradient-to-r from-[#f7f4ed]/88 via-[#f7f4ed]/58 to-[#f7f4ed]/28" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#f7f4ed]/40 via-transparent to-[#f7f4ed]/95" />

        </div>

        <section
          id="inicio"
          className="relative z-20 min-h-[calc(100vh-5rem)] flex flex-col justify-start lg:justify-between max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-10 lg:pt-12 pb-10"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start lg:items-center flex-1 lg:my-auto">
            {/* Left Column: Headlines & Action CTAs */}
            <div className="lg:col-span-6 flex flex-col justify-start lg:justify-center space-y-4 sm:space-y-6 lg:space-y-7 pointer-events-auto">
              {/* Kicker Badge */}
              <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-md bg-[#fffdf8]/90 border border-[#806b48]/50 w-fit">
                <span className="w-1.5 h-1.5 rounded-full bg-[#80643d]" />
                <span className="text-xs font-semibold tracking-[0.18em] text-[#80643d] uppercase">
                  DIREITO DE FAMÍLIA & CONSUMIDOR
                </span>
              </div>

              {/* Main Headline */}
              <h1 className="flex flex-col">
                <span className="font-serif text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-medium tracking-tight text-[#2b261e] leading-[1.12]">
                  Orientação jurídica com
                </span>
                <span className="font-serif text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-semibold tracking-tight text-[#6f5934] leading-[1.12] mt-1">
                  escuta, clareza e cuidado
                </span>
              </h1>

              {/* Supporting Text */}
              <p className="text-[#383229] text-lg sm:text-xl lg:text-[1.35rem] font-normal leading-relaxed max-w-xl">
              Atendimento próximo em Direito de Família e do Consumidor, em Belo Horizonte e online para todo o Brasil.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 pt-1">
                <GlowingButton href="#consultoria" size="md" className="w-full sm:w-auto py-3.5 text-xs tracking-[0.16em]">
                  Conversar com a Dra. Amanda
                </GlowingButton>
                <a
                  href={whatsappDirectUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative inline-flex items-center justify-center rounded-lg font-semibold uppercase bg-[#fffdf8] hover:bg-[#e9e0d1] text-[#403a31] hover:text-[#2b261e] border border-[#80643d]/25 hover:border-[#806b48] px-7 py-3.5 text-xs tracking-[0.14em] transition-colors duration-200 text-center cursor-pointer w-full sm:w-auto gap-2"
                >
                  <Phone className="w-4 h-4 text-[#80643d] group-hover:scale-110 transition-transform" />
                  <span>Falar no WhatsApp</span>
                </a>
              </div>

              {/* Credentials Line */}
              <div className="flex items-center gap-3 text-xs text-[#746c60] pt-1">
                <div className="h-px w-8 bg-amber-500/60" />
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#80643d]" />
                  Atendimento em Belo Horizonte • Online para todo o Brasil
                </span>
              </div>
            </div>

            {/* Spacer Column in Center for 3D Statue View */}
            <div className="hidden lg:block lg:col-span-1" />

            {/* Right Column: Request a Consultation Form Card */}
            <div id="consultoria" className="lg:col-span-5 relative pointer-events-auto group mt-4 lg:mt-0">
              <div className="relative rounded-xl bg-[#fffdf8] border border-[#80643d]/25 p-6 sm:p-8 shadow-xl">
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="inline-block px-2.5 py-0.5 rounded-full bg-[#eee7d9]/80 border border-[#806b48]/40 text-[10px] font-semibold tracking-[0.2em] text-[#80643d] uppercase">
                      ATENDIMENTO DIRETO
                    </span>
                    <span className="text-[11px] text-[#746c60] font-medium">Belo Horizonte / Online</span>
                  </div>
                  <h2 className="font-serif text-2xl sm:text-3xl font-bold tracking-wide text-[#2b261e] uppercase">
                    FALE SOBRE O SEU CASO
                  </h2>
                  <p className="text-[#746c60] text-xs sm:text-sm mt-1.5 leading-relaxed font-light">
                    Conte brevemente como podemos ajudar. Sua mensagem seguirá pelo WhatsApp.
                  </p>
                </div>

                {formSubmitted ? (
                  <div className="py-10 text-center space-y-3 bg-[#f2ede4] border border-[#806b48]/50 rounded-xl p-6 animate-in fade-in zoom-in-95 duration-300">
                    <div className="w-14 h-14 rounded-full bg-[#8b7047]/20 border border-[#806b48]/60 flex items-center justify-center mx-auto text-[#80643d] p-3">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <h3 className="font-serif text-lg font-bold text-[#2b261e]">Solicitação Recebida!</h3>
                    <p className="text-xs text-[#5e574c] leading-relaxed max-w-xs mx-auto">
                      Redirecionando para o WhatsApp da Dra. Amanda Ferraz...
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
                        className="w-full px-4 py-3 rounded-xl bg-[#fffdf8] border border-[#80643d]/20 text-[#2b261e] placeholder-[#8b8377] text-sm focus:outline-none focus:border-[#806b48] focus:ring-1 focus:ring-amber-500 transition-all"
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
                        className="w-full px-4 py-3 rounded-xl bg-[#fffdf8] border border-[#80643d]/20 text-[#2b261e] placeholder-[#8b8377] text-sm focus:outline-none focus:border-[#806b48] focus:ring-1 focus:ring-amber-500 transition-all"
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
                        className="w-full px-4 py-2.5 rounded-xl bg-[#fffdf8] border border-[#80643d]/20 text-[#2b261e] placeholder-[#8b8377] text-sm focus:outline-none focus:border-[#806b48] focus:ring-1 focus:ring-amber-500 transition-all resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3.5 rounded-lg bg-[#80643d] hover:bg-[#70532d] text-white font-semibold text-xs tracking-[0.16em] uppercase transition-colors duration-200 border border-[#a78c5d]/50 cursor-pointer flex items-center justify-center gap-2"
                    >
                      <span>ENVIAR SOLICITAÇÃO</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>

                    <div className="pt-1 flex items-center justify-center gap-2 text-[11px] text-[#746c60]">
                      <Shield className="w-3.5 h-3.5 text-[#80643d]" />
                      <span>Sigilo profissional e confidencialidade resguardados pela OAB</span>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>

          {/* Scroll down prompt */}
          <div className="pt-8 pb-2 flex justify-center items-center gap-2 text-xs text-[#746c60]">
            <span className="tracking-widest uppercase text-[10px]">Role para conhecer a atuação</span>
            <svg className="w-4 h-4 text-[#817969]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </section>
      </div>

      {/* 4. Bottom Highlights Bar (3 Highlights) */}
      <section className="relative z-20 w-full border-t border-b border-[#80643d]/20 bg-[#fffdf8]/80  shadow-lg">
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
                className="group relative flex flex-col sm:flex-row items-start gap-5 p-6 sm:p-7 rounded-2xl bg-[#fffdf8]/85 hover:bg-[#eee8dc]/90  border border-[#80643d]/20 hover:border-[#806b48]/50 shadow-md transition-all duration-300"
              >
                <motion.div
                  variants={highlightItemVariants}
                  className="relative z-10 shrink-0 w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center rounded-xl bg-[#f7f4ed] border border-[#80643d]/20 group-hover:border-[#806b48]/50 text-[#80643d] transition-all duration-300 shadow-sm"
                >
                  {item.icon}
                </motion.div>

                <div className="relative z-10 flex flex-col flex-1 overflow-hidden">
                  <motion.h3
                    variants={highlightItemVariants}
                    className="font-serif text-lg sm:text-xl font-bold text-[#2b261e] tracking-wide uppercase leading-tight group-hover:text-[#6f5934] transition-colors"
                  >
                    {item.title}
                  </motion.h3>

                  <motion.p
                    variants={highlightItemVariants}
                    className="text-xs sm:text-sm text-[#5e574c] font-light mt-1.5 leading-relaxed"
                  >
                    {item.description}
                  </motion.p>

                  <motion.div
                    variants={highlightLineVariants}
                    className="h-0.5 w-8 bg-amber-500/60 group-hover:w-14 group-hover:bg-amber-400 transition-all duration-300 mt-3"
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
        className="relative min-h-screen flex items-center overflow-hidden bg-[#100d09] text-[#f7f1e6]"
      >
        {/* Cinematic Deeply Blurred Library Background */}
        <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
          <div className="absolute inset-0 scale-110 filter blur-[18px] brightness-[0.32] contrast-[1.05] saturate-[0.65] transform-gpu">
            <Image
              src="/imageye___-_imgi_54_683876091_18582503086018857_3113475253291343600_n.jpg"
              alt="Dra. Amanda Ferraz, advogada, em seu escritório"
              fill
              className="object-cover object-center"
              sizes="100vw"
              quality={75}
            />
          </div>

          <div className="absolute inset-0 bg-gradient-to-r from-[#100d09]/90 via-[#100d09]/78 to-[#100d09]/48" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#100d09]/55 via-transparent to-[#100d09]/96" />
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
              className="lg:col-span-7 flex flex-col space-y-7 pointer-events-auto bg-[#19140e]/95 p-6 sm:p-10 lg:p-12 rounded-2xl border border-[#a78c5d]/35 shadow-xl"
            >
              <div className="inline-flex items-center gap-2.5 px-3.5 py-1 rounded-full bg-[#251d13] border border-[#a78c5d]/40 w-fit">
                <span className="w-2 h-2 rounded-full bg-amber-400" />
                <span className="text-xs font-semibold tracking-[0.22em] text-[#c5b28d] uppercase">
                  ATENDIMENTO JURÍDICO HUMANIZADO
                </span>
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-[#f7f1e6] leading-[1.15]">
                Seus direitos merecem atenção. <br />
                <span className="text-[#c5b28d]">
                  Conte com orientação clara e responsável.
                </span>
              </h2>

              <p className="text-[#d3cabb] text-base sm:text-lg font-light leading-relaxed">
                Cada situação tem sua história e merece ser compreendida com cuidado. Dra. Amanda Ferraz oferece atendimento atencioso, explica os caminhos possíveis e acompanha cada etapa com responsabilidade, transparência e sigilo.
              </p>

              {/* Bullet Points */}
              <div className="space-y-3.5 pt-1">
                <div className="flex items-start gap-4 p-3.5 rounded-xl bg-[#211a11] border border-white/10 hover:border-[#a78c5d]/40 transition-colors">
                  <div className="shrink-0 mt-0.5 p-2 rounded-lg bg-[#312818]/70 border border-[#a78c5d]/30 text-[#c5b28d]">
                    <Building2 className="w-4 h-4" strokeWidth={1.75} />
                  </div>
                  <div className="text-sm leading-relaxed">
                    <strong className="text-[#f7f1e6] font-semibold block sm:inline mr-1.5">
                      Direito de Família:
                    </strong>
                    <span className="text-[#d3cabb] font-light">
                      Divórcio, pensão alimentícia, guarda e orientação em momentos de mudança familiar.
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-3.5 rounded-xl bg-[#211a11] border border-white/10 hover:border-[#a78c5d]/40 transition-colors">
                  <div className="shrink-0 mt-0.5 p-2 rounded-lg bg-[#312818]/70 border border-[#a78c5d]/30 text-[#c5b28d]">
                    <Gavel className="w-4 h-4" strokeWidth={1.75} />
                  </div>
                  <div className="text-sm leading-relaxed">
                    <strong className="text-[#f7f1e6] font-semibold block sm:inline mr-1.5">
                      Direito do Consumidor:
                    </strong>
                    <span className="text-[#d3cabb] font-light">
                      Orientação em cobranças indevidas, questões bancárias, Serasa e golpes digitais.
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-3.5 rounded-xl bg-[#211a11] border border-white/10 hover:border-[#a78c5d]/40 transition-colors">
                  <div className="shrink-0 mt-0.5 p-2 rounded-lg bg-[#312818]/70 border border-[#a78c5d]/30 text-[#c5b28d]">
                    <Users className="w-4 h-4" strokeWidth={1.75} />
                  </div>
                  <div className="text-sm leading-relaxed">
                    <strong className="text-[#f7f1e6] font-semibold block sm:inline mr-1.5">
                      Atendimento próximo:
                    </strong>
                    <span className="text-[#d3cabb] font-light">
                      Escuta atenta, explicações claras e acompanhamento com respeito em todas as etapas.
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <GlowingButton href="#consultoria" size="md">
                  Converse sobre seu caso
                </GlowingButton>
                <button
                  onClick={() => setActiveModal("areas")}
                  className="inline-flex items-center justify-center px-6 py-3.5 rounded-lg bg-[#211a11] hover:bg-[#292014] text-[#f7f1e6] font-semibold text-xs tracking-[0.18em] uppercase transition-all duration-300 border border-[#a78c5d]/35 hover:border-[#a78c5d]/60 text-center cursor-pointer"
                >
                  Conhecer áreas de atuação
                </button>
              </div>
            </motion.div>

            {/* Right Column: 2D Lady Justice artwork enters from the right */}
            <ScrollTriggeredStatue />
          </div>
        </div>
      </section>

      {/* 6. NOVA DOBRA: Compromisso com cada cliente */}
      <section
        id="conduta"
        className="relative z-20 w-full py-20 sm:py-28 bg-gradient-to-b from-[#f7f4ed] via-[#f2ede4] to-[#f7f4ed] border-t border-b border-[#80643d]/20 overflow-hidden"
      >
        {/* Ambient Backlight Behind Lawyer */}
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
              <div className="inline-flex items-center gap-2.5 px-3.5 py-1 rounded-full bg-[#fffdf8] border border-[#806b48]/40 w-fit">
                <Sparkles className="w-3.5 h-3.5 text-[#80643d]" />
                <span className="text-xs font-semibold tracking-[0.22em] text-[#80643d] uppercase">
                  COMPROMISSO COM CADA HISTÓRIA
                </span>
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-[#2b261e] leading-[1.15]">
                Acolhimento, clareza e dedicação em cada atendimento.
              </h2>

              <p className="text-[#5e574c] text-base sm:text-lg font-light leading-relaxed">
                Em situações delicadas, compreender seus direitos e saber quais são os próximos passos faz diferença. Dra. Amanda Ferraz atende cada pessoa com atenção, explica as possibilidades com clareza e atua de forma diligente em Belo Horizonte e em todo o Brasil.
              </p>

              {/* Grid of Badges / Pillars */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div className="p-4 rounded-xl bg-[#fffdf8] border border-[#80643d]/20 hover:border-[#806b48]/40 transition-colors">
                  <span className="text-2xl mb-2 block">⚖️</span>
                  <h4 className="text-xs font-bold text-[#2b261e] uppercase tracking-wider">Acolhimento</h4>
                  <p className="text-[11px] text-[#746c60] mt-1 leading-relaxed">
                    Atendimento atento, respeitoso e com escuta verdadeira.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-[#fffdf8] border border-[#80643d]/20 hover:border-[#806b48]/40 transition-colors">
                  <span className="text-2xl mb-2 block">🌐</span>
                  <h4 className="text-xs font-bold text-[#2b261e] uppercase tracking-wider">Clareza</h4>
                  <p className="text-[11px] text-[#746c60] mt-1 leading-relaxed">
                    Orientação direta para entender seus direitos e os caminhos possíveis.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-[#fffdf8] border border-[#80643d]/20 hover:border-[#806b48]/40 transition-colors">
                  <span className="text-2xl mb-2 block">🛡️</span>
                  <h4 className="text-xs font-bold text-[#2b261e] uppercase tracking-wider">Responsabilidade</h4>
                  <p className="text-[11px] text-[#746c60] mt-1 leading-relaxed">
                    Acompanhamento cuidadoso e comunicação transparente.
                  </p>
                </div>
              </div>

              {/* Direct CTA */}
              <div className="pt-3 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <a
                  href={whatsappDirectUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-lg bg-[#80643d] hover:bg-[#70532d] text-white font-semibold text-xs tracking-[0.14em] uppercase transition-colors duration-200 cursor-pointer"
                >
                  <Phone className="w-4 h-4 text-[#6f5934]" />
                  <span>Falar com a Dra. Amanda</span>
                </a>
                <a
                  href="#advogado"
                  className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-[#fffdf8] hover:bg-[#e9e0d1] text-[#5e574c] hover:text-[#2b261e] font-semibold text-xs tracking-[0.18em] uppercase transition-all duration-300 border border-[#80643d]/20 hover:border-[#806b48]/50"
                >
                  <span>Conhecer a advogada</span>
                  <ChevronRight className="w-4 h-4 text-[#80643d]" />
                </a>
              </div>
            </motion.div>

            {/* Right Column: Marca da Dra. Amanda Ferraz */}
            <motion.div
              initial={{ opacity: 0, x: 40, scale: 0.95 }}
              whileInView={{ opacity: 1, x: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.85, ease: "easeOut" }}
              className="lg:col-span-5 relative flex justify-center lg:justify-end items-end pt-6 lg:pt-0"
            >
              <div className="relative w-full max-w-[420px] lg:max-w-[460px]">
                {/* Main Lawyer Image Cutout - Sem obstruções */}
                <Image
                  src="/imageye___-_imgi_10_656865887_18572500648018857_7151245361150465561_n.jpg"
                  width={800}
                  height={800}
                  alt="Dra. Amanda Ferraz, advogada, em seu escritório"
                  className="relative z-10 w-full h-auto object-contain object-bottom filter brightness-[0.98] contrast-[1.04]"
                />

                {/* Subtle base gradient fade */}
                <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#f7f4ed] via-[#f7f4ed]/70 to-transparent z-15 pointer-events-none" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 7. DA ADVOGADA TITULAR (Substitui o antigo Corpo Diretivo) */}
      <section
        id="advogado"
        className="relative z-20 w-full py-20 sm:py-28 bg-[#f7f4ed] border-b border-[#80643d]/20 overflow-hidden"
      >
        {/* Background Ambient Glow */}

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="text-center max-w-3xl mx-auto mb-14 sm:mb-18 flex flex-col items-center"
          >
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1 rounded-full bg-[#fffdf8] border border-[#806b48]/40 mb-4">
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              <span className="text-xs font-semibold tracking-[0.22em] text-[#80643d] uppercase">
                ADVOCACIA EM BELO HORIZONTE
              </span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-[#2b261e] leading-[1.15] mb-4">
              Dra. Amanda Ferraz
            </h2>

            <p className="text-[#5e574c] text-base sm:text-lg font-light leading-relaxed">
              Advogada em Belo Horizonte, com atuação em Direito de Família e Direito do Consumidor.
            </p>
          </motion.div>

          {/* 3 Blocos Editoriais Separados - Cada foto com seu respectivo bloco de texto */}
          <div className="space-y-10 sm:space-y-14">
            {/* Direito de Família */}
            <motion.div
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.75, ease: "easeOut" }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center bg-[#f2ede4]/90  border border-[#80643d]/20 rounded-2xl p-6 sm:p-10 lg:p-12 shadow-xl hover:border-[#806b48]/40 transition-colors"
            >
              <div className="lg:col-span-6 relative w-full h-[360px] sm:h-[440px] rounded-xl overflow-hidden border border-[#80643d]/20 bg-[#eee9df] shadow-lg group">
                <Image
                  src="/imageye___-_imgi_54_683876091_18582503086018857_3113475253291343600_n.jpg"
                  alt="Dra. Amanda Ferraz, advogada, em seu escritório"
                  fill
                  className="object-cover object-top scale-[1.25] sm:scale-[1.4] -translate-y-[4%] sm:-translate-y-[8%]"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  quality={75}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#f7f4ed] via-transparent to-transparent opacity-60 pointer-events-none" />
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-[#5e574c] pointer-events-none">
                  <span className="bg-[#f7f4ed]/85  px-3 py-1 rounded-full border border-[#80643d]/20 text-[11px]">
                    Atendimento jurídico
                  </span>
                  <span className="bg-[#f7f4ed]/85  px-3 py-1 rounded-full border border-[#80643d]/20 text-[11px] text-[#80643d]">
                    Belo Horizonte
                  </span>
                </div>
              </div>

              <div className="lg:col-span-6 flex flex-col space-y-5">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#eee7d9]/70 border border-[#806b48]/40 w-fit">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                  <span className="text-[11px] font-semibold tracking-[0.2em] text-[#80643d] uppercase">
                    DIREITO DE FAMÍLIA
                  </span>
                </div>

                <h3 className="font-serif text-2xl sm:text-3xl lg:text-[32px] font-bold text-[#2b261e] leading-tight">
                  Divórcio, Guarda e Pensão com Orientação Cuidadosa
                </h3>

                <p className="text-[#5e574c] text-sm sm:text-base font-light leading-relaxed">
                  Questões familiares podem envolver decisões importantes e emoções intensas. A Dra. Amanda oferece orientação jurídica em divórcio, guarda e pensão alimentícia, com escuta, discrição e atenção às particularidades de cada família.
                </p>

                <p className="text-[#746c60] text-xs sm:text-sm font-light leading-relaxed">
                  Atendimento reservado, explicações acessíveis e acompanhamento responsável ao longo do processo.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                  <div className="flex items-center gap-2 text-xs text-[#5e574c] bg-[#fffdf8] p-3 rounded-lg border border-[#80643d]/20">
                    <CheckCircle2 className="w-4 h-4 text-[#80643d] shrink-0" />
                    <span>Divórcio e dissolução de união</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-[#5e574c] bg-[#fffdf8] p-3 rounded-lg border border-[#80643d]/20">
                    <CheckCircle2 className="w-4 h-4 text-[#80643d] shrink-0" />
                    <span>Guarda e convivência familiar</span>
                  </div>
                </div>

                <div className="pt-2">
                  <GlowingButton href="#consultoria" size="sm">
                    Falar sobre Direito de Família
                  </GlowingButton>
                </div>
              </div>
            </motion.div>

            {/* Direito do Consumidor */}
            <motion.div
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.75, ease: "easeOut" }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center bg-[#f2ede4]/90  border border-[#80643d]/20 rounded-2xl p-6 sm:p-10 lg:p-12 shadow-xl hover:border-[#806b48]/40 transition-colors"
            >
              <div className="lg:col-span-6 order-2 lg:order-1 flex flex-col space-y-5">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#eee7d9]/70 border border-[#806b48]/40 w-fit">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                  <span className="text-[11px] font-semibold tracking-[0.2em] text-[#80643d] uppercase">
                    DIREITO DO CONSUMIDOR
                  </span>
                </div>

                <h3 className="font-serif text-2xl sm:text-3xl lg:text-[32px] font-bold text-[#2b261e] leading-tight">
                  Problemas com Bancos, Cobranças e Golpes Digitais
                </h3>

                <p className="text-[#5e574c] text-sm sm:text-base font-light leading-relaxed">
                  Cobranças indevidas, problemas bancários, restrições no Serasa e golpes digitais podem causar prejuízos e insegurança. A Dra. Amanda analisa cada situação e orienta sobre os direitos do consumidor e as medidas cabíveis.
                </p>

                <p className="text-[#746c60] text-xs sm:text-sm font-light leading-relaxed">
                  Atendimento próximo e sem respostas padronizadas: cada cliente recebe acompanhamento direto da Dra. Amanda Ferraz nas etapas importantes.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                  <div className="flex items-center gap-2 text-xs text-[#5e574c] bg-[#fffdf8] p-3 rounded-lg border border-[#80643d]/20">
                    <CheckCircle2 className="w-4 h-4 text-[#80643d] shrink-0" />
                    <span>Cobranças indevidas e dívidas</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-[#5e574c] bg-[#fffdf8] p-3 rounded-lg border border-[#80643d]/20">
                    <CheckCircle2 className="w-4 h-4 text-[#80643d] shrink-0" />
                    <span>Bancos, Serasa e golpes digitais</span>
                  </div>
                </div>

                <div className="pt-2">
                  <a
                    href={whatsappDirectUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#80643d] hover:bg-[#70532d] text-white font-semibold text-xs tracking-wider uppercase transition-all shadow-md w-fit"
                  >
                    <Phone className="w-4 h-4" />
                    <span>Falar sobre Direito do Consumidor</span>
                  </a>
                </div>
              </div>

              <div className="lg:col-span-6 order-1 lg:order-2 relative w-full h-[360px] sm:h-[440px] rounded-xl overflow-hidden border border-[#80643d]/20 bg-[#eee9df] shadow-lg group">
                <Image
                  src="/imageye___-_imgi_9_661235566_18575283289018857_6295689630368430402_n.jpg"
                  alt="Dra. Amanda Ferraz, advogada, em seu escritório"
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  quality={75}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#f7f4ed] via-transparent to-transparent opacity-60 pointer-events-none" />
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-[#5e574c] pointer-events-none">
                  <span className="bg-[#f7f4ed]/85  px-3 py-1 rounded-full border border-[#80643d]/20 text-[11px]">
                    Orientação cuidadosa
                  </span>
                  <span className="bg-[#f7f4ed]/85  px-3 py-1 rounded-full border border-[#80643d]/20 text-[11px] text-[#80643d]">
                    Direito do consumidor
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Atendimento presencial e online */}
            <motion.div
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.75, ease: "easeOut" }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center bg-[#f2ede4]/90  border border-[#80643d]/20 rounded-2xl p-6 sm:p-10 lg:p-12 shadow-xl hover:border-[#806b48]/40 transition-colors"
            >
              <div className="lg:col-span-6 relative w-full h-[380px] sm:h-[480px] rounded-xl overflow-hidden border border-[#80643d]/20 bg-[#eee9df] shadow-lg group">
                <Image
                  src="/imageye___-_imgi_10_656865887_18572500648018857_7151245361150465561_n.jpg"
                  alt="Dra. Amanda Ferraz, advogada, em seu escritório"
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  quality={75}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#f7f4ed]/80 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-[#5e574c] pointer-events-none">
                  <span className="bg-[#f7f4ed]/85  px-3 py-1 rounded-full border border-[#80643d]/20 text-[11px]">
                    Áreas de Atuação
                  </span>
                  <span className="bg-[#f7f4ed]/85  px-3 py-1 rounded-full border border-[#80643d]/20 text-[11px] text-[#80643d]">
                    Atendimento presencial e online
                  </span>
                </div>
              </div>

              <div className="lg:col-span-6 flex flex-col space-y-5">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#eee7d9]/70 border border-[#806b48]/40 w-fit">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                  <span className="text-[11px] font-semibold tracking-[0.2em] text-[#80643d] uppercase">
                    ATUAÇÃO EM BELO HORIZONTE E ONLINE
                  </span>
                </div>

                <h3 className="font-serif text-2xl sm:text-3xl lg:text-[32px] font-bold text-[#2b261e] leading-tight">
                  Orientação Jurídica em Família e Consumo
                </h3>

                <p className="text-[#5e574c] text-sm sm:text-base font-light leading-relaxed">
                  Atendimento jurídico em <strong>Direito de Família</strong> e <strong>Direito do Consumidor</strong>, com atenção às necessidades de cada pessoa e orientação clara sobre seus direitos.
                </p>

                <p className="text-[#746c60] text-xs sm:text-sm font-light leading-relaxed">
                  Atendimento presencial em Belo Horizonte e online para clientes de outras localidades, conforme as necessidades de cada caso.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                  <div className="flex items-center gap-2 text-xs text-[#5e574c] bg-[#fffdf8] p-3 rounded-lg border border-[#80643d]/20">
                    <CheckCircle2 className="w-4 h-4 text-[#80643d] shrink-0" />
                    <span>Direito de Família</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-[#5e574c] bg-[#fffdf8] p-3 rounded-lg border border-[#80643d]/20">
                    <CheckCircle2 className="w-4 h-4 text-[#80643d] shrink-0" />
                    <span>Direito do Consumidor</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-[#5e574c] bg-[#fffdf8] p-3 rounded-lg border border-[#80643d]/20">
                    <CheckCircle2 className="w-4 h-4 text-[#80643d] shrink-0" />
                    <span>Divórcio, guarda e pensão</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-[#5e574c] bg-[#fffdf8] p-3 rounded-lg border border-[#80643d]/20">
                    <CheckCircle2 className="w-4 h-4 text-[#80643d] shrink-0" />
                    <span>Questões bancárias e cobranças</span>
                  </div>
                </div>

                <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                  <a
                    href={whatsappDirectUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#80643d] hover:bg-[#70532d] text-white font-semibold text-xs tracking-wider uppercase transition-all shadow-md"
                  >
                    <Phone className="w-4 h-4" />
                    <span>Falar com a Dra. Amanda</span>
                  </a>
                  <button
                    onClick={() => setActiveModal("areas")}
                    className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-[#fffdf8] hover:bg-[#e9e0d1] text-[#5e574c] hover:text-[#2b261e] font-semibold text-xs tracking-wider uppercase border border-[#80643d]/20 hover:border-[#806b48]/40 transition-all cursor-pointer"
                  >
                    <span>Ver Todas as Áreas</span>
                    <ChevronRight className="w-4 h-4 text-[#80643d]" />
                  </button>
                  <a
                    href="https://www.instagram.com/advamandaferraz/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-[#fffdf8] hover:bg-[#e9e0d1] text-[#5e574c] hover:text-[#2b261e] font-semibold text-xs tracking-wider uppercase border border-[#80643d]/20 hover:border-[#80643d]/35 transition-all"
                  >
                    <InstagramIcon className="w-4 h-4 text-[#80643d]" />
                    <span>@advamandaferraz</span>
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
        className="relative z-20 w-full py-20 sm:py-28 bg-[#100d09] text-[#f7f1e6] border-b border-white/10 overflow-hidden"
      >
        {/* Ambient Focal Light */}

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header & Google Rating Badge */}
          <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-18 flex flex-col items-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#19140e] border border-[#a78c5d]/35 mb-4 shadow-sm">
              <Star className="w-3.5 h-3.5 text-[#80643d] fill-amber-400" />
              <span className="text-xs font-semibold tracking-[0.22em] text-[#c5b28d] uppercase">
                AVALIAÇÕES & PROVA SOCIAL
              </span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-[#f7f1e6] leading-[1.15] mb-4">
              O que os clientes contam
            </h2>

            <p className="text-[#d3cabb] text-base sm:text-lg font-light leading-relaxed mb-6">
              Relatos de clientes sobre o atendimento da Dra. Amanda Ferraz em Belo Horizonte.
            </p>

            {/* Google Reviews Trust Badge */}
            <div className="inline-flex flex-col sm:flex-row items-center gap-4 px-6 py-3.5 rounded-2xl bg-[#211a11] border border-white/10 shadow-lg">
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
                <span className="text-sm font-semibold text-[#f7f1e6]">Avaliações no Google</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-sm font-bold text-[#f7f1e6]">5,0</span>
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-[#c5b28d] fill-amber-400" />
                  ))}
                </div>
                <span className="text-xs text-[#c0b8aa] ml-1">(162 avaliações)</span>
              </div>
            </div>
          </div>

          {/* Reviews Grid (7 Cards) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {REVIEWS.map((review, idx) => (
              <motion.div
                key={review.author}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: idx * 0.1, ease: "easeOut" }}
                className="group relative flex flex-col justify-between p-6 sm:p-7 rounded-2xl bg-[#19140e]/95 hover:bg-[#211a11] border border-white/10 hover:border-[#a78c5d]/40 shadow-[0_8px_24px_rgba(0,0,0,0.28)] transition-all duration-300"
              >
                <div>
                  {/* Top: Stars & Quote Icon */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex gap-1">
                      {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-[#c5b28d] fill-amber-400" />
                      ))}
                    </div>
                    <Quote className="w-5 h-5 text-[#a99b82] group-hover:text-[#c5b28d] transition-colors" />
                  </div>

                  {/* Review Quote Text */}
                  <p className="text-[#d3cabb] text-xs sm:text-[13px] font-light leading-relaxed italic">
                    &ldquo;{review.text}&rdquo;
                  </p>
                </div>

                {/* Bottom: Author Info & Tag */}
                <div className="pt-5 mt-5 border-t border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#e8ddc8] to-[#d1bf9e] border border-[#806b48]/40 flex items-center justify-center text-xs font-bold text-[#6f5934] shadow-sm">
                      {review.author
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-[#f7f1e6] group-hover:text-[#c5b28d] transition-colors">
                        {review.author}
                      </h4>
                      <span className="text-[11px] text-[#c0b8aa] font-light block">{review.time}</span>
                    </div>
                  </div>

                  <span className="text-[10px] font-medium text-[#c5b28d] bg-[#312818]/70 border border-[#a78c5d]/30 px-2 py-0.5 rounded-md">
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
              className="inline-flex items-center gap-2 text-xs sm:text-sm text-[#c5b28d] hover:text-[#f7f1e6] font-medium transition-colors"
            >
              <span>Precisa de orientação jurídica? Fale com a Dra. Amanda.</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* 9. Minimal Footer */}
      <footer className="relative z-20 w-full border-t border-white/10 bg-[#090704] text-[#f7f1e6] py-10 ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            {/* Col 1: Brand */}
            <div className="md:col-span-2 space-y-4">
              <div className="flex items-center gap-3">
                <Image
                  src="/logo.png"
                  width={200}
                  height={200}
                  alt="Dra. Amanda Ferraz — Advogada"
                  className="h-16 sm:h-[4.5rem] w-auto object-contain"
                />
              </div>
              <p className="text-xs text-[#c0b8aa] max-w-sm leading-relaxed font-light">
                Atendimento humanizado em Direito de Família e do Consumidor, em Belo Horizonte e online.
              </p>
              <div className="flex items-center gap-3 pt-1">
                <a
                  href="https://www.instagram.com/advamandaferraz/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg bg-[#19140e] border border-white/10 hover:border-[#a78c5d]/40 flex items-center justify-center text-[#c0b8aa] hover:text-[#c5b28d] transition-colors"
                  aria-label="Instagram @advamandaferraz"
                >
                  <InstagramIcon className="w-4 h-4" />
                </a>
                <a
                  href={whatsappDirectUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg bg-[#19140e] border border-white/10 hover:border-[#a78c5d]/40 flex items-center justify-center text-[#c0b8aa] hover:text-green-400 transition-colors"
                  aria-label="WhatsApp"
                >
                  <Phone className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Col 2: Contato Oficial */}
            <div className="space-y-3 text-xs text-[#c0b8aa]">
              <h4 className="font-bold text-[#f7f1e6] uppercase tracking-wider text-xs">Atendimento</h4>
              <div className="flex items-start gap-2 pt-1">
                <MapPin className="w-4 h-4 text-[#80643d] shrink-0 mt-0.5" />
                <span>R. Domingos Vieira, 587 - Santa Efigênia, Belo Horizonte - MG, 30150-240</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#80643d] shrink-0" />
                <a href="tel:+5531975412091" className="hover:text-[#f7f1e6] transition-colors">
                  (31) 97541-2091
                </a>
              </div>
            </div>

            {/* Col 3: Navegação Rápida */}
            <div className="space-y-2.5 text-xs text-[#c0b8aa]">
              <h4 className="font-bold text-[#f7f1e6] uppercase tracking-wider text-xs">Navegação</h4>
              <div>
                <a href="#inicio" className="hover:text-[#f7f1e6] transition-colors">Início</a>
              </div>
              <div>
                <a href="#filosofia" className="hover:text-[#f7f1e6] transition-colors">Atendimento</a>
              </div>
              <div>
                <a href="#conduta" className="hover:text-[#f7f1e6] transition-colors">Compromisso</a>
              </div>
              <div>
                <a href="#advogado" className="hover:text-[#f7f1e6] transition-colors">Áreas de atuação</a>
              </div>
              <div>
                <a href="#avaliacoes" className="hover:text-[#f7f1e6] transition-colors">Avaliações (5,0 ★)</a>
              </div>
              <div>
                <button onClick={() => setActiveModal("areas")} className="hover:text-[#f7f1e6] transition-colors cursor-pointer">
                  Áreas de Atuação
                </button>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-[#b6ad9d] gap-4">
            <span>
              © {new Date().getFullYear()} Dra. Amanda Ferraz — Advogada. Todos os direitos reservados.
            </span>
            <div className="flex items-center gap-4">
              <span>Atendimento jurídico com ética e sigilo</span>
              <span>•</span>
              <button onClick={() => setActiveModal("contato")} className="hover:text-[#f7f1e6] transition-colors cursor-pointer">
                Fale Conosco
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* 10. Interactive Modals */}
      {activeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80  animate-in fade-in duration-200">
          <div className="relative w-full max-w-2xl bg-[#f2ede4] border border-[#806b48]/40 rounded-2xl p-6 sm:p-8 shadow-xl">
            <button
              onClick={() => setActiveModal(null)}
              className="absolute top-4 right-4 p-2 text-[#746c60] hover:text-[#2b261e] rounded-lg border border-[#80643d]/20 hover:border-[#80643d]/35 cursor-pointer"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {activeModal === "sobre" && (
              <div className="space-y-4">
                <div className="flex items-center gap-3.5 mb-2">
                  <Image
                    src="/logo.png"
                    width={80}
                    height={80}
                    alt="Símbolo da balança dourada da Dra. Amanda Ferraz"
                    className="h-10 w-auto object-contain"
                  />
                </div>
                <h3 className="font-serif text-2xl font-bold text-[#2b261e]">Dra. Amanda Ferraz — Advogada</h3>
                <p className="text-sm text-[#5e574c] leading-relaxed font-light">
                  Com sede em Belo Horizonte, Dra. Amanda Ferraz oferece orientação jurídica em Direito de Família e Direito do Consumidor, com atendimento presencial e online.
                </p>
                <p className="text-sm text-[#5e574c] leading-relaxed font-light">
                  Cada atendimento começa pela escuta. A atuação é conduzida com clareza, discrição e atenção às necessidades de cada pessoa.
                </p>
                <div className="pt-4 border-t border-[#80643d]/20 flex justify-end">
                  <button
                    onClick={() => setActiveModal(null)}
                    className="px-5 py-2.5 bg-[#80643d] text-white text-xs font-semibold tracking-wider uppercase rounded-xl hover:bg-[#70532d] cursor-pointer"
                  >
                    Fechar
                  </button>
                </div>
              </div>
            )}

            {activeModal === "areas" && (
              <div className="space-y-4">
                <span className="text-[10px] font-bold tracking-[0.25em] text-[#80643d] uppercase">
                  ESPECIALIDADES JURÍDICAS
                </span>
                <h3 className="font-serif text-2xl font-bold text-[#2b261e]">Áreas de Atuação</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {[
                    {
                      title: "Direito de Família",
                      desc: "Divórcio, pensão alimentícia, guarda e convivência familiar.",
                    },
                    {
                      title: "Direito do Consumidor",
                      desc: "Cobranças indevidas, problemas bancários, Serasa e golpes digitais.",
                    },
                    {
                      title: "Divórcio e união estável",
                      desc: "Orientação jurídica para decisões e acordos em momentos de mudança familiar.",
                    },
                    {
                      title: "Pensão alimentícia",
                      desc: "Orientação sobre fixação, revisão e cumprimento da pensão.",
                    },
                    {
                      title: "Guarda e convivência",
                      desc: "Acompanhamento jurídico de questões relacionadas à guarda dos filhos.",
                    },
                    {
                      title: "Questões bancárias e digitais",
                      desc: "Análise de cobranças, fraudes e problemas com serviços financeiros.",
                    },
                  ].map((area, idx) => (
                    <div key={idx} className="p-3 bg-[#fffdf8] border border-[#80643d]/20 rounded-xl">
                      <h4 className="text-xs font-bold text-[#2b261e] uppercase">{area.title}</h4>
                      <p className="text-[11px] text-[#746c60] mt-0.5 leading-relaxed">{area.desc}</p>
                    </div>
                  ))}
                </div>
                <div className="pt-4 border-t border-[#80643d]/20 flex justify-end">
                  <button
                    onClick={() => setActiveModal(null)}
                    className="px-5 py-2.5 bg-[#80643d] text-white text-xs font-semibold tracking-wider uppercase rounded-xl hover:bg-[#70532d] cursor-pointer"
                  >
                    Entendido
                  </button>
                </div>
              </div>
            )}

            {activeModal === "contato" && (
              <div className="space-y-4">
                <span className="text-[10px] font-bold tracking-[0.25em] text-[#80643d] uppercase">
                  CANAIS DE ATENDIMENTO
                </span>
                <h3 className="font-serif text-2xl font-bold text-[#2b261e]">Entre em Contato</h3>
                <div className="space-y-3 text-xs text-[#5e574c] pt-1">
                  <p>
                    <strong className="text-[#2b261e] block">Endereço:</strong>
                    R. Domingos Vieira, 587 - Santa Efigênia, Belo Horizonte - MG, 30150-240
                  </p>
                  <p>
                    <strong className="text-[#2b261e] block">Telefone / WhatsApp:</strong>
                    (31) 97541-2091
                  </p>
                  <p>
                    <strong className="text-[#2b261e] block">Instagram:</strong>
                    <a
                      href="https://www.instagram.com/advamandaferraz/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#80643d] hover:text-[#80643d] transition-colors inline-flex items-center gap-1.5 mt-0.5"
                    >
                      <InstagramIcon className="w-3.5 h-3.5 text-[#80643d]" />
                      <span>@advamandaferraz</span>
                    </a>
                  </p>
                  <p>
                    <strong className="text-[#2b261e] block">Atendimento:</strong>
                    Atendimento presencial em Belo Horizonte e online. Entre em contato para agendar.
                  </p>
                </div>
                <div className="pt-4 border-t border-[#80643d]/20 flex justify-between items-center">
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
                    className="px-5 py-2.5 bg-[#fffdf8] border border-[#80643d]/20 text-[#2b261e] text-xs font-semibold tracking-wider uppercase rounded-xl hover:bg-[#e9e0d1] cursor-pointer"
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
