import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import LogoE from './LogoE'
import './Header.css'

export default function Header() {
  // thème
  const [theme, setTheme] = useState(
    localStorage.getItem('theme') ||
    (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
  )

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  const toggleTheme = () => setTheme(t => (t === 'light' ? 'dark' : 'light'))

  return (
    <header className="site-header">
      <div className="container header-row">
        <a href="/" className="brand logo" aria-label="Accueil">
          <span className="logo-e"><LogoE size={28} /></span>
          <span className="logo-text">naellia</span>
        </a>

        <nav className="nav" aria-label="Navigation principale">
          <NavLink to="/" end className={({isActive}) => isActive ? 'active' : undefined}>Accueil</NavLink>
          <NavLink to="/portfolio" className={({isActive}) => isActive ? 'active' : undefined}>Portfolio</NavLink>
          <NavLink to="/contact" className={({isActive}) => isActive ? 'active' : undefined}>Contact</NavLink>
          <NavLink to="/about" className={({isActive}) => isActive ? 'active' : undefined}>À propos</NavLink>
        </nav>

        <button className="theme-toggle" onClick={toggleTheme} aria-label="Basculer le thème">
          {theme === 'light' ? '🌙' : '☀️'}
        </button>
      </div>
    </header>
  )
}
