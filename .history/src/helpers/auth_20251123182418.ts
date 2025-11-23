export const requireUser = (ctx: { userId: string | null }) => {
  if (!ctx.userId) {
    throw new Response(JSON.stringify({ error: 'User not logged in' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' }
    })
  }
  return ctx.userId
}
