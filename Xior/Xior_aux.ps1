$session = New-Object Microsoft.PowerShell.Commands.WebRequestSession
$session.Cookies.Add((New-Object System.Net.Cookie("cf_clearance", "ebXapvOPbk8ZK7LGxMyiAqVIjg1bleFsXbXCyLk5Ta8-1714735146-1.0.1.1-gABHUCAxmZ4x_Eps3BUXK0a5ngnyYasCFT3DJCx5q5ACI5MxSqzjmkP5eNW3LylKQjsEvUK.8PAVkM1WmgyMog", "/", "www.xior-booking.com")))
$session.Cookies.Add((New-Object System.Net.Cookie("_gcl_au", "1.1.1887396562.1714652838", "/", "www.xior-booking.com")))
$session.Cookies.Add((New-Object System.Net.Cookie("_ga_GEX19MWJWP", "GS1.1.1714735144.3.1.1714736295.0.0.0", "/", "www.xior-booking.com")))
$session.Cookies.Add((New-Object System.Net.Cookie("_ga", "GA1.1.1964679449.1714652839", "/", "www.xior-booking.com")))
$session.Cookies.Add((New-Object System.Net.Cookie("XSRF-TOKEN", "eyJpdiI6ImpFbEpsRnRQNVVsWFNNNjZ5WWJ1cXc9PSIsInZhbHVlIjoib3hRZTJjRTFOLzBrVEFkNXFKWGU5b1IzNTYrWitaTTIzbWlmTGJBTjZ4OUhxSjFBS3hJdWU4bm5uTzBSM2RqdTZIRUlXS2ViOFBSUjA4MlpCZjE1eVBacGQ5a3lTQk9TZzN0VVdYNHZZcStjQjFkWENSYm1oRjFUb3ZhcEFPUFEiLCJtYWMiOiI1NGY5ZTlhNzllMTFlYmI5N2NhNzVmZGU0ZDlkYTZhNzRkMzgxY2FhNTRhZmIzYWYyOWJhYjljODkxMjZmODM3In0=", "/", "www.xior-booking.com")))
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
  "X-CSRF-TOKEN" = "hUlrAb1b6k8KWBmelEns6lRb3Qw264XDGmtPN7Br"
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