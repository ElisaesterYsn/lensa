import type { Permission, Task } from './types'

export const PERMISSIONS: Permission[] = [
  {
    id: 'government',
    iconName: 'landmark',
    name: 'Government Services',
    description: 'Road tax, passports, summons',
    willAccess: 'MyKad no., vehicle registration',
    willNot: 'Your full IC photo',
    why: 'We need your MyKad number to identify you to JPJ and other agencies. We never need to see your IC photo — the agency already has it.',
    enabled: false,
  },
  {
    id: 'banking',
    iconName: 'wallet',
    name: 'Banking & Payments',
    description: 'Bills, transfers, receipts',
    willAccess: 'Account no., balance',
    willNot: 'Transaction history',
    why: 'We need your account number to make payments you approve. We do not store or read your transaction history — that stays between you and your bank.',
    enabled: false,
  },
  {
    id: 'health',
    iconName: 'heart-pulse',
    name: 'Health Records',
    description: 'Appointments, prescriptions',
    willAccess: 'Appointment dates',
    willNot: 'Diagnosis, test results',
    why: 'We only need to know when your appointments are, so we can remind you. Your medical details stay private — we never request them.',
    enabled: false,
  },
]

export const TASKS: Task[] = [
  {
    id: 'road-tax',
    title: 'Renew Road Tax',
    due: 'Due in 12 days',
    duration: 'About 2 minutes',
    actions: [
      'Fetch your vehicle details',
      'Submit the renewal',
      'Save the receipt for 90 days',
    ],
    priority: 'urgent',
  },
  {
    id: 'tnb-bill',
    title: 'Pay Electricity Bill',
    due: 'RM 142.30 · Due Friday',
    duration: 'About 30 seconds',
    actions: [
      'Use your saved payment method',
      'Not store the transaction',
    ],
    priority: 'urgent',
  },
  {
    id: 'passport',
    title: 'Passport expires in 8 months',
    due: 'No action needed yet',
    duration: 'We\'ll remind you in 6 months',
    actions: [],
    priority: 'info',
  },
]
