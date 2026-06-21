const COLORS = {
  black: { body: "#1c1c1c", shade: "#111", line: "#333" },
  white: { body: "#f3f3f0", shade: "#e3e3df", line: "#cfcfca" },
  beige: { body: "#d8c4a3", shade: "#cbb691", line: "#b89f76" },
  olive: { body: "#6b6f4e", shade: "#5d6143", line: "#4d5037" },
  gold: { body: "#d4af37", shade: "#c39f2c", line: "#a98a26" },
};

function Tee({ c }) {
  return (
    <g>
      <path
        d="M70 50 95 35h60l25 15 30 18-14 30-21-10v92a6 6 0 0 1-6 6H81a6 6 0 0 1-6-6V88l-21 10-14-30 30-18Z"
        fill={c.body}
        stroke={c.line}
        strokeWidth="2"
      />
      <path d="M95 35c5 14 55 14 60 0" fill="none" stroke={c.line} strokeWidth="2" />
    </g>
  );
}

function Hoodie({ c }) {
  return (
    <g>
      <path
        d="M70 58 100 40h50l30 18 28 20-15 30-19-10v94a6 6 0 0 1-6 6H82a6 6 0 0 1-6-6V96l-19 10-15-30 28-20Z"
        fill={c.body}
        stroke={c.line}
        strokeWidth="2"
      />
      <path d="M100 40c0 18 50 18 50 0l-4 22c-6 12-36 12-42 0l-4-22Z" fill={c.shade} />
      <path d="M118 92v70M132 92v70" stroke={c.line} strokeWidth="2" />
      <rect x="98" y="150" width="54" height="34" rx="10" fill={c.shade} />
    </g>
  );
}

function Pants({ c }) {
  return (
    <g>
      <path
        d="M88 42h74l6 16v18l-10 132h-26l-7-100-7 100H98L88 76V58l0-16Z"
        fill={c.body}
        stroke={c.line}
        strokeWidth="2"
      />
      <path d="M88 58h80" stroke={c.line} strokeWidth="2" />
      <rect x="100" y="70" width="18" height="22" rx="3" fill="none" stroke={c.line} strokeWidth="2" />
    </g>
  );
}

const shapes = { tee: Tee, hoodie: Hoodie, pants: Pants };

export default function Garment({ type = "tee", color = "black", bg = "transparent", radius = 0 }) {
  const c = COLORS[color] || COLORS.black;
  const Shape = shapes[type] || Tee;
  return (
    <svg viewBox="0 0 250 250" width="100%" height="100%" preserveAspectRatio="xMidYMid meet" style={{ background: bg, borderRadius: radius, display: "block" }}>
      <Shape c={c} />
    </svg>
  );
}

export { COLORS };
