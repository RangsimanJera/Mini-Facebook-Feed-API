import { posts } from '../store/postStore'
import { comments } from '../store/commentStore'
import { users } from '../store/userStore'

export const getFeed = (userId: string, limit = 20, offset = 0) => {
  const me = users.get(userId)
  if (!me) return []

  const ids = [userId, ...me.following]

  const all = [...posts.values()]
    .filter((p) => ids.includes(p.userId))
    .sort((a, b) => b.createdAt - a.createdAt)

  const slice = all.slice(offset, offset + limit)

  return slice.map((post) => ({
    ...post,
    likes: Array.from(post.likes),
    likeCount: post.likes.size,
    commentCount: [...comments.values()].filter((c) => c.postId === post.id).length
  }))
}
