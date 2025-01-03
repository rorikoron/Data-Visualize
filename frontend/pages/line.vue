<script setup lang="ts">
import { max } from 'd3';


// rows から指定したキーを抽出する関数
function unpack(rows: any[], key: string) {
    return rows.map(function (row) {
        return row[key];
    });
}

const data = ref<any>(undefined); // `data` を `ref` で管理
const layout = ref<any>(undefined);


onMounted(() => {
    const dataStore = useDataStore();
    const fetchData = async () => {
        try {
            const updateData = () => {

                let years = unpack(dataStore.data, 'cDate').map(function(date) {
                    return new Date(date).getFullYear();
                });

                let yearMap : any[] = [];
                years.forEach((year, index) => {
                    yearMap[year] = yearMap[year] || { cat: 0, dog: 0 };
                    if (dataStore.data[index].animal_kind === '貓') yearMap[year].cat++;
                    if (dataStore.data[index].animal_kind === '狗') yearMap[year].dog++;
                });

                let allYears = Object.keys(yearMap).map(Number).sort((a, b) => a - b);

                let catDataComplete : any[] = [], dogDataComplete : any[] = [];
                let catCumulative = 0, dogCumulative = 0;

                allYears.forEach(year => {
                    catCumulative += yearMap[year].cat;
                    dogCumulative += yearMap[year].dog;
                    catDataComplete.push(catCumulative);
                    dogDataComplete.push(dogCumulative);
                });

                data.value = [
                    {
                        type: "scatter",
                        mode: "lines+markers",
                        name: "貓的累積數量",
                        x: allYears,
                        y: catDataComplete,
                        line: { color: 'orange' }
                    },
                    {
                        type: "scatter",
                        mode: "lines+markers",
                        name: "狗的累積數量",
                        x: allYears,
                        y: dogDataComplete,
                        line: { color: 'blue' },
                        visible: false
                    }
                ];

                layout.value = {
                    title: "貓狗數量累積變化",
                    xaxis: { title: '年份', tickmode: 'array', tickvals: allYears },
                    yaxis: { title: '累積數量', range: [0, Math.max(...catDataComplete.concat(dogDataComplete))] },
                    updatemenus: [
                        {
                            buttons: [
                                { args: ['visible', [true, false]], label: '貓', method: 'restyle' },
                                { args: ['visible', [false, true]], label: '狗', method: 'restyle' },
                                { args: ['visible', [true, true]], label: '貓和狗', method: 'restyle' }
                            ],
                            direction: 'down',
                            x: 0.1, y: 1.1
                        }
                    ]
                };
            }
            updateData();
            watch(() => dataStore.data, () => {
                // 準備繪圖數據
                updateData();
            }, { deep: true })

        } catch (error) {
            console.error("データの取得に失敗しました:", error);
        }
    };
    fetchData();
});
</script>

<template>
    <ChartViewer :data="toRaw(data)" :layout="toRaw(layout)" />
</template>