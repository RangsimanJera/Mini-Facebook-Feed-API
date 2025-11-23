import { Elysia, t } from 'elysia'
import { getFeed } from '../services/feedService'
import { requireUser } from '../helpers/auth'

export const feedRoutes = new Elysia({ prefix: '/feed' })
  .derive(({ request }) => ({ userId: request.headers.get('x-user-id') }))

  .get(
    '/',
    (ctx) => {
      const userId = requireUser(ctx)
      return getFeed(userId, ctx.query.limit, ctx.query.offset)
    },
    {
      query: t.Object({
        limit: t.Number({ default: 20 }),
        offset: t.Number({ default: 0 })
      })
    }
  )
