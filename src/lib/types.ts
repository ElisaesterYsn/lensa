export type Permission = {
  id: string
  iconName: 'landmark' | 'wallet' | 'heart-pulse'
  name: string
  description: string
  willAccess: string
  willNot: string
  why: string
  enabled: boolean
}

export type TaskAction = {
  label: string
}

export type Task = {
  id: string
  title: string
  due: string
  duration: string
  actions: string[]
  priority: 'urgent' | 'normal' | 'info'
}
