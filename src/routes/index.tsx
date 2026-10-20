import { createFileRoute, Link, useRouter } from '@tanstack/react-router'
import { z } from 'zod'
import { TrackerForm } from '../components/TrackerForm'
import { TrackerList } from '../components/TrackerList'
import { getTrackers } from '../serverActions/trackerActions'

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

  return (
    <main className="mx-auto max-w-3xl space-y-6 p-6">
      <header>
        <h1 className="text-3xl font-bold">Tracker Dashboard</h1>

        <p className="mt-2 text-gray-500">Total trackers: {total}</p>
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
