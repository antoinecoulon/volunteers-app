<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui';

const config = useRuntimeConfig()
const route = useRoute()

const title = config.public.appName as string ?? 'Westill'

const items = computed<NavigationMenuItem[]>(() => [
  {
    label: 'Dashboard',
    to: '/',
    icon: 'i-lucide-home',
    active: route.path.startsWith('/')
  },
])
</script>


<template>
  <UHeader :title="title">
    <template #title>
      <h1>{{ title }}</h1>
    </template>

    <UNavigationMenu :items="items" />

    <template #right>
      <UColorModeButton />
    </template>

    <template #body>
      <UNavigationMenu :items="items" orientation="vertical" class="-mx-2.5" />
    </template>
  </UHeader>
</template>