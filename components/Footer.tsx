export default function Footer() {
  return (
    <footer className="border-t border-surface-border py-8 px-4">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="text-lg font-bold text-text-primary">
            Influence<span className="text-brand-red">Map</span>
          </span>
        </div>

        <div className="flex items-center gap-6 text-sm text-text-muted">
          <a href="#" className="hover:text-text-secondary transition-colors">
            Privacy
          </a>
          <a href="#" className="hover:text-text-secondary transition-colors">
            Terms
          </a>
          <a href="#" className="hover:text-text-secondary transition-colors">
            Twitter / X
          </a>
          <a href="#" className="hover:text-text-secondary transition-colors">
            LinkedIn
          </a>
        </div>

        <p className="text-text-muted text-xs">
          &copy; 2026 InfluenceMap. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
