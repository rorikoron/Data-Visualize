/* Q1: 被捕捉的流浪動物的多寡是否會隨著人口多寡而呈正相關？
A1: 並無明顯相關，臺中就是個相反的例子。人口數位居全臺第二，但其捕捉的流浪動物數量（氣泡大小）卻並沒有因此較大，反而還比人口較少的縣市還要小。
Q2: 被捕捉的流浪動物多寡是否會隨著寵物店家數量而呈正相關？
A2: 相關性較小，高雄的氣泡大小居中，但其店家數量（y軸）卻是最高的。另外可以發現，都市化程度較高的地方，寵物店的數量幾乎都是前段班的，因此推論寵物店數量多寡（y軸）與各地人口多寡（x軸）較為相關。
*/

Promise.all([
    d3.json('https://data.moa.gov.tw/Service/OpenData/TransService.aspx?UnitId=fNT9RMo8PQRO&$top=1000&$skip=0')
        .catch(error => { console.error('Error fetching data from MOA:', error); throw error; }),
    d3.json('https://www.ris.gov.tw/rs-opendata/api/v1/datastore/ODRP048/106')
    .catch(error => { 
        console.error('Error fetching data from MOI:', error.message); 
        console.error(error); 
        throw error; 
    }),
    d3.json('https://data.moa.gov.tw/Service/OpenData/TransService.aspx?UnitId=QcbUEzN6E6DL&IsTransData=1')
    .catch(error => { 
        console.error('Error fetching data from MOI:', error.message); 
        console.error(error); 
        throw error; 
    }),
]).then(([res, peopleData, strayAnimalData]) => {
    console.log(res);
    console.log(peopleData);
    console.log(strayAnimalData);
    drawLineChart(res, peopleData, strayAnimalData);
}).catch(error => {
    console.error('Error fetching data:', error);
});

function unpack(rows, key) {
    return rows.map(function (row) {
        return row[key];
    });
};

function drawLineChart(res, peopleData, strayAnimalData) {

    console.log('MOA data in drawLineChart:', res);
    console.log('MOI data in drawLineChart:', peopleData);
    console.log('Stray Animal data in drawLineChart:', strayAnimalData);

// x-axis data (peopleData)
let cities = ["新北", "臺北", "桃園", "臺中", "臺南", "高雄", "宜蘭", "新竹", "苗栗", "彰化", "南投", "雲林", "嘉義", "屏東", "臺東", "花蓮", "澎湖", "基隆", "金門", "連江"];
let cityPopulations = [];
cities.forEach(city => {
    let cityData = peopleData.responseData.filter(value => value.site_id.includes(city));
    let cityPopSum = cityData.reduce((sum, value) => {
        return sum + parseInt(value.people_total, 10);
    }, 0);
    cityPopulations.push({ city: city, population: cityPopSum });
});

// 將陣列按人口數量排序
cityPopulations.sort((a, b) => a.population  - b.population);



// y-axis data (res)
let shops = ["新北", "臺北", "桃園", "臺中", "臺南", "高雄", "宜蘭", "新竹", "苗栗", "彰化", "南投", "雲林", "嘉義", "屏東", "臺東", "花蓮", "澎湖", "基隆", "金門", "連江"];
let shopsPopulations = [];
shops.forEach(shop => {
    let shopLoc = res.filter(value => value.legaladdress.includes(shop));
    let shopLocSum = shopLoc.length;
    shopsPopulations.push({ city: shop, cityShopNum: shopLocSum });
});

cityPopulations.forEach(cityItem => {
    let shopItem = shopsPopulations.find(shop => shop.city === cityItem.city); // 尋找對應城市
    if (shopItem) {
        cityItem.cityShopNum = shopItem.cityShopNum; // 添加 cityShopNum 到 cityPopulations
    } else {
        cityItem.cityShopNum = 0; // 如果沒有找到對應的數據，預設為 0
    }
});

console.log(cityPopulations);

// z-axis data (strayAnimalData)
let strayAnimals = ["新北", "臺北", "桃園", "臺中", "臺南", "高雄", "宜蘭", "新竹", "苗栗", "彰化", "南投", "雲林", "嘉義", "屏東", "臺東", "花蓮", "澎湖", "基隆", "金門", "連江"];
let strayAnimalsPopulations = [];
strayAnimals.forEach(strayAnimal => {
    let strayAnimalsLoc = strayAnimalData.filter(value => value.animal_place.includes(strayAnimal));
    let strayAnimalsSum = strayAnimalsLoc.length;
    strayAnimalsPopulations.push({ city: strayAnimal, cityStrayAnimalsNum: strayAnimalsSum });
});

cityPopulations.forEach(cityItem => {
    let strayItem = strayAnimalsPopulations.find(strayAnimal => strayAnimal.city === cityItem.city); // 尋找對應城市
    if (strayItem) {
        cityItem.strayAnimalsSum = strayItem.cityStrayAnimalsNum; // 添加 cityShopNum 到 cityPopulations
    } else {
        strayItem.strayAnimalsSum = 0; // 如果沒有找到對應的數據，預設為 0
    }
});
// 準備 x 軸和 y 軸數據
let xData = cityPopulations.map(item => item.city);
let yData = cityPopulations.map(item => item.cityShopNum);
let sizeData = cityPopulations.map(item => item.strayAnimalsSum);

console.log("排序後的縣市:", xData);
console.log("對應的商店數量:", yData);
console.log("對應的流浪動物數:", sizeData);

let trace = {
    mode: 'markers',
    name: "Bubble Chart",
    x: xData,
    y: yData,
    text: yData,
    marker: {
        size: sizeData,
        sizemode: 'area',
        sizeref: 2.0 * Math.max(...sizeData) / (40 ** 2), // 調整這個值來控制氣泡大小
        sizemin: 4
    },
    
   
    
    textfont:{
        family:"Arial",
        size:30,
        color:"black",
    }
    
};
let data = [trace];

let layout = {
    xaxis: {
        title: '縣市人口',
        automargin: true
    },
    yaxis: {
        title: '寵物店家數量', 
        automargin: true
    }
};

Plotly.newPlot('myGraph', data, layout);
}
