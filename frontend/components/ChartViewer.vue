<script setup>
const props = defineProps({
    data: Array,
    layout: Object
});
watch(
    [() => props.data, () => props.layout],
    () => {
    Plotly.newPlot("chart", props.data, props.layout);
})
</script>

<template>
    <div id="chart" />
</template>
