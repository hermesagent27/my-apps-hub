export default eventHandler(async (event) => {
  const body = await readBody(event)
  const password = body?.password

  if (!process.env.APP_PASSWORD) {
    throw createError({ statusCode: 500, message: 'APP_PASSWORD not set' })
  }

  if (password !== process.env.APP_PASSWORD) {
    throw createError({ statusCode: 401, message: 'wrong password' })
  }

  // Shared cookie across all subdomains
  const isProd = process.env.NODE_ENV === 'production'
  setCookie(event, 'app-auth', password, {
    path: '/',
    maxAge: 60 * 60 * 24 * 30,
    httpOnly: true,
    sameSite: 'lax',
    secure: isProd,
    domain: process.env.COOKIE_DOMAIN || undefined
  })

  return { success: true }
})
