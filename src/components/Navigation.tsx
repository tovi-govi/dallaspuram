import './Navigation.css';

export default function Navigation() {
  return (
    <nav className="nav-container">
      <div className="nav-logo">
        <span className="nav-logo-telugu telugu-text">దల్లాస్పురం</span>
        <span className="nav-logo-latin">DALLAS PURAM TELUGU KITCHEN</span>
      </div>
      
      <div className="nav-links">
        <a href="#story">Story</a>
        <a href="#menu">Menu</a>
        <a href="#visit" className="nav-cta">Visit</a>
      </div>
    </nav>
  );
}
