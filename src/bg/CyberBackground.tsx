"use client";
import { useEffect, useState } from "react";

export default function CyberBackground() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-blue-950 to-purple-900" />
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,234,255,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(0,234,255,0.12) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          animation: "gridMove 20s linear infinite"
        }}
      />
      {isClient && (
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(18)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-cyan-400 rounded-full opacity-60 blur-sm"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `floaty ${3 + Math.random() * 4}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 2}s`
              }}
            />
          ))}
        </div>
      )}
      <style jsx>{`
        @keyframes gridMove {
          0% { transform: translate(0, 0); }
          100% { transform: translate(48px, 48px); }
        }
        @keyframes floaty {
          0%, 100% { transform: translateY(0px) scale(1); opacity: 0.6; }
          50% { transform: translateY(-24px) scale(1.2); opacity: 1; }
        }
      `}</style>
    </div>
  );
} 