import type { CourseData, LearningUnit, QuizQuestion } from "@/types/learning";

type UnitSeed = {
  title: string;
  theme: string;
  goal: string;
  words: Array<[string, string, string?]>;
  expressions: Array<[string, string, string]>;
  grammar: Array<[string, string, string]>;
  challenges: Array<[string, string]>;
  quizzes: Array<[string, string[], string, string]>;
};

const seeds: UnitSeed[] = [
  {
    title: "It's on your head",
    theme: "方位表达：说清物品在哪里",
    goal: "能用 Where's...? 询问位置，并用 on / in / under / behind 等方位词准确回答。",
    words: [["on", "在……上面"], ["in", "在……里面"], ["under", "在……下面"], ["between", "在……中间"], ["beside", "在……旁边"], ["behind", "在……后面"]],
    expressions: [["Where's my pencil case?", "我的铅笔盒在哪里？", "找不到学习用品时询问位置。"], ["It's under your desk.", "它在你的课桌下面。", "回答单个物品的位置。"], ["Put it on your head.", "把它放在你的头上。", "听懂或发出简单位置指令。"]],
    grammar: [["Where's = Where is，用来问单个物品在哪里。", "Where's my cap?", "错：Where are my cap? 正：Where's my cap?"], ["It's + 方位词 + 地点，回答‘它在哪里’。", "It's behind the door.", "错：It's behind. 正：It's behind the door."]],
    challenges: [["找不到铅笔盒，想问它在哪里。", "Where's my pencil case?"], ["回答‘它在课桌下面’。", "It's under your desk."], ["帽子在头上。", "It's on your head."], ["书包在门后面。", "It's behind the door."], ["球在盒子里面。", "It's in the box."], ["铅笔在两本书中间。", "It's between two books."]],
    quizzes: [["想问‘我的帽子在哪里？’应选：", ["Where's my cap?", "What is my cap?", "How is my cap?"], "Where's my cap?", "Where's 用来询问单个物品的位置。"], ["‘它在椅子下面。’正确表达是：", ["It's under the chair.", "It's on the chair under.", "It under chair."], "It's under the chair.", "It's + 方位词 + 地点。"], ["behind 的意思是：", ["在……后面", "在……上面", "在……里面"], "在……后面", "behind 表示在后面。"]],
  },
  {
    title: "What classes do you have this morning?",
    theme: "课程表达：说出今天有什么课",
    goal: "能用 What classes do you have...? 询问课程，并用 We have... 回答。",
    words: [["English", "英语"], ["maths", "数学"], ["Chinese", "语文"], ["PE", "体育"], ["subject", "科目"], ["class", "课；班级"]],
    expressions: [["What classes do you have this morning?", "今天上午你们有什么课？", "询问某个时间段的课程安排。"], ["We have English and maths.", "我们有英语和数学课。", "回答有哪些课程。"], ["I like English.", "我喜欢英语。", "表达喜欢的科目。"]],
    grammar: [["What classes do you have...? 用来问‘你们有什么课’。", "What classes do you have this afternoon?", "错：What class you have? 正：What classes do you have?"], ["多个课程用 and 连接。", "We have Chinese and PE.", "错：We have Chinese PE. 正：We have Chinese and PE."]],
    challenges: [["询问今天上午有什么课。", "What classes do you have this morning?"], ["回答有英语和数学。", "We have English and maths."], ["表达我喜欢体育。", "I like PE."], ["下午有语文和英语。", "We have Chinese and English this afternoon."], ["询问最喜欢的科目。", "What's your favourite subject?"], ["subject 在本单元表示什么？", "科目"]],
    quizzes: [["询问‘今天上午你们有什么课？’应选：", ["What classes do you have this morning?", "Where is your class?", "What colour is it?"], "What classes do you have this morning?", "classes 表示课程。"], ["We have English ___ maths.", ["and", "on", "under"], "and", "and 用来连接两个并列课程。"], ["PE 是哪门课？", ["体育", "数学", "语文"], "体育", "PE 表示体育。"]],
  },
  {
    title: "Today is Wednesday",
    theme: "星期表达：安排一周学习生活",
    goal: "能询问和回答今天星期几，并能把星期与课程/活动联系起来。",
    words: [["today", "今天"], ["tomorrow", "明天"], ["Monday", "星期一"], ["Tuesday", "星期二"], ["Wednesday", "星期三"], ["Friday", "星期五"]],
    expressions: [["What day is it today?", "今天星期几？", "询问今天是星期几。"], ["Today is Wednesday.", "今天是星期三。", "回答今天的星期。"], ["Tomorrow is Thursday.", "明天是星期四。", "说出明天的星期。"]],
    grammar: [["What day is it today? 固定问法，问星期。", "What day is it today?", "错：What date is it? 本单元重点问星期。"], ["星期首字母要大写。", "Monday, Tuesday, Wednesday", "错：monday 正：Monday"]],
    challenges: [["询问今天星期几。", "What day is it today?"], ["回答今天是星期三。", "Today is Wednesday."], ["说明明天是星期四。", "Tomorrow is Thursday."], ["Monday 书写要注意什么？", "首字母大写"], ["today 的意思。", "今天"], ["tomorrow 的意思。", "明天"]],
    quizzes: [["问‘今天星期几？’应选：", ["What day is it today?", "What classes do you have?", "Where is it?"], "What day is it today?", "What day 用来问星期。"], ["Wednesday 是：", ["星期三", "星期五", "星期日"], "星期三", "Wednesday 表示星期三。"], ["哪一个星期拼写首字母正确？", ["Monday", "monday", "MONday"], "Monday", "星期名称首字母大写。"]],
  },
  {
    title: "Class One gets 54 points",
    theme: "数字与得分：读懂比赛结果",
    goal: "能听懂和表达 20–100 的整十数及比赛得分。",
    words: [["point", "分数"], ["match", "比赛"], ["thirty", "三十"], ["forty", "四十"], ["fifty", "五十"], ["one hundred", "一百"]],
    expressions: [["Class One gets 54 points.", "一班得了54分。", "播报班级比赛得分。"], ["Great!", "太棒了！", "为同学加油或庆祝。"], ["How many points?", "多少分？", "询问得分。"]],
    grammar: [["get/gets：第三人称单数 Class One 后常用 gets。", "Class One gets 54 points.", "错：Class One get 54 points. 正：gets"], ["几十几通常由十位数 + 个位数组成。", "fifty-four", "错：five-four 正：fifty-four"]],
    challenges: [["一班得了54分。", "Class One gets 54 points."], ["询问多少分。", "How many points?"], ["看到同学赢了，表达太棒了。", "Great!"], ["fifty-four 表示什么？", "54"], ["Class One 后用 get 还是 gets？", "gets"], ["match 的意思。", "比赛"]],
    quizzes: [["Class One ___ 54 points.", ["gets", "get", "getting"], "gets", "Class One 是第三人称单数，常用 gets。"], ["fifty 的意思是：", ["五十", "十五", "五"], "五十", "fifty 表示五十。"], ["point 在本单元常表示：", ["分数", "窗户", "季节"], "分数", "point 可表示比赛得分。"]],
  },
  {
    title: "She helps students",
    theme: "人物与职业：描述别人做什么",
    goal: "能用 She/He helps/teaches... 描述人物职责和帮助行为。",
    words: [["help", "帮助"], ["teach", "教"], ["read", "阅读"], ["cook", "做饭；厨师"], ["learn", "学习"], ["people", "人们"]],
    expressions: [["She helps students.", "她帮助学生。", "描述老师或帮助学生的人。"], ["She teaches us.", "她教我们。", "说明老师的工作。"], ["We love her.", "我们爱她。", "表达对人物的喜爱。"]],
    grammar: [["She/He 后的一般现在时动词常加 s。", "She helps students.", "错：She help students. 正：She helps students."], ["help + 人：表示帮助某人。", "He helps people.", "错：help to students 正：helps students"]],
    challenges: [["描述她帮助学生。", "She helps students."], ["描述她教我们。", "She teaches us."], ["表达我们爱她。", "We love her."], ["She 后 help 要变成什么？", "helps"], ["teach 的意思。", "教"], ["learn 的意思。", "学习"]],
    quizzes: [["She ___ students.", ["helps", "help", "helping"], "helps", "She 后动词通常加 s。"], ["‘她教我们。’应选：", ["She teaches us.", "She teach us.", "She helps window."], "She teaches us.", "teaches 表示教。"], ["learn 的意思是：", ["学习", "比赛", "季节"], "学习", "learn 表示学习。"]],
  },
  {
    title: "What's your favourite season?",
    theme: "季节与喜好：表达最喜欢的季节",
    goal: "能询问和回答最喜欢的季节，并简单说明天气特点。",
    words: [["favourite", "最喜欢的"], ["season", "季节"], ["spring", "春天"], ["summer", "夏天"], ["autumn", "秋天"], ["winter", "冬天"]],
    expressions: [["What's your favourite season?", "你最喜欢的季节是什么？", "询问别人最喜欢的季节。"], ["My favourite season is spring.", "我最喜欢的季节是春天。", "回答最喜欢的季节。"], ["It's warm in spring.", "春天很温暖。", "描述季节天气。"]],
    grammar: [["What's your favourite...? 用来问最喜欢的事物。", "What's your favourite season?", "错：What your favourite season? 正：What's..."], ["in + 季节：表示在某个季节。", "It's cool in autumn.", "错：on autumn 正：in autumn"]],
    challenges: [["询问最喜欢的季节。", "What's your favourite season?"], ["回答最喜欢春天。", "My favourite season is spring."], ["描述春天温暖。", "It's warm in spring."], ["描述秋天凉爽。", "It's cool in autumn."], ["in winter 表示什么？", "在冬天"], ["favourite 的意思。", "最喜欢的"]],
    quizzes: [["‘你最喜欢的季节是什么？’应选：", ["What's your favourite season?", "Where's your season?", "What classes do you have?"], "What's your favourite season?", "favourite season 表示最喜欢的季节。"], ["It's warm ___ spring.", ["in", "on", "under"], "in", "季节前常用 in。"], ["winter 是：", ["冬天", "夏天", "春天"], "冬天", "winter 表示冬天。"]],
  },
  {
    title: "What can you see?",
    theme: "观察表达：说出你看见了什么",
    goal: "能用 What can you see? 询问，并用 I can see... 描述看到的景物。",
    words: [["cloud", "云"], ["sun", "太阳"], ["sky", "天空"], ["river", "河流"], ["boat", "小船"], ["mountain", "山"]],
    expressions: [["What can you see?", "你能看见什么？", "询问图片或周围环境中有什么。"], ["I can see a river.", "我能看见一条河。", "回答自己看到的事物。"], ["Can you see a boat?", "你能看见一只小船吗？", "确认别人是否看见某物。"]],
    grammar: [["can 后接动词原形。", "I can see a boat.", "错：I can sees a boat. 正：I can see a boat."], ["What can you see? 不能只用 Yes/No 回答。", "I can see a kite.", "错：Yes, I can. 正：I can see..." ]],
    challenges: [["询问你能看见什么。", "What can you see?"], ["回答我能看见一条河。", "I can see a river."], ["确认能否看见一只小船。", "Can you see a boat?"], ["can 后面 see 要不要加 s？", "不要，can see"], ["sky 的意思。", "天空"], ["mountain 的意思。", "山"]],
    quizzes: [["别人问 What can you see? 你应回答：", ["I can see a lake.", "Yes, I do.", "I am fine."], "I can see a lake.", "问看到什么，要回答具体事物。"], ["正确句子是：", ["I can see a bird.", "I can sees a bird.", "I can seeing a bird."], "I can see a bird.", "can 后接动词原形。"], ["Can you see a cat? 肯定回答是：", ["Yes, I can.", "Yes, I do.", "No, I am."], "Yes, I can.", "can 问句用 can 回答。"]],
  },
  {
    title: "He is cleaning the window",
    theme: "现在进行时：描述正在做的事",
    goal: "能用 He/She is + 动词-ing 描述人物正在进行的动作。",
    words: [["clean", "打扫"], ["exercise", "锻炼"], ["sleep", "睡觉"], ["drink", "喝"], ["sweep", "扫"], ["busy", "忙碌的"]],
    expressions: [["He is cleaning the window.", "他正在擦窗户。", "描述男孩/男性正在做的动作。"], ["What is she doing?", "她正在做什么？", "询问某人正在做什么。"], ["She is drinking water.", "她正在喝水。", "回答她正在做什么。"]],
    grammar: [["正在做某事：be + 动词-ing。", "He is cleaning the window.", "错：He cleaning the window. 正：He is cleaning..."], ["问正在做什么：What is he/she doing?", "What is she doing?", "错：What she is doing? 正：What is she doing?"]],
    challenges: [["描述他正在擦窗户。", "He is cleaning the window."], ["询问她正在做什么。", "What is she doing?"], ["回答她正在喝水。", "She is drinking water."], ["正在做某事的结构。", "be + 动词-ing"], ["He 后 be 动词用什么？", "is"], ["busy 的意思。", "忙碌的"]],
    quizzes: [["‘他正在擦窗户。’正确表达是：", ["He is cleaning the window.", "He cleaning the window.", "He cleans window."], "He is cleaning the window.", "现在进行时需要 is + 动词-ing。"], ["想问‘她正在做什么？’应选：", ["What is she doing?", "What she is doing?", "What can she see?"], "What is she doing?", "疑问句中 is 放在主语 she 前。"], ["She ___ drinking water.", ["is", "are", "am"], "is", "She 后用 is。"]],
  },
  {
    title: "The Dragon Boat Festival",
    theme: "节日文化：介绍端午节",
    goal: "能用简单英语介绍端午节活动和食物，提升文化表达能力。",
    words: [["dragon", "龙"], ["festival", "节日"], ["race", "比赛"], ["remember", "纪念"], ["make", "制作"], ["country", "国家"]],
    expressions: [["It's the Dragon Boat Festival.", "这是端午节。", "介绍节日名称。"], ["We watch dragon boat races.", "我们观看龙舟比赛。", "介绍端午节活动。"], ["We eat rice dumplings.", "我们吃粽子。", "介绍端午节食物。"]],
    grammar: [["介绍节日活动：We + 动词原形。", "We eat rice dumplings.", "错：We eats rice dumplings. 正：We eat..."], ["节日名称前常用 the。", "the Dragon Boat Festival", "错：Dragon Boat Festival is today. 更自然：It's the Dragon Boat Festival."]],
    challenges: [["介绍这是端午节。", "It's the Dragon Boat Festival."], ["说我们观看龙舟比赛。", "We watch dragon boat races."], ["说我们吃粽子。", "We eat rice dumplings."], ["We 后 eat 要不要加 s？", "不要，We eat"], ["festival 的意思。", "节日"], ["dragon boat races 表示什么？", "龙舟比赛"]],
    quizzes: [["端午节期间‘我们吃粽子’应选：", ["We eat rice dumplings.", "We eats signs.", "We are windows."], "We eat rice dumplings.", "We 后用动词原形 eat。"], ["dragon boat races 是：", ["龙舟比赛", "数学课", "公共标志"], "龙舟比赛", "dragon boat races 表示龙舟比赛。"], ["We ___ dragon boat races.", ["watch", "watches", "watching"], "watch", "We 后用动词原形。"]],
  },
  {
    title: "What does that sign mean?",
    theme: "公共标识：看懂规则并表达禁止",
    goal: "能询问标志含义，并用 It means... / No + doing 表达公共规则。",
    words: [["sign", "标志"], ["mean", "意思是"], ["must", "必须"], ["stop", "停止"], ["wait", "等待"], ["smoke", "吸烟"]],
    expressions: [["What does that sign mean?", "那个标志是什么意思？", "看到不认识的标志时询问。"], ["It means 'No talking'.", "它的意思是‘禁止说话’。", "解释标志含义。"], ["You must stop.", "你必须停下。", "表达必须遵守的规则。"]],
    grammar: [["询问单个标志含义：What does ... mean?", "What does that sign mean?", "错：What do that sign mean? 正：What does..."], ["禁止做某事：No + 动词-ing。", "No smoking.", "错：No smoke. 正：No smoking."]],
    challenges: [["询问那个标志是什么意思。", "What does that sign mean?"], ["解释它表示禁止说话。", "It means 'No talking'."], ["表达你必须停下。", "You must stop."], ["禁止吸烟的正确表达。", "No smoking."], ["that sign 后用 do 还是 does？", "does"], ["mean 的意思。", "意思是"]],
    quizzes: [["看到新标志，想问意思，应选：", ["What does that sign mean?", "What do that sign mean?", "Where is your sign?"], "What does that sign mean?", "that sign 是单数，用 does。"], ["‘禁止吸烟’正确表达是：", ["No smoking.", "No smoke.", "Not smoke."], "No smoking.", "No + 动词-ing 表示禁止。"], ["It means... 用来：", ["解释含义", "询问课程", "描述季节"], "解释含义", "It means 用来说明意思。"]],
  },
];

const extractWrong = (text: string) => {
  const match = text.match(/错：([^正]+)/);
  return match?.[1]?.trim() || "I am fine.";
};

const uniqueThree = (items: string[]) => {
  const values = Array.from(new Set(items)).filter(Boolean);
  return [...values, "I am fine.", "Not this one"].slice(0, 3);
};

const buildLevelQuestions = (seed: UnitSeed, unitNumber: number): QuizQuestion[] => {
  const levels: Array<[string, string[], string, string]> = [
    seed.quizzes[0],
    [
      `语法关：${seed.grammar[0][0]} 选正确句子。`,
      uniqueThree([seed.grammar[0][1], extractWrong(seed.grammar[0][2]), seed.expressions[2]?.[0] ?? seed.expressions[1][0]]),
      seed.grammar[0][1],
      seed.grammar[0][2],
    ],
    [
      `情境关：${seed.expressions[0][2]} 应该说什么？`,
      uniqueThree([seed.expressions[0][0], seed.expressions[1][0], "How old are you?"]),
      seed.expressions[0][0],
      `这个场景要用：${seed.expressions[0][0]}`,
    ],
    [
      `改错关：${extractWrong(seed.grammar[0][2])} 应改成哪一句？`,
      uniqueThree([extractWrong(seed.grammar[0][2]), seed.grammar[0][1], seed.expressions[1][0]]),
      seed.grammar[0][1],
      "改错题先看主语、助动词、be 动词和动词形式。",
    ],
    [
      `迁移关：${seed.grammar[1][0]} 选正确表达。`,
      uniqueThree([seed.grammar[1][1], extractWrong(seed.grammar[1][2]), seed.expressions[0][0]]),
      seed.grammar[1][1],
      seed.grammar[1][2],
    ],
  ];

  return levels.map(([question, options, answer, explanation], quizIndex): QuizQuestion => ({
    id: `u${unitNumber}-q${quizIndex + 1}`,
    question,
    options,
    answer,
    explanation,
  }));
};

const unit = (seed: UnitSeed, index: number): LearningUnit => {
  const unitNumber = index + 1;
  return {
    id: `unit-${unitNumber}`,
    unitNumber,
    title: seed.title,
    theme: seed.theme,
    summary: seed.goal,
    learningGoal: seed.goal,
    knowledgePoints: [
      {
        id: `u${unitNumber}-k1`,
        title: "本课要解决的问题",
        explanation: seed.goal,
        example: seed.expressions[0][0],
        tip: "先看中文场景，再套用本单元核心句型。",
      },
      {
        id: `u${unitNumber}-k2`,
        title: "重点表达怎么用",
        explanation: `${seed.expressions[0][0]} / ${seed.expressions[1][0]} 是本课高频表达。`,
        example: seed.expressions[1][0],
        tip: seed.expressions[1][2],
      },
      {
        id: `u${unitNumber}-k3`,
        title: "考试易错点",
        explanation: seed.grammar[0][0],
        example: seed.grammar[0][1],
        tip: seed.grammar[0][2],
      },
    ],
    vocabulary: seed.words.map(([english, chinese], wordIndex) => ({
      id: `u${unitNumber}-w${wordIndex + 1}`,
      english,
      chinese,
      phonetic: "",
      example: seed.expressions[wordIndex % seed.expressions.length][0],
    })),
    sentencePatterns: seed.expressions.map(([english, chinese, useCase], expressionIndex) => ({
      id: `u${unitNumber}-p${expressionIndex + 1}`,
      english,
      chinese,
      example: useCase,
    })),
    grammarFocus: seed.grammar.map(([rule, example, commonMistake], grammarIndex) => ({
      id: `u${unitNumber}-g${grammarIndex + 1}`,
      rule,
      example,
      commonMistake,
    })),
    dragQuestions: seed.challenges.map(([chinese, english], challengeIndex) => ({
      id: `u${unitNumber}-c${challengeIndex + 1}`,
      english,
      chinese,
    })),
    quizQuestions: buildLevelQuestions(seed, unitNumber),
  };
};

const units = seeds.map(unit);

export const courseData: CourseData = {
  course: "Shima English",
  publisher: "湘少版（三起）",
  grade: "四年级",
  semester: "下册",
  note: "知识点提分预览版：依据公开资料整理单元主题，练习题为原创设计，建议后续按教材校对。",
  modules: [
    { id: "module-1", moduleNumber: 1, title: "位置与课程", description: "先会问，再会答：位置、课程这些高频校园表达。", units: units.slice(0, 2) },
    { id: "module-2", moduleNumber: 2, title: "星期与数字", description: "把星期、课程和比赛得分联系起来，提升听读理解。", units: units.slice(2, 4) },
    { id: "module-3", moduleNumber: 3, title: "人物与季节", description: "描述别人做什么，表达自己喜欢什么季节。", units: units.slice(4, 6) },
    { id: "module-4", moduleNumber: 4, title: "观察与动作", description: "看图说话核心能力：看见什么、正在做什么。", units: units.slice(6, 8) },
    { id: "module-5", moduleNumber: 5, title: "文化与规则", description: "端午文化表达与公共标识规则，贴近日常生活。", units: units.slice(8, 10) },
  ],
};
