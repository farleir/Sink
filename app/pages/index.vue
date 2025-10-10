<script setup lang="ts">
import { ref, onMounted, defineComponent } from 'vue';

// --- Head Management (Gerenciamento do <head>) ---
useHead({
  title: 'Apps Farleir.com | Sink',
  htmlAttrs: {
    lang: 'pt-BR'
  },
  meta: [
    { charset: 'UTF-8' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1.0' }
  ],
  link: [
    { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
    { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
    { href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap', rel: 'stylesheet' }
  ],
  script: [
    // Google Analytics G4
    { async: true, src: 'https://www.googletagmanager.com/gtag/js?id=G-Q0DEQ3VK5W' },
    {
      innerHTML: `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-Q0DEQ3VK5W');
      `
    }
  ]
});

// --- COMPONENTE DO ITEM DA LISTA ---
const PublicLinkItem = defineComponent({
    props: ['link'],
    template: `
        <a :href="link.url" target="_blank" rel="noopener noreferrer"
           class="group flex items-center p-4 rounded-xl
                  bg-[hsl(var(--card)/0.5)] border border-[hsl(var(--border))]
                  transition-all duration-200 ease-in-out backdrop-blur-sm
                  hover:bg-[hsl(var(--accent))] hover:border-[hsl(var(--border))] hover:scale-[1.02]">

            <!-- Ícone -->
            <div class="flex-shrink-0 w-10 h-10 bg-[hsl(var(--secondary))] border border-[hsl(var(--border))] rounded-lg flex items-center justify-center mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 text-blue-500">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
                </svg>
            </div>

            <!-- Conteúdo de Texto -->
            <div class="flex-grow overflow-hidden">
                <h3 class="font-semibold text-base text-[hsl(var(--card-foreground))] truncate">
                    {{ link.slug }}
                </h3>
                <p class="text-sm text-[hsl(var(--muted-foreground))] truncate">
                    {{ link.description || 'Nenhuma descrição fornecida.' }}
                </p>
            </div>
        </a>
    `
});

// --- LÓGICA DO PAINEL PRINCIPAL ---
const links = ref([]);
const isLoading = ref(true);
const error = ref(null);

onMounted(async () => {
  try {
    // Busca os dados da API real em vez de usar mocks
    const data = await $fetch('/api/links/public');
    links.value = data;
  } catch (e: any) {
    error.value = e.data?.message || 'Ocorreu um erro ao carregar os links.';
    console.error(e);
  } finally {
    isLoading.value = false;
  }
});
</script>

<style>
/* Estilos globais para o corpo da página */
body {
    font-family: 'Inter', sans-serif;
    background-color: hsl(var(--background));
    color: hsl(var(--foreground));
    transition: background-color 0.3s, color 0.3s;
}

body::before {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    background-image: radial-gradient(circle at 10% 20%, rgba(100, 116, 139, 0.08), transparent 35%),
                      radial-gradient(circle at 90% 80%, rgba(59, 130, 246, 0.08), transparent 40%);
}
</style>

<template>
  <div class="relative min-h-screen px-4 py-16 sm:px-6 lg:px-8 lg:py-24 antialiased">
    <div class="container mx-auto">
        <!-- Cabeçalho -->
        <div class="text-center mb-12">
            <h1 class="text-3xl sm:text-4xl font-bold tracking-tight text-[hsl(var(--foreground))]">
                Apps Farleir.com
            </h1>
            <p class="mt-3 max-w-2xl mx-auto text-base text-[hsl(var(--muted-foreground))]">
                'Composição' de aplicativos úteis ou nem tanto, depende.
            </p>
        </div>

        <div class="max-w-7xl mx-auto">
            <!-- Estado de Carregamento (Skeletons) -->
            <div v-if="isLoading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div v-for="i in 8" :key="i" class="h-20 bg-[hsl(var(--secondary))] rounded-xl animate-pulse"></div>
            </div>

            <!-- Estado de Erro -->
            <div v-else-if="error"
                 class="text-center py-12 px-6 bg-red-900/20 border border-red-500/30 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" class="mx-auto h-10 w-10 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                </svg>
                <h3 class="mt-4 font-semibold text-red-200">Falha ao Carregar</h3>
                <p class="mt-2 text-sm text-red-300">{{ error }}</p>
            </div>

            <!-- Conteúdo Carregado (Lista de Links) -->
            <div v-else-if="links && links.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <PublicLinkItem v-for="link in links" :key="link.slug" :link="link" />
            </div>

             <!-- Mensagem para quando não houver links -->
            <div v-else class="text-center py-12 px-6 bg-[hsl(var(--secondary))] border border-[hsl(var(--border))] rounded-lg">
                 <svg xmlns="http://www.w3.org/2000/svg" class="mx-auto h-10 w-10 text-[hsl(var(--muted-foreground))]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
                </svg>
                <h3 class="mt-4 font-semibold text-[hsl(var(--foreground))]">Nenhum Link Público</h3>
                <p class="mt-2 text-sm text-[hsl(var(--muted-foreground))]">Ainda não há links marcados como públicos para exibição.</p>
            </div>
        </div>
    </div>
  </div>
</template>