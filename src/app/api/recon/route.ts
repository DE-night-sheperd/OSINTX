import { NextResponse } from "next/server";

export async function GET() {
  // Simulate network reconnaissance by returning mock device data
  const mockDevices = [
    {
      id: "dev-001",
      name: "Office Printer",
      ipAddress: "192.168.1.100",
      macAddress: "00:1A:2B:3C:4D:5E",
      connectionType: "Ethernet",
      status: "online",
      lastSeen: new Date().toISOString(),
    },
    {
      id: "dev-002",
      name: "Sgt. Khumalo's Laptop",
      ipAddress: "192.168.1.101",
      macAddress: "00:A1:B2:C3:D4:E5",
      connectionType: "Wireless",
      status: "online",
      lastSeen: new Date().toISOString(),
    },
    {
      id: "dev-003",
      name: "Guest Tablet",
      ipAddress: "192.168.1.102",
      macAddress: "00:F1:E2:D3:C4:B5",
      connectionType: "Wireless",
      status: "online",
      lastSeen: new Date().toISOString(),
    },
    {
      id: "dev-004",
      name: "Server Rack 1",
      ipAddress: "192.168.1.10",
      macAddress: "00:11:22:33:44:55",
      connectionType: "Ethernet",
      status: "online",
      lastSeen: new Date().toISOString(),
    },
    {
      id: "dev-005",
      name: "Unknown Device",
      ipAddress: "192.168.1.103",
      macAddress: "00:AA:BB:CC:DD:EE",
      connectionType: "Wireless",
      status: "offline",
      lastSeen: new Date(Date.now() - 3600 * 1000).toISOString(), // 1 hour ago
    },
  ];

  return NextResponse.json(mockDevices, { status: 200 });
}
