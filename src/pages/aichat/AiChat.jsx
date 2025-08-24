import { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "./AiChat.css";
import api from "../../utils/axios";

function AiChat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [fetchingStores, setFetchingStores] = useState(false);
  const [started, setStarted] = useState(false);
  const chatAreaRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!chatAreaRef.current) return;
    requestAnimationFrame(() => {
      chatAreaRef.current.scrollTop = chatAreaRef.current.scrollHeight;
    });
  }, [messages, loading, fetchingStores]);

  const buildUserContext = useCallback(
    (extraUserMsg) => {
      const all = extraUserMsg ? [...messages, extraUserMsg] : [...messages];
      return all
        .filter((m) => m.sender === "user")
        .map((m) => m.text)
        .join("\n");
    },
    [messages]
  );

  // setMessages를 하는 로직이 너무 많은데 이걸 따로 함수로 관리하면 좋을 거 같음
  // 중복 로직이 많은데 하드코딩 되어 있음
  const sendMessage = useCallback(async () => {
    if (loading) return;

    const content = input.trim();
    if (!content) {
      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text: "뭘 먹고 싶은지 말해줘야 추천해줄 수 있어유~",
          requestId: null,
        },
      ]);
      return;
    }
    setStarted(true);
    const userMsg = { sender: "user", text: content };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await api.post("/api/chat/message", {
        message: buildUserContext(userMsg),
      });
      const data = res?.data ?? {};
      let hasStores = false;
      if (data.requestId) {
        try {
          const resStores = await api.get("/api/chat/stores", {
            params: { requestId: data.requestId },
          });
          hasStores =
            Array.isArray(resStores?.data?.stores) &&
            resStores.data.stores.length > 0;
        } catch {
          hasStores = false;
        }
      }
      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text: data.reply || "음... 일단 이렇게 추천해볼게유!",
          requestId: data.requestId || null,
          hasStores,
        },
      ]);
    } catch (e) {
      const status = e?.response?.status;
      const extra = e?.response?.data?.message
        ? `(${e.response.data.message})`
        : "";
      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text:
            status === 404
              ? "서버에 문제가 있어유"
              : `무슨 말인지 못알아들었어유 다시 보내주세유\n${extra}`,
          requestId: null,
        },
      ]);
    } finally {
      setLoading(false);
    }
  }, [input, loading, buildUserContext]);

  const goRecommendByRequestId = async (requestId) => {
    if (!requestId || fetchingStores) return;
    setFetchingStores(true);
    try {
      const resStores = await api.get("/api/chat/stores", {
        params: { requestId },
      });
      const stores = Array.isArray(resStores?.data?.stores)
        ? resStores.data.stores
        : [];
      const top3 = stores.slice(0, 3);

      if (top3.length > 0) {
        navigate("/ai-recommend", { state: { stores: top3, requestId } });
      }
    } finally {
      setFetchingStores(false);
    }
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
      {/* 이거 메세지 컴포넌트로 분리해서 쓸 것 */}
      <div className="chatContainer">
        <div className="chatArea" ref={chatAreaRef}>
          {messages.map((msg, i) => {
            const isAI = msg.sender === "ai";
            return (
              <div key={i} className={`chatBubble ${msg.sender}`}>
                <p style={{ whiteSpace: "pre-wrap", marginBottom: 8 }}>
                  {msg.text}
                </p>

                {isAI && msg.requestId && msg.hasStores && (
                  <button
                    className="airecomBtn"
                    type="button"
                    disabled={fetchingStores}
                    onClick={() => goRecommendByRequestId(msg.requestId)}
                    aria-label="천둥이 Pick 보러가기"
                    title="천둥이 Pick 보러가기"
                  >
                    {fetchingStores ? "불러오는 중..." : "천둥이 Pick 보러가기"}
                  </button>
                )}
              </div>
            );
          })}

          {loading && (
            <div className="chatBubble ai">
              <p>잠시만 기다려주세유 대답 만드는 중이에유~</p>
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
          <img src="/assets/sendPointer.svg" alt="send" />
        </button>
      </div>
    </div>
  );
}

export default AiChat;
