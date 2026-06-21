"use client";

import { useState } from "react";
import { CheckCircle2, Lock, RotateCcw, ShieldCheck, Star, Trophy, XCircle } from "lucide-react";
import type { FollowUpQuestion, QuizQuestion } from "@/types/learning";
import { playSound } from "@/lib/sound";
import { useErrorBookStore } from "@/store/errorBookStore";

type QuizProps = {
  questions: QuizQuestion[];
};

const uniqueOptions = (items: string[]) => Array.from(new Set(items)).slice(0, 3);

function createFollowUps(question: QuizQuestion, userAnswer: string): FollowUpQuestion[] {
  const correct = question.answer;
  const lower = correct.toLowerCase();

  if (lower.includes("where") || lower.includes("under") || lower.includes("behind") || lower.includes("between")) {
    return [
      {
        id: `${question.id}-follow-1`,
        question: "小明找不到书包，应怎样问？",
        options: ["Where's my schoolbag?", "What's your schoolbag?", "How many schoolbags?"],
        answer: "Where's my schoolbag?",
        explanation: "问单个物品在哪里，用 Where's...?",
      },
      {
        id: `${question.id}-follow-2`,
        question: "书在两把椅子中间，选正确表达。",
        options: ["It's between two chairs.", "It's behind two chairs.", "It's under two chairs."],
        answer: "It's between two chairs.",
        explanation: "between 表示在两者之间。",
      },
      {
        id: `${question.id}-follow-3`,
        question: "改错：Where are my pencil?",
        options: ["Where's my pencil?", "Where do my pencil?", "Where my pencil is?"],
        answer: "Where's my pencil?",
        explanation: "pencil 是单数，用 Where's。",
      },
    ];
  }

  if (lower.includes("what classes") || lower.includes("english") || lower.includes("maths") || lower.includes("subject")) {
    return [
      {
        id: `${question.id}-follow-1`,
        question: "想问‘今天下午有什么课？’",
        options: ["What classes do you have this afternoon?", "Where are your classes?", "What day is it today?"],
        answer: "What classes do you have this afternoon?",
        explanation: "问课程安排用 What classes do you have...?",
      },
      {
        id: `${question.id}-follow-2`,
        question: "选择正确句子。",
        options: ["We have Chinese and PE.", "We has Chinese and PE.", "We have Chinese PE and."],
        answer: "We have Chinese and PE.",
        explanation: "We 后用 have，两个课程用 and 连接。",
      },
      {
        id: `${question.id}-follow-3`,
        question: "表达‘我最喜欢的科目是英语。’",
        options: ["My favourite subject is English.", "My favourite season is English.", "I subject English favourite."],
        answer: "My favourite subject is English.",
        explanation: "subject 表示科目。",
      },
    ];
  }

  if (lower.includes("what day") || lower.includes("today") || lower.includes("monday") || lower.includes("wednesday")) {
    return [
      {
        id: `${question.id}-follow-1`,
        question: "问‘明天星期几？’",
        options: ["What day is it tomorrow?", "What classes tomorrow?", "Where is tomorrow?"],
        answer: "What day is it tomorrow?",
        explanation: "问星期用 What day is it...?",
      },
      {
        id: `${question.id}-follow-2`,
        question: "选择书写正确的星期。",
        options: ["Thursday", "thursday", "THURSday"],
        answer: "Thursday",
        explanation: "星期名称首字母大写。",
      },
      {
        id: `${question.id}-follow-3`,
        question: "Today is Monday. Tomorrow is ___.",
        options: ["Tuesday", "Sunday", "Friday"],
        answer: "Tuesday",
        explanation: "Monday 后一天是 Tuesday。",
      },
    ];
  }

  if (lower.includes("gets") || lower.includes("points") || lower.includes("fifty")) {
    return [
      {
        id: `${question.id}-follow-1`,
        question: "二班得了60分，选正确表达。",
        options: ["Class Two gets 60 points.", "Class Two get 60 points.", "Class Two is 60 point."],
        answer: "Class Two gets 60 points.",
        explanation: "Class Two 是单数整体，动词用 gets。",
      },
      {
        id: `${question.id}-follow-2`,
        question: "75 的英文表达更接近：",
        options: ["seventy-five", "fifty-seven", "seven-five"],
        answer: "seventy-five",
        explanation: "几十几用 ten-number + 个位数。",
      },
      {
        id: `${question.id}-follow-3`,
        question: "改错：Class One get 40 points.",
        options: ["Class One gets 40 points.", "Class One getting 40 points.", "Class One are 40 points."],
        answer: "Class One gets 40 points.",
        explanation: "Class One 后用 gets。",
      },
    ];
  }

  if (lower.includes("helps") || lower.includes("teaches") || lower.includes("she")) {
    return [
      {
        id: `${question.id}-follow-1`,
        question: "描述‘他帮助老人。’",
        options: ["He helps old people.", "He help old people.", "He helping old people."],
        answer: "He helps old people.",
        explanation: "He 后的一般现在时动词常加 s。",
      },
      {
        id: `${question.id}-follow-2`,
        question: "选择正确句子。",
        options: ["She teaches us English.", "She teach us English.", "She teaching us English."],
        answer: "She teaches us English.",
        explanation: "She 后 teach 变 teaches。",
      },
      {
        id: `${question.id}-follow-3`,
        question: "We ___ our teacher.",
        options: ["love", "loves", "loving"],
        answer: "love",
        explanation: "We 后用动词原形。",
      },
    ];
  }

  if (lower.includes("season") || lower.includes("spring") || lower.includes("winter") || lower.includes("autumn")) {
    return [
      {
        id: `${question.id}-follow-1`,
        question: "问同学最喜欢的季节。",
        options: ["What's your favourite season?", "Where is your season?", "What day is it?"],
        answer: "What's your favourite season?",
        explanation: "favourite season 表示最喜欢的季节。",
      },
      {
        id: `${question.id}-follow-2`,
        question: "选择正确介词。It's cool ___ autumn.",
        options: ["in", "on", "under"],
        answer: "in",
        explanation: "季节前通常用 in。",
      },
      {
        id: `${question.id}-follow-3`,
        question: "表达‘我最喜欢夏天。’",
        options: ["My favourite season is summer.", "My favourite subject is summer.", "I favourite is summer season."],
        answer: "My favourite season is summer.",
        explanation: "My favourite season is... 是固定表达。",
      },
    ];
  }

  if (lower.includes("can see") || lower.includes("what can")) {
    return [
      {
        id: `${question.id}-follow-1`,
        question: "看图说‘我能看见一座山。’",
        options: ["I can see a mountain.", "I can sees a mountain.", "I am see a mountain."],
        answer: "I can see a mountain.",
        explanation: "can 后用动词原形 see。",
      },
      {
        id: `${question.id}-follow-2`,
        question: "询问别人能看见什么。",
        options: ["What can you see?", "What are you doing?", "What classes do you have?"],
        answer: "What can you see?",
        explanation: "问看到什么用 What can you see?",
      },
      {
        id: `${question.id}-follow-3`,
        question: "Can you see the moon? 肯定回答：",
        options: ["Yes, I can.", "Yes, I do.", "Yes, I am."],
        answer: "Yes, I can.",
        explanation: "can 提问用 can 回答。",
      },
    ];
  }

  if (lower.includes("doing") || lower.includes("cleaning") || lower.includes("drinking")) {
    return [
      {
        id: `${question.id}-follow-1`,
        question: "描述‘她正在扫地。’",
        options: ["She is sweeping the floor.", "She sweeping the floor.", "She sweeps now the floor."],
        answer: "She is sweeping the floor.",
        explanation: "正在做某事：be + 动词-ing。",
      },
      {
        id: `${question.id}-follow-2`,
        question: "问‘他正在做什么？’",
        options: ["What is he doing?", "What he is doing?", "What can he see?"],
        answer: "What is he doing?",
        explanation: "疑问句中 is 放在 he 前。",
      },
      {
        id: `${question.id}-follow-3`,
        question: "They ___ exercising.",
        options: ["are", "is", "am"],
        answer: "are",
        explanation: "They 后用 are。",
      },
    ];
  }

  if (lower.includes("dragon") || lower.includes("festival") || lower.includes("race")) {
    return [
      {
        id: `${question.id}-follow-1`,
        question: "介绍端午节活动。",
        options: ["We watch dragon boat races.", "We watches dragon boat races.", "We are sign races."],
        answer: "We watch dragon boat races.",
        explanation: "We 后用动词原形 watch。",
      },
      {
        id: `${question.id}-follow-2`,
        question: "介绍端午节食物。",
        options: ["We eat rice dumplings.", "We eat maths.", "We are eating signs."],
        answer: "We eat rice dumplings.",
        explanation: "rice dumplings 表示粽子。",
      },
      {
        id: `${question.id}-follow-3`,
        question: "节日名称更自然的表达是：",
        options: ["It's the Dragon Boat Festival.", "It's Dragon Boat Festival sign.", "It are Dragon Boat Festival."],
        answer: "It's the Dragon Boat Festival.",
        explanation: "介绍节日可用 It's the...",
      },
    ];
  }

  if (lower.includes("sign") || lower.includes("mean") || lower.includes("smoking") || lower.includes("must")) {
    return [
      {
        id: `${question.id}-follow-1`,
        question: "看到陌生标志，应该问：",
        options: ["What does that sign mean?", "What do that sign mean?", "Where does that sign?"],
        answer: "What does that sign mean?",
        explanation: "that sign 是单数，用 does。",
      },
      {
        id: `${question.id}-follow-2`,
        question: "禁止拍照，正确表达是：",
        options: ["No taking photos.", "No take photos.", "Don't photos taking."],
        answer: "No taking photos.",
        explanation: "No + 动词-ing 表示禁止。",
      },
      {
        id: `${question.id}-follow-3`,
        question: "红灯前应该说：",
        options: ["You must stop.", "You must stopping.", "You are stop."],
        answer: "You must stop.",
        explanation: "must 后用动词原形。",
      },
    ];
  }

  const fallbackOptions = uniqueOptions([correct, userAnswer, question.options.find((item) => item !== correct && item !== userAnswer) ?? "Not this one"]);
  return [
    {
      id: `${question.id}-follow-1`,
      question: "选出更完整、语法更正确的句子。",
      options: fallbackOptions,
      answer: correct,
      explanation: "优先检查主语、助动词和动词形式。",
    },
    {
      id: `${question.id}-follow-2`,
      question: "同类题：哪一句最适合题干场景？",
      options: fallbackOptions,
      answer: correct,
      explanation: "看场景关键词，不要只看单个单词。",
    },
    {
      id: `${question.id}-follow-3`,
      question: "改错题：选择正确修改。",
      options: fallbackOptions,
      answer: correct,
      explanation: "把错误选项和正确选项对比记忆。",
    },
  ];
}

