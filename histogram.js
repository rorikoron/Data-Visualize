url = 'https://data.moa.gov.tw/Service/OpenData/TransService.aspx?UnitId=QcbUEzN6E6DL'
d3.json(url).then(res => {
    console.log(res);
    drawChart(res);
});

function unpack(rows, key) {
    return rows.map(function (row) {
        return row[key];
    });
}

function drawChart(res) {
    const today = new Date();
    let minx = null;
    let maxx = null;

    let animal_data = res.filter(item => item.animal_status && item.animal_opendate);

    animal_data.forEach(item => {
        item.animal_opendate = new Date(item.animal_opendate);
    });
    animal_data = animal_data.filter(item => item.animal_opendate.getFullYear() !== 1900);

    animal_data.forEach(item => {
        if (item.animal_opendate) {
            let diffTime = null;
            if(item.animal_opendate > today){
                item.animal_opendate = today;
            }
            diffTime = today - item.animal_opendate;
            const diffDays = Math.floor(diffTime / (1000 * 3600 * 24));
            item.count_opendate = Math.floor(diffDays / 7);
        }
    });
    minx = Math.ceil(Math.min(...animal_data.map(item => item.count_opendate))/20)*20-20;
    maxx = Math.ceil(Math.max(...animal_data.map(item => item.count_opendate))/20)*20+20;    

    let trace1 = {
        type: "histogram",
        name: "所有動物",
        y: unpack(animal_data,'count_opendate'),
        autobiny: false,
        ybins: {
            size: 20,
        },
    };
    //console.log(trace1.x)

    let data = [trace1];

    let layout = {
        margin: { t: 40 },
        yaxis: {
            range: [minx, maxx],
            title: "等待週數",
        },
        xaxis: {
            title: "動物數量"
        },
        bargap: 0.1,
    };

    Plotly.newPlot('myGraph', data, layout);
}