d3.json('https://data.moa.gov.tw/Service/OpenData/TransService.aspx?UnitId=QcbUEzN6E6DL&IsTransData=1')
    .then(res => {
        
        function unpack(rows, key) {
            return rows.map(function(row) {
                return row[key];
            });
        }

        let years = unpack(res, 'cDate').map(function(date) {
            return new Date(date).getFullYear();
        });

        let yearMap = {};
        years.forEach((year, index) => {
            yearMap[year] = yearMap[year] || { cat: 0, dog: 0 };
            if (res[index].animal_kind === '貓') yearMap[year].cat++;
            if (res[index].animal_kind === '狗') yearMap[year].dog++;
        });

        let allYears = Object.keys(yearMap).map(Number).sort((a, b) => a - b);

        let catDataComplete = [], dogDataComplete = [];
        let catCumulative = 0, dogCumulative = 0;

        allYears.forEach(year => {
            catCumulative += yearMap[year].cat;
            dogCumulative += yearMap[year].dog;
            catDataComplete.push(catCumulative);
            dogDataComplete.push(dogCumulative);
        });

        let data = [
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

        let layout = {
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

        Plotly.newPlot("myGraph", data, layout);
    })
    .catch(function(error) {
        console.error('Error:', error);
    });
