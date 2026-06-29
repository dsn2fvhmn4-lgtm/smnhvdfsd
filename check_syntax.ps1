$bytes = [System.IO.File]::ReadAllBytes("C:\Users\Administrator\Desktop\sosi\site\assets\BHYsu9bl.js")
$text = [System.Text.Encoding]::UTF8.GetString($bytes)

$idx = $text.IndexOf('const A=[')
Write-Host "const A at: $idx"
$endA = $text.IndexOf('];', $idx)
Write-Host "]; at: $endA"
Write-Host "Segment:"
Write-Host $text.Substring($idx, $endA - $idx + 2)

# Also check the file looks valid by checking bracket balance
$openCurlies = 0
$closeCurlies = 0
for ($i = 0; $i -lt $text.Length; $i++) {
    if ($text[$i] -eq '{') { $openCurlies++ }
    if ($text[$i] -eq '}') { $closeCurlies++ }
}
Write-Host "Curlies: open=$openCurlies close=$closeCurlies"
Write-Host "Balanced: $(if ($openCurlies -eq $closeCurlies) { 'yes' } else { 'no' })"