export function Quiz({ questions }: QuizProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [unlockedLevel, setUnlockedLevel] = useState(0);
  const [cleared, setCleared] = useState<boolean[]>(() => questions.map(() => false));
  const addError = useErrorBookStore((state) => state.addError);
  const question = questions[currentIndex];
  const answered = selected !== null;
  const isCorrect = selected === question.answer;
  const completedAll = cleared.every(Boolean);

  const choose = (option: string) => {
    if (answered) return;

    setSelected(option);
    if (option === question.answer) {
      playSound(currentIndex === questions.length - 1 ? "complete" : "success");
      setCleared((items) => items.map((item, index) => (index === currentIndex ? true : item)));
      setUnlockedLevel((level) => Math.max(level, Math.min(currentIndex + 1, questions.length - 1)));
    } else {
      playSound("error");
      addError({
        id: `quiz-${question.id}-${option}`,
        type: "quiz",
        title: `第 ${currentIndex + 1} 关错题`,
        prompt: question.question,
        correctAnswer: question.answer,
        userAnswer: option,
        followUps: createFollowUps(question, option),
      });
    }
  };

  const goLevel = (index: number) => {
    if (index > unlockedLevel) return;
    playSound("tap");
    setCurrentIndex(index);
    setSelected(null);
  };

  const nextLevel = () => {
    playSound("tap");
    const next = Math.min(currentIndex + 1, questions.length - 1);
    setCurrentIndex(next);
    setSelected(null);
  };

  const retry = () => {
    playSound("tap");
    setSelected(null);
  };

  const resetAll = () => {
    playSound("tap");
    setCurrentIndex(0);
    setSelected(null);
    setUnlockedLevel(0);
    setCleared(questions.map(() => false));
  };

  return (
    <section className="mx-auto max-w-4xl rounded-[2rem] bg-white/85 p-6 shadow-sm">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-sm font-black uppercase tracking-[0.2em] text-violet-500">Level Challenge</p>
          <h2 className="mt-2 text-2xl font-black text-slate-800">通关巩固题</h2>
          <p className="mt-1 text-sm font-semibold text-slate-500">答对当前关卡，才能解锁下一关；答错会进入错题本并生成举一反三。</p>
        </div>
        <button
          type="button"
          onClick={resetAll}
          className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-4 py-2 text-sm font-bold text-white shadow-sm hover:bg-slate-700"
        >
          <RotateCcw size={16} /> 重新闯关
        </button>
      </div>

      <div className="mb-6 grid gap-3 sm:grid-cols-3">
        {questions.map((item, index) => {
          const locked = index > unlockedLevel;
          const active = index === currentIndex;
          const done = cleared[index];
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => goLevel(index)}
              disabled={locked}
              className={`rounded-2xl p-4 text-left transition ${
                active
                  ? "bg-violet-600 text-white shadow-lg shadow-violet-100"
                  : done
                    ? "bg-emerald-100 text-emerald-700"
                    : locked
                      ? "cursor-not-allowed bg-slate-100 text-slate-400"
                      : "bg-violet-50 text-violet-700 hover:bg-violet-100"
              }`}
            >
              <div className="flex items-center justify-between gap-2">
                <span className="font-black">第 {index + 1} 关</span>
                {locked ? <Lock size={18} /> : done ? <ShieldCheck size={18} /> : <Star size={18} />}
              </div>
              <p className="mt-2 line-clamp-2 text-xs font-semibold opacity-80">{item.question}</p>
            </button>
          );
        })}
      </div>

      {completedAll ? (
        <div className="mb-5 flex items-center gap-3 rounded-2xl bg-amber-100 p-4 text-amber-700">
          <Trophy />
          <p className="font-black">恭喜通关！可以去错题本看看有没有需要举一反三的题。</p>
        </div>
      ) : null}

      <div className="rounded-2xl bg-violet-50 p-5">
        <p className="text-sm font-black text-violet-500">第 {currentIndex + 1} 关</p>
        <p className="mt-2 text-xl font-black leading-8 text-slate-800">{question.question}</p>
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
            {isCorrect ? "闯关成功，下一关已解锁！" : "这一关还没过，错题本已生成 3 道举一反三。"}
          </p>
          <p className="mt-2 text-sm leading-6 text-slate-600">{question.explanation}</p>
          <div className="mt-4 flex flex-wrap gap-3">
            {isCorrect && currentIndex < questions.length - 1 ? (
              <button
                type="button"
                onClick={nextLevel}
                className="rounded-full bg-violet-600 px-5 py-2 text-sm font-black text-white shadow-sm hover:bg-violet-500"
              >
                进入下一关
              </button>
            ) : null}
            {!isCorrect ? (
              <button
                type="button"
                onClick={retry}
                className="rounded-full bg-rose-500 px-5 py-2 text-sm font-black text-white shadow-sm hover:bg-rose-400"
              >
                再试一次
              </button>
            ) : null}
          </div>
        </div>
      ) : null}
    </section>
  );
}
