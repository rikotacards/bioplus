import React from 'react';
import './MockTrendLineStyled.css'
export const MockTrendLineStyled: React.FC = () => {
  return (
    <div className="container" style={{width: '200px', height: '100%', position: 'relative', display: 'flex'}}>
    <div className="bar"></div>
    <div className="bar"></div>
    <div className="bar"></div>
    <div className="bar"></div>
    <div className="bar"></div>
  </div>
  )
}