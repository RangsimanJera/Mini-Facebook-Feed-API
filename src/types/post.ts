export interface Post {
  id: string
  userId: string
  content: string
  createdAt: number
  likes: Set<string>
}
