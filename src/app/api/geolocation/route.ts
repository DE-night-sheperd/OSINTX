import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const ipAddress = searchParams.get("ip");

  if (!ipAddress) {
    return NextResponse.json({ message: "IP address is required" }, { status: 400 });
  }

  // Simulate geolocation data based on the IP address
  // In a real application, this would call an external IP geolocation service
  const mockGeolocationData = {
    ipAddress: ipAddress,
    country: "South Africa",
    city: "Johannesburg",
    latitude: -26.2041 + (ipAddress.charCodeAt(ipAddress.length - 1) % 10) / 100, // Simulate slight variation
    longitude: 28.0473 + (ipAddress.charCodeAt(ipAddress.length - 2) % 10) / 100, // Simulate slight variation
    isp: "Telkom SA",
    organization: "Government Cyber Security Agency",
    isProxy: ipAddress.endsWith(".254") ? true : false, // Example: IPs ending in .254 are proxies
    threatLevel: ipAddress.startsWith("10.") ? "HIGH" : "LOW", // Example: Internal IPs are high threat
  };

  return NextResponse.json(mockGeolocationData, { status: 200 });
}
