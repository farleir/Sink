<script setup lang="ts">
import { ref, defineComponent } from 'vue';

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

// --- Dados Estáticos dos Links ---
const staticLinks = ref([
    { slug: 'Status dos Sistemas', url: 'https://go.farleir.com/status', description: 'Monitoramento em tempo real dos serviços.' },
    { slug: 'Frases do Bingo', url: 'https://go.farleir.com/frasesbingo', description: 'Gerador de frases para bingo corporativo.' },
    { slug: 'Analista de Bagé', url: 'https://go.farleir.com/analistadebage', description: 'O grande pensador gaúcho em um app.' },
    { slug: 'Linktree', url: 'https://linktr.ee/farleir', description: 'Todos os meus links em um só lugar.' },
    { slug: 'Site Principal', url: 'https://farleir.com', description: 'Meu portfólio e blog principal.' },
]);


// --- COMPONENTE DO ITEM DA LISTA (definido localmente) ---
const StaticLinkItem = defineComponent({
    props: ['link'],
    template: `
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
    `
});
</script>

<style>
/* Estilos com Contraste Corrigido */
:root {
    --background: 240 10% 97%;
    --foreground: 240 10% 3.9%;
    --card: 240 10% 100%;
    --card-foreground: 240 10% 3.9%;
    --primary: 240 5.9% 10%;
    --primary-foreground: 0 0% 98%;
    --secondary: 240 4.8% 95.9%;
    --secondary-foreground: 240 5.9% 10%;
    --muted: 240 4.8% 95.9%;
    --muted-foreground: 240 3.8% 46.1%;
    --accent: 240 4.8% 92.9%;
    --accent-foreground: 240 5.9% 10%;
    --border: 240 5.9% 90%;
    --radius: 0.5rem;
}

@media (prefers-color-scheme: dark) {
    :root:where(:not(.light)) {
        --background: 0 0% 3.9%;
        --foreground: 0 0% 98%;
        --card: 0 0% 3.9%;
        --card-foreground: 0 0% 98%;
        --popover: 0 0% 3.9%;
        --popover-foreground: 0 0% 98%;
        --primary: 0 0% 98%;
        --primary-foreground: 0 0% 9%;
        --secondary: 0 0% 14.9%;
        --secondary-foreground: 0 0% 98%;
        --muted: 0 0% 14.9%;
        --muted-foreground: 0 0% 63.9%;
        --accent: 0 0% 14.9%;
        --accent-foreground: 0 0% 98%;
        --destructive: 0 84.2% 60.2%;
        --destructive-foreground: 0 0% 98%;
        --border: 0 0% 14.9%;
        --input: 0 0% 14.9%;
        --ring: 0 0% 83.1%;
    }
}

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
    <div class="container mx-auto flex flex-col min-h-[calc(100vh-8rem)]">
        <main class="flex-grow">
            <!-- Cabeçalho -->
            <div class="text-center mb-12">
                <h1 class="text-3xl sm:text-4xl font-bold tracking-tight text-[hsl(var(--foreground))]">
                    Apps Farleir.com
                </h1>
                <p class="mt-3 max-w-2xl mx-auto text-base text-[hsl(var(--muted-foreground))]">
                    'Composição' de aplicativos úteis ou nem tanto, depende.
                </p>
            </div>

            <!-- Lista de Links Estáticos -->
            <div class="max-w-7xl mx-auto">
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <StaticLinkItem v-for="link in staticLinks" :key="link.slug" :link="link" />
                </div>
            </div>
        </main>

    </div>
  </div>
</template>