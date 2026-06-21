"use client";

import { useState } from "react";
import { CheckCircle2, ChevronRight, XCircle } from "lucide-react";
import type { QuizQuestion } from "@/types/learning";
import { useErrorBookStore } from "@/store/errorBookStore";

type QuizProps = {
  questions: QuizQuestion[];
};

export function Quiz({ questions }: QuizProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const addError = useErrorBookStore((state) => state.addError);
  const question = questions[currentIndex];
  const answered = selected !== null;
  const isCorrect = selected === question.answer;

  const choose = (option: string) => {
    if (answered) return;

    setSelected(option);
    if (option === question.answer) {
      setScore((value) => value + 1);
    } else {
      addError({
        id: `quiz-${question.id}-${option}`,
        type: "quiz",
        title: "巩固选择题",
        prompt: question.question,
        correctAnswer: question.answer,
        userAnswer: option,
      });
    }
  };

  const next = () => {
    setSelected(null);
    setCurrentIndex((index) => (index + 1) % questions.length);
  };

  return (
    <section className="mx-auto max-w-3xl rounded-lg bg-white/85 p-6 shadow-sm">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-sm font-black uppercase tracking-[0.2em] text-violet-500">
            Question {currentIndex + 1}/{questions.length}
          </p>
          <h2 className="mt-2 text-2xl font-black text-slate-800">巩固题</h2>
        </div>
        <span className="rounded-full bg-violet-100 px-4 py-2 text-sm font-bold text-violet-700">
          得分 {score}
        </span>
      </div>

      <div className="rounded-lg bg-violet-50 p-5">
        <p className="text-xl font-black leading-8 text-slate-800">{question.question}</p>
      </div>

      <div className="mt-5 grid gap-3">
        {question.options.map((option) => {
          const chosen = selected === option;
          const shouldShowCorrect = answered && option === question.answer;
          const shouldShowWrong = chosen && !isCorrect;

          return (
            <button
              type="button"
              key={option}
              onClick={() => choose(option)}
              className={`flex items-center justify-between rounded-lg border-2 p-4 text-left font-bold transition ${
                shouldShowCorrect
                  ? "border-emerald-300 bg-emerald-50 text-emerald-700"
                  : shouldShowWrong
                    ? "border-rose-300 bg-rose-50 text-rose-700"
                    : "border-slate-100 bg-white text-slate-700 hover:border-violet-200 hover:bg-violet-50"
              }`}
            >
              <span>{option}</span>
              {shouldShowCorrect ? <CheckCircle2 size={20} /> : null}
              {shouldShowWrong ? <XCircle size={20} /> : null}
            </button>
          );
        })}
      </div>

      {answered ? (
        <div className="mt-5 rounded-lg bg-slate-50 p-4">
          <p className={`font-black ${isCorrect ? "text-emerald-600" : "text-rose-600"}`}>
            {isCorrect ? "回答正确！" : "再想一想，正确答案已经标出。"}
          </p>
          <p className="mt-2 text-sm leading-6 text-slate-600">{question.explanation}</p>
          <button
            type="button"
            onClick={next}
            className="mt-4 inline-flex items-center gap-2 rounded-full bg-violet-600 px-5 py-2 text-sm font-black text-white shadow-sm transition hover:bg-violet-500"
          >
            下一题 <ChevronRight size={16} />
          </button>
        </div>
      ) : null}
    </section>
  );
}
