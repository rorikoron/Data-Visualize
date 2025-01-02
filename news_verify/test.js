// 引入 d3-fetch 包
const d3 = require('d3-fetch');

// 使用 d3 获取 JSON 数据
d3.json('https://data.moa.gov.tw/Service/OpenData/TransService.aspx?UnitId=DyplMIk3U1hf&IsTransData=1')
  .then(res => {
    console.log('Fetched JSON:', res);

    // 筛选出 rpt_year = 100 的记录
    const filteredData = res.filter(d => d.rpt_year === 100);

    console.log('Filtered Data with rpt_year = 100:', filteredData);

    // 现在您可以基于 filteredData 继续进行数据处理
    // 例如：
    // - 更新图表
    // - 提取月份数据
    // - 等等
  });
