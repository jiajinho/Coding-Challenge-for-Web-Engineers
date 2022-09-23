import { useEffect, useRef, } from 'react';
import gsap from 'gsap';

export default (visible: [boolean, (b: boolean) => void]) => {
  const mask = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.to(mask.current, {
      duration: 0.25,
      ease: "power2.out",
      autoAlpha: visible[0] ? 1 : 0
    });
  }, [visible[0]]);

  useEffect(() => {
    const collapse = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        visible[1](false);
      }
    }

    window.addEventListener("keydown", collapse);
    return () => { window.removeEventListener("keydown", collapse) }
  }, []);

  return mask;
}