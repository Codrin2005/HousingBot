$session = New-Object Microsoft.PowerShell.Commands.WebRequestSession
$session.Cookies.Add((New-Object System.Net.Cookie("cf_clearance", "E8mcNOcpW44wE33GnX2AUrF5ZetMkss9dJEzBLuZY4U-1714652838-1.0.1.1-4KK75M5GSVhajvYqux4u6O42yZJaHfBanK9T0GQ2ryqqfj70_xlDKXNTw08lk6e5wf9cU0c_ycFOzyKl5A4euw", "/", "www.xior-booking.com")))
$session.Cookies.Add((New-Object System.Net.Cookie("_gcl_au", "1.1.1887396562.1714652838", "/", "www.xior-booking.com")))
$session.Cookies.Add((New-Object System.Net.Cookie("_ga_GEX19MWJWP", "GS1.1.1714652838.1.1.1714652878.0.0.0", "/", "www.xior-booking.com")))
$session.Cookies.Add((New-Object System.Net.Cookie("_ga", "GA1.1.1964679449.1714652839", "/", "www.xior-booking.com")))
$response = Invoke-WebRequest -UseBasicParsing -Uri "https://www.xior-booking.com/" `
-WebSession $session `
-UserAgent "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:125.0) Gecko/20100101 Firefox/125.0" `
-Headers @{
"Accept" = "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8"
  "Accept-Language" = "en-US,en;q=0.5"
  "Accept-Encoding" = "gzip, deflate, br"
  "DNT" = "1"
  "Sec-GPC" = "1"
  "Upgrade-Insecure-Requests" = "1"
  "Sec-Fetch-Dest" = "document"
  "Sec-Fetch-Mode" = "navigate"
  "Sec-Fetch-Site" = "none"
  "Sec-Fetch-User" = "?1"
}

# Get the 'set-cookie' header
$cookies = $response.Headers['set-cookie']

# Split the cookies into an array
$cookieArray = $cookies -split ', '

# Find the XSRF-TOKEN
$xsrfToken = $cookieArray | Where-Object { $_ -like 'XSRF-TOKEN=*' }

# Extract the value of the XSRF-TOKEN
$xsrfTokenValue = $xsrfToken -replace 'XSRF-TOKEN=', ''

# Print the value of the XSRF-TOKEN
$xsrfTokenValueFinal = $xsrfTokenValue -split ';' -replace '%3D', '=' | Select-Object -First 1
$xsrfTokenValueFinal

$session = New-Object Microsoft.PowerShell.Commands.WebRequestSession
$session.Cookies.Add((New-Object System.Net.Cookie("cf_clearance", "ebXapvOPbk8ZK7LGxMyiAqVIjg1bleFsXbXCyLk5Ta8-1714735146-1.0.1.1-gABHUCAxmZ4x_Eps3BUXK0a5ngnyYasCFT3DJCx5q5ACI5MxSqzjmkP5eNW3LylKQjsEvUK.8PAVkM1WmgyMog", "/", "www.xior-booking.com")))
$session.Cookies.Add((New-Object System.Net.Cookie("_gcl_au", "1.1.1887396562.1714652838", "/", "www.xior-booking.com")))
$session.Cookies.Add((New-Object System.Net.Cookie("_ga_GEX19MWJWP", "GS1.1.1714735144.3.1.1714736295.0.0.0", "/", "www.xior-booking.com")))
$session.Cookies.Add((New-Object System.Net.Cookie("_ga", "GA1.1.1964679449.1714652839", "/", "www.xior-booking.com")))
$session.Cookies.Add((New-Object System.Net.Cookie("XSRF-TOKEN", $xsrfTokenValueFinal, "/", "www.xior-booking.com")))
$session.Cookies.Add((New-Object System.Net.Cookie("laravel_session", "eyJpdiI6IjJsQmVNaXRTcXpkUy9HUS9HWEtnQmc9PSIsInZhbHVlIjoiQldRcWFod0ZPU0dtTnZtWjRFWWVEbUdmclZmblROdEp5WDZac3U2QmlBcFFTbXp3N0NLcUg3bHdkRHFYWnpXM0Ria3dsVVFRK0lsVEdEa29EallMZkg2VDJWY0VUYTB2VXR1aTVzQ1JVb2hrOTlqSGFaeHNIcWs0WmQvVXNmQ2kiLCJtYWMiOiI2MWU3MzZjMGFkZGMxYzQ1NTA4YjEyMjI0Y2YyZWIyNGM1N2IwYTRhYzQ0MGVlMGNkMTE4YjcyYWQwZjI1YmY1In0=", "/", "www.xior-booking.com")))
Invoke-WebRequest -UseBasicParsing -Uri "https://www.xior-booking.com/ajax/space-search" `
-Method POST `
-WebSession $session `
-UserAgent "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:125.0) Gecko/20100101 Firefox/125.0" `
-Headers @{
"Accept" = "application/json, text/javascript, */*; q=0.01"
  "Accept-Language" = "en-US,en;q=0.5"
  "Accept-Encoding" = "gzip, deflate, br"
  "Referer" = "https://www.xior-booking.com/"
  "X-Requested-With" = "XMLHttpRequest"
  "Origin" = "https://www.xior-booking.com"
  "DNT" = "1"
  "Sec-GPC" = "1"
  "Sec-Fetch-Dest" = "empty"
  "Sec-Fetch-Mode" = "cors"
  "Sec-Fetch-Site" = "same-origin"
  "TE" = "trailers"
} `
-ContentType "application/x-www-form-urlencoded; charset=UTF-8" `
-Body "country=&city=&location=&space_type=&min_price=0&max_price=6180&min_surface=10&max_surface=116&order=&unlock_key=&page=1&pagination=false"