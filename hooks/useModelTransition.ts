import { useEffect, useState } from "react";

type Phase = "closed" | "opening" | "open" | "closing";

export function useModalTransition(isOpen: boolean, duration = 200) {
  const [phase, setPhase] = useState<Phase>("closed");

  useEffect(() => {
    if (isOpen) {
      setPhase("opening");
      const t = requestAnimationFrame(() => setPhase("open"));
      return () => cancelAnimationFrame(t);
    } else {
      if (phase === "closed") return;
      setPhase("closing");
      const t = setTimeout(() => setPhase("closed"), duration);
      return () => clearTimeout(t);
    }
  }, [isOpen]);

  const visible = phase !== "closed";
  const animating = phase === "opening" || phase === "closing";
  const entered = phase === "open";

  return { visible, entered, animating };
}