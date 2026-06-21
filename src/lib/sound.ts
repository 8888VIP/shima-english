"use client";

type SoundKind = "tap" | "success" | "error" | "complete";

const patterns: Record<SoundKind, Array<[number, number, OscillatorType]>> = {
  tap: [[520, 0.045, "sine"]],
  success: [[660, 0.07, "sine"], [880, 0.09, "sine"]],
  error: [[180, 0.08, "square"], [140, 0.06, "square"]],
  complete: [[523, 0.08, "triangle"], [659, 0.08, "triangle"], [784, 0.12, "triangle"]],
};

let audioContext: AudioContext | null = null;

function getAudioContext() {
  if (typeof window === "undefined") return null;
  const AudioContextClass = window.AudioContext || window.webkitAudioContext;
  if (!AudioContextClass) return null;
  audioContext ??= new AudioContextClass();
  return audioContext;
}

export function playSound(kind: SoundKind = "tap") {
  const context = getAudioContext();
  if (!context) return;

  if (context.state === "suspended") {
    void context.resume();
  }

  let startAt = context.currentTime;
  patterns[kind].forEach(([frequency, duration, type]) => {
    const oscillator = context.createOscillator();
    const gain = context.createGain();

    oscillator.type = type;
    oscillator.frequency.setValueAtTime(frequency, startAt);
    gain.gain.setValueAtTime(0.0001, startAt);
    gain.gain.exponentialRampToValueAtTime(0.08, startAt + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.0001, startAt + duration);

    oscillator.connect(gain);
    gain.connect(context.destination);
    oscillator.start(startAt);
    oscillator.stop(startAt + duration + 0.02);
    startAt += duration;
  });
}

declare global {
  interface Window {
    webkitAudioContext?: typeof AudioContext;
  }
}
