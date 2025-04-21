
import React, { useState } from "react";
import { Check, X, Upload, Image as ImageIcon, Copy, Save, Share } from "lucide-react";

type Props = {
  isMobile: boolean;
};

const templates = [
  { id: "airmail", name: "Air Mail" },
  { id: "kraft", name: "Kraft Klasik" },
  { id: "memo", name: "Memo Elegan" },
  { id: "catatan", name: "Catatan Lapangan" },
];
const fonts = [
  { id: "oooh", label: "Oooh Baby" },
  { id: "reenie", label: "Reenie Beanie" },
  { id: "indie", label: "Indie Flower" },
  { id: "pacifico", label: "Pacifico" },
];

function Section({ title, children }: { title?: string; children: React.ReactNode }) {
  return (
    <section className="mb-8 last:mb-0">
      {title && (
        <h3 className="text-md font-bold font-inter text-gray-700 mb-2 uppercase tracking-wide opacity-80">{title}</h3>
      )}
      <div>{children}</div>
    </section>
  );
}
function Divider() {
  return <div className="my-4 border-b border-gray-200"></div>;
}

// Template picker (card select)
function TemplatePicker({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <div className="grid grid-cols-2 gap-3">
      {templates.map((t) => (
        <button
          key={t.id}
          className={`rounded-lg border ${
            value === t.id
              ? "border-ngepos bg-ngepos/10 shadow-sm"
              : "border-gray-200 bg-gray-50 hover:border-ngepos/40"
          } flex items-center justify-center h-[36px] font-semibold text-gray-700 transition-all duration-150`}
          onClick={() => onChange(t.id)}
        >
          {t.name}
          {value === t.id && (
            <span className="ml-2 text-ngepos">
              <Check size={18} />
            </span>
          )}
        </button>
      ))}
    </div>
  );
}

