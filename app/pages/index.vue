<script setup lang="ts">
import { ref, onMounted } from 'vue';

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
const staticApps = ref([
    { slug: 'Frases do Bingo', url: 'https://go.farleir.com/frasesbingo', description: 'Gerador de frases para bingo corporativo.' },
    { slug: 'Analista de Bagé', url: 'https://go.farleir.com/analistadebage', description: 'O grande pensador gaúcho em um app.' },
    { slug: 'Status dos Sistemas', url: 'https://go.farleir.com/status', description: 'Monitoramento em tempo real dos serviços.' },
]);

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
                    Aplicativos Cocriados com IA
                </h1>
                <p class="mt-3 max-w-2xl mx-auto text-base text-[hsl(var(--muted-foreground))]">
                    Apps e ferramentas úteis (ou nem tanto)
                </p>
            </div>

            <!-- Lista de Links Estáticos -->
            <div class="max-w-7xl mx-auto">
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <StaticLinkItem v-for="link in staticApps" :key="link.slug" :link="link" />
                </div>
            </div>

            <!-- Seção de Links Públicos Dinâmicos -->
            <HomePublicLinksPanel />
        </main>
    </div>
  </div>
</template>