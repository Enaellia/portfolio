import { useState } from "react";
import "./contact.css";

// Optional: set one of these in your .env
// - VITE_FORMSPREE_ID   (recommended for quick no-backend setup)
// - VITE_CONTACT_ENDPOINT (your own backend endpoint)

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "", company: "" /* honeypot */ });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | submitting | success | error
  const [statusMsg, setStatusMsg] = useState("");
const [submitted, setSubmitted] = useState(false);

  const contactEndpoint = import.meta.env.VITE_CONTACT_ENDPOINT?.trim();
  const formspreeId = import.meta.env.VITE_FORMSPREE_ID?.trim();

function validate(values) {
  const next = {};
  if (!values.name.trim()) next.name = "Le nom est requis.";
  if (!values.email.trim()) next.email = "L'e-mail est requis.";
  if (!values.subject.trim()) next.subject = "Le sujet est requis.";
  if (!values.message.trim()) next.message = "Le message est requis.";
  return next;
}

  function onChange(e) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  }

  async function onSubmit(e) {
    setSubmitted(true);
    e.preventDefault();
    const v = validate(form);
    setErrors(v);
    if (Object.keys(v).length > 0) return;

    // honeypot check: if filled, silently succeed (ignore bots)
    if (form.company?.trim()) {
      setStatus("success");
      setStatusMsg("Merci ! Votre message a bien été envoyé.");
      setForm({ name: "", email: "", subject: "", message: "", company: "" });
      return;
    }

    setStatus("submitting");
    setStatusMsg("");

    try {
      let resp;

      if (formspreeId) {
        // Formspree endpoint (no backend needed): https://formspree.io/f/<ID>
        resp = await fetch(`https://formspree.io/f/${formspreeId}`, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({
            name: form.name,
            email: form.email,
            subject: form.subject,
            message: form.message,
            _subject: form.subject,
          }),
        });
      } else if (contactEndpoint) {
        // Your own API endpoint
        resp = await fetch(contactEndpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
      } else {
        // Fallback: simulate success so the UI works even before wiring the backend
        await new Promise((r) => setTimeout(r, 700));
        setStatus("success");
        setStatusMsg("Merci ! Votre message a bien été envoyé.");
        setForm({ name: "", email: "", subject: "", message: "", company: "" });
        return;
      }

      if (resp.ok) {
        setStatus("success");
        setStatusMsg("Merci ! Votre message a bien été envoyé.");
        setForm({ name: "", email: "", subject: "", message: "", company: "" });
      } else {
        const text = await resp.text();
        throw new Error(text || "Erreur d'envoi");
      }
    } catch (err) {
      console.error(err);
      setStatus("error");
      setStatusMsg("Oups, l'envoi a échoué. Réessayez ou écrivez-moi directement.");
    }
  }

  return (
    <section className="contact" aria-labelledby="contact-title">
      <h1 id="contact-title" className="contact__title">Contact</h1>

      <div className="contact__intro">
        <p>
          Travailler ensemble, c’est donner vie à vos idées. Que vous ayez un projet précis ou une envie à concrétiser,
          je serais ravie d’en discuter avec vous. Passionnée par le développement web et attachée à la communication humaine,
          j’aime concevoir des solutions sur mesure, claires et élégantes.
        </p>
        <p>N’hésitez pas à m’écrire — chaque collaboration commence par une simple conversation.</p>
      </div>

      <form onSubmit={onSubmit} noValidate className="contact__form" aria-describedby="form-status">
        {/* Honeypot (hidden to humans) */}
        <div className="contact__honeypot">
          <label htmlFor="company">Société</label>
          <input id="company" name="company" autoComplete="organization" value={form.company} onChange={onChange} />
        </div>

        {/* Nom */}
        <div className={`form-group ${errors.name ? 'has-error' : ''}`}>
         <label htmlFor="name" className="label">
  Nom complet
  {submitted && errors.name && (
    <span id="error-name" className="error-inline" role="alert" aria-live="polite">
      — {errors.name}
    </span>
  )}
</label>
          <input
            id="name"
            name="name"
            type="text"
            placeholder="Votre nom"
            autoComplete="name"
            value={form.name}
            onChange={onChange}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "error-name" : undefined}
            className="input"
            required
          />
        </div>

        {/* Email */}
        <div className={`form-group ${errors.email ? 'has-error' : ''}`}>
          <label htmlFor="email" className="label">
            Adresse e-mail
              {submitted && errors.email && (
              <span id="error-email" className="error-inline" role="alert" aria-live="polite"> — {errors.email}</span>
            )}
          </label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="vous@exemple.com"
            autoComplete="email"
            value={form.email}
            onChange={onChange}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "error-email" : undefined}
            className="input"
            required
          />
        </div>

        {/* Sujet */}
        <div className={`form-group ${errors.subject ? 'has-error' : ''}`}>
          <label htmlFor="subject" className="label">
            Sujet
            {submitted && errors.subject && (
              <span id="error-subject" className="error-inline" role="alert" aria-live="polite"> — {errors.subject}</span>
            )}
          </label>
          <input
            id="subject"
            name="subject"
            type="text"
            placeholder="Objet de votre message"
            value={form.subject}
            onChange={onChange}
            aria-invalid={Boolean(errors.subject)}
            aria-describedby={errors.subject ? "error-subject" : undefined}
            className="input"
            required
          />
        </div>

        {/* Message */}
        <div className={`form-group ${errors.message ? 'has-error' : ''}`}>
          <label htmlFor="message" className="label">
            Message
            {submitted && errors.message && (
              <span id="error-message" className="error-inline" role="alert" aria-live="polite"> — {errors.message}</span>
            )}
          </label>
          <textarea
            id="message"
            name="message"
            rows={6}
            placeholder="Votre message..."
            value={form.message}
            onChange={onChange}
            aria-invalid={Boolean(errors.message)}
            aria-describedby={errors.message ? "error-message" : undefined}
            className="textarea"
            required
          />
        </div>

        <div className="form-actions">
          <button
            type="submit"
            disabled={status === "submitting"}
            className="btn"
          >
            {status === "submitting" ? "Envoi…" : "Envoyer"}
          </button>

          <span id="form-status" role="status" aria-live="polite" className="status-msg">
            {statusMsg}
          </span>
        </div>

      
      </form>
    </section>
  );
}
