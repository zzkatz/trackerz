import type { Tracker } from '../types'
import { useEffect, useState } from 'react'

function LocalDate({ date }: { date: string }) {
  const [formatted, setFormatted] = useState(date)

  useEffect(() => {
    setFormatted(new Date(date).toLocaleString())
  }, [date])

  return <>{formatted}</>
}
interface TrackerListProps {
  tracker: Tracker[]
}

export function TrackerList({ tracker }: TrackerListProps) {
  if (tracker.length === 0) {
    return <p className="italic text-gray-500">No trackers found. Add some!</p>
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Tracker Collection</h2>

      {tracker.map((track) => (
        <div
          key={track.id}
          className="rounded-lg border border-gray-200 bg-white p-4 shadow-md"
        >
          <p className="mb-2 text-lg font-bold">{track.id}</p>

          <p className="text-gray-700">{track.title}</p>

          <p className="mb-2 text-sm text-gray-500">
            <LocalDate date={track.date} />
          </p>

          <p className="text-gray-700">{track.content}</p>
        </div>
      ))}
    </div>
  )
}
