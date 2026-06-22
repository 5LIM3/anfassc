export default function TickerBanner() {
  const items = [
    "Super Eagles Travel Package — AFCON 2025",
    "New Membership Cards Now Available",
    "Authentic Jersey Collection In Stock",
    "CAF Recognised · FIFA Endorsed",
    "Nigeria's Official Football Supporters Club",
    "ANFASSC at AFCON Morocco 2025",
  ];

  return (
    <div style={{ background: "#D4AF37", padding: "10px 0", overflow: "hidden", whiteSpace: "nowrap" }}>
      <div style={{ display: "inline-block", animation: "ticker 30s linear infinite" }}>
        {[...items, ...items].map((item, i) => (
          <span key={i} style={{ display: "inline-block", fontFamily: "var(--font-condensed, 'Barlow Condensed', sans-serif)", fontWeight: 700, fontSize: "13px", letterSpacing: "2px", textTransform: "uppercase", color: "#003d24", padding: "0 3rem" }}>
            <span style={{ marginRight: "1.5rem", color: "#008751" }}>✦</span>
            {item}
          </span>
        ))}
      </div>
      <style>{`@keyframes ticker { from { transform: translateX(0); } to { transform: translateX(-50%); } }`}</style>
    </div>
  );
}
