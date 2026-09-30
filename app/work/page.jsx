"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import * as countryCodes from "country-codes-list";

const studioSettings = {
  logo: {
    src: "/montserrat11removebgpreview.png",
    width: 400,                 
    height: 60,                 
    alt: "FLEXRANDER STUDIO LOGO",
    moveTop: 0,                
    moveLeft: -50,             
  },
  hero: {
    bgImage: "/Untitled1.png",
    meta: "CREATIVE DIRECTION • DIGITAL ARCHITECTURE",
    titleLine1: "FLEXR",
    titleLine2: "RNDER",
    jobTitle: "Crafting Silent Digital Dominance",
    btnText: "VIEW SELECTED WORKS",
    btnLink: "#works-section",
    established: "EST. 2026"
  }
};

const projectsData = [
  { "id": "p1", "title": "Younes Motors, Advanced Automotive Lab", "type": "Experience Design", "desc": "A high-end automotive brand website built around an experimental engineering-lab identity. It features a full-screen cinematic video hero, a technical HUD-style interface (live coordinates, chassis status and emission readouts), and a minimalist dark aesthetic that presents each prototype as a precision-engineered module. Vehicle showcases highlight key performance specs (horsepower, 0-100 km/h, top speed, weight) with bold typography and large imagery. The site is structured across four sections: Home, Showroom, Laboratory, and Manifesto. It is fully responsive and deployed on a fast, modern hosting stack.", "price": "$4,800", "liveUrl": "https://younes-motors.vercel.app/" },
  { "id": "p2", "title": "VARELLE, Paris / Dubai Luxury Fashion House", "type": "Digital Architecture", desc: `A multi-page digital flagship for a Paris and Dubai luxury fashion house. The experience opens with a cinematic full-screen video hero announcing the Fall Winter 2026 Couture Drop, framed by the tagline "Architectural Timeless Confidence." A curated "Iconic Statements" section showcases signature pieces with pricing and a refined view-piece flow. The site spans six pages: Collections, New Drops, a Digital Lookbook, The Atelier, Our Manifesto, and a Concierge-style Contact page. Minimal typography, generous white space, and editorial imagery keep the focus on craftsmanship and the brand's couture identity. Fully responsive and built for a high-end fashion audience across European and Gulf markets.`, "price": "$12,000", "liveUrl": "https://varelle.vercel.app/" },
  { "id": "p3", "title": "AETHER, Swiss Watchmaking Manufacture", "type": "Portfolio System", desc: `A single-page digital showcase for a Geneva-based haute horlogerie manufacture, built around the idea that a watch is "the one machine still worth winding by hand." The page opens with an interactive watch-anatomy hero (Bezel, Crown, Lug, Dial) and a confident editorial statement, followed by a craftsmanship section highlighting the 217-component in-house Calibre A1 and the fourteen watchmakers who finish each piece from raw plate to sealed case. Three collections in steel, bronze, and platinum are presented with material stories and starting prices in CHF, each leading to an enquiry modal instead of a checkout, which suits a low-volume, appointment-driven brand. A heritage timeline from 1962 to 2023, a head watchmaker's quote, and full atelier contact details complete the story. Restrained typography and a precise, minimal layout mirror the discipline of the product. Fully responsive.`, "price": "$9,500", "liveUrl": "https://aether-dusky-five.vercel.app/" },
  { "id": "p4", "title": "Argent, Quiet Luxury Perfume House", "type": "Immersive Web Design", desc: `A single-page digital storefront for a quiet-luxury perfume house, built around restraint and the idea of "perfume, distilled to silence." The page opens with a minimal hero and a philosophy statement that positions the brand against loud, campaign-driven fragrance marketing. Three hand-blended compositions are presented with their notes, prices, and a slide-in shopping bag that supports an add-to-bag and order-request flow. Craft storytelling covers the 60-hour maceration process, limited lots of forty bottles, and hand-blown platinum-luster glass. A subtle email signup announces new compositions. Refined typography, generous spacing, and a muted palette give the site the calm, tactile feel of the product itself. Fully responsive, with accessibility considerations such as skip-to-content navigation.`, "price": "$8,000", "liveUrl": "https://argent-two.vercel.app/" },
  { "id": "p5", "title": "NOMAVÉL, Luxury Menswear & Womenswear Atelier", "type": "E-Commerce System", desc: `A multi-page digital flagship for a luxury fashion atelier built around the promise "Be Unique." The experience opens with a cinematic full-screen video hero and a Men / Women entry split, leading into a curated "From The Atelier" selection of signature pieces in Giza cotton, silk, and linen. Product detail pages support colour variants with image switching, and dedicated sections cover New Collections, Bespoke Tailoring, the brand story, and an editorial Journal. A concierge-style "Talk to the Atelier" section connects clients by hotline or WhatsApp, while white-glove shipping, bespoke refund, and privacy policies are presented in refined slide-in panels that reinforce trust at the premium level. Restrained typography, generous spacing, and rich editorial imagery keep the focus on craftsmanship. Fully responsive.`, "price": "$13,000", "liveUrl": "https://nomavel.vercel.app/" },
  { "id": "p6", "title": "Forme, Sculptural Jewelry Exhibition", "type": "Web Application", desc: `A single-page digital exhibition for a sculptural fine-jewelry brand, designed as a private gallery rather than a conventional online store. The narrative is built on scarcity: three 18k rose gold pieces, each cast once from a single gesture and never repeated. The page moves from a striking hero and a manifesto statement into the exhibits, where each piece is presented with its own story, finish details, and price. A slide-in shopping bag supports a refined add-to-bag and checkout-request flow, followed by a Provenance section on craftsmanship and authenticity and a minimal "be told when a new form is cast" email signup. Warm, tactile typography and a restrained palette let the gold be the subject. Fully responsive, with accessibility considerations such as skip-to-content navigation.`, "price": "$8,500", "liveUrl": "https://forme-web-sandy.vercel.app/" },
  { "id": "p7", "title": "Younes Automobili, Italian Hypercar Atelier", "type": "Corporate Interface", desc: `A bespoke, single-page digital experience for a Modena-based hypercar atelier producing just twelve cars a year. Crafted with an editorial, understated luxury aesthetic, it pairs a commanding hero statement with a measured-performance data section and a three-model collection (a naturally aspirated V12 flagship, a grand tourer, and a numbered track-only edition). Each model leads to a private-viewing request flow designed around exclusivity and appointment-only sales. Cinematic showroom video, a founder's timeline from 2022 to 2026, and refined micro-interactions complete a brand story built for collectors who value craft over volume. Fully responsive, fast-loading, and delivered with a complete UI/UX design direction.`, "price": "$7,500", "liveUrl": "https://younes-auto-mobill-2.vercel.app/" },
  { "id": "p8", "title": "LUMÉR, Luxury Arabic Perfume House", "type": "SaaS Platform", desc: `A multi-page Arabic (RTL) website for a luxury perfume house, built around the idea that "every fragrance tells a story, not just a scent." The site opens with an editorial hero and a brand-story section, followed by a Best Sellers showcase featuring signature fragrances such as Noir Vanilla and White Musk. A "Why LUMÉR" section highlights natural ingredients, luxury packaging, longevity, and worldwide shipping, while a testimonials block and an FAQ on shipping, ingredient safety, and gifting build trust. Dedicated Collections, Products, and Contact pages complete the journey, with a WhatsApp shortcut for direct client contact and a newsletter signup. Warm, elegant typography and a refined layout designed natively for right-to-left reading suit the Gulf and Arab luxury market. Fully responsive.`, "price": "$7,500", "liveUrl": "https://lumer-teal.vercel.app/" },
];

