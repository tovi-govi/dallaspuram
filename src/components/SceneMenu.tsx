import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import './SceneMenu.css';

const menuData = [
  {
    category: "MAA INTI MAMSAAHARA KURALLU",
    teluguCategory: "మా ఇంటి మాంసాహార కూరలు",
    items: [
      { name: "Chicken Curry", desc: "Homestyle bone-in chicken curry", price: "299" },
      { name: "Mutton Curry", desc: "Traditional slow-cooked mutton curry", price: "349" },
      { name: "Royyala Iguru", desc: "Prawns curry", price: "399" },
      { name: "Fish Pulusu", desc: "Tangy tamarind fish stew", price: "359" },
    ]
  },
  {
    category: "MAA INTI SHAKAHARA KURALLU",
    teluguCategory: "మా ఇంటి శాకాహార కూరలు",
    items: [
      { name: "Gutti Vankaya Curry", desc: "Stuffed baby eggplants", price: "229" },
      { name: "Tomato Pappu", desc: "Tomato and lentil stew", price: "199" },
      { name: "Dondakaya Vepudu", desc: "Ivy gourd stir-fry", price: "209" },
    ]
  }
];

export default function SceneMenu() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.sm-menu-item',
        { opacity: 0, y: 20 },
        {
          opacity: 1, y: 0, stagger: 0.05, duration: 0.8,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 60%"
          }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="scene-container bg-parchment text-soil scene-menu" ref={containerRef}>
      
      <div className="sm-caption">SCENE 04 — THE OFFERING</div>

      <div className="sm-layout">
        
        <div className="sm-typography-side">
          <h2 className="telugu-text text-huge text-turmeric sm-huge-title">రుచులు</h2>
          <p className="sm-vertical-text">THE MENU</p>
        </div>

        <div className="sm-menu-side">
          {menuData.map((section, idx) => (
            <div className="sm-menu-group" key={idx}>
              <h3 className="telugu-text sm-group-telugu">{section.teluguCategory}</h3>
              <h4 className="sm-group-latin">{section.category}</h4>
              
              <div className="sm-items">
                {section.items.map((item, i) => (
                  <div className="sm-menu-item" key={i}>
                    <div className="sm-item-main">
                      <span className="sm-item-name">{item.name}</span>
                      <span className="sm-item-dots"></span>
                      <span className="sm-item-price">{item.price}</span>
                    </div>
                    <p className="sm-item-desc">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
          
          <a href="#" className="sm-full-menu-link">VIEW FULL NARRATIVE MENU</a>
        </div>

      </div>

    </div>
  );
}
