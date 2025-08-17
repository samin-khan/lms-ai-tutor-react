interface HeaderProps {
  title: string
  subtitle?: string
}

export function Header({ title, subtitle }: HeaderProps) {
  return (
    <header className="border-b border-border bg-card">
      <div className="flex h-16 items-center px-6">
        <div>
          <h1 className="font-serif text-2xl font-bold text-card-foreground">{title}</h1>
          {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
        </div>
      </div>
    </header>
  )
}
