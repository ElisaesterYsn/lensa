import Link from 'next/link'

export default function AppLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-surface-base">
      <header className="sticky top-0 z-30 border-b border-zinc-100 bg-surface-base/85 backdrop-blur">
        <div className="mx-auto flex max-w-2xl items-center justify-between px-5 py-3.5">
          <Link
            href="/"
            className="text-sm font-medium tracking-tight text-trust-700"
          >
            Lensa
          </Link>
          <nav className="flex items-center gap-5 text-sm">
            <Link
              href="/activity"
              className="text-zinc-600 transition-colors hover:text-zinc-900"
            >
              Activity
            </Link>
            <Link
              href="/vault"
              className="text-zinc-600 transition-colors hover:text-zinc-900"
            >
              Data
            </Link>
          </nav>
        </div>
      </header>
      {children}
    </div>
  )
}
