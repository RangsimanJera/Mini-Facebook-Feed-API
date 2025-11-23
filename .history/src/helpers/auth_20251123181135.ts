export const requireUser = (ctx: { userId: string | null }) => {
  if (!ctx.userId) {
    ctx.status = 401
    throw new Error('User not logged in')
  }
  return ctx.userId
}
