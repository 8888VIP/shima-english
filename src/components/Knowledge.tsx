"use client";

import { Volume2 } from "lucide-react";
import type { VocabularyItem } from "@/types/learning";

type KnowledgeProps = {
  vocabulary: VocabularyItem[];
};

export function Knowledge({ vocabulary }: KnowledgeProps) {
  const speak = (word: string) => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(word);
    utterance.lang = "en-US";
    utterance.rate = 0.85;
    utterance.pitch = 1.05;
    window.speechSynthesis.speak(utterance);
  };

  return (
    <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {vocabulary.map((item) => (
        <article
          key={item.id}
          className="rounded-lg border border-white/70 bg-white/90 p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
        >
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-2xl font-black text-sky-700">{item.english}</p>
              <p className="mt-1 text-sm font-semibold text-slate-400">{item.phonetic}</p>
            </div>
            <button
              type="button"
              onClick={() => speak(item.english)}
              className="rounded-full bg-amber-100 p-3 text-amber-600 shadow-sm transition hover:scale-105 hover:bg-amber-200"
              aria-label={`朗读 ${item.english}`}
            >
              <Volume2 size={22} />
            </button>
          </div>
          <p className="mt-4 text-lg font-bold text-slate-700">{item.chinese}</p>
          <p className="mt-3 rounded-lg bg-sky-50 p-3 text-sm leading-6 text-slate-600">
            {item.example}
          </p>
        </article>
      ))}
    </section>
  );
}
