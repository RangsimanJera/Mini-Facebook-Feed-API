import { Elysia, t } from 'elysia'
import { createPost, likePost, unlikePost } from '../services/postService'
import { createComment } from '../services/commentService'

export const postRoutes = new Elysia({ prefix: '/posts' })
  .post('/', {
    body: t.Object({ content: t.String() }),
  }, ({ body, userId }) => createPost(userId, body.content))

  .post('/:id/like', ({ params, userId }) => likePost(params.id, userId))
  .delete('/:id/like', ({ params, userId }) => unlikePost(params.id, userId))

  .post('/:id/comments', {
    body: t.Object({ content: t.String() })
  }, ({ params, body, userId }) => createComment(userId, params.id, body.content))
