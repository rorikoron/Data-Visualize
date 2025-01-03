<script setup lang="ts">
import { ref, provide } from 'vue';
import * as d3 from 'd3';
</script>

<template>
  <div class="overflow-x-hidden grid grid-rows-[80px_minmax(0,1fr)] bg-cool-50">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>

</template>
