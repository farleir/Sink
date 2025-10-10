import { LinkSchema } from '@@/schemas/link'
import type { z } from 'zod'

export default eventHandler(async (event) => {
  const { cloudflare } = event.context
  const { KV } = cloudflare.env

  const { keys } = await KV.list({ prefix: 'link:' })

  if (!keys || keys.length === 0) {
    return []
  }

  const linkPromises = keys.map(key => KV.get(key.name, { type: 'json' }))
  const allLinks: (z.infer<typeof LinkSchema> | null)[] = await Promise.all(linkPromises)

  // Filtra de forma segura, verificando a existência da propriedade 'public'
  // Isso evita erros com links antigos que não possuem o campo.
  const publicLinks = allLinks
    .filter((link): link is z.infer<typeof LinkSchema> =>
      link !== null && link.public === true
    )
    .sort((a, b) => (b.createdAt ?? 0) - (a.createdAt ?? 0))
    .slice(0, 20)
    .map(({ slug, url, description }) => ({
      slug,
      url,
      description,
    }))

  return publicLinks
})