"use client";

import { useMemo, useState } from "react";
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useDraggable,
  useDroppable,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { RotateCcw, Trophy } from "lucide-react";
import type { DragQuestion } from "@/types/learning";
import { playSound } from "@/lib/sound";
import { useErrorBookStore } from "@/store/errorBookStore";

type DragChallengeProps = {
  questions: DragQuestion[];
};

type MatchMap = Record<string, string>;

function shuffle<T>(items: T[]) {
  return [...items].sort(() => Math.random() - 0.5);
}

function EnglishCard({ item, locked }: { item: DragQuestion; locked?: boolean }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: item.id,
    disabled: locked,
  });

  return (
    <button
      ref={setNodeRef}
      type="button"
      style={{ transform: CSS.Translate.toString(transform) }}
      className={`rounded-lg px-4 py-3 text-left font-black shadow-sm transition ${
        locked
          ? "cursor-not-allowed bg-emerald-100 text-emerald-700 ring-2 ring-emerald-300"
          : "cursor-grab bg-white text-sky-700 hover:-translate-y-0.5 hover:shadow-md active:cursor-grabbing"
      } ${isDragging ? "opacity-30" : "opacity-100"}`}
      {...listeners}
      {...attributes}
    >
      {item.english}
    </button>
  );
}

function ChineseSlot({ item, matchedEnglish }: { item: DragQuestion; matchedEnglish?: string }) {
  const { isOver, setNodeRef } = useDroppable({ id: `slot-${item.id}` });

  return (
    <div
      ref={setNodeRef}
      className={`min-h-16 rounded-lg border-2 border-dashed p-4 transition ${
        matchedEnglish
          ? "border-emerald-300 bg-emerald-50"
          : isOver
            ? "border-amber-300 bg-amber-50"
            : "border-sky-200 bg-white/70"
      }`}
    >
      <div className="flex items-center justify-between gap-4">
        <p className="font-bold text-slate-700">{item.chinese}</p>
        {matchedEnglish ? (
          <span className="rounded-full bg-emerald-500 px-3 py-1 text-sm font-bold text-white">
            {matchedEnglish}
          </span>
        ) : (
          <span className="text-sm font-semibold text-slate-400">拖到这里</span>
        )}
      </div>
    </div>
  );
}

export function DragChallenge({ questions }: DragChallengeProps) {
  const [orderedEnglish, setOrderedEnglish] = useState(() => shuffle(questions));
  const [matches, setMatches] = useState<MatchMap>({});
  const [wrongCount, setWrongCount] = useState(0);
  const [activeId, setActiveId] = useState<string | null>(null);
  const addError = useErrorBookStore((state) => state.addError);
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 8 } }));

  const activeItem = useMemo(
    () => questions.find((item) => item.id === activeId),
    [activeId, questions],
  );

  const completed = Object.keys(matches).length === questions.length;

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(String(event.active.id));
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const draggedId = String(event.active.id);
    const targetId = event.over?.id ? String(event.over.id).replace("slot-", "") : null;
    const dragged = questions.find((item) => item.id === draggedId);
    const target = questions.find((item) => item.id === targetId);

    setActiveId(null);

    if (!dragged || !target) {
      return;
    }

    if (dragged.id === target.id) {
      playSound(Object.keys(matches).length + 1 === questions.length ? "complete" : "success");
      setMatches((current) => ({ ...current, [target.id]: dragged.english }));
    } else {
      playSound("error");
      setWrongCount((count) => count + 1);
      addError({
        id: `drag-${dragged.id}-${target.id}`,
        type: "drag",
        title: "拖拽匹配题",
        prompt: `将 ${dragged.english} 拖到了「${target.chinese}」`,
        correctAnswer: dragged.chinese,
        userAnswer: target.chinese,
      });
    }
  };

  const reset = () => {
    playSound("tap");
    setOrderedEnglish(shuffle(questions));
    setMatches({});
    setWrongCount(0);
    setActiveId(null);
  };

  return (
    <section className="rounded-lg bg-white/75 p-5 shadow-sm">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-2xl font-black text-slate-800">知识点匹配挑战</h2>
          <p className="mt-1 text-sm font-medium text-slate-500">
            把右侧场景/规则和左侧正确表达匹配起来，训练考试中最常见的“看情境选句子”。
          </p>
        </div>
        <div className="flex items-center gap-3">
          <span className="rounded-full bg-rose-100 px-4 py-2 text-sm font-bold text-rose-600">
            错误 {wrongCount} 次
          </span>
          <button
            type="button"
            onClick={reset}
            className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-4 py-2 text-sm font-bold text-white shadow-sm transition hover:bg-slate-700"
          >
            <RotateCcw size={16} /> 重来
          </button>
        </div>
      </div>

      {completed ? (
        <div className="mb-5 flex items-center gap-3 rounded-lg bg-emerald-100 p-4 text-emerald-700">
          <Trophy />
          <p className="font-black">太棒了！本轮匹配全部完成。</p>
        </div>
      ) : null}

      <DndContext sensors={sensors} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
        <div className="grid gap-5 lg:grid-cols-2">
          <div className="rounded-lg bg-sky-50 p-4">
            <h3 className="mb-3 font-black text-sky-700">English Cards</h3>
            <div className="grid gap-3 sm:grid-cols-2">
              {orderedEnglish.map((item) => (
                <EnglishCard key={item.id} item={item} locked={Boolean(matches[item.id])} />
              ))}
            </div>
          </div>
          <div className="rounded-lg bg-amber-50 p-4">
            <h3 className="mb-3 font-black text-amber-700">中文释义</h3>
            <div className="grid gap-3">
              {questions.map((item) => (
                <ChineseSlot key={item.id} item={item} matchedEnglish={matches[item.id]} />
              ))}
            </div>
          </div>
        </div>
        <DragOverlay>
          {activeItem ? (
            <div className="rounded-lg bg-white px-4 py-3 font-black text-sky-700 shadow-xl ring-2 ring-sky-200">
              {activeItem.english}
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>
    </section>
  );
}
