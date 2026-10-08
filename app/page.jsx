"use client";

import Link from "next/link";
const studioSettings = {
  logo: {
    src: "/montserrat11removebgpreview.png",
    width: 400,                  
    height: 60,                  
    alt: "FLEXRANDER STUDIO  LOGO",
    moveTop: 0,                 
    moveLeft: -50,             
  },
  hero: {
    bgImage: "/sereneminimalistworkspacewithcityviews.png",
    meta: "CREATIVE DIRECTION • DIGITAL ARCHITECTURE",
    titleLine1: "FLEX",
    titleLine2: "RANDER",
    jobTitle: "Crafting Silent Digital Dominance",
    btnText: "VIEW SELECTED WORKS",
    btnLink: "/work",
    established: "EST. 2026"
  }
};


const manifestoData = [
  {
    id: "01",
    imageSrc: "/untitleddesign5.jpg",
    altText: "Bespoke Digital Architecture",
    text: "We build elite digital touchpoints designed to dominate market landscapes through silent, flawless execution.",
    isReversed: false,
  },
  {
    id: "02",
    imageSrc: "/untitleddesign6.jpg",
    altText: "Pure Code Engineering",
    text: "By merging bespoke, high-end UI/UX aesthetics with elite, pure-code front-end execution, we engineer experiences that reject mainstream templates and cater exclusively to the premium tier.",
    isReversed: true,
  },
  {
    id: "03",
    imageSrc: "/sereneminimalist workspacewith cityviews.png",
    altText: "Visual Domination",
    text: "Every pixel is an intentional layout, designed not to follow industry trends, but to command them with presence and absolute restraint.",
    isReversed: false,
  }
];

