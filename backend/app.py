from flask import Flask, render_template, request, jsonify
from flask_cors import CORS
import json
import os

app = Flask(__name__)
CORS(app)
# 定義 JSON 檔案路徑
DATA_FILE = 'data.json'

# 如果檔案不存在，創建一個空的 JSON 檔案
if not os.path.exists(DATA_FILE):
    with open(DATA_FILE, 'w', encoding='utf-8') as f:
        json.dump([], f, ensure_ascii=False, indent=4)

def load_records():
    """從 JSON 檔案讀取記錄"""
    with open(DATA_FILE, 'r', encoding='utf-8') as f:
        return json.load(f)

def save_records(records):
    """將記錄保存到 JSON 檔案"""
    with open(DATA_FILE, 'w', encoding='utf-8') as f:
        json.dump(records, f, ensure_ascii=False, indent=4)

@app.route('/api/add', methods=['POST'])
def add_record():
    try:
        # 獲取新記錄
        new_record = request.get_json()
        
        # 讀取現有記錄
        records = load_records()
        
        # 添加新記錄
        records.append(new_record)
        
        # 保存所有記錄
        save_records(records)
        
        return jsonify({'message': 'success'}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/records', methods=['GET'])
def get_records():
    try:
        records = load_records()
        return jsonify(records), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(port=8080, debug=True)
