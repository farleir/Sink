<script setup lang="ts">
defineProps({
  link: {
    type: Object,
    required: true,
    validator: (value: any) => {
      return (
        typeof value.slug === 'string' &&
        typeof value.url === 'string' &&
        (typeof value.description === 'string' || typeof value.description === 'undefined' || value.description === null)
      )
    },
  },
})

function truncateUrl(url: string, length = 40) {
  if (url.length <= length) {
    return url
  }
  return `${url.slice(0, length)}...`
}
</script>

<template>
  <a
    :href="link.url"
    target="_blank"
    rel="noopener noreferrer"
    class="block p-6 bg-card border rounded-lg transition-all duration-200 hover:shadow-lg hover:-translate-y-1"
  >
    <h3 class="text-lg font-semibold mb-2">
      {{ link.slug }}
    </h3>
    <p v-if="link.description" class="text-muted-foreground mb-4">
      {{ link.description }}
    </p>
    <p class="text-sm text-blue-500 truncate">
      {{ truncateUrl(link.url) }}
    </p>
  </a>
</template>