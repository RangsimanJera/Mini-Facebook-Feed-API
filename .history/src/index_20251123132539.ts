import { Elysia } from 'elysia'
import { openapi } from '@elysiajs/openapi'

const auth = (ctx: any) => {
  const userId = ctx.request.headers.get('x-user-id')
  if (!userId) return ctx.error(401, 'X-User-ID header required')

  ctx.userId = userId
}

new Elysia()
  .use(openapi())
  .get('/', () => 'hello')
  .post('/hello', () => 'OpenAPI')
  .listen(3000)