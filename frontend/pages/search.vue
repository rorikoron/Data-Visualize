<script setup lang="ts">
const dataStore = useDataStore();
const keyword = ref('');
const filteredData = ref<any[]>([])
onMounted(() => {
  dataStore.updateData();
})

watch(
  () => keyword.value,
  () => {
    filteredData.value = dataStore.data.filter((val, idx) => {
      const place_name = val['animal_place'] as string;
      return place_name.includes(keyword.value);
    })

  }
)
const updateData = () => {
}
</script>


<template>
  <div class="px-10 py-8">
    <UInput
      icon="i-heroicons-magnifying-glass-20-solid"
      size="sm"
      color="white"
      :trailing="false"
      v-model="keyword"
      placeholder="Search..."
    />

    <div class="px-2 py-6 grid gap-4">
      <div v-for="(data) in filteredData" class="rounded border">
        <div class="bg-slate-200 p-2">
          <h5 class="w-full pb-1 font-bold">{{ data['animal_place'] }}</h5>
          <h5 class="w-full text-xs text-stone-800">{{ data['animal_opendate'].replaceAll('-', '/') }} ID: {{ data['animal_id'] }}</h5>
        </div>
        <div class="p-4 grid gap-2">
          <h5 >地點: {{ data['animal_foundplace'] }}</h5>
          <h5>品種: {{ data['animal_Variety']}}</h5>
          <h5>毛色: {{ data['animal_colour']}}</h5>
        </div>

        <div class="pb-2 pl-2">
          <NuxtLink class="border-2 rounded px-4 py-1" :href="data['album_file']" target="_blank">觀看照片</NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>