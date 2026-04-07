// src/lib/audit-log.ts

export enum AuditLogEvent {
  LOGIN_SUCCESS = "LOGIN_SUCCESS",
  LOGIN_FAILURE = "LOGIN_FAILURE",
  // Add more event types as needed, e.g.,
  // USER_CREATED = "USER_CREATED",
  // USER_DELETED = "USER_DELETED",
  // DATA_ACCESSED = "DATA_ACCESSED",
  // CONFIG_CHANGED = "CONFIG_CHANGED",
}

interface AuditLogEntry {
  timestamp: string;
  event: AuditLogEvent;
  userId?: string; // The ID of the user who performed the action
  ipAddress?: string; // IP address from which the action originated
  details?: Record<string, unknown>; // Additional context for the event
  outcome: "SUCCESS" | "FAILURE";
}

/**
 * Logs an audit event.
 * In a real-world application, this would write to a secure, persistent, and tamper-resistant log store.
 * This could be:
 * - A dedicated logging service (e.g., AWS CloudWatch, Azure Monitor, Splunk)
 * - A secure database table
 * - A file system with integrity checks and rotation
 *
 * For this demonstration, we will log to the console.
 *
 * @param entry The audit log entry to record.
 */
export function auditLog(entry: AuditLogEntry) {
  const logMessage = `AUDIT_LOG: [${entry.timestamp}] [${entry.event}] User: ${entry.userId || "N/A"} | IP: ${entry.ipAddress || "N/A"} | Outcome: ${entry.outcome} | Details: ${JSON.stringify(entry.details)}`;
  console.log(logMessage);

  // TODO: In a production environment, implement actual secure logging to a persistent store.
  // Example:
  // saveToDatabase(entry);
  // sendToLoggingService(entry);
}

/**
 * Helper function to get the current timestamp in ISO format.
 */
export function getTimestamp(): string {
  return new Date().toISOString();
}
