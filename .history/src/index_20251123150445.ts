import { Elysia } from 'elysia'
import { openapi } from '@elysiajs/openapi'

import { userRoutes } from './routes/userRoutes'
import { postRoutes } from './routes/postRoutes'
import { feedRoutes } from './routes/feedRoutes'

const requireUser = (ctx: any) => {
  const userId = ctx.request.headers.get('x-user-id')
  if (!userId) return ctx.error(401, 'X-User-ID header required')
  ctx.userId = userId
}

new Elysia()
  .use(openapi()) // เปิด OpenAPI
  .derive(({ request }) => {
    const userId = request.headers.get('x-user-id')
    return { userId }
  })
  .get('/', () => 'hello')
  .use(userRoutes)
  .use(postRoutes)
  .use(feedRoutes)
  .listen(3000)

console.log("Server running on http://localhost:3000")
