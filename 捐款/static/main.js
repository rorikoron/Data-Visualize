const form = document.getElementById('donationForm');
const recordTable = document.getElementById('recordTable');

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    console.log('表單提交開始');

    const name = document.getElementById('name').value;
    const amount = document.getElementById('amount').value;
    const purpose = document.getElementById('purpose').value;
    const date = document.getElementById('date').value;

    const data = { name, amount, purpose, date };
    console.log('準備提交的數據:', data);

    try {
        const response = await fetch('/add', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
        
        console.log('服務器響應狀態:', response.status);
        
        if (response.ok) {
            console.log('數據提交成功');
            loadRecords();
            form.reset();
        } else {
            console.error('提交失敗，HTTP狀態碼:', response.status);
            alert('提交失敗');
        }
    } catch (error) {
        console.error('提交時發生錯誤:', error);
        alert('提交失敗');
    }
});

async function loadRecords() {
    try {
        const response = await fetch('/records');
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const records = await response.json();
        recordTable.innerHTML = '';
        records.forEach(record => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${record.name}</td>
                <td>${record.amount}</td>
                <td>${record.purpose}</td>
                <td>${record.date}</td>
            `;
            recordTable.appendChild(row);
        });
    } catch (error) {
        console.error('載入記錄時發生錯誤:', error);
        alert('載入記錄失敗');
    }
}

loadRecords(); 