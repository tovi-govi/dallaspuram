import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ASSETS } from '../data/assets';
import './SceneEntering.css';

export default function SceneEntering() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=200%",
          scrub: 1,
          pin: true,
        }
      });

      // Initially the word is partially offscreen to the right, and it moves left across the screen
      tl.to('.se-bg-img', { scale: 1.15, filter: "brightness(0.8)", ease: "none" }, 0)
        .fromTo('.se-massive-word', 
          { x: '100vw' }, 
          { x: '-100vw', ease: "none" }, 
          0
        )
        .to('.se-tiny-caption', { opacity: 0, y: -20, ease: "none" }, 0)
        .fromTo('.se-intro-text', 
          { opacity: 0, y: 50 },
          { opacity: 1, y: -50, ease: "power2.out" }, 
          0.5
        );

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="scene-container bg-soil scene-entering" ref={containerRef}>
      
      <div className="se-img-wrapper">
        <img src={ASSETS.heroImage} alt="Telangana Kitchen" className="img-cover se-bg-img" />
      </div>

      <div className="se-overlay-content">
        <p className="se-tiny-caption">SCENE 01 — ENTERING TELANGANA</p>
        
        <h1 className="telugu-text text-massive text-turmeric se-massive-word">
          దల్లాస్పురం
        </h1>
        
        <div className="se-intro-text">
          <p>Where memory</p>
          <p>becomes physical.</p>
        </div>
      </div>
      
    </div>
  );
}
