import type { ArtShape } from "@/lib/products";

type Props = {
  shape: ArtShape;
  from: string;
  to: string;
  /** Must be unique per rendered instance so gradient ids do not collide. */
  id: string;
};

/**
 * Flat vector stand-ins for product photography. Everything is drawn inline so
 * the site has no image assets to host and renders identically offline.
 */
export default function ProductArt({ shape, from, to, id }: Props) {
  const gid = `art-${id}`;
  return (
    <svg
      viewBox="0 0 400 300"
      preserveAspectRatio="xMidYMid slice"
      role="img"
      aria-label={`${shape} illustration`}
      style={{ width: "100%", height: "100%" }}
    >
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={to} stopOpacity="0.30" />
          <stop offset="100%" stopColor={from} stopOpacity="0.16" />
        </linearGradient>
      </defs>
      <rect width="400" height="300" fill={`url(#${gid})`} />
      <circle cx="318" cy="70" r="46" fill={to} opacity="0.22" />
      <g
        transform="translate(200 158)"
        fill="none"
        stroke={from}
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {shapePaths(shape, to)}
      </g>
      <line x1="60" y1="252" x2="340" y2="252" stroke={from} strokeWidth="4" strokeLinecap="round" opacity="0.35" />
    </svg>
  );
}

function shapePaths(shape: ArtShape, fill: string) {
  switch (shape) {
    case "mug":
      return (
        <>
          <path d="M-52 -56 h84 a8 8 0 0 1 8 8 v66 a34 34 0 0 1 -34 34 h-32 a34 34 0 0 1 -34 -34 v-66 a8 8 0 0 1 8 -8 z" fill={fill} fillOpacity="0.35" />
          <path d="M40 -32 h16 a24 24 0 0 1 0 48 h-16" />
          <path d="M-34 -76 c 0 -12 12 -12 12 -24" opacity="0.55" />
          <path d="M-6 -76 c 0 -12 12 -12 12 -24" opacity="0.55" />
        </>
      );
    case "kettle":
      return (
        <>
          <path d="M-46 -30 h72 a14 14 0 0 1 14 14 v42 a30 30 0 0 1 -30 30 h-40 a30 30 0 0 1 -30 -30 v-42 a14 14 0 0 1 14 -14 z" fill={fill} fillOpacity="0.35" />
          <path d="M26 -18 c 38 0 52 -22 52 -52" />
          <path d="M-40 -32 c 0 -22 12 -34 32 -34 h20" />
          <circle cx="-4" cy="-72" r="7" fill={fill} fillOpacity="0.5" />
        </>
      );
    case "grinder":
      return (
        <>
          <path d="M-38 -34 h76 v54 a30 30 0 0 1 -30 30 h-16 a30 30 0 0 1 -30 -30 z" fill={fill} fillOpacity="0.35" />
          <path d="M-30 -34 v-30 h60 v30" />
          <path d="M0 -64 v-22 h34" />
          <circle cx="34" cy="-86" r="9" fill={fill} fillOpacity="0.5" />
          <line x1="-24" y1="6" x2="24" y2="6" opacity="0.5" />
        </>
      );
    case "bag":
      return (
        <>
          <path d="M-44 -44 h88 v76 a18 18 0 0 1 -18 18 h-52 a18 18 0 0 1 -18 -18 z" fill={fill} fillOpacity="0.35" />
          <path d="M-44 -44 l16 -22 h56 l16 22" />
          <line x1="-20" y1="-8" x2="20" y2="-8" opacity="0.6" />
          <line x1="-20" y1="12" x2="6" y2="12" opacity="0.6" />
        </>
      );
    case "press":
      return (
        <>
          <path d="M-36 -40 h72 v72 a18 18 0 0 1 -18 18 h-36 a18 18 0 0 1 -18 -18 z" fill={fill} fillOpacity="0.35" />
          <line x1="-40" y1="-40" x2="40" y2="-40" />
          <path d="M0 -40 v-46" />
          <circle cx="0" cy="-92" r="10" fill={fill} fillOpacity="0.5" />
          <line x1="-28" y1="-4" x2="28" y2="-4" opacity="0.5" />
        </>
      );
    case "dripper":
      return (
        <>
          <path d="M-56 -46 h112 l-34 62 h-44 z" fill={fill} fillOpacity="0.35" />
          <path d="M-30 34 h60 v20 a14 14 0 0 1 -14 14 h-32 a14 14 0 0 1 -14 -14 z" />
          <line x1="-22" y1="-46" x2="-10" y2="16" opacity="0.5" />
          <line x1="22" y1="-46" x2="10" y2="16" opacity="0.5" />
        </>
      );
  }
}
