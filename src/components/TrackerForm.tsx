import { useState } from 'react'
import { createTracker } from '../serverActions/trackerActions.ts'

interface TrackerFormProps {
  onCreated: () => Promise<void>
}

export function TrackerForm({ onCreated }: TrackerFormProps) {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [pending, setPending] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    setPending(true)
    setError(null)

    try {
      await createTracker({
        data: { title, content },
      })

      setTitle('')
      setContent('')

      await onCreated()
    } catch (error) {
      console.error('Create tracker failed:', error)

      setError(
        error instanceof Error ? error.message : 'Failed to create tracker.',
      )
    } finally {
      setPending(false)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 rounded-lg border bg-white p-6 shadow-sm"
    >
      <h2 className="text-xl font-semibold">Add a tracker</h2>

      <div className="space-y-1">
        <label htmlFor="tracker-title" className="font-medium">
          Title
        </label>

        <input
          id="tracker-title"
          name="title"
          type="text"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="Enter tracker title"
          maxLength={120}
          required
          disabled={pending}
          className="w-full rounded-md border p-3"
        />
      </div>

      <div className="space-y-1">
        <label htmlFor="tracker-content" className="font-medium">
          Content
        </label>

        <textarea
          id="tracker-content"
          name="content"
          value={content}
          onChange={(event) => setContent(event.target.value)}
          placeholder="Enter tracker details"
          rows={4}
          maxLength={5000}
          required
          disabled={pending}
          className="w-full rounded-md border p-3"
        />
      </div>

      {error && (
        <p role="alert" className="text-sm text-red-600">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="rounded-md bg-blue-600 px-5 py-2 font-medium text-white hover:bg-blue-700 disabled:opacity-50"
      >
        {pending ? 'Adding...' : 'Add tracker'}
      </button>
    </form>
  )
}
