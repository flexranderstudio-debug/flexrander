"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import * as countryCodes from "country-codes-list";

const FORMSPREE_ENDPOINT = "https://formspree.io/f/mnpnlqba";

const navLinks = [
  { href: "/", label: "HOME" },
  { href: "/work", label: "WORK" },
  { href: "/about", label: "ABOUT STUDIO" },
  { href: "/contact", label: "INQUIRE", isActive: true },
];

const contactDetails = [
  {
    icon: "email",
    label: "EMAIL :",
    value: "flexranderstudio@gmail.com",
    href: "mailto:flexranderstudio@gmail.com?subject=Studio%20Inquiry",
  },
  {
    icon: "support",
    label: "WHATSAPP :",
    value: "+20 103 164 0423",
    href: "https://wa.me/201031640423?text=Hello%20Flexrender%20Studio",
    target: "_blank",
  },
  { label: "LOCATION", value: "EGYPT / CAIRO" },
];

function ContactIcon({ type }) {
  return (
    <svg className="contact-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      {type === "email" ? (
        <>
          <rect x="3" y="5" width="18" height="14" rx="1.5" />
          <path d="m4 7 8 6 8-6" />
        </>
      ) : (
        <>
          <path d="M4 13v-1a8 8 0 0 1 16 0v1" />
          <path d="M4 13a2 2 0 0 1 2-2h1v6H6a2 2 0 0 1-2-2v-2Z" />
          <path d="M20 13a2 2 0 0 0-2-2h-1v6h1a2 2 0 0 0 2-2v-2Z" />
          <path d="M17 18c-.7 1-1.8 1.5-3 1.5h-1" />
        </>
      )}
    </svg>
  );
}

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

const countryMatchesSearch = (country, searchTerm) => {
  const query = searchTerm.trim().toLowerCase();
  if (!query) return true;

  const compactQuery = query.replace(/\s/g, "");
  const digitsQuery = query.replace(/\D/g, "");
  return country.name.toLowerCase().includes(query)
    || country.code.toLowerCase().replace(/\s/g, "").includes(compactQuery)
    || (digitsQuery.length > 0 && country.code.replace(/\D/g, "").startsWith(digitsQuery));
};

export default function ContactPage() {
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [whatsappNumber, setWhatsappNumber] = useState("");
  const [whatsappCode, setWhatsappCode] = useState("+20");
  const [selectedCountry, setSelectedCountry] = useState(countriesData.find((country) => country.countryCode === "EG"));
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchCountry, setSearchCountry] = useState("");
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [pendingFormData, setPendingFormData] = useState(null);
  const formRef = useRef(null);
  const dropdownRef = useRef(null);
  const filteredCountries = countriesData.filter((country) => countryMatchesSearch(country, searchCountry));

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) setIsDropdownOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    if (FORMSPREE_ENDPOINT.includes("YOUR_FORM_ID")) {
      setError("Add your Formspree endpoint in FORMSPREE_ENDPOINT before sending.");
      return;
    }

    setPendingFormData(new FormData(event.currentTarget));
    setIsConfirmOpen(true);
  };

  const handleConfirmedSubmit = async () => {
    if (!pendingFormData) return;
    setIsConfirmOpen(false);
    setStatus("sending");

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        body: pendingFormData,
        headers: { Accept: "application/json" },
      });

      if (!response.ok) throw new Error("Form submission failed");
      formRef.current?.reset();
      setName("");
      setWhatsappNumber("");
      setPendingFormData(null);
      setStatus("success");
    } catch {
      setStatus("error");
      setError("Something went wrong. Please try again or email us directly.");
    }
  };

  return (
    <div className="contact-page">
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

      <main className="contact-content">
        <section className="contact-intro">
          <p className="contact-meta">A QUIET PLACE TO BEGIN</p>
          <h1>Tell us what <br /><span>you are thinking.</span></h1>
          <p className="contact-lead">
            A thought, a question, or a project taking shape. Share whatever feels useful.
            We will read it carefully and get back to you with a considered reply.
          </p>
        </section>

        <section className="contact-grid">
          <div className="contact-details">
            <div className="details-list">
              {contactDetails.map(({ icon, label, value, href, target }) => (
                <div className="detail-row" key={label}>
                  {href ? (
                    <a href={href} className="contact-link" target={target} rel={target === "_blank" ? "noopener noreferrer" : undefined}>
                      <ContactIcon type={icon} />
                      <span className="contact-label">{label}</span>
                      <span className="contact-value">{value}</span>
                    </a>
                  ) : (
                    <>
                      <span className="detail-label">{label}</span>
                      <span>{value}</span>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="inquiry-form-wrap">
            {status === "success" ? (
              <div className="success-message">
                <span className="success-mark">01</span>
                <h2>Thank you for sharing.</h2>
                <p>Your note is on its way. We will be in touch soon.</p>
                <button type="button" onClick={() => setStatus("idle")}>SEND ANOTHER NOTE <span>→</span></button>
              </div>
            ) : (
              <form ref={formRef} className="inquiry-form" onSubmit={handleSubmit}>
                <div className="form-field">
                  <label htmlFor="name">YOUR NAME</label>
                  <input id="name" name="name" type="text" placeholder="Your name" pattern="[\\p{L}\\s]+" title="Name can only contain letters and spaces." value={name} onChange={(event) => setName(event.target.value.replace(/[^\p{L}\s]/gu, ""))} required />
                </div>
                <div className="form-field">
                  <label htmlFor="email">EMAIL ADDRESS</label>
                  <input id="email" name="email" type="email" placeholder="you@example.com" required />
                </div>
                <div className="form-field">
                  <label htmlFor="whatsapp">WHATSAPP NUMBER</label>
                  <div className="contact-phone-field">
                    <div className="contact-country-dropdown" ref={dropdownRef}>
                      <button type="button" className="contact-country-trigger" aria-label={`Choose country calling code, currently ${whatsappCode}`} aria-haspopup="listbox" aria-expanded={isDropdownOpen} onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                        <span>{selectedCountry?.flag || "🌐"}</span>
                        <span className="contact-country-code">{whatsappCode}</span>
                        <span className="contact-country-arrow">{isDropdownOpen ? "▾" : "▴"}</span>
                      </button>
                      {isDropdownOpen && (
                        <div className="contact-country-menu">
                          <input type="search" aria-label="Search country or calling code" placeholder="Country or calling code, e.g. +20" value={searchCountry} onChange={(event) => setSearchCountry(event.target.value)} />
                          <div className="contact-country-options">
                            {filteredCountries.length ? filteredCountries.map((country) => (
                                <button key={`${country.countryCode}-${country.code}`} type="button" onClick={() => { setWhatsappCode(country.code); setSelectedCountry(country); setIsDropdownOpen(false); setSearchCountry(""); }}>
                                  <span>{country.flag}</span><span>{country.name}</span><span>{country.code}</span>
                                </button>
                              )) : <p className="contact-country-empty" role="status">No countries found.</p>}
                          </div>
                        </div>
                      )}
                    </div>
                    <input type="hidden" name="whatsappCountryCode" value={whatsappCode} />
                    <input id="whatsapp" name="whatsapp" type="tel" inputMode="numeric" minLength={7} maxLength={15} placeholder="500000000" pattern="[0-9]{7,15}" title="WhatsApp number must contain 7 to 15 digits." className="phone-number-input" value={whatsappNumber} onChange={(event) => setWhatsappNumber(event.target.value.replace(/\D/g, "").slice(0, 15))} required />
                  </div>
                </div>
                <div className="form-field">
                  <label htmlFor="message">A LITTLE ABOUT THE REQUEST</label>
                  <textarea id="message" name="message" rows="5" placeholder="Tell us what is on your mind..." required />
                </div>
                {error && <p className="form-error" role="alert">{error}</p>}
                <button className="submit-button" type="submit" disabled={status === "sending"}>
                  {status === "sending" ? "SENDING..." : "SEND YOUR NOTE"} <span>→</span>
                </button>
              </form>
            )}
          </div>
        </section>
      </main>

      <footer className="minimal-footer contact-footer">
        <p>&copy; {new Date().getFullYear()} FLEXR RNDER STUDIO. ALL RIGHTS RESERVED.</p>
        <Link href="/" className="footer-link">BACK HOME <span>↑</span></Link>
      </footer>

      {isConfirmOpen && (
        <div className="contact-confirm-overlay" role="dialog" aria-modal="true" aria-labelledby="contact-confirm-title">
          <div className="contact-confirm-dialog">
            <span className="confirm-index">03 / CONFIRM</span>
            <h2 id="contact-confirm-title">Ready to send your note?</h2>
            <p>Take one last look. Your details will be sent securely to the studio.</p>
            <div className="confirm-actions">
              <button type="button" onClick={() => { setIsConfirmOpen(false); setPendingFormData(null); }}>CANCEL</button>
              <button type="button" onClick={handleConfirmedSubmit}>CONFIRM &amp; SEND <span>→</span></button>
            </div>
          </div>
        </div>
      )}

      <style jsx global>{`
        .contact-page { min-height: 100vh; background: #050505; color: #f5f5f3; font-family: var(--font-playfair), serif; -webkit-font-smoothing: antialiased; }
        .contact-page .luxury-header { position: fixed; top: 0; left: 0; width: 100%; z-index: 1000; display: grid; grid-template-columns: 1fr auto 1fr; align-items: center; padding: 45px 80px; background: transparent; }
        .contact-page .studio-logo-wrap { display: flex; align-items: center; transform: translate(-50px, 0); }
        .contact-page .studio-logo-img { display: block; width: 400px !important; max-width: none; height: 60px !important; object-fit: contain; opacity: .95; transition: filter .9s ease, transform .9s ease, opacity .9s ease; }
        .contact-page .studio-logo-wrap:hover .studio-logo-img { filter: drop-shadow(0 0 15px rgba(255,255,255,.08)); transform: scale(1.025); opacity: 1; }
        .contact-page .header-center { display: flex; gap: 60px; }
        .contact-page .nav-link { color: #8e8e93; font-family: var(--font-montserrat), sans-serif; font-size: .75rem; font-weight: 500; letter-spacing: 4px; text-transform: uppercase; text-decoration: none; transition: color .5s ease; }
        .contact-page .nav-link:hover, .contact-page .nav-link.active { color: #f5f5f3; }
        .contact-page .header-right { color: #48484a; font-family: var(--font-montserrat), sans-serif; font-size: .7rem; letter-spacing: 2px; text-align: right; }
        .contact-content { max-width: 1400px; margin: 0 auto; padding: 220px 80px 140px; }
        .contact-intro { max-width: 1050px; min-height: 470px; display: flex; flex-direction: column; justify-content: center; }
        .contact-meta, .section-index { color: #8e8e93; font-family: var(--font-montserrat), sans-serif; font-size: .7rem; letter-spacing: 4px; text-transform: uppercase; }
        .contact-intro h1 { margin: 28px 0 0; color: #f5f5f3; font-size: clamp(4rem, 8.5vw, 8.5rem); font-weight: 400; line-height: .95; letter-spacing: -2px; }
        .contact-intro h1 span { color: #fff; font-family: var(--font-cinzel), serif; font-style: italic; font-weight: 700; }
        .contact-lead { max-width: 560px; margin-top: 38px; color: #8e8e93; font-family: var(--font-montserrat), sans-serif; font-size: .95rem; line-height: 1.8; letter-spacing: 1px; }
        .contact-grid { display: grid; grid-template-columns: .8fr 1.2fr; gap: 150px; margin-top: 80px; }
        .section-index { margin: 0 0 44px; color: #48484a; }
        .details-list { display: flex; flex-direction: column; gap: 38px; }
        .detail-row { display: flex; flex-direction: column; gap: 10px; }
        .detail-label, .form-field label { color: #8e8e93; font-family: var(--font-montserrat), sans-serif; font-size: .65rem; letter-spacing: 3px; }
        .detail-row a, .detail-row > span:last-child { color: #f5f5f3; font-family: var(--font-montserrat), sans-serif; font-size: .9rem; text-decoration: none; transition: color .4s ease; }
        .contact-link { display: grid; grid-template-columns: 20px max-content 1fr; gap: 12px; align-items: center; }
        .contact-icon { width: 18px; height: 18px; fill: none; stroke: currentColor; stroke-linecap: round; stroke-linejoin: round; stroke-width: 1.5; }
        .contact-label { color: #8e8e93; font-size: .65rem; letter-spacing: 3px; }
        .contact-value { min-width: 0; overflow-wrap: anywhere; }
        .detail-row a:hover { color: #8e8e93; }
        .inquiry-form { display: grid; gap: 32px; max-width: 700px; }
        .form-field { display: grid; gap: 12px; }
        .contact-phone-field { display: grid; grid-template-columns: max-content minmax(0, 1fr); gap: 10px; align-items: end; }
        .contact-country-dropdown { position: relative; min-width: 82px; }
        .contact-country-trigger { display: inline-flex; align-items: center; gap: 8px; width: max-content; min-width: 82px; height: 48px; padding: 0 10px; border: 0; border-bottom: 1px solid rgba(255,255,255,.16); background: transparent; color: #f5f5f3; font-family: inherit; font-size: .85rem; cursor: pointer; }
        .contact-country-code, .phone-number-input { font-family: var(--font-montserrat), sans-serif; font-variant-numeric: tabular-nums; font-feature-settings: "tnum" 1; }
        .phone-number-input { letter-spacing: .14em; }
        .contact-country-arrow { color: #8e8e93; font-size: .65rem; }
        .contact-country-menu { position: absolute; z-index: 20; bottom: calc(100% + 8px); left: 0; width: min(320px, 80vw); max-height: 300px; display: flex; flex-direction: column; background: #111112; border: 1px solid #48484a; box-shadow: 0 -15px 30px rgba(0,0,0,.5); }
        .contact-country-menu > input { width: calc(100% - 20px); margin: 10px; padding: 9px 10px; border: 1px solid rgba(255,255,255,.12); background: #050505; color: #f5f5f3; outline: 0; font-family: inherit; }
        .contact-country-options { overflow-y: auto; display: flex; flex-direction: column; }
        .contact-country-options button { display: grid; grid-template-columns: 24px 1fr auto; gap: 8px; align-items: center; padding: 10px 14px; border: 0; background: transparent; color: #8e8e93; text-align: left; font-family: inherit; cursor: pointer; }
        .contact-country-options button:hover { background: rgba(255,255,255,.05); color: #f5f5f3; }
        .contact-country-options button span:nth-child(2) { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
        .contact-country-options button span:last-child { color: #8e8e93; font-size: .75rem; }
        .contact-country-empty { margin: 0; padding: 14px; color: #8e8e93; font-family: var(--font-montserrat), sans-serif; font-size: .8rem; }
        .form-field input, .form-field textarea { width: 100%; padding: 12px 0 16px; border: 0; border-bottom: 1px solid rgba(255,255,255,.16); outline: 0; resize: vertical; background: transparent; color: #f5f5f3; font-family: inherit; font-size: .9rem; transition: border-color .5s ease; }
        .form-field textarea { min-height: 130px; line-height: 1.7; }
        .form-field input:focus, .form-field textarea:focus { border-color: #f5f5f3; }
        .form-field input::placeholder, .form-field textarea::placeholder { color: #48484a; }
        .submit-button, .success-message button { width: fit-content; padding: 12px 0; border: 0; background: transparent; color: #f5f5f3; font-family: var(--font-montserrat), sans-serif; font-size: .7rem; font-weight: 600; letter-spacing: 3px; cursor: pointer; transition: color .4s ease, transform .4s ease; }
        .submit-button:hover, .success-message button:hover { color: #8e8e93; transform: translateX(7px); }
        .submit-button span, .success-message button span, .footer-link span { display: inline-block; margin-left: 8px; transition: transform .3s ease; }
        .submit-button:disabled { color: #48484a; cursor: wait; }
        .form-error { color: #b8a1a1; font-family: var(--font-montserrat), sans-serif; font-size: .75rem; line-height: 1.6; }
        .success-message { min-height: 370px; animation: contactReveal .8s cubic-bezier(.16,1,.3,1) both; }
        .success-mark { display: block; margin-bottom: 34px; color: #48484a; font-family: var(--font-montserrat), sans-serif; font-size: .7rem; letter-spacing: 3px; }
        .success-message h2 { max-width: 450px; margin: 0; color: #f5f5f3; font-size: clamp(2.5rem, 5vw, 4.5rem); font-weight: 400; line-height: 1; }
        .success-message p { margin: 26px 0 30px; color: #8e8e93; font-family: var(--font-montserrat), sans-serif; font-size: .9rem; }
        .contact-footer { display: flex; justify-content: space-between; align-items: center; margin: 0; padding: 46px 80px 70px; border-top: 1px solid rgba(255,255,255,.04); color: #48484a; font-family: var(--font-montserrat), sans-serif; font-size: .7rem; letter-spacing: 2px; }
        .contact-footer .footer-link { display: inline-flex; align-items: center; color: #f5f5f3; font-family: var(--font-montserrat), sans-serif; font-size: .78rem; font-weight: 600; letter-spacing: 3px; text-decoration: none; padding: 12px 0; border-bottom: 1px solid #8e8e93; }
        .contact-footer .footer-link:hover { color: #fff; }
        .contact-confirm-overlay { position: fixed; inset: 0; z-index: 2000; display: grid; place-items: center; padding: 24px; background: rgba(0,0,0,.78); backdrop-filter: blur(14px); animation: contactReveal .35s ease both; }
        .contact-confirm-dialog { width: min(520px, 100%); padding: 42px; background: #0b0b0c; border: 1px solid #48484a; box-shadow: 0 30px 70px rgba(0,0,0,.6); }
        .confirm-index { color: #8e8e93; font-family: var(--font-montserrat), sans-serif; font-size: .68rem; letter-spacing: 3px; }
        .contact-confirm-dialog h2 { margin: 28px 0 16px; color: #f5f5f3; font-size: clamp(2rem, 5vw, 3.5rem); font-weight: 400; line-height: 1; }
        .contact-confirm-dialog p { margin: 0; color: #8e8e93; font-family: var(--font-montserrat), sans-serif; font-size: .85rem; line-height: 1.7; }
        .confirm-actions { display: flex; gap: 28px; margin-top: 36px; }
        .confirm-actions button { padding: 12px 0; border: 0; border-bottom: 1px solid #8e8e93; background: transparent; color: #f5f5f3; font-family: var(--font-montserrat), sans-serif; font-size: .7rem; font-weight: 600; letter-spacing: 2px; cursor: pointer; }
        .confirm-actions button:first-child { color: #8e8e93; border-color: #48484a; }
        @keyframes contactReveal { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: translateY(0); } }
        @media (max-width: 1024px) { .contact-page .luxury-header { grid-template-columns: 1fr auto; padding: 35px 40px; } .contact-page .header-center { gap: 35px; } .contact-page .header-right { display: none; } .contact-content { padding: 180px 40px 120px; } .contact-grid { gap: 70px; } }
        @media (max-width: 700px) { .contact-page .luxury-header { grid-template-columns: 1fr; gap: 16px; padding: 22px 24px; } .contact-page .studio-logo-wrap { justify-content: center; transform: none; } .contact-page .header-center { justify-content: space-between; gap: 8px; width: 100%; } .contact-page .nav-link { font-size: .57rem; letter-spacing: 1.5px; } .contact-page .studio-logo-img { width: 280px !important; max-width: 100%; height: 42px !important; } .contact-content { padding: 160px 24px 90px; } .contact-intro { min-height: 520px; } .contact-intro h1 { font-size: clamp(3.2rem, 15vw, 5rem); } .contact-lead { font-size: .8rem; } .contact-grid { grid-template-columns: 1fr; gap: 90px; margin-top: 60px; } .inquiry-form { gap: 28px; } .contact-phone-field { grid-template-columns: max-content minmax(0, 1fr); gap: 8px; } .contact-confirm-dialog { padding: 30px 24px; } .contact-footer { flex-direction: column; gap: 24px; align-items: flex-start; padding: 44px 24px 58px; } }
      `}</style>
    </div>
  );
}