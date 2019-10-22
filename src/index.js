import P from 'bluebird'
import redis from 'redis'

P.promisifyAll(redis.RedisClient.prototype)

const DEFAULT_REDIS_STATE_STORE_URL = 'redis://localhost:6379/0'
const DEFAULT_REDIS_STATE_MIGRATION_KEY = 'migrations'
const DEFAULT_REDIS_STATE_LAST_RUN_KEY = 'last_run'

export default class RedisStateStore {
  constructor(config) {
    this.config = config || {}
  }

  async load(fn) {
    const db = redis.createClient()

    const lastRun = await db.getAsync(this.lastRunKey) || ''
    const dbData = await db.getAsync(this.migrationKey) || ''
    const migrations = dbData ? JSON.parse(dbData) : []

    db.quit()
    fn(null, {
      lastRun,
      migrations
    })
  }

  async save(set, fn) {
    const db = redis.createClient()

    await db.setAsync(this.lastRunKey, set.lastRun)
    await db.setAsync(this.migrationKey, JSON.stringify(set.migrations))

    db.quit()
    fn()
  }

  get storeUrl() {
    return this.config.storeUrl || process.env.REDIS_STATE_STORE_URL || DEFAULT_REDIS_STATE_STORE_URL
  }

  get migrationKey() {
    return this.config.migrationKey || process.env.REDIS_STATE_MIGRATION_KEY || DEFAULT_REDIS_STATE_MIGRATION_KEY
  }

  get lastRunKey() {
    return this.config.lastRunKey || process.env.REDIS_STATE_LAST_RUN_KEY || DEFAULT_REDIS_STATE_LAST_RUN_KEY
  }
}
