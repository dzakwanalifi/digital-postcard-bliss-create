
import React from "react";
import { useParams, Link } from "react-router-dom";

const ViewLogo = () => (
  <div className="flex flex-col items-center mt-12 mb-2 select-none">
    <span className="text-[1.8rem] font-black font-inter tracking-wide text-ngepos drop-shadow-sm" style={{letterSpacing: "0.08em"}}>
      Ng<span className="relative">
        ep
        <span
          className="absolute -right-3 -top-1"
          style={{
            fontSize: "0.7rem",
            color: "#1092a2",
            fontWeight: "700",
            border: "2px dotted #FFA500",
            borderRadius: "50%",
            padding: "1.1px 3.7px",
            marginLeft: "1.8px",
            fontFamily: "monospace",
            background: "rgba(255,255,255,0.7)"
          }}
        >o</span>
      </span>s
    </span>
    <span className="text-ngepos uppercase font-semibold tracking-[0.16em] font-inter text-xs mt-1">Digital Postcard</span>
  </div>
);

export default function ViewPostcard() {
  const { id } = useParams<{ id: string }>();

  // Simulating: If "id" === "notfound", display not found state.
  if (id === "notfound") {
    return (
      <div className="w-full h-[100dvh] flex flex-col items-center justify-center bg-gray-50">
        <ViewLogo />
        <div className="mt-12 mb-3 px-6 text-[2.4rem] text-gray-400 font-black text-center">Postcard Not Found</div>
        <Link to="/" className="mt-5 px-6 py-2.5 rounded-xl font-semibold text-white bg-ngepos hover:bg-ngepos-dark transition text-lg shadow-lg">
          Create Your Own Postcard
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full h-[100dvh] flex flex-col items-center justify-center bg-white">
      <ViewLogo />
      <p className="text-sm text-gray-500 mb-3">A digital postcard for you</p>
      <div className="w-full max-w-xl h-[350px] md:h-[460px] bg-gray-100 rounded-2xl shadow-lg flex items-center justify-center border border-gray-200 mb-8">
        <div className="flex flex-col items-center justify-center w-full h-full gap-2 opacity-80 select-none">
          <span className="text-5xl" aria-label="3d preview">🖼️</span>
          <span className="mt-2 text-base text-neutral-500 font-semibold tracking-wide">3D Postcard Preview Placeholder</span>
        </div>
      </div>
      <Link to="/" className="mt-auto mb-10 px-6 py-2.5 rounded-xl font-semibold text-white bg-ngepos hover:bg-ngepos-dark transition text-lg shadow-lg">
        Create Your Own Postcard
      </Link>
    </div>
  );
}
