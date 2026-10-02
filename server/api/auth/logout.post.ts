export default eventHandler(async (event) => {
  deleteCookie(event, 'app-auth', {
    path: '/',
    domain: process.env.COOKIE_DOMAIN || undefined
  })
  return { success: true }
})
