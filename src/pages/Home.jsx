import './Home.css'
import '../styles/global.css'

export default function Home() {
  return (
    <section className="home-hero" aria-label="Présentation">
      {/* Décor de fond */}
      <div className="hero-bg" aria-hidden="true" />

      <div className="hero-inner">
        {/* Avatar */}
        <figure className="hero-image reveal" href="/portfolio">
          <img src="/assets/avatar.jpg" alt="Photo de profil d'Enaellia" width="220" height="220" />
        </figure>

        {/* Contenu */}
        <div className="hero-text reveal">
          <h1 className="hero-title">Bonjour&nbsp;!</h1>

          <p className="hero-lead">
            Je suis <span className="accent">Enaellia</span>, développeuse web front-end passionnée par
            la création d’expériences claires, fluides et accessibles. J’aime transformer une idée
            en interface <span className="accent">vivante</span> et <span className="accent">intuitive</span>.
          </p>

          <p className="hero-sub">
            Basée dans le sud-ouest de la France, je conçois des sites modernes, performants et sur mesure —
            avec une attention particulière au détail et à la cohérence visuelle.
          </p>

          <div className="hero-actions">
            <a className="btn btn-primary" href="https://github.com/Enaellia?tab=repositories">→ Mon Github</a>
            <a className="btn btn-ghost"href="/assets/CV.pdf" download="Enaellia-CV.pdf">→ Mon CV</a>
          </div>

          
        </div>
      </div>
    </section>
  )
}