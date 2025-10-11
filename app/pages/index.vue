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

// --- LÓGICA DO PAINEL PRINCIPAL ---
const links = ref([]);
const isLoading = ref(true);
const error = ref(null);

onMounted(async () => {
  try {
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
    --accent: 240 4.8% 92.9%; /* Levemente mais escuro para melhor contraste no hover */
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
        </main>

        <!-- Rodapé com Links de Redes Sociais -->
        <footer class="text-center mt-16 py-6 border-t border-[hsl(var(--border))]">
            <div class="flex justify-center items-center space-x-4">
                <a href="https://go.farleir.com/linkedin" target="_blank" rel="noopener noreferrer" class="text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] transition-colors">
                    <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                </a>
                <a href="https://go.farleir.com/instagram" target="_blank" rel="noopener noreferrer" class="text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] transition-colors">
                    <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.85s-.011 3.585-.069 4.85c-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07s-3.585-.012-4.85-.07c-3.252-.148-4.771-1.691-4.919-4.919-.058-1.265-.07-1.645-.07-4.85s.012-3.585.07-4.85c.148-3.225 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.85-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948s.014 3.667.072 4.947c.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072s3.667-.014 4.947-.072c4.358-.2 6.78-2.618 6.98-6.98.059-1.281.073-1.689.073-4.948s-.014-3.667-.072-4.947c-.2-4.358-2.618-6.78-6.98-6.98-1.281-.059-1.689-.073-4.948-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.162 6.162 6.162 6.162-2.759 6.162-6.162-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4s1.791-4 4-4 4 1.79 4 4-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.441 1.441 1.441 1.441-.645 1.441-1.441-.645-1.44-1.441-1.44z"/></svg>
                </a>
                <a href="https://go.farleir.com/facebook" target="_blank" rel="noopener noreferrer" class="text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] transition-colors">
                    <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.323-1.325z"/></svg>
                </a>
                <a href="https://go.farleir.com/x" target="_blank" rel="noopener noreferrer" class="text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] transition-colors">
                    <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.617l-5.21-6.817-6.044 6.817h-3.308l7.73-8.805-7.993-10.69h6.761l4.638 6.235 5.56-6.235zm-2.45 18.3h1.36l-10.743-14.12h-1.2l10.583 14.12z"/></svg>
                </a>
            </div>
        </footer>
    </div>
  </div>
</template>