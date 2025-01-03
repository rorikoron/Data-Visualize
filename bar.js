document.addEventListener("DOMContentLoaded", () => {
    // 使用 Fetch API 從遠端取得資料
    fetch("https://data.moa.gov.tw/Service/OpenData/TransService.aspx?UnitId=QcbUEzN6E6DL&IsTransData=1")
        .then(response => response.json()) // 將回應轉換為 JSON 格式
        .then(data => {
            // 初始化 N, T, F 的累積計數
            const bacterinCounts = { N: 0, T: 0, F: 0 };

            // 遍歷每一筆資料，累加數量
            data.forEach(record => {
                const status = record.animal_bacterin; // 確保對應正確欄位
                if (bacterinCounts[status] !== undefined) {
                    bacterinCounts[status]++;
                }
            });

            // 準備繪圖數據
            const plotData = [
                {
                    x: Object.keys(bacterinCounts), // 橫軸項目 ['N', 'T', 'F']
                    y: Object.values(bacterinCounts), // 縱軸數據 [countN, countT, countF]
                    type: 'bar',
                    marker: {
                        color: ['#4CAF50', '#2196F3', '#FFC107'] // 顏色
                    }
                }
            ];

            // 設定圖表布局
            const layout = {
                title: 'Animal Bacterin Counts',
                xaxis: { title: 'Bacterin Status' },
                yaxis: { title: 'Count' }
            };

            // 繪製圖表
            Plotly.newPlot('myGraph', plotData, layout);
        })
        .catch(error => {
            console.error("Error fetching or processing data:", error);
        });
});