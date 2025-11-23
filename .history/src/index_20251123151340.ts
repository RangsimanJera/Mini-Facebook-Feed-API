import { Elysia } from 'elysia'
import { openapi } from '@elysiajs/openapi'

import { userRoutes } from './routes/userRoutes'
import { postRoutes } from './routes/postRoutes'
import { feedRoutes } from './routes/feedRoutes'

new Elysia()
  .use(openapi())
  .derive(() => ({
    userId: null as string | null
  }))
  .derive(({ request }) => {
    const id = request.headers.get('x-user-id')
    return { userId: id }
  })
  .use(userRoutes)
  .use(postRoutes)
  .use(feedRoutes)
  .listen(3000)