export function ControlPanel({ isMobile }: Props) {
  const [selectedTemplate, setSelectedTemplate] = useState(templates[0].id);
  const [mainMessage, setMainMessage] = useState("");
  const [note, setNote] = useState("");
  const [from, setFrom] = useState("");
  const [font, setFont] = useState(fonts[0].id);
  const [backImage, setBackImage] = useState<File | null>(null);
  const [backImageState, setBackImageState] = useState<"none" | "loading" | "edit" | "applied">("none");
  const [stamp, setStamp] = useState<File | null>(null);
  const [customId, setCustomId] = useState("");
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [savedUrl, setSavedUrl] = useState<string | null>(null);

  // Simulate loading/back image states.
  function handleBackImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files?.length) return;
    setBackImageState("loading");
    setTimeout(() => {
      setBackImage(e.target.files![0]);
      setBackImageState("edit");
    }, 650);
  }

  // --- FORM SUBMIT MOCK ---
  function handleSave() {
    setSaving(true);
    setSaveError(null);
    setTimeout(() => {
      if (!customId.match(/^[a-z0-9\-]{3,}$/)) {
        setSaveError("Invalid ID: Use lowercase, numbers and hyphens.");
        setSaving(false);
        return;
      }
      if (customId === "taken") {
        setSaveError("ID already taken.");
        setSaving(false);
        return;
      }
      setSavedUrl(window.location.origin + "/" + customId);
      setSaving(false);
    }, 1500);
  }

  return (
    <form
      className="w-full flex flex-col gap-2 text-sm font-inter text-neutralBody"
      onSubmit={e => {
        e.preventDefault();
        if (!savedUrl) handleSave();
      }}
    >
      {/* TEMPLATE */}
      <Section title="Template">
        <TemplatePicker value={selectedTemplate} onChange={setSelectedTemplate} />
      </Section>

      <Divider />

      {/* TEXT & FONT */}
      <Section title="Text & Font">
        <div className="mb-2">
          <label className="text-xs font-medium text-gray-500 mb-1 block">Main Message</label>
          <textarea
            className="w-full px-3 py-2 rounded-md border border-gray-200 bg-white resize-none shadow-inner focus:border-ngepos/50 focus:ring-1 focus:ring-ngepos transition"
            rows={3}
            maxLength={750}
            value={mainMessage}
            onChange={e => setMainMessage(e.target.value)}
            placeholder="Wish you were here..."
          />
          <div className="text-xs text-gray-400 text-right">{mainMessage.length}/750</div>
        </div>
        <div className="mb-2 flex gap-2">
          <div className="flex-1">
            <label className="text-xs font-medium text-gray-500 mb-1 block">Note/Address</label>
            <textarea
              className="w-full px-3 py-1.5 rounded-md border border-gray-200 bg-white resize-none shadow-inner focus:border-ngepos/40 focus:ring-1 focus:ring-ngepos transition"
              rows={2}
              maxLength={200}
              value={note}
              onChange={e => setNote(e.target.value)}
              placeholder="Jl. Karya Post No. 2"
            />
            <div className="text-xs text-gray-400 text-right">{note.length}/200</div>
          </div>
          <div className="w-24">
            <label className="text-xs font-medium text-gray-500 mb-1 block">From</label>
            <input
              className="w-full px-2 py-1.5 rounded-md border border-gray-200 bg-white shadow-inner focus:border-ngepos/40 focus:ring-1 focus:ring-ngepos transition"
              maxLength={80}
              value={from}
              onChange={e => setFrom(e.target.value)}
              placeholder="Nama"
            />
            <div className="text-xs text-gray-400 text-right">{from.length}/80</div>
          </div>
        </div>
        <div className="mb-1">
          <label className="text-xs font-medium text-gray-500 mb-1 block">Handwritten Font</label>
          <select
            className="w-full px-3 py-2 rounded-md border border-gray-200 bg-white shadow-inner focus:border-ngepos/40 focus:ring-1 focus:ring-ngepos transition font-semibold"
            value={font}
            onChange={e => setFont(e.target.value)}
          >
            {fonts.map((f, i) => (
              <option key={f.id} value={f.id} className="">
                {f.label}
              </option>
            ))}
          </select>
        </div>
      </Section>

      <Divider />

      {/* BACK IMAGE */}
      <Section title="Back Image">
        {/* Upload/initial state */}
        {backImageState === "none" && (
          <div className="flex flex-col items-start gap-2">
            <label className="inline-flex items-center px-4 py-2 bg-ngepos text-white rounded-lg shadow cursor-pointer hover:bg-ngepos-dark transition-colors gap-2 font-semibold text-sm">
              <Upload size={18} /> Choose Back Image...
              <input
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleBackImageUpload}
              />
            </label>
          </div>
        )}
        {/* Loading */}
        {backImageState === "loading" && (
          <div className="flex items-center text-ngepos gap-2 mt-2 animate-pulse font-semibold">
            <span className="animate-spin">
              <ImageIcon size={22} />
            </span>
            Loading...
          </div>
        )}
        {/* Edit mode (pan/zoom UI placeholder) */}
        {backImageState === "edit" && (
          <div className="w-full">
            <div className="mb-2 bg-gray-100/60 w-full aspect-[3/2] rounded-lg flex items-center justify-center border border-gray-200 overflow-hidden relative">
              <span className="text-5xl text-gray-300">🖼️</span>
              {/* Real pan/zoom ignored for stub */}
              <div className="absolute bottom-2 right-2 text-xs text-gray-400 font-semibold bg-white/70 rounded px-2 py-0.5 shadow-md">Drag to pan</div>
            </div>
            <input
              type="range"
              min={1}
              max={3}
              step={0.05}
              defaultValue={1}
              className="w-full accent-ngepos mt-1"
            />
            <div className="flex gap-2 mt-2">
              <button type="button" className="px-3 py-1 rounded bg-gray-200 text-gray-700 text-xs font-semibold hover:bg-gray-300" onClick={() => setBackImageState("edit")}>Reset View</button>
              <button type="button" className="px-3 py-1 rounded bg-ngepos text-white text-xs font-semibold hover:bg-ngepos-dark" onClick={() => setBackImageState("applied")}>
                <Check size={14} className="inline" /> Apply Image
              </button>
              <button type="button" className="px-3 py-1 rounded bg-white border text-gray-700 text-xs font-semibold hover:bg-gray-50" onClick={() => { setBackImage(null); setBackImageState("none"); }}>
                <X size={13} className="inline" /> Cancel
              </button>
            </div>
          </div>
        )}
        {/* Applied state */}
        {backImageState === "applied" && (
          <div className="flex flex-col items-start gap-2 w-full">
            <div className="flex items-center gap-2">
              <div className="w-14 h-10 bg-gray-200 rounded-md border border-gray-200 flex items-center justify-center overflow-hidden">
                <span className="text-lg text-ngepos/70">🖼️</span>
              </div>
              <button type="button" onClick={() => { setBackImageState("edit"); }} className="ml-2 px-2 py-1 rounded bg-gray-50 border text-gray-600 text-xs font-semibold hover:bg-ngepos/10">Change Image</button>
            </div>
          </div>
        )}
      </Section>

      <Divider />

      {/* STAMP */}
      <Section title="Stamp">
        {!stamp && (
          <label className="inline-flex items-center px-4 py-2 bg-ngepos text-white rounded-lg shadow cursor-pointer hover:bg-ngepos-dark transition-colors gap-2 font-semibold text-sm">
            <Upload size={18} /> Choose Stamp Image...
            <input
              type="file"
              className="hidden"
              accept="image/*"
              onChange={(e) => {
                if (e.target.files?.length) setStamp(e.target.files[0]);
              }}
            />
          </label>
        )}
        {stamp && (
          <div className="flex items-center mt-2 gap-2">
            <div className="w-16 h-16 rounded bg-gray-100 border flex items-center justify-center overflow-hidden object-contain">
              <span className="text-2xl text-ngepos/70">📮</span>
            </div>
            <button type="button" className="ml-2 text-gray-400 hover:text-red-400" onClick={() => setStamp(null)}>
              <X size={18} />
            </button>
          </div>
        )}
      </Section>

      <Divider />

      {/* SAVE & SHARE */}
      <Section title="Save & Share">
        {!savedUrl && (
          <>
            <input
              className="w-full px-3 py-2 rounded border border-gray-200 bg-white shadow-inner mb-1 focus:border-ngepos/40 focus:ring-1 focus:ring-ngepos transition"
              maxLength={32}
              required
              minLength={3}
              value={customId}
              onChange={e => setCustomId(e.target.value.toLowerCase().replace(/[^a-z0-9\-]/g, ""))}
              placeholder="kartu-spesial-kamu"
              disabled={saving}
              autoFocus
            />
            <div className="text-xs text-gray-400 mb-3">lowercase, numbers, hyphens, min 3 chars</div>
            <button
              type="submit"
              disabled={!customId || saving}
              className={`w-full flex items-center justify-center gap-2 px-5 py-2.5 font-semibold text-white rounded-lg bg-ngepos shadow transition-all
                ${(!customId || saving) ? "opacity-60 cursor-not-allowed" : "hover:bg-ngepos-dark"}`}
            >
              {saving ? <span className="animate-spin">
                <Save size={18} />
              </span> : <Save size={18} />}
              {saving ? "Saving..." : "Save & Share"}
            </button>
            {saveError && <div className="text-red-600 font-semibold text-xs mt-2">{saveError}</div>}
          </>
        )}
        {/* Success state */}
        {savedUrl && (
          <div className="flex flex-col items-center gap-3 pt-2 animate-fade-in">
            <div className="flex items-center gap-2 text-lg font-bold text-ngepos">
              <Share size={18} /> Postcard Saved!
            </div>
            <div className="flex w-full gap-2 mt-2">
              <input className="flex-1 px-3 py-2 rounded-l border border-gray-200 bg-gray-50 shadow-inner text-gray-600 font-semibold select-all" readOnly value={savedUrl} />
              <button type="button"
                className="rounded-r px-3 py-2 bg-ngepos text-white hover:bg-ngepos-dark font-semibold"
                title="Copy Link"
                onClick={() => {
                  navigator.clipboard.writeText(savedUrl);
                }}>
                <Copy size={19} />
              </button>
            </div>
            <div className="flex gap-2 pt-2">
              <a href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(savedUrl)}`} target="_blank" rel="noreferrer" className="text-ngepos hover:underline text-xs font-semibold flex items-center gap-1">
                <Share size={14} /> Twitter
              </a>
              <a href={`https://wa.me/?text=${encodeURIComponent("Check out my postcard! " + savedUrl)}`} target="_blank" rel="noreferrer" className="text-ngepos hover:underline text-xs font-semibold flex items-center gap-1">
                <Share size={14} /> WhatsApp
              </a>
              <a href={`https://facebook.com/sharer/sharer.php?u=${encodeURIComponent(savedUrl)}`} target="_blank" rel="noreferrer" className="text-ngepos hover:underline text-xs font-semibold flex items-center gap-1">
                <Share size={14} /> Facebook
              </a>
            </div>
            <button type="button"
              className="mt-5 w-full rounded-lg py-2 bg-white border border-ngepos text-ngepos hover:bg-ngepos/5 font-semibold shadow"
              onClick={() => {
                setSavedUrl(null);
                setCustomId("");
                setFrom("");
                setMainMessage("");
                setNote("");
                setBackImage(null);
                setBackImageState("none");
                setStamp(null);
                setSaveError(null);
              }}>
              Create New Postcard
            </button>
          </div>
        )}
      </Section>
    </form>
  );
}
