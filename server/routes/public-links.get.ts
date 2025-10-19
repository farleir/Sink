import { LinkSchema } from '@@/schemas/link'
import type { z } from 'zod'

export default eventHandler(async (event) => {
  const { cloudflare } = event.context
  const { KV } = cloudflare.env

  try {
    const { keys } = await KV.list({ prefix: 'link:' })

    if (!keys || keys.length === 0) {
      return []
    }

    const linkPromises = keys.map(async (key) => {
      try {
        const linkData = await KV.get(key.name, { type: 'json' })
        // Valida se o link tem o formato mínimo esperado e é público
        if (linkData && typeof linkData === 'object' && linkData.public === true) {
          // Faz uma validação segura para garantir que os campos essenciais existem
          const parsed = LinkSchema.pick({ slug: true, url: true, description: true, createdAt: true }).safeParse(linkData)
          if (parsed.success) {
            return parsed.data
          }
        }
        return null // Ignora links inválidos, privados ou malformados
      } catch (e) {
        console.error(`Falha ao processar a chave ${key.name}:`, e)
        return null // Ignora o link se houver um erro na leitura/processamento
      }
    })

    const allLinks = await Promise.all(linkPromises)

    const publicLinks = allLinks
      .filter((link): link is z.infer<typeof LinkSchema> => link !== null)
      .sort((a, b) => (b.createdAt ?? 0) - (a.createdAt ?? 0))
      .slice(0, 20)
      .map(({ slug, url, description, comment }) => ({
        slug,
        url,
        description: comment || description, // Usa o comentário como fallback para a descrição
      }))

    return publicLinks
  } catch (error) {
    console.error('Erro geral ao listar links públicos:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Não foi possível buscar os links públicos.'
    })
  }
})