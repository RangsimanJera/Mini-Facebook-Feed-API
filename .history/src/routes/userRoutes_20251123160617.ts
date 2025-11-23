import { Elysia, t } from 'elysia'
import { createUser, getAllUsers } from '../services/userService'
import { followUser, unfollowUser } from '../services/followService'

export const userRoutes = new Elysia({ prefix: '/users' })

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
    const store = ctx.store as { userId: string | null }
    if (!store.userId) throw new Error('User not logged in')
    return followUser(store.userId, ctx.params.id)
  })

  .delete('/:id/follow', (ctx) => {
    const store = ctx.store as { userId: string | null }
    if (!store.userId) throw new Error('User not logged in')
    return unfollowUser(store.userId, ctx.params.id)
  })
