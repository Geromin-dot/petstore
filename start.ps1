Write-Host "Starting Backend (Spring Boot) in a new window..." -ForegroundColor Cyan
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd backend; .\mvnw spring-boot:run"

Write-Host "Starting Frontend (React) in a new window..." -ForegroundColor Magenta
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd frontend; npm run dev"

Write-Host "Done! Both servers are starting up." -ForegroundColor Green
Write-Host "1. Wait a moment for them to initialize."
Write-Host "2. Your backend API will run on http://localhost:8080"
Write-Host "3. Open your browser to http://localhost:5173 to view the Petstore."
