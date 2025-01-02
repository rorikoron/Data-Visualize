Promise.all([
  d3.json('https://data.moa.gov.tw/Service/OpenData/TransService.aspx?UnitId=DyplMIk3U1hf&IsTransData=1'),
  fetch('events.json').then(response => response.json())
])
.then(([data, eventsData]) => {
    console.log('Fetched events data:', eventsData); // 檢查事件數據
    
    const events = eventsData.events;
    
    // 使用 unpack 函數提取年份數據
    let rptYears = unpack(data, 'rpt_year');
    let sortedYears = Array.from(new Set(rptYears))
      .filter(year => year >= '102' && year <= '113')  // 只保留102-113年的數據
      .sort();

    // 創建年份-月份數據對象
    let yearMonthCounts = {};

    // 初始化年份-月份數據結構
    sortedYears.forEach(year => {
      yearMonthCounts[year] = {
        accept: {},    // 收容數據
        adopt: {}      // 領養數據
      };
      for(let month = 1; month <= 12; month++) {
        yearMonthCounts[year].accept[month] = 0;
        yearMonthCounts[year].adopt[month] = 0;
      }
    });

    // 填充每年每月的 accept_num 和 adopt_num 數據
    data.forEach(d => {
      const year = d.rpt_year;
      const month = parseInt(d.rpt_month);
      const acceptNum = parseInt(d.accept_num) || 0;
      const adoptNum = parseInt(d.adopt_num) || 0;
      
      if (yearMonthCounts[year] && month >= 1 && month <= 12) {
        yearMonthCounts[year].accept[month] += acceptNum;
        yearMonthCounts[year].adopt[month] += adoptNum;
      }
    });

    // 設置滑塊
    const dateSlider = document.getElementById("date-range");
    const dateDisplay = document.getElementById("selected-date");

    // 設置滑塊範圍
    dateSlider.min = 0;
    dateSlider.max = sortedYears.length - 1;
    dateSlider.value = 0;

    function updateChart() {
      const selectedYearIndex = parseInt(dateSlider.value);
      const selectedYear = sortedYears[selectedYearIndex].toString(); // 將 selectedYear 轉換為字串
      dateDisplay.textContent = `選擇的年份: ${selectedYear}年`;

      console.log('Selected Year:', selectedYear);
      console.log('Available events:', events);
      
      // 找出當前年份的事件
      const currentYearEvents = events.filter(event => {
        console.log('Comparing:', event.year, selectedYear, event.year === selectedYear);
        return event.year === selectedYear; // 現在比較應該正確
      });
      console.log('Events for year', selectedYear, ':', currentYearEvents);

      const monthLabels = ['1月', '2月', '3月', '4月', '5月', '6月', 
                          '7月', '8月', '9月', '10月', '11月', '12月'];

      // 定義 layout 變數
      const layout = {
        title: `${selectedYear}年動物收容與領養數量統計`,
        xaxis: {
          title: '月份',
          tickangle: -45
        },
        yaxis: {
          title: '數量'
        },
        margin: {
          t: 50,
          b: 100,
          l: 50
        }
      };

      // 收容數據
      const acceptTrace = {
        type: 'scatter',
        mode: 'lines+markers',
        name: '收容數量',
        x: monthLabels,
        y: monthLabels.map((_, index) => yearMonthCounts[selectedYear].accept[index + 1] || 0),
        line: {
          color: 'rgb(158,202,225)',
          width: 2
        },
        marker: {
          size: 8,
          color: 'rgb(158,202,225)'
        }
      };

      // 領養數據
      const adoptTrace = {
        type: 'scatter',
        mode: 'lines+markers',
        name: '領養數量',
        x: monthLabels,
        y: monthLabels.map((_, index) => yearMonthCounts[selectedYear].adopt[index + 1] || 0),
        line: {
          color: 'rgb(255,127,14)',
          width: 2
        },
        marker: {
          size: 8,
          color: 'rgb(255,127,14)'
        }
      };

      // 事件標記 - 重新設計
      const yearEvents = events.filter(event => event.year === selectedYear);
      console.log('Events for year', selectedYear, ':', yearEvents); // 調試用

      if (yearEvents.length > 0) {  // 只在有事件時創建 trace
        const eventTrace = {
          type: 'scatter',
          mode: 'markers+text',
          name: '重要事件',
          x: yearEvents.map(event => `${event.month}月`),
          y: yearEvents.map(event => {
            const monthValue = Math.max(
              yearMonthCounts[selectedYear].accept[event.month],
              yearMonthCounts[selectedYear].adopt[event.month]
            );
            return monthValue + (monthValue * 0.2); // 提高到數據點上方20%的位置
          }),
          text: yearEvents.map(() => '⭐重要事件'), // 添加文字說明
          textposition: 'top center',
          marker: {
            size: 25,  // 更大的標記
            symbol: 'star',
            color: '#FFD700',
            line: {
              color: '#000',
              width: 2
            }
          },
          hoverinfo: 'text',
          hovertext: yearEvents.map(event => 
            `📅 ${event.year}年${event.month}月${event.day}日\n📢 ${event.text}`
          ),
          hoverlabel: {
            bgcolor: '#FFF',
            bordercolor: '#000',
            font: {size: 16}
          }
        };

        // 使用三個 trace
        Plotly.react("myGraph", [acceptTrace, adoptTrace, eventTrace], layout);
      } else {
        // 如果沒有事件，只顯示收容和領養數據
        Plotly.react("myGraph", [acceptTrace, adoptTrace], layout);
      }
    }

    // 初始圖表顯示
    updateChart();

    // 監聽滑塊變化
    dateSlider.addEventListener("input", updateChart);
})
.catch(err => {
    console.error('Error loading data:', err);
    console.error('Error details:', err.stack);
});

function unpack(rows, key) {
  return rows.map(function(row) {
    return row[key] || 'Unknown';
  });
}