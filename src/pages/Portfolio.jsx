import { useMemo, useState, useEffect } from 'react';
import './Portfolio.css';
import ProjectCard from '../components/ProjectCard';
import Modal from '../components/Modal';
import projectsData from '../data/projects';

const PAGE_SIZE = 6;

export default function Portfolio() {
  const [page, setPage] = useState(1);
  const [active, setActive] = useState(null); // projet ouvert en modale

  // 1) DÉDOUBLONNAGE + TRI (défensif)
  // - supprime les doublons éventuels par slug (si slug non unique, passe à un id unique)
  // - tri du plus récent au plus ancien
  const projects = useMemo(() => {
    const bySlug = new Map();
    for (const p of projectsData) {
      if (!bySlug.has(p.slug)) bySlug.set(p.slug, p);
    }
    return [...bySlug.values()].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  }, []);

  // (optionnel) Alerte en dev si doublons détectés dans la source
  useEffect(() => {
    if (import.meta.env.DEV) {
      const seen = new Set();
      const dups = [];
      for (const p of projectsData) {
        if (seen.has(p.slug)) dups.push(p.slug); else seen.add(p.slug);
      }
      if (dups.length) {
        // Avertit en console pour te guider
        // eslint-disable-next-line no-console
        console.warn('[Portfolio] Slugs en double détectés:', Array.from(new Set(dups)));
      }
    }
  }, []);

  const total = projects.length;
  const pageCount = Math.max(1, Math.ceil(total / PAGE_SIZE));

  // 2) PAGE COURANTE MÉMORISÉE (évite recalculs et effets de bord)
  const current = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return projects.slice(start, start + PAGE_SIZE);
  }, [projects, page]);

  // Ferme la modale si on change de page (cohérence UI)
  useEffect(() => { setActive(null); }, [page]);

  const openModal = (project) => setActive(project);
  const closeModal = () => setActive(null);
  const goPage = (p) => setPage(Math.min(Math.max(1, p), pageCount));

  // 3) CLASSE DE GRILLE DYNAMIQUE
  const gridMode = current.length === 1 ? 'grid--1' : current.length === 2 ? 'grid--2' : 'grid--3';

  return (
    <section className="portfolio">
      <h1 className="portfolio-title">Mes projets</h1>

      {/* Astuce clé sur le conteneur pour forcer un remount par page si besoin */}
      <div className={`portfolio-grid ${gridMode}`} key={page}>
        {current.map((p) => (
          <ProjectCard key={p.id ?? p.slug} project={p} onOpen={openModal} />
        ))}
      </div>

      {/* Pagination */}
      {pageCount > 1 && (
        <div className="pagination" role="navigation" aria-label="Pagination des projets">
          <button onClick={() => goPage(page - 1)} disabled={page === 1}>Précédent</button>
          <ul className="pages">
            {Array.from({ length: pageCount }, (_, i) => i + 1).map((n) => (
              <li key={n}>
                <button className={n === page ? 'active' : undefined} onClick={() => goPage(n)}>
                  {n}
                </button>
              </li>
            ))}
          </ul>
          <button onClick={() => goPage(page + 1)} disabled={page === pageCount}>Suivant</button>
        </div>
      )}

      {/* Modale de détail */}
      <Modal open={!!active} onClose={closeModal}>
        {active && (
          <div className="project-modal">
            <img src={active.image} alt={active.title} />
            <div className="project-modal-body">
              <h2>{active.title}</h2>
              <p className="muted">{new Date(active.date).toLocaleDateString()}</p>
              <p>{active.description}</p>
            </div>
          </div>
        )}
      </Modal>
    </section>
  );
}
