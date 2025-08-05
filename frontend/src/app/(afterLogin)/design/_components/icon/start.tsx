export const StartIcon = () => (
  <svg width="150" height="60" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#6a11cb', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: '#2575fc', stopOpacity: 1 }} />
      </linearGradient>
      <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow
          dx="0"
          dy="2"
          stdDeviation="2"
          floodColor="#000000"
          floodOpacity="0.3"
        />
      </filter>
    </defs>
    <rect
      x="10"
      y="10"
      rx="15"
      ry="15"
      width="130"
      height="40"
      fill="url(#grad1)"
      filter="url(#shadow)"
    />
    <text
      x="75"
      y="35"
      fontFamily="Arial"
      fontSize="18"
      fill="white"
      fontWeight="bold"
      textAnchor="middle"
      alignmentBaseline="middle"
    >
      Start
    </text>
  </svg>
)
