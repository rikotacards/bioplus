import React from 'react';
import {Link } from 'react-router-dom'
const mainNavItems = [
  {
    name: 'admin',
    path: 'admin'
  }, 
  {
    name: 'appearance', 
    path: 'admin/appearance'
  },
  {
    name: 'analytics', 
    path: 'admin/analytics'
  },
  {
    name: 'settings', 
    path: 'admin/settings'
  }
]

export const MainNav: React.FC = () => {
  const navItems = mainNavItems.map((item) => <Link style={{marginRight:4}} to={item.path}>{item.name}</Link>)
  return (
    <div style={{background: 'white'}}>
      {navItems}
    </div>

  )
}