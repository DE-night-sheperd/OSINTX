import sys
import json
import subprocess
import re

def get_network_devices():
    try:
        # Run arp -a to get local network devices
        # This is a common method for local recon on Windows
        result = subprocess.check_output(["arp", "-a"], universal_newlines=True)
        
        devices = []
        # Parse output for IP and MAC addresses
        # Format: 192.168.1.1       00-00-00-00-00-00     dynamic
        pattern = re.compile(r'(\d+\.\d+\.\d+\.\d+)\s+([a-f0-9-]+)\s+(dynamic|static)')
        
        for line in result.splitlines():
            match = pattern.search(line.strip())
            if match:
                ip, mac, type = match.groups()
                # Skip loopback and common multicast
                if not ip.startswith('224.') and not ip.startswith('239.') and ip != '255.255.255.255':
                    devices.append({
                        "id": f"dev-{len(devices)+1:03d}",
                        "name": "Discovered Device",
                        "ipAddress": ip,
                        "macAddress": mac.replace('-', ':').upper(),
                        "connectionType": "Ethernet" if type == "static" else "Wireless",
                        "status": "online",
                        "lastSeen": "Live"
                    })
        
        return devices

    except Exception as e:
        return {"error": str(e)}

if __name__ == "__main__":
    print(json.dumps(get_network_devices()))
