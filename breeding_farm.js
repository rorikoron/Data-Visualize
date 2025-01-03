    // 各縣市名稱
    let cities = [
        "台北市", "新北市", "桃園市", "台中市", "台南市", "高雄市", "基隆市", "新竹縣市", 
        "苗栗縣", "彰化縣", "南投縣", "雲林縣", "嘉義縣市", "屏東縣", "宜蘭縣", 
        "花蓮縣", "台東縣", "澎湖縣", "金門縣", "連江縣"
    ];

    // 各縣市2017年2月養殖場數量(根據寵物登記管理資訊網)
    let farms = [
        0,161,106,255,227,210,8,50,37,214,50,42,46,125,64,11,7,0,2,0
    ];

    let trace = {
        type: "bar",
        name: "合法養殖場數量",
        x: cities,
        y: farms,
        marker: {
            color: "orange"
        },
        text: farms,
        textfont: {
            family: "Arial",
            size: 12,
            color: "white"
        },
        textposition: "auto" // 顯示數值於柱狀圖上
    };

    let data = [trace];

    let layout = {
        width: 1000,
        height: 600,
        xaxis: {
            title: "縣市",
            tickangle: 45,
            tickfont: {
                family: "Arial",
                size: 15,
                color: "black"
            }
        },
        yaxis: {
            title: "合法養殖場數量"
        },
        title: "2024年各縣市合法養殖場數量"
    };

    Plotly.newPlot('myGraph', data, layout);

