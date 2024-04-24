#$json = Get-Content 'C:\Docker\input\codrin.json' | Out-String
$json = Get-Content 'C:\Users\Codrin\Plaza_bot\plaza_listings.json' | Out-String
$url = "https://mosaic-plazaapi.hexia.io/api/v1/actueel-aanbod?limit=60&locale=nl_NL&page=0&sort=%2BreactionData.aangepasteTotaleHuurprijs"

$webreq = Invoke-RestMethod -Uri $url -Method Post -Body $json  -ContentType "application/json"


$a = $webreq.ToLower() | ConvertFrom-Json
#$a = $webreq
write-host $a.data.Length

$username = "rcodrin13@gmail.com"
$password = ConvertTo-SecureString "utxb ujbd tmoy qmxz" -AsPlainText -Force
$sendMailMessageSplat = @{
    From = "rcodrin13@gmail.com"
    To = "rcodrin13@gmail.com"
    Subject = "Plaza!" 
    Body = "Plazaaaaaa!!!"
    SmtpServer = "smtp.gmail.com"
    Credential = New-Object System.Management.Automation.PSCredential -ArgumentList  $username, $password
    usessl = $true
    verbose = $true
}

write-host $a.data[0].id

#if ($a.data.length -ne 0) {
  #  Send-MailMessage @sendMailMessageSplat
#}