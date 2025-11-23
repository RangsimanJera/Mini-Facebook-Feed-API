import { posts } from '../store/postStore'
import type { Post } from '../types/post'

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

export const likePost = (postId: string, userId: string) => {
  const post = posts.get(postId)
  if (!post) return null

  post.likes.add(userId)
  return post
}

export const unlikePost = (postId: string, userId: string) => {
  const post = posts.get(postId)
  if (!post) return null

  post.likes.delete(userId)
  return post
}
