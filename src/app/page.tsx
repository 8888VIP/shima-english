"use client";

import { useState } from "react";
import { BookOpen, Brain, ClipboardList, Gamepad2, Sparkles } from "lucide-react";
import mockData from "@/data/mockData.json";
import { DragChallenge } from "@/components/DragChallenge";
import { ErrorBook } from "@/components/ErrorBook";
import { Knowledge } from "@/components/Knowledge";
import { Quiz } from "@/components/Quiz";
import type { LearningUnit } from "@/types/learning";

const unit = mockData as LearningUnit;

const tabs = [
  { id: "knowledge", label: "知识点", icon: BookOpen },
  { id: "challenge", label: "挑战训练", icon: Gamepad2 },
  { id: "quiz", label: "巩固题", icon: Brain },
  { id: "errors", label: "错题本", icon: ClipboardList },
] as const;

type TabId = (typeof tabs)[number]["id"];

export default function Home() {
  const [activeTab, setActiveTab] = useState<TabId>("knowledge");

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,#d9f99d_0,#bae6fd_34%,#fdf2f8_70%,#fff7ed_100%)] text-slate-800">
      <header className="sticky top-0 z-20 border-b border-white/50 bg-white/70 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-400 to-violet-500 text-white shadow-lg shadow-sky-200">
              <Sparkles size={26} />
            </div>
            <div>
              <h1 className="text-2xl font-black tracking-tight text-slate-900">Shima English</h1>
              <p className="text-sm font-semibold text-slate-500">四年级英语互动学习平台</p>
            </div>
          </div>
          <div className="rounded-full bg-white px-4 py-2 text-sm font-bold text-sky-700 shadow-sm">
            {unit.unit} · {unit.title}
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-6 rounded-[2rem] bg-white/65 p-6 shadow-xl shadow-sky-100/60 ring-1 ring-white/70">
          <p className="text-sm font-black uppercase tracking-[0.24em] text-sky-500">Happy Learning</p>
          <div className="mt-3 grid gap-4 lg:grid-cols-[1.4fr_0.6fr] lg:items-end">
            <div>
              <h2 className="text-3xl font-black leading-tight text-slate-900 sm:text-5xl">
                在游戏中记住教室里的英文表达
              </h2>
              <p className="mt-4 max-w-2xl text-base font-medium leading-7 text-slate-600">
                专为小学四年级学生和家长设计：先学单词发音，再做拖拽匹配，最后用选择题巩固。所有错题会自动进入错题本，方便复习。
              </p>
            </div>
            <div className="rounded-3xl bg-gradient-to-br from-amber-300 to-orange-300 p-5 text-white shadow-lg shadow-orange-100">
              <p className="text-4xl font-black">{unit.vocabulary.length}</p>
              <p className="mt-1 font-bold">核心词汇</p>
              <p className="mt-3 text-sm font-medium text-white/90">适配 {unit.grade} · {unit.title}</p>
            </div>
          </div>
        </div>

        <nav className="mb-6 grid grid-cols-2 gap-3 rounded-3xl bg-white/60 p-2 shadow-sm md:grid-cols-4">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`inline-flex items-center justify-center gap-2 rounded-2xl px-4 py-3 text-sm font-black transition ${
                  active
                    ? "bg-slate-900 text-white shadow-lg shadow-slate-200"
                    : "text-slate-500 hover:bg-white hover:text-sky-700"
                }`}
              >
                <Icon size={18} />
                {tab.label}
              </button>
            );
          })}
        </nav>

        {activeTab === "knowledge" ? <Knowledge vocabulary={unit.vocabulary} /> : null}
        {activeTab === "challenge" ? <DragChallenge questions={unit.dragQuestions} /> : null}
        {activeTab === "quiz" ? <Quiz questions={unit.quizQuestions} /> : null}
        {activeTab === "errors" ? <ErrorBook /> : null}
      </section>
    </main>
  );
}
