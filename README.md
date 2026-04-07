# Massive OSINTX - Tactical Intelligence Suite

Massive OSINTX is a full-stack tactical intelligence and forensic platform. It uses a hybrid architecture to combine high-performance UI orchestration with real-world OSINT tools.

## 🛡️ Architecture: The Hybrid Approach

This project is not "just TypeScript." It follows a professional **Hybrid Architecture**:

1.  **Orchestration Layer (TypeScript/Next.js)**:
    -   Handles the high-speed, secure, and beautiful dashboard.
    -   Manages API routing, user authentication, and real-time UI updates.
    -   Acts as the "Control Center" that communicates with specialized intelligence nodes.

2.  **Intelligence & Tactical Layer (Multi-Lang Nodes)**:
    -   **Python**: Industry-standard for OSINT (`phonenumbers`, `holehe`).
    -   **Go**: High-performance concurrent networking and port scanning.
    -   **Rust**: Memory-safe, low-level data processing and forensics.
    -   **C++**: Native performance for heavy computational/cryptographic tasks.
    -   **PowerShell**: Deep system-level interrogation for Windows environments.
    -   These nodes reside in the `/scripts/` directory and are orchestrated by the Control Center.

## 🚀 Real-World Features (Implemented)

-   **Real Phone OSINT**: Uses the `phonenumbers` library to fetch actual carrier, location, and timezone data (not mocked).
-   **Email Interrogation**: Uses `holehe` to check email existence across hundreds of social platforms (Twitter, Instagram, LinkedIn, etc.).
-   **Network Reconnaissance**: Uses real system commands (`arp -a`) to discover devices on your actual local network.
-   **Tactical Lab**: A functional terminal that can execute real Python scripts and system commands.

## 🛠️ Setup

1.  **Node.js**: `npm install`
2.  **Python 3.12+**: `pip install -r requirements.txt`
3.  **Run**: `npm run dev`

## 📡 Lab Commands

In the Dashboard Lab, try these real-world commands:
- `osint-phone [number]` - Real phone intelligence (Python)
- `osint-email [email]` - Social platform email search (Python)
- `recon-net` - Actual local network scan (Python)
- `go-scan [target]` - High-speed concurrent scan (Go)
- `rust-analyze [data]` - Memory-safe forensic analysis (Rust)
- `cpp-analyze [data]` - High-performance native analysis (C++)
- `sys-forensics` - Deep system-level interrogation (PowerShell)
- `ping [host]` - Real ICMP ping from server
