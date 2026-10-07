import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './SceneTitle.css';

export default function SceneTitle() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // Subtle ceremonial scaling of the title and art
      gsap.fromTo(['.st-title-telugu', '.st-hero-art'],
        { scale: 0.9, opacity: 0 },
        {
          scale: 1, opacity: 1, ease: 'power2.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 80%',
            end: 'top 20%',
            scrub: true
          }
        }
      );

      // Latin text appears slightly after
      gsap.fromTo('.st-title-latin',
        { y: 50, opacity: 0 },
        {
          y: 0, opacity: 1, ease: 'power2.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 50%',
            end: 'top 10%',
            scrub: true
          }
        }
      );

      // Pin the title while Talapatra starts emerging
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top top',
        end: '+=100%',
        pin: true,
        pinSpacing: false
      });
    }, containerRef.current);

    return () => ctx.revert();
  }, []);

  return (
    <div className="scene-title-wrapper" ref={containerRef}>
      {/* The background is the manuscript texture */}
      <div className="st-texture talapatra-texture">
         <div className="st-bg-art">
           <img src="/src/assets/bhojanam.png" alt="Telugu Bhojanam" className="st-bhojanam-img" />
         </div>
         
         {/* Scattered Folk Elements extracted from the collage */}
         <div className="folk-element el-dancer"></div>
         <div className="folk-element el-lotus"></div>
         <div className="folk-element el-bonalu"></div>
         <div className="folk-element el-mango"></div>
      </div>

      <div className="st-content">
        <img src="/src/assets/hero-art.png" alt="Hero Art" className="st-hero-art" />
        <h1 className="telugu-text st-title-telugu">డల్లాస్‌పురం</h1>
        <p className="st-title-latin">DALLAS PURAM TELUGU KITCHEN</p>
      </div>
    </div>
  );
}
