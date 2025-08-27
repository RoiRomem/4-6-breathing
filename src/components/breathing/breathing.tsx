import React, { useRef, useState, useEffect } from "react";

export default function Breathing() {
  const innerRef = useRef<HTMLDivElement | null>(null);
  const intervalRef = useRef<number | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [currentPhase, setCurrentPhase] = useState<"idle" | "in" | "out">(
    "idle"
  );
  const [inTime, setInTime] = useState(4);
  const [outTime, setOutTime] = useState(6);

  const startBreathing = () => {
    if (intervalRef.current !== null) return; // already running

    const runCycle = () => {
      const inner = innerRef.current;
      if (!inner) return;

      // Start breath-in phase
      setCurrentPhase("in");
      inner.style.transition = `all ${inTime}s ease-in-out`;
      inner.style.width = "100%";
      inner.style.height = "100%";

      // After breath-in completes, start breath-out
      setTimeout(() => {
        if (inner && intervalRef.current !== null) {
          setCurrentPhase("out");
          inner.style.transition = `all ${outTime}s ease-in-out`;
          inner.style.width = "10%";
          inner.style.height = "10%";
        }
      }, inTime * 1000);
    };

    // Run the first cycle immediately
    runCycle();

    // Set up interval for subsequent cycles
    intervalRef.current = window.setInterval(
      runCycle,
      (inTime + outTime) * 1000
    );
    setIsRunning(true);
  };

  const stopBreathing = () => {
    if (intervalRef.current === null) return;

    clearInterval(intervalRef.current);
    intervalRef.current = null;
    setIsRunning(false);
    setCurrentPhase("idle");

    // Reset animation state
    const inner = innerRef.current;
    if (inner) {
      inner.style.transition = "all 0.3s ease";
      inner.style.width = "10%";
      inner.style.height = "10%";
    }
  };

  const toggleBreathing = () => {
    if (isRunning) {
      stopBreathing();
    } else {
      startBreathing();
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const getInstructionText = () => {
    if (!isRunning) return "Click start to begin breathing exercise";
    if (currentPhase === "in") return "Breathe in...";
    if (currentPhase === "out") return "Breathe out...";
    return "Follow the blue circle with your breathing";
  };

  const containerStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "20px",
    minHeight: "45vh",
    fontFamily: "system-ui, sans-serif",
  };

  const buttonStyle: React.CSSProperties = {
    padding: "12px 24px",
    fontSize: "16px",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    transition: "all 0.2s ease",
    fontWeight: "500",
    backgroundColor: isRunning ? "#dc3545" : "#28a745",
  };

  const outlineStyle: React.CSSProperties = {
    width: "200px",
    height: "200px",
    border: "4px solid white",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  };
  const innerStyle: React.CSSProperties = {
    width: "10%",
    height: "10%",
    backgroundColor: "rgb(14, 66, 179)",
    borderRadius: "50%",
    transition: "all 0.3s ease",
  };

  const infoStyle: React.CSSProperties = {
    color: "white",
    textAlign: "center",
  };

  const timingStyle: React.CSSProperties = {
    margin: "0 0 10px 0",
    fontSize: "16px",
  };

  const instructionStyle: React.CSSProperties = {
    margin: "0",
    fontSize: "14px",
    opacity: 0.7,
  };

  const labelStyle: React.CSSProperties = {
    display: "block",
    marginBottom: "4px",
    fontWeight: "bold",
    paddingRight: "10%",
  };

  const inputStyle: React.CSSProperties = {
    marginBottom: "12px",
    padding: "4px",
  };

  return (
    <div style={containerStyle}>
      <div style={outlineStyle}>
        <div ref={innerRef} style={innerStyle} />
      </div>

      <div style={infoStyle}>
        <p style={timingStyle}>
          Breathe in: {inTime}s | Breathe out: {outTime}s
        </p>
        <p style={instructionStyle}>{getInstructionText()}</p>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "20px", // space between inputs container and button
          marginTop: "20px", // optional spacing
          flexWrap: "wrap", // wraps if screen is too small
        }}
      >
        <div
          style={{
            display: "flex",
            gap: "10px", // space between inputs
            alignItems: "center",
          }}
        >
          <label style={labelStyle}>
            In Time
            <input
              style={inputStyle}
              type="number"
              value={inTime}
              onChange={(e) => setInTime(Number(e.target.value))}
            />
          </label>

          <label style={labelStyle}>
            Out Time
            <input
              style={inputStyle}
              type="number"
              value={outTime}
              onChange={(e) => setOutTime(Number(e.target.value))}
            />
          </label>
        </div>

        <button
          style={buttonStyle}
          onClick={toggleBreathing}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.9")}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
          onMouseDown={(e) => (e.currentTarget.style.transform = "scale(0.98)")}
          onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
        >
          {isRunning ? "Stop" : "Start"} Breathing
        </button>
      </div>
    </div>
  );
}
