import { Elysia, t } from 'elysia'
import { createUser, getAllUsers } from '../services/userService'
import { followUser, unfollowUser } from '../services/followService'
import { requireUser } from '../helpers/auth'

export const userRoutes = new Elysia({ prefix: '/users' })
  .derive(({ request }) => ({ userId: request.headers.get('x-user-id') }))

  // CREATE USER
  .post(
    '/',
    ({ body }) => {
      const user = createUser(body.name)
      return {
        ...user,
        followers: Array.from(user.followers),
        following: Array.from(user.following)
      }
    },
    {
      body: t.Object({ name: t.String() }),
      response: t.Object({
        id: t.String(),
        name: t.String(),
        followers: t.Array(t.String()),
        following: t.Array(t.String())
      })
    }
  )

  // GET ALL USERS
  .get(
    '/',
    () => getAllUsers().map(user => ({
      ...user,
      followers: Array.from(user.followers),
      following: Array.from(user.following)
    })),
    {
      response: t.Array(
        t.Object({
          id: t.String(),
          name: t.String(),
          followers: t.Array(t.String()),
          following: t.Array(t.String())
        })
      )
    }
  )

  // FOLLOW USER
  .post(
    '/:id/follow',
    (ctx) => {
      const userId = requireUser(ctx)
      return followUser(userId, ctx.params.id)
    },
    { headers: t.Object({ 'x-user-id': t.String() }) }
  )

  // UNFOLLOW USER
  .delete(
    '/:id/follow',
    (ctx) => {
      const userId = requireUser(ctx)
      return unfollowUser(userId, ctx.params.id)
    },
    { headers: t.Object({ 'x-user-id': t.String() }) }
  )
