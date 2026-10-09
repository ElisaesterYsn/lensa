import type { Permission, Task } from "./types";

import type { ActivityEntry } from "./types";

export const ACTIVITY: ActivityEntry[] = [
  {
    id: "act-001",
    status: "completed",
    title: "Renewed road tax",
    service: "JPJ",
    timestamp: "Today, 2:14 PM",
    accessed: ["MyKad number", "Vehicle registration WXY 1234"],
    stored: "Receipt (auto-deletes in 90 days)",
    duration: "47 seconds",
  },
  {
    id: "act-002",
    status: "pending",
    title: "Paying TNB bill",
    service: "Tenaga Nasional",
    timestamp: "Today, 2:16 PM",
    accessed: ["Account number", "Payment method ••4821"],
    stored: "Nothing until approved",
    note: "Awaiting your approval",
  },
  {
    id: "act-003",
    status: "completed",
    title: "Paid water bill",
    service: "Air Selangor",
    timestamp: "Yesterday, 9:03 AM",
    accessed: ["Account number", "Payment method ••4821"],
    stored: "Receipt only",
    duration: "22 seconds",
  },
  {
    id: "act-004",
    status: "revoked",
    title: "Payment to Astro",
    service: "Astro",
    timestamp: "Yesterday, 8:41 AM",
    accessed: [],
    stored: "Nothing",
    note: "You revoked this before it ran. No data was shared, no charge was made.",
  },
  {
    id: "act-005",
    status: "completed",
    title: "Renewed passport appointment",
    service: "Imigresen",
    timestamp: "Oct 6, 10:22 AM",
    accessed: ["MyKad number", "Existing passport number"],
    stored: "Appointment confirmation (auto-deletes after appointment)",
    duration: "1 minute 12 seconds",
  },
];

export const PERMISSIONS: Permission[] = [
  {
    id: "government",
    iconName: "landmark",
    name: "Government Services",
    description: "Road tax, passports, summons",
    willAccess: "MyKad no., vehicle registration",
    willNot: "Your full IC photo",
    why: "We need your MyKad number to identify you to JPJ and other agencies. We never need to see your IC photo — the agency already has it.",
    enabled: false,
  },
  {
    id: "banking",
    iconName: "wallet",
    name: "Banking & Payments",
    description: "Bills, transfers, receipts",
    willAccess: "Account no., balance",
    willNot: "Transaction history",
    why: "We need your account number to make payments you approve. We do not store or read your transaction history — that stays between you and your bank.",
    enabled: false,
  },
  {
    id: "health",
    iconName: "heart-pulse",
    name: "Health Records",
    description: "Appointments, prescriptions",
    willAccess: "Appointment dates",
    willNot: "Diagnosis, test results",
    why: "We only need to know when your appointments are, so we can remind you. Your medical details stay private — we never request them.",
    enabled: false,
  },
];

export const TASKS: Task[] = [
  {
    id: "road-tax",
    title: "Renew Road Tax",
    due: "Due in 12 days",
    duration: "About 2 minutes",
    actions: [
      "Fetch your vehicle details",
      "Submit the renewal",
      "Save the receipt for 90 days",
    ],
    priority: "urgent",
  },
  {
    id: "tnb-bill",
    title: "Pay Electricity Bill",
    due: "RM 142.30 · Due Friday",
    duration: "About 30 seconds",
    actions: ["Use your saved payment method", "Not store the transaction"],
    priority: "urgent",
  },
  {
    id: "passport",
    title: "Passport expires in 8 months",
    due: "No action needed yet",
    duration: "We'll remind you in 6 months",
    actions: [],
    priority: "info",
  },
];
