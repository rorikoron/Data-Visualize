<script setup>
import * as d3 from 'd3';
const url = 'https://data.moa.gov.tw/Service/OpenData/TransService.aspx?UnitId=QcbUEzN6E6DL'
d3.json(url).then(res => {
    drawChart(res);
});


function unpack(rows, key) {
    return rows.map(function (row) {
        return row[key];
    });
}

function drawChart(res) {
    let areas = ["臺北市","新北市","基隆市","宜蘭縣","桃園市",
        "新竹縣","新竹市","苗栗縣","臺中市","彰化縣",
        "南投縣","雲林縣","嘉義縣","嘉義市","臺南市",
        "高雄市","屏東縣","花蓮縣","臺東縣","澎湖縣","金門縣","連江縣"];
    let aVariety = [...new Set(unpack(res,"animal_Variety"))];
    aVariety.sort();
    console.log(aVariety);
    let nPureBredDog = [aVariety[29],aVariety[30]];
    let nPureBredCat = [aVariety[31], aVariety[32]];
    let PureBredCat = [aVariety[8],aVariety[37],aVariety[42],aVariety[44],aVariety[45],aVariety[50]];
    let BredRabbit = [aVariety[28],aVariety[33],aVariety[52]];
    let OtherBred = [aVariety[0], aVariety[2], aVariety[6], aVariety[17]];
    
    let excludePureBredDog = [...nPureBredDog,...nPureBredCat,...PureBredCat,...BredRabbit,...OtherBred];

    let trace1 = {
        type: "histogram",name:"品種狗",
        x: unpack(res.filter(a => !excludePureBredDog.includes(a.animal_Variety)),"animal_area_pkid").sort(),
        opacity: 0.8,marker:{ color:"#ff7f0e" },
        textfont: {
            family: "Arial",
            size: 20,
            color:"brown"
        },
    };
    trace1.text = areas.map(function(area,i){
        let total = res.filter(a => a.animal_area_pkid == i+2);
        let y = total.filter(a => !excludePureBredDog.includes(a.animal_Variety)).length;
        total = total.length
        return Math.round(y*100/total) + '%';
    });

    let trace2 = {
        type: "histogram",name:"混種狗",
        x: unpack(res.filter(a => nPureBredDog.includes(a.animal_Variety)),"animal_area_pkid").sort(),
        opacity: 0.8,marker:{ color:"#1f77b4" },
    };
    let trace3 = {
        type: "histogram",name:"混種貓",
        x: unpack(res.filter(a => nPureBredCat.includes(a.animal_Variety)),"animal_area_pkid").sort(),
        opacity: 0.8,marker:{ color:"#2ca02c" }
    };
    let trace4 = {
        type: "histogram",name:"品種貓",
        x: unpack(res.filter(a => PureBredCat.includes(a.animal_Variety)),"animal_area_pkid").sort(),
        opacity: 0.8,marker:{ color:"#9467bd" }
    };
    let trace5 = {
        type: "histogram",name:"兔子",
        x: unpack(res.filter(a => BredRabbit.includes(a.animal_Variety)),"animal_area_pkid").sort(),
        opacity: 0.8,marker:{ color:"#e377c2" }
    };
    let trace6 = {
        type: "histogram",name:"其他",
        x: unpack(res.filter(a => OtherBred.includes(a.animal_Variety)),"animal_area_pkid").sort(),
        opacity: 0.8,marker:{ color:"#8c564b" },
    };

    let data = [trace1,trace2,trace3,trace4,trace5,trace6];
    data.reverse();


    let layout = {
        margin: { t: 40 },barmode:"stack",
        xaxis: {
            title: "所在縣市",
            tickvals: areas.map((a,i) => i+2),
            ticktext: areas,
        },
        yaxis: {
            title: "動物數量"
        },
        bargap: 0.1,
        
    };

    Plotly.newPlot('myGraph', data, layout);

}

</script>

<template>
    <div id="myGraph"></div>
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