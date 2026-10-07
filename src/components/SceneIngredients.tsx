import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ASSETS } from '../data/assets';
import './SceneIngredients.css';

export default function SceneIngredients() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=300%',
          pin: true,
          scrub: 1
        }
      });

      // Mirchi exits, Pasupu enters
      tl.to('.si-img-1', { clipPath: 'inset(0% 100% 0% 0%)', duration: 1 })
        .to('.si-word-1', { xPercent: -100, opacity: 0, duration: 1 }, 0)
        
        .fromTo('.si-img-2', { clipPath: 'inset(0% 0% 0% 100%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1 }, 0)
        .fromTo('.si-word-2', { xPercent: 100, opacity: 0 }, { xPercent: 0, opacity: 1, duration: 1 }, 0)

        // Pasupu exits, Tamarind enters
        .to('.si-img-2', { clipPath: 'inset(100% 0% 0% 0%)', duration: 1 }, "+=0.5")
        .to('.si-word-2', { yPercent: -100, opacity: 0, duration: 1 }, "-=1")
        
        .fromTo('.si-img-3', { clipPath: 'inset(0% 0% 100% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1 }, "-=1")
        .fromTo('.si-word-3', { yPercent: 100, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 1 }, "-=1");

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="scene-container bg-soil scene-ingredients" ref={containerRef}>
      
      <div className="si-caption">SCENE 03 — INGREDIENTS</div>

      {/* Mirchi */}
      <div className="si-slide si-slide-1">
        <img src={ASSETS.ingredientChilli} className="img-cover si-img si-img-1" alt="Mirchi" />
        <h2 className="telugu-text text-massive text-terracotta si-word si-word-1">మిరపకాయ</h2>
        <p className="si-latin-label si-label-1">GUNTUR CHILLI</p>
      </div>

      {/* Pasupu */}
      <div className="si-slide si-slide-2">
        <img src={ASSETS.ingredientTurmeric} className="img-cover si-img si-img-2" alt="Pasupu" />
        <h2 className="telugu-text text-massive text-turmeric si-word si-word-2">పసుపు</h2>
        <p className="si-latin-label si-label-2">NIZAMABAD TURMERIC</p>
      </div>

      {/* Tamarind */}
      <div className="si-slide si-slide-3">
        <img src={ASSETS.ingredientTamarind} className="img-cover si-img si-img-3" alt="Chintapandu" />
        <h2 className="telugu-text text-massive text-soil si-word si-word-3" style={{ color: '#EFE9DF' }}>చింతపండు</h2>
        <p className="si-latin-label si-label-3">AGED TAMARIND</p>
      </div>

    </div>
  );
}
