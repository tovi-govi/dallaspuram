import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ASSETS } from '../data/assets';
import './SceneKitchen.css';

export default function SceneKitchen() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Overlapping images parallax differently
      gsap.to('.sk-img-1', {
        yPercent: -20,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        }
      });

      gsap.to('.sk-img-2', {
        yPercent: -40,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        }
      });
      
      gsap.to('.sk-huge-text', {
        xPercent: 10,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        }
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="scene-container bg-parchment text-soil scene-kitchen" ref={containerRef}>
      
      {/* Texture overlay for materiality */}
      <div className="sk-texture" style={{ backgroundImage: `url(${ASSETS.patternOverlay})` }}></div>

      <div className="sk-caption">SCENE 02 — THE KITCHEN</div>
      
      <div className="sk-visual-group">
        <div className="sk-img-wrapper sk-img-1-wrap">
          <img src={ASSETS.kitchenOverview} className="img-cover sk-img-1" alt="Kitchen setup" />
        </div>
        <div className="sk-img-wrapper sk-img-2-wrap">
          <img src={ASSETS.kitchenUtensils} className="img-cover sk-img-2" alt="Brass Utensils" />
        </div>
      </div>

      <div className="sk-typography-layer">
        <h2 className="telugu-text text-huge text-turmeric sk-huge-text">మన<br/>వంటిల్లు</h2>
      </div>

      <div className="sk-story-text">
        <p>The texture of brass, the warmth of the fire, the precision of a grandmother's hands. We don't just replicate recipes. We preserve the environment they were born in.</p>
      </div>

    </div>
  );
}
