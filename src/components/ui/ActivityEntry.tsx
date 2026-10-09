'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, Clock, Ban, ChevronDown } from 'lucide-react'
import type { ActivityEntry as ActivityEntryType, ActivityStatus } from '@/lib/types'

const STATUS_META: Record<
  ActivityStatus,
  { icon: typeof Check; label: string; tone: string; chip: string }
> = {
  completed: {
    icon: Check,
    label: 'Completed',
    tone: 'text-signal-green',
    chip: 'bg-signal-green/10 text-signal-green',
  },
  pending: {
    icon: Clock,
    label: 'Pending',
    tone: 'text-signal-amber',
    chip: 'bg-signal-amber/10 text-signal-amber',
  },
  revoked: {
    icon: Ban,
    label: 'Revoked',
    tone: 'text-zinc-400',
    chip: 'bg-zinc-100 text-zinc-500',
  },
}

type Props = {
  entry: ActivityEntryType
  isLast?: boolean
}

export function ActivityEntryRow({ entry, isLast }: Props) {
  const [expanded, setExpanded] = useState(false)
  const meta = STATUS_META[entry.status]
  const Icon = meta.icon

  return (
    <div className="relative pl-10">
      {/* Timeline rail */}
      <div
        className={`absolute left-3 top-0 h-full w-px bg-zinc-100 ${
          isLast ? 'bottom-1/2' : ''
        }`}
      />

      {/* Node */}
      <div
        className={`
          absolute left-0 top-1 flex h-6 w-6 items-center justify-center
          rounded-full border bg-surface-card
          ${entry.status === 'revoked' ? 'border-zinc-200' : 'border-zinc-100'}
          ${meta.tone}
        `}
      >
        <Icon size={12} strokeWidth={2.25} />
      </div>

      <motion.div
        layout
        className={`
          mb-3 rounded-card border bg-surface-card transition-colors
          ${entry.status === 'revoked'
            ? 'border-zinc-100 opacity-70'
            : 'border-zinc-200'}
        `}
      >
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          className="flex w-full items-start justify-between gap-4 px-4 py-3.5 text-left"
          aria-expanded={expanded}
        >
          <div className="min-w-0 flex-1">
            <div className="flex items-baseline gap-2">
              <h3 className="text-sm font-medium text-zinc-900 truncate">
                {entry.title}
              </h3>
              <span className="text-xs text-zinc-400">·</span>
              <span className="text-xs text-zinc-500 truncate">
                {entry.service}
              </span>
            </div>
            <p className="mt-0.5 text-xs text-zinc-400">{entry.timestamp}</p>
          </div>

          <div className="flex shrink-0 items-center gap-2">
            <span
              className={`hidden rounded-full px-2 py-0.5 text-[11px] font-medium sm:inline-block ${meta.chip}`}
            >
              {meta.label}
            </span>
            <motion.span
              animate={{ rotate: expanded ? 180 : 0 }}
              transition={{ duration: 0.2 }}
              className="text-zinc-400"
            >
              <ChevronDown size={14} />
            </motion.span>
          </div>
        </button>

        <AnimatePresence initial={false}>
          {expanded && (
            <motion.div
              key="detail"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <div className="border-t border-zinc-100 px-4 py-4 space-y-4">
                {entry.accessed.length > 0 && (
                  <div>
                    <p className="text-[11px] uppercase tracking-wide text-zinc-400">
                      Accessed
                    </p>
                    <ul className="mt-2 space-y-1">
                      {entry.accessed.map((a) => (
                        <li
                          key={a}
                          className="text-sm text-zinc-700 flex items-start gap-2"
                        >
                          <span className="mt-1.5 h-1 w-1 rounded-full bg-zinc-300 shrink-0" />
                          {a}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div>
                  <p className="text-[11px] uppercase tracking-wide text-zinc-400">
                    Stored
                  </p>
                  <p className="mt-1 text-sm text-zinc-700">
                    {entry.stored}
                  </p>
                </div>

                {entry.duration && (
                  <div>
                    <p className="text-[11px] uppercase tracking-wide text-zinc-400">
                      Duration
                    </p>
                    <p className="mt-1 text-sm text-zinc-700">
                      {entry.duration}
                    </p>
                  </div>
                )}

                {entry.note && (
                  <p className="rounded-lg bg-surface-muted px-3 py-2 text-xs leading-relaxed text-zinc-500">
                    {entry.note}
                  </p>
                )}

                <div className="flex flex-wrap gap-2 pt-1">
                  {entry.status !== 'revoked' && (
                    <button
                      type="button"
                      className="rounded-lg border border-zinc-200 bg-white px-3 py-1.5 text-xs font-medium text-zinc-600 transition-colors hover:bg-surface-muted"
                    >
                      Revoke access
                    </button>
                  )}
                  {entry.status === 'pending' && (
                    <button
                      type="button"
                      className="rounded-lg bg-trust-500 px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-trust-700"
                    >
                      Approve now
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}
