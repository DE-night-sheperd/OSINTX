export interface DeviceRecord {
  phoneNumber: string;
  lastSeen: string;
  location: {
    lat: number;
    lng: number;
    address: string;
    city: string;
  };
  status: "online" | "offline";
  deviceName: string;
  carrier: string;
  phoneModel: string;
  imei: string;
  simSerial: string;
  socialMediaStatus: {
    platform: "WhatsApp" | "Facebook" | "Instagram" | "Twitter";
    lastActive: string;
    status: string;
    lastActivityLocation: string;
  };
}

export const mockRecords: DeviceRecord[] = [
  {
    phoneNumber: "0812345678",
    lastSeen: "2026-03-06T10:30:00Z",
    location: {
      lat: -26.2041,
      lng: 28.0473,
      address: "123 Commissioner St",
      city: "Johannesburg",
    },
    status: "offline",
    deviceName: "iPhone 13 Pro Max",
    phoneModel: "Apple A2643",
    imei: "358204120384921",
    simSerial: "8927103847291034",
    carrier: "Vodacom",
    socialMediaStatus: {
      platform: "WhatsApp",
      lastActive: "2026-03-06T10:28:00Z",
      status: "Last seen 2 mins before device went offline",
      lastActivityLocation: "Johannesburg CBD",
    },
  },
  {
    phoneNumber: "0729876543",
    lastSeen: "2026-03-06T13:45:00Z",
    location: {
      lat: -33.9249,
      lng: 18.4241,
      address: "45 Long St",
      city: "Cape Town",
    },
    status: "online",
    deviceName: "Samsung Galaxy S22 Ultra",
    phoneModel: "Samsung SM-S908B",
    imei: "359218472910482",
    simSerial: "8927104829103847",
    carrier: "MTN",
    socialMediaStatus: {
      platform: "Instagram",
      lastActive: "2026-03-06T13:42:00Z",
      status: "Active now (Story posted 3 mins ago)",
      lastActivityLocation: "V&A Waterfront",
    },
  },
  {
    phoneNumber: "0631112222",
    lastSeen: "2026-03-05T22:15:00Z",
    location: {
      lat: -29.8587,
      lng: 31.0218,
      address: "88 West St",
      city: "Durban",
    },
    status: "offline",
    deviceName: "Huawei P40 Pro",
    phoneModel: "Huawei ELS-NX9",
    imei: "358102948271039",
    simSerial: "8927105829103741",
    carrier: "Telkom",
    socialMediaStatus: {
      platform: "Facebook",
      lastActive: "2026-03-05T22:10:00Z",
      status: "Last active 5 mins before signal loss",
      lastActivityLocation: "Durban North",
    },
  },
];
