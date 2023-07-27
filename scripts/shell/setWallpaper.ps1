param([string]$imagePath, [string]$videoPath)

Add-Type -TypeDefinition @"
using System;
using System.Runtime.InteropServices;

public class Wallpaper {
    [DllImport("user32.dll", CharSet = CharSet.Auto)]
    public static extern int SystemParametersInfo(int uAction, int uParam, string lpvParam, int fuWinIni);

    [DllImport("user32.dll", SetLastError = true, CharSet = CharSet.Auto)]
    public static extern bool SystemParametersInfo(int uAction, int uParam, StringBuilder lpvParam, int init);

    public const int SPI_SETDESKWALLPAPER = 0x0014;
    public const int SPIF_UPDATEINIFILE = 0x01;
    public const int SPIF_SENDCHANGE = 0x02;

    public static void SetWallpaper(string path) {
        SystemParametersInfo(SPI_SETDESKWALLPAPER, 0, path, SPIF_UPDATEINIFILE | SPIF_SENDCHANGE);
    }

    public static string GetWallpaper() {
        const int MAX_PATH = 260;
        StringBuilder sb = new StringBuilder(MAX_PATH);
        SystemParametersInfo(0x73, MAX_PATH, sb, 0);
        return sb.ToString();
    }
}
"@

function SetVideoAsWallpaper([string]$videoPath) {
    $bionixPath = "C:\Program Files (x86)\BioniX Wallpaper\BioniX Wallpaper.exe"
    if (-Not (Test-Path $bionixPath)) {
        Write-Host "BioniX Wallpaper Changer not found at $bionixPath."
        Write-Host "Please install BioniX Wallpaper Changer and try again."
        return
    }

    Write-Host "Setting video as wallpaper..."
    Start-Process $bionixPath -ArgumentList "/play $videoPath /s1"
}

# Setting image as wallpaper
[Wallpaper]::SetWallpaper($imagePath)

# Getting the current wallpaper
$currentWallpaper = [Wallpaper]::GetWallpaper()
Write-Host "Current Wallpaper Path: $currentWallpaper"

# Setting video as wallpaper (You need to provide the video path below)
SetVideoAsWallpaper -videoPath "C:\path\to\your\video.mp4"
