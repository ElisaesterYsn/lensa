"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Lock, Check, Minus } from "lucide-react";

type AccessItem = {
  label: string;
  source: string;
};

type ApprovalModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onApprove: (mode: "once" | "remember") => void;
  taskTitle: string;
  accesses: AccessItem[];
  actions: string[];
  willNotDo: string[];
};

const modal = {
  hidden: { opacity: 0, scale: 0.98, y: 8 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.24, ease: [0.22, 1, 0.36, 1] as const },
  },
  exit: {
    opacity: 0,
    scale: 0.98,
    y: 8,
    transition: { duration: 0.16 },
  },
};

const backdrop = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.18 } },
  exit: { opacity: 0, transition: { duration: 0.14 } },
};

const sectionStagger = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.15 },
  },
};

const sectionItem = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export function ApprovalModal({
  isOpen,
  onClose,
  onApprove,
  taskTitle,
  accesses,
  actions,
  willNotDo,
}: ApprovalModalProps) {
  const [minutesLeft, setMinutesLeft] = useState(15);

  // Reset timer + countdown when modal opens
  useEffect(() => {
    if (!isOpen) return;
    setMinutesLeft(15);
    const interval = setInterval(() => {
      setMinutesLeft((m) => (m > 0 ? m - 1 : 0));
    }, 60_000);
    return () => clearInterval(interval);
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center">
          <motion.div
            variants={backdrop}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={onClose}
            className="absolute inset-0 bg-zinc-900/40 backdrop-blur-[2px]"
          />

          <motion.div
            variants={modal}
            initial="hidden"
            animate="visible"
            exit="exit"
            role="dialog"
            aria-modal="true"
            aria-labelledby="approval-modal-title"
            className="relative w-full max-w-lg max-h-[92vh] overflow-y-auto rounded-t-2xl bg-surface-card sm:rounded-card
                       shadow-[0_24px_60px_-15px_rgba(0,0,0,0.25)]"
          >
            {/* Header */}
            <div className="sticky top-0 z-10 flex items-start justify-between gap-4 border-b border-zinc-100 bg-surface-card px-6 py-5">
              <div>
                <p className="text-xs uppercase tracking-wide text-zinc-400">
                  Approval required
                </p>
                <h2
                  id="approval-modal-title"
                  className="mt-1 text-base font-medium text-zinc-900"
                >
                  Before Lensa does this for you
                </h2>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close"
                className="-mr-1 rounded-lg p-1.5 text-zinc-400 transition-colors hover:bg-surface-muted hover:text-zinc-600"
              >
                <X size={16} />
              </button>
            </div>

            <motion.div
              variants={sectionStagger}
              initial="hidden"
              animate="visible"
              className="px-6 py-5 space-y-6"
            >
              {/* Intro */}
              <motion.p
                variants={sectionItem}
                className="text-sm leading-relaxed text-zinc-500"
              >
                You're about to let Lensa handle{" "}
                <span className="text-zinc-700 font-medium">
                  {taskTitle.toLowerCase()}
                </span>
                . Here's exactly what will happen. Nothing runs until you say
                so.
              </motion.p>

              {/* Will access */}
              <motion.section variants={sectionItem}>
                <SectionLabel
                  icon={<Lock size={12} />}
                  label="What Lensa will access"
                />
                <ul className="mt-3 space-y-2.5">
                  {accesses.map((item) => (
                    <li
                      key={item.label}
                      className="rounded-lg border border-zinc-100 bg-surface-muted/50 px-3.5 py-2.5"
                    >
                      <p className="text-sm text-zinc-800">{item.label}</p>
                      <p className="mt-0.5 text-xs text-zinc-500">
                        {item.source}
                      </p>
                    </li>
                  ))}
                </ul>
              </motion.section>

              {/* Will do */}
              <motion.section variants={sectionItem}>
                <SectionLabel
                  icon={<Check size={12} />}
                  label="What Lensa will do"
                />
                <ol className="mt-3 space-y-2">
                  {actions.map((action, i) => (
                    <li
                      key={action}
                      className="flex gap-3 text-sm text-zinc-700"
                    >
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-trust-50 text-[11px] font-medium text-trust-700">
                        {i + 1}
                      </span>
                      <span className="leading-relaxed">{action}</span>
                    </li>
                  ))}
                </ol>
              </motion.section>

              {/* Will NOT do — this is the trust-builder */}
              <motion.section
                variants={sectionItem}
                className="rounded-card border border-zinc-100 bg-zinc-50/60 px-4 py-4"
              >
                <SectionLabel
                  icon={<Minus size={12} />}
                  label="What Lensa will NOT do"
                  muted
                />
                <ul className="mt-3 space-y-2">
                  {willNotDo.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2.5 text-sm text-zinc-500"
                    >
                      <span className="mt-0.5 text-zinc-400">
                        <X size={12} />
                      </span>
                      <span className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.section>
            </motion.div>

            {/* Actions */}
            <div className="sticky bottom-0 border-t border-zinc-100 bg-surface-card px-6 py-4">
              <div className="flex flex-col gap-2">
                <button
                  type="button"
                  onClick={() => onApprove("once")}
                  className="w-full rounded-lg bg-trust-500 py-3 text-sm font-medium text-white transition-colors hover:bg-trust-700"
                >
                  Approve once
                </button>
                <button
                  type="button"
                  onClick={() => onApprove("remember")}
                  className="w-full rounded-lg border border-zinc-200 bg-white py-3 text-sm font-medium text-zinc-700 transition-colors hover:bg-surface-muted"
                >
                  Approve & remember this
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="w-full py-2 text-sm text-zinc-500 transition-colors hover:text-zinc-700"
                >
                  Cancel
                </button>
              </div>

              <p className="mt-3 flex items-center justify-center gap-1.5 text-xs text-zinc-400">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-signal-amber/70" />
                This approval expires in {minutesLeft} minute
                {minutesLeft !== 1 ? "s" : ""} if unused.
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

function SectionLabel({
  icon,
  label,
  muted,
}: {
  icon: React.ReactNode;
  label: string;
  muted?: boolean;
}) {
  return (
    <div
      className={`flex items-center gap-2 text-xs font-medium uppercase tracking-wide ${
        muted ? "text-zinc-400" : "text-trust-700"
      }`}
    >
      <span className={muted ? "text-zinc-400" : "text-trust-500"}>{icon}</span>
      {label}
    </div>
  );
}
