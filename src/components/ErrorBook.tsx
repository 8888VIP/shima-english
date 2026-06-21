"use client";

import { useEffect, useState } from "react";
import { CheckCircle2, Lightbulb, Trash2, XCircle } from "lucide-react";
import { useErrorBookStore } from "@/store/errorBookStore";
import { playSound } from "@/lib/sound";

type AnswerMap = Record<string, string>;

export function ErrorBook() {
  const errors = useErrorBookStore((state) => state.errors);
  const clearErrors = useErrorBookStore((state) => state.clearErrors);
  const removeError = useErrorBookStore((state) => state.removeError);
  const [answers, setAnswers] = useState<AnswerMap>({});
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const choose = (questionId: string, option: string, answer: string) => {
    if (answers[questionId]) return;
    setAnswers((current) => ({ ...current, [questionId]: option }));
    playSound(option === answer ? "success" : "error");
  };

  const clear = () => {
    playSound("tap");
    setAnswers({});
    clearErrors();
  };

  if (!mounted) {
    return (
      <section className="rounded-lg bg-white/85 p-6 shadow-sm">
        <h2 className="text-2xl font-black text-slate-800">错题本 · 选择题再练</h2>
        <p className="mt-2 text-sm font-medium text-slate-500">正在加载错题记录...</p>
      </section>
    );
  }

  return (
    <section className="rounded-lg bg-white/85 p-6 shadow-sm">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-2xl font-black text-slate-800">错题本 · 选择题再练</h2>
          <p className="mt-1 text-sm font-medium text-slate-500">
            错题会自动生成 3 道同类选择题，重点练句型、语法和情境判断。
          </p>
        </div>
        <button
          type="button"
          onClick={clear}
          disabled={errors.length === 0}
          className="inline-flex items-center gap-2 rounded-full bg-rose-500 px-4 py-2 text-sm font-bold text-white shadow-sm transition hover:bg-rose-400 disabled:cursor-not-allowed disabled:bg-slate-300"
        >
          <Trash2 size={16} /> 清空错题本
        </button>
      </div>

      {errors.length === 0 ? (
        <div className="rounded-lg border-2 border-dashed border-sky-200 bg-sky-50 p-10 text-center">
          <p className="text-5xl">🌟</p>
          <p className="mt-3 text-xl font-black text-sky-700">暂时没有错题</p>
          <p className="mt-2 text-sm text-slate-500">去通关巩固题挑战一下，错题会自动变成选择题再练。</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {errors.map((item) => (
            <article key={`${item.id}-${item.createdAt}`} className="rounded-[1.5rem] border border-rose-100 bg-rose-50/70 p-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <span className="rounded-full bg-white px-3 py-1 text-xs font-black text-rose-500">
                    {item.title}
                  </span>
                  <h3 className="mt-3 font-black leading-7 text-slate-800">{item.prompt}</h3>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    playSound("tap");
                    removeError(item.id);
                  }}
                  className="rounded-full bg-white p-2 text-slate-400 transition hover:text-rose-500"
                  aria-label="删除该错题"
                >
                  <Trash2 size={16} />
                </button>
              </div>
              <div className="mt-4 grid gap-2 text-sm sm:grid-cols-2">
                <p className="rounded-lg bg-white p-3 text-slate-500">
                  我的答案：<span className="font-bold text-rose-600">{item.userAnswer ?? "未作答"}</span>
                </p>
                <p className="rounded-lg bg-white p-3 text-slate-500">
                  正确答案：<span className="font-bold text-emerald-600">{item.correctAnswer}</span>
                </p>
              </div>

              {item.followUps?.some((followUp) => Array.isArray(followUp.options) && followUp.options.length > 0) ? (
                <div className="mt-4 rounded-2xl bg-white/80 p-4">
                  <div className="mb-3 flex items-center gap-2 font-black text-amber-700">
                    <Lightbulb size={18} /> 举一反三选择题
                  </div>
                  <div className="grid gap-3">
                    {item.followUps
                      .filter((followUp) => Array.isArray(followUp.options) && followUp.options.length > 0)
                      .map((followUp, index) => {
                      const selected = answers[followUp.id];
                      const answered = Boolean(selected);
                      const correct = selected === followUp.answer;

                      return (
                        <div key={followUp.id} className="rounded-2xl bg-amber-50 p-4">
                          <p className="font-black text-slate-800">第 {index + 1} 题：{followUp.question}</p>
                          <div className="mt-3 grid gap-2">
                            {followUp.options.map((option) => {
                              const isSelected = selected === option;
                              const isAnswer = answered && option === followUp.answer;
                              const isWrong = answered && isSelected && !correct;
                              return (
                                <button
                                  key={option}
                                  type="button"
                                  onClick={() => choose(followUp.id, option, followUp.answer)}
                                  className={`flex items-center justify-between rounded-lg border-2 bg-white p-3 text-left text-sm font-bold transition ${
                                    isAnswer
                                      ? "border-emerald-300 text-emerald-700"
                                      : isWrong
                                        ? "border-rose-300 text-rose-700"
                                        : "border-white text-slate-700 hover:border-amber-200"
                                  }`}
                                >
                                  <span>{option}</span>
                                  {isAnswer ? <CheckCircle2 size={18} /> : null}
                                  {isWrong ? <XCircle size={18} /> : null}
                                </button>
                              );
                            })}
                          </div>
                          {answered ? (
                            <p className={`mt-3 rounded-lg bg-white p-3 text-sm font-semibold ${correct ? "text-emerald-700" : "text-rose-700"}`}>
                              {correct ? "答对了！" : `正确答案：${followUp.answer}`} {followUp.explanation}
                            </p>
                          ) : null}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ) : (
                <div className="mt-4 rounded-2xl bg-white/80 p-4 text-sm font-semibold text-slate-600">
                  这道错题来自旧记录，建议清空后重新闯关，即可生成选择题再练。
                </div>
              )}
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
