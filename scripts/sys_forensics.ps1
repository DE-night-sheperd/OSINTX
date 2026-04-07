# ForensicOS Tactical PowerShell Module
# Performs deep system-level interrogation for suspicious processes, network connections, and security configurations.

function Get-ForensicData {
    param (
        [string]$Target = "localhost"
    )

    $results = @{
        "engine" = "PowerShell (Core)"
        "system_info" = @{
            "os" = (Get-CimInstance Win32_OperatingSystem).Caption
            "uptime" = (New-TimeSpan -Start (Get-CimInstance Win32_OperatingSystem).LastBootUpTime -End (Get-Date)).ToString()
        }
        "active_ports" = (Get-NetTCPConnection | Select-Object LocalAddress, LocalPort, State | Select-Object -First 5)
        "suspicious_processes" = (Get-Process | Where-Object { $_.CPU -gt 100 -or $_.Company -eq $null } | Select-Object Name, Id, CPU | Select-Object -First 5)
        "firewall_status" = (Get-NetFirewallProfile -Name Domain,Public,Private | Select-Object Name, Enabled)
    }

    return $results | ConvertTo-Json -Depth 5
}

if ($args.Count -gt 0) {
    Get-ForensicData -Target $args[0]
} else {
    Get-ForensicData
}
