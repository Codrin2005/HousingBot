# url for coresponding filters (DELFT)
$url = 'https://www.roomplaza.com/en/html/web/search/home?city=3&tenants=1'

# Get the html code
$response = Invoke-WebRequest -Uri $url
$htmlCode = $response.Content

# Construct array of exisiting ids
# Read the lines from the text file
$lines = Get-Content -Path ".\RoomPlaza_ids.txt"

# Initialize an empty array to store the integers
$integers = @()

# Loop through each line
foreach ($line in $lines) {
    # Try to parse the line as an integer
    $integers += $line
}

# Load the HTML content into an HtmlAgilityPack HtmlDocument
Add-Type -Path "C:\Users\Codrin\Downloads\htmlagilitypack.1.11.60\lib\NetCore45\HtmlAgilityPack.dll"
$htmlDocument = New-Object HtmlAgilityPack.HtmlDocument
$htmlDocument.LoadHtml($htmlCode)

# Select the elements of the specific class
$elements = $htmlDocument.DocumentNode.Descendants() | Where-Object { $_.GetAttributeValue('class', '') -eq 'apartment' }

# Prepare mail
$username = "rcodrin13@gmail.com"
$password = ConvertTo-SecureString "utxb ujbd tmoy qmxz" -AsPlainText -Force
$sendMailMessageSplat = @{
    From = "rcodrin13@gmail.com"
    To = "rcodrin13@gmail.com"
    Subject = "RoomPlaza!" 
    Body = "S-a pus anunt pe RoomPlaza!"
    SmtpServer = "smtp.gmail.com"
    Credential = New-Object System.Management.Automation.PSCredential -ArgumentList  $username, $password
    usessl = $true
    verbose = $true
}


# Check for new ids
Out-File ".\RoomPlaza_ids.txt"
foreach ($element in $elements) {
    $id = $element.GetAttributeValue("data-apartment-id", "-1") # get the id as string
    $id >> "./RoomPlaza_ids.txt" # write to file
    if (!($integers -contains $id)){
      $sendMailMessageSplat.To = "rcodrin13@gmail.com"
      #Send-MailMessage @sendMailMessageSplat
      $sendMailMessageSplat.To = "vlad.anicapopa@gmail.com"
      #Send-MailMessage @sendMailMessageSplat
    }
}