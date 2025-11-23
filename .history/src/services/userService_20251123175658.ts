import { users } from '../store/userStore'
import type { User } from '../types/user'

export const createUser = (name: string) => {
  const id = crypto.randomUUID()

  const user: User = {
    id,
    name,
    followers: new Set(),
    following: new Set(),
  }

  users.set(id, user)
  return user
}

export const getAllUsers = (): User[] => {
  return Array.from(users.values())
}

export const getUserById = (id: string): User | null => {
  return users.get(id) || null
}