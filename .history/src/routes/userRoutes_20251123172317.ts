import { Elysia, t } from 'elysia'
import { createUser, getAllUsers } from '../services/userService'
import { followUser, unfollowUser } from '../services/followService'
import { requireUser } from '../helpers/auth'

export const userRoutes = new Elysia({ prefix: '/users' })
  .derive(({ request }) => ({ userId: request.headers.get('x-user-id') }))

  .post(
    '/',
    ({ body }) => createUser(body.name),
    {
      body: t.Object({ name: t.String() }),
      response: t.Object({ id: t.String(), name: t.String() })
    }
  )

  .get('/',
    () => getAllUsers(),
    {
      response: t.Array(
        t.Object({
          id: t.String(),
          name: t.String()
        })
      )
    }
  )

  .post('/:id/follow', (ctx) => {
    const userId = requireUser(ctx)
    return followUser(userId, ctx.params.id)
  })

  .delete('/:id/follow', (ctx) => {
    const userId = requireUser(ctx)
    return unfollowUser(userId, ctx.params.id)
  })
