import { LinkSchema } from '~/schemas/link'
import type { z } from 'zod'

export default eventHandler(async (event) => {
  const { cloudflare } = event.context
  if (!cloudflare?.env?.KV) {
    // Retorna um erro claro se o KV não estiver configurado
    throw createError({ statusCode: 500, statusMessage: 'KV store is not available' })
  }
  const { KV } = cloudflare.env

  const { keys } = await KV.list({ prefix: 'link:' })

  if (!keys || keys.length === 0) {
    return []
  }

  // Usar allSettled para evitar que uma única promessa rejeitada quebre todo o processo
  const linkPromises = keys.map(key => KV.get(key.name, { type: 'json' }))
  const allLinksResults = await Promise.allSettled(linkPromises)

  const validPublicLinks = []

  for (const result of allLinksResults) {
    // Processa apenas as promessas que foram resolvidas com sucesso e não são nulas
    if (result.status === 'fulfilled' && result.value) {
      const validation = LinkSchema.safeParse(result.value)
      
      // Adiciona à lista apenas se for válido E explicitamente público
      if (validation.success && validation.data.public === true) {
        validPublicLinks.push(validation.data)
      }
    }
    // Ignora silenciosamente as promessas que falharam (e.g., JSON inválido no KV)
  }

  // 1. Ordena os links válidos pela data de criação
  const sortedLinks = validPublicLinks.sort((a, b) => 
    (b.createdAt ?? 0) - (a.createdAt ?? 0)
  )

  // 2. Limita a 20 resultados
  const limitedLinks = sortedLinks.slice(0, 20)

  // 3. Mapeia para retornar APENAS os campos necessários para o frontend
  const finalLinks = limitedLinks.map(({ slug, url, description }) => ({
    slug,
    url,
    description,
  }))

  return finalLinks
})
