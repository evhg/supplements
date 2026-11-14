export default function Footer() {
  return (
    <footer className="foot" data-bg="#141414" data-fg="#F6EFE4">
      <div className="foot-big" aria-hidden>
        Rise. Pump. Glow. Snooze.
      </div>
      <div className="foot-row">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/logo.svg" alt="Paleo Robbie" className="foot-logo" />
        <p>
          The Daily Ritual is a powdered drink mix with electrolytes, made in Thailand. Not a medicine. Not intended to diagnose,
          treat or prevent any disease. Glow Up contains creatine: adults only, max 1 stick a day. If you are pregnant, on
          medication or under medical care, ask your doctor first.
        </p>
        <p className="foot-small">© {new Date().getFullYear()} Paleo Robbie, Bangkok. Thai FDA registration number to follow.</p>
      </div>
    </footer>
  );
}
