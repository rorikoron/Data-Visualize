
import { defineStore } from 'pinia';
import { ref } from 'vue'
import * as d3 from 'd3';
const data_url = "https://data.moa.gov.tw/Service/OpenData/TransService.aspx?UnitId=QcbUEzN6E6DL&IsTransData=1";
export const useDataStore = defineStore('data', () => {
  const data = ref<any[]>([])
  const isLoading = ref<boolean>(false)

  const updateData = async () => {
    if (isLoading.value) return;
    
    isLoading.value = true;
    try{
      console.log("Loading Data...")
      const chart_data = await d3.json(data_url) as any[];
      data.value = chart_data;

      console.log("Content Loaded!")
      console.log(chart_data);

    }catch(error) {
      console.log("Failed to load data: ", error)
    }finally{
      isLoading.value = false;
    }
  }

  return {
    data,
    updateData,
  }
})