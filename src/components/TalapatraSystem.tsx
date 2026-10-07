import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import './TalapatraSystem.css';

// We assign custom scroll lengths to give the Menu enough space to unfold and scroll
const chapters = [
  { id: 'history', title: 'చరిత్ర', subtitle: 'HISTORY', scrollLen: 1 },
  { id: 'menu', title: 'రుచులు', subtitle: 'MENU', scrollLen: 4 },
  { id: 'speciality', title: 'ప్రత్యేకత', subtitle: 'SPECIALITY', scrollLen: 1 },
  { id: 'owner', title: 'యజమాని', subtitle: 'RAGHAVENDER KALLEM', scrollLen: 1 }
];

export default function TalapatraSystem() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    
    const ctx = gsap.context(() => {
      const leaves = gsap.utils.toArray('.talapatra-leaf');
      
      const totalScrollUnits = chapters.reduce((acc, ch) => acc + ch.scrollLen, 0);
      
      const masterTl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: `+=${totalScrollUnits * 100}%`,
          pin: true,
          scrub: 1,
          id: 'talapatra-pin'
        }
      });

      leaves.forEach((leaf: any, i: number) => {
        const ch = chapters[i];
        
        // Leaf rises from bottom
        masterTl.fromTo(leaf, 
          { y: '100vh', rotation: Math.random() * 4 - 2 }, 
          { y: '0vh', rotation: 0, duration: 1, ease: 'power2.out' },
          i === 0 ? "+=0" : "-=0.2"
        );
        
        // Header reveals
        masterTl.fromTo(leaf.querySelector('.t-header'),
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.5 },
          "-=0.2"
        );

        if (ch.id === 'menu') {
           // 1. Unfold the bottom flap
           masterTl.fromTo('.bottom-flap',
             { rotationX: -90 }, // swings down from behind to avoid camera clipping
             { rotationX: 0, duration: 1.5, ease: 'power2.out' }
           );
           
           // Fade out the center crease shadow as it opens
           masterTl.fromTo('.crease-shadow-horizontal',
             { opacity: 1 },
             { opacity: 0, duration: 1.5, ease: 'power2.inOut' },
             "<"
           );
           
           // Fade out the intro text while unfolding
           masterTl.to('.menu-intro', { opacity: 0, duration: 1 }, "<");

           // 2. Scroll the entire menu leaf up so the user can read the unfolded items
           masterTl.to(leaf, {
             y: '-100vh', // scroll it up deeply
             duration: 3, 
             ease: 'none'
           });
        } else {
           // Normal content reveal for other leaves
           masterTl.fromTo(leaf.querySelector('.t-body-content'),
             { opacity: 0, y: 20 },
             { opacity: 1, y: 0, duration: 0.5 },
             "-=0.2"
           );
           // Add a pause to read
           masterTl.to({}, { duration: ch.scrollLen * 0.8 }); 
        }

        // Shift leaf back when the next one comes (except the last one)
        if (i < leaves.length - 1) {
           masterTl.to(leaf, { y: ch.id === 'menu' ? '-220vh' : '-10vh', opacity: 0.5, scale: 0.95, duration: 1, ease: 'power2.inOut' });
        }
      });

    }, containerRef.current);

    return () => ctx.revert();
  }, []);

  return (
    <div className="talapatra-wrapper" ref={containerRef}>
      
      {chapters.map((ch, idx) => (
        <div key={ch.id} className={`talapatra-leaf z-${idx}`}>
           
           {ch.id === 'menu' ? (
             <div className="menu-3d-container">
                {/* Top Flap */}
                <div className="t-leaf-texture top-flap">
                  <div className="t-decor decor-instruments"></div>
                  <div className="t-hole"></div>
                  <div className="t-content">
                     <div className="t-header">
                        <span className="t-number">0{idx + 1}</span>
                        <h2 className="telugu-text t-title">{ch.title}</h2>
                        <h3 className="t-subtitle">{ch.subtitle}</h3>
                     </div>
                     <p className="menu-intro">Scroll to unfold the complete food and bar offerings.</p>
                     
                     <h4 className="menu-section-title">FOOD MENU</h4>
                     <div className="menu-grid">
                        <div className="menu-group">
                          <h5>SOUPS</h5>
                          <ul>
                            <li><span>Hot & Sour Soup</span> <span>149 / 169</span></li>
                            <li><span>Manchow Soup</span> <span>149 / 169</span></li>
                            <li><span>Sweet Corn Soup</span> <span>149 / 169</span></li>
                          </ul>
                        </div>
                        <div className="menu-group">
                          <h5>MAA INTI SHAKAHARA KURALLU</h5>
                          <ul>
                            <li><span>Gutti Vankaya Curry</span> <span>229</span></li>
                            <li><span>Tomato Pappu</span> <span>199</span></li>
                            <li><span>Palak Paneer</span> <span>249</span></li>
                          </ul>
                        </div>
                        <div className="menu-group">
                          <h5>MAA INTI MAMSAAHARA KURALLU</h5>
                          <ul>
                            <li><span>Chicken Curry</span> <span>299</span></li>
                            <li><span>Mutton Curry</span> <span>349</span></li>
                            <li><span>Royyala Iguru</span> <span>399</span></li>
                          </ul>
                        </div>
                        <div className="menu-group">
                          <h5>KAMMANI STARTERS</h5>
                          <ul>
                            <li><span>Chicken 65</span> <span>299</span></li>
                            <li><span>Apollo Fish</span> <span>339</span></li>
                            <li><span>Gobi 65</span> <span>229</span></li>
                          </ul>
                        </div>
                     </div>
                  </div>
                  <div className="t-hole"></div>
                </div>

                {/* Bottom Flap */}
                <div className="t-leaf-texture bottom-flap">
                  <div className="t-decor decor-scholar"></div>
                  <div className="t-hole"></div>
                  <div className="t-content">
                     <div className="crease-shadow-horizontal"></div>
                     <h4 className="menu-section-title">BEVERAGES & BAR</h4>
                     <div className="menu-grid">
                        <div className="menu-group">
                          <h5>BEVERAGES</h5>
                          <ul>
                            <li><span>Masala Chaas</span> <span>79</span></li>
                            <li><span>Sweet/Salted Lassi</span> <span>89</span></li>
                            <li><span>Filter Coffee</span> <span>49</span></li>
                          </ul>
                        </div>
                        <div className="menu-group">
                          <h5>CLASSIC COCKTAILS</h5>
                          <ul>
                            <li><span>Margarita</span> <span>349</span></li>
                            <li><span>Old Fashioned</span> <span>399</span></li>
                            <li><span>Whiskey Sour</span> <span>349</span></li>
                          </ul>
                        </div>
                        <div className="menu-group">
                          <h5>BEER & WINE</h5>
                          <ul>
                            <li><span>Kingfisher Premium</span> <span>149</span></li>
                            <li><span>Heineken</span> <span>229</span></li>
                            <li><span>Corona</span> <span>249</span></li>
                          </ul>
                        </div>
                        <div className="menu-group">
                          <h5>WHISKEY & SPIRITS</h5>
                          <ul>
                            <li><span>Johnnie Walker Black</span> <span>499</span></li>
                            <li><span>Jack Daniel's</span> <span>449</span></li>
                            <li><span>Grey Goose Vodka</span> <span>499</span></li>
                          </ul>
                        </div>
                     </div>
                  </div>
                  <div className="t-hole"></div>
                </div>
             </div>
           ) : (
             <div className="t-leaf-texture">
                {idx === 0 && <div className="t-decor decor-books"></div>}
                {idx === 2 && <div className="t-decor decor-clock"></div>}
                <div className="t-hole"></div>
                
                <div className="t-content">
                   <div className="t-header">
                      <span className="t-number">0{idx + 1}</span>
                      <h2 className="telugu-text t-title">{ch.title}</h2>
                      <h3 className="t-subtitle">{ch.subtitle}</h3>
                   </div>
                   
                   <div className="t-body-content">
                      {ch.id === 'history' && (
                        <p>Dallas Puram brings the untold, authentic flavors of Telangana to the forefront. Rooted in deep cultural traditions, the kitchen serves recipes passed down through generations, celebrating the fiery, robust, and earthen palette of the region.</p>
                      )}
                      {ch.id === 'speciality' && <p>Focusing on earthy, rustic preparation methods, every dish highlights locally sourced ingredients and traditional slow-cooking techniques unique to the rural heartlands of Telangana.</p>}
                      {ch.id === 'owner' && (
                        <p>
                           Brought to life by a passion for regional heritage.<br/><br/>
                           <a href="https://www.instagram.com/raghavenderkallem/" target="_blank" rel="noreferrer">@raghavenderkallem</a>
                        </p>
                      )}
                   </div>
                </div>
                
                <div className="t-hole"></div>
             </div>
           )}
           
        </div>
      ))}
      
    </div>
  );
}
