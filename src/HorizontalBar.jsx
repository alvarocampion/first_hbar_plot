export default function HorizontalBar({ 
    x = 0, 
    y = 0, 
    width = 0, 
    height = 18, 
    value, 
    label
}) 
{
    const barColor = 'dodgerblue';
    
  return (
    <g transform={`translate(${x}, ${y})`}>
      <rect x={0} y={0} width={width} height={height} fill={barColor} rx={4} ry={4} />
      <text x={width + 7} y={height / 2} dy="0.35em" fontSize="12" fill="#111">
        {value}
      </text>
      <text x={-10} y={height / 2} textAnchor="end" dominantBaseline="middle" fontSize="12" fill="#333">
        {label}
      </text>
    </g>
  )
}
