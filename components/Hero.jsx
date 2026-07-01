import Link from 'next/link';

export default function Hero({ eyebrow, title, desc, primary, secondary }) {
  return (
    <section className="hero">
      <div className="wrap">
        <div className="hero-card">
          <span className="eyebrow">{eyebrow}</span>
          <h1>{title}</h1>
          <p className="lead">{desc}</p>
          {(primary || secondary) && (
            <div className="hero-actions">
              {primary && <Link className="btn btn-primary" href={primary.href}>{primary.label}</Link>}
              {secondary && <Link className="btn btn-secondary" href={secondary.href}>{secondary.label}</Link>}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
