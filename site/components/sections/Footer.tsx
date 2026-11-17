export default function Footer() {
  return (
    <footer className="foot" id="foot">
      <p className="foot-big" aria-hidden>
        Rise. Pump. Glow. Snooze.
      </p>
      <div className="foot-row">
        <a className="foot-logo" href="https://paleorobbie.com" aria-label="Paleo Robbie">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.svg" alt="Paleo Robbie" />
        </a>
        <p className="foot-legal">
          The Daily Ritual is a powdered drink mix with electrolytes, made in Thailand for Paleo Robbie. It is a food, not a
          medicine. Glow Up contains creatine and is recommended for adults, one stick a day. Snooze Control is recommended for adults. If you are pregnant, breastfeeding, on medication,
          watching your salt or under a doctor&apos;s care, ask your doctor first. Not for children under 4.
        </p>
        <nav className="foot-links" aria-label="Paleo Robbie">
          <a href="https://paleorobbie.com">Shop the Paleo Robbie grocery</a>
          <a href="#packs">Packs</a>
          <a href="#faq">Good questions</a>
        </nav>
        <p className="foot-small">© {new Date().getFullYear()} Paleo Robbie, Bangkok. Thai FDA registration number to follow.</p>
      </div>
    </footer>
  );
}
