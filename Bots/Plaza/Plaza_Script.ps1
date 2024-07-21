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

$body = "new listings found on Plaza! See them here:
https://plaza.newnewnew.space/aanbod/wonen#?gesorteerd-op=prijs%2B&locatie=Delft-Nederland%2B-%2BZuid-Holland
See the details below:"
$contor = 0

$username = "rcodrin13@gmail.com"
$password = ConvertTo-SecureString "pykj ixbb mtms wovw" -AsPlainText -Force
$sendMailMessageSplat = @{
    From = "rcodrin13@gmail.com"
    To = "rcodrin13@gmail.com"
    Subject = "Plaza!" 
    Body = "Plazaaaaaa!!!"
    SmtpServer = "smtp.gmail.com"
    Port = 587
    Credential = New-Object System.Management.Automation.PSCredential -ArgumentList  $username, $password
    usessl = $true
    verbose = $true
}

Out-File ".\Bots\Plaza\Plaza_ids.txt"
foreach($room in $a.data) {
  $id = $room.id
  $strada = $room.street
  $nr = $room.housenumber
  $oras = $room.gemeentegeolocatienaam
  $available = $room.availablefromdate
  $area = $room.arealivingroom
  $publication = $room.publicationdate
  $rent = $room.totalrent
  $url = $room.urlkey
  #$id >> ".\Bots\Plaza\Plaza_ids.txt" # write to file
  if (!($integers -contains $id)){
    $contor += 1
    $body += "
    
Address: $strada $nr $oras
Available from: $available
Total area: $area
Published at: $publication
Total rent: $rent
Link: https://plaza.newnewnew.space/aanbod/huurwoningen/details/$url"
  }
}
$body = "$contor $body"

# Define the path to the Node.js executable and the JavaScript file
$nodePath = "C:\Program Files\nodejs\node.exe"  # Adjust this path if Node.js is installed elsewhere
$scriptPath = "./Server/mailService.js"          # Replace with the actual path to your script.js file

# Call the JavaScript file using Node.js and pass the arguments
& $nodePath $scriptPath $body
