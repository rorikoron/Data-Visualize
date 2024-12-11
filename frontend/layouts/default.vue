<script setup>
const buttons = [
    {
        value: "地圖",
        icon: "material-symbols:add-location-alt-outline",
        onClick: () => useRouter().push('/map')
    },{
        value: "長條圖",
        icon: "material-symbols:bar-chart",
        onClick: () => useRouter().push('/bar')
    },{
        value: "折線圖",
        icon: "material-symbols:ssid-chart",
        onClick: () => useRouter().push('/line')
    },{
        value: "散點圖",
        icon: "tdesign:chart-scatter",
        onClick: () => useRouter().push('/scatter')
    },{
        value: "圓餅圖",
        icon: "bxs:pie-chart-alt-2",
        onClick: () => useRouter().push('/pie')
    },
]
const features = [
    {
        value: "搜尋",
        icon: "material-symbols:find-in-page-outline",
        onClick: () => useRouter().push('/search')
    }
]
</script>

<template>
    <header class="bg-cool-900 flex items-center shadow">
        <div class="h-full w-full px-6 flex justify-between [&>*]:p-2 ">
            <span class="text-3xl tracking-wide text-slate-50 self-center">Plotly Project</span>
        </div>
    </header>
    <div class="grid grid-cols-[max-content_minmax(0,1fr)]">
        <div class="h-full bg-slate-100">
            <ButtonGroup :buttons="buttons" legend="圖表"/>
            <ButtonGroup :buttons="features" legend="功能"/>
        </div>
        <slot />
    </div>
</template>