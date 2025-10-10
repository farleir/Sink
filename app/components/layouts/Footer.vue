<script setup lang="ts">const { t } = useI18n()const appConfig = useAppConfig()</script><template><footer class="border-t border-border/50"><div class="container mx-auto px-4"><div class="flex flex-col flex-wrap py-8 md:flex-row md:items-center md:justify-between"><!-- Seção Esquerda: Copyright --><div class="flex flex-col items-center md:items-start"><NuxtLink to="/" class="flex items-center font-semibold"><NuxtImg src="/icon.png" class="mr-2 h-8 w-8" /><span class="text-xl">{{ appConfig.name }}</span></NuxtLink><p class="mt-2 text-center text-sm text-muted-foreground md:text-left">Copyright © {{ new Date().getFullYear() }} {{ appConfig.name }}.<br class="md:hidden">{{ t('footer.copyright') }}</p></div>    <!-- Seção Direita: Redes Sociais -->
    <div class="mt-6 flex justify-center space-x-6 md:mt-0">
      <!-- Twitter (X) -->
      <a href="https://x.com/farleir" target="_blank" rel="noopener noreferrer" class="text-muted-foreground transition-colors hover:text-foreground">
        <span class="sr-only">Twitter</span>
        <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      </a>
      <!-- Instagram -->
      <a href="https://instagram.com/farleir" target="_blank" rel="noopener noreferrer" class="text-muted-foreground transition-colors hover:text-foreground">
        <span class="sr-only">Instagram</span>
        <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path fill-rule="evenodd" d="M12.315 2c-2.43 0-2.784.011-3.808.06-1.064.049-1.791.218-2.427.465a4.902 4.902 0 00-1.772 1.153 4.902 4.902 0 00-1.153 1.772c-.247.636-.416 1.363-.465 2.427-.048 1.024-.06 1.378-.06 3.808s.011 2.784.06 3.808c.049 1.064.218 1.791.465 2.427a4.902 4.902 0 001.153 1.772 4.902 4.902 0 001.772 1.153c.636.247 1.363.416 2.427.465 1.024.048 1.378.06 3.808.06s2.784-.011 3.808-.06c1.064-.049 1.791-.218 2.427-.465a4.902 4.902 0 001.772-1.153 4.902 4.902 0 001.153-1.772c.247-.636.416-1.363.465-2.427.048-1.024.06-1.378.06-3.808s-.011-2.784-.06-3.808a6.784 6.784 0 00-.465-2.427 4.902 4.902 0 00-1.153-1.772A4.902 4.902 0 0018.63.52c-.636-.247-1.363-.416-2.427-.465C15.099 2.011 14.745 2 12.315 2zm0 1.625c2.378 0 2.67.01 3.616.052.88.04 1.448.196 1.84.344.446.166.79.378.14.72a3.284 3.284 0 011.08 1.08c.342.342.554.694.72 1.14.148.392.302.96.344 1.84.042.946.052 1.238.052 3.616s-.01 2.67-.052 3.616a4.341 4.341 0 01-.344 1.84 3.284 3.284 0 01-.72 1.14 3.284 3.284 0 01-1.08 1.08c-.446.166-.79.378-1.14.72-.392.148-.96.302-1.84.344-.946.042-1.238.052-3.616.052s-2.67-.01-3.616-.052a4.341 4.341 0 01-1.84-.344 3.284 3.284 0 01-1.14-.72 3.284 3.284 0 01-1.08-1.08 3.284 3.284 0 01-.72-1.14c-.148-.392-.302-.96-.344-1.84-.042-.946-.052-1.238-.052-3.616s.01-2.67.052-3.616c.04-.88.196-1.448.344-1.84.166-.446.378-.79.72-1.14a3.284 3.284 0 011.08-1.08c.342-.342.694-.554 1.14-.72.392-.148.96-.302 1.84-.344.946-.042 1.238-.052 3.616-.052zM12 6.865a5.135 5.135 0 100 10.27 5.135 5.135 0 000-10.27zm0 8.622a3.487 3.487 0 110-6.974 3.487 3.487 0 010 6.974zM18.15 6.32a1.2 1.2 0 11-2.4 0 1.2 1.2 0 012.4 0z" clip-rule="evenodd" />
        </svg>
      </a>
      <!-- LinkedIn -->
      <a href="https://linkedin.com/in/farleir" target="_blank" rel="noopener noreferrer" class="text-muted-foreground transition-colors hover:text-foreground">
        <span class="sr-only">LinkedIn</span>
        <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path fill-rule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clip-rule="evenodd" />
        </svg>
      </a>
      <!-- GitHub -->
      <a href="https://github.com/farleir" target="_blank" rel="noopener noreferrer" class="text-muted-foreground transition-colors hover:text-foreground">
        <span class="sr-only">GitHub</span>
        <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path fill-rule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.168 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.031-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.03 1.595 1.03 2.688 0 3.848-2.338 4.695-4.566 4.942.359.308.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.578.688.482A10.001 10.001 0 0022 12c0-5.523-4.477-10-10-10z" clip-rule="evenodd" />
        </svg>
      </a>
    </div>
  </div>
</div>
</footer></template>
