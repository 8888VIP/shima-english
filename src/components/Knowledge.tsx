"use client";

import { AlertTriangle, BookOpenCheck, Lightbulb, MessageCircle, Target, Volume2 } from "lucide-react";
import { playSound } from "@/lib/sound";
import type { GrammarFocus, KnowledgePoint, SentencePattern, VocabularyItem } from "@/types/learning";

type KnowledgeProps = {
  learningGoal?: string;
  knowledgePoints?: KnowledgePoint[];
  vocabulary: VocabularyItem[];
  sentencePatterns?: SentencePattern[];
  grammarFocus?: GrammarFocus[];
};

export function Knowledge({
  learningGoal,
  knowledgePoints = [],
  vocabulary,
  sentencePatterns = [],
  grammarFocus = [],
}: KnowledgeProps) {
  const speak = (text: string) => {
    playSound("tap");
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    utterance.rate = 0.85;
    utterance.pitch = 1.05;
    window.speechSynthesis.speak(utterance);
  };

  return (
    <section className="space-y-6">
      {learningGoal ? (
        <div className="rounded-[2rem] bg-gradient-to-br from-sky-500 to-violet-500 p-6 text-white shadow-lg shadow-sky-100">
          <div className="flex items-start gap-4">
            <div className="rounded-2xl bg-white/20 p-3"><Target /></div>
            <div>
              <p className="text-sm font-black uppercase tracking-[0.2em] text-white/80">Learning Goal</p>
              <h2 className="mt-2 text-2xl font-black leading-9">{learningGoal}</h2>
              <p className="mt-3 text-sm font-semibold text-white/85">学习建议：先读懂场景，再记句型结构，最后做匹配和选择题。</p>
            </div>
          </div>
        </div>
      ) : null}

      <div>
        <h2 className="mb-4 text-2xl font-black text-slate-800">核心知识点</h2>
        <div className="grid gap-4 lg:grid-cols-3">
          {knowledgePoints.map((item, index) => (
            <article key={item.id} className="rounded-lg bg-white/90 p-5 shadow-sm ring-1 ring-sky-100">
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-sky-100 text-sky-700">
                <BookOpenCheck />
              </div>
              <p className="text-xs font-black uppercase tracking-[0.2em] text-sky-400">Point {index + 1}</p>
              <h3 className="mt-2 text-xl font-black text-slate-900">{item.title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-600">{item.explanation}</p>
              <button
                type="button"
                onClick={() => speak(item.example)}
                className="mt-4 rounded-lg bg-sky-50 p-3 text-left text-sm font-bold text-sky-700 transition hover:bg-sky-100"
              >
                🔊 {item.example}
              </button>
              <p className="mt-3 rounded-lg bg-amber-50 p-3 text-sm font-semibold leading-6 text-amber-700">
                小诀窍：{item.tip}
              </p>
            </article>
          ))}
        </div>
      </div>

      <div>
        <h2 className="mb-4 text-2xl font-black text-slate-800">重点表达</h2>
        <div className="grid gap-4 lg:grid-cols-3">
          {sentencePatterns.map((item) => (
            <article key={item.id} className="rounded-lg bg-white/90 p-5 shadow-sm ring-1 ring-violet-100">
              <div className="mb-3 flex items-center justify-between gap-3">
                <MessageCircle className="text-violet-600" />
                <button
                  type="button"
                  onClick={() => speak(item.english)}
                  className="rounded-full bg-violet-100 p-2 text-violet-600 hover:bg-violet-200"
                  aria-label={`朗读 ${item.english}`}
                >
                  <Volume2 size={18} />
                </button>
              </div>
              <p className="text-xl font-black text-violet-700">{item.english}</p>
              <p className="mt-2 font-bold text-slate-700">{item.chinese}</p>
              <p className="mt-3 rounded-lg bg-violet-50 p-3 text-sm text-slate-600">使用场景：{item.example}</p>
            </article>
          ))}
        </div>
      </div>

      <div>
        <h2 className="mb-4 text-2xl font-black text-slate-800">语法小规则 & 易错提醒</h2>
        <div className="grid gap-4 lg:grid-cols-2">
          {grammarFocus.map((item) => (
            <article key={item.id} className="rounded-lg bg-white/90 p-5 shadow-sm ring-1 ring-rose-100">
              <div className="flex items-start gap-3">
                <div className="rounded-2xl bg-rose-100 p-3 text-rose-600"><AlertTriangle /></div>
                <div>
                  <h3 className="text-lg font-black text-slate-900">{item.rule}</h3>
                  <button
                    type="button"
                    onClick={() => speak(item.example)}
                    className="mt-3 rounded-lg bg-emerald-50 px-3 py-2 text-left text-sm font-bold text-emerald-700 hover:bg-emerald-100"
                  >
                    正确例句：{item.example}
                  </button>
                  <p className="mt-3 rounded-lg bg-rose-50 p-3 text-sm font-semibold leading-6 text-rose-700">
                    易错：{item.commonMistake}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      <details className="rounded-[2rem] bg-white/75 p-5 shadow-sm open:bg-white/90">
        <summary className="flex cursor-pointer items-center gap-2 text-xl font-black text-slate-800">
          <Lightbulb className="text-amber-500" /> 词汇支撑区
        </summary>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {vocabulary.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => speak(item.english)}
              className="rounded-lg bg-sky-50 p-4 text-left shadow-sm transition hover:-translate-y-0.5 hover:bg-sky-100"
            >
              <p className="text-lg font-black text-sky-700">{item.english}</p>
              <p className="mt-1 font-bold text-slate-700">{item.chinese}</p>
            </button>
          ))}
        </div>
      </details>
    </section>
  );
}
