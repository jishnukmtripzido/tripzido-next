"use client";

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

interface UseCarouselOptions {
  visibleCards?: number;
  gap?: number;
}

export function useCarousel({
  visibleCards = 4,
  gap = 16,
}: UseCarouselOptions = {}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [maxIndex, setMaxIndex] = useState(0);
  const raf1 = useRef<number>(0);
  const raf2 = useRef<number>(0);

  const isMobile = useCallback(
    () => typeof window !== "undefined" && window.innerWidth < 768,
    [],
  );

  const init = useCallback(
    (currentIndex = 0) => {
      if (isMobile() || !trackRef.current || !viewportRef.current) return;

      const cardW =
        (viewportRef.current.offsetWidth - gap * (visibleCards - 1)) /
        visibleCards;

      Array.from(trackRef.current.children).forEach((card) => {
        (card as HTMLElement).style.width = `${cardW}px`;
        (card as HTMLElement).style.minWidth = `${cardW}px`;
      });

      const total = trackRef.current.children.length;
      const max = Math.max(0, total - visibleCards);
      setMaxIndex(max);

      trackRef.current.style.transform = `translateX(-${currentIndex * (cardW + gap)}px)`;
    },
    [gap, visibleCards, isMobile],
  );

  const scheduleInit = useCallback(
    (currentIndex = 0) => {
      cancelAnimationFrame(raf1.current);
      cancelAnimationFrame(raf2.current);
      raf1.current = requestAnimationFrame(() => {
        raf2.current = requestAnimationFrame(() => init(currentIndex));
      });
    },
    [init],
  );

  useIsomorphicLayoutEffect(() => {
    setIndex(0);
    scheduleInit(0);

    const onResize = () => {
      setIndex(0);
      scheduleInit(0);
    };
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(raf1.current);
      cancelAnimationFrame(raf2.current);
    };
  }, [scheduleInit]);

  function prev() {
    if (!trackRef.current || !viewportRef.current) return;
    const newIndex = Math.max(0, index - 1);
    setIndex(newIndex);
    const cardW =
      (viewportRef.current.offsetWidth - gap * (visibleCards - 1)) /
      visibleCards;
    trackRef.current.style.transform = `translateX(-${newIndex * (cardW + gap)}px)`;
  }

  function next() {
    if (!trackRef.current || !viewportRef.current) return;
    const newIndex = Math.min(maxIndex, index + 1);
    setIndex(newIndex);
    const cardW =
      (viewportRef.current.offsetWidth - gap * (visibleCards - 1)) /
      visibleCards;
    trackRef.current.style.transform = `translateX(-${newIndex * (cardW + gap)}px)`;
  }

  return {
    trackRef,
    viewportRef,
    index,
    maxIndex,
    prev,
    next,
    canPrev: index > 0,
    canNext: index < maxIndex,
    reinit: scheduleInit,
  };
}
