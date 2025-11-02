"use client";

import React, { useEffect, useRef, useState } from "react";

export default function TTSButton({ text = "", lang = "es-CO", label = "Leer alerta", small = false }) {
  const synth = typeof window !== "undefined" ? window.speechSynthesis : null;
  const [voices, setVoices] = useState([]);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const selectedVoiceRef = useRef(null);

  useEffect(() => {
    if (!synth) return;

    const load = () => {
      const v = synth.getVoices() || [];
      setVoices(v);
      // prefer a voice matching the requested lang
      selectedVoiceRef.current = v.find((vv) => vv.lang && vv.lang.startsWith(lang)) || v[0] || null;
    };

    load();
    synth.onvoiceschanged = load;
    return () => {
      if (synth) synth.onvoiceschanged = null;
    };
  }, [lang, synth]);

  useEffect(() => {
    if (!synth) return;
    const onEnd = () => setIsSpeaking(false);

    window.addEventListener("speechend", onEnd);
    return () => window.removeEventListener("speechend", onEnd);
  }, [synth]);

  const speak = () => {
    if (!synth) {
      alert("Text-to-speech no disponible en este navegador.");
      return;
    }
    if (synth.speaking) {
      synth.cancel();
    }
    if (!text || text.trim().length === 0) return;
    const u = new SpeechSynthesisUtterance(text);
    if (selectedVoiceRef.current) u.voice = selectedVoiceRef.current;
    u.lang = lang;
    u.rate = 1;
    u.pitch = 1;
    u.onstart = () => setIsSpeaking(true);
    u.onend = () => setIsSpeaking(false);
    u.onpause = () => setIsSpeaking(false);
    u.onerror = () => setIsSpeaking(false);
    synth.speak(u);
  };

  const stop = () => {
    if (!synth) return;
    synth.cancel();
    setIsSpeaking(false);
  };

  if (typeof window === "undefined" || !("speechSynthesis" in window)) {
    return (
      <button className={small ? "btn" : "btn btn-ghost"} disabled title="TTS no disponible">
        {label}
      </button>
    );
  }

  return (
    <div style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
      <button
        onClick={() => (isSpeaking ? stop() : speak())}
        className={isSpeaking ? "btn btn-primary" : "btn"}
        aria-pressed={isSpeaking}
        title={isSpeaking ? "Detener lectura" : "Leer texto"}
      >
        {isSpeaking ? "Detener" : label}
      </button>
      {isSpeaking && (
        <button onClick={stop} className="btn btn-ghost" title="Parar">
          Parar
        </button>
      )}
    </div>
  );
}
