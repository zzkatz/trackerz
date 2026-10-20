import '@tanstack/react-start/server-only'
import type { Db } from 'mongodb'
import { MongoClient } from 'mongodb'

let clientPromise: Promise<MongoClient> | undefined

async function getClient(): Promise<MongoClient> {
  const uri = process.env.MONGODB_URI

  if (!uri) {
    throw new Error('Missing MONGODB_URI environment variable')
  }

  if (!clientPromise) {
    const client = new MongoClient(uri)

    clientPromise = client.connect().catch((error: unknown) => {
      clientPromise = undefined
      throw error
    })
  }

  return clientPromise
}

export async function getDb(): Promise<Db> {
  const dbName = process.env.MONGODB_DB

  if (!dbName) {
    throw new Error('Missing MONGODB_DB environment variable')
  }

  const client = await getClient()

  return client.db(dbName)
}
