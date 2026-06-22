interface PageHeroProps {
  label: string;
  title: string;
  subtitle?: string;
}

export default function PageHero({ label, title, subtitle }: PageHeroProps) {
  return (
    <div className="bg-green-900 pt-32 pb-16 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-6 h-0.5 bg-gold" />
          <span className="font-condensed font-bold text-gold text-xs uppercase tracking-[4px]">{label}</span>
        </div>
        <h1 className="font-display text-4xl md:text-5xl font-bold text-white leading-tight">{title}</h1>
        {subtitle && <p className="text-green-300 mt-4 text-lg font-light">{subtitle}</p>}
      </div>
    </div>
  );
}
