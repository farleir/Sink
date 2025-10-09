<script setup lang="ts">
const { data: links, pending, error } = await useFetch('/api/links/public', {
  lazy: true,
  server: false,
})
</script>

<template>
  <div v-if="pending" class="text-center py-10">
    <p>Carregando...</p>
  </div>
  <div v-else-if="error" class="text-center py-10 text-red-500">
    <p>Ocorreu um erro ao carregar os links.</p>
  </div>
  <div v-else-if="links && links.length > 0">
    <div class="my-16">
      <h2 class="text-3xl font-bold text-center mb-10">
        Links em Destaque
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <HomePublicLinkItem
          v-for="link in links"
          :key="link.slug"
          :link="link"
        />
      </div>
    </div>
  </div>
</template>