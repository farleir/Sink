import { LinkSchema } from '@@/schemas/link'
import type { z } from 'zod'

export default eventHandler(async (event) => {
  const { cloudflare } = event.context
  const { KV } = cloudflare.env

  // 1. List all link keys from the KV store
  const { keys } = await KV.list({ prefix: 'link:' })

  if (!keys || keys.length === 0) {
    return []
  }

  // 2. Fetch all link objects in parallel
  const linkPromises = keys.map(key => KV.get(key.name, { type: 'json' }))
  const allLinks: (z.infer<typeof LinkSchema> | null)[] = await Promise.all(linkPromises)

  // 3. Filter for public links and ensure they are valid
  const publicLinks = allLinks
    .filter((link): link is z.infer<typeof LinkSchema> =>
      link !== null && LinkSchema.safeParse(link).success && link.public === true
    )
    // 4. Sort by creation date (newest first)
    .sort((a, b) => (b.createdAt ?? 0) - (a.createdAt ?? 0))
    // 5. Limit the results
    .slice(0, 20)
    // 6. Select only the required fields
    .map(({ slug, url, description }) => ({
      slug,
      url,
      description,
    }))

  return publicLinks
})