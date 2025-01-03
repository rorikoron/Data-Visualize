<script setup>
const props = defineProps({
    data: Array,
    layout: Object
});
const chartElement = ref(null);
const renderChart = () => {
    console.log(props.data)
    console.log(props.layout)
    console.log(chartElement.value)
    if (chartElement.value && props.data && props.layout) {
        Plotly.newPlot(chartElement.value, props.data, {
            ...props.layout,
            autosize: true, // 自動サイズ調整
        });
        // 親要素いっぱいにする
        chartElement.value.style.width = "100%";
        chartElement.value.style.height = "100%";
        Plotly.Plots.resize(chartElement.value);
    }
}
onMounted(() => {
    renderChart()
});

// プロパティが変更された場合に再描画
watch(
    [() => props.data, () => props.layout],
    () => {
        renderChart()
    },
    { immediate: true }
);
</script>

<template>
    <div id="myGraph" class="p-4">
        <div ref="chartElement" v-show="props.data && props.layout"/>
        <div v-show="!(props.data && props.layout)" id="suspence" class="text-slate-200 text-2xl">
            <h4>Fetching Data...</h4>
            <h4>Please wait a second...</h4>
        </div>
    </div>
</template>
