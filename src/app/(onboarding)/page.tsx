'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { PERMISSIONS } from '@/lib/mock-data'
import { ToggleCard } from '@/components/ui/ToggleCard'
import type { Permission } from '@/lib/types'

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
}

const item = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.36, ease: [0.22, 1, 0.36, 1] as const },
  },
}

export default function OnboardingPage() {
  const [permissions, setPermissions] = useState<Permission[]>(PERMISSIONS)

  const enabledCount = permissions.filter((p) => p.enabled).length

  function handleToggle(id: string, enabled: boolean) {
    setPermissions((prev) =>
      prev.map((p) => (p.id === id ? { ...p, enabled } : p))
    )
  }

  return (
    <main className="min-h-screen bg-surface-base px-5 py-12">
      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        className="mx-auto max-w-xl"
      >
        <motion.div variants={item}>
          <h1 className="text-2xl font-medium tracking-tight text-zinc-900">
            You're in control here.
          </h1>
          <p className="mt-2 text-sm leading-relaxed text-zinc-500">
            Lensa only sees what you allow. You can change this anytime —
            nothing is permanent.
          </p>
        </motion.div>

        <motion.p
          variants={item}
          className="mt-8 mb-4 text-xs uppercase tracking-wide text-zinc-400"
        >
          Pick what to connect
        </motion.p>

        <div className="space-y-3">
          {permissions.map((permission) => (
            <motion.div key={permission.id} variants={item}>
              <ToggleCard
                permission={permission}
                onToggle={handleToggle}
              />
            </motion.div>
          ))}
        </div>

        <motion.div variants={item} className="mt-8">
          <p className="text-xs leading-relaxed text-zinc-400">
            Every permission is reversible. Nothing is enabled by default.
            You decide what Lensa remembers.
          </p>
        </motion.div>

        <motion.div variants={item} className="mt-8 flex flex-col gap-3">
          <button
            type="button"
            disabled={enabledCount === 0}
            className={`
              w-full rounded-lg py-3 text-sm font-medium transition-colors
              ${enabledCount > 0
                ? 'bg-trust-500 text-white hover:bg-trust-700'
                : 'bg-zinc-200 text-zinc-400 cursor-not-allowed'}
            `}
          >
            {enabledCount === 0
              ? 'Select at least one service'
              : `Continue with ${enabledCount} service${enabledCount > 1 ? 's' : ''}`}
          </button>

          <button
            type="button"
            className="w-full py-2 text-sm text-zinc-500 hover:text-zinc-700"
          >
            Skip — I'll decide later
          </button>
        </motion.div>
      </motion.div>
    </main>
  )
}
