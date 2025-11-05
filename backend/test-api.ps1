# Test API Endpoints

$baseUrl = "http://localhost:3004/api/users"

Write-Host "`n========== Testing Register Endpoint ==========" -ForegroundColor Cyan

$registerBody = @{
    name = "John Doe"
    email = "john@example.com"
    password = "password123"
} | ConvertTo-Json

$registerResponse = Invoke-RestMethod -Uri "$baseUrl/register" -Method POST -Body $registerBody -ContentType "application/json"
Write-Host "Register Response:" -ForegroundColor Green
$registerResponse | ConvertTo-Json

# Save token
$token = $registerResponse.data.token

Write-Host "`n========== Testing Login Endpoint ==========" -ForegroundColor Cyan

$loginBody = @{
    email = "john@example.com"
    password = "password123"
} | ConvertTo-Json

$loginResponse = Invoke-RestMethod -Uri "$baseUrl/login" -Method POST -Body $loginBody -ContentType "application/json"
Write-Host "Login Response:" -ForegroundColor Green
$loginResponse | ConvertTo-Json

# Update token from login
$token = $loginResponse.data.token

Write-Host "`n========== Testing Protected Profile Endpoint ==========" -ForegroundColor Cyan

$headers = @{
    "Authorization" = "Bearer $token"
}

$profileResponse = Invoke-RestMethod -Uri "$baseUrl/profile" -Method GET -Headers $headers
Write-Host "Profile Response:" -ForegroundColor Green
$profileResponse | ConvertTo-Json

Write-Host "`n========== All Tests Completed! ==========" -ForegroundColor Green
