export const requireUser = (ctx: { userId: string | null }) => {
  if (!ctx.userId) throw new Error('User not logged in')
  return ctx.userId
}
