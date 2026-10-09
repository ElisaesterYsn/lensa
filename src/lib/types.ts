export type Permission = {
  id: string;
  iconName: "landmark" | "wallet" | "heart-pulse";
  name: string;
  description: string;
  willAccess: string;
  willNot: string;
  why: string;
  enabled: boolean;
};

export type TaskAction = {
  label: string;
};

export type Task = {
  id: string;
  title: string;
  due: string;
  duration: string;
  actions: string[];
  priority: "urgent" | "normal" | "info";
};

export type ActivityStatus = "completed" | "pending" | "revoked";

export type ActivityEntry = {
  id: string;
  status: ActivityStatus;
  title: string;
  service: string;
  timestamp: string; // human-readable, e.g. "Today, 2:14 PM"
  accessed: string[]; // what data the agent touched
  stored: string; // what was persisted, or "Nothing"
  duration?: string; // e.g. "47 seconds"
  note?: string; // optional note for revoked/pending states
};
