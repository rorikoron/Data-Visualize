<script setup lang="ts">
import { ref, onMounted } from 'vue';
import * as d3 from 'd3';
import ChartViewer from "../components/ChartViewer.vue"
import { compileTemplate } from 'vue/compiler-sfc';

const geo_url = "taiwan_geo.json";
// エリアID
const areaID = {
    2: "臺北市",
    3: "新北市",
    4: "基隆市",
    5: "宜蘭縣",
    6: "桃園市",
    7: "新竹縣",
    8: "新竹市",
    9: "苗栗縣",
    10: "臺中市",
    11: "彰化縣",
    12: "南投縣",
    13: "雲林縣",
    14: "嘉義縣",
    15: "嘉義市",
    16: "臺南市",
    17: "高雄市",
    18: "屏東縣",
    19: "花蓮縣",
    20: "臺東縣",
    21: "澎湖縣",
    22: "金門縣",
    23: "連江縣",
};

type GeoJSONFeature = {
    type: string;
    properties: {
        COUNTYNAME: string;
        [key: string]: any;
    };
    geometry: {
        type: string;
        coordinates: any[];
    };
};

type GeoJSON = {
    type: string;
    features: GeoJSONFeature[];
};

// rows から指定したキーを抽出する関数
function unpack(rows: any[], key: string) {
    return rows.map(function (row) {
        return row[key];
    });
}

// 累積人数を計算する関数
const calcCumlativeNum = (rows: any[], geoData: string[]) => {
    let cumlativeNum = new Array(Object.keys(areaID).length).fill(0);

    rows.forEach((elem) => {
        const area = areaID[elem as keyof typeof areaID];
        const index = geoData.indexOf(area);
        if (index !== -1) {
            cumlativeNum[index]++;
        }
    });
    return cumlativeNum;
};

const data = ref<any>(undefined); // `data` を `ref` で管理
const layout = {
    paper_bgcolor: 'rgba(0, 0, 0, 0)',
    title: {
        text: "領養分布図",
        font: {
            size: 40,
            color: "#fff",
        },
        x: 0.5,
        y: 0.94,
    },
    geo: {
        center: {
            lon: 120.32,
            lat: 23.84,
        },
        fitbounds: "locations",
        projection: {
            type: "mercator",
        },
        resolution: 50,
    },
    padding:{
        t: 12,
        r: 12,
        b: 12,
        l: 12
    }
};
onMounted(() => {
    const dataStore = useDataStore();
    const fetchData = async () => {
        try {
            
            const updateData = () => {
                data.value = [{
                    type: "choropleth",
                    locationmode: "geojson-id",
                    featureidkey: "properties.COUNTYNAME",
                    locations: Object.values(areaID),
                    geojson: geo_data,
                    z: calcCumlativeNum(unpack(dataStore.data, 'animal_area_pkid'), geoArr),
                    autocolorscale: true
                }];
            }
            // initialize geo-datas
            const geo_data = await d3.json(geo_url) as GeoJSON;
            const geoArr = geo_data.features.map(({ properties }) => properties.COUNTYNAME);

            // first time check
            updateData();
            // if changed, update again
            watch(() => dataStore.data, () => {
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
    <div>
        <ChartViewer :data="toRaw(data)" :layout="layout" />
    </div>
</template>



<style scoped>
#myGraph {
    height: 600px;
    width: 100%;

    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    box-sizing: content-box;
}
</style>