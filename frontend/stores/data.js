
import { defineStore } from 'pinia';
import * as d3 from 'd3';
const data_url = "https://data.moa.gov.tw/Service/OpenData/TransService.aspx?UnitId=QcbUEzN6E6DL&IsTransData=1";
export const useDataStore = defineStore('data', () => {
  const data = ref([])

  const updateData = async () => {
    if(toRaw(data.value).length === 0){
      try{
        console.log("Loading Data...")
        const chart_data = await d3.json(data_url)
        data.value = chart_data;

        console.log("Content Loaded!")
        console.log(chart_data);

      }catch(error) {
        console.log("Failed to load data: ", error)
      }
    }
  }

  return {
    data,
    updateData,
  }
})