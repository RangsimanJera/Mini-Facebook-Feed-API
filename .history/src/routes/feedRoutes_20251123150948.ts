import { Elysia, t } from 'elysia'
import { getFeed } from '../services/feedService'

export const feedRoutes = new Elysia({ prefix: '/feed' })
  .get('/', {
    query: t.Object({
      limit: t.Number({ default: 20 }),
      offset: t.Number({ default: 0 })
    })
  }, ({ userId, query }) => {
    return getFeed(userId, query.limit, query.offset)
  })
