import React from "react";

// Gauge semicircular – sem footer e sem setpoints por padrão
export default function Gauge({
  value = 0,
  min = 0,
  max = 10,
  label = "",
  setpoints = [],
  showSetpoints = false, // agora vem desligado
  showFooter = false,    // escondemos "Pressão (bar)" e o valor da base
}) {
  const clamp = (v) => Math.min(Math.max(v, min), max);
  const norm = (v) => (clamp(v) - min) / (max - min);
  const angle = (v) => -90 + 180 * norm(v);

  const W = 420, H = 260;
  const cx = 210, cy = 190, r = 150;

  const polar = (deg, rad = r) => {
    const a = (Math.PI / 180) * deg;
    return [cx + rad * Math.cos(a), cy + rad * Math.sin(a)];
  };

  const arcPath = (a0, a1, rad = r) => {
    const [x0, y0] = polar(a0, rad);
    const [x1, y1] = polar(a1, rad);
    const large = a1 - a0 > 180 ? 1 : 0;
    return `M ${x0} ${y0} A ${rad} ${rad} 0 ${large} 1 ${x1} ${y1}`;
  };

  // ponteiro fino
  const a = angle(value);
  const ax = Math.cos((Math.PI / 180) * a);
  const ay = Math.sin((Math.PI / 180) * a);
  const px = -ay, py = ax;
  const tip = { x: cx + ax * (r - 8), y: cy + ay * (r - 8) };
  const baseC = { x: cx - ax * 58, y: cy - ay * 58 };
  const left = { x: baseC.x + px * 8, y: baseC.y + py * 8 };
  const right = { x: baseC.x - px * 8, y: baseC.y - py * 8 };
  const needle = `${tip.x},${tip.y} ${left.x},${left.y} ${right.x},${right.y}`;

  const ticks = [];
  for (let v = min; v <= max + 1e-6; v += 0.5) {
    const ta = angle(v);
    const [x0, y0] = polar(ta, r - 2);
    const long = Math.abs(v % 2) < 1e-6;
    const [x1, y1] = polar(ta, r - (long ? 22 : 12));
    ticks.push(
      <line key={`t${v.toFixed(1)}`} x1={x0} y1={y0} x2={x1} y2={y1}
            stroke="var(--ir-tick)" strokeWidth={long ? 2 : 1.2} />
    );
  }

  return (
    <div className="ir-gauge">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        preserveAspectRatio="xMidYMid meet"
        style={{ overflow: "visible" }}
        role="img"
        aria-label={`${label} ${value}`}
      >
        <defs>
          <linearGradient id="ir-arc" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="var(--ir-orange)" />
            <stop offset="50%" stopColor="var(--ir-green)" />
            <stop offset="100%" stopColor="var(--ir-yellow)" />
          </linearGradient>
          <filter id="ir-soft" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow dx="0" dy="1" stdDeviation="1.2" floodOpacity="0.35"/>
          </filter>
        </defs>

        <path d={arcPath(-90, 90, r + 14)} stroke="var(--ir-rail)" strokeWidth={26} fill="none"/>
        <path d={arcPath(-90, 90)} stroke="url(#ir-arc)" strokeWidth={16} fill="none" filter="url(#ir-soft)"/>
        {ticks}

        {/* Setpoints agora só aparecem se showSetpoints=true */}
        {showSetpoints && setpoints.filter(Number.isFinite).map((sp, i) => {
          const sa = angle(sp);
          const [bx, by] = polar(sa, r - 30);
          const tri = polar(sa, r - 20);
          return (
            <g key={`sp-${i}`} filter="url(#ir-soft)">
              <rect x={bx - 17} y={by - 13} rx={4} ry={4} width={34} height={18}
                    fill="var(--ir-bubble)" stroke="var(--ir-bubble-stroke)" />
              <text x={bx} y={by + 3} textAnchor="middle" fontSize="11" fill="var(--ir-bubble-text)">{sp.toFixed(1)}</text>
              <polygon points={`${bx - 6},${by + 6} ${bx + 6},${by + 6} ${tri[0]},${tri[1]}`}
                       fill="var(--ir-bubble)" stroke="var(--ir-bubble-stroke)" />
            </g>
          );
        })}

        <polygon points={needle} fill="var(--ir-arrow)" filter="url(#ir-soft)"/>
        <circle cx={cx} cy={cy} r="7" fill="var(--ir-arrow)"/>
      </svg>

      {/* Footer oculto por padrão (sem "Pressão (bar)" nem valor à direita) */}
      {showFooter && (
        <div className="ir-gauge-footer">
          <div className="ir-gauge-label">{label}</div>
          <div className="ir-gauge-value">
            <span>{Number.isFinite(value) ? value.toFixed(1) : "--"}</span>
          </div>
        </div>
      )}
    </div>
  );
}