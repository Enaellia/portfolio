import './Tag.css'

export default function Tag({ label, variant = 'default' }) {
  return (
    <span className={`tag tag--${variant}`}>
      {label}
    </span>
  )
}