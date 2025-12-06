import React, { useState } from "react";

const philosophicalPrompts = {
  entry: [
    "命运需要材料。把你的选项交给我。",
    "当你无从决定，让混沌替你讲话。输入选项。",
    "说出你的犹豫，我来掷骰子。",
    "人类讨厌选择。随机数喜欢。告诉我你的选项。",
    "将选择权交还给概率——请输入备选。"
  ],
  choosing: [
    "命运在翻找你的未来…",
    "正在向宇宙请求一个答案…",
    "随机数正在深呼吸…",
    "概率在犹豫，它懂你。",
    "命运的骰子正在空中翻滚…"
  ],
  result: [
    "宇宙替你选了：",
    "概率已发言：",
    "命运偏向：",
    "你本来就想选它，只是需要我说出来：",
    "结果已生成。你要做的只是迈出去："
  ],
  comfort: [
    "你不是逃避选择，你是在分工合作：你选择生活，我选择选项。",
    "凡是随机的，都有你的影子。",
    "选择从来不是答案，行动才是。",
    "犹豫并不代表软弱，而是你在认真对待人生。",
    "命运只是你内心的投影，我只是帮你照亮它。"
  ]
};

export default function App() {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [entryPrompt] = useState(
    philosophicalPrompts.entry[Math.floor(Math.random() * philosophicalPrompts.entry.length)]
  );

  const handleChoose = () => {
    const options = input
      .split(/[,，、\n]/)
      .map(o => o.trim())
      .filter(Boolean);
    if (options.length < 2) {
      alert("请输入至少两个选项，用中文逗号、顿号或换行分隔。");
      return;
    }
    setLoading(true);
    setResult(null);
    setTimeout(() => {
      const chosen = options[Math.floor(Math.random() * options.length)];
      const resultPrompt = philosophicalPrompts.result[Math.floor(Math.random() * philosophicalPrompts.result.length)];
      const comfortPrompt = philosophicalPrompts.comfort[Math.floor(Math.random() * philosophicalPrompts.comfort.length)];
      setResult({
        message: `${resultPrompt}${chosen}`,
        comfort: comfortPrompt
      });
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col items-center justify-center px-4 py-8">
      <div className="max-w-xl w-full">
        <h1 className="text-2xl font-bold text-center mb-4">🔮 哲学随机决策器</h1>
        <p className="text-center mb-4 text-gray-400">{entryPrompt}</p>
        <textarea
          className="w-full p-3 rounded-xl bg-gray-800 text-white mb-4 focus:outline-none"
          rows={4}
          placeholder="例如：出门 / 不出门 / 吃麦当劳 / 吃拉面"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          onClick={handleChoose}
          disabled={loading}
          className="w-full bg-indigo-600 hover:bg-indigo-700 transition px-4 py-2 rounded-xl text-lg font-medium"
        >
          {loading ? "正在凝视概率之海…" : "我替你决定"}
        </button>

        {loading && (
          <p className="mt-6 text-center text-sm text-gray-400 animate-pulse">
            {philosophicalPrompts.choosing[Math.floor(Math.random() * philosophicalPrompts.choosing.length)]}
          </p>
        )}

        {result && (
          <div className="mt-6 text-center">
            <p className="text-xl font-semibold mb-2">{result.message}</p>
            <p className="text-sm text-gray-400">{result.comfort}</p>
          </div>
        )}
      </div>
    </div>
  );
}
