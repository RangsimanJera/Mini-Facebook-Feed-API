export const requireUser = (ctx: any) => {
  if (!ctx.userId) {
    return ctx.error(401, 'User not logged in')
  }
  return ctx.userId
}
