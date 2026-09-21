"use client";

import React from "react";

interface GlowingButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
  size?: "sm" | "md" | "lg";
}

export default function GlowingButton({
  children,
  href,
  onClick,
  className = "",
  size = "md",
}: GlowingButtonProps) {
  const sizeClasses = {
    sm: "px-4 py-2.5 text-[11px] tracking-[0.14em]",
    md: "px-7 py-3.5 text-xs tracking-[0.16em]",
    lg: "px-8 py-4 text-xs sm:text-sm tracking-[0.16em]",
  }[size];

  const baseStyles =
    `group relative inline-flex items-center justify-center rounded-[15px] font-semibold uppercase ` +
    `bg-[#0c121d] hover:bg-[#141e30] backdrop-blur-md ` +
    `text-[#f1f5f9] hover:text-white border border-blue-500/40 hover:border-blue-400/80 ` +
    `shadow-[0_4px_18px_rgba(0,0,0,0.6)] hover:shadow-[0_6px_24px_rgba(0,0,0,0.8),0_0_18px_rgba(37,99,235,0.25)] ` +
    `transition-all duration-400 overflow-hidden cursor-pointer select-none text-center ${sizeClasses} ${className}`;

  const buttonInner = (
    <>
      {/* Subtle luxury edge sheen on hover */}
      <span
        className="pointer-events-none absolute inset-0 rounded-[15px] bg-gradient-to-r from-transparent via-blue-400/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400"
        aria-hidden="true"
      />

      {/* Button label */}
      <span className="relative z-10 flex items-center justify-center gap-2 tracking-[0.16em]">
        {children}
      </span>
    </>
  );

  if (href) {
    return (
      <a href={href} className={baseStyles}>
        {buttonInner}
      </a>
    );
  }

  return (
    <button onClick={onClick} className={baseStyles}>
      {buttonInner}
    </button>
  );
}
