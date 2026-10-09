'use client'

import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { ACTIVITY } from '@/lib/mock-data'
import { ActivityEntryRow } from '@/components/ui/ActivityEntry'
import type { ActivityStatus } from '@/lib/types'

type Filter = 'all' | ActivityStatus

const FILTERS: { id: Filter; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'pending', label: 'Pending' },
  { id: 'completed', label: 'Completed' },
  { id: 'revoked', label: 'Revoked' },
]

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05, delayChildren: 0.05 },
  },
}

const item = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] as const },
  },
}

export default function ActivityPage() {
  const [filter, setFilter] = useState<Filter>('all')

  const visible = useMemo(
    () =>
      filter === 'all'
        ? ACTIVITY
        : ACTIVITY.filter((e) => e.status === filter),
    [filter]
  )

  return (
    <main className="mx-auto max-w-2xl px-5 py-10">
      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={item}>
          <h1 className="text-2xl font-medium tracking-tight text-zinc-900">
            Activity
          </h1>
          <p className="mt-2 text-sm leading-relaxed text-zinc-500">
            Everything Lensa did on your behalf, in order. Every action
            shows what it accessed, what it stored, and how long it took.
          </p>
        </motion.div>

        {/* Filter chips */}
        <motion.div
          variants={item}
          className="mt-6 flex flex-wrap gap-1.5"
          role="tablist"
          aria-label="Filter activity"
        >
          {FILTERS.map((f) => {
            const active = filter === f.id
            return (
              <button
                key={f.id}
                role="tab"
                aria-selected={active}
                onClick={() => setFilter(f.id)}
                className={`
                  rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors
                  ${active
                    ? 'bg-trust-500 text-white'
                    : 'bg-surface-muted text-zinc-600 hover:bg-zinc-200'}
                `}
              >
                {f.label}
                {f.id !== 'all' && (
                  <span
                    className={`ml-1.5 ${
                      active ? 'text-white/70' : 'text-zinc-400'
                    }`}
                  >
                    {ACTIVITY.filter((e) => e.status === f.id).length}
                  </span>
                )}
              </button>
            )
          })}
        </motion.div>

        {/* Timeline */}
        <motion.div variants={item} className="mt-8">
          {visible.length === 0 ? (
            <EmptyState filter={filter} />
          ) : (
            <div>
              {visible.map((entry, i) => (
                <ActivityEntryRow
                  key={entry.id}
                  entry={entry}
                  isLast={i === visible.length - 1}
                />
              ))}
            </div>
          )}
        </motion.div>

        {/* Footer note */}
        <motion.p
          variants={item}
          className="mt-10 text-xs leading-relaxed text-zinc-400"
        >
          This log is the source of truth. If something isn't here, Lensa
          didn't do it — regardless of what any notification said.
        </motion.p>
      </motion.div>
    </main>
  )
}

function EmptyState({ filter }: { filter: Filter }) {
  const messages: Record<Filter, { title: string; body: string }> = {
    all: {
      title: 'Nothing here yet.',
      body: "When Lensa acts on your behalf, it shows up here — with everything it touched.",
    },
    pending: {
      title: 'No pending actions.',
      body: "You're all caught up. Lensa will ask before it does anything new.",
    },
    completed: {
      title: 'No completed actions yet.',
      body: 'Actions Lensa finishes will appear here with receipts.',
    },
    revoked: {
      title: 'Nothing revoked.',
      body: "You haven't stopped any actions yet. That's a good thing.",
    },
  }
  const m = messages[filter]
  return (
    <div className="rounded-card border border-dashed border-zinc-200 bg-surface-card/50 px-6 py-14 text-center">
      <p className="text-sm font-medium text-zinc-700">{m.title}</p>
      <p className="mx-auto mt-2 max-w-sm text-sm text-zinc-500 leading-relaxed">
        {m.body}
      </p>
    </div>
  )
}
