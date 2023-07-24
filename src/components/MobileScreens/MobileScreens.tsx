import React from 'react';
const iphoneScreen = {
  width: '100px', 
  height: '200px',
  borderRadius: '15px', 
}
const screen1 = {
  backgroundColor:'#007bff',
  transform: 'perspective(100px) rotateY(20deg)', ...iphoneScreen
}
const screen2 = {
  backgroundColor:'#28a745',
  transform: 'perspective(100px) rotateY(20deg)', ...iphoneScreen
}
const screen3 = {
  backgroundColor:'#dc3545',
  transform: 'perspective(100px) rotateY(20deg)',...iphoneScreen
}

export const MobileScreens: React.FC = () => {
  return (
    <div className="iphone-screens" style={{padding: '12px', display: 'flex', justifyContent: 'space-between'}}>
    <div className="iphone-screen screen1" style={screen1}></div>
    <div className="iphone-screen screen2" style={screen2}></div>
    <div className="iphone-screen screen3" style={screen3}></div>
  </div>
  )
}