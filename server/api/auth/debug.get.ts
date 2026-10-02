// Temporary debug endpoint — DELETE after fixing login
export default eventHandler(async (event) => {
  const raw = process.env.APP_PASSWORD
  return {
    isSet: !!raw,
    length: raw?.length ?? 0,
    charCodes: raw ? raw.split('').map(c => c.charCodeAt(0)) : [],
    hasLeadingSpace: raw?.startsWith(' ') || raw?.startsWith('\n') || raw?.startsWith('\t'),
    hasTrailingSpace: raw?.endsWith(' ') || raw?.endsWith('\n') || raw?.endsWith('\t'),
    cookieDomain: process.env.COOKIE_DOMAIN ?? null,
    nodeEnv: process.env.NODE_ENV ?? null
  }
})
