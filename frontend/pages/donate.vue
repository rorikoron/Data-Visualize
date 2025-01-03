<script setup lang="ts">
import { ref, onMounted } from 'vue';

const form = ref<HTMLFormElement | null>(null); // フォームの参照
const recordTable = ref<HTMLTableElement | null>(null); // テーブルの参照

// フォーム入力のデータ
const name = ref<string>('');
const amount = ref<number | null>(null);
const purpose = ref<string>('');
const date = ref<string>('');

// レコードをサーバーに送信する関数
const postRecords = async () => {
    console.log('表单提交開始');

    const data = { 
        name: name.value, 
        amount: amount.value, 
        purpose: purpose.value, 
        date: date.value 
    };
    console.log('準備提交的數據:', data);

    try {
        const response = await fetch('http://localhost:8080/api/add', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
        
        console.log('服務器響應狀態:', response.status);
        
        if (response.ok) {
            console.log('數據提交成功');
            loadRecords();
            // フォームをリセット
            name.value = '';
            amount.value = null;
            purpose.value = '';
            date.value = '';
        } else {
            console.error('提交失敗，HTTP狀態碼:', response.status);
            alert('提交失敗');
        }
    } catch (error) {
        console.error('提交時發生錯誤:', error);
        alert('提交失敗');
    }
};

// サーバーからレコードを取得して表示する関数
async function loadRecords() {
    try {
        const response = await fetch('http://localhost:8080/api/records');
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const records = await response.json();
        console.log(records)
        // テーブルをクリア
        if (recordTable.value) {
            recordTable.value.innerHTML = ''; 
            // レコードをテーブルに追加
            records.forEach((record: { name: any; amount: any; purpose: any; date: any; }) => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td class="border p-2 text-left">${record.name}</td>
                    <td class="border p-2 text-left">${record.amount}</td>
                    <td class="border p-2 text-left">${record.purpose}</td>
                    <td class="border p-2 text-left">${record.date}</td>
                `;
                recordTable.value?.appendChild(row);
            });
        }
    } catch (error) {
        console.error('載入記錄時發生錯誤:', error);
        alert('載入記錄失敗');
    }
}

// マウント時にレコードをロード
onMounted(() => {
    loadRecords(); 
})
</script>

<template>
    <div class="font-mono text-gl w-full p-6">
        <h1>捐款紀錄</h1>
        <form @submit.prevent="postRecords" ref="form" class="flex flex-column gap-4 py-4 [&_input]:border">
            <label>
                姓名: <input type="text" v-model="name" required>
            </label>
            <label>
                金額: <input type="number" v-model="amount" required>
            </label>
            <label>
                用途:
                <select v-model="purpose">
                    <option value="自由樂捐 / 助養">自由樂捐 / 助養</option>
                    <option value="生理醫療">生理醫療</option>
                    <option value="狂犬病疫苗預防針施打">狂犬病疫苗預防針施打</option>
                </select>
            </label>
            <label>
                日期: <input type="date" v-model="date" required>
            </label>
            <button type="submit">提交</button>
        </form>

        <table class="w-full border-collapse">
            <thead>
                <tr class="text-left">
                    <th class="border-2 p-2">姓名</th>
                    <th class="border-2 p-2">金額</th>
                    <th class="border-2 p-2">用途</th>
                    <th class="border-2 p-2">日期</th>
                </tr>
            </thead>
            <tbody ref="recordTable" >
            </tbody>
        </table>
    </div>
</template>
