<script setup>
const props = defineProps({
    data: Array,
    layout: Object
});

// `props.data` が有効な場合のみ `Plotly.newPlot` を呼び出す
watch(() => props.data, (newData) => {
    console.log(newData);
    if (Array.isArray(newData) && newData.length > 0) {
        Plotly.newPlot("chart", newData, props.layout);
    }
}, { immediate: true });
</script>

<template>
    <div id="chart" />
</template>
