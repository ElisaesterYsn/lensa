'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Trash2, AlertTriangle } from 'lucide-react'
import type { StoredDataItem as StoredDataItemType } from '@/lib/types'

type Props = {
  item: StoredDataItemType
  onRemove: (id: string) => void
}

export function StoredDataItem({ item, onRemove }: Props) {
  const [confirming, setConfirming] = useState(false)

  return (
    <motion.div
      layout
      exit={{ opacity: 0, height: 0, marginBottom: 0 }}
      transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
      className="overflow-hidden"
    >
      <div className="rounded-card border border-zinc-200 bg-surface-card px-4 py-4">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0 flex-1">
            <div className="flex items-baseline gap-2">
              <h3 className="text-sm font-medium text-zinc-900">
                {item.label}
              </h3>
              {item.value && (
                <span className="text-xs text-zinc-500">{item.value}</span>
              )}
            </div>

            <dl className="mt-3 grid grid-cols-1 gap-x-6 gap-y-2 text-xs sm:grid-cols-2">
              <div>
                <dt className="text-zinc-400">Source</dt>
                <dd className="mt-0.5 text-zinc-700">{item.source}</dd>
              </div>
              <div>
                <dt className="text-zinc-400">Used for</dt>
                <dd className="mt-0.5 text-zinc-700">{item.usedFor}</dd>
              </div>
              <div className="sm:col-span-2">
                <dt className="text-zinc-400">Retention</dt>
                <dd className="mt-0.5 text-zinc-700">{item.retention}</dd>
              </div>
            </dl>
          </div>

          {!confirming && item.removable && (
            <button
              type="button"
              onClick={() => setConfirming(true)}
              aria-label={`Remove ${item.label}`}
              className="shrink-0 rounded-lg p-2 text-zinc-400 transition-colors hover:bg-surface-muted hover:text-signal-red"
            >
              <Trash2 size={14} />
            </button>
          )}
        </div>

        <AnimatePresence initial={false}>
          {confirming && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <div className="mt-4 rounded-lg border border-signal-red/20 bg-signal-red/5 px-3.5 py-3">
                <div className="flex items-start gap-2.5">
                  <AlertTriangle
                    size={14}
                    className="mt-0.5 shrink-0 text-signal-red"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="text-xs text-zinc-700">
                      Removing this will break any tasks that depend on it.
                      This can&apos;t be undone.
                    </p>
                    <div className="mt-3 flex gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          onRemove(item.id)
                          setConfirming(false)
                        }}
                        className="rounded-lg bg-signal-red px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-signal-red/90"
                      >
                        Remove
                      </button>
                      <button
                        type="button"
                        onClick={() => setConfirming(false)}
                        className="rounded-lg border border-zinc-200 bg-white px-3 py-1.5 text-xs font-medium text-zinc-600 transition-colors hover:bg-surface-muted"
                      >
                        Keep it
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}

