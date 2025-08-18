import { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "./AiChat.css";
import api from "../../utils/axios";

function AiChat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [started, setStarted] = useState(false);
  const chatAreaRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!chatAreaRef.current) return;
    requestAnimationFrame(() => {
      chatAreaRef.current.scrollTop = chatAreaRef.current.scrollHeight;
    });
  }, [messages]);

  const sendMessage = useCallback(async () => {
    if (loading) return;

    const content = input.trim();
    if (!content) {
      setMessages((prev) => [
        ...prev,
        { sender: "ai", text: "뭘 먹고 싶은지 말해줘야 추천해줄 수 있어유~" },
      ]);
      return;
    }
    setStarted(true);

    const userMsg = { sender: "user", text: content };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setStarted(true);
    setLoading(true);

    try {
      const fullUserContext = [...messages, userMsg]
        .filter((m) => m.sender === "user")
        .map((m) => m.text)
        .join("\n");

      const res = await api.post("/api/chat/recommend", {
        message: fullUserContext,
      });
      const data = res?.data ?? res ?? {};
      const aiMsg = {
        sender: "ai",
        text: data.reply || "음... 일단 이렇게 추천해볼게유!",
        stores: Array.isArray(data.stores) ? data.stores : [],
        intent: data.intent ?? null,
      };
      setMessages((prev) => [...prev, aiMsg]);
    } catch (e) {
      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text:
            "추천을 불러오지 못했어유. 잠시 후 다시 시도해줘유ㅠㅠ\n" +
            (e?.response?.data?.message ? `(${e.response.data.message})` : ""),
        },
      ]);
    } finally {
      setLoading(false);
    }
  }, [input, loading, messages]);

  const goRecommend = (stores = []) => {
    navigate("/ai-recommend", { state: { stores } });
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className={`homeWrapper ${started ? "no-hero" : ""}`}>
      {!started && (
        <>
          <img className="aiImg" src="/assets/ProjectLogo.svg" alt="logo" />
          <div className="textWrapper">
            오늘 뭐 묵고 싶은겨~? <br />
            찬밥이여 따신 국물이여~ 분위기도 말해봐유
            <br />
            내가 싹 다 추천해줄텨~
          </div>
        </>
      )}

      <div className="chatContainer">
        <div className="chatArea" ref={chatAreaRef}>
          {messages.map((msg, i) => {
            const isAI = msg.sender === "ai";
            return (
              <div key={i} className={`chatBubble ${msg.sender}`}>
                <p style={{ whiteSpace: "pre-wrap", marginBottom: 8 }}>
                  {msg.text}
                </p>

                {isAI && Array.isArray(msg.stores) && msg.stores.length > 0 && (
                  <button
                    className="airecomBtn"
                    type="button"
                    onClick={() => goRecommend(msg.stores)}
                    aria-label="천둥이 Pick 보러가기"
                  >
                    천둥이 Pick 보러가기
                  </button>
                )}
              </div>
            );
          })}

          {loading && (
            <div className="chatBubble ai">
              <p>추천 목록 만드는 중이에유~</p>
            </div>
          )}
        </div>
      </div>

      <div className="inputArea">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={onKeyDown}
          placeholder="텍스트를 입력하세요."
        />
        <button
          className="sendBtn"
          onClick={sendMessage}
          disabled={loading}
          type="button"
          aria-label="send"
          title="전송"
        >
          <img src="/assets/sendPointer.svg" alt="" />
        </button>
      </div>
    </div>
  );
}

export default AiChat;
