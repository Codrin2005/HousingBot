$json = Get-Content '.\Bots\Plaza\plaza_listings.json' | Out-String
$url = "https://mosaic-plazaapi.hexia.io/api/v1/actueel-aanbod?limit=60&locale=nl_NL&page=0&sort=%2BreactionData.aangepasteTotaleHuurprijs"
$webreq = Invoke-RestMethod -Uri $url -Method Post -Body $json  -ContentType "application/json"

$a = $webreq.ToLower() | ConvertFrom-Json

# Construct array of exisiting ids
# Read the lines from the text file
$lines = Get-Content -Path ".\Bots\Plaza\Plaza_ids.txt"

# Initialize an empty array to store the integers
$integers = @()

# Loop through each line
foreach ($line in $lines) {
    # Try to parse the line as an integer
    $integers += $line
}

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

Out-File ".\Bots\Plaza\Plaza_ids.txt"
foreach($room in $a.data) {
  $id = $room.id
  $id >> ".\Bots\Plaza\Plaza_ids.txt" # write to file
  if (!($integers -contains $id)){
    #Send-MailMessage @sendMailMessageSplat
    write-host "hello"
  }
}
#one-time email to admin for dev-testing purposes
Send-MailMessage @sendMailMessageSplat