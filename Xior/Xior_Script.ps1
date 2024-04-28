$session = New-Object Microsoft.PowerShell.Commands.WebRequestSession
$session.UserAgent = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36"
$session.Cookies.Add((New-Object System.Net.Cookie("_gcl_au", "1.1.874344883.1708001376.1054306118.1714051566.1714051619", "/", ".xior-booking.com")))
$session.Cookies.Add((New-Object System.Net.Cookie("cf_clearance", "fRyGG1vb1Cw6HYyv1jj7G1GKg.2SeMcMvUCB_UsMwPw-1714303836-1.0.1.1-NquA9hSXTB_.cA8k7alYITPCs3U_Mftl4LVvAj4NE7CL8Mc1fK_4Mvpif8yMLYDwV1SnBRhQtMl9tAZMpkC3Zg", "/", ".xior-booking.com")))
$session.Cookies.Add((New-Object System.Net.Cookie("_gid", "GA1.2.1851346071.1714303837", "/", ".xior-booking.com")))
$session.Cookies.Add((New-Object System.Net.Cookie("_ga_GEX19MWJWP", "GS1.1.1714303836.9.1.1714304321.0.0.0", "/", ".xior-booking.com")))
$session.Cookies.Add((New-Object System.Net.Cookie("_ga", "GA1.2.994904621.1708001377", "/", ".xior-booking.com")))
$session.Cookies.Add((New-Object System.Net.Cookie("XSRF-TOKEN", "eyJpdiI6IlBpL0U3Qm5DYktXZDVRTXFTMXhmSlE9PSIsInZhbHVlIjoiNTNSc2pmQTVVSzNqOENkUEtJR3k3V2JGTS9BVko2OGtxUTJRQnJNLzgvTGhRcFBxOEVyK1FERWpSSVlFTG1KNkxmVHh3R1pORElIUVp5ci9nRVozK1FQdWNSZXVMaFNzUXozTnFJSTF5WktYSUlYeWxmV0I0OG1HZGJ4UC8zWXkiLCJtYWMiOiIzMGZlYmMyNDk0OGY0MzBlNmU4MDAwOWJlNWExNDEwYWY4YTEwYmM5NzExYjcwMDQwOGRjNjgzNmM0NmJhY2FkIn0%3D", "/", "www.xior-booking.com")))
$session.Cookies.Add((New-Object System.Net.Cookie("laravel_session", "eyJpdiI6Im4yVk4wbmU3M1lSK1BsNlVjVXV5SEE9PSIsInZhbHVlIjoibTVyNisrRDNBbXJRSzluczlsN2M5azFCd011azk3aTQwbGdQV1dBcXovUldOUndqVVdoQmEzWTZRVnlKTTJEWmdvNkJvK05oc0xNeFFFUmZXNzduWWEyd1l6VHpkcnRzYTBqSEp5UWxHZGhIbkRpZEFGUk9wRUlGK2s3aE82WkgiLCJtYWMiOiI2YjZjOTMzYzVhMmViY2NlZjkwM2ZmZjc0ZjczYjNiMTMxMGNkNjJhZWU3ZmRlMDc2ZGYxNDdhNjNiNjBhNDY3In0%3D", "/", "www.xior-booking.com")))
$result = Invoke-WebRequest -UseBasicParsing -Uri "https://www.xior-booking.com/ajax/space-search" `
-Method "POST" `
-WebSession $session `
-Headers @{
"authority"="www.xior-booking.com"
  "method"="POST"
  "path"="/ajax/space-search"
  "scheme"="https"
  "accept"="application/json, text/javascript, */*; q=0.01"
  "accept-encoding"="gzip, deflate, br, zstd"
  "accept-language"="en-US,en;q=0.9,ro;q=0.8"
  "origin"="https://www.xior-booking.com"
  "priority"="u=1, i"
  "referer"="https://www.xior-booking.com/"
  "sec-ch-ua"="`"Chromium`";v=`"124`", `"Google Chrome`";v=`"124`", `"Not-A.Brand`";v=`"99`""
  "sec-ch-ua-mobile"="?0"
  "sec-ch-ua-platform"="`"Windows`""
  "sec-fetch-dest"="empty"
  "sec-fetch-mode"="cors"
  "sec-fetch-site"="same-origin"
  "x-csrf-token"="3NSkU1aqpMmvWzSSGEq271uuQbm9W7pverhzdMSU"
  "x-requested-with"="XMLHttpRequest"
} `
-ContentType "application/x-www-form-urlencoded; charset=UTF-8" `
-Body "country=528&city=21&location=&space_type=&min_price=0&max_price=6180&min_surface=10&max_surface=116&order=&unlock_key=&page=1&pagination=true"

write-host($result.space_count)