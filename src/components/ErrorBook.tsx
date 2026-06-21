"use client";

import { Trash2 } from "lucide-react";
import { useErrorBookStore } from "@/store/errorBookStore";

export function ErrorBook() {
  const errors = useErrorBookStore((state) => state.errors);
  const clearErrors = useErrorBookStore((state) => state.clearErrors);
  const removeError = useErrorBookStore((state) => state.removeError);

  return (
    <section className="rounded-lg bg-white/85 p-6 shadow-sm">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-2xl font-black text-slate-800">错题本</h2>
          <p className="mt-1 text-sm font-medium text-slate-500">
            自动记录挑战训练和巩固题中的错误，数据会保存在本地浏览器。
          </p>
        </div>
        <button
          type="button"
          onClick={clearErrors}
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
          <p className="mt-2 text-sm text-slate-500">继续保持，去挑战训练或巩固题试试看吧！</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {errors.map((item) => (
            <article key={`${item.id}-${item.createdAt}`} className="rounded-lg border border-rose-100 bg-rose-50/70 p-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <span className="rounded-full bg-white px-3 py-1 text-xs font-black text-rose-500">
                    {item.title}
                  </span>
                  <h3 className="mt-3 font-black leading-7 text-slate-800">{item.prompt}</h3>
                </div>
                <button
                  type="button"
                  onClick={() => removeError(item.id)}
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
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
