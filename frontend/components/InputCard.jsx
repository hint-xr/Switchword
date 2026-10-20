"use client";

import { useState } from "react";

export default function InputCard({ onResult }) {
  const [text, setText] = useState("今天的风很轻，适合把脑海里的想法慢慢写下来。");
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    if (!text) return;
    setLoading(true);

    try {
      const res = await fetch("http://127.0.0.1:8000/api/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: text }),
      });

      const data = await res.json();
      onResult(data); // 把数据传给父组件
    } catch (error) {
      console.error("请求失败，请检查后端是否开启", error);
      alert("请求失败，请检查后端是否开启");
    } finally {
      setLoading(false);
    }
  };

  return (
    <article className="panel panel-half lab-panel-card">
      <div className="panel-heading">
        <p className="section-kicker">输入区</p>
        <h3>贴一段中文</h3>
      </div>
      <form className="lab-form" onSubmit={(e) => e.preventDefault()}>
        <label htmlFor="text-input">文本内容</label>
        <textarea
          id="text-input"
          rows="8"
          placeholder="例如：生活没有标准答案，但每一天都值得认真感受。"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <p className="lab-count">已输入 {text.length} 字</p>
        <button 
          className="primary-button" 
          type="button" 
          onClick={handleAnalyze}
          disabled={loading}
        >
          {loading ? "分析中..." : "开始分析"}
        </button>
      </form>
    </article>
  );
}