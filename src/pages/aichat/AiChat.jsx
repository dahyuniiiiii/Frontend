import { useState, useEffect, useRef, useCallback } from "react";
import "./AiChat.css";
import api from "../../utils/axios";

function AiChat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatAreaRef = useRef(null);

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
        {
          sender: "ai",
          text: "뭘 먹고 싶은지 말해줘야 추천해줄 수 있어유~",
        },
      ]);
      return;
    }

    const userMsg = { sender: "user", text: content };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await api.post("/chat", {
        userId: "guest",
        message: content,
      });

      const { response, recommendedStores } = res.data || {};
      const aiMsg = {
        sender: "ai",
        text: response || "음... 일단 이렇게 추천해볼게유!",
        stores: Array.isArray(recommendedStores) ? recommendedStores : [],
      };
      setMessages((prev) => [...prev, aiMsg]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text: "지금 서버 오류가 있어유.. 나중에 다시 시도해줘유ㅠㅠ",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }, [input, loading]);

  const onKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="home">
      <div className="homeWrapper">
        <img className="aiImg" src="/assets/ProjectLogo.svg" alt="logo" />

        <div className="textWrapper">
          오늘 뭐 묵고 싶은겨~? <br />
          찬밥이여 따신 국물이여~ 분위기도 말해봐유
          <br />
          내가 싹 다 추천해줄텨~
        </div>

        <div className="chatContainer">
          <div className="chatArea" ref={chatAreaRef}>
            {messages.map((msg, i) => (
              <div key={i} className={`chatBubble ${msg.sender}`}>
                <p>{msg.text}</p>
              </div>
            ))}
            {loading && (
              <div className="chatBubble ai">
                <p>추천 목록 만드는 중…</p>
              </div>
            )}
          </div>
        </div>

        <div className="inputArea">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="텍스트를 입력하세요."
            onKeyDown={onKeyDown}
            disabled={loading}
          />
          <button
            className="sendBtn"
            onClick={sendMessage}
            disabled={loading}
            type="button"
          >
            <img src="/assets/sendPointer.svg" alt="" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default AiChat;
