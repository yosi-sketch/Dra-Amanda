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
    `inline-flex items-center justify-center rounded-lg font-semibold uppercase ` +
    `bg-[#80643d] hover:bg-[#70532d] ` +
    `text-[#f7f1e6] border border-[#a78c5d]/50 ` +
    `transition-colors duration-200 cursor-pointer select-none text-center ${sizeClasses} ${className}`;

  const buttonInner = (
    <>
      <span className="flex items-center justify-center gap-2 tracking-[0.14em]">
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
