"use client";
import { useState } from "react";

export default function PageIA() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAsk = async () => {
    if (!question.trim()) return;
    setLoading(true);
    setAnswer("");

    try {
const res = await fetch("http://localhost:3000/ask", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ question }),
});

      const data = await res.json();
      setAnswer(data.answer || "No se obtuvo respuesta del modelo.");
    } catch (error) {
      setAnswer("❌ Error al conectar con el servidor.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        padding: "40px",
        background: "linear-gradient(145deg, #0a0f1f, #0d1117)",
        color: "#e6edf3",
        minHeight: "100vh",
        fontFamily: "Inter, sans-serif",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <h2
        style={{
          fontSize: "1.8rem",
          color: "#58a6ff",
          fontWeight: "600",
          marginBottom: "1.5rem",
        }}
      >
        🧠 Asistente con Razonamiento
      </h2>

      <textarea
        placeholder="Escribí tu pregunta..."
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        style={{
          width: "100%",
          maxWidth: "600px",
          height: "120px",
          padding: "12px",
          backgroundColor: "#161b22",
          color: "#c9d1d9",
          border: "1px solid #30363d",
          borderRadius: "12px",
          resize: "none",
          outline: "none",
          transition: "0.2s border",
          fontSize: "1rem",
        }}
        onFocus={(e) => (e.target.style.border = "1px solid #58a6ff")}
        onBlur={(e) => (e.target.style.border = "1px solid #30363d")}
      />

      <button
        onClick={handleAsk}
        disabled={loading}
        style={{
          marginTop: "16px",
          padding: "10px 24px",
          background: loading
            ? "linear-gradient(90deg, #1f6feb 0%, #1058c6 100%)"
            : "linear-gradient(90deg, #238636 0%, #2ea043 100%)",
          color: "white",
          border: "none",
          borderRadius: "10px",
          fontSize: "1rem",
          fontWeight: 500,
          cursor: loading ? "not-allowed" : "pointer",
          boxShadow: "0px 0px 10px rgba(35, 134, 54, 0.3)",
          transition: "all 0.3s ease",
        }}
      >
        {loading ? "Pensando..." : "Preguntar"}
      </button>

      {answer && (
        <pre
          style={{
            marginTop: "24px",
            background: "#161b22",
            padding: "20px",
            borderRadius: "12px",
            width: "100%",
            maxWidth: "600px",
            whiteSpace: "pre-wrap",
            boxShadow: "0 0 10px rgba(88, 166, 255, 0.2)",
            border: "1px solid #30363d",
            fontSize: "1rem",
            lineHeight: 1.5,
          }}
        >
          {answer}
        </pre>
      )}
    </div>
  );
}
