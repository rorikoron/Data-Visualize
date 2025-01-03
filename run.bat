cd ./frontend
npm install
start cmd /k "npm run dev"
cd ../backend
call .\backend\plotly\Scripts\activate
start cmd /k "python app.py"