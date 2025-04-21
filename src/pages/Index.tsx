
import React, { useState } from "react";
import { ControlPanel } from "../components/ControlPanel";
import { useIsMobile } from "../hooks/use-mobile";

const Logo = () => (
  <div className="flex flex-col items-center justify-center mb-4 select-none">
    <span className="text-[2.8rem] md:text-[3.7rem] font-black tracking-wide font-inter text-ngepos drop-shadow-sm" style={{ letterSpacing: "0.08em" }}>
      Ng<span className="relative">
        ep
        <span
          className="absolute -right-4 -top-2 hidden md:inline"
          style={{
            fontSize: "1.1rem",
            color: "#1092a2",
            fontWeight: "700",
            rotate: "-14deg",
            textShadow: "0 1px 2px rgba(0,0,0,0.13)",
          }}
        >
          <span style={{
            border: "2px dotted #FFA500",
            borderRadius: "50%",
            padding: "1.7px 6px",
            marginLeft: "4px",
            fontSize: "0.84em",
            fontWeight: "800",
            fontFamily: "monospace",
            background: "rgba(255,255,255,0.7)"
          }}>o</span>
        </span>
      </span>s
    </span>
    <span className="text-ngepos uppercase font-semibold tracking-[0.16em] font-inter text-xs mt-2">Digital Postcard</span>
  </div>
);

const Tagline = () => (
  <h2 className="text-lg md:text-2xl text-neutral-800 mb-8 font-inter font-medium opacity-80">
    Create &amp; Share <span className="text-ngepos font-semibold">3D Digital Postcards</span>
  </h2>
);

// Landing illustration placeholder (stacked postcards)
const PostcardIllustration = () => (
  <div className="relative w-[300px] h-[210px] md:w-[400px] md:h-[260px] mx-auto group cursor-pointer">
    {/* Back card */}
    <div className="absolute left-3 top-7 w-full rounded-xl h-full bg-gray-200 shadow-ngefos scale-105" style={{ zIndex: 1, filter: "blur(1px) brightness(0.98)" }} />
    {/* Middle card */}
    <div className="absolute left-1 top-3 w-full rounded-xl h-full bg-white shadow-ngefos" style={{ zIndex: 2, filter: "brightness(0.97)" }} />
    {/* Top Card - hover animation */}
    <div className="absolute w-full h-full bg-gradient-to-tr from-teal-100 to-ngepos/30 rounded-2xl shadow-lg border border-ngepos border-dashed
    flex items-center justify-center text-4xl font-black text-ngepos/50 transition-transform duration-300 group-hover:-translate-y-3 group-hover:shadow-xl group-active:scale-103"
      style={{
        zIndex: 3,
        transition: "transform 350ms cubic-bezier(0.4,0,0.2,1), box-shadow 350ms",
      }}>
      <span role="img" aria-label="postcard">✉️</span>
    </div>
  </div>
);

const Footer = () => (
  <footer className="absolute inset-x-0 bottom-0 pb-3 w-full pointer-events-none text-center text-xs text-neutral-500 font-medium opacity-70 select-none">
    &copy; {new Date().getFullYear()} Ngepos &mdash; Made with <span className="text-pink-400">♥</span>
  </footer>
);

export default function Index() {
  const [creating, setCreating] = useState(false);
  const isMobile = useIsMobile();

  // Main layout covering viewport
  return (
    <div className="relative w-full h-[100dvh] min-h-[100vh] font-inter bg-gray-50 antialiased overflow-hidden transition-colors duration-300">
      {/* LANDING STATE */}
      {!creating && (
        <div className="flex flex-col items-center justify-center h-full w-full">
          <Logo />
          <Tagline />
          <div className="my-12">
            <PostcardIllustration />
          </div>
          <button
            className="mt-10 px-8 py-3 rounded-xl font-semibold text-white bg-ngepos text-lg shadow-lg backdrop-blur-lg hover:bg-ngepos-dark active:scale-98 focus:outline-none transition-all duration-200"
            style={{
              boxShadow: "0 4px 16px rgba(23,162,184,0.08)",
              letterSpacing: "0.04em"
            }}
            onClick={() => setCreating(true)}
          >
            Start Creating Postcard
          </button>
          <Footer />
        </div>
      )}

      {/* CREATING STATE */}
      {creating && (
        <div className="absolute inset-0 w-full h-full flex flex-col md:flex-row transition-all duration-500 animate-fade-in">
          {/* LEFT: Control Panel */}
          <div
            className={`bg-white/80 backdrop-blur-lg shadow-xl border border-gray-200 rounded-xl flex-none
              px-5 md:px-8 py-8 md:py-8
              w-full md:w-[420px] max-w-full
              md:h-full h-auto
              transition-transform duration-300
              z-10
              ${isMobile ? "order-2 w-full mt-auto" : "order-1"}
            `}
            style={{
              minWidth: isMobile ? "100vw" : "340px",
              maxHeight: isMobile ? "65vh" : "calc(100vh - 0px)",
              overflowY: "auto",
            }}
          >
            <ControlPanel isMobile={isMobile} />
          </div>
          {/* RIGHT: 3D Preview */}
          <div
            className={`flex-1 flex flex-col justify-center items-center bg-white/80 md:bg-white min-h-0 md:min-h-full overflow-hidden
              ${isMobile ? "order-1 w-full pt-2" : "order-2"}
            `}
            style={{
              minHeight: isMobile ? "38vh" : "100vh",
              height: isMobile ? "38vh" : "100vh", // pinch for full-viewport
            }}
          >
            <div className="w-full max-w-2xl h-[300px] md:h-[440px] bg-gray-100 rounded-2xl shadow-lg flex items-center justify-center border border-gray-200">
              <div className="flex flex-col items-center justify-center w-full h-full gap-2 opacity-75 select-none">
                <span className="text-5xl" aria-label="3d preview">🖼️</span>
                <span className="mt-2 text-base text-neutral-500 font-semibold tracking-wide">3D Postcard Preview Placeholder</span>
                <span className="text-xs text-neutral-400">Your interactive postcard appears here!</span>
              </div>
            </div>
          </div>
          {/* Absolutely positioned footer on mobile */}
          {isMobile && (
            <div className="absolute bottom-0 w-full left-0 right-0">
              <Footer />
            </div>
          )}
        </div>
      )}
      {/* Non-mobile: bottom footer */}
      {!isMobile && <Footer />}
    </div>
  );
}
