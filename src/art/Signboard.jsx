export default function Signboard({ compact = false, className, title = 'Hameediyah, established 1907' }) {
  const h = compact ? 96 : 120
  return (
    <svg className={className} viewBox={`0 0 420 ${h}`} role="img" aria-label={title}>
      <path
        d={compact ? 'M22 6 L398 6 L414 48 L398 90 L22 90 L6 48Z' : 'M22 8 L398 8 L414 60 L398 112 L22 112 L6 60Z'}
        fill="#F6D31C"
        stroke="#2E8B3E"
        strokeWidth="6"
        strokeLinejoin="round"
      />
      {!compact && (
        <text x="210" y="27" textAnchor="middle" fontFamily="Figtree Variable, sans-serif" fontWeight="700" fontSize="11" letterSpacing="2" fill="#1B2A1E">
          EST. 1907
        </text>
      )}
      <g fontFamily="Zilla Slab, Georgia, serif" fontWeight="700" fontSize={compact ? 66 : 62}>
        <text x="214" y={compact ? 74 : 81} textAnchor="middle" textLength="322" lengthAdjust="spacingAndGlyphs" fill="#B8A33A" opacity=".65">
          HAMEEDIYAH
        </text>
        <text x="210" y={compact ? 70 : 77} textAnchor="middle" textLength="322" lengthAdjust="spacingAndGlyphs" fill="#1A1A14">
          HAMEEDIYAH
        </text>
      </g>
      {!compact && (
        <text x="210" y="100" textAnchor="middle" fontFamily="Figtree Variable, sans-serif" fontWeight="600" fontSize="12" fill="#1B5E2C">
          Oldest Nasi Kandar in Malaysia
        </text>
      )}
    </svg>
  )
}
