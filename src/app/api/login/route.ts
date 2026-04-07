import { NextResponse } from "next/server";
import { auditLog, AuditLogEvent, getTimestamp } from "@/lib/audit-log";

export async function POST(request: Request) {
  const { securityId, password } = await request.json();
  const ipAddress = request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || request.ip;

  // For demonstration purposes, we'll use hardcoded credentials.
  // In a real application, you would validate these against a database
  // and implement proper password hashing and secure session management.
  if (securityId === "SA-SEC-001" && password === "securepass") {
    auditLog({
      timestamp: getTimestamp(),
      event: AuditLogEvent.LOGIN_SUCCESS,
      userId: securityId,
      ipAddress: ipAddress || "N/A",
      outcome: "SUCCESS",
      details: { message: "User authenticated successfully" },
    });
    return NextResponse.json({ message: "Authentication successful" }, { status: 200 });
  } else {
    auditLog({
      timestamp: getTimestamp(),
      event: AuditLogEvent.LOGIN_FAILURE,
      userId: securityId,
      ipAddress: ipAddress || "N/A",
      outcome: "FAILURE",
      details: { message: "Invalid credentials provided" },
    });
    return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
  }
}
