import { comments } from '../store/commentStore'
import type { Comment } from '../types/comment'

export const createComment = (userId: string, postId: string, content: string) => {
  const id = crypto.randomUUID()

  const comment: Comment = {
    id,
    userId,
    postId,
    content,
    createdAt: Date.now()
  }

  comments.set(id, comment)
  return comment
}
