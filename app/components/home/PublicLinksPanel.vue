<script setup lang="ts">
import { ref, onMounted } from 'vue';

const links = ref([]);
const isLoading = ref(true);
const error = ref(null);

onMounted(async () => {
  try {
    const data = await $fetch('/public-links');
    links.value = data;
  } catch (e: any) {
    error.value = e.data?.message || 'Ocorreu um erro ao carregar os links dinâmicos.';
    console.error('Erro ao buscar links públicos:', e);
  } finally {
    isLoading.value = false;
  }
});
</script>

<template>
  <div v-if="links && links.length > 0" class="max-w-7xl mx-auto mt-16">
    <div class="text-center mb-12">
        <h2 class="text-3xl sm:text-4xl font-bold tracking-tight text-[hsl(var(--foreground))]">
            Links Públicos da Comunidade
        </h2>
        <p class="mt-3 max-w-2xl mx-auto text-base text-[hsl(var(--muted-foreground))]">
            Links úteis compartilhados pelos usuários.
        </p>
    </div>

    <div v-if="isLoading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div v-for="i in 3" :key="i" class="h-20 bg-[hsl(var(--secondary))] rounded-xl animate-pulse"></div>
    </div>

    <div v-else-if="error" class="text-center py-12 px-6 bg-red-900/20 border border-red-500/30 rounded-lg">
        <h3 class="mt-4 font-semibold text-red-200">Falha ao Carregar Links Dinâmicos</h3>
        <p class="mt-2 text-sm text-red-300">{{ error }}</p>
    </div>

    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <StaticLinkItem v-for="link in links" :key="link.slug" :link="link" />
    </div>
  </div>
</template>