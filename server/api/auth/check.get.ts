export default eventHandler(async (event) => {
  const cookie = getCookie(event, 'app-auth')
  const authed = !!cookie && cookie === process.env.APP_PASSWORD
  return { authed }
})
