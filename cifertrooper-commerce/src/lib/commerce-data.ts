export interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  category: "Gadgets" | "Kits";
  image: string;
  description: string;
}

export const COMMERCE_DATA: Product[] = [
  // Gadgets
  {
    id: "1143",
    name: "BLUETOOTH RUBBER DUCKY",
    slug: "bluetooth-rubber-ducky",
    price: 2000,
    category: "Gadgets",
    image: "/assets/products/Front.png",
    description: "A powerful Bluetooth-enabled rubber ducky for advanced security testing and automation."
  },
  {
    id: "1137",
    name: "G DUCKY",
    slug: "g-ducky",
    price: 3000,
    category: "Gadgets",
    image: "/assets/products/Front.png",
    description: "Premium G Ducky gadget for professional penetration testers."
  },
  {
    id: "1059",
    name: "LAZY PAD",
    slug: "lazy-pad",
    price: 1200,
    category: "Gadgets",
    image: "/assets/products/FRONT-1.png",
    description: "Compact and efficient lazy pad for quick deployments."
  },
  {
    id: "1145",
    name: "M-TOOL",
    slug: "m-tool",
    price: 3000,
    category: "Gadgets",
    image: "/assets/products/M-TOOL-FRONT.png",
    description: "Multi-tool gadget designed for versatile field operations."
  },
  {
    id: "1144",
    name: "REMOTE CONTROL RUBBER DUCKY",
    slug: "remote-control-rubber-ducky",
    price: 5000,
    category: "Gadgets",
    image: "/assets/products/Front.png",
    description: "Remote-controlled payload delivery system in a ducky form factor."
  },
  {
    id: "1136",
    name: "RUBBER DUCKY",
    slug: "rubber-ducky",
    price: 1800,
    category: "Gadgets",
    image: "/assets/products/Front.png",
    description: "The classic rubber ducky tool for rapid keystroke injection."
  },
  {
    id: "1053",
    name: "WI CAP",
    slug: "wi-cap",
    price: 2000,
    category: "Gadgets",
    image: "/assets/products/M-TOOL-FRONT.png",
    description: "Wireless capture tool for network analysis on the go."
  },
  {
    id: "1146",
    name: "WI CLONE",
    slug: "wi-clone",
    price: 2000,
    category: "Gadgets",
    image: "/assets/products/M-TOOL-FRONT.png",
    description: "Advanced wireless cloning gadget for security auditing."
  },
  {
    id: "1147",
    name: "WIFI ANALYZER",
    slug: "wifi-analyzer",
    price: 2000,
    category: "Gadgets",
    image: "/assets/products/M-TOOL-FRONT.png",
    description: "Professional WiFi analysis tool for signal tracking and security assessment."
  },
  {
    id: "1148",
    name: "WIFI DEAUTHER",
    slug: "wifi-deauther",
    price: 2000,
    category: "Gadgets",
    image: "/assets/products/M-TOOL-FRONT.png",
    description: "Compact WiFi deauther for testing network resilience."
  },
  {
    id: "1139",
    name: "WIFI RUBBER DUCKY",
    slug: "wifi-rubber-ducky",
    price: 3000,
    category: "Gadgets",
    image: "/assets/products/Front.png",
    description: "WiFi-enabled rubber ducky for remote payload management."
  },

  // Kits
  {
    id: "1163",
    name: "BLUETOOTH RUBBER DUCKY (KIT)",
    slug: "bluetooth-rubber-ducky-kit",
    price: 1500,
    category: "Kits",
    image: "/assets/products/g-ducky-kit.png",
    description: "Complete kit for building and customizing your own Bluetooth rubber ducky."
  },
  {
    id: "1176",
    name: "G DUCKY (KIT)",
    slug: "g-ducky-kit",
    price: 2500,
    category: "Kits",
    image: "/assets/products/g-ducky-kit.png",
    description: "Full assembly kit for the G Ducky professional gadget."
  },
  {
    id: "1156",
    name: "LAZY PAD (KIT)",
    slug: "lazy-pad-kit",
    price: 1000,
    category: "Kits",
    image: "/assets/products/lazy-pad-kit.png",
    description: "DIY kit for the compact lazy pad gadget."
  },
  {
    id: "1157",
    name: "M-TOOL (KIT)",
    slug: "m-tool-kit",
    price: 2500,
    category: "Kits",
    image: "/assets/products/m-tool-kit-1.png",
    description: "Assembly kit for the versatile M-Tool gadget."
  },
  {
    id: "1162",
    name: "REMOTE CONTROL RUBBER DUCKY (KIT)",
    slug: "remote-control-rubber-ducky-kit",
    price: 4500,
    category: "Kits",
    image: "/assets/products/g-ducky-kit.png",
    description: "Comprehensive kit for building a remote-controlled ducky system."
  },
  {
    id: "1177",
    name: "RUBBER DUCKY (KIT)",
    slug: "rubber-ducky-kit",
    price: 1300,
    category: "Kits",
    image: "/assets/products/g-ducky-kit.png",
    description: "The original rubber ducky DIY kit."
  },
  {
    id: "1158",
    name: "WI CAP (KIT)",
    slug: "wi-cap-kit",
    price: 1500,
    category: "Kits",
    image: "/assets/products/m-tool-kit-1.png",
    description: "Complete wireless capture tool assembly kit."
  },
  {
    id: "1161",
    name: "WI CLONE (KIT)",
    slug: "wi-clone-kit",
    price: 1500,
    category: "Kits",
    image: "/assets/products/m-tool-kit-1.png",
    description: "Kit for building your own wireless cloning tool."
  },
  {
    id: "1159",
    name: "WIFI ANALYZER (KIT)",
    slug: "wifi-analyzer-kit",
    price: 1500,
    category: "Kits",
    image: "/assets/products/m-tool-kit-1.png",
    description: "Full kit for the WiFi analyzer security tool."
  },
  {
    id: "1160",
    name: "WIFI DEAUTHER (KIT)",
    slug: "wifi-deauther-kit",
    price: 1500,
    category: "Kits",
    image: "/assets/products/m-tool-kit-1.png",
    description: "Assembly kit for the compact WiFi deauther."
  },
  {
    id: "1175",
    name: "WIFI RUBBER DUCKY (KIT)",
    slug: "wifi-rubber-ducky-kit",
    price: 2500,
    category: "Kits",
    image: "/assets/products/g-ducky-kit.png",
    description: "Advanced WiFi rubber ducky construction kit."
  }
];
