"use client";

import Link from "next/link";

const navLinks = [
  { href: "/", label: "HOME" },
  { href: "/work", label: "WORK" },
  { href: "/about", label: "ABOUT STUDIO", isActive: true },
  { href: "/contact", label: "INQUIRE" },
];

const values = [
  ["01", "THE START", "Every meaningful project begins with a better question. We look for the thought, feeling, and point of view that make a brand unmistakably its own."],
  ["02", "THE FORM", "Ideas become visual language through quiet details: a considered typeface, a deliberate pause, a composition that stays with you after the screen is gone."],
  ["03", "THE FEELING", "The best digital spaces do not ask to be noticed. They create enough clarity and character for people to feel something, then find their way naturally."],
];

export default function AboutPage() {
  return (
    <div className="about-page">
      <header className="luxury-header">
        <Link href="/" className="studio-logo-wrap">
          <img src="/montserrat11removebgpreview.png" alt="FLEXRANDER STUDIO" width={400} height={60} className="studio-logo-img" />
        </Link>
        <nav className="header-center">
          {navLinks.map((link) => (
            <Link key={link.label} href={link.href} className={`nav-link${link.isActive ? " active" : ""}`}>
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="header-right">EST. 2026</div>
      </header>

      <main className="about-content">
        <section className="about-hero">
          <p className="about-meta">ABOUT THE STUDIO</p>
          <h1>Some things are <br /><span>felt before they are seen.</span></h1>
          <p className="about-intro">
            We make digital spaces with a point of view. Places where a clear idea, a thoughtful rhythm,
            and a little restraint come together to leave a lasting impression.
          </p>
        </section>

        <section className="values-list">
          {values.map(([number, label, text], index) => (
            <article key={label} className={`value-row${index % 2 ? " reversed" : ""}`}>
              <div className="value-heading"><span>{label}</span><span> {number}</span></div>
              <p>{text}</p>
              <div className="value-line" />
            </article>
          ))}
        </section>

        <section className="about-quote">
          <p>“Good design does not ask for attention. <br /><span>It gives attention somewhere to stay.”</span></p>
        </section>
      </main>

      <footer className="minimal-footer about-footer">
        <p>&copy; {new Date().getFullYear()} FLEXR RNDER STUDIO. ALL RIGHTS RESERVED.</p>
        <Link href="/contact" className="footer-link">BOOK A DISCOVERY CALL <span>→</span></Link>
      </footer>

      <style jsx global>{`
        .about-page { min-height: 100vh; background: #050505; color: #f5f5f3; font-family: var(--font-playfair), serif; -webkit-font-smoothing: antialiased; }
        .about-page .luxury-header { position: fixed; top: 0; left: 0; width: 100%; z-index: 1000; display: grid; grid-template-columns: 1fr auto 1fr; align-items: center; padding: 45px 80px; background: transparent; }
        .about-page .studio-logo-wrap { display: flex; align-items: center; transform: translate(-50px, 0); }
        .about-page .studio-logo-img { display: block; width: 400px !important; max-width: none; height: 60px !important; object-fit: contain; opacity: .95; transition: filter .9s ease, transform .9s ease, opacity .9s ease; }
        .about-page .studio-logo-wrap:hover .studio-logo-img { filter: drop-shadow(0 0 15px rgba(255,255,255,.08)); transform: scale(1.025); opacity: 1; }
        .about-page .header-center { display: flex; gap: 60px; }
        .about-page .nav-link { color: #8e8e93; font-family: var(--font-montserrat), sans-serif; font-size: .75rem; font-weight: 500; letter-spacing: 4px; text-transform: uppercase; text-decoration: none; transition: color .5s ease; }
        .about-page .nav-link:hover, .about-page .nav-link.active { color: #f5f5f3; }
        .about-page .header-right { color: #48484a; font-family: var(--font-montserrat), sans-serif; font-size: .7rem; letter-spacing: 2px; text-align: right; }
        .about-content { max-width: 1400px; margin: 0 auto; padding: 220px 80px 150px; }
        .about-hero { max-width: 1000px; min-height: 490px; display: flex; flex-direction: column; justify-content: center; }
        .about-meta { margin-bottom: 28px; color: #8e8e93; font-family: var(--font-montserrat), sans-serif; font-size: .75rem; letter-spacing: 4px; text-transform: uppercase; }
        .about-hero h1 { margin: 0; color: #f5f5f3; font-size: clamp(4rem, 8.5vw, 8.5rem); font-weight: 400; line-height: .95; letter-spacing: -2px; }
        .about-hero h1 span { color: #fff; font-family: var(--font-cinzel), serif; font-style: italic; font-weight: 700; }
        .about-intro { max-width: 700px; margin-top: 38px; color: #8e8e93; font-family: var(--font-montserrat), sans-serif; font-size: .95rem; line-height: 1.8; letter-spacing: 1px; }
        .values-list { display: flex; flex-direction: column; margin-top: 80px; }
        .value-row { position: relative; display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: center; min-height: 220px; padding: 42px 0; background: transparent !important; border: 0 !important; border-radius: 0 !important; box-shadow: none !important; animation: valueReveal .9s cubic-bezier(.16,1,.3,1) both; }
        .value-row:nth-child(2) { animation-delay: .12s; }
        .value-row:nth-child(3) { animation-delay: .24s; }
        .value-row.reversed { direction: rtl; }
        .value-row.reversed > * { direction: ltr; }
        .value-heading { display: flex; justify-content: space-between; color: #8e8e93; font-family: var(--font-montserrat), sans-serif; font-size: .7rem; letter-spacing: 3px; background: transparent !important; border: 0 !important; box-shadow: none !important; }
        .value-heading span:last-child { color: #48484a; }
        .value-row p { max-width: 480px; margin: 0; color: #8e8e93; font-family: var(--font-montserrat), sans-serif; font-size: 1rem; line-height: 1.8; background: transparent !important; border: 0 !important; border-radius: 0 !important; box-shadow: none !important; transition: color .6s ease, transform .6s ease; }
        .value-row:hover p { color: #f5f5f3; transform: translateX(8px); }
        .value-line { display: none; }
        @keyframes valueReveal { from { opacity: 0; transform: translateY(18px); } to { opacity: 1; transform: translateY(0); } }
        .about-quote { margin-top: 160px; padding: 90px 0; text-align: center; }
        .about-quote p { margin: 0; color: #f5f5f3; font-size: clamp(2rem, 5vw, 4.5rem); line-height: 1.2; }
        .about-quote span { color: #636366; font-family: var(--font-cinzel), serif; font-style: italic; }
        .about-footer { display: flex; justify-content: space-between; align-items: center; margin: 0; padding: 46px 80px 70px; border-top: 1px solid rgba(255,255,255,.04); color: #48484a; font-family: var(--font-montserrat), sans-serif; font-size: .7rem; letter-spacing: 2px; }
        .footer-link { display: inline-flex; align-items: center; color: #f5f5f3; font-family: var(--font-montserrat), sans-serif; font-size: .78rem; font-weight: 600; letter-spacing: 3px; text-decoration: none; padding: 12px 0; border-bottom: 1px solid #8e8e93; transition: color .5s ease; }
        .footer-link:hover { color: #fff; }
        .footer-link span { display: inline-block; transition: transform .3s ease; }
        .footer-link:hover span { transform: translateX(5px); }
        @media (max-width: 1024px) { .about-page .luxury-header { grid-template-columns: 1fr auto; padding: 35px 40px; } .about-page .header-center { gap: 35px; } .about-page .header-right { display: none; } .about-content { padding: 180px 40px 120px; } .value-row { gap: 40px; } }
        @media (max-width: 700px) { .about-page .luxury-header { grid-template-columns: 1fr; gap: 16px; padding: 22px 24px; } .about-page .studio-logo-wrap { justify-content: center; transform: none; } .about-page .header-center { justify-content: space-between; gap: 8px; width: 100%; } .about-page .nav-link { font-size: .57rem; letter-spacing: 1.5px; } .about-page .studio-logo-img { width: 280px !important; max-width: 100%; height: 42px !important; } .about-content { padding: 160px 24px 90px; } .about-hero { min-height: 520px; } .about-hero h1 { font-size: clamp(3.2rem, 15vw, 5rem); } .about-intro { font-size: .8rem; } .value-row, .value-row.reversed { grid-template-columns: 1fr; gap: 24px; min-height: 0; padding: 36px 0; direction: ltr; } .value-row p { font-size: .85rem; } .about-quote { margin-top: 100px; padding: 60px 0; } .about-footer { flex-direction: column; gap: 24px; align-items: flex-start; padding: 44px 24px 58px; } }
      `}</style>
    </div>
  );
}