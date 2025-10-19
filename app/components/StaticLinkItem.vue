<script setup lang="ts">
defineProps({
  link: {
    type: Object,
    required: true,
  },
})
</script>

<template>
  <a :href="link.url" target="_blank" rel="noopener noreferrer"
     class="group flex items-center p-4 rounded-xl
            bg-[hsl(var(--card)/0.5)] border border-[hsl(var(--border))]
            transition-all duration-200 ease-in-out backdrop-blur-sm
            hover:bg-[hsl(var(--accent))] hover:border-[hsl(var(--border))] hover:scale-[1.02]">

      <div class="flex-shrink-0 w-10 h-10 bg-[hsl(var(--secondary))] border border-[hsl(var(--border))] rounded-lg flex items-center justify-center mr-4">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 text-blue-500">
            <path stroke-linecap="round" stroke-linejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
          </svg>
      </div>

      <div class="flex-grow overflow-hidden">
          <h3 class="font-semibold text-base text-[hsl(var(--card-foreground))] truncate">
              {{ link.slug }}
          </h3>
          <p class="text-sm text-[hsl(var(--muted-foreground))] truncate">
              {{ link.description || 'Nenhuma descrição fornecida.' }}
          </p>
      </div>
  </a>
</template>