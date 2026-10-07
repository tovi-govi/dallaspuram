import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import './SceneClouds.css';
import sunImg from '../assets/sun.png';

export default function SceneClouds() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    
    const ctx = gsap.context(() => {
      // Parallax cloud layers on scroll
      gsap.to('.cloud-bg', {
        yPercent: -20,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true
        }
      });
      
      gsap.to('.cloud-mg', {
        yPercent: -50,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true
        }
      });

      gsap.to('.cloud-fg', {
        yPercent: -100,
        scale: 1.2,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true
        }
      });
      
      // Reveal transition to next scene
      gsap.to('.clouds-container', {
        opacity: 0,
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'bottom 80%',
          end: 'bottom 20%',
          scrub: true
        }
      });
    }, containerRef.current);

    return () => ctx.revert();
  }, []);

  return (
    <div className="scene-clouds-wrapper" ref={containerRef}>
      <div className="clouds-container">
        
        {/* Background Layer - Deep Red Cheriyal Sky */}
        <div className="cloud-layer cloud-bg">
          <svg viewBox="0 0 1440 1024" preserveAspectRatio="xMidYMid slice" className="cloud-svg">
            <rect width="1440" height="1024" fill="var(--color-cheriyal-red)" />
            {/* Folk art decorative sun/moon from assets */}
            <image href={sunImg} x="520" y="200" width="400" height="400" />
          </svg>
        </div>

        {/* Middle Ground - Stylized Scalloped Clouds */}
        <div className="cloud-layer cloud-mg">
          <svg viewBox="0 0 1440 1024" preserveAspectRatio="xMidYMid slice" className="cloud-svg">
            {/* Folk art cloud forms - repeating scalloped edges */}
            <path d="M-100,800 Q100,600 300,800 T700,800 T1100,800 T1500,800 L1500,1100 L-100,1100 Z" fill="var(--color-cheriyal-blue)" stroke="#111" strokeWidth="4" />
            <path d="M-100,780 Q100,580 300,780 T700,780 T1100,780 T1500,780" fill="none" stroke="var(--color-manuscript-bg)" strokeWidth="6" strokeDasharray="10, 10" />
            
            <path d="M-100,900 Q150,750 400,900 T900,900 T1400,900 T1600,900 L1600,1100 L-100,1100 Z" fill="var(--color-forest-green)" stroke="#111" strokeWidth="4" />
          </svg>
        </div>

        {/* Fore Ground - Large Framing Clouds */}
        <div className="cloud-layer cloud-fg">
          <svg viewBox="0 0 1440 1024" preserveAspectRatio="xMidYMid slice" className="cloud-svg">
            {/* Left large cloud */}
            <path d="M-200,-100 Q100,200 -50,600 Q100,800 -100,1100 L-300,1100 L-300,-100 Z" fill="var(--color-manuscript-ink)" />
            {/* Right large cloud */}
            <path d="M1600,-100 Q1300,200 1450,600 Q1300,800 1500,1100 L1700,1100 L1700,-100 Z" fill="var(--color-manuscript-ink)" />
            {/* Decorative dot borders inside the fg clouds */}
            <path d="M-170,-100 Q130,200 -20,600 Q130,800 -70,1100" fill="none" stroke="var(--color-manuscript-bg)" strokeWidth="8" strokeDasharray="15, 20" />
            <path d="M1570,-100 Q1270,200 1420,600 Q1270,800 1470,1100" fill="none" stroke="var(--color-manuscript-bg)" strokeWidth="8" strokeDasharray="15, 20" />
          </svg>
        </div>

      </div>
    </div>
  );
}
