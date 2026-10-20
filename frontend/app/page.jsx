"use client";

import { useState } from "react";
import TextLabView from "../components/TextLabView";
import InputCard from "../components/InputCard";

export default function Home() {
  const [result, setResult] = useState(null);

  return (
    <main style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '32px', marginBottom: '20px' }}>文字实验室</h1>
      
      {/* 传入 onResult，让输入框能传数据出来 */}
      <InputCard onResult={setResult} />

      {/* 如果有结果了，就渲染出来 */}
      {result && (
        <div style={{ marginTop: '20px', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
          <h2>分析结果：</h2>
          <p><strong>拼音：</strong> {result.pinyin}</p>
          <p><strong>情感得分：</strong> {result.score} ({result.label})</p>
        </div>
      )}
    </main>
  );
}