"use client";

import React from "react";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  showText?: boolean;
}

export function Logo({ size = "md", showText = true }: LogoProps) {
  const iconSize = size === "sm" ? 28 : size === "md" ? 36 : 48;
  const textSize = size === "sm" ? "text-lg" : size === "md" ? "text-xl" : "text-2xl";

  return (
    <div className="flex items-center gap-2.5">
      <svg
        width={iconSize}
        height={iconSize}
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="pipeline-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#059669" />
            <stop offset="50%" stopColor="#10b981" />
            <stop offset="100%" stopColor="#06b6d4" />
          </linearGradient>
        </defs>
        <rect width="48" height="48" rx="12" fill="url(#pipeline-grad)" />
        {/* Pipeline/funnel icon */}
        <path
          d="M14 14h20l-4 8-4-4-4 4-4-8z"
          fill="white"
          fillOpacity="0.9"
        />
        <path
          d="M16 28h16l-4 8-4-4-4 4-4-8z"
          fill="white"
          fillOpacity="0.65"
        />
        {/* Dots representing pipeline stages */}
        <circle cx="18" cy="20" r="1.5" fill="white" fillOpacity="0.8" />
        <circle cx="24" cy="20" r="1.5" fill="white" fillOpacity="0.8" />
        <circle cx="30" cy="20" r="1.5" fill="white" fillOpacity="0.8" />
      </svg>
      {showText && (
        <span className={`${textSize} font-bold tracking-tight`}>
          <span className="text-foreground">Pipeline</span>
          <span className="text-emerald-600 dark:text-emerald-400">CRM</span>
        </span>
      )}
    </div>
  );
}
