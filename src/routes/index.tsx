import { createFileRoute, Link, useRouter } from '@tanstack/react-router'
import { z } from 'zod'
import { TrackerForm } from '../components/TrackerForm'
import { TrackerList } from '../components/TrackerList'
import { getTrackers } from '../serverActions/trackerActions'

import { useEffect, useState } from 'react'
import { ThemeSlider, type Theme } from '../components/ThemeSlider'

export const Route = createFileRoute('/')({
  validateSearch: z.object({
    page: z.number().int().min(1).catch(1),
  }),

  loaderDeps: ({ search }) => ({
    page: search.page,
  }),

  loader: ({ deps }) =>
    getTrackers({
      data: { page: deps.page },
    }),

  component: HomePage,
})

function HomePage() {
  const { trackers, page, total, totalPages } = Route.useLoaderData()

  const router = useRouter()
  const navigate = Route.useNavigate()

  const displayTotalPages = Math.max(1, totalPages)

  async function handleCreated() {
    await navigate({
      search: { page: 1 },
    })

    await router.invalidate()
  }

  const [theme, setTheme] = useState<Theme | null>(null)

  useEffect(() => {
    const saved = localStorage.getItem('tracker-theme')

    if (saved === 'light' || saved === 'dim' || saved === 'dark') {
      setTheme(saved)
    } else {
      setTheme('light')
    }
  }, [])

  useEffect(() => {
    if (theme === null) return

    document.documentElement.dataset.theme = theme
    localStorage.setItem('tracker-theme', theme)
  }, [theme])

  return (
    <main className="mx-auto max-w-3xl space-y-6 p-6">
      <header className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Tracker Dashboard</h1>

          <p className="mt-2 text-gray-500">Total trackers: {total}</p>
        </div>

        {theme !== null && <ThemeSlider theme={theme} onChange={setTheme} />}
      </header>

      <TrackerForm onCreated={handleCreated} />

      <TrackerList tracker={trackers} />

      {total > 0 && (
        <nav
          aria-label="Tracker pagination"
          className="flex items-center justify-between"
        >
          {page > 1 ? (
            <Link
              to="/"
              search={{ page: page - 1 }}
              className="rounded border px-4 py-2 hover:bg-gray-100"
            >
              Previous
            </Link>
          ) : (
            <span className="text-gray-400">Previous</span>
          )}

          <span className="text-sm text-gray-600">
            Page {page} of {displayTotalPages}
          </span>

          {page < totalPages ? (
            <Link
              to="/"
              search={{ page: page + 1 }}
              className="rounded border px-4 py-2 hover:bg-gray-100"
            >
              Next
            </Link>
          ) : (
            <span className="text-gray-400">Next</span>
          )}
        </nav>
      )}
    </main>
  )
}
