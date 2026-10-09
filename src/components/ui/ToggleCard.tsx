'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Landmark, Wallet, HeartPulse, ChevronDown } from 'lucide-react'
import type { Permission } from '@/lib/types'

const ICONS = {
  landmark: Landmark,
  wallet: Wallet,
  'heart-pulse': HeartPulse,
} as const

type Props = {
  permission: Permission
  onToggle: (id: string, enabled: boolean) => void
}

export function ToggleCard({ permission, onToggle }: Props) {
  const [showWhy, setShowWhy] = useState(false)
  const Icon = ICONS[permission.iconName]

  return (
    <motion.div
      layout
      className={`
        rounded-card border bg-surface-card p-5 transition-colors
        ${permission.enabled
          ? 'border-trust-500 ring-1 ring-trust-500/20'
          : 'border-zinc-200'}
      `}
    >
      <div className="flex items-start gap-4">
        <div
          className={`
            flex h-10 w-10 shrink-0 items-center justify-center rounded-lg transition-colors
            ${permission.enabled
              ? 'bg-trust-500 text-white'
              : 'bg-surface-muted text-zinc-500'}
          `}
        >
          <Icon size={18} strokeWidth={1.75} />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="text-sm font-medium text-zinc-900">
                {permission.name}
              </h3>
              <p className="mt-0.5 text-sm text-zinc-500">
                {permission.description}
              </p>
            </div>

            <button
              type="button"
              role="switch"
              aria-checked={permission.enabled}
              aria-label={`Toggle ${permission.name}`}
              onClick={() => onToggle(permission.id, !permission.enabled)}
              className={`
                relative h-6 w-11 shrink-0 rounded-full transition-colors
                ${permission.enabled ? 'bg-trust-500' : 'bg-zinc-300'}
              `}
            >
              <motion.span
                layout
                transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                className={`
                  absolute top-0.5 h-5 w-5 rounded-full bg-white shadow-sm
                  ${permission.enabled ? 'left-[22px]' : 'left-0.5'}
                `}
              />
            </button>
          </div>

          <div className="mt-4 grid grid-cols-1 gap-2 text-xs sm:grid-cols-2">
            <div className="flex gap-2">
              <span className="text-signal-green mt-px">✓</span>
              <div>
                <span className="text-zinc-400">We'll access: </span>
                <span className="text-zinc-700">{permission.willAccess}</span>
              </div>
            </div>
            <div className="flex gap-2">
              <span className="text-zinc-400 mt-px">✗</span>
              <div>
                <span className="text-zinc-400">We won't: </span>
                <span className="text-zinc-700">{permission.willNot}</span>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setShowWhy((v) => !v)}
            className="mt-3 flex items-center gap-1 text-xs text-trust-500 hover:text-trust-700"
          >
            Why?
            <motion.span
              animate={{ rotate: showWhy ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronDown size={12} />
            </motion.span>
          </button>

          <AnimatePresence initial={false}>
            {showWhy && (
              <motion.div
                key="why"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
                className="overflow-hidden"
              >
                <p className="mt-3 rounded-lg bg-surface-muted p-3 text-xs leading-relaxed text-zinc-600">
                  {permission.why}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  )
}
