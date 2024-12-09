<script setup>
import { ref, provide } from 'vue';
import * as d3 from 'd3';

</script>

<template>
  <div class="w-dvw h-dvh overflow-hidden grid grid-rows-[80px_minmax(0,1fr)] bg-cool-700">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>

</template>
