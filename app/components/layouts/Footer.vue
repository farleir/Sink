<script setup>
import { GitHubIcon, XIcon, InstagramIcon, FacebookIcon, LinkedinIcon } from 'vue3-simple-icons'

const { title } = useAppConfig()

const socialLinks = [
  { name: 'LinkedIn', href: 'https://go.farleir.com/go-footer-linkedin', icon: LinkedinIcon },
  { name: 'Instagram', href: 'https://go.farleir.com/go-footer-instagram', icon: InstagramIcon },
  { name: 'Facebook', href: 'https://go.farleir.com/go-footer-facebook', icon: FacebookIcon },
  { name: 'X', href: 'https://go.farleir.com/go-footer-x', icon: XIcon },
  { name: 'GitHub', href: 'https://github.com/farleir/sink', icon: GitHubIcon },
]
</script>

<template>
  <section class="md:pt-6">
    <div class="container flex flex-col items-center py-8 mx-auto sm:flex-row">
      <a
        href="https://sink.cool"
        class="text-xl font-black leading-none text-gray-900 select-none dark:text-gray-100 logo"
        :title="title"
      >{{ title }}</a>
      <a
        class="mt-4 text-sm text-gray-500 sm:ml-4 sm:pl-4 sm:border-l sm:border-gray-200 sm:mt-0"
        href="https://html.zone"
        target="_blank"
        title="HTML.ZONE"
      >
        &copy; {{ new Date().getFullYear() }} Products of HTML.ZONE
      </a>
      <span
        class="inline-flex justify-center mt-4 space-x-5 sm:ml-auto sm:mt-0 sm:justify-start"
      >
        <a
          v-for="link in socialLinks"
          :key="link.name"
          :href="link.href"
          target="_blank"
          :title="link.name"
          class="text-gray-400 hover:text-gray-500"
        >
          <span class="sr-only">{{ link.name }}</span>
          <component :is="link.icon" class="w-6 h-6" />
        </a>
      </span>
    </div>
  </section>
</template>