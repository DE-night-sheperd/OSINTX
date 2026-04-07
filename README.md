# Massive OSINTX - Tactical Intelligence Suite

Massive OSINTX is a full-stack tactical intelligence and forensic platform. It uses a hybrid architecture to combine high-performance UI orchestration with real-world OSINT tools.

## 🛡️ Architecture: The Hybrid Approach

This project is not "just TypeScript." It follows a professional **Hybrid Architecture**:

1.  **Orchestration Layer (TypeScript/Next.js)**:
    -   Handles the high-speed, secure, and beautiful dashboard.
    -   Manages API routing, user authentication, and real-time UI updates.
    -   Acts as the "Control Center" that communicates with specialized intelligence nodes.

2.  **Intelligence & Tactical Layer (Python)**:
    -   Uses industry-standard libraries like `phonenumbers`, `holehe`, and `scapy`.
    -   Performs the actual "real-life" work: scanning networks, searching social platforms, and interrogating telecom databases.
    -   These scripts reside in the `/scripts/` directory and are executed by the Orchestration Layer.

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
- `osint-phone [number]`
- `osint-email [email]`
- `recon-net`
- `ping [host]`
