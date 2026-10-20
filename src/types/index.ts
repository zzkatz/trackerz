export interface Tracker {
  id: number
  date: string
  title: string
  content: string
}

export type TrackerData = Tracker[]

export interface TrackerPage {
  trackers: TrackerData
  page: number
  pageSize: number
  total: number
  totalPages: number
}
