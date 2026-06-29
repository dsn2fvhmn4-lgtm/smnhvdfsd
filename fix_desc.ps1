$bytes = [System.IO.File]::ReadAllBytes("C:\Users\Administrator\Desktop\sosi\site\assets\BHYsu9bl.js")
$text = [System.Text.Encoding]::UTF8.GetString($bytes)
$idx = $text.IndexOf('desc:"klimori - ')
if ($idx -ge 0) {
    $start = [Math]::Max(0, $idx - 50)
    $end = [Math]::Min($text.Length, $idx + 150)
    $safe = ""
    for ($j = $start; $j -lt $end; $j++) {
        $c = $text[$j]
        if ($c -ge ' ' -and $c -le '~') {
            $safe += $c
        } else {
            $safe += '.'
        }
    }
    Write-Host $safe
} else {
    Write-Host "not found"
}
