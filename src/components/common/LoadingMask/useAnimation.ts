import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default (visible: boolean) => {
  const refs = {
    mask: useRef<HTMLDivElement>(null),
    spinner: useRef<HTMLDivElement>(null)
  }

  useEffect(() => {
    gsap.to(refs.mask.current, {
      duration: 0.25,
      ease: "power2.out",
      autoAlpha: visible ? 1 : 0
    });
  }, [visible]);

  useEffect(() => {
    const tween = gsap.to(refs.spinner.current, {
      duration: 1,
      ease: "power2.inOut",
      rotateZ: 360,
      repeat: -1,
      repeatDelay: 0.25
    });

    return () => { tween.kill() }
  }, []);

  return refs;
}