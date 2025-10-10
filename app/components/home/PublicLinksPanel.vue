<script setup lang="ts">// Busca os dados da API de forma "lazy" (não bloqueia a navegação) e apenas no lado do cliente.const { data: links, pending, error } = useFetch('/api/links/public', {lazy: true,server: false,})</script><template><div class="container mx-auto"><!-- Cabeçalho --><div class="text-center mb-12"><h1 class="text-3xl sm:text-4xl font-bold tracking-tight text-[hsl(var(--foreground))]">Apps Farleir.com</h1><p class="mt-3 max-w-2xl mx-auto text-base text-[hsl(var(--muted-foreground))]">'Composição' de aplicativos úteis ou nem tanto, depende.</p></div><div class="max-w-7xl mx-auto">
  <!-- Estado de Carregamento (Skeletons) -->
  <div v-if="pending" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    <div v-for="i in 6" :key="i" class="h-20 bg-[hsl(var(--secondary))] rounded-xl animate-pulse" />
  </div>

  <!-- Estado de Erro -->
  <div
    v-else-if="error"
    class="text-center py-12 px-6 bg-red-900/20 border border-red-500/30 rounded-lg"
  >
    <svg xmlns="http://www.w3.org/2000/svg" class="mx-auto h-10 w-10 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
      <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
    </svg>
    <h3 class="mt-4 font-semibold text-red-200">
      Falha ao Carregar
    </h3>
    <p class="mt-2 text-sm text-red-300">
      Ocorreu um erro ao buscar os links. Por favor, tente novamente mais tarde.
    </p>
  </div>

  <!-- Conteúdo Carregado (Lista de Links) -->
  <div v-else-if="links && links.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    <HomePublicLinkItem
      v-for="link in links"
      :key="link.slug"
      :link="link"
    />
  </div>

  <!-- Mensagem para quando não houver links -->
  <div v-else class="text-center py-12 px-6 bg-[hsl(var(--secondary))] border border-[hsl(var(--border))] rounded-lg">
    <svg xmlns="http://www.w3.org/2000/svg" class="mx-auto h-10 w-10 text-[hsl(var(--muted-foreground))]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
      <path stroke-linecap="round" stroke-linejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
    </svg>
    <h3 class="mt-4 font-semibold text-[hsl(var(--foreground))]">
      Nenhum Link Público
    </h3>
    <p class="mt-2 text-sm text-[hsl(var(--muted-foreground))]">
      Ainda não há links marcados como públicos para exibição.
    </p>
  </div>
</div>
</div></template>
