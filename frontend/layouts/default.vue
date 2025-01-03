<script setup>
const news = [
    {
        value: "新聞事件和收容所動物數量關係",
        icon: "tabler:circles-relation",
        onClick: () => useRouter().push('/newsRelation')
    },
]

const city = [
    {
        value: "收容所貓狗數量",
        icon: "material-symbols:add-location-alt-outline",
        onClick: () => useRouter().push('/map')
    },{
        value: "養殖場數量",
        icon: "material-symbols:bar-chart",
        onClick: () => useRouter().push('/bar')
    },{
        value: "收容所貓狗數量",
        icon: "tdesign:chart-bubble",
        onClick: () => useRouter().push('/bubble')
    },
]

const integrate = [
    {
        value: "收容所貓狗累積數量",
        icon: "streamline:graph-arrow-increase",
        onClick: () => useRouter().push('/accumlate')
    },{
        value: "收容所貓狗等待領養週數",
        icon: "ep:histogram",
        onClick: () => useRouter().push('/histogram')
    },{
        value: "收容所動物品種佔比",
        icon: "tabler:chart-pie-2-filled",
        onClick: () => useRouter().push('/pie')
    },{
        value: "不同縣市收容所品種犬的佔比",
        icon: "material-symbols:bar-chart",
        onClick: () => useRouter().push('/city')
    },
]

const features = [
    {
        value: "搜尋",
        icon: "material-symbols:find-in-page-outline",
        onClick: () => useRouter().push('/search')
    },{
        value: "捐款",
        icon: "solar:hand-money-linear",
        onClick: () => useRouter().push('/donate')
    }
]
</script>

<template>
    <header class="bg-cool-900 flex items-center shadow">
        <div class="h-full w-full px-6 flex justify-between [&>*]:p-2 ">
            <span class="text-3xl tracking-wide text-slate-50 self-center">Plotly Project</span>
        </div>
    </header>
    <div class="h-full grid grid-cols-[max-content_minmax(0,1fr)]">
        <div class="h-full bg-slate-200 overflow-auto">
            <ButtonGroup :buttons="news" legend="新聞驗證"/>
            <ButtonGroup :buttons="city" legend="各縣市比較"/>
            <ButtonGroup :buttons="integrate" legend="綜合分析"/>
            <ButtonGroup :buttons="features" legend="功能"/>
        </div>
        <div class="p-4">
            <slot />
        </div>
    </div>
</template>