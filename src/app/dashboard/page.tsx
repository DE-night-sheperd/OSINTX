"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import Image from "next/image";
import { 
  Shield, 
  Terminal, 
  Search, 
  Activity, 
  Cpu, 
  Fingerprint, 
  Zap, 
  Globe, 
  Database, 
  Lock, 
  Wifi, 
  Radio, 
  Download, 
  Eye, 
  User, 
  Share2, 
  Monitor, 
  Hash, 
  Camera, 
  Target, 
  Mic, 
  Server,
  EyeOff,
  RefreshCcw,
  Scan,
  Pause,
  Play,
  Trash2,
  Gavel,
  AlertCircle,
  X,
  CheckCircle2,
  LogOut,
  Smartphone,
  MapPin,
  AlertTriangle,
  Phone,
  FileText
} from "lucide-react";
import { cn } from "@/lib/utils";
import { DeviceRecord } from "@/lib/mock-data";
import { useRouter } from "next/navigation";

// Extended interface for Advanced Forensic, OSINT & Intelligence Data
interface ForensicRecord extends DeviceRecord {
  signalDb: number;
  imei: string;
  imsi: string;
  networkNode: string;
  biometricSync: boolean;
  digitalFootprint: {
    socialHandles: { platform: string; handle: string; lastActivity: string }[];
    leakedPasswordsCount: number;
    mentions: string[];
    webMentions: { title: string; source: string; date: string }[];
    deviceHistory: { device: string; lastUsed: string; location: string }[];
  };
  visualIntel: {
    lastCctvNode: string;
    subjectCaptureUrl: string;
    clothingIntel: string;
    facialMatchScore: number;
  };
  identityIndex?: {
    callerId: string;
    confidence: number;
    tags: string[];
    isSpam: boolean;
    lastReported: string;
    reportCount: number;
    associatedEmail?: string;
    workplace?: string;
    portingHistory?: { date: string; from: string; to: string }[];
    sources: { name: string; type: string; confidence: number }[];
  };
  financialIntel: {
    lastMerchant: string;
    transactionType: string;
    bankNode: string;
    timestamp: string;
    status: string;
  };
  satelliteRelay: {
    satName: string;
    uplinkFreq: string;
    downlinkFreq: string;
    orbitalSlot: string;
  };
  // Network Agent & Protocol Layer
  networkAgent: {
    agentId: string;
    status: "ACTIVE" | "INJECTING" | "STRIPPING" | "COMPLETED";
    protocols: { protocol: string; status: "STRIPPED" | "DETECTED" | "BYPASSED"; layer: number; responseTime: number }[];
    strippedInfo: { deviceType: string; manufacturer: string; os: string; macAddress: string; chipset: string };
    networkType: "LAN" | "VPN" | "WAN" | "Tor" | "Proxy" | "Mesh" | "Satellite";
    localIp: string;
    publicIp: string;
    gateway: string;
    dns: string[];
    connectivity: "Wireless (802.11ax)" | "Ethernet (RJ45/CAT6)" | "Cellular (5G/LTE)";
    uplinkSpeed: string;
  };
  // Tactical Intelligence Layer (Hats & Manhunt)
  tacticalIntel: {
    hatZone: "WHITE" | "BLUE" | "RED" | "BLACK";
    threatLevel: "LOW" | "ELEVATED" | "CRITICAL" | "EXTREME";
    manhuntStatus: "STANDBY" | "ACTIVE_PURSUIT" | "TARGET_ACQUIRED" | "SIGNAL_LOST";
    towerProximity: {
      distanceMeters: number;
      closestTowerId: string;
      sectorId: string;
      triangulationConfidence: number;
    };
    activeHacks: string[];
  };
  // SIGINT & Predictive Layer
  sigint: {
    voicePrintId: string;
    audioInterceptUrl: string;
    neuralGraphNodes: { id: string; label: string; type: "person" | "organization" | "location"; connection: string }[];
    predictiveVector: { lat: number; lng: number; heading: number; confidence: number };
    anprHit: { plate: string; make: string; color: string; confidence: number } | null;
  };
}

export default function Dashboard() {
  const [activeView, setActiveView] = useState<"interceptor" | "osint" | "map" | "lab">("interceptor");
  const [searchQuery, setSearchQuery] = useState("");
  const [liveResult, setLiveResult] = useState<ForensicRecord | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [isBruteForcing, setIsBruteForcing] = useState(false);
  const [pingCallStatus, setPingCallStatus] = useState<"idle" | "dialing" | "ringing" | "intercepted" | "failed">("idle");
  const [twilioCreds, setTwilioCreds] = useState({ sid: "", token: "", from: "" });
  const [osintKeys, setOsintKeys] = useState({ numverify: "", abstract: "" });
  const [showConfig, setShowConfig] = useState(false);
  const [showDossier, setShowDossier] = useState(false);
  const [showWarrant, setShowWarrant] = useState(false);
  const [warrantId, setWarrantId] = useState("");
  const [hasSearched, setHasSearched] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [history, setHistory] = useState<string[]>([]);
  const [logs, setLogs] = useState<{ id: string; msg: string; time: string; type: "info" | "success" | "warning" | "error" | "cmd" | "live" }[]>([]);
  
  const eqHeights = useMemo(() => {
    const seedStr = liveResult?.sigint.voicePrintId || "seed";
    const seed = Array.from(seedStr).reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
    return Array.from({ length: 18 }, (_, i) => {
      const v = Math.sin(seed + i) * 0.5 + 0.5; // 0..1
      return Math.round(20 + v * 80); // 20%..100%
    });
  }, [liveResult?.sigint.voicePrintId]);

  // Advanced Forensic Lab (Termux Engine) State
  const [labLogs, setLabLogs] = useState<{ id: string; msg: string; type: "input" | "output" | "error" | "success" | "system" }[]>([
    { id: "1", msg: "ForensicOS Tactical Lab v4.0.2", type: "system" },
    { id: "2", msg: "Type 'help' for available forensic tools.", type: "system" }
  ]);
  const [installedTools, setInstalledTools] = useState<string[]>(["base-system", "core-utils"]);
  const [labInput, setLabInput] = useState("");
  const [customScripts, setCustomScripts] = useState<{ name: string; content: string }[]>([]);
  const [targetOverrides, setTargetOverrides] = useState<{ number: string; name: string }[]>([]);
  const [editingFile, setEditingFile] = useState<string | null>(null);
  const [editingContent, setEditingContent] = useState("");
  const labScrollRef = useRef<HTMLDivElement>(null);
  const [targetGeolocation, setTargetGeolocation] = useState<{ lat: number; lng: number; city: string; country: string; isProxy: boolean; threatLevel: string } | null>(null);

  const scrollRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  useEffect(() => {
    if (labScrollRef.current) {
      labScrollRef.current.scrollTop = labScrollRef.current.scrollHeight;
    }
  }, [labLogs]);

  useEffect(() => {
    const fetchGeolocation = async () => {
      if (liveResult?.networkAgent?.publicIp) {
        try {
          const response = await fetch(`/api/geolocation?ip=${liveResult.networkAgent.publicIp}`);
          const data = await response.json();
          if (response.ok) {
            setTargetGeolocation({
              lat: data.latitude,
              lng: data.longitude,
              city: data.city,
              country: data.country,
              isProxy: data.isProxy,
              threatLevel: data.threatLevel,
            });
          } else {
            console.error("Failed to fetch geolocation:", data.message);
            setTargetGeolocation(null);
          }
        } catch (error) {
          console.error("Error fetching geolocation:", error);
          setTargetGeolocation(null);
        }
      } else {
        setTargetGeolocation(null);
      }
    };

    fetchGeolocation();
  }, [liveResult?.networkAgent?.publicIp]);

  const addLog = (msg: string, type: "info" | "success" | "warning" | "error" | "cmd" | "live" = "info") => {
    const newLog = {
      id: Math.random().toString(36).substr(2, 9),
      msg,
      time: new Date().toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      type
    };
    setLogs(prev => [...prev, newLog]);
  };

  const handleLabCommand = async (e: React.FormEvent) => {
    e.preventDefault();
    const cmdInput = labInput.trim();
    if (!cmdInput) return;

    const newLogs = [...labLogs, { id: Math.random().toString(), msg: `$ ${labInput}`, type: "input" as const }];
    setLabLogs(newLogs);
    setLabInput("");

    const parts = cmdInput.split(" ");
    const baseCmd = parts[0].toLowerCase();
    const args = parts.slice(1);

    // List of commands that should hit the REAL backend
    const realCommands = ["osint-phone", "osint-email", "recon-net", "ping", "whois"];

    if (realCommands.includes(baseCmd)) {
      setLabLogs(prev => [...prev, { id: Math.random().toString(), msg: "EXECUTING REMOTE SIGNAL UPLINK...", type: "system" }]);
      try {
        const response = await fetch('/api/lab/exec', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ command: baseCmd, args })
        });

        const data = await response.json();
        if (response.ok) {
          setLabLogs(prev => [...prev, { id: Math.random().toString(), msg: data.output, type: data.type || "output" }]);
        } else {
          setLabLogs(prev => [...prev, { id: Math.random().toString(), msg: `Error: ${data.error}`, type: "error" }]);
        }
      } catch (err) {
        setLabLogs(prev => [...prev, { id: Math.random().toString(), msg: "SIGNAL INTERRUPTED: Backend unreachable.", type: "error" }]);
      }
      return;
    }

    setTimeout(async () => {
      let response: { msg: string; type: "output" | "error" | "success" | "system" }[] = [];

      switch (baseCmd) {
        case "agent":
          if (!installedTools.includes("agent-v1")) {
            response = [{ msg: "Command 'agent' not found. Try 'pkg install agent-v1'.", type: "error" }];
          } else {
            const target = args[0] || (liveResult ? liveResult.phoneNumber : "127.0.0.1");
            response = [
              { msg: `INITIALIZING NETWORK AGENT v1.0.4 ON TARGET: ${target}`, type: "system" },
              { msg: "ESTABLISHING STEALTH UPLINK...", type: "output" },
              { msg: "UPLINK ESTABLISHED via ZA-KIM-NODE-01", type: "success" },
              { msg: "IDENTIFYING NETWORK TOPOLOGY...", type: "output" },
              { msg: "TARGET IS BEHIND LAN GATEWAY (192.168.1.1)", type: "warning" },
              { msg: "STARTING PROTOCOL STRIPPING LAYER 2-7...", type: "output" },
              { msg: "[STRIP] ARP: OK (MAC: 00:1A:2B:3C:4D:5E)", type: "success" },
              { msg: "[STRIP] ICMP: OK (TTL: 64)", type: "success" },
              { msg: "[STRIP] TCP/IP: OK (WINDOW_SIZE: 65535)", type: "success" },
              { msg: "[STRIP] HTTP/S: OK (USER_AGENT: Android 14; Samsung SM-S928B)", type: "success" },
              { msg: "[STRIP] MDNS: OK (DEVICE_NAME: Excellent's-Galaxy-S24)", type: "success" },
              { msg: "RECONSTRUCTING ACTUAL DEVICE CHARACTERISTICS...", type: "output" },
              { msg: "DEVICE TYPE: Mobile Phone", type: "success" },
              { msg: "MANUFACTURER: Samsung", type: "success" },
              { msg: "OPERATING SYSTEM: Android 14", type: "success" },
              { msg: "NETWORK TYPE: LOCAL AREA NETWORK (LAN)", type: "success" },
              { msg: "AGENT STATUS: STRIPPING COMPLETED. Data synced to Interceptor.", type: "system" }
            ];
          }
          break;
        case "help":
          response = [
            { msg: "Available Forensic Tools:", type: "system" },
            { msg: "  pkg install [tool] - Install hacking modules", type: "output" },
            { msg: "  git clone [url]    - Clone tools from GitHub", type: "output" },
            { msg: "  nano [file.py]     - Create/Edit custom scripts", type: "output" },
            { msg: "  run [script.py]    - Execute forensic script", type: "output" },
            { msg: "  cat [file]         - View script source code", type: "output" },
            { msg: "  config --tokens    - Manage Intelligence tokens", type: "output" },
            { msg: "  inject --target    - Preload real target intelligence", type: "output" },
            { msg: "  nmap [target]      - Network reconnaissance", type: "output" },
            { msg: "  ls                 - List files and tools", type: "output" },
            { msg: "  whoami             - Display current operator", type: "output" },
            { msg: "  clear              - Clear laboratory logs", type: "output" }
          ];
          break;
        case "config":
          if (args[0] === "--tokens") {
            response = [
              { msg: "Intelligence Uplink Status:", type: "system" },
              { msg: `  Twilio SID:   ${twilioCreds.sid ? "CONFIGURED" : "MISSING"}`, type: twilioCreds.sid ? "success" : "error" },
              { msg: `  Abstract API: ${osintKeys.abstract ? "CONFIGURED" : "MISSING"}`, type: osintKeys.abstract ? "success" : "error" },
              { msg: "NOTE: System is currently in HYBRID_SANDBOX mode.", type: "info" },
              { msg: "Real data is reconstructed via Internal Signal Logic when tokens are missing.", type: "info" }
            ];
          } else {
            response = [{ msg: "Usage: config --tokens", type: "error" }];
          }
          break;
        case "inject":
          if (args[0] === "--target" && args[1] && args[2]) {
             const cleanNum = args[1].replace(/\D/g, "");
             const name = args.slice(2).join(" ");
             setTargetOverrides(prev => [...prev.filter(o => o.number !== cleanNum), { number: cleanNum, name }]);
             response = [
                { msg: `TACTICAL_INJECT: Real-world identity forced for node ${cleanNum}`, type: "success" },
                { msg: `Identity set to: ${name}`, type: "output" },
                { msg: "Neural mapping updated. Use INTERCEPTOR to scan.", type: "info" }
             ];
          } else {
             response = [
                { msg: "Manual Intelligence Injection (Hackathon Override)", type: "system" },
                { msg: "Usage: inject --target [phone_number] [full_name]", type: "output" },
                { msg: "Example: inject --target 0699636266 John Doe", type: "output" }
             ];
          }
          break;
        case "git":
          if (args[0] === "clone" && args[1]) {
            const repoName = args[1].split("/").pop()?.replace(".git", "") || "repo";
            response = [
              { msg: `Cloning into '${repoName}'...`, type: "output" },
              { msg: "remote: Enumerating objects: 104, done.", type: "output" },
              { msg: "remote: Counting objects: 100% (104/104), done.", type: "output" },
              { msg: "remote: Compressing objects: 100% (82/82), done.", type: "output" },
              { msg: `Receiving objects: 100% (104/104), 1.24 MiB | 4.2 MB/s, done.`, type: "output" },
              { msg: `SUCCESS: Repository '${repoName}' cloned into Lab.`, type: "success" }
            ];
            setInstalledTools(prev => [...prev, repoName]);
          } else {
            response = [{ msg: "Usage: git clone [repository_url]", type: "error" }];
          }
          break;
        case "nano":
          if (!args[0]) {
            response = [{ msg: "Usage: nano [filename.py]", type: "error" }];
          } else {
            const fileName = args[0];
            const existing = customScripts.find(s => s.name === fileName);
            setEditingFile(fileName);
            setEditingContent(existing ? existing.content : "# ForensicOS Tactical Script\nimport sys\nprint('Analyzing Target...')\n# Add forensic logic here");
            return; // Exit switch and timeout to show editor
          }
          break;
        case "cat":
          if (!args[0]) {
            response = [{ msg: "Usage: cat [filename]", type: "error" }];
          } else {
            const script = customScripts.find(s => s.name === args[0]);
            if (script) {
               response = script.content.split("\n").map(line => ({ msg: line, type: "output" as const }));
            } else if (installedTools.includes(args[0])) {
               response = [{ msg: `Binary file ${args[0]}: cannot display source.`, type: "error" }];
            } else {
               response = [{ msg: `File '${args[0]}' not found.`, type: "error" }];
            }
          }
          break;
        case "run":
          if (!args[0]) {
            response = [{ msg: "Usage: run [script_name.py]", type: "error" }];
          } else {
            const isCustom = customScripts.some(s => s.name === args[0]);
            response = [
              { msg: `Executing tactical script: ${args[0]}...`, type: "output" },
              { msg: isCustom ? "Parsing custom forensic logic..." : "Initializing neural processing unit...", type: "output" },
              { msg: "SUCCESS: Script execution complete. Vector results logged to SAPS-DB.", type: "success" }
            ];
          }
          break;
        case "clear":
          setLabLogs([]);
          return;
        case "whoami":
          response = [{ msg: "Operator: Sgt. Khumalo [Auth Level 4]", type: "output" }];
          break;
        case "ls":
          response = [{ msg: `Installed Modules: ${installedTools.join(", ")}`, type: "output" }];
          break;
        case "pkg":
          if (args[0] === "install" && args[1]) {
            if (installedTools.includes(args[1])) {
              response = [{ msg: `Module '${args[1]}' is already initialized.`, type: "error" }];
            } else {
              response = [
                { msg: `Fetching '${args[1]}' from ZA-INTEL-REPO...`, type: "output" },
                { msg: `Extracting forensic signatures...`, type: "output" },
                { msg: `Module '${args[1]}' installed successfully.`, type: "success" }
              ];
              setInstalledTools(prev => [...prev, args[1]]);
            }
          } else {
            response = [{ msg: "Usage: pkg install [module_name]", type: "error" }];
          }
          break;
        case "nmap":
          if (!installedTools.includes("nmap")) {
            response = [{ msg: "Command 'nmap' not found. Try 'pkg install nmap'.", type: "error" }];
          } else {
            // Make API call to /api/recon
            try {
              const reconResponse = await fetch("/api/recon");
              const devices = await reconResponse.json();

              if (reconResponse.ok) {
                response.push({ msg: `Starting Nmap 7.92 at ${new Date().toISOString()}`, type: "output" });
                response.push({ msg: `Scanning local network...`, type: "output" });
                response.push({ msg: "----------------------------------------------------", type: "output" });
                response.push({ msg: "DEVICE ID       IP ADDRESS      MAC ADDRESS         TYPE        STATUS", type: "output" });
                response.push({ msg: "----------------------------------------------------", type: "output" });

                devices.forEach((device: { id: string; ipAddress: string; macAddress: string; connectionType: string; status: string }) => {
                  response.push({
                    msg: `${device.id.padEnd(15)} ${device.ipAddress.padEnd(15)} ${device.macAddress.padEnd(19)} ${device.connectionType.padEnd(11)} ${device.status.toUpperCase()}`,
                    type: "success",
                  });
                });
                response.push({ msg: "----------------------------------------------------", type: "output" });
                response.push({ msg: `Nmap done: ${devices.length} devices scanned.`, type: "output" });
              } else {
                response.push({ msg: `Error during reconnaissance: ${devices.message || "Unknown error"}`, type: "error" });
              }
            } catch (apiError) {
              response.push({ msg: `Failed to connect to reconnaissance module.`, type: "error" });
              console.error("Recon API Error:", apiError);
            }
          }
          break;
        case "msfconsole":
          if (!installedTools.includes("metasploit")) {
            response = [{ msg: "Command 'msfconsole' not found. Try 'pkg install metasploit'.", type: "error" }];
          } else {
            response = [
              { msg: "Metasploit Framework v6.2.0-dev", type: "system" },
              { msg: "msf6 > searching for exploits for target...", type: "output" },
              { msg: "msf6 > found vulnerability in SS7 Gateway (CVE-2024-ZA)", type: "success" },
              { msg: "msf6 > payload configured: za/shell/reverse_tcp", type: "output" }
            ];
          }
          break;
        case "sqlmap":
          if (!installedTools.includes("sqlmap")) {
            response = [{ msg: "Command 'sqlmap' not found. Try 'pkg install sqlmap'.", type: "error" }];
          } else {
            response = [
              { msg: "sqlmap/1.6#stable - automatic SQL injection tool", type: "system" },
              { msg: "testing connection to back-end database...", type: "output" },
              { msg: "CRITICAL: Database 'ZA_CITIZEN_REGISTRY' is vulnerable to Boolean-based blind SQL injection.", type: "success" }
            ];
          }
          break;
        default:
          response = [{ msg: `Command '${baseCmd}' not recognized. Type 'help' for list.`, type: "error" }];
      }

      setLabLogs(prev => [...prev, ...response.map(r => ({ id: Math.random().toString(), ...r }))]);
    }, 400);
  };

  const getDeterministicForensicData = (phone: string): ForensicRecord => {
     const cleanSearch = phone.replace(/\D/g, "");
     const isUserDemo = cleanSearch === "0699636266" || cleanSearch === "27699636266";

     if (isUserDemo) {
        return {
           id: "DEMO-USER-001",
           phoneNumber: phone,
           carrier: "Telkom Mobile",
           imei: "350001537768927",
           imsi: "655019928374655",
           networkNode: "ZA-NC-KIM-NODE-01",
           biometricSync: true,
           signalDb: -64,
           identity: {
              fullName: "MASHEGO EXCELLENT",
              idNumber: "0205125149080",
              riskScore: 4,
              status: "Normal",
           },
           location: {
              lat: -28.7437,
              lng: 24.7570,
              address: "13 Birbeck Ave, Labram",
              city: "Kimberley",
              suburb: "Labram",
           },
           digitalFootprint: {
              socialHandles: [
                 { platform: "Telegram", handle: "@de_nightshpeperd", lastActivity: "Active Now" },
                 { platform: "Facebook", handle: "maex excellent", lastActivity: "12m ago" },
                 { platform: "WhatsApp", handle: "Linked (Primary)", lastActivity: "Now" },
              ],
              leakedPasswordsCount: 0,
              mentions: ["Sol Plaatje University Student Council", "SAPS Tactical Hackathon Participant"],
              webMentions: [
                 { title: "Sol Plaatje University Student Directory", source: "spu.ac.za", date: "2024" },
                 { title: "Kimberley Regional Tech Board", source: "kimberley.gov.za", date: "2w ago" }
              ],
              deviceHistory: [
                 { device: "Samsung Galaxy A04e", lastUsed: "Now", location: "Labram, Kimberley" },
                 { device: "PRITOM TAB", lastUsed: "1h ago", location: "Home" },
                 { device: "HP ProBook Laptop", lastUsed: "3h ago", location: "SPU Campus" },
                 { device: "MOBICEL", lastUsed: "1d ago", location: "Secondary Node" },
              ]
           },
           visualIntel: {
              lastCctvNode: "CAM-ZA-KIM-NCM-04",
              subjectCaptureUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Excellent&backgroundColor=b6e3f4",
              clothingIntel: "University hoodie, dark jeans.",
              facialMatchScore: 99.2,
           },
           financialIntel: {
              lastMerchant: "Pick n Pay (North Cape Mall)",
              transactionType: "POS Purchase",
              bankNode: "FNB-ZA-KIM-01",
              timestamp: new Date().toISOString(),
              status: "Verified",
           },
           satelliteRelay: {
              satName: "INTELSAT-39",
              uplinkFreq: "14.2 GHz",
              downlinkFreq: "11.7 GHz",
              orbitalSlot: "62.0° E",
           },
           sigint: {
              voicePrintId: "VP-ZA-KIM-001",
              audioInterceptUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
              neuralGraphNodes: [
                 { id: "1", label: "MASHEGO EXCELLENT", type: "person", connection: "Target" },
                 { id: "2", label: "Sol Plaatje University", type: "organization", connection: "Academic Node" },
                 { id: "3", label: "Sandton Node", type: "location", connection: "Recent Vector" },
                 { id: "4", label: "Bloemfontein Relay", type: "location", connection: "Transit Point" },
                 { id: "5", label: "Kimberley Grid", type: "location", connection: "Primary Cell" }
              ],
              predictiveVector: {
                 lat: -28.7437,
                 lng: 24.7570,
                 heading: 180,
                 confidence: 98,
              },
              anprHit: {
                 plate: "GP 44 MN 01",
                 make: "Hyundai Staria",
                 color: "White",
                 confidence: 96.5
              }
           },
           networkAgent: {
              agentId: "AGENT-DEMO-001",
              status: "COMPLETED",
              protocols: [
                 { protocol: "TCP/IP", status: "STRIPPED", layer: 4, responseTime: 12 },
                 { protocol: "UDP", status: "STRIPPED", layer: 4, responseTime: 8 },
                 { protocol: "ICMP", status: "DETECTED", layer: 3, responseTime: 45 },
                 { protocol: "HTTP/S", status: "STRIPPED", layer: 7, responseTime: 89 },
                 { protocol: "DNS", status: "BYPASSED", layer: 7, responseTime: 15 },
                 { protocol: "ARP", status: "STRIPPED", layer: 2, responseTime: 4 },
                 { protocol: "SSDP", status: "DETECTED", layer: 7, responseTime: 62 },
                 { protocol: "MDNS", status: "STRIPPED", layer: 7, responseTime: 41 }
              ],
              strippedInfo: {
                 deviceType: "Mobile Phone",
                 manufacturer: "Samsung",
                 os: "Android 14",
                 macAddress: "00:1A:2B:3C:4D:5E",
                 chipset: "Exynos 2400"
              },
              networkType: "LAN",
              localIp: "192.168.1.104",
              publicIp: "41.13.242.89",
              gateway: "192.168.1.1",
              dns: ["8.8.8.8", "1.1.1.1"],
              connectivity: "Wireless (802.11ax)",
              uplinkSpeed: "1.2 Gbps"
           },
           tacticalIntel: {
              hatZone: "BLUE",
              threatLevel: "LOW",
              manhuntStatus: "STANDBY",
              towerProximity: {
                 distanceMeters: 450,
                 closestTowerId: "ZA-KIM-TWR-01",
                 sectorId: "S-NC-04",
                 triangulationConfidence: 99.8
              },
              activeHacks: ["Neural Signal Sync", "City CCTV Mesh Authorization"]
           },
           identityIndex: {
              callerId: "MASHEGO EXCELLENT",
              confidence: 99,
              tags: ["Student", "Verified", "SPU"],
              isSpam: false,
              lastReported: "Now",
              reportCount: 0,
              workplace: "Sol Plaatje University",
              associatedEmail: "excellentmoothly@gmail.com",
              portingHistory: [],
              sources: [
                 { name: "University Database", type: "Academic", confidence: 100 },
                 { name: "SAPS Tactical Registry", type: "Government", confidence: 100 }
              ]
           }
        };
     }

     let hash = 0;
     for (let i = 0; i < phone.length; i++) {
       hash = (hash << 5) - hash + phone.charCodeAt(i);
       hash |= 0;
     }
     hash = Math.abs(hash);
     
     const firstNames = ["Thabo", "Lindiwe", "Sipho", "Zanele", "Jabu", "Nomvula", "Andile", "Lerato", "Mpho", "Kabelo"];
     const lastNames = ["Mokoena", "Dlamini", "Zuma", "Gumede", "Naidoo", "Patel", "Botha", "Van Wyk", "Smit", "Molefe"];
     const firstName = firstNames[hash % 10];
     const lastName = lastNames[(hash / 10 | 0) % 10];
     
     // Check for manual tactical override (for hackathon/testing)
     const override = targetOverrides.find(o => o.number === cleanSearch || o.number === `27${cleanSearch.substring(1)}`);
     const finalFullName = override ? override.name : `${firstName} ${lastName}`;

     const models = [
       { name: "Samsung Galaxy S23 Ultra", model: "SM-S918B" },
       { name: "iPhone 14 Pro Max", model: "A2894" },
       { name: "Huawei P60 Pro", model: "MNA-LX9" },
       { name: "Samsung Galaxy A54", model: "SM-A546B" },
       { name: "Oppo Reno 10 Pro", model: "CPH2525" },
       { name: "Vivo V27 5G", model: "V2231" },
       { name: "Nokia G42", model: "TA-1581" },
       { name: "Xiaomi Redmi Note 12", model: "23021RAAEG" }
     ];
     const device = models[hash % models.length];

     const locations = [
       { city: "Johannesburg", lat: -26.2041, lng: 28.0473, suburbs: ["Sandton", "Rosebank", "Soweto", "Braamfontein", "Melville", "Randburg"] },
       { city: "Cape Town", lat: -33.9249, lng: 18.4241, suburbs: ["Sea Point", "Claremont", "Gugulethu", "Bellville", "Hout Bay", "Milnerton"] },
       { city: "Pretoria", lat: -25.7479, lng: 28.2293, suburbs: ["Hatfield", "Arcadia", "Menlyn", "Centurion", "Sunnyside", "Mamelodi"] },
       { city: "Durban", lat: -29.8587, lng: 31.0218, suburbs: ["Umhlanga", "Berea", "Morningside", "Chatsworth", "Glenwood", "Amanzimtoti"] }
     ];
     const locBase = locations[hash % locations.length];
     const suburb = locBase.suburbs[hash % locBase.suburbs.length];
     
     const latOffset = ((hash % 1000) - 500) / 10000;
     const lngOffset = ((hash % 1000) - 500) / 10000;

     // Advanced South African Carrier Identification Logic (High-Precision Mesh)
     const cleanNum = phone.replace(/\D/g, '');
     const p2 = cleanNum.startsWith('27') ? cleanNum.substring(2, 4) : cleanNum.substring(1, 3);
     const p3 = cleanNum.startsWith('27') ? cleanNum.substring(2, 5) : cleanNum.substring(1, 4);
     const p3Int = parseInt(p3[2]);
     
     let carrier = "Vodacom SA";

     // Vodacom SA: 82, 72, 76, 79, 71(0-6), 60(3-9), 69, 66(0-5), 64(0,6-9), 63(6-7)
     if (p2 === "82" || p2 === "72" || p2 === "76" || p2 === "79" || p2 === "69" ||
        (p2 === "71" && p3Int <= 6) || 
        (p2 === "60" && p3Int >= 3) ||
        (p2 === "66" && p3Int <= 5) ||
        (p2 === "64" && (p3Int === 0 || p3Int >= 6)) ||
        (p2 === "63" && (p3Int === 6 || p3Int === 7))) {
       carrier = "Vodacom SA";
     }
     // MTN South Africa: 83, 73, 78, 71(7-9), 60(0-2), 63(0-5), 64(1-5), 65(0-3), 67(0-2), 68(0-2)
     else if (p2 === "83" || p2 === "73" || p2 === "78" || 
             (p2 === "71" && p3Int >= 7) || 
             (p2 === "60" && p3Int <= 2) ||
             (p2 === "63" && p3Int <= 5) ||
             (p2 === "64" && p3Int >= 1 && p3Int <= 5) ||
             (p2 === "65" && p3Int <= 3) ||
             (p2 === "67" && p3Int <= 2) ||
             (p2 === "68" && p3Int <= 2)) {
       carrier = "MTN South Africa";
     }
     // Cell C: 84, 74, 61(0-3, 5-9), 62, 63(8-9)
     else if (p2 === "84" || p2 === "74" || p2 === "62" || 
             (p2 === "61" && p3Int !== 4) || 
             (p2 === "63" && p3Int >= 8)) {
       carrier = "Cell C";
     }
     // Telkom Mobile: 81(1-8), 67(3-9), 68(3-9), 614, 654
     else if (p3 === "614" || p3 === "654" ||
             (p2 === "67" && p3Int >= 3) || 
             (p2 === "68" && p3Int >= 3) || 
             (p2 === "81" && p3Int >= 1 && p3Int <= 8)) {
       carrier = "Telkom Mobile";
     }
     else {
       carrier = "South African Signal (Hybrid Node)";
     }

     const captureUrl = `https://api.dicebear.com/7.x/avataaars/svg?seed=${hash}&backgroundColor=b6e3f4`;

     return {
       id: hash.toString(),
       phoneNumber: phone,
       carrier: carrier,
       imei: `35${(hash % 9999999999999).toString().padStart(13, "0")}`,
       imsi: `655${(hash % 99999999999).toString().padStart(12, "0")}`,
       networkNode: `ZA-GP-CELL-${hash % 999}`,
       biometricSync: hash % 2 === 0,
       signalDb: -(hash % 40 + 60),
       identity: {
         fullName: finalFullName,
         idNumber: `${(hash % 90 + 10).toString()}${(hash % 12 + 1).toString().padStart(2, "0")}${(hash % 28 + 1).toString().padStart(2, "0")}${(hash % 9999 + 1000).toString()}08${hash % 9}`,
         riskScore: (hash % 100),
         status: hash % 3 === 0 ? "Suspicious" : "Normal",
       },
       location: {
         lat: locBase.lat + latOffset,
         lng: locBase.lng + lngOffset,
         address: `${(hash % 900) + 100} Commissioner St`,
         city: locBase.city,
         suburb: suburb,
       },
       digitalFootprint: {
         socialHandles: [
           { platform: "Facebook", handle: `${firstName.toLowerCase()}.${lastName.toLowerCase()}`, lastActivity: "2h ago" },
           { platform: "Instagram", handle: `@${firstName[0]}${lastName.toLowerCase()}_za`, lastActivity: "15m ago" },
           { platform: "X (Twitter)", handle: `@${lastName}${firstName[0]}`, lastActivity: "1d ago" },
         ],
         leakedPasswordsCount: hash % 5,
         mentions: ["Local News", "Corporate Directory", "Alumni Association"],
         webMentions: [
           { title: `LinkedIn: ${firstName} ${lastName}`, source: "linkedin.com", date: "4d ago" },
           { title: `${lastName} Family Trust`, source: "government.za", date: "1y ago" },
           { title: "Soweto Community Board", source: "facebook.com", date: "2w ago" }
         ],
         deviceHistory: [
           { device: device.name, lastUsed: "Now", location: suburb },
           { device: "MacBook Pro", lastUsed: "3h ago", location: "Home Network" },
         ]
       },
       visualIntel: {
         lastCctvNode: `CAM-ZA-${hash % 9999}`,
         subjectCaptureUrl: captureUrl,
         clothingIntel: hash % 2 === 0 ? "Dark jacket, denim, sneakers." : "Light hoodie, spectacles, backpack.",
         facialMatchScore: (hash % 5) + 94.2,
       },
       financialIntel: {
         lastMerchant: ["Checkers Hyper", "Shell Garage", "Uber Eats", "MTN Store", "Woolworths", "Standard Bank ATM"][hash % 6],
         transactionType: hash % 2 === 0 ? "POS Purchase" : "ATM Withdrawal",
         bankNode: ["FNB-NODE-01", "ABSA-GATE-04", "STD-RELAY-09", "NED-AUTH-02"][hash % 4],
         timestamp: new Date(Date.now() - (hash % 100) * 60000).toISOString(),
         status: "Verified",
       },
       satelliteRelay: {
         satName: ["INTELSAT-39", "AMOS-17", "EUTELSAT-7B", "HELLAS-SAT-3"][hash % 4],
         uplinkFreq: `${(hash % 10) + 14}.2 GHz`,
         downlinkFreq: `${(hash % 10) + 11}.7 GHz`,
         orbitalSlot: `${(hash % 60) + 30}.0° E`,
       },
       sigint: {
         voicePrintId: `VP-ZA-${hash % 9999}`,
         audioInterceptUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
         neuralGraphNodes: [
           { id: "1", label: firstName, type: "person", connection: "Target" },
           { id: "2", label: lastNames[(hash + 1) % 10], type: "person", connection: "Frequent Contact" },
           { id: "3", label: "Standard Bank", type: "organization", connection: "Financial Node" },
           { id: "4", label: suburb, type: "location", connection: "Primary Cell" },
           { id: "5", label: "Unknown Node", type: "person", connection: "Darknet Link" }
         ],
         predictiveVector: {
           lat: locBase.lat + latOffset + 0.005,
           lng: locBase.lng + lngOffset + 0.005,
           heading: hash % 360,
           confidence: (hash % 15) + 78,
         },
         anprHit: hash % 2 === 0 ? {
             plate: `GP ${hash % 999} ${(hash % 99).toString().padStart(2, "0")}`,
             make: ["Toyota Hilux", "VW Polo", "BMW 3 Series", "Mercedes C-Class"][hash % 4],
             color: ["White", "Silver", "Black", "Amber"][hash % 4],
             confidence: (hash % 10) + 89.4
           } : null,
         },
         networkAgent: {
            agentId: `AGENT-${hash % 9999}`,
            status: "COMPLETED",
            protocols: [
               { protocol: "TCP/IP", status: "STRIPPED", layer: 4, responseTime: hash % 50 + 10 },
               { protocol: "UDP", status: "STRIPPED", layer: 4, responseTime: hash % 30 + 5 },
               { protocol: "ICMP", status: "DETECTED", layer: 3, responseTime: hash % 100 + 20 },
               { protocol: "HTTP/S", status: "STRIPPED", layer: 7, responseTime: hash % 150 + 50 },
               { protocol: "DNS", status: "BYPASSED", layer: 7, responseTime: hash % 40 + 10 },
               { protocol: "ARP", status: "STRIPPED", layer: 2, responseTime: hash % 20 + 2 },
               { protocol: "SSDP", status: "DETECTED", layer: 7, responseTime: hash % 80 + 30 },
               { protocol: "MDNS", status: "STRIPPED", layer: 7, responseTime: hash % 60 + 25 }
            ],
            strippedInfo: {
               deviceType: ["Mobile Phone", "Tablet", "Laptop", "Smart Watch", "IoT Gateway"][hash % 5],
               manufacturer: ["Samsung", "Apple", "Huawei", "Xiaomi", "Oppo"][hash % 5],
               os: ["Android 14", "iOS 17.4", "HarmonyOS 4.0", "Windows 11", "Linux 6.1"][hash % 5],
               macAddress: `${(hash % 255).toString(16).padStart(2, '0')}:${((hash+1) % 255).toString(16).padStart(2, '0')}:${((hash+2) % 255).toString(16).padStart(2, '0')}:${((hash+3) % 255).toString(16).padStart(2, '0')}:${((hash+4) % 255).toString(16).padStart(2, '0')}:${((hash+5) % 255).toString(16).padStart(2, '0')}`.toUpperCase(),
               chipset: ["Snapdragon 8 Gen 3", "Apple A17 Pro", "Kirin 9000S", "Dimensity 9300", "Exynos 2400"][hash % 5]
            },
            networkType: (["LAN", "VPN", "WAN", "Tor", "Proxy", "Mesh", "Satellite"][hash % 7]) as "LAN" | "VPN" | "WAN" | "Tor" | "Proxy" | "Mesh" | "Satellite",
            localIp: `192.168.${hash % 255}.${hash % 254 + 1}`,
            publicIp: `${(hash % 200) + 41}.${(hash % 255)}.${(hash % 255)}.${(hash % 255)}`,
            gateway: `192.168.${hash % 255}.1`,
            dns: ["8.8.8.8", "1.1.1.1"]
         },
       };
     };

  const handleSearch = async (e?: React.FormEvent, overrideQuery?: string) => {
    if (e) e.preventDefault();
    const query = (overrideQuery || searchQuery).trim().replace(/\s+/g, "");
    
    if (!query || query.length < 10) return;

    // Judicial authorization bypass for testing
    if (!warrantId) {
       addLog("TEST_MODE: Bypassing judicial authorization requirement.", "warning");
    }

    setIsSearching(true);
    setHasSearched(true);
    setLiveResult(null);
    
    if (!history.includes(query)) {
      setHistory(prev => [query, ...prev].slice(0, 5));
    }

    addLog(`INIT: SS7 Interrogation Protocol for ${query}...`, "cmd");
    
    let realOsintData = null;
    try {
      const osintResponse = await fetch('/api/osint-search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          phoneNumber: query,
          keys: osintKeys
        })
      });
      const data = await osintResponse.json();
      if (data.success) {
        realOsintData = data.realData;
        if (osintKeys.abstract) {
          addLog(`UPLINK: Real-time network registry hit via OSINT node.`, "success");
        } else {
          addLog(`RECON: Identity reconstructed via Internal Signal Logic.`, "info");
        }
      }
    } catch (err) {
        console.error("OSINT Fetch Error", err);
      }

    const sequences = [
      { msg: "Pinging SS7 HLR/VLR Gateway...", time: 500, type: "info" },
      { msg: `Carrier Hit: ${realOsintData?.carrier || "Retrieving..."}`, time: 1200, type: "success" },
      { msg: "IMSI/IMEI pair correlation established.", time: 2000, type: "success" },
      { msg: "INIT: Digital Identity Reconstruction...", time: 3000, type: "cmd" },
      { msg: "Mapping social graph across 12 platforms...", time: 4000, type: "info" },
      { msg: `RECON: Found handles linked to ${realOsintData?.location || "target"}`, time: 5000, type: "success" },
      { msg: "Facial recognition interrogation on city CCTV mesh...", time: 6000, type: "info" },
      { msg: "BUFFER: Retrieving visual frames from localized nodes...", time: 7000, type: "info" },
      { msg: "SUCCESS: CCTV Subject Capture synchronized.", time: 8000, type: "success" },
      { msg: "ANPR: Vehicle correlation established on Sandton Node.", time: 9000, type: "info" },
      { msg: "Biometric match confirmed. Identity: 94.8% probability.", time: 10000, type: "success" },
      { msg: "SIGINT: Voiceprint extraction and audio intercept...", time: 11000, type: "cmd" },
      { msg: "RECON: Neural social graph reconstructed (5 nodes).", time: 12000, type: "success" },
      { msg: "Calculating predictive vector based on signal drift...", time: 13000, type: "info" },
      { msg: "Pulling last merchant transaction node hits...", time: 14000, type: "info" },
      { msg: "Live Satellite Uplink established via INTELSAT-39.", time: 15500, type: "success" },
      { msg: "Dossier complete. Rendering target intelligence.", time: 17000, type: "success" },
    ];

    sequences.forEach(seq => {
      setTimeout(() => addLog(seq.msg, seq.type as "info" | "success" | "warning" | "error" | "cmd" | "live"), seq.time);
    });

    setTimeout(() => {
      const found = getDeterministicForensicData(query);
      const isUserDemo = query.replace(/\D/g, "") === "0699636266" || query.replace(/\D/g, "") === "27699636266";
      
      if (realOsintData && !isUserDemo) {
        found.carrier = realOsintData.carrier;
        found.location.city = realOsintData.location.split(',')[0];
        found.location.address = `${found.location.address} (Verified via ${realOsintData.webHits[0]?.platform || "Web"})`;
      }
      if (realOsintData?.identityIndex) {
        found.identityIndex = realOsintData.identityIndex;
        // Apply override even to OSINT results if present
        const cleanSearch = query.replace(/\D/g, "");
        const override = targetOverrides.find(o => o.number === cleanSearch || o.number === `27${cleanSearch.substring(1)}`);
        found.identity.fullName = override ? override.name : realOsintData.identityIndex.callerId;
        if (found.identityIndex) found.identityIndex.callerId = found.identity.fullName;
      }
      setLiveResult(found);
      setIsSearching(false);
      addLog(`LIVE TRACKING ENGAGED: Target ${query} localized.`, "live");
    }, 18000);
  };

  const handleBruteForce = async (e: React.FormEvent) => {
    e.preventDefault();
    const query = searchQuery.trim().replace(/\s+/g, "");
    if (!query || query.length < 10) return;

    // Judicial authorization bypass for testing
    if (!warrantId) {
       addLog("TEST_MODE: Bypassing Pulse Ping authorization.", "warning");
    }

    if (!twilioCreds.sid || !twilioCreds.token || !twilioCreds.from) {
      if (!warrantId) {
        addLog("SANDBOX_MODE: Twilio tokens missing. Using simulated SS7 intercept.", "info");
      } else {
        addLog("ERROR: Twilio Uplink credentials required for Pulse Ping.", "error");
        setShowConfig(true);
        return;
      }
    }

    setIsBruteForcing(true);
    setPingCallStatus("dialing");
    addLog(`INIT: Active Pulse Ping via ${!twilioCreds.sid ? "Sandbox" : "Twilio"} node for ${query}...`, "cmd");

    try {
      let data = { success: false, error: "Uplink Failure" };
      
      if (!twilioCreds.sid) {
        // High-fidelity sandbox simulation
        await new Promise(resolve => setTimeout(resolve, 2000));
        data = { success: true, error: "" };
      } else {
        const response = await fetch("/api/ping-call", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ 
            phoneNumber: query,
            creds: twilioCreds
          })
        });
        data = await response.json();
      }
      
      if (data.success) {
        setPingCallStatus("ringing");
        addLog(`SIGNAL: Remote handset is ringing. Signal intercepted.`, "info");
        setTimeout(() => {
           setPingCallStatus("intercepted");
           addLog(`SUCCESS: Encrypted SS7 handshake captured.`, "success");
           setTimeout(() => {
              setIsBruteForcing(false);
              handleSearch(undefined, query);
           }, 1500);
        }, 2000);
      } else {
        setPingCallStatus("failed");
        addLog(`ERROR: Pulse Ping failed. ${data.error}`, "error");
        setIsBruteForcing(false);
      }
    } catch {
      setPingCallStatus("failed");
      addLog("ERROR: Uplink timeout during Pulse Ping.", "error");
      setIsBruteForcing(false);
    }
  };

  const clearTerminal = () => setLogs([]);
  const togglePause = () => {
    setIsPaused(!isPaused);
    addLog(isPaused ? "SYSTEM: Tracking resumed." : "SYSTEM: Tracking suspended by operator.", isPaused ? "success" : "warning");
  };
  const logout = () => router.push("/");

  const handleExport = () => {
    if (!liveResult) return;
    addLog(`Generating forensic dossier for ${liveResult.phoneNumber}...`, "info");
    setTimeout(() => {
      addLog("Digital signature applied: SAPS-AUTH-772", "success");
      window.print();
    }, 1000);
  };

  const OsintDashboard = ({ liveResult, eqHeights }: { liveResult: ForensicRecord | null, eqHeights: number[] }) => {
    if (!liveResult) {
      return (
        <div className="h-full flex flex-col gap-6 animate-in fade-in slide-in-from-right-4 duration-500">
           <div className="bg-white/5 border border-white/10 rounded-2xl p-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-12 opacity-5">
                 <Fingerprint size={200} className="text-white" />
              </div>
              <div className="relative z-10">
                 <h2 className="text-3xl font-black text-white tracking-tighter uppercase mb-2">Deep OSINT Interrogation</h2>
                 <p className="text-white/40 text-xs font-bold uppercase tracking-widest mb-8">Global Digital Footprint Reconstruction Engine</p>
                 
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                      { label: "Social Graphing", status: "Enabled", icon: Share2 },
                      { label: "Data Breach Scraper", status: "Active", icon: Lock },
                      { label: "Metadata Extraction", status: "Standby", icon: Hash }
                    ].map((mod, i) => (
                      <div key={i} className="bg-black/40 border border-white/10 p-6 rounded-xl flex items-center gap-4 group hover:border-white/30 transition-all">
                         <div className="p-3 bg-white/5 rounded-lg group-hover:bg-white/10 transition-colors">
                            <mod.icon size={24} className="text-white" />
                         </div>
                         <div>
                            <p className="text-[10px] font-black text-white/40 uppercase">{mod.label}</p>
                            <p className="text-sm font-black text-white">{mod.status}</p>
                         </div>
                      </div>
                    ))}
                 </div>
              </div>
           </div>

           <div className="flex-1 bg-black/40 border border-white/10 rounded-2xl p-8 flex flex-col items-center justify-center text-center">
              <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mb-6 animate-pulse">
                 <Search size={40} className="text-white/20" />
              </div>
              <h3 className="text-white font-black uppercase tracking-widest mb-2">OSINT Node Idle</h3>
              <p className="text-white/20 text-[10px] max-w-xs font-bold uppercase leading-relaxed">
                 Switch to INTERCEPTOR to initiate a target search. Digital identity reconstruction will appear here automatically.
              </p>
           </div>
        </div>
      );
    }

    return (
      <div className="h-full flex flex-col gap-6 animate-in fade-in slide-in-from-right-4 duration-500 overflow-y-auto pr-2 scrollbar-hide">
        {/* Target Identity Header */}
        <div className="bg-white text-black rounded-2xl p-8 flex items-center justify-between shadow-[0_0_50px_rgba(255,255,255,0.1)] relative overflow-hidden">
           {liveResult.identityIndex?.isSpam && (
              <div className="absolute top-0 left-0 w-full h-1 bg-red-600 animate-pulse" />
           )}
           <div className="flex items-center gap-6">
              <div className="w-24 h-24 rounded-full border-4 border-black overflow-hidden bg-white/10 flex items-center justify-center shrink-0">
                 <Image src={liveResult.visualIntel.subjectCaptureUrl} alt="Target" width={96} height={96} className="w-full h-full object-cover" />
              </div>
              <div>
                 <div className="flex items-center gap-3 mb-1">
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-50">Deep Search Result</p>
                    {liveResult.identityIndex && (
                       <span className={cn(
                          "px-2 py-0.5 rounded text-[8px] font-black uppercase border",
                          liveResult.identityIndex.isSpam 
                            ? "bg-red-600 text-white border-red-700 animate-pulse" 
                            : "bg-green-100 text-green-800 border-green-200"
                       )}>
                          {liveResult.identityIndex.isSpam ? "High Risk / Spam" : "Verified Identity"}
                       </span>
                    )}
                 </div>
                 <h2 className="text-4xl font-black tracking-tighter uppercase leading-none">
                    {liveResult.identityIndex?.callerId || liveResult.identity.fullName}
                 </h2>
                 <p className="mt-2 text-xs font-bold uppercase opacity-60 flex items-center gap-2">
                    <Shield size={14} /> Subject Risk Factor: {liveResult.identityIndex?.isSpam ? "99" : liveResult.identity.riskScore}%
                 </p>
              </div>
           </div>
           <div className="text-right">
              <p className="text-[10px] font-black uppercase opacity-40 mb-1">Global Caller Confidence</p>
              <div className="flex flex-col items-end">
                 <span className="text-2xl font-black uppercase">{liveResult.identityIndex?.confidence || 85}%</span>
                 <p className="text-[8px] font-bold opacity-30 uppercase">Based on {liveResult.identityIndex?.reportCount || 12} community reports</p>
              </div>
           </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
           {/* Caller Identity Context */}
           {liveResult.identityIndex && (
              <div className="lg:col-span-3 bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                 <div className="flex-1">
                    <h3 className="text-[10px] font-black text-white/40 uppercase mb-3 tracking-widest">Community Reported Tags</h3>
                    <div className="flex flex-wrap gap-2">
                       {liveResult.identityIndex.tags.map((tag, i) => (
                          <span key={i} className={cn(
                             "px-3 py-1 text-[9px] font-black rounded border uppercase",
                             liveResult.identityIndex?.isSpam 
                               ? "bg-red-500/10 text-red-500 border-red-500/20" 
                               : "bg-white/10 text-white border-white/20"
                          )}>
                             {tag}
                          </span>
                       ))}
                    </div>
                 </div>
                 <div className="h-12 w-[1px] bg-white/10 hidden md:block" />
                 <div className="flex items-center gap-8">
                    {liveResult.identityIndex.workplace && (
                       <div>
                          <p className="text-[10px] font-black text-white/40 uppercase mb-1">Workplace</p>
                          <p className="text-sm font-black text-white uppercase">{liveResult.identityIndex.workplace}</p>
                       </div>
                    )}
                    {liveResult.identityIndex.associatedEmail && (
                       <div>
                          <p className="text-[10px] font-black text-white/40 uppercase mb-1">Email Trace</p>
                          <p className="text-sm font-black text-white lowercase">{liveResult.identityIndex.associatedEmail}</p>
                       </div>
                    )}
                 </div>
                 <div className="h-12 w-[1px] bg-white/10 hidden md:block" />
                 <div className="text-right">
                    <p className="text-[10px] font-black text-white/40 uppercase mb-1">Last Activity</p>
                    <p className="text-sm font-black text-white uppercase">{liveResult.identityIndex.lastReported}</p>
                 </div>
              </div>
           )}

           {/* Data Provenance & Sources */}
           {liveResult.identityIndex?.sources && (
              <div className="lg:col-span-1 flex flex-col gap-6">
                 <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                    <h3 className="text-xs font-black text-white uppercase mb-4 flex items-center gap-2">
                       <Database size={14} /> Intelligence Sources
                    </h3>
                    <div className="space-y-3">
                       {liveResult.identityIndex.sources.map((source, i) => (
                          <div key={i} className="flex flex-col gap-1 border-l-2 border-white/10 pl-3 py-1">
                             <div className="flex justify-between items-center">
                                <span className="text-[10px] font-black text-white uppercase">{source.name}</span>
                                <span className="text-[8px] font-bold text-green-500">{source.confidence}%</span>
                             </div>
                             <p className="text-[8px] font-bold text-white/30 uppercase tracking-widest">{source.type}</p>
                          </div>
                       ))}
                    </div>
                 </div>

                 {liveResult.identityIndex.portingHistory && (
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                       <h3 className="text-xs font-black text-white uppercase mb-4 flex items-center gap-2">
                          <RefreshCcw size={14} /> Porting History
                       </h3>
                       <div className="space-y-3">
                          {liveResult.identityIndex.portingHistory.map((port, i) => (
                             <div key={i} className="flex items-center justify-between text-[10px] font-bold">
                                <span className="text-white/40">{port.date}</span>
                                <div className="flex items-center gap-2">
                                   <span className="text-white/60">{port.from}</span>
                                   <span className="text-white/20">➜</span>
                                   <span className="text-white">{port.to}</span>
                                </div>
                             </div>
                          ))}
                       </div>
                    </div>
                 )}
              </div>
           )}

           {/* Social Footprint */}
           <div className={cn("bg-white/5 border border-white/10 rounded-2xl p-6", liveResult.identityIndex?.sources ? "lg:col-span-2" : "lg:col-span-3")}>
              <h3 className="text-sm font-black text-white uppercase mb-6 flex items-center gap-2">
                 <Share2 size={16} /> Social Presence Analysis
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                 {liveResult.digitalFootprint.socialHandles.map((handle, i) => (
                    <div key={i} className="bg-white/5 border border-white/10 p-4 rounded-xl group hover:border-white/30 transition-all">
                       <div className="flex justify-between items-start mb-3">
                          <span className="text-[8px] font-black text-white/40 uppercase">{handle.platform}</span>
                          <div className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
                       </div>
                       <p className="text-sm font-black text-white mb-1">{handle.handle}</p>
                       <p className="text-[9px] font-bold text-white/40 uppercase">Active {handle.lastActivity}</p>
                    </div>
                 ))}
              </div>
              <div className="mt-6 p-4 bg-white/5 border border-white/10 rounded-xl">
                 <p className="text-[10px] font-black text-white/40 uppercase mb-3 tracking-widest">Web Mentions & Social Links</p>
                 <div className="space-y-2">
                    {liveResult.digitalFootprint.webMentions.map((mention, i) => (
                       <div key={i} className="flex items-center justify-between p-2 bg-white/5 rounded border border-white/5 hover:border-white/20 transition-all">
                          <div className="flex items-center gap-3">
                             <Globe size={12} className="text-white/20" />
                             <span className="text-[10px] font-bold text-white uppercase">{mention.title}</span>
                          </div>
                          <div className="flex items-center gap-3">
                             <span className="text-[8px] font-black text-white/20 uppercase">{mention.source}</span>
                             <span className="text-[8px] font-black text-white/20 uppercase">{mention.date}</span>
                          </div>
                       </div>
                    ))}
                 </div>
              </div>
           </div>

           {/* Security Leaks */}
           <div className="bg-red-500/10 border border-red-500/30 rounded-2xl p-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-10 text-red-500">
                 <Lock size={80} />
              </div>
              <h3 className="text-sm font-black text-red-500 uppercase mb-6 flex items-center gap-2">
                 <AlertTriangle size={16} /> Data Leak Intel
              </h3>
              <div className="space-y-4 relative z-10">
                 <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl">
                    <p className="text-[8px] font-black text-red-500 uppercase mb-1">Leaked Passwords Found</p>
                    <p className="text-3xl font-black text-white">{liveResult.digitalFootprint.leakedPasswordsCount}</p>
                 </div>
                 <div className="space-y-2">
                    <p className="text-[10px] font-black text-white/40 uppercase tracking-widest">Compromised Vectors</p>
                    {['Email Hash', 'Device ID', 'Metadata'].map((v, i) => (
                       <div key={i} className="flex items-center gap-2 text-[10px] font-bold text-white">
                          <div className="w-1 h-1 bg-red-500 rounded-full" />
                          {v}
                       </div>
                    ))}
                 </div>
              </div>
           </div>

           {/* Network Agent Analysis */}
           <div className="lg:col-span-3 bg-white/5 border border-white/10 rounded-2xl p-6 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-8 opacity-5 text-white group-hover:opacity-10 transition-opacity">
                 <Wifi size={120} />
              </div>
              <div className="flex items-center justify-between mb-8">
                 <h3 className="text-sm font-black text-white uppercase flex items-center gap-2">
                    <Shield size={16} className="text-blue-500" /> Network Agent Analysis (Protocol Stripping)
                 </h3>
                 <div className="flex items-center gap-3">
                    <span className="text-[8px] font-black text-white/20 uppercase tracking-widest">Agent ID: {liveResult.networkAgent.agentId}</span>
                    <span className="px-2 py-0.5 bg-blue-500/20 text-blue-500 border border-blue-500/30 rounded text-[8px] font-black uppercase tracking-widest animate-pulse">
                       {liveResult.networkAgent.status}
                    </span>
                 </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                 {/* Stripped Device Info */}
                 <div className="md:col-span-1 space-y-4">
                    <div className="p-4 bg-white/5 border border-white/10 rounded-xl">
                       <p className="text-[9px] font-black text-white/40 uppercase mb-3 tracking-widest">Stripped Device Characteristics</p>
                       <div className="space-y-3">
                          <div>
                             <p className="text-[8px] font-black text-white/20 uppercase">True OS</p>
                             <p className="text-xs font-black text-white uppercase">{liveResult.networkAgent.strippedInfo.os}</p>
                          </div>
                          <div>
                             <p className="text-[8px] font-black text-white/20 uppercase">MAC Address</p>
                             <p className="text-xs font-mono font-black text-blue-400">{liveResult.networkAgent.strippedInfo.macAddress}</p>
                          </div>
                          <div>
                             <p className="text-[8px] font-black text-white/20 uppercase">Chipset Mesh</p>
                             <p className="text-xs font-black text-white uppercase">{liveResult.networkAgent.strippedInfo.chipset}</p>
                          </div>
                       </div>
                    </div>
                    <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl">
                       <p className="text-[9px] font-black text-blue-400 uppercase mb-2 tracking-widest">Network Topology</p>
                       <div className="flex items-center justify-between">
                          <span className="text-xs font-black text-white uppercase">{liveResult.networkAgent.networkType}</span>
                          <div className="w-2 h-2 rounded-full bg-blue-500 animate-ping" />
                       </div>
                    </div>
                 </div>

                 {/* Protocol Stripping Status */}
                 <div className="md:col-span-2 bg-white/5 border border-white/10 rounded-xl p-4">
                    <p className="text-[9px] font-black text-white/40 uppercase mb-4 tracking-widest">Layer 2-7 Protocol Interrogation</p>
                    <div className="grid grid-cols-2 gap-x-6 gap-y-3">
                       {liveResult.networkAgent.protocols.map((p, i) => (
                          <div key={i} className="flex items-center justify-between py-1 border-b border-white/5">
                             <div className="flex items-center gap-2">
                                <span className="text-[10px] font-black text-white uppercase">{p.protocol}</span>
                                <span className="text-[8px] font-bold text-white/20">L{p.layer}</span>
                             </div>
                             <div className="flex items-center gap-3">
                                <span className="text-[8px] font-bold text-white/40">{p.responseTime}ms</span>
                                <span className={cn(
                                   "text-[8px] font-black uppercase px-1.5 py-0.5 rounded",
                                   p.status === "STRIPPED" ? "bg-green-500/20 text-green-500" :
                                   p.status === "DETECTED" ? "bg-yellow-500/20 text-yellow-500" :
                                   "bg-white/10 text-white/40"
                                )}>
                                   {p.status}
                                </span>
                             </div>
                          </div>
                       ))}
                    </div>
                 </div>

                 {/* IP & Gateway Routing */}
                 <div className="md:col-span-1 space-y-4">
                    <div className="p-4 bg-white/5 border border-white/10 rounded-xl space-y-4">
                       <div>
                          <p className="text-[8px] font-black text-white/40 uppercase mb-1">Local IP (Intranet)</p>
                          <p className="text-xs font-mono font-black text-white">{liveResult.networkAgent.localIp}</p>
                       </div>
                       <div>
                          <p className="text-[8px] font-black text-white/40 uppercase mb-1">Public IP (WAN)</p>
                          <p className="text-xs font-mono font-black text-white">{liveResult.networkAgent.publicIp}</p>
                       </div>
                       <div>
                          <p className="text-[8px] font-black text-white/40 uppercase mb-1">Default Gateway</p>
                          <p className="text-xs font-mono font-black text-white/60">{liveResult.networkAgent.gateway}</p>
                       </div>
                       <div>
                          <p className="text-[8px] font-black text-white/40 uppercase mb-1">DNS Resolvers</p>
                          <div className="flex flex-wrap gap-2">
                             {liveResult.networkAgent.dns.map((dns, i) => (
                                <span key={i} className="text-[9px] font-mono font-bold text-white/40 bg-white/5 px-2 py-0.5 rounded">{dns}</span>
                             ))}
                          </div>
                       </div>
                    </div>
                 </div>
              </div>
           </div>
        </div>

        {/* Device & Activity History */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-6">
           <h3 className="text-sm font-black text-white uppercase mb-6 flex items-center gap-2">
              <Smartphone size={16} /> Multi-Device Correlation
           </h3>
           <div className="space-y-4">
              {liveResult.digitalFootprint.deviceHistory.map((history, i) => (
                 <div key={i} className="flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all group">
                    <div className="flex items-center gap-4">
                       <div className="p-2 bg-white/10 rounded-lg group-hover:bg-white text-white group-hover:text-black transition-all">
                          <Monitor size={18} />
                       </div>
                       <div>
                          <p className="text-xs font-black text-white uppercase">{history.device}</p>
                          <p className="text-[10px] font-bold text-white/40 uppercase">Last Seen: {history.location}</p>
                       </div>
                    </div>
                    <div className="text-right">
                       <p className="text-xs font-black text-white uppercase">{history.lastUsed}</p>
                       <span className="text-[8px] px-2 py-0.5 bg-green-500/20 text-green-500 rounded uppercase font-black">Linked</span>
                    </div>
                 </div>
              ))}
           </div>
        </div>
      </div>
    );
  };

  const NetworkMapDashboard = ({ targetGeolocation }: { targetGeolocation: any }) => {
    return (
      <div className="h-full flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
         <div className="flex-1 bg-black border border-white/10 rounded-2xl relative overflow-hidden group">
            {/* National Map Placeholder */}
            <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:60px_60px]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_rgba(0,0,0,0.8)_100%)]" />
            
            {/* Decorative Map Nodes */}
            {[
              { t: '15%', l: '45%', label: 'ZA-PTA-NODE', active: true },
              { t: '25%', l: '55%', label: 'ZA-JHB-CORE', active: true },
              { t: '75%', l: '25%', label: 'ZA-CPT-RELAY', active: false },
              { t: '65%', l: '75%', label: 'ZA-DBN-UPLINK', active: true }
            ].map((node, i) => (
              <div key={i} className="absolute flex flex-col items-center gap-2" style={{ top: node.t, left: node.l }}>
                 <div className={cn("w-2 h-2 rounded-full", node.active ? "bg-white animate-ping" : "bg-white/20")} />
                 <div className="px-2 py-1 bg-black/80 border border-white/20 rounded text-[8px] font-black text-white/40 uppercase tracking-widest whitespace-nowrap">
                    {node.label}
                 </div>
              </div>
            ))}

            {/* Target Location Pulse if active */}
            {targetGeolocation && (
               <div
                 className="absolute flex flex-col items-center gap-3 animate-in zoom-in duration-1000"
                 style={{
                    top: `${40 + (targetGeolocation.lat + 28) * 2}%`,
                    left: `${50 + (targetGeolocation.lng - 24) * 2}%`
                 }}
               >
                  <div className="relative">
                     <div className="absolute inset-0 bg-white rounded-full animate-ping opacity-75" />
                     <div className="w-4 h-4 bg-white rounded-full border-2 border-black shadow-[0_0_20px_rgba(255,255,255,1)]" />
                  </div>
                  <div className="bg-white text-black px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-tighter shadow-xl">
                     TARGET_LOCK: {targetGeolocation.city}, {targetGeolocation.country}
                  </div>
               </div>
            )}

            <div className="absolute top-8 left-8 bg-black/80 backdrop-blur-md border border-white/20 p-6 rounded-2xl max-w-xs relative z-10 shadow-2xl">
               <h3 className="text-lg font-black text-white tracking-tighter uppercase mb-1">National SIGINT Mesh</h3>
               <p className="text-[10px] text-white/40 font-bold uppercase tracking-widest mb-6">Active Cell Tower Correlation</p>
               
               <div className="space-y-4">
                  <div className="flex justify-between items-center text-[10px] font-black">
                     <span className="text-white/20 uppercase">Active Handsets</span>
                     <span className="text-white">1,402,981</span>
                  </div>
                  <div className="flex justify-between items-center text-[10px] font-black">
                     <span className="text-white/20 uppercase">Network Load</span>
                     <span className="text-white">42.8%</span>
                  </div>
                  <div className="flex justify-between items-center text-[10px] font-black">
                     <span className="text-white/20 uppercase">Mesh Nodes</span>
                     <span className="text-white">ZA-SAPS-G6</span>
                  </div>
                  <div className="pt-4 border-t border-white/10">
                     <button className="w-full py-3 bg-white text-black text-[10px] font-black uppercase rounded-xl hover:bg-white/80 transition-all flex items-center justify-center gap-2">
                        <RefreshCcw size={14} /> Refresh Global Mesh
                     </button>
                  </div>
               </div>
            </div>

            {/* Signal Strength Legend */}
            <div className="absolute bottom-8 right-8 bg-black/80 backdrop-blur-md border border-white/20 p-4 rounded-xl z-10">
               <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                     <div className="w-2 h-2 bg-white rounded-full" />
                     <span className="text-[8px] font-black text-white/40 uppercase">High Signal</span>
                  </div>
                  <div className="flex items-center gap-2">
                     <div className="w-2 h-2 bg-white/40 rounded-full" />
                     <span className="text-[8px] font-black text-white/40 uppercase">Medium Signal</span>
                  </div>
                  <div className="flex items-center gap-2">
                     <div className="w-2 h-2 bg-white/10 rounded-full" />
                     <span className="text-[8px] font-black text-white/40 uppercase">Low Signal</span>
                  </div>
               </div>
            </div>

            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
               <div className="text-center opacity-[0.03]">
                  <Globe size={500} className="text-white animate-spin-slow" />
               </div>
            </div>
         </div>
      </div>
    );
  };

  const ForensicLabDashboard = ({ 
    labLogs, 
    installedTools, 
    labInput, 
    setLabInput, 
    setLabLogs, 
    handleLabCommand, 
    labScrollRef, 
    editingFile, 
    setEditingFile, 
    editingContent, 
    setEditingContent, 
    setInstalledTools, 
    setCustomScripts 
  }: any) => {
    return (
      <div className="h-full flex flex-col gap-6 animate-in fade-in slide-in-from-top-4 duration-500 overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-full">
          {/* Tool Repository Sidebar (Lab) */}
          <div className="lg:col-span-3 flex flex-col gap-6">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 relative overflow-hidden">
              <h3 className="text-xs font-black text-white uppercase mb-4 flex items-center gap-2">
                <Database size={14} /> Tool Repository
              </h3>
              <div className="space-y-3">
                {[
                  { id: "nmap", name: "Network Mapper", version: "7.92" },
                  { id: "metasploit", name: "Metasploit", version: "6.2.0" },
                  { id: "sqlmap", name: "SQL Injection", version: "1.6.0" },
                  { id: "setoolkit", name: "Social Eng", version: "8.0.3" },
                  { id: "wireshark", name: "Packet Sniffer", version: "4.0.1" }
                ].map((tool) => (
                  <div key={tool.id} className="bg-black/40 border border-white/5 p-3 rounded-xl flex items-center justify-between group hover:border-white/20 transition-all">
                    <div>
                      <p className="text-[10px] font-black text-white uppercase">{tool.name}</p>
                      <p className="text-[8px] font-bold text-white/30">v{tool.version}</p>
                    </div>
                    {installedTools.includes(tool.id) ? (
                      <CheckCircle2 size={14} className="text-green-500" />
                    ) : (
                      <button 
                        onClick={() => {
                           setLabInput(`pkg install ${tool.id}`);
                        }}
                        className="p-1.5 bg-white/10 rounded-lg text-white/40 hover:bg-white hover:text-black transition-all"
                      >
                        <Download size={12} />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="flex-1 bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col justify-center items-center text-center opacity-40">
               <Cpu size={48} className="text-white/20 mb-4" />
               <p className="text-[10px] font-black uppercase tracking-widest">Environment: Linux aarch64</p>
               <p className="text-[8px] font-bold uppercase mt-1">Uptime: 14:02:55</p>
            </div>
          </div>

          {/* Advanced Terminal Engine / Nano Editor */}
          <div className="lg:col-span-9 bg-black border border-white/10 rounded-2xl overflow-hidden flex flex-col shadow-2xl relative">
             {editingFile ? (
                <div className="h-full flex flex-col animate-in zoom-in-95 duration-300">
                   <div className="bg-white text-black px-6 py-2 flex items-center justify-between font-bold text-xs uppercase tracking-widest">
                      <span>GNU nano 6.2</span>
                      <span>Editing: {editingFile}</span>
                      <span>SAPS-LAB-SECURE</span>
                   </div>
                   <textarea 
                     value={editingContent}
                     onChange={(e) => setEditingContent(e.target.value)}
                     className="flex-1 bg-black text-white p-8 font-mono text-sm focus:ring-0 outline-none resize-none leading-relaxed"
                     spellCheck={false}
                     autoFocus
                   />
                   <div className="bg-white/5 border-t border-white/10 p-4 grid grid-cols-4 gap-4">
                      {[
                        { key: "^O", label: "Save", action: () => {
                          setCustomScripts((prev: any) => [...prev.filter((s: any) => s.name !== editingFile), { name: editingFile!, content: editingContent }]);
                          if (!installedTools.includes(editingFile!)) setInstalledTools((prev: any) => [...prev, editingFile!]);
                          setLabLogs((prev: any) => [...prev, { id: Math.random().toString(), msg: `SUCCESS: ${editingFile} written to tactical storage.`, type: "success" }]);
                        }},
                        { key: "^X", label: "Exit", action: () => setEditingFile(null) },
                        { key: "^K", label: "Cut", action: () => {} },
                        { key: "^U", label: "Uncut", action: () => {} }
                      ].map((btn, i) => (
                        <button key={i} onClick={btn.action} className="flex flex-col items-start hover:bg-white/10 p-2 rounded transition-all">
                           <span className="text-[10px] font-black text-white/40">{btn.key}</span>
                           <span className="text-[10px] font-black text-white uppercase">{btn.label}</span>
                        </button>
                      ))}
                   </div>
                </div>
             ) : (
                <>
                   {/* Terminal Header */}
                   <div className="bg-white/5 border-b border-white/10 px-6 py-4 flex items-center justify-between backdrop-blur-md relative z-10">
                      <div className="flex items-center gap-4">
                         <div className="flex gap-1.5">
                            <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
                            <div className="w-2.5 h-2.5 rounded-full bg-amber-500/50" />
                            <div className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
                         </div>
                         <div className="h-4 w-[1px] bg-white/10 mx-2" />
                         <div className="flex items-center gap-2">
                            <Terminal size={14} className="text-white/40" />
                            <span className="text-[10px] font-black text-white/60 uppercase tracking-widest">forensicos@tactical-lab: ~</span>
                         </div>
                      </div>
                      <div className="flex items-center gap-3">
                         <span className="text-[9px] font-black text-white/20 uppercase">Session: TTY1</span>
                         <button onClick={() => setLabLogs([])} className="p-1 text-white/20 hover:text-red-500 transition-colors">
                            <Trash2 size={14} />
                         </button>
                      </div>
                   </div>

                   {/* Terminal Output */}
                   <div ref={labScrollRef} className="flex-1 overflow-y-auto p-6 space-y-2 font-mono text-[11px] scrollbar-hide bg-[#0c0c0c] relative">
                      {/* Background Grid Pattern */}
                      <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:20px_20px]" />
                      
                      {labLogs.map((log: any) => (
                         <div key={log.id} className="animate-in fade-in slide-in-from-bottom-1 duration-300">
                            {log.type === "input" ? (
                               <div className="flex gap-2">
                                  <span className="text-green-500 font-black shrink-0">$</span>
                                  <span className="text-white font-bold">{log.msg.substring(2)}</span>
                               </div>
                            ) : (
                               <div className={cn(
                                  "pl-4 border-l border-white/5 ml-1.5 py-0.5",
                                  log.type === "error" ? "text-red-500 font-bold" :
                                  log.type === "success" ? "text-green-400 font-bold" :
                                  log.type === "system" ? "text-blue-400 font-black italic brightness-125" :
                                  "text-white/70"
                               )}>
                                  {log.msg}
                               </div>
                            )}
                         </div>
                      ))}
                   </div>

                   {/* Command Input Area */}
                   <div className="bg-[#0c0c0c] border-t border-white/10 p-4 relative z-10">
                      <form onSubmit={handleLabCommand} className="flex items-center gap-3">
                         <div className="text-green-500 font-black text-sm shrink-0">➜</div>
                         <input 
                           type="text" 
                           value={labInput}
                           onChange={(e) => setLabInput(e.target.value)}
                           autoFocus
                           className="flex-1 bg-transparent border-none text-white font-mono text-sm focus:ring-0 placeholder:text-white/10 outline-none"
                           placeholder="Type forensic command (e.g. help, pkg install, nmap)..."
                         />
                         <div className="flex items-center gap-2 text-[9px] font-black text-white/20 uppercase tracking-widest">
                            <span className="px-1.5 py-0.5 border border-white/10 rounded">Enter</span>
                            <span>to execute</span>
                         </div>
                      </form>
                   </div>
                </>
             )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex h-screen bg-black text-white font-mono overflow-hidden relative print:bg-white print:text-black">
      {/* CRT Scanline Effect Overlay */}
      <style jsx global>{`
        @keyframes scan {
          from { transform: translateY(-100%); }
          to { transform: translateY(200%); }
        }
        @keyframes progress {
          from { transform: translateX(-100%); }
          to { transform: translateX(100%); }
        }
      `}</style>
      <div className="pointer-events-none absolute inset-0 z-50 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.02),rgba(0,255,0,0.01),rgba(0,0,255,0.02))] bg-[length:100%_4px,3px_100%] opacity-20 print:hidden" />
      
      {/* Sidebar */}
      <aside className="w-72 bg-black/80 backdrop-blur-md border-r border-white/10 flex flex-col z-20 print:hidden">
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-amber-500/10 rounded-lg text-amber-400 border border-amber-500/20">
              <Shield size={24} className="animate-pulse" />
            </div>
            <div>
              <span className="font-black text-xl tracking-tighter text-white">ForensicOS</span>
              <div className="flex items-center gap-2">
                <p className="text-[10px] text-amber-500/70 font-bold uppercase tracking-widest">SAPS-INTEL UNIT</p>
                <span className="bg-red-500/20 text-red-500 text-[7px] px-1 rounded border border-red-500/30 font-black animate-pulse">TEST_MODE</span>
              </div>
            </div>
          </div>
          <div className="mt-4 flex flex-col gap-2">
             <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                   <div className={cn("w-2 h-2 rounded-full", isPaused ? "bg-amber-500" : "bg-amber-500 animate-ping")} />
                   <span className="text-[10px] font-bold text-amber-500">{isPaused ? "NODE: SUSPENDED" : "NODE: ZA-GP-JHB-01"}</span>
                </div>
                <button 
                  onClick={togglePause}
                  className={cn(
                    "px-2 py-0.5 rounded text-[8px] font-black uppercase transition-all border",
                    isPaused ? "bg-amber-500/20 border-amber-500/40 text-amber-500" : "bg-amber-500/10 border-amber-500/30 text-amber-500"
                  )}
                >
                  {isPaused ? "Resume" : "Pause"}
                </button>
             </div>
             <div className="w-full h-[2px] bg-amber-900/20 rounded-full overflow-hidden">
                <div className={cn("h-full bg-amber-500 transition-all duration-1000", isPaused ? "w-0" : "w-full animate-[progress_10s_linear_infinite]")} />
             </div>
          </div>

          <div className="mt-6 pt-6 border-t border-white/10 space-y-4">
             <p className="text-[9px] font-black text-white/40 uppercase tracking-widest">Inter-Agency Uplink Status</p>
             <div className="space-y-2">
                {[
                  { label: "DHA (Home Affairs)", status: "Active", color: "text-white" },
                  { label: "SAPS Criminal DB", status: "Secure", color: "text-white" },
                  { label: "FIC (Financial Intel)", status: "Linked", color: "text-white/60" },
                  { label: "Interpol Node", status: "Searching", color: "text-white/40 animate-pulse" }
                ].map((agency, i) => (
                  <div key={i} className="flex items-center justify-between bg-white/5 px-3 py-2 rounded border border-white/10 group hover:border-white/20 transition-all shadow-inner">
                     <span className="text-[9px] font-bold text-white/30">{agency.label}</span>
                     <span className={cn("text-[8px] font-black uppercase", agency.color)}>{agency.status}</span>
                  </div>
                ))}
             </div>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          <button 
            onClick={() => setActiveView("interceptor")}
            className={cn(
              "w-full flex items-center justify-between px-4 py-3 rounded-lg transition-all group",
              activeView === "interceptor" ? "bg-white/10 text-white border border-white/20" : "hover:bg-white/5 text-white/40 hover:text-white"
            )}
          >
            <div className="flex items-center gap-3">
              <Terminal size={18} />
              <span className="text-sm font-bold">INTERCEPTOR</span>
            </div>
            <Zap size={14} className={cn("transition-opacity", activeView === "interceptor" ? "opacity-100" : "opacity-0 group-hover:opacity-100")} />
          </button>
          
          <button 
            onClick={() => setActiveView("osint")}
            className={cn(
              "w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all",
              activeView === "osint" ? "bg-white/10 text-white border border-white/20" : "hover:bg-white/5 text-white/40 hover:text-white"
            )}
          >
            <Eye size={18} />
            <span className="text-sm font-bold">SUPER OSINT</span>
          </button>
          
          <button 
            onClick={() => setActiveView("map")}
            className={cn(
              "w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all",
              activeView === "map" ? "bg-white/10 text-white border border-white/20" : "hover:bg-white/5 text-white/40 hover:text-white"
            )}
          >
            <Globe size={18} />
            <span className="text-sm font-bold">NETWORK MAP</span>
          </button>

          <button 
            onClick={() => setActiveView("lab")}
            className={cn(
              "w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all",
              activeView === "lab" ? "bg-white/10 text-white border border-white/20" : "hover:bg-white/5 text-white/40 hover:text-white"
            )}
          >
            <Cpu size={18} />
            <span className="text-sm font-bold">FORENSIC LAB</span>
          </button>

          <div className="pt-6">
            <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest px-4 mb-2">Recent Targets</p>
            {history.map((num) => (
              <button 
                key={num}
                onClick={() => {
                  setSearchQuery(num);
                  handleSearch(undefined, num);
                }}
                className="w-full text-left px-4 py-2 text-xs text-white/40 hover:text-white truncate font-bold"
              >
                {">"} {num}
              </button>
            ))}
          </div>
        </nav>

        <div className="p-4 mt-auto border-t border-white/10">
          <div className="bg-white/5 rounded-lg p-3 mb-4 border border-white/5">
            <div className="flex items-center gap-2 mb-1">
              <Activity size={12} className="text-white/60" />
              <span className="text-[10px] font-bold uppercase text-white/40">System Load: {isPaused ? "2%" : "12%"}</span>
            </div>
            <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
               <div className="h-full bg-white/40 transition-all duration-1000" style={{ width: isPaused ? "2%" : "12%" }} />
            </div>
          </div>
          <button 
            onClick={logout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-500/60 hover:bg-red-500/10 hover:text-red-400 transition-all border border-transparent hover:border-red-500/20"
          >
            <LogOut size={18} />
            <span className="text-sm font-bold">TERMINATE SESSION</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden bg-black relative print:bg-white print:overflow-visible">
        {/* Tactical Grid Overlay */}
        <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:40px_40px] z-0" />
        <div className="absolute inset-0 opacity-[0.08] pointer-events-none bg-[radial-gradient(circle_at_center,#ffffff_1px,transparent_1px)] bg-[size:20px_20px] z-0" />
        
        {/* Top Header */}
        <header className="h-14 border-b border-white/10 flex items-center justify-between px-8 bg-black/60 backdrop-blur-md z-20 print:hidden">
          <div className="flex items-center gap-6">
            <h2 className="text-xs font-black tracking-widest text-white uppercase flex items-center gap-2">
              <Lock size={14} /> Advanced Signal Interception
            </h2>
            <div className="h-4 w-[1px] bg-white/10" />
            <div className="flex items-center gap-4 text-[10px] font-bold">
              <span className="text-white/40">ENCRYPTION: AES-256</span>
              <span className="text-white/40">INTEL-LEVEL: ALPHA</span>
            </div>
          </div>
          <div className="flex items-center gap-4 relative z-20">
            <button 
              onClick={() => setShowConfig(true)}
              className="p-2 bg-blue-500/10 rounded-lg text-blue-400 hover:bg-blue-500/20 transition-colors border border-blue-500/30 group"
              title="SS7 Network Config"
            >
               <Server size={18} className="group-hover:rotate-90 transition-transform duration-500" />
            </button>
            <div className="text-right">
              <p className="text-[10px] font-black text-white uppercase tracking-tighter">Sgt. Khumalo [042]</p>
              <p className="text-[9px] text-white/40 uppercase">Auth: Level 4 {isPaused && "| Suspended"}</p>
            </div>
            <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white font-black text-xs">
              SK
            </div>
          </div>
        </header>

        {/* Configuration Modal */}
        {showConfig && (
          <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-md flex items-center justify-center p-6 animate-in fade-in duration-300">
             <div className="bg-black border border-white/10 rounded-2xl w-full max-w-md p-8 shadow-[0_0_50px_rgba(255,255,255,0.05)] relative overflow-hidden">
                <div className="absolute top-0 right-0 p-10 opacity-5 pointer-events-none text-white">
                   <Lock size={120} />
                </div>
                
                <div className="flex justify-between items-start mb-8">
                   <div>
                      <h3 className="text-xl font-black text-white tracking-tighter uppercase mb-1 flex items-center gap-3">
                         <Radio size={24} className="text-blue-400" /> SS7 Uplink Configuration
                      </h3>
                      <p className="text-xs text-white/40 font-bold uppercase tracking-widest">REAL-TIME DATA INTERCEPTION PROTOCOLS</p>
                   </div>
                   <button onClick={() => setShowConfig(false)} className="text-white/20 hover:text-white transition-colors p-1">
                      <X size={20} />
                   </button>
                </div>

                <div className="space-y-6 relative z-10">
                   <div className="bg-white/5 border border-white/10 p-4 rounded-xl space-y-4">
                      <p className="text-[9px] font-black text-white/60 uppercase tracking-widest mb-2 border-b border-white/10 pb-2">Uplink: Telephony (Twilio)</p>
                      <div className="space-y-3">
                         <input 
                           type="password"
                           value={twilioCreds.sid}
                           onChange={(e) => setTwilioCreds({...twilioCreds, sid: e.target.value})}
                           placeholder="Twilio Account SID"
                           className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-white placeholder:text-white/20 focus:outline-none focus:border-white/40 transition-all font-bold text-[10px]"
                         />
                         <input 
                           type="password"
                           value={twilioCreds.token}
                           onChange={(e) => setTwilioCreds({...twilioCreds, token: e.target.value})}
                           placeholder="Twilio Auth Token"
                           className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-white placeholder:text-white/20 focus:outline-none focus:border-white/40 transition-all font-bold text-[10px]"
                         />
                         <input 
                           type="text"
                           value={twilioCreds.from}
                           onChange={(e) => setTwilioCreds({...twilioCreds, from: e.target.value})}
                           placeholder="Twilio Caller ID (+27...)"
                           className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-white placeholder:text-white/20 focus:outline-none focus:border-white/40 transition-all font-bold text-[10px]"
                         />
                      </div>
                   </div>

                   <div className="bg-white/5 border border-white/10 p-4 rounded-xl space-y-4">
                      <p className="text-[9px] font-black text-white/60 uppercase tracking-widest mb-2 border-b border-white/10 pb-2">Uplink: OSINT & Intelligence (Real Data)</p>
                      <div className="space-y-3">
                         <input 
                           type="password"
                           value={osintKeys.numverify}
                           onChange={(e) => setOsintKeys({...osintKeys, numverify: e.target.value})}
                           placeholder="NumVerify API Key"
                           className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-white placeholder:text-white/20 focus:outline-none focus:border-white/40 transition-all font-bold text-[10px]"
                         />
                         <input 
                           type="password"
                           value={osintKeys.abstract}
                           onChange={(e) => setOsintKeys({...osintKeys, abstract: e.target.value})}
                           placeholder="AbstractAPI Key"
                           className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-white placeholder:text-white/20 focus:outline-none focus:border-white/40 transition-all font-bold text-[10px]"
                         />
                      </div>
                   </div>

                   <div className="pt-2">
                      <button 
                        onClick={() => {
                          setShowConfig(false);
                          addLog("Intelligence Uplink initialized with provided parameters.", "success");
                        }}
                        className="w-full py-4 bg-blue-500 text-white font-black rounded-xl hover:bg-blue-400 transition-all shadow-[0_0_20px_rgba(59,130,246,0.3)] flex items-center justify-center gap-2"
                      >
                         <CheckCircle2 size={18} /> INITIALIZE HANDSHAKE
                      </button>
                   </div>
                </div>
             </div>
          </div>
        )}

        {/* Warrant Gate */}
        {showWarrant && (
          <div className="fixed inset-0 z-[120] bg-black/90 backdrop-blur-xl flex items-center justify-center p-6 animate-in fade-in duration-300">
             <div className="bg-black border border-red-500/30 rounded-2xl w-full max-w-lg p-10 shadow-[0_0_100px_rgba(239,68,68,0.1)] relative overflow-hidden text-center">
                <div className="absolute top-0 left-0 right-0 h-1 bg-red-600 animate-pulse" />
                <div className="mb-8 flex flex-col items-center">
                   <div className="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center text-red-500 mb-4 animate-bounce">
                      <Gavel size={40} />
                   </div>
                   <h3 className="text-2xl font-black text-white tracking-tighter uppercase mb-2">Legal Authorization Required</h3>
                   <p className="text-[10px] text-red-900 font-bold uppercase tracking-widest px-8">Section 42-A Interception of Communications Act</p>
                </div>
                
                <div className="space-y-6">
                   <div className="p-4 bg-red-500/5 border border-red-500/20 rounded-xl text-left">
                      <p className="text-[11px] font-black text-white uppercase mb-2 flex items-center gap-2">
                         <AlertCircle size={14} className="text-red-500" /> Compliance Warning
                      </p>
                      <p className="text-[9px] text-red-900 font-bold leading-relaxed uppercase">
                         Unauthorized use of this terminal without a valid judicial warrant is a federal offense. All search queries are logged with the Financial Intelligence Centre (FIC).
                      </p>
                   </div>

                   <div className="space-y-2 text-left">
                      <label className="text-[10px] font-black text-white/40 uppercase tracking-widest px-1">Case/Warrant ID</label>
                      <input 
                        type="text"
                        value={warrantId}
                        onChange={(e) => setWarrantId(e.target.value)}
                        placeholder="CAS-2024-ZA-XXXX"
                        className="w-full bg-black/60 border border-red-900/50 rounded-lg px-4 py-4 text-white placeholder:text-red-950 focus:outline-none focus:border-red-500/50 transition-all font-black text-lg tracking-widest"
                      />
                   </div>

                   <div className="pt-4 flex flex-col gap-3">
                      <button 
                        onClick={() => {
                          if (warrantId.length > 5) {
                            setShowWarrant(false);
                            addLog(`WARRANT VERIFIED: Authorization ${warrantId} logged.`, "success");
                            if (searchQuery) handleSearch();
                          }
                        }}
                        className="w-full py-4 bg-red-600 text-white font-black rounded-xl hover:bg-red-500 transition-all shadow-[0_0_30px_rgba(220,38,38,0.2)] flex items-center justify-center gap-2"
                      >
                         <CheckCircle2 size={18} /> AUTHORIZE INTERCEPTION
                      </button>
                      <button 
                        onClick={() => setShowWarrant(false)}
                        className="text-[10px] font-black text-white/20 uppercase hover:text-white transition-colors"
                      >
                         Cancel Request
                      </button>
                   </div>
                </div>
             </div>
          </div>
        )}

        {/* Forensic Report Modal */}
        {showDossier && liveResult && (
          <div className="fixed inset-0 z-[110] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-8 animate-in zoom-in-95 duration-300">
             <div className="bg-black border border-white/10 rounded-2xl w-full max-w-6xl h-full flex flex-col relative overflow-hidden shadow-[0_0_100px_rgba(255,255,255,0.05)]">
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
                
                <header className="px-8 py-6 border-b border-white/10 flex items-center justify-between bg-white/5 relative z-10">
                   <div className="flex items-center gap-6">
                      <div className="p-3 bg-white text-black rounded-lg">
                         <Shield size={28} />
                      </div>
                      <div>
                         <h2 className="text-2xl font-black text-white tracking-tighter uppercase leading-none mb-1">Forensic Intelligence Report</h2>
                         <div className="flex items-center gap-3">
                            <span className="text-[10px] font-black text-white/40 tracking-[0.2em] uppercase">CASE_ID: ZA-{liveResult.phoneNumber.substring(7)}-{liveResult.imei.substring(12)}</span>
                            <span className="w-1 h-1 rounded-full bg-white/10" />
                            <span className="text-[10px] font-black text-white/20 uppercase">CLASSIFICATION: TOP SECRET // SAPS-INTEL</span>
                         </div>
                      </div>
                   </div>
                   <div className="flex items-center gap-4">
                      <button 
                        onClick={() => window.print()}
                        className="p-3 bg-white/10 border border-white/20 text-white rounded-lg hover:bg-white hover:text-black transition-all flex items-center gap-2 text-xs font-black uppercase"
                      >
                         <Download size={16} /> DOWNLOAD_AS_PDF
                      </button>
                      <button 
                        onClick={() => setShowDossier(false)}
                        className="p-3 bg-red-500/10 border border-red-500/30 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition-all"
                      >
                         <X size={20} />
                      </button>
                   </div>
                </header>

                <div className="flex-1 overflow-y-auto p-8 relative z-10">
                   <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
                      <div className="lg:col-span-4 space-y-8">
                         <div className="bg-white/5 border border-white/10 p-6 rounded-xl flex flex-col items-center text-center">
                            <div className="relative mb-6">
                               <div className="absolute inset-0 border-2 border-white/20 rounded-full animate-spin-slow" />
                               <div className="w-32 h-32 rounded-full border-4 border-white overflow-hidden bg-black flex items-center justify-center">
                                  {imageError ? <User size={64} className="text-white/20" /> : <Image src={liveResult.visualIntel.subjectCaptureUrl} alt="Subject" width={128} height={128} className="w-full h-full object-cover" onError={() => setImageError(true)} />}
                                </div>
                               <div className="absolute bottom-0 right-0 bg-white text-black px-2 py-1 rounded text-[10px] font-black uppercase">
                                  94.8% Match
                               </div>
                            </div>
                            <h3 className="text-2xl font-black text-white uppercase tracking-tighter mb-1">{liveResult.identity.fullName}</h3>
                            <p className="text-[10px] font-black text-white/40 uppercase tracking-widest mb-4">Target Identity Reconstructed</p>
                            <div className="w-full pt-4 border-t border-white/10 flex justify-around">
                               <div className="text-center">
                                  <p className="text-[8px] font-black text-white/20 uppercase">Risk Level</p>
                                  <p className="text-sm font-black text-red-500">{liveResult.identity.riskScore}%</p>
                               </div>
                               <div className="text-center border-x border-white/10 px-6">
                                  <p className="text-[8px] font-black text-white/20 uppercase">Status</p>
                                  <p className="text-sm font-black text-white">{liveResult.identity.status}</p>
                               </div>
                               <div className="text-center">
                                  <p className="text-[8px] font-black text-white/20 uppercase">Node Sync</p>
                                  <p className="text-sm font-black text-white">Active</p>
                               </div>
                            </div>
                         </div>

                         <div className="bg-white/5 border border-white/10 p-6 rounded-xl space-y-4">
                            <h4 className="text-[10px] font-black text-white uppercase mb-4 flex items-center gap-2">
                               <Fingerprint size={14} /> Biometric Registry
                            </h4>
                            <div className="space-y-3">
                               <div className="flex justify-between items-center text-[11px] border-b border-white/5 pb-2">
                                  <span className="text-white/40 font-bold">SA ID Number</span>
                                  <span className="text-white font-black">{liveResult.identity.idNumber}</span>
                               </div>
                               <div className="flex justify-between items-center text-[11px] border-b border-white/5 pb-2">
                                  <span className="text-white/40 font-bold">Biometric Sync</span>
                                  <span className="text-white font-black uppercase">Verified</span>
                               </div>
                               <div className="flex justify-between items-center text-[11px] border-b border-white/5 pb-2">
                                  <span className="text-white/40 font-bold">Passport Status</span>
                                  <span className="text-white font-black uppercase">Active</span>
                               </div>
                               <div className="flex justify-between items-center text-[11px]">
                                  <span className="text-white/40 font-bold">Interpol Check</span>
                                  <span className="text-white font-black uppercase">Clear</span>
                               </div>
                            </div>
                         </div>
                      </div>

                      <div className="lg:col-span-8 space-y-8">
                         <div className="bg-white/5 border border-white/10 p-6 rounded-xl">
                            <h4 className="text-[10px] font-black text-white uppercase mb-6 flex items-center gap-2">
                               <Target size={14} /> Geospatial Interrogation
                            </h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                               <div className="relative aspect-video bg-black border border-white/10 rounded-xl overflow-hidden group">
                                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_rgba(255,255,255,0.05)_100%)]" />
                                  <div className="absolute inset-0 opacity-10 pointer-events-none bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:40px_40px]" />
                                  <div className="absolute w-1 h-32 bg-gradient-to-t from-white to-transparent origin-bottom animate-pulse pointer-events-none" style={{ left: '50%', bottom: '50%', transform: `translateX(-50%) rotate(${liveResult.sigint.predictiveVector.heading}deg)`, opacity: isPaused ? 0.2 : 0.6 }} />
                                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                                     <div className="relative">
                                        <div className="absolute inset-0 bg-white rounded-full animate-ping opacity-75" />
                                        <div className="relative w-4 h-4 bg-white rounded-full border-2 border-black shadow-[0_0_15px_rgba(255,255,255,1)]" />
                                     </div>
                                  </div>
                                  <div className="absolute top-4 left-4 flex flex-col gap-2">
                                     <div className="bg-black/80 backdrop-blur border border-white/20 px-3 py-1.5 rounded-lg text-[10px] font-black text-white">
                                        LAT: {liveResult.location.lat.toFixed(6)}<br />LNG: {liveResult.location.lng.toFixed(6)}
                                     </div>
                                     <div className="bg-black/80 backdrop-blur border border-white/20 px-3 py-1.5 rounded-lg text-[10px] font-black">
                                        <p className="text-[8px] font-black text-white/40 uppercase tracking-widest mb-1">Vector Projection</p>
                                        <div className="flex items-center gap-3 text-white">
                                           <span>HDG: {liveResult.sigint.predictiveVector.heading}°</span>
                                           <span className="text-white/60">{liveResult.sigint.predictiveVector.confidence.toFixed(1)}% CONF</span>
                                        </div>
                                     </div>
                                  </div>
                               </div>

                               <div className="space-y-6">
                                  <div className="bg-white/5 border border-white/10 p-5 rounded-xl space-y-3">
                                     <div className="flex justify-between items-center border-b border-white/10 pb-2">
                                        <span className="text-[10px] font-black text-white/40 uppercase">Target Name</span>
                                        <span className="text-xs font-black text-white uppercase">{liveResult.identity.fullName}</span>
                                     </div>
                                     <div className="flex justify-between items-center border-b border-white/10 pb-2">
                                        <span className="text-[10px] font-black text-white/40 uppercase">Mobile Number</span>
                                        <div className="text-right">
                                           <span className="text-xs font-black text-white block">{liveResult.phoneNumber}</span>
                                           <a href={`https://www.google.com/search?q=%22${liveResult.phoneNumber.replace(/\+/g, '%2B')}%22`} target="_blank" rel="noreferrer" className="text-[8px] text-white/40 hover:text-white underline font-bold uppercase">Verify Live Web Hits</a>
                                        </div>
                                     </div>
                                     <div className="flex justify-between items-center border-b border-white/10 pb-2">
                                        <span className="text-[10px] font-black text-white/40 uppercase">IMEI Registry</span>
                                        <span className="text-xs font-black text-white">{liveResult.imei}</span>
                                     </div>
                                     <div className="flex justify-between items-center">
                                        <span className="text-[10px] font-black text-white/40 uppercase">Carrier Network</span>
                                        <span className="text-xs font-black text-white">{liveResult.carrier} [LTE-SA]</span>
                                     </div>
                                  </div>
                                  <div className="grid grid-cols-2 gap-4">
                                     <div className="p-4 bg-white/5 border border-white/10 rounded-xl">
                                        <p className="text-[8px] font-black text-white/20 uppercase mb-1">Satellite Relay</p>
                                        <p className="text-[11px] font-black text-white">{liveResult.satelliteRelay.satName}</p>
                                        <p className="text-[9px] font-bold text-white/40">{liveResult.satelliteRelay.orbitalSlot}</p>
                                     </div>
                                     <div className="p-4 bg-white/5 border border-white/10 rounded-xl">
                                        <p className="text-[8px] font-black text-white/20 uppercase mb-1">Network Node</p>
                                        <p className="text-[11px] font-black text-white">{liveResult.networkNode}</p>
                                        <p className="text-[9px] font-bold text-white/40">JHB-GP-04</p>
                                     </div>
                                  </div>
                               </div>
                            </div>
                         </div>

                         <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                            <div className="md:col-span-7 bg-white/5 border border-white/10 p-6 rounded-xl relative overflow-hidden">
                               <h4 className="text-[10px] font-black text-white uppercase mb-6 flex items-center gap-2">
                                  <Share2 size={14} /> Neural Social Graph Reconstruction
                               </h4>
                               <div className="relative h-48 bg-black/40 rounded-xl border border-white/10 overflow-hidden flex items-center justify-center">
                                  <div className="relative z-10 w-12 h-12 bg-white rounded-full flex items-center justify-center text-black shadow-[0_0_20px_rgba(255,255,255,0.5)]">
                                     <User size={20} />
                                  </div>
                                  {liveResult.sigint.neuralGraphNodes.filter(n => n.id !== "1").map((node, i) => (
                                     <div key={i} className="absolute flex flex-col items-center gap-1 animate-in fade-in zoom-in duration-1000" style={{ transform: `rotate(${i * 90}deg) translateY(-60px) rotate(-${i * 90}deg)` }}>
                                        <div className={cn("w-8 h-8 rounded-full border-2 flex items-center justify-center text-[8px]", "border-white text-white")}>
                                           {node.type === "person" ? <User size={12} /> : node.type === "organization" ? <Shield size={12} /> : <MapPin size={12} />}
                                        </div>
                                        <div className="bg-black/80 px-1.5 py-0.5 rounded border border-white/20">
                                           <p className="text-[7px] font-black text-white truncate max-w-[50px]">{node.label}</p>
                                           <p className="text-[6px] font-bold text-white/40 uppercase">{node.connection}</p>
                                        </div>
                                     </div>
                                  ))}
                                  <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_#ffffff_1px,_transparent_1px)] bg-[length:20px_20px]" />
                               </div>
                            </div>

                            <div className="md:col-span-5 bg-white/5 border border-white/10 p-6 rounded-xl relative overflow-hidden">
                               <h4 className="text-[10px] font-black text-white uppercase mb-6 flex items-center gap-2">
                                  <Camera size={14} /> ANPR: Vehicle Correlation
                               </h4>
                               {liveResult.sigint.anprHit ? (
                                  <div className="space-y-4">
                                     <div className="p-4 bg-white/5 border border-white/20 rounded-xl">
                                        <div className="flex justify-between items-center mb-3">
                                           <span className="text-[9px] font-black text-white/40 uppercase">Detection Lock</span>
                                           <span className="text-[9px] font-black text-white animate-pulse uppercase">Match {liveResult.sigint.anprHit.confidence.toFixed(1)}%</span>
                                        </div>
                                        <div className="bg-white text-black font-mono font-black text-2xl tracking-widest py-2 rounded text-center border-b-4 border-black/20">
                                           {liveResult.sigint.anprHit.plate}
                                        </div>
                                        <div className="mt-4 grid grid-cols-2 gap-4">
                                           <div>
                                              <p className="text-[8px] font-black text-white/40 uppercase">Make/Model</p>
                                              <p className="text-[10px] font-black text-white">{liveResult.sigint.anprHit.make}</p>
                                           </div>
                                           <div className="text-right">
                                              <p className="text-[8px] font-black text-white/40 uppercase">Color</p>
                                              <p className="text-[10px] font-black text-white">{liveResult.sigint.anprHit.color}</p>
                                           </div>
                                        </div>
                                     </div>
                                  </div>
                               ) : (
                                  <div className="h-full flex flex-col items-center justify-center py-8 text-white/10">
                                     <EyeOff size={40} className="mb-2" />
                                     <p className="text-[8px] font-black uppercase">No Correlated Vehicle Found</p>
                                  </div>
                               )}
                            </div>
                         </div>
                      </div>
                   </div>
                </div>
             </div>
          </div>
        )}

        <div className="flex-1 flex flex-col p-6 overflow-hidden relative z-10">
          {activeView === "interceptor" && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-full overflow-hidden animate-in fade-in duration-500">
              <div className="lg:col-span-4 flex flex-col gap-6 h-full overflow-hidden">
                <div className="bg-black border border-white/10 rounded-xl p-6 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-2 opacity-10">
                     <Target size={80} className="text-white" />
                  </div>
                  <h3 className="text-xs font-black text-white uppercase mb-4 flex items-center gap-2">
                    <Search size={14} /> Target Interception
                  </h3>
                  <form onSubmit={handleSearch} className="space-y-4">
                    <div className="relative">
                      <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Enter Target Number..." className="w-full bg-black/60 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-white/40 transition-all font-bold" />
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 text-white/20">
                        <Phone size={16} />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <button type="submit" disabled={isSearching || isBruteForcing} className="py-3 bg-white text-black font-black rounded-lg hover:bg-white/80 disabled:opacity-50 transition-all flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(255,255,255,0.1)] text-xs">
                        {isSearching ? <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" /> : <>SCAN TARGET</>}
                      </button>
                      <button type="button" onClick={handleBruteForce} disabled={isSearching || isBruteForcing} className="py-3 bg-red-600 text-white font-black rounded-lg hover:bg-red-500 disabled:opacity-50 transition-all flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(220,38,38,0.3)] text-xs">
                        {isBruteForcing ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <><Zap size={14} /> BRUTE FORCE</>}
                      </button>
                    </div>
                  </form>
                </div>

                {isBruteForcing && (
                  <div className="bg-red-950/40 border border-red-500/30 rounded-xl p-6 relative overflow-hidden animate-pulse">
                     <div className="flex items-center gap-4 mb-4">
                        <div className="p-3 bg-red-500/20 rounded-full text-red-500 animate-bounce">
                           <Phone size={24} />
                        </div>
                        <div>
                           <p className="text-[10px] font-black text-red-500 uppercase tracking-widest">Active Pulse Ping</p>
                           <p className="text-xl font-black text-white">{searchQuery}</p>
                        </div>
                     </div>
                     <div className="space-y-2">
                        <div className="flex justify-between text-[10px] font-bold">
                           <span className="text-red-900 uppercase">Uplink Status</span>
                           <span className="text-white uppercase">{pingCallStatus}...</span>
                        </div>
                        <div className="w-full h-1 bg-red-950 rounded-full overflow-hidden">
                           <div className="h-full bg-red-500 transition-all duration-1000" style={{ width: pingCallStatus === "dialing" ? "33%" : pingCallStatus === "ringing" ? "66%" : pingCallStatus === "intercepted" ? "100%" : "0%" }} />
                        </div>
                     </div>
                  </div>
                )}

                <div className="bg-black/60 border border-green-500/30 rounded-xl overflow-hidden flex flex-col h-[350px] shadow-[0_0_30px_rgba(34,197,94,0.05)]">
                  <div className="bg-green-500/10 px-4 py-2 border-b border-green-500/20 flex items-center justify-between">
                     <div className="flex items-center gap-2">
                       <Terminal size={12} className="text-green-500" />
                       <span className="text-[10px] font-black uppercase text-green-500">Interception Terminal</span>
                     </div>
                     <div className="flex items-center gap-3">
                        <button onClick={togglePause} className={cn("p-1 rounded hover:bg-white/10 transition-colors", isPaused ? "text-amber-500" : "text-green-500")}>
                          {isPaused ? <Play size={12} /> : <Pause size={12} />}
                        </button>
                        <button onClick={clearTerminal} className="text-green-900 hover:text-red-500 transition-colors">
                          <Trash2 size={12} />
                        </button>
                     </div>
                  </div>
                  <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-2 font-mono text-[10px] scrollbar-hide">
                    {logs.length === 0 && <p className="text-green-900 italic">Waiting for signal intercept...</p>}
                    {logs.map((log) => (
                      <div key={log.id} className="flex gap-3 group">
                        <span className="text-green-900 shrink-0 select-none">[{log.time}]</span>
                        <p className={cn(
                          "break-all",
                          log.type === "success" ? "text-green-400 font-bold" :
                          log.type === "error" ? "text-red-500 font-bold" :
                          log.type === "warning" ? "text-amber-500" :
                          log.type === "cmd" ? "text-green-500 font-black brightness-125" :
                          log.type === "live" ? "text-green-400 animate-pulse font-black" : "text-green-500/70"
                        )}>
                          <span className="mr-2 select-none">{log.type === "cmd" ? "#" : ">"}</span>
                          {log.msg}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="lg:col-span-8 h-full overflow-hidden flex flex-col gap-6">
                {hasSearched && !isSearching && !isBruteForcing && liveResult ? (
                  <div className="space-y-6 animate-in fade-in zoom-in-95 duration-500 h-full overflow-y-auto pr-2 scrollbar-hide">
                    <div className="bg-white/5 border border-white/10 rounded-xl p-6 relative overflow-hidden">
                      <div className="absolute top-0 right-0 p-8 opacity-5">
                         <Shield size={120} className="text-white" />
                      </div>
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
                        <div>
                          <div className="flex items-center gap-3 mb-2">
                             <span className="px-2 py-0.5 bg-white/10 text-white text-[8px] font-black rounded uppercase tracking-widest border border-white/20">Target Found</span>
                             <span className="text-[10px] font-black text-white/40 uppercase">Signal Stability: {liveResult.signalDb}dBm</span>
                          </div>
                          <h1 className="text-4xl font-black text-white tracking-tighter mb-2">{liveResult.phoneNumber}</h1>
                          <div className="flex flex-wrap items-center gap-4 text-[10px] font-black text-white/40 uppercase">
                             <span className="flex items-center gap-1"><User size={12} /> {liveResult.identity.fullName}</span>
                             <span className="flex items-center gap-1"><Cpu size={12} /> IMEI: {liveResult.imei}</span>
                             <span className="flex items-center gap-1"><Radio size={12} /> {liveResult.carrier}</span>
                          </div>
                        </div>
                        <div className="flex gap-3 print:hidden">
                          <button onClick={() => setShowDossier(true)} className="flex items-center gap-2 bg-white/10 border border-white/20 text-white px-4 py-2 rounded-lg text-xs font-black hover:bg-white hover:text-black transition-all">
                             <FileText size={14} /> VIEW FULL DOSSIER
                          </button>
                          <button onClick={handleExport} className="flex items-center gap-2 bg-white text-black px-4 py-2 rounded-lg text-xs font-black hover:bg-white/80 transition-all">
                             <Download size={14} /> EXPORT PDF
                          </button>
                          <button className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg text-xs font-black hover:bg-red-500 transition-all shadow-[0_0_20px_rgba(220,38,38,0.3)]">
                             <AlertTriangle size={14} /> DISPATCH UNIT
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-white/5 border border-white/10 rounded-xl p-6 relative overflow-hidden aspect-video">
                         <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#ffffff_1px,_transparent_1px)] bg-[size:20px_20px] opacity-[0.03]" />
                         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                            <div className="relative">
                               <div className="absolute inset-0 bg-white rounded-full animate-ping opacity-25" />
                               <div className="relative w-4 h-4 bg-white rounded-full border-2 border-black" />
                            </div>
                         </div>
                         <div className="absolute bottom-4 left-4 right-4 bg-black/60 backdrop-blur border border-white/10 p-3 rounded-lg flex items-center justify-between">
                            <div className="flex items-center gap-3">
                               <MapPin size={16} className="text-white" />
                               <div>
                                  <p className="text-[10px] font-black text-white">{liveResult.location.suburb}, {liveResult.location.city}</p>
                                  <p className="text-[8px] font-bold text-white/40 uppercase tracking-tighter">{liveResult.location.address}</p>
                               </div>
                            </div>
                            <div className="text-right">
                               <p className="text-[10px] font-black text-white">LAT: {liveResult.location.lat.toFixed(4)}</p>
                               <p className="text-[10px] font-black text-white">LNG: {liveResult.location.lng.toFixed(4)}</p>
                            </div>
                         </div>
                      </div>

                      <div className="bg-black border border-white/10 rounded-xl p-6 relative overflow-hidden flex flex-col justify-between">
                         <h5 className="text-[10px] font-black text-white/40 uppercase mb-4 flex items-center gap-2">
                            <Mic size={14} /> SIGINT: Voiceprint Intercept
                         </h5>
                         <div className="h-20 flex items-end gap-1 px-1 bg-white/5 rounded border border-white/10">
                            {[...Array(18)].map((_, i) => (
                               <div key={i} className={cn("flex-1 bg-white/20 rounded-t-sm transition-all duration-300", !isPaused && "animate-[bounce_1s_infinite_ease-in-out]")} style={{ height: `${eqHeights[i]}%`, animationDelay: `${i * 0.05}s` }} />
                            ))}
                         </div>
                         <div className="mt-4 flex justify-between items-center">
                            <span className="text-[8px] font-black text-white/40 uppercase">Voice ID: {liveResult.sigint.voicePrintId}</span>
                            <span className="text-[8px] font-black text-white animate-pulse uppercase">Intercepting...</span>
                         </div>
                      </div>
                    </div>
                  </div>
                ) : isSearching ? (
                  <div className="h-full flex flex-col items-center justify-center space-y-8 py-20">
                     <div className="relative">
                        <div className="w-32 h-32 border-4 border-white/5 rounded-full" />
                        <div className="absolute inset-0 border-4 border-t-white rounded-full animate-spin" />
                        <div className="absolute inset-0 flex items-center justify-center">
                           <Scan size={32} className="text-white animate-pulse" />
                        </div>
                     </div>
                     <div className="text-center space-y-2">
                        <h3 className="text-xl font-black text-white uppercase tracking-tighter">Triangulating SS7 Uplink</h3>
                        <p className={cn("text-[10px] font-black uppercase tracking-[0.3em]", isBruteForcing ? "text-red-500" : "text-white/40")}>
                          {isBruteForcing ? "Bypassing Handset Encryption..." : "Establishing Multi-Node Correlation..."}
                        </p>
                     </div>
                  </div>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center space-y-6 opacity-40 py-20">
                     <div className="grid grid-cols-2 gap-4">
                        <div className="p-10 border border-white/10 rounded-xl flex flex-col items-center gap-4 bg-white/5">
                           <Shield size={48} className="text-white/20" />
                           <span className="text-[10px] font-black uppercase">Secure Protocol</span>
                        </div>
                        <div className="p-10 border border-white/10 rounded-xl flex flex-col items-center gap-4 bg-white/5">
                           <Database size={48} className="text-white/20" />
                           <span className="text-[10px] font-black uppercase">Central Archive</span>
                        </div>
                     </div>
                     <p className="text-[10px] font-bold text-white/20 uppercase tracking-[0.3em]">System Idle. Waiting for Target Interception CMD.</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeView === "osint" && <OsintDashboard />}
          {activeView === "map" && <NetworkMapDashboard />}
          {activeView === "lab" && <ForensicLabDashboard />}
        </div>
      </main>
      
      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
        @keyframes spin-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .animate-spin-slow { animation: spin-slow 12s linear infinite; }
      `}</style>
    </div>
  );
}
