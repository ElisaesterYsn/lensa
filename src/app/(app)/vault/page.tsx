'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Download, Trash2, X } from 'lucide-react'
import { STORED_DATA, NOT_STORED } from '@/lib/mock-data'
import { StoredDataItem } from '@/components/ui/StoredDataItem'
import type { StoredDataItem as StoredDataItemType } from '@/lib/types'

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.05 },
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

export default function VaultPage() {
  const [stored, setStored] = useState<StoredDataItemType[]>(STORED_DATA)
  const [deleteAllOpen, setDeleteAllOpen] = useState(false)
  const [deleteAllConfirm, setDeleteAllConfirm] = useState('')

  function handleRemove(id: string) {
    setStored((prev) => prev.filter((s) => s.id !== id))
  }

  function handleDeleteAll() {
    if (deleteAllConfirm.trim().toUpperCase() !== 'DELETE') return
    setStored([])
    setDeleteAllConfirm('')
    setDeleteAllOpen(false)
  }

  return (
    <>
      <main className="mx-auto max-w-2xl px-5 py-10">
        <motion.div variants={container} initial="hidden" animate="visible">
          <motion.div variants={item}>
            <h1 className="text-2xl font-medium tracking-tight text-zinc-900">
              Your data
            </h1>
            <p className="mt-2 text-sm leading-relaxed text-zinc-500">
              This is everything Lensa has about you. Nothing more.
              You can remove any item, or wipe everything at once.
            </p>
          </motion.div>

          {/* Stored section */}
          <motion.section variants={item} className="mt-10">
            <div className="flex items-baseline justify-between">
              <h2 className="text-xs font-medium uppercase tracking-wide text-trust-700">
                Stored
              </h2>
              <span className="text-xs text-zinc-400">
                {stored.length} item{stored.length !== 1 ? 's' : ''}
              </span>
            </div>

            <div className="mt-3 space-y-2.5">
              <AnimatePresence initial={false}>
                {stored.map((s) => (
                  <StoredDataItem
                    key={s.id}
                    item={s}
                    onRemove={handleRemove}
                  />
                ))}
              </AnimatePresence>

              {stored.length === 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="rounded-card border border-dashed border-zinc-200 bg-surface-card/50 px-6 py-10 text-center"
                >
                  <p className="text-sm font-medium text-zinc-700">
                    Nothing stored.
                  </p>
                  <p className="mx-auto mt-1.5 max-w-xs text-sm text-zinc-500 leading-relaxed">
                    Lensa now knows nothing about you. It&apos;ll ask again
                    before doing anything.
                  </p>
                </motion.div>
              )}
            </div>
          </motion.section>

          {/* Not stored section */}
          <motion.section variants={item} className="mt-10">
            <h2 className="text-xs font-medium uppercase tracking-wide text-zinc-400">
              Not stored
            </h2>
            <p className="mt-2 text-xs text-zinc-500 leading-relaxed">
              These are things Lensa deliberately never sees or keeps.
              This list is as important as the one above.
            </p>

            <ul className="mt-3 space-y-2">
              {NOT_STORED.map((n) => (
                <li
                  key={n.id}
                  className="rounded-card border border-zinc-100 bg-zinc-50/40 px-4 py-3"
                >
                  <div className="flex items-start gap-3">
                    <span className="mt-0.5 text-zinc-300">
                      <X size={12} />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm text-zinc-500 line-through decoration-zinc-300">
                        {n.label}
                      </p>
                      <p className="mt-1 text-xs leading-relaxed text-zinc-400">
                        {n.reason}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </motion.section>

          {/* Footer actions */}
          <motion.div
            variants={item}
            className="mt-10 flex flex-col gap-2 border-t border-zinc-100 pt-6"
          >
            <button
              type="button"
              className="flex w-full items-center justify-center gap-2 rounded-lg border border-zinc-200 bg-white py-2.5 text-sm font-medium text-zinc-700 transition-colors hover:bg-surface-muted"
            >
              <Download size={14} />
              Download everything
            </button>
            <button
              type="button"
              onClick={() => setDeleteAllOpen(true)}
              disabled={stored.length === 0}
              className={`
                flex w-full items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-medium transition-colors
                ${stored.length === 0
                  ? 'text-zinc-300 cursor-not-allowed'
                  : 'text-signal-red hover:bg-signal-red/5'}
              `}
            >
              <Trash2 size={14} />
              Delete all my data
            </button>
          </motion.div>

          <motion.p
            variants={item}
            className="mt-6 text-center text-xs text-zinc-400"
          >
            Data export is a plain JSON file. No proprietary format, no lock-in.
          </motion.p>
        </motion.div>
      </main>

      {/* Delete-all confirmation modal */}
      <AnimatePresence>
        {deleteAllOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-5">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setDeleteAllOpen(false)}
              className="absolute inset-0 bg-zinc-900/40 backdrop-blur-[2px]"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.98, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: 8 }}
              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full max-w-md rounded-card bg-surface-card p-6 shadow-[0_24px_60px_-15px_rgba(0,0,0,0.25)]"
            >
              <h2 className="text-base font-medium text-zinc-900">
                Delete everything Lensa knows?
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-zinc-500">
                This removes all {stored.length} stored item
                {stored.length !== 1 ? 's' : ''}. You&apos;ll start fresh
                next time you use Lensa. This cannot be undone.
              </p>

              <label className="mt-5 block text-xs uppercase tracking-wide text-zinc-400">
                Type DELETE to confirm
                <input
                  type="text"
                  value={deleteAllConfirm}
                  onChange={(e) => setDeleteAllConfirm(e.target.value)}
                  autoFocus
                  className="mt-2 w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-800 outline-none transition-colors focus:border-trust-500 focus:ring-2 focus:ring-trust-500/15"
                  placeholder="DELETE"
                />
              </label>

              <div className="mt-5 flex gap-2">
                <button
                  type="button"
                  onClick={handleDeleteAll}
                  disabled={deleteAllConfirm.trim().toUpperCase() !== 'DELETE'}
                  className={`
                    flex-1 rounded-lg py-2.5 text-sm font-medium transition-colors
                    ${deleteAllConfirm.trim().toUpperCase() === 'DELETE'
                      ? 'bg-signal-red text-white hover:bg-signal-red/90'
                      : 'bg-zinc-100 text-zinc-400 cursor-not-allowed'}
                  `}
                >
                  Delete everything
                </button>
                <button
                  type="button"
                  onClick={() => setDeleteAllOpen(false)}
                  className="rounded-lg border border-zinc-200 bg-white px-4 py-2.5 text-sm font-medium text-zinc-600 transition-colors hover:bg-surface-muted"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  )
}
