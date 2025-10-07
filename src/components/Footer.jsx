import './Footer.css'

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container" style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
        <small>© {new Date().getFullYear()} • Enaellia</small>
        <div className="footer-links">
          <a href="https://github.com/Enaellia" target="_blank" rel="noreferrer">GitHub</a>
          <a href="https://www.linkedin.com/in/agn%C3%A8s-hourcade-697995260/" target="_blank" rel="noreferrer">LinkedIn</a>
          <a href="/CV.pdf" target="_blank" rel="noreferrer">CV</a>
        </div>
      </div>
    </footer>
  )
}
