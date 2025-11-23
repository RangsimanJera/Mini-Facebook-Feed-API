import { users } from '../store/userStore'

export const followUser = (me: string, target: string) => {
  if (me === target) return null

  const m = users.get(me)
  const t = users.get(target)
  if (!m || !t) return null

  m.following.add(target)
  t.followers.add(me)

  return true
}

export const unfollowUser = (me: string, target: string) => {
  const m = users.get(me)
  const t = users.get(target)
  if (!m || !t) return null

  m.following.delete(target)
  t.followers.delete(me)

  return true
}
