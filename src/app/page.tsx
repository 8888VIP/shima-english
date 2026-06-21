"use client";

import { useMemo, useState } from "react";
import { ArrowLeft, BookOpen, Brain, ClipboardList, Gamepad2, Layers, Sparkles } from "lucide-react";
import { DragChallenge } from "@/components/DragChallenge";
import { ErrorBook } from "@/components/ErrorBook";
import { Knowledge } from "@/components/Knowledge";
import { Quiz } from "@/components/Quiz";
import { courseData } from "@/data/courseData";
import { playSound } from "@/lib/sound";
import type { LearningUnit } from "@/types/learning";

const tabs = [
  { id: "knowledge", label: "知识点", icon: BookOpen },
  { id: "challenge", label: "挑战训练", icon: Gamepad2 },
  { id: "quiz", label: "巩固题", icon: Brain },
  { id: "errors", label: "错题本", icon: ClipboardList },
] as const;

type TabId = (typeof tabs)[number]["id"];

export default function Home() {
  const allUnits = useMemo(() => courseData.modules.flatMap((module) => module.units), []);
  const [selectedUnit, setSelectedUnit] = useState<LearningUnit | null>(null);
  const [activeTab, setActiveTab] = useState<TabId>("knowledge");

  const openUnit = (unit: LearningUnit) => {
    playSound("tap");
    setSelectedUnit(unit);
    setActiveTab("knowledge");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const backHome = () => {
    playSound("tap");
    setSelectedUnit(null);
  };

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,#d9f99d_0,#bae6fd_34%,#fdf2f8_70%,#fff7ed_100%)] text-slate-800">
      <header className="sticky top-0 z-20 border-b border-white/50 bg-white/70 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-400 to-violet-500 text-white shadow-lg shadow-sky-200">
              <Sparkles size={26} />
            </div>
            <div>
              <h1 className="text-2xl font-black tracking-tight text-slate-900">Shima English</h1>
              <p className="text-sm font-semibold text-slate-500">
                {courseData.publisher} · {courseData.grade}{courseData.semester}
              </p>
            </div>
          </div>
          <div className="rounded-full bg-white px-4 py-2 text-sm font-bold text-sky-700 shadow-sm">
            {allUnits.length} Units · 知识点 / 句型 / 语法 / 练习
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {!selectedUnit ? (
          <>
            <div className="mb-8 rounded-[2rem] bg-white/65 p-6 shadow-xl shadow-sky-100/60 ring-1 ring-white/70">
              <p className="text-sm font-black uppercase tracking-[0.24em] text-sky-500">Preview Version</p>
              <div className="mt-3 grid gap-4 lg:grid-cols-[1.5fr_0.5fr] lg:items-end">
                <div>
                  <h2 className="text-3xl font-black leading-tight text-slate-900 sm:text-5xl">
                    湘少版四年级下册英语互动复习
                  </h2>
                  <p className="mt-4 max-w-3xl text-base font-medium leading-7 text-slate-600">
                    按 Module / Unit 展示全册内容。点击任意 Unit 进入学习目标、核心知识点、重点表达、语法易错点、情境匹配和巩固题。当前内容为公开资料整理的提分预览版，建议后续按教材逐项校对。
                  </p>
                </div>
                <div className="rounded-3xl bg-gradient-to-br from-amber-300 to-orange-300 p-5 text-white shadow-lg shadow-orange-100">
                  <p className="text-4xl font-black">{courseData.modules.length}</p>
                  <p className="mt-1 font-bold">Learning Modules</p>
                  <p className="mt-3 text-sm font-medium text-white/90">轻量音效已开启</p>
                </div>
              </div>
            </div>

            <div className="grid gap-5">
              {courseData.modules.map((module) => (
                <article key={module.id} className="rounded-[2rem] bg-white/80 p-5 shadow-sm ring-1 ring-white/70">
                  <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-100 text-sky-700">
                        <Layers />
                      </div>
                      <div>
                        <p className="text-sm font-black uppercase tracking-[0.18em] text-sky-500">
                          Module {module.moduleNumber}
                        </p>
                        <h3 className="text-2xl font-black text-slate-900">{module.title}</h3>
                      </div>
                    </div>
                    <p className="max-w-xl text-sm font-semibold leading-6 text-slate-500">{module.description}</p>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    {module.units.map((unit) => (
                      <button
                        type="button"
                        key={unit.id}
                        onClick={() => openUnit(unit)}
                        className="group rounded-3xl bg-gradient-to-br from-white to-sky-50 p-5 text-left shadow-sm ring-1 ring-sky-100 transition hover:-translate-y-1 hover:shadow-xl"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <span className="rounded-full bg-violet-100 px-3 py-1 text-xs font-black text-violet-700">
                              Unit {unit.unitNumber}
                            </span>
                            <h4 className="mt-4 text-2xl font-black text-slate-900 group-hover:text-sky-700">
                              {unit.title}
                            </h4>
                            <p className="mt-2 font-bold text-amber-600">{unit.theme}</p>
                          </div>
                          <span className="rounded-2xl bg-white px-3 py-2 text-sm font-black text-sky-600 shadow-sm">
                            Start
                          </span>
                        </div>
                        <p className="mt-4 text-sm leading-6 text-slate-600">{unit.summary}</p>
                        <div className="mt-5 flex flex-wrap gap-2">
                          <span className="rounded-full bg-sky-100 px-3 py-1 text-xs font-bold text-sky-700">
                            {unit.knowledgePoints.length} 知识点
                          </span>
                          <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-700">
                            {unit.sentencePatterns.length} 重点表达
                          </span>
                          <span className="rounded-full bg-rose-100 px-3 py-1 text-xs font-bold text-rose-700">
                            {unit.quizQuestions.length} 练习
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </>
        ) : (
          <>
            <button
              type="button"
              onClick={backHome}
              className="mb-5 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-black text-slate-700 shadow-sm transition hover:bg-sky-50 hover:text-sky-700"
            >
              <ArrowLeft size={16} /> 返回 Unit 列表
            </button>

            <div className="mb-6 rounded-[2rem] bg-white/75 p-6 shadow-xl shadow-sky-100/60 ring-1 ring-white/70">
              <p className="text-sm font-black uppercase tracking-[0.2em] text-violet-500">Unit {selectedUnit.unitNumber}</p>
              <h2 className="mt-2 text-3xl font-black text-slate-900 sm:text-5xl">{selectedUnit.title}</h2>
              <p className="mt-3 text-lg font-bold text-amber-600">{selectedUnit.theme}</p>
              <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600">{selectedUnit.summary}</p>
            </div>

            <nav className="mb-6 grid grid-cols-2 gap-3 rounded-3xl bg-white/60 p-2 shadow-sm md:grid-cols-4">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const active = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => {
                      playSound("tap");
                      setActiveTab(tab.id);
                    }}
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

            {activeTab === "knowledge" ? (
              <Knowledge
                learningGoal={selectedUnit.learningGoal}
                knowledgePoints={selectedUnit.knowledgePoints}
                vocabulary={selectedUnit.vocabulary}
                sentencePatterns={selectedUnit.sentencePatterns}
                grammarFocus={selectedUnit.grammarFocus}
              />
            ) : null}
            {activeTab === "challenge" ? <DragChallenge questions={selectedUnit.dragQuestions} /> : null}
            {activeTab === "quiz" ? <Quiz questions={selectedUnit.quizQuestions} /> : null}
            {activeTab === "errors" ? <ErrorBook /> : null}
          </>
        )}
      </section>
    </main>
  );
}
