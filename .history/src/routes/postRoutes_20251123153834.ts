import { Elysia, t } from 'elysia'
import { createPost, likePost, unlikePost } from '../services/postService'
import { createComment } from '../services/commentService'

// store type
type UserStore = { userId: string | null }

export const postRoutes = new Elysia({ prefix: '/posts' })

  // CREATE POST
  .post(
    '/',
    { body: t.Object({ content: t.String() }) },
    (ctx) => {
      const store = ctx.store as UserStore
      if (!store.userId) throw new Error('User not logged in')
      return createPost(store.userId, ctx.body.content)
    }
  )

  // LIKE POST
  .post('/:id/like', (ctx) => {
    const store = ctx.store as UserStore
    if (!store.userId) throw new Error('User not logged in')
    return likePost(ctx.params.id, store.userId)
  })

  // UNLIKE POST
  .delete('/:id/like', (ctx) => {
    const store = ctx.store as UserStore
    if (!store.userId) throw new Error('User not logged in')
    return unlikePost(ctx.params.id, store.userId)
  })

  // CREATE COMMENT
  .post(
    '/:id/comments',
    { body: t.Object({ content: t.String() }) },
    (ctx) => {
      const store = ctx.store as UserStore
      if (!store.userId) throw new Error('User not logged in')
      return createComment(store.userId, ctx.params.id, ctx.body.content)
    }
  )