export default function HomePage() {
  return (
    <>
      <header className="luxury-header">
        <div className="header-left">
          <Link 
            href="/" 
            className="studio-logo-wrap"
            style={{
              transform: `translate(${studioSettings.logo.moveLeft}px, ${studioSettings.logo.moveTop}px)`,
              display: "flex",
              alignItems: "center"
            }}
          >
            <img 
              src={studioSettings.logo.src} 
              alt={studioSettings.logo.alt} 
              width={studioSettings.logo.width}
              height={studioSettings.logo.height}
              className="studio-logo-img" 
              style={{ objectFit: "contain", opacity: 0.95 }}
            />
          </Link>
        </div>

        <nav className="header-center">
          <Link href="/" className="nav-link">HOME</Link>
          <Link href="/work" className="nav-link">WORK</Link>
          <Link href="/about" className="nav-link">ABOUT STUDIO</Link>
          <Link href="/contact" className="nav-link">INQUIRE</Link>
        </nav>

        <div className="header-right">
          <span className="header-status-badge">{studioSettings.hero.established}</span>
        </div>
      </header>



      <main id="top">
        <section className="hero-typography">
          <div className="hero-content-inner">
            <p className="hero-top-meta">{studioSettings.hero.meta}</p>
            <h1>
              <span>{studioSettings.hero.titleLine1}</span>
              <span className="bold-signature">{studioSettings.hero.titleLine2}</span>
            </h1>

            <div className="hero-bottom-row">
              <h2 className="job-title">{studioSettings.hero.jobTitle}</h2>
              <Link 
                href={studioSettings.hero.btnLink} 
                className="silent-luxury-btn"
              >
                {studioSettings.hero.btnText}
              </Link>
            </div>
          </div>
        </section>

        <section id="about" className="curated-studio-section">
          <div className="manifesto-header">
            <h3 className="manifesto-title">THE MANIFESTO</h3>
          </div>

          {manifestoData.map((item) => (
            <div key={item.id} className={`premium-row-layout ${item.isReversed ? "reversed" : ""}`}>
              <div className="image-viewport-premium">
                <img src={item.imageSrc} alt={item.altText} loading="lazy" decoding="async" className="studio-img-refined" />
              </div>
              <div className="premium-text-block" style={item.isReversed ? { paddingRight: "40px" } : { paddingLeft: "40px" }}>
                <p className={item.id === "01" ? "studio-narrative" : "studio-sub-narrative"}>{item.text}</p>
              </div>
            </div>
          ))}
        </section>
      </main>

      <footer className="minimal-footer">
        <p>&copy; 2026 {studioSettings.hero.titleLine1} {studioSettings.hero.titleLine2} STUDIO. ALL RIGHTS RESERVED.</p>
        <a href="#top" className="back-to-top">BACK TO TOP ↑</a>
      </footer>      
      <style jsx global>{`
        * { 
          margin: 0; 
          padding: 0; 
          box-sizing: border-box; 
        }
        
        html { 
          scroll-behavior: smooth; 
        }
        
        body {
          background-color: #050505;
          color: #f5f5f3;
          font-family: 'Playfair Display', 'Cinzel', serif;
          min-height: 100vh;
          overflow-x: hidden;
          -webkit-font-smoothing: antialiased;
        }

        .luxury-header {
          position: fixed; 
          top: 0; 
          left: 0; 
          width: 100%; 
          z-index: 1000;
          display: grid; 
          grid-template-columns: 1fr auto 1fr; 
          align-items: center; 
          padding: 45px 80px; 
          background: transparent;
        }

        .studio-logo-wrap { 
          display: flex; 
          align-items: center; 
          text-decoration: none;
        }

        .studio-logo-img {
          display: block;
          width: 400px !important;
          max-width: none;
          height: 60px !important;
          object-fit: contain;
          opacity: 0.95;
          transition: 
            filter 0.9s cubic-bezier(0.16, 1, 0.3, 1), 
            transform 0.9s cubic-bezier(0.16, 1, 0.3, 1), 
            opacity 0.9s cubic-bezier(0.16, 1, 0.3, 1);
        }
        
        .studio-logo-wrap:hover .studio-logo-img {
          filter: drop-shadow(0 0 15px rgba(255, 255, 255, 0.08));
          transform: scale(1.025);
          opacity: 1 !important;
        }



        .header-center { 
          display: flex; 
          gap: 60px; 
        }

        .nav-link {
          color: #8e8e93; 
          font-family: 'Montserrat', sans-serif; 
          font-size: 0.75rem; 
          font-weight: 500; 
          letter-spacing: 4px; 
          transition: color 0.5s ease; 
          position: relative; 
          text-transform: uppercase;
          text-decoration: none !important; 
        }

        .nav-link::after, .nav-link:hover::after {
          content: none !important; 
          display: none !important;
          width: 0 !important;
          height: 0 !important;
        }

        .nav-link:hover { 
          color: #f5f5f3; 
        }

        .header-right { 
          text-align: right; 
          font-family: 'Montserrat', sans-serif; 
          font-size: 0.7rem; 
          color: #48484a; 
          letter-spacing: 2px; 
          text-transform: uppercase; 
        }

                .hero-typography {
          position: relative; 
          min-height: 100vh; 
          display: flex; 
          flex-direction: column; 
          justify-content: center; 
          padding: 0 80px;
          background: linear-gradient(to bottom, rgba(5, 5, 5, 0.2) 0%, #050505 100%), 
                      url('${studioSettings.hero.bgImage}') no-repeat center center;
          background-size: cover; 
        }

        .hero-content-inner {
          width: 100%; 
          max-width: 1400px; 
          margin-top: 60px; 
          display: flex; 
          flex-direction: column; 
          align-items: flex-start; 
          gap: 20px; 
          opacity: 0; 
          transform: translateY(15px); 
          animation: supremeFadeIn 2s cubic-bezier(0.16, 1, 0.3, 1) 0.3s forwards;
        }

        .hero-top-meta { 
          font-family: 'Montserrat', sans-serif; 
          font-size: 0.75rem; 
          letter-spacing: 4px; 
          color: #8e8e93; 
          text-transform: uppercase; 
        }

        .hero-typography h1 { 
          font-size: 8.5vw; 
          font-weight: 400; 
          line-height: 0.95; 
          text-transform: uppercase; 
          letter-spacing: -1px; 
          color: #f5f5f3; 
        }

        .hero-typography h1 .bold-signature { 
          display: block; 
          font-family: 'Cinzel', serif; 
          font-weight: 800; 
          letter-spacing: -3px; 
          color: #ffffff; 
        }

        .hero-bottom-row { 
          width: 100%; 
          display: flex; 
          justify-content: space-between; 
          align-items: flex-end; 
          margin-top: 20px; 
        }

        .job-title { 
          font-family: 'Montserrat', sans-serif; 
          font-size: 1rem; 
          font-weight: 400; 
          letter-spacing: 6px; 
          color: #636366; 
          text-transform: uppercase; 
          max-width: 60%; 
          line-height: 1.6; 
        }

        .silent-luxury-btn {
          color: #f5f5f3; 
          font-family: 'Montserrat', sans-serif; 
          font-size: 0.8rem; 
          font-weight: 600; 
          letter-spacing: 4px; 
          text-transform: uppercase; 
          background: transparent; 
          border: none; 
          cursor: pointer; 
          padding: 10px 0; 
          display: inline-block;
          text-decoration: none !important;
          
          transition: 
            letter-spacing 0.6s cubic-bezier(0.16, 1, 0.3, 1), 
            color 0.5s ease,
            transform 0.6s cubic-bezier(0.16, 1, 0.3, 1),
            filter 0.6s ease; 
          white-space: nowrap;
        }

        .silent-luxury-btn:hover { 
          color: #ffffff; 
          letter-spacing: 7px; 
          transform: translateX(8px); 
          filter: drop-shadow(0 0 8px rgba(255, 255, 255, 0.25)); 
        }

        
        .curated-studio-section { 
          padding: 180px 80px; 
          background-color: #050505; 
          display: flex; 
          flex-direction: column; 
          gap: 160px; 
        }

        .manifesto-header { 
          display: flex; 
          flex-direction: column; 
          gap: 15px; 
        }

        .manifesto-index { 
          font-family: 'Montserrat', sans-serif; 
          font-size: 0.8rem; 
          color: #636366; 
          letter-spacing: 3px; 
        }

        .manifesto-title { 
          font-family: 'Cinzel', serif; 
          font-size: 3rem; 
          font-weight: 700; 
          letter-spacing: -1px; 
          text-transform: uppercase; 
          color: #ffffff; 
        }

        .premium-row-layout { 
          display: grid; 
          grid-template-columns: 1.1fr 0.9fr; 
          gap: 120px; 
          align-items: center; 
        }

        .premium-row-layout.reversed { 
          direction: rtl; 
        }

        .premium-row-layout.reversed .premium-text-block, 
        .premium-row-layout.reversed .image-viewport-premium { 
          direction: ltr; 
        }

        .premium-text-block { 
          display: flex; 
          flex-direction: column; 
          gap: 30px; 
        }
        
        .image-viewport-premium { 
          width: 100%; 
          height: 520px; 
          position: relative; 
          background-color: #0b0b0b; 
          overflow: hidden; 
          border: 1px solid rgba(255, 255, 255, 0.01); 
        }
        
        .studio-img-refined { 
          display: block;
          width: 100%;
          height: 100%;
          object-fit: cover; 
          object-position: center;
          transition: transform 1.6s cubic-bezier(0.16, 1, 0.3, 1); 
        }

        .image-viewport-premium:hover .studio-img-refined { 
          transform: scale(1.02); 
        }
        
        .studio-narrative { 
          font-size: 1.5rem; 
          line-height: 1.8; 
          color: #f5f5f3; 
          font-weight: 300; 
        }

        .studio-sub-narrative { 
          font-family: -apple-system, BlinkMacSystemFont, sans-serif; 
          font-size: 0.95rem; 
          line-height: 1.8; 
          color: #8e8e93; 
        }

        .minimal-footer { 
          border-top: 1px solid rgba(255, 255, 255, 0.02); 
          padding: 46px 80px 70px; 
          display: flex; 
          justify-content: space-between; 
          align-items: center; 
          font-family: 'Montserrat', sans-serif; 
          font-size: 0.7rem; 
          color: #48484a; 
          letter-spacing: 2.5px; 
          background-color: #050505; 
        }

        .minimal-footer p:last-child {
          color: #f5f5f3;
          font-weight: 600;
          padding: 12px 0;
          border-bottom: 1px solid #8e8e93;
          cursor: pointer;
        }

        .back-to-top {
          color: #f5f5f3;
          font-family: 'Montserrat', sans-serif;
          font-size: 0.7rem;
          font-weight: 600;
          letter-spacing: 2.5px;
          padding: 12px 0;
          border-bottom: 1px solid #8e8e93;
          text-decoration: none;
        }

        #desktop-restriction-gate { 
          display: none; 
          position: fixed; 
          top: 0; 
          left: 0; 
          width: 100vw; 
          height: 100vh; 
          background-color: #050505; 
          z-index: 99999; 
          justify-content: center; 
          align-items: center; 
          padding: 40px; 
        }

        .gate-content-box { 
          max-width: 480px; 
          text-align: center; 
          display: flex; 
          flex-direction: column; 
          gap: 24px; 
        }

        .gate-title { 
          font-family: 'Cinzel', serif; 
          font-size: 1.8rem; 
          font-weight: 300; 
          letter-spacing: 5px; 
          text-transform: uppercase; 
          color: #f5f5f3; 
        }

        @keyframes supremeFadeIn { 
          to { 
            opacity: 1; 
            transform: translateY(0); 
          } 
        }

        @media (max-width: 1024px) {
          .luxury-header { padding: 35px 40px; grid-template-columns: 1fr auto; }
          .header-right { display: none; } 
          .header-center { gap: 35px; } 
          .hero-typography { padding: 0 40px; }
          .premium-row-layout, .premium-row-layout.reversed { grid-template-columns: 1fr; gap: 60px; direction: ltr; }
          .curated-studio-section { padding: 120px 40px; gap: 100px; }
          .image-viewport-premium { height: 360px; } 
        }

        @media (max-width: 700px) {
          .luxury-header { grid-template-columns: 1fr; gap: 16px; padding: 22px 24px; }
          .studio-logo-wrap { transform: none !important; }
          .header-left { justify-content: center; }
          .studio-logo-img { width: 280px !important; max-width: 100%; height: 42px !important; }
          .header-center { justify-content: space-between; gap: 8px; width: 100%; }
          .nav-link { font-size: .57rem; letter-spacing: 1.5px; }
          .hero-typography { min-height: 760px; padding: 0 24px; }
          .hero-content-inner { margin-top: 80px; gap: 18px; }
          .hero-top-meta { font-size: .65rem; letter-spacing: 2px; line-height: 1.6; }
          .hero-typography h1 { font-size: clamp(3.8rem, 17vw, 6.5rem); letter-spacing: -2px; }
          .hero-bottom-row { flex-direction: column; align-items: flex-start; gap: 28px; }
          .job-title { max-width: 100%; font-size: .8rem; letter-spacing: 3px; }
          .curated-studio-section { padding: 90px 24px; gap: 80px; }
          .manifesto-title { font-size: 2rem; }
          .premium-row-layout, .premium-row-layout.reversed { gap: 32px; }
          .premium-text-block { padding: 0 !important; }
          .image-viewport-premium { height: 280px; }
          .minimal-footer { padding: 50px 24px; flex-direction: column; gap: 18px; text-align: center; }
        }
      `}</style>
    </>
  );
}