const countriesData = countryCodes
  .all()
  .filter((country) => country.countryCallingCode)
  .map((country) => ({
    countryCode: country.countryCode,
    code: `+${country.countryCallingCode}`,
    name: country.countryNameEn,
    flag: country.flag,
  }))
  .sort((firstCountry, secondCountry) => firstCountry.name.localeCompare(secondCountry.name, "en"));

const defaultCountry = countriesData.find((country) => country.countryCode === "EG");
const FORMSPREE_ENDPOINT = "https://formspree.io/f/myezlypj";

export default function WorkPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPrice, setSelectedPrice] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState("");
  
  const [email, setEmail] = useState("");
  const [clientName, setClientName] = useState("");
  const [countryCode, setCountryCode] = useState(defaultCountry?.code || "+20");
  const [selectedCountry, setSelectedCountry] = useState(defaultCountry);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchCountry, setSearchCountry] = useState("");
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (FORMSPREE_ENDPOINT.includes("YOUR_FORM_ID")) {
      alert("Add your Formspree endpoint before sending the inquiry.");
      return;
    }

    setIsConfirmOpen(true);
  };

  const handleConfirmedSubmit = async () => {
    setIsConfirmOpen(false);
    setIsSubmitting(true);

    const formData = {
      Template: selectedTemplate,
      Price: selectedPrice,
      Name: clientName,
      Email: email,
      WhatsAppNumber: `${countryCode} ${phoneNumber}`
    };

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitSuccess(true);
        setClientName("");
        setEmail("");
        setPhoneNumber("");
      } else {
        alert("حدث خطأ أثناء إرسال الطلب، يرجى المحاولة مرة أخرى.");
      }
    } catch (error) {
      alert("عذراً، فشل الاتصال بالخادم. تحقق من إنترنت الخاص بك.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <header className="luxury-header">
        <div className="header-left">
          <Link href="/" className="studio-logo-wrap" style={{
            transform: `translate(${studioSettings.logo.moveLeft}px, ${studioSettings.logo.moveTop}px)`
          }}>
            <Image 
              src={studioSettings.logo.src} 
              alt={studioSettings.logo.alt}
              width={studioSettings.logo.width}
              height={studioSettings.logo.height}
              priority
              className="studio-logo-img"
            />
          </Link>
        </div>

        <nav className="header-center">
          <Link href="/" className="nav-link">HOME</Link>
          <Link href="/work" className="nav-link active">WORK</Link>
          <Link href="/about" className="nav-link">ABOUT STUDIO</Link>
          <Link href="/contact" className="nav-link">INQUIRE</Link>
        </nav>

        <div className="header-right">
                  <span className="header-status-badge">{studioSettings.hero.established}</span>

        </div>
      </header>

      <section className="cinematic-hero" style={{ backgroundImage: `linear-gradient(to bottom, rgba(5,5,5,0.4), #050505), url(${studioSettings.hero.bgImage})` }}>
        <div className="hero-inner-content">
          <p className="hero-eyebrow-meta">{studioSettings.hero.meta}</p>
          <h1 className="massive-title-brand">
            <span className="line-one">{studioSettings.hero.titleLine1}</span>
            <span className="line-two">{studioSettings.hero.titleLine2}</span>
          </h1>
          <p className="hero-job-statement">{studioSettings.hero.jobTitle}</p>
          <a href={studioSettings.hero.btnLink} className="hero-scroll-trigger">
            {studioSettings.hero.btnText} <span className="arrow-down-anim">↓</span>
          </a>
        </div>
      </section>

      <section id="works-section" className="fullwidth-portfolio-zone">
        <div className="section-title-wrap">
          <p className="eyebrow-label">ARCHIVE / PRESTIGE TEMPLATES</p>
          <h2 className="section-sub-heading">Live Architectural Deployments.</h2>
        </div>

        <div className="fullwidth-projects-list">
          {projectsData.map((project, index) => (
            <article className="panoramic-project-card" key={project.id}>
              
              <div className="card-interactive-viewport">
                <iframe
                  src={project.liveUrl}
                  title={`Live Site Preview - ${project.title}`}
                  loading="lazy"
                  className="panoramic-embedded-iframe"
                />
                <span className="panoramic-number">0{index + 1}</span>
              </div>

              <div className="card-metadata-footer">
                
                <div className="meta-right-side-block">
                  <h3 className="meta-project-title">{project.title}</h3>
                  <p className="meta-project-type">{project.type}</p>
                  <div className="price-tag-wrapper">
                    <span className="meta-price-display">{project.price} <span className="currency-label">USD</span></span>
                  </div>
                </div>
                
                <div className="meta-left-side-block">
                  <p className="meta-project-desc">{project.desc}</p>
                  
                  <div className="action-buttons-wrapper">
                    <a 
                      href={project.liveUrl} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="panoramic-live-btn"
                    >
                      LIVE SITE ↗
                    </a>
                    
                    <button 
                      className="panoramic-shop-now-btn"
                      onClick={() => {
                        setSelectedPrice(project.price);
                        setSelectedTemplate(project.title);
                        setIsModalOpen(true);
                        setSubmitSuccess(false);
                      }}
                      type="button"
                    >
                      SHOP NOW
                    </button>
                  </div>
                </div>

              </div>
            </article>
          ))}
        </div>

      </section>

      {isModalOpen && (
        <div className="form-modal-overlay">
          <div className="form-modal-container">
            <button className="modal-close-corner" onClick={() => setIsModalOpen(false)} type="button">✕</button>
            <div className="modal-header-zone">
              <h3>Secure Template Inquiry</h3>
              <p className="sub-title">Selected Blueprint: <span className="highlight-text">{selectedTemplate}</span></p>
            </div>

            {submitSuccess ? (
              <div className="success-state-view">
                <div className="success-icon">✓</div>
                <h4>شكرًا لك! تم استلام طلبك بنجاح.</h4>
                <p>لقد وصل طلب القالب إلينا، وسنتواصل معك عبر الواتساب أو البريد الإلكتروني في أقرب وقت ممكن لبدء العمل.</p>
                <button className="back-btn" onClick={() => setIsModalOpen(false)} type="button">عودة للمشاريع</button>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="interactive-checkout-form">
                <div className="form-group">
                  <label htmlFor="project-price">Template Price (USD)</label>
                  <input type="text" id="project-price" name="Price" value={selectedPrice} readOnly className="readonly-input" />
                </div>

                <div className="form-group">
                  <label htmlFor="client-name">Your Name</label>
                  <input
                    type="text"
                    id="client-name"
                    name="Name"
                    required
                    placeholder="Your name"
                    pattern="[\\p{L}\\s]+"
                    title="Name can only contain letters and spaces."
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value.replace(/[^\p{L}\s]/gu, ""))}
                    className="standard-input"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="client-email">Your Email Address</label>
                  <input 
                    type="email" id="client-email" name="Email" required placeholder="name@example.com"
                    value={email} onChange={(e) => setEmail(e.target.value)} className="standard-input" 
                  />
                </div>
                <div className="form-group font-layout-fix">
                  <label htmlFor="whatsapp-number">WhatsApp Number</label>
                  <div className="phone-input-wrapper">
                    
                    <div className="country-dropdown-container" ref={dropdownRef}>
                      <button
                        type="button"
                        className="dropdown-trigger-btn"
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                      >
                        <span>{selectedCountry?.flag || "🌐"}</span>
                        <input
                          type="text"
                          className="country-code-editable-input"
                          value={countryCode}
                          onChange={(e) => {
                            const nextCode = e.target.value;
                            setCountryCode(nextCode);
                            const matchingCountry = countriesData.find((country) => country.code === nextCode);
                            if (matchingCountry) setSelectedCountry(matchingCountry);
                          }}
                          onClick={(e) => e.stopPropagation()} 
                          placeholder="+00"
                        />
                        <span className="arrow-icon">{isDropdownOpen ? "▾" : "▴"}</span>
                      </button>

                      {isDropdownOpen && (
                        <div className="countries-list-overlay dynamic-dropup-menu">
                          <div className="search-filter-box">
                            <input
                              type="text"
                              placeholder="Search country..."
                              value={searchCountry}
                              onChange={(e) => setSearchCountry(e.target.value)}
                              className="dropdown-search-input"
                            />
                          </div>
                          <div className="list-options-scroll">
                            {countriesData
                              .filter(c => c.name.toLowerCase().includes(searchCountry.toLowerCase()) || c.code.includes(searchCountry))
                              .map((country) => (
                                <button
                                  key={country.countryCode}
                                  type="button"
                                  className="country-option-row"
                                  onClick={() => {
                                    setCountryCode(country.code);
                                    setSelectedCountry(country);
                                    setIsDropdownOpen(false);
                                    setSearchCountry("");
                                  }}
                                >
                                  <span className="flag-span">{country.flag}</span>
                                  <span className="name-span">{country.name}</span>
                                  <span className="code-span">{country.code}</span>
                                </button>
                              ))}
                          </div>
                        </div>
                      )}
                    </div>

                    <input
                      type="tel"
                      id="whatsapp-number"
                      name="WhatsApp"
                      required
                      inputMode="numeric"
                      minLength={7}
                      maxLength={15}
                      pattern="[0-9]{7,15}"
                      placeholder="50 123 4567"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, "").slice(0, 15))}
                      className="main-phone-input"
                    />
                  </div>
                </div>

                <input type="hidden" name="Selected Template" value={selectedTemplate} />

                <button 
                  type="submit" 
                  className="submit-checkout-btn"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "PROCESSING INQUIRY..." : "CONFIRM & SEND BLUEPRINT REQUEST"}
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {isConfirmOpen && (
        <div className="checkout-confirm-overlay" role="dialog" aria-modal="true" aria-labelledby="checkout-confirm-title">
          <div className="checkout-confirm-dialog">
            <span>03 / CONFIRM REQUEST</span>
            <h2 id="checkout-confirm-title">Send this inquiry?</h2>
            <p>Confirm your details and the selected template before sending them to the studio.</p>
            <div className="checkout-confirm-actions">
              <button type="button" onClick={() => setIsConfirmOpen(false)}>CANCEL</button>
              <button type="button" onClick={handleConfirmedSubmit}>CONFIRM &amp; SEND <span>→</span></button>
            </div>
          </div>
        </div>
      )}

      <footer className="minimal-footer">
        <p>&copy; 2026 FLEXR ANDER STUDIO. ALL RIGHTS RESERVED.</p>
        <Link href="/contact" className="footer-link">LET'S BUILD</Link>
      </footer>

      <style jsx global>{`
  :root {
          --bg-dark: #050505;
          --ivory-white: #f5f5f3;
          --pure-white: #ffffff;
          --silver-main: #a3a3a3;
          --silver-muted: #8e8e93;
          --gray-medium: #525252;
          --gray-dark: #48484a;
        }

        * { box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        body {
          margin: 0;
          background: var(--bg-dark);
          color: var(--ivory-white);
          font-family: var(--font-playfair), var(--font-cinzel), serif;
          overflow-x: hidden;
        }
        a { text-decoration: none; }
        button, input, select, textarea { font-family: inherit; }

        .nav-link, .header-status-badge, .hero-eyebrow-meta, .hero-scroll-trigger,
        .eyebrow-label, .meta-project-type, .panoramic-live-btn,
        .panoramic-shop-now-btn, .cta-btn-link, .minimal-footer, .footer-link,
        .form-group label, .submit-checkout-btn {
          font-family: var(--font-montserrat), sans-serif;
        }
        .massive-title-brand .line-two, .section-sub-heading,
        .meta-project-title, .modal-header-zone h3 {
          font-family: var(--font-cinzel), serif;
        }
        
        .luxury-header {
          position: fixed;
          top: 0; left: 0; width: 100%;
          z-index: 1000;
          display: grid;
          grid-template-columns: 1fr auto 1fr;
          align-items: center;
          padding: 45px 80px;
          background: transparent;
        }
        .header-left { display: flex; align-items: center; }
        .studio-logo-wrap { display: flex; align-items: center; transition: all 0.3s; }
        .studio-logo-img { display: block; object-fit: contain; width: 400px !important; max-width: none; height: 60px !important; opacity: .95; transition: filter .9s ease, transform .9s ease, opacity .9s ease; }
        .studio-logo-wrap:hover .studio-logo-img { filter: drop-shadow(0 0 15px rgba(255,255,255,.08)); transform: scale(1.025); opacity: 1; }
        .header-center { display: flex; gap: 60px; }
        .nav-link {
          color: var(--silver-muted);
          letter-spacing: 4px;
          font-size: 0.75rem;
          font-weight: 500;
          text-transform: uppercase;
          transition: color 0.3s ease;
        }
        .nav-link:hover, .nav-link.active { color: var(--pure-white); }
        .header-right { text-align: right; color: var(--gray-medium); font-size: 0.7rem; letter-spacing: 2px; }
        .cinematic-hero {
          min-height: min(860px, 100vh);
          height: 100vh;
          width: 100%;
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          display: flex;
          align-items: center;
          padding: 140px 80px 100px;
          position: relative;
        }
        .hero-inner-content { width: min(100%, 1400px); max-width: 1100px; display: grid; gap: 24px; margin: 0 auto; }
        .hero-eyebrow-meta { color: var(--silver-main); letter-spacing: 5px; font-size: 0.8rem; text-transform: uppercase; margin: 0; }
        .massive-title-brand { margin: 0; font-size: clamp(4rem, 10vw, 9rem); line-height: .88; font-weight: 700; letter-spacing: -4px; color: var(--pure-white); max-width: 1000px; }
        .massive-title-brand span { display: block; }
        .hero-job-statement { font-size: clamp(1.2rem, 2.5vw, 2.2rem); color: var(--silver-muted); font-weight: 300; margin: 0; letter-spacing: -0.5px; }
        .hero-scroll-trigger { color: var(--ivory-white); letter-spacing: 3px; font-size: 0.75rem; font-weight: 600; text-transform: uppercase; border-bottom: 1px solid var(--gray-medium); width: fit-content; padding-bottom: 6px; margin-top: 12px; transition: border-color 0.3s; }
        .hero-scroll-trigger:hover { border-color: var(--pure-white); }
        .arrow-down-anim { display: inline-block; animation: bounce 2s infinite; }

        .fullwidth-portfolio-zone { width: 100%; padding: 120px 0; margin: 0 auto; }
        .section-title-wrap { margin-bottom: 60px; padding: 0 80px; }
        .eyebrow-label { color: var(--silver-muted); letter-spacing: 4px; font-size: 0.75rem; text-transform: uppercase; margin: 0 0 12px 0; }
        .section-sub-heading { font-size: clamp(2rem, 4vw, 3.5rem); margin: 0; font-weight: 400; color: var(--pure-white); letter-spacing: -1px; }
        
        .fullwidth-projects-list { display: flex; flex-direction: column; gap: 90px; margin-top: 40px; }
        .panoramic-project-card { display: flex; flex-direction: column; width: 100%; border-bottom: 1px solid rgba(255,255,255,0.05); padding-bottom: 50px; }
        
        .card-interactive-viewport { width: 100%; height: min(68vh, 720px); min-height: 380px; background: #000; border: 1px solid rgba(255,255,255,0.06); position: relative; overflow: hidden; }
        .panoramic-embedded-iframe { display: block; width: 100%; height: 100%; border: none; background: #fff; }
        .panoramic-number { position: absolute; bottom: 20px; right: 30px; font-size: 5rem; font-weight: 200; color: rgba(255,255,255,0.03); z-index: 5; pointer-events: none; }
        .card-metadata-footer { display: grid; grid-template-columns: 1fr 1.2fr; gap: 60px; align-items: flex-start; padding: 32px 80px 0; }
        
        .meta-right-side-block { display: flex; flex-direction: column; gap: 8px; text-align: left; }
        .meta-project-title { font-size: 1.6rem; font-weight: 500; color: var(--pure-white); margin: 0; letter-spacing: -0.5px; }
        .meta-project-type { color: var(--silver-main); letter-spacing: 2px; text-transform: uppercase; font-size: 0.68rem; margin: 0; }
        .price-tag-wrapper { margin-top: 12px; }
        .meta-price-display { font-size: 1.6rem; color: var(--pure-white); font-weight: 600; background: rgba(255,255,255,0.03); padding: 6px 14px; border: 1px solid rgba(255,255,255,0.05); border-radius: 2px; }
        .currency-label { font-size: 0.75rem; color: var(--silver-muted); font-weight: 400; margin-left: 4px; }
        
        .meta-left-side-block { display: flex; flex-direction: column; gap: 24px; }
        .meta-project-desc { color: var(--silver-muted); line-height: 1.7; font-size: 0.95rem; margin: 0; }
        .action-buttons-wrapper { display: flex; gap: 16px; width: 100%; }
        
        .panoramic-live-btn { flex: 1; text-align: center; display: inline-block; background: none; border: 0; color: var(--ivory-white); padding: 14px 0; font-size: 0.72rem; letter-spacing: 2px; font-weight: 500; text-transform: uppercase; cursor: pointer; transition: color 0.3s; }
        .panoramic-live-btn:hover { color: var(--pure-white); text-decoration: underline; text-underline-offset: 6px; }
        
        .panoramic-shop-now-btn { flex: 1; background: var(--ivory-white); color: var(--bg-dark); border: 0; padding: 14px 0; font-size: 0.72rem; letter-spacing: 2px; font-weight: 600; text-transform: uppercase; cursor: pointer; transition: all 0.3s; }
        .panoramic-shop-now-btn:hover { background: var(--pure-white); box-shadow: 0 10px 25px rgba(255,255,255,0.15); }
        .form-modal-overlay { 
          position: fixed; 
          top: 0; left: 0; width: 100%; height: 100%; 
          background: rgba(0, 0, 0, 0.8); 
          backdrop-filter: blur(15px); 
          z-index: 2500; 
          display: flex; 
          justify-content: center; 
          align-items: center; 
          padding: 24px; 
          animation: fadeIn 0.35s ease; 
        }
        .checkout-confirm-overlay { position: fixed; inset: 0; z-index: 4000; display: grid; place-items: center; padding: 24px; background: rgba(0,0,0,.78); backdrop-filter: blur(14px); animation: fadeIn .3s ease; }
        .checkout-confirm-dialog { width: min(520px, 100%); padding: 42px; background: #0b0b0c; border: 1px solid var(--gray-dark); box-shadow: 0 30px 70px rgba(0,0,0,.6); }
        .checkout-confirm-dialog > span { color: var(--silver-muted); font-family: var(--font-montserrat), sans-serif; font-size: .68rem; letter-spacing: 3px; }
        .checkout-confirm-dialog h2 { margin: 28px 0 16px; color: var(--pure-white); font-family: var(--font-cinzel), serif; font-size: clamp(2rem, 5vw, 3.5rem); font-weight: 400; line-height: 1; }
        .checkout-confirm-dialog p { margin: 0; color: var(--silver-muted); font-family: var(--font-montserrat), sans-serif; font-size: .85rem; line-height: 1.7; }
        .checkout-confirm-actions { display: flex; gap: 28px; margin-top: 36px; }
        .checkout-confirm-actions button { padding: 12px 0; border: 0; border-bottom: 1px solid var(--silver-muted); background: transparent; color: var(--ivory-white); font-family: var(--font-montserrat), sans-serif; font-size: .7rem; font-weight: 600; letter-spacing: 2px; cursor: pointer; }
        .checkout-confirm-actions button:first-child { color: var(--silver-muted); border-color: var(--gray-dark); }
        .form-modal-container { 
          background: #0b0b0c; 
          border: 1px solid var(--gray-dark); 
          width: 100%; 
          max-width: 540px; 
          padding: 40px; 
          position: relative; 
          box-shadow: 0 30px 60px rgba(0,0,0,0.6); 
        }
        .modal-close-corner { 
          position: absolute; 
          top: 24px; right: 24px; 
          background: none; border: none; 
          color: var(--silver-muted); 
          font-size: 1.1rem; 
          cursor: pointer; 
        }
        .modal-header-zone { margin-bottom: 32px; }
        .modal-header-zone h3 { margin: 0 0 8px; font-size: 1.6rem; font-weight: 400; color: var(--pure-white); letter-spacing: -0.5px; }
        .modal-header-zone .sub-title { margin: 0; color: var(--silver-muted); font-size: 0.88rem; }
        .highlight-text { color: var(--ivory-white); font-weight: 500; }

        .interactive-checkout-form { display: grid; gap: 24px; }
        .form-group { display: flex; flex-direction: column; gap: 8px; position: relative; }
        .form-group label { color: var(--silver-main); font-size: 0.72rem; letter-spacing: 1.5px; text-transform: uppercase; }
        .standard-input, .readonly-input { background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.08); padding: 14px 16px; color: var(--pure-white); font-size: 0.95rem; outline: none; }
        .standard-input:focus { border-color: var(--silver-main); background: rgba(255,255,255,0.04); }
        .readonly-input { color: var(--silver-main); background: rgba(255,255,255,0.01); cursor: not-allowed; font-weight: bold; }

        .phone-input-wrapper { display: flex; gap: 10px; position: relative; }
        .country-dropdown-container { position: relative; display: flex; }
        .dropdown-trigger-btn { width: max-content; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); padding: 0 14px; display: flex; align-items: center; gap: 8px; cursor: pointer; color: var(--pure-white); }
        .country-code-editable-input { background: none; border: none; color: var(--pure-white); font-size: 0.95rem; width: 5ch; min-width: 0; outline: none; }
        .arrow-icon { color: var(--silver-muted); font-size: 0.65rem; }

        .dynamic-dropup-menu { 
          position: absolute; 
          bottom: calc(100% + 6px); 
          top: auto !important; 
          left: 0; width: 320px; 
          max-height: 280px; 
          background: #111112; 
          border: 1px solid var(--gray-dark); 
          z-index: 3000; 
          display: flex; 
          flex-direction: column; 
          box-shadow: 0 -15px 30px rgba(0,0,0,0.5); 
        }
        .search-filter-box { padding: 10px; border-bottom: 1px solid rgba(255,255,255,0.05); }
        .dropdown-search-input { width: 100%; background: rgba(0,0,0,0.2); border: 1px solid rgba(255,255,255,0.08); padding: 8px 12px; color: var(--pure-white); font-size: 0.85rem; outline: none; }
        .list-options-scroll { flex: 1; overflow-y: auto; display: flex; flex-direction: column; }
        .list-options-scroll::-webkit-scrollbar { width: 4px; }
        .list-options-scroll::-webkit-scrollbar-thumb { background: var(--gray-medium); }
        .country-option-row { width: 100%; padding: 10px 16px; background: none; border: none; display: flex; align-items: center; cursor: pointer; color: var(--silver-main); font-size: 0.88rem; }
        .country-option-row:hover { background: rgba(255,255,255,0.04); color: var(--pure-white); }
        .flag-span { margin-right: 12px; font-size: 1.1rem; }
        .name-span { flex: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; padding-right: 10px; }
        .code-span { color: var(--silver-muted); font-size: 0.8rem; font-family: monospace; }
        .main-phone-input { flex: 1; background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.08); padding: 14px 16px; color: var(--pure-white); font-size: 0.95rem; outline: none; }

        .submit-checkout-btn { background: var(--ivory-white); color: var(--bg-dark); border: none; padding: 16px 0; font-size: 0.75rem; letter-spacing: 2px; font-weight: 600; text-transform: uppercase; cursor: pointer; margin-top: 10px; transition: background 0.3s; }
        .submit-checkout-btn:hover { background: var(--pure-white); }
        .submit-checkout-btn:disabled { background: var(--gray-medium); color: var(--silver-muted); cursor: not-allowed; }

        .success-state-view { text-align: center; padding: 20px 0; direction: rtl; }
        .success-icon { width: 64px; height: 64px; background: rgba(255,255,255,0.05); border: 1px solid var(--silver-main); color: var(--pure-white); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 1.8rem; margin: 0 auto 24px; }
        .success-state-view h4 { font-size: 1.4rem; color: var(--pure-white); margin: 0 0 12px; font-weight: 400; }
        .success-state-view p { color: var(--silver-main); font-size: 0.9rem; line-height: 1.6; margin: 0 0 32px; }
        .back-btn { background: none; border: 1px solid var(--gray-medium); color: var(--ivory-white); padding: 12px 32px; font-size: 0.72rem; letter-spacing: 1px; cursor: pointer; }
        .back-btn:hover { border-color: var(--ivory-white); background: rgba(255,255,255,0.03); }

        .font-layout-fix { direction: ltr; text-align: left; }

        .cta-panel-panoramic { display: flex; justify-content: space-between; align-items: center; margin: 120px 80px 0; border-top: 1px solid var(--gray-dark); border-bottom: 1px solid var(--gray-dark); padding: 50px 0; }
        .cta-panel-panoramic p { margin: 0; font-size: clamp(1.2rem, 2vw, 2.5rem); color: var(--ivory-white); font-weight: 300; }
        .cta-btn-link { color: var(--ivory-white); border: 1px solid var(--gray-medium); padding: 14px 24px; letter-spacing: 2px; text-transform: uppercase; font-size: 0.72rem; transition: all 0.3s; }
        .cta-btn-link:hover { background: var(--ivory-white); color: var(--bg-dark); }
        
        .minimal-footer { display: flex; justify-content: space-between; align-items: center; padding: 46px 80px 70px; color: var(--gray-medium); letter-spacing: 2px; font-size: 0.7rem; border-top: 1px solid rgba(255,255,255,0.04); }
        .footer-link { display: inline-flex; align-items: center; padding: 12px 0; color: var(--ivory-white); border-bottom: 1px solid var(--silver-muted); letter-spacing: 3px; text-transform: uppercase; font-weight: 600; }

        @keyframes bounce { 0%, 20%, 50%, 80%, 100% { transform: translateY(0); } 40% { transform: translateY(-6px); } 60% { transform: translateY(-3px); } }
        @keyframes fadeIn { from { opacity: 0; transform: scale(0.98); } to { opacity: 1; transform: scale(1); } }

        @media (max-width: 1024px) {
          .luxury-header { padding: 35px 40px; }
          .header-center { gap: 35px; }
          .card-metadata-footer { grid-template-columns: 1fr; gap: 30px; padding: 32px 40px 0; }
          .card-interactive-viewport { height: 380px; }
          .cinematic-hero { min-height: 760px; padding: 150px 40px 80px; }
          .section-title-wrap { padding: 0 40px; }
        }
        @media (max-width: 768px) {
          .luxury-header { grid-template-columns: 1fr; gap: 16px; padding: 22px 24px; }
          .header-left { justify-content: center; }
          .studio-logo-wrap { justify-content: center; transform: none !important; }
          .header-center { justify-content: space-between; gap: 8px; width: 100%; }
          .nav-link { font-size: 0.57rem; letter-spacing: 1.5px; }
          .studio-logo-img { width: 280px !important; max-width: 100%; height: 42px !important; }
          .cinematic-hero { min-height: 680px; height: 88vh; padding: 130px 24px 70px; align-items: center; }
          .hero-inner-content { gap: 18px; }
          .hero-eyebrow-meta { font-size: .65rem; letter-spacing: 2px; line-height: 1.6; }
          .massive-title-brand { font-size: clamp(3.6rem, 17vw, 7rem); letter-spacing: -2px; }
          .hero-job-statement { font-size: 1rem; line-height: 1.5; }
          .fullwidth-portfolio-zone { padding: 80px 0; }
          .section-title-wrap { padding: 0 24px; }
          .card-interactive-viewport { height: 300px; min-height: 260px; }
          .card-metadata-footer { padding: 24px; }
          .cta-panel-panoramic { flex-direction: column; align-items: flex-start; gap: 24px; margin: 80px 24px 0; }
          .minimal-footer { flex-direction: column; align-items: flex-start; gap: 24px; padding: 44px 24px 58px; text-align: left; }
          .dynamic-dropup-menu { width: min(320px, 80vw); }
          .checkout-confirm-dialog { padding: 30px 24px; }
        }
      `}</style>
    </>
  );
}
