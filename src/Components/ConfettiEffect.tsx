import React, { useEffect, useState } from "react";
import "../Styles/ConfettiEffect.css";

interface ConfettiProps {
  active: boolean;
}

interface ConfettiPiece {
  id: number;
  x: number;
  y: number;
  color: string;
  size: number;
  rotation: number;
  animationDelay: string;
}

const COLORS = [
  "#FF6B95",
  "#FFD1DC",
  "#FFC0CB",
  "#FF9BAA",
  "#FFEFF4",
  "#FFF0F5",
  "#FFB6C1",
  "#FF69B4",
  "#FFA07A",
  "#FFFFFF",
  "#FFE4E1",
];

const SHAPES = ["square", "circle"];

const ConfettiEffect: React.FC<ConfettiProps> = ({ active }) => {
  const [confetti, setConfetti] = useState<ConfettiPiece[]>([]);

  useEffect(() => {
    if (active) {
      const newConfetti = Array.from({ length: 150 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: -5 - Math.random() * 10,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        size: 5 + Math.random() * 15,
        rotation: Math.random() * 360,
        animationDelay: `${Math.random() * 0.5}s`,
      }));

      setConfetti(newConfetti);

      const timer = setTimeout(() => {
        setConfetti([]);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [active]);

  if (!active || confetti.length === 0) return null;

  return (
    <div className="confetti-container">
      {confetti.map((piece) => (
        <div
          key={piece.id}
          className="confetti-piece confetti-animation"
          style={{
            left: `${piece.x}%`,
            top: `${piece.y}%`,
            backgroundColor: piece.color,
            width: `${piece.size}px`,
            height: `${piece.size}px`,
            borderRadius:
              SHAPES[Math.floor(Math.random() * SHAPES.length)] === "circle"
                ? "50%"
                : "2px",
            transform: `rotate(${piece.rotation}deg)`,
            animationDelay: piece.animationDelay,
          }}
        />
      ))}
    </div>
  );
};

export default ConfettiEffect;
