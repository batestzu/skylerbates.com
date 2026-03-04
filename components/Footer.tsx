import Link from "next/link";

const socials = [
  { label: "Meta", href: "https://www.facebook.com/skyles.bates" },
  { label: "YouTube", href: "https://www.youtube.com/@BatesTzu" },
  { label: "Bandcamp", href: "https://skylerbates.bandcamp.com/" },
];

export default function Footer() {
  return (
    <footer className="border-t border-[rgba(245,240,235,0.08)] mt-24">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Wordmark */}
          <span className="font-[family-name:var(--font-cormorant)] text-xl font-light tracking-widest text-[#F5F0EB]/40 uppercase">
            Skyler Bates
          </span>

          {/* Social links */}
          <ul className="flex items-center gap-6">
            {socials.map(({ label, href }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs uppercase tracking-[0.15em] font-[family-name:var(--font-inter)] text-[#F5F0EB]/40 hover:text-[#C2185B] transition-colors duration-200"
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>

          {/* Copyright */}
          <p className="text-xs font-[family-name:var(--font-inter)] text-[#F5F0EB]/30 tracking-wider">
            © {new Date().getFullYear()} Skyler Bates
          </p>
        </div>
      </div>
    </footer>
  );
}
