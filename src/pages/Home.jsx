import avatar from '../assets/avatar.jpg'
import './Home.css'

export default function Home() {
  return (
    <section className="home-hero">
      <div className="hero-image">
        <img src={avatar} alt="Photo de profil" />
      </div>
      <div className="hero-text">
        <h1>Bonjour !</h1>
        <p>
          
          <br></br>Je suis <strong>Enaellia</strong>, développeuse web front-end passionnée par la création d’expériences claires, fluides et accessibles.<br></br>
J’aime transformer une idée en interface vivante et intuitive.

Basée dans le sud-ouest de la France, je conçois des sites modernes, performants et sur mesure — avec une attention particulière au détail et à la cohérence visuelle.
        </p>
      </div>
    </section>
  )
}
