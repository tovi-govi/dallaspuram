import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ASSETS } from '../data/assets';
import './SceneFinale.css';

export default function SceneFinale() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to('.sf-bg', {
        scale: 1.1,
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
    <div className="scene-container scene-finale bg-soil text-parchment" ref={containerRef}>
      
      <div className="sf-img-wrapper">
        <img src={ASSETS.restaurantExterior} className="img-cover sf-bg" alt="Dallas Puram Exterior" />
        <div className="sf-overlay"></div>
      </div>

      <div className="sf-content">
        <h2 className="telugu-text text-huge text-turmeric sf-huge-title">మళ్లీ<br/>రండి</h2>
        
        <div className="sf-info-grid">
          <div className="sf-info-col">
            <h4>DALLAS PURAM TELUGU KITCHEN</h4>
            <p>Jubilee Hills<br/>Hyderabad, Telangana</p>
          </div>
          <div className="sf-info-col">
            <h4>RESERVATIONS</h4>
            <p>hello@dallaspuramtelugukitchen.com<br/>+91 98765 43210</p>
          </div>
          <div className="sf-info-col">
            <h4>HOURS</h4>
            <p>Tue - Sun: 5pm - 10pm<br/>Mon: Closed</p>
          </div>
        </div>

        <div className="sf-footer-bottom">
          <span>&copy; {new Date().getFullYear()} Dallas Puram Telugu Kitchen</span>
          <a href="#" className="sf-cta">VISIT US</a>
        </div>
      </div>

    </div>
  );
}
