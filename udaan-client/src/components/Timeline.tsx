"use client";
import React from "react";
import { Globe, Megaphone } from "lucide-react";

/**
 * SIHExactRoadmap.tsx
 * - Pure React + Tailwind + inline SVG
 * - Desktop-first, absolute positioned to match the reference infographic
 * - Tweak numbers in `.canvas` or absolute positions to fine tune pixels
 * - Built by JX Nexus
 */
export default function SIHExactRoadmap() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center py-12">
      <div className="w-[1180px] relative canvas">
        {/* Background soft gradient like original */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-sky-50 to-white" />

        {/* --- Top Row Arrows --- */}
        <ArrowBox
          left={80}
          top={30}
          color="bg-slate-800"
          date="Aug 2025"
          text="SIH Problem Statement Launch"
          arrowDirection="right"
        />
        <ArrowBox
          left={250}
          top={30}
          color="bg-cyan-500"
          date="Aug 2025"
          text="Registration of SPOCs"
          arrowDirection="right"
        />
        <ArrowBox
          left={420}
          top={30}
          color="bg-slate-800"
          date="Aug–Sep 2025"
          text="Internal Hackathon"
          arrowDirection="right"
        />

        {/* Big right curve (loop) as SVG */}
        <svg
          viewBox="0 0 400 260"
          className="absolute right-24 top-6 w-[360px] h-[260px]"
          preserveAspectRatio="xMaxYMin meet"
        >
          {/* outer thick curved path */}
          <path
            d="M 40 40 Q 120 10 200 10 L 320 10 Q 360 10 360 50 L 360 160 Q 360 200 320 200 L 200 200 Q 120 200 40 170"
            stroke="#2EA1D7"
            strokeWidth="26"
            fill="none"
            strokeLinecap="round"
          />
          {/* inner white hole to make ring look thick */}
          <path
            d="M 64 54 Q 120 28 200 28 L 320 28 Q 344 28 344 50 L 344 160 Q 344 182 320 182 L 200 182 Q 120 182 64 156"
            stroke="#ffffff"
            strokeWidth="18"
            fill="none"
            strokeLinecap="round"
          />
        </svg>

        {/* Globe on loop end */}
        <div className="absolute right-20 top-32 flex flex-col items-center">
          <div className="w-20 h-20 bg-sky-400 rounded-full flex items-center justify-center shadow-md">
            <Globe className="w-10 h-10 text-white" />
          </div>
          <div className="mt-2 w-48 text-center text-sky-600 text-sm font-semibold leading-tight">
            Aug–Sep 2025<br />Report Compilation & Uploading on Portal
          </div>
        </div>

        {/* --- Middle Row Arrows (leftwards) --- */}
        <ArrowBox
          left={540}
          top={200}
          color="bg-orange-500"
          date="Aug–Sep 2025"
          text="Nomination of Top (45+5) Teams & Submission of Ideas on Portal"
          arrowDirection="left"
        />
        <ArrowBox
          left={370}
          top={200}
          color="bg-purple-600"
          date="Sep–Oct 2025"
          text="Screening of Ideas"
          arrowDirection="left"
        />
        <ArrowBox
          left={200}
          top={200}
          color="bg-orange-500"
          date="Oct 2025"
          text="Result Publication"
          arrowDirection="left"
        />

        {/* Purple U-turn loop on left surrounding megaphone */}
        <svg
          viewBox="0 0 220 220"
          className="absolute left-8 top-180 w-[220px] h-[220px]"
          preserveAspectRatio="xMinYMin meet"
        >
          <path
            d="M 160 20 Q 100 20 80 40 L 60 60 Q 40 80 40 120 Q 40 160 80 180 L 140 180"
            stroke="#6D2EFF"
            strokeWidth="36"
            fill="none"
            strokeLinecap="round"
          />
        </svg>

        {/* Megaphone circle and label inside U-turn */}
        <div className="absolute left-24 top-[240px] flex flex-col items-center">
          <div className="w-20 h-20 bg-violet-600 rounded-full flex items-center justify-center shadow-md">
            <Megaphone className="w-9 h-9 text-white" />
          </div>
          <div className="mt-2 w-44 text-center text-violet-600 font-semibold text-sm leading-tight">
            Communication of Result to Finalist Teams
          </div>
        </div>

        {/* small Oct 2025 badge for megaphone */}
        <div className="absolute left-18 top-[220px]">
          <div className="w-12 h-12 rounded-full bg-violet-600 flex items-center justify-center text-white font-bold text-sm">
            Oct
            <div className="text-[10px]">2025</div>
          </div>
        </div>

        {/* --- Bottom Row Arrows (rightwards) --- */}
        <ArrowBox
          left={160}
          top={360}
          color="bg-red-500"
          date="Oct 2025"
          text="Mentoring & Training Sessions"
          arrowDirection="right"
        />
        <ArrowBox
          left={370}
          top={360}
          color="bg-slate-800"
          date="Nov 2025"
          text="Announcement of Shortlist Students for SIH Grand Finale"
          arrowDirection="right"
        />
        <ArrowBox
          left={620}
          top={360}
          color="bg-red-500"
          date="Dec 2025"
          text="SIH Grand Finale & Winner Announcement"
          arrowDirection="right"
        />

        {/* footer signature */}
        <div className="absolute left-0 right-0 bottom-6 text-center text-sm text-slate-500">
          Designed & built by <span className="font-semibold text-indigo-600">JX Nexus</span>
        </div>
      </div>

      {/* Inline styles for arrows (right & left clips) */}
      <style jsx>{`
        .canvas { font-family: Inter, ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial; }

        /* helper for small numeric left top values used above */
        .left-18 { left: 72px; } /* small custom helper used for megaphone badge */

        /* ensure pixel snapping while keeping rounded arrow tails */
        .arrow-date {
          padding: 10px 18px;
          border-radius: 8px;
          font-weight: 700;
          font-size: 14px;
          box-shadow: 0 6px 18px rgba(16,24,40,0.08);
        }

        .arrow-right {
          clip-path: polygon(0 0, calc(100% - 18px) 0, 100% 50%, calc(100% - 18px) 100%, 0 100%);
          margin-right: -18px;
        }
        .arrow-left {
          clip-path: polygon(18px 0, 100% 0, 100% 100%, 18px 100%, 0 50%);
          margin-left: -18px;
        }

        /* small responsive scale down for narrower screens */
        @media (max-width: 1200px) {
          .canvas { transform: scale(0.95); transform-origin: top center; }
        }
        @media (max-width: 1000px) {
          .canvas { transform: scale(0.8); transform-origin: top center; }
        }
      `}</style>
    </div>
  );
}

/* ArrowBox component = rectangular badge with arrow triangle (left/right) and description below */
function ArrowBox({
  left,
  top,
  color,
  date,
  text,
  arrowDirection = "right",
}: {
  left: number;
  top: number;
  color: string;
  date: string;
  text: string;
  arrowDirection?: "right" | "left";
}) {
  const posStyle: React.CSSProperties = { left: `${left}px`, top: `${top}px` };
  const arrowClass = arrowDirection === "right" ? "arrow-right" : "arrow-left";
  return (
    <div className="absolute" style={posStyle}>
      <div className={`${arrowClass} ${color} arrow-date text-white`}>
        <div className="whitespace-nowrap">{date}</div>
      </div>
      <div style={{ width: 220 }} className="mt-4 text-sm font-semibold text-slate-800 leading-tight">
        {text}
      </div>
    </div>
  );
}
