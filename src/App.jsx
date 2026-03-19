import { useMemo } from 'react'
import { max, scaleBand, scaleLinear } from 'd3'
import HorizontalBar from './HorizontalBar'
import heartIcon from './assets/heart-x.svg'
import './App.css'

function App() {
  const data = [
    { country: 'United States', students: 68 },
    { country: 'France', students: 21 },
    { country: 'United Kingdom', students: 21 },
    { country: 'Germany', students: 20 },
    { country: 'Switzerland', students: 13 },
    { country: 'Spain', students: 10 },
    { country: 'Netherlands', students: 9 },
    { country: 'India', students: 9 },
    { country: 'Singapore', students: 8 },
    { country: 'Ireland', students: 8 },
    { country: 'Sweden', students: 7 },
    { country: 'Australia', students: 7 },
    { country: 'Canada', students: 6 },
    { country: 'Finland', students: 5 },
    { country: 'Mexico', students: 4 },
    { country: 'Brazil', students: 4 },
    { country: 'Saudi Arabia', students: 3 },
    { country: 'Romania', students: 3 },
    { country: 'Philippines', students: 3 },
    { country: 'New Zealand', students: 3 },
  ]

  const width = 900
  const height = 560
  const margin = { top: 20, right: 26, bottom: 24, left: 180 }

  const countryCount = data.length
  const totalStudents = data.reduce((sum, d) => sum + d.students, 0)

  const colors = ['#2563eb', '#10b981', '#f59e0b', '#ef4444', '#7c3aed', '#0ea5e9', '#f97316', '#14b8a6', '#8b5cf6', '#ec4899']

  const chart = useMemo(() => {
    const xMax = width - margin.left - margin.right
    const yMax = height - margin.top - margin.bottom
    const maxStudents = max(data, d => d.students) || 0

    const xScale = scaleLinear()
      .domain([0, maxStudents])
      .range([0, xMax])
      .nice()
      .clamp(true)

    const yScale = scaleBand()
      .domain(data.map(d => d.country))
      .range([0, yMax])
      .padding(0.2)

    return { xScale, yScale, xMax, yMax }
  }, [data])

  return (
    <div style={{ padding: '1.5rem', fontFamily: 'system-ui, sans-serif' }}>
      
      <h1 style={{ marginBottom: '0.4rem', display: 'flex', alignItems: 'center', gap: '0.35rem', justifyContent: 'center' }}>
        <a href="https://www.react-graph-gallery.com/react-d3-dataviz-course/" target="_blank" rel="noreferrer" style={{ color: 'inherit', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
          D3
          <img src={heartIcon} alt="heart" style={{ width: '1em', height: '1em', verticalAlign: 'middle' }} />
          React
        </a>
      </h1>
      <div style={{ marginTop: '0.3rem', marginBottom: '0.4rem', color: '#333' , fontVariantNumeric: 'tabular-nums', fontWeight: 700 }}>
        
        Students from each country (n&gt;3) who enrolled in the first cohort of this course
      </div>
      <div style={{ marginTop: '0.3rem', marginBottom: '0.4rem', color: '#333', fontVariantNumeric: 'tabular-nums', 
        display: 'flex', gap: '1.5rem', justifyContent: 'space-around', maxWidth: '100%'
      }}>
        <div><span style={{ fontWeight: 700 }}>{countryCount}</span> countries</div>
        <div><span style={{ fontWeight: 700 }}>{totalStudents}</span> students</div>
         
      </div>
      

      <svg width={width} height={height} style={{ maxWidth: '100%', background: '#fcfcfc', border: '1px solid #ddd', borderRadius: 8 }}>
        <g transform={`translate(${margin.left},${margin.top})`}>
          {data.map((d, i) => {
            const y = chart.yScale(d.country)
            if (y === undefined) return null
            return (
              <HorizontalBar
                key={d.country}
                x={0}
                y={y}
                width={Math.min(chart.xScale(d.students), chart.xMax)}
                height={chart.yScale.bandwidth()}
                value={d.students}
                label={d.country}
              />
            )
          })}
        </g>
      </svg>
    </div>
  )
}

export default App
