import { createServerFn } from '@tanstack/react-start'
import { z } from 'zod'
import type { Tracker, TrackerPage } from '../types'

const PAGE_SIZE = 5
const { getDb } = await import('../db/mongodb.server.ts')

const paginationSchema = z.object({
  page: z.number().int().min(1).default(1),
})

export const getTrackers = createServerFn({ method: 'GET' })
  .validator(paginationSchema)
  .handler(async ({ data }): Promise<TrackerPage> => {
    const db = await getDb()
    const collectionName = process.env.MONGODB_COLLECTION

    if (!collectionName) {
      throw new Error('Missing MONGODB_COLLECTION environment variable')
    }

    const collection = db.collection<Tracker>(collectionName)
    const page = data.page
    const skip = (page - 1) * PAGE_SIZE

    const [documents, total] = await Promise.all([
      collection
        .find({}, { projection: { _id: 0 } })
        .sort({ date: -1, id: -1 })
        .skip(skip)
        .limit(PAGE_SIZE)
        .toArray(),

      collection.countDocuments(),
    ])

    return {
      trackers: documents.map((doc) => ({
        id: doc.id,
        date: new Date(doc.date).toISOString(),
        title: doc.title,
        content: doc.content,
      })),
      page: data.page,
      pageSize: PAGE_SIZE,
      total,
      totalPages: Math.ceil(total / PAGE_SIZE),
    }
  })

export const createTracker = createServerFn({ method: 'POST' })
  .validator(
    z.object({
      title: z.string().trim().min(1).max(120),
      content: z.string().trim().min(1).max(5000),
    }),
  )
  .handler(async ({ data }): Promise<Tracker> => {
    const { getDb } = await import('../db/mongodb.server')

    const collectionName = process.env.MONGODB_COLLECTION

    if (!collectionName) {
      throw new Error('Missing MONGODB_COLLECTION')
    }

    const db = await getDb()

    // Atomically allocate a unique numeric ID.
    const counter = await db
      .collection<{ _id: string; seq: number }>('_counters')
      .findOneAndUpdate(
        { _id: 'trackers' },
        { $inc: { seq: 1 } },
        { upsert: true, returnDocument: 'after' },
      )

    if (!counter) {
      throw new Error('Failed to generate tracker ID')
    }

    const tracker: Tracker = {
      id: counter.seq,
      date: new Date().toISOString(),
      title: data.title,
      content: data.content,
    }

    await db.collection(collectionName).insertOne({
      ...tracker,
      date: new Date(tracker.date),
    })

    return tracker
  })
