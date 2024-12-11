<script setup lang="ts">
import * as d3 from 'd3';
import { useDataStore } from '~/stores/data';

onMounted(() => {
    const dataStore = useDataStore();
        // perform your async operation here
    const fetchData = async () => {
        dataStore.updateData();
    };
    fetchData();
});
</script>

<template>
    
</template>