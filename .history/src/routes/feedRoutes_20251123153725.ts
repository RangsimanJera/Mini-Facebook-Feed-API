import { Elysia, t } from 'elysia'
import { getFeed } from '../services/feedService'

export const feedRoutes = new Elysia({ prefix: '/feed' })
  .get(
    '/',
    { query: t.Object({ limit: t.Number({ default: 20 }), offset: t.Number({ default: 0 }) }) },
    (ctx) => {
      const store = ctx.store as { userId: string | null }
      if (!store.userId) throw new Error('User not logged in')
      return getFeed(store.userId, ctx.query.limit, ctx.query.offset)
    }
  )
