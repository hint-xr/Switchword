from fastapi import FastAPI
from pydantic import BaseModel
from snownlp import SnowNLP
from pypinyin import lazy_pinyin, Style

app = FastAPI()
from fastapi.middleware.cors import CORSMiddleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 定义前端传过来的数据格式
class AnalyzeRequest(BaseModel):
    text: str

@app.post("/api/analyze")
def analyze_text(req: AnalyzeRequest):
    text = req.text
    
    # 1. 计算情感分数（SnowNLP：越接近1越积极，越接近0越消极）
    score = round(SnowNLP(text).sentiments, 2)
    
    # 2. 生成带声调的拼音
    pinyin_list = lazy_pinyin(text, style=Style.TONE)
    pinyin_str = " ".join(pinyin_list)
    
    # 3. 判断情绪标签
    if score >= 0.6:
        label = "积极"
    elif score <= 0.4:
        label = "消极"
    else:
        label = "中性"

    return {
        "text": text,
        "score": score,
        "label": label,
        "pinyin": pinyin_str
    }