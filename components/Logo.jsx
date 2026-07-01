import Link from 'next/link';

export default function Logo() {
  return (
    <Link className="logo logo-v65" href="/" aria-label="حراج إنڤست">
      <img
        className="logo-image-v65"
        src="/haraj-invest-logo-design-v66.jpg"
        alt="حراج إنڤست"
        loading="eager"
      />
    </Link>
  );
}
