import { Post } from '../types/post'
import { posts } from '../store/postStore'

export const createPost = (userId: string, content: string) => {
  const id = crypto.randomUUID()
  const post: Post = {
    id,
    userId,
    content,
    createdAt: Date.now(),
    likes: new Set(),
  }
  posts.set(id, post)
  return post
}
