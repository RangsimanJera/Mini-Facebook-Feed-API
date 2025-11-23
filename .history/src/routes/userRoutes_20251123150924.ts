import { Elysia, t } from 'elysia'
import { createUser } from '../services/userService'
import { followUser, unfollowUser } from '../services/followService'

export const userRoutes = new Elysia({ prefix: '/users' })
  .post('/', {
    body: t.Object({
      name: t.String()
    }),
    response: t.Object({
      id: t.String(),
      name: t.String()
    })
  }, ({ body }) => {
    return createUser(body.name)
  })
  .post('/:id/follow', ({ params, userId }) => {
    return followUser(userId, params.id)
  })
  .delete('/:id/follow', ({ params, userId }) => {
    return unfollowUser(userId, params.id)
  })
