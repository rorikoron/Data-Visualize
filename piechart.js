d3.json('https://data.moa.gov.tw/Service/OpenData/TransService.aspx?UnitId=QcbUEzN6E6DL&IsTransData=1').then(res => {
    console.log('Fetched JSON:', res);

    // Extract specific column data
    function unpack(rows, key) {
        return rows.map(function (row) {
            return row[key] || 'Unknown'; // Handle missing or empty values
        });
    }

    // Use unpack to get animal_Variety data
    let varieties = unpack(res, 'animal_Variety');

    // Count occurrences of each variety
    let varietyCounts = {};
    varieties.forEach(variety => {
        varietyCounts[variety] = (varietyCounts[variety] || 0) + 1;
    });

    // Prepare data for the pie chart
    let labels = Object.keys(varietyCounts);
    let values = Object.values(varietyCounts);

    let trace1 = {
        type: "pie",
        title: "Animal Variety Distribution",
        labels: labels, // Labels for the chart
        values: values, // Corresponding values
        textinfo: 'percent+value', // Show both percentage and actual values
        hole:.4,
        textposition: 'inside', // Position the text inside the slices
    };

    let data = [trace1];

    let layout = {
        margin: {
            t: 30, // Top
            b: 20, // Bottom
            l: 50, // Left
            r: 50  // Right
        },
        text: 'Variety',
        title: "Animal Variety Distribution"
    };

    Plotly.newPlot("myGraph", data, layout);
}).catch(error => {
    console.error('Error fetching JSON:', error);
});
