import { Elysia, t } from 'elysia'
import { createPost, likePost, unlikePost } from '../services/postService'
import { createComment } from '../services/commentService'
import { requireUser } from '../helpers/auth'

export const postRoutes = new Elysia({ prefix: '/posts' })
  .derive(({ request }) => ({ userId: request.headers.get('x-user-id') }))

  // CREATE POST
  .post(
    '/',
    (ctx) => {
      const userId = requireUser(ctx)
      return createPost(userId, ctx.body.content)
    },
    { 
      headers: t.Object({ 'x-user-id': t.String() }),
      body: t.Object({ content: t.String() }) 
    }
  )

  // LIKE POST
  .post('/:id/like', (ctx) => {
    const userId = requireUser(ctx)
    return likePost(ctx.params.id, userId)
  },
  { headers: t.Object({ 'x-user-id': t.String() }) }
)
  // UNLIKE POST
  .delete('/:id/like', (ctx) => {
    const userId = requireUser(ctx)
    return unlikePost(ctx.params.id, userId)
  },
  { headers: t.Object({ 'x-user-id': t.String() }) }
)

  // CREATE COMMENT
  .post(
    '/:id/comments',
    (ctx) => {
      const userId = requireUser(ctx)
      return createComment(userId, ctx.params.id, ctx.body.content)
    },
    {
      headers: t.Object({ 'x-user-id': t.String() }),
      body: t.Object({ content: t.String() })
    }
  )
