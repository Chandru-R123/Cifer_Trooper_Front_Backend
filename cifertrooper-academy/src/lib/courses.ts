export interface CourseModule {
  id: string;
  title: string;
  content: string[];
}

export interface Course {
  slug: string;
  title: string;
  description: string;
  longDescription: string;
  icon: string;
  modules: CourseModule[];
}

export const COURSES_DATA: Course[] = [
  {
    slug: "ethical-hacking",
    title: "ETHICAL HACKING",
    description: "Ethical Hacking, is known as penetration testing or white-hat Hacking, is the practice of intentionally probing computer systems, networks, applications.",
    longDescription: "Ethical hacking, is known as penetration testing or white-hat hacking, is the practice of intentionally probing computer systems, networks, applications.",
    icon: "Shield",
    modules: [
      { id: "m1", title: "Module 1 : INTRODUCTION TO ETHICAL HACKING", content: ["Information Security Overview", "Information Security Threats and Attacks Vectors", "Hacking Concepts, Types and Phases", "Ethical Hacking Concepts and Scope", "Information Security Controls", "Information Security Laws and Standards"] },
      { id: "m2", title: "Module 2 : BASH SCRIPTING", content: ["Basic Linux Commands", "Advanced Linux Commands", "Basic Bash Scripting", "Loops in Bash", "Function in Bash", "Option in Bash", "Assignment Session"] },
      { id: "m3", title: "Module 3 : SCANNING NETWORKS", content: ["Overview of Network Scanning", "Check for Open Port", "Scanning Techniques", "Scan for Vulnerability", "Spoofing IP Address", "Own Script Writing for Network Scanning", "Assignment Session"] },
      { id: "m4", title: "Module 4 : FOOTPRINTING AND RECONNAISSANCE", content: ["Footprinting Concepts", "Footprinting Methodology", "Footprinting Countermeasure", "Footprinting Penetration Testing", "Own Script Writing for Foot & Recon", "Assignment Session"] },
      { id: "m5", title: "Module 5 : MALWARE THREATS", content: ["Trojan Concepts", "Types of Trojans", "Virus and Worms Concepts", "Creating Virus / Worms /Trojans", "Malware Detection", "Own Script Writing for Exploits", "Assignment Session"] },
      { id: "m6", title: "Module 6 : SOCIAL ENGINEERING", content: ["Social Engineering Techniques", "Hacking facebook /gmail/ linkedin etc.,", "Impersonation on Social Networking Sites", "Identity Theft", "Social Engineering Countermeasures", "Assignment Session"] },
      { id: "m7", title: "Module 7 : SESSION HIJACKING", content: ["Application Level Session Hijacking", "Networking- level Session Hijacking", "Session hijacking in facebook / google / etc.,", "CSRF (Cross Site Request Forgery)", "Session Hijacking Tools", "Counter – measures", "Assignment Session"] },
      { id: "m8", title: "Module 8 : HACKING WIRELESS NETWORK", content: ["Wireless Encryption", "Wireless Threats", "Wireless Hacking Methodology", "Hacking WAP / WEP /WEP2 wifi’s", "Wireless Hacking Tools", "Assignment Session"] },
      { id: "m9", title: "Module 9 : SYSTEM HACKING", content: ["Escalating Privileges", "Executing Applications", "Hacking windows xp / 7 / 8 / 10 / Server and Linux, Mac OS", "Hiding Files", "Own Script Writing for System Hacking", "Assignment Session"] },
      { id: "m10", title: "Module 10 : HACKING WEB APPLICATIONS", content: ["Web App Threats", "Web App Hacking Methodology", "XSS (Cross Side Scripting)", "OWASP Top 10 Vulnerability", "Own Script Writing for Hacking Web Applications", "Assignment Session"] },
      { id: "m11", title: "Module 11 : SNIFFING", content: ["MAC Attacks", "ARP Poisoning", "Spoofing Attack", "DNS Poisoning", "Sniffing Tool : Wireshark", "Sniffing Detection Techniques", "Assignment Session"] },
      { id: "m12", title: "Module 12 : HACKING WEBSERVERS", content: ["Webserver Attacks", "Attack Methodology", "Hacking windows / linux webserver", "Defacing webservers", "Webserver Security Tools", "Assignment Session"] },
      { id: "m13", title: "Module 13 : HACKING MOBILE PLATFORM", content: ["Mobile Platform Attack Vectors", "Hacking Android OS", "Hacking IOS", "Hacking Windows Phone OS", "Own Script Writing for Mobile Platforms", "Assignment Session"] },
      { id: "m14", title: "Module 14 : CLI BASED TOOLS DEVELOPMENT SESSION", content: ["IP Lookup", "Sub Domain Hunter", "Login Brute-Force", "Android Brute-Force", "Wi-Fi Password Graber"] }
    ]
  },
  {
    slug: "advance-ethical-hacking",
    title: "ADVANCE ETHICAL HACKING",
    description: "Advanced ethical Hacking, is known as advanced penetration testing or red teaming, takes the principles and techniques of ethical Hacking to a higher level of sophistication and complexity.",
    longDescription: "Advanced ethical Hacking, is known as advanced penetration testing or red teaming, takes the principles and techniques of ethical Hacking to a higher level of sophistication and complexity.",
    icon: "ShieldAlert",
    modules: [
      { id: "m1", title: "Module 1 : INTRODUCTION TO ETHICAL HACKING", content: ["Information Security Overview", "Information Security Threats and Attacks Vectors", "Hacking Concepts, Types and Phases", "Ethical Hacking Concepts and Scope", "Information Security Controls", "Information Security Laws and Standards"] },
      { id: "m2", title: "Module 2 : BASH SCRIPTING", content: ["Basic Linux Commands", "Advanced Linux Commands", "Basic Bash Scripting", "Loops in Bash", "Function in Bash", "Option in Bash", "Multiple Options in Bash", "Assignment Session"] },
      { id: "m3", title: "Module 3 : SCANNING NETWORKS", content: ["Overview of Network Scanning", "Check for Open Port", "Scanning Techniques", "Scan for Vulnerability", "Spoofing IP Address", "Own Script Writing for Network Scanning", "Assignment Session"] },
      { id: "m4", title: "Module 4 : FOOTPRINTING AND RECONNAISSANCE", content: ["Footprinting Concepts", "Footprinting Methodology", "Footprinting Countermeasure", "Footprinting Penetration Testing", "Own Script Writing for Foot & Recon", "Assignment Session"] },
      { id: "m5", title: "Module 5 : MALWARE THREATS", content: ["Trojan Concepts", "Types of Trojans", "Virus and Worms Concepts", "Creating Virus / Worms /Trojans", "Malware Detection", "Own Script Writing for Exploits", "Assignment Session"] },
      { id: "m6", title: "Module 6 : SOCIAL ENGINEERING", content: ["Social Engineering Techniques", "Hacking facebook /gmail/ linkedin etc.,", "Impersonation on Social Networking Sites", "Identity Theft", "Social Engineering Countermeasures", "Own Script Writing for Social Engineering", "Assignment Session"] },
      { id: "m7", title: "Module 7 : SESSION HIJACKING", content: ["Application Level Session Hijacking", "Networking- level Session Hijacking", "Session hijacking in facebook / google / etc.,", "CSRF (Cross Site Request Forgery)", "Session Hijacking Tools", "Counter – measures", "Own Script Writing for Session Hijacking", "Assignment Session"] },
      { id: "m8", title: "Module 8 : HACKING WIRELESS NETWORK", content: ["Wireless Encryption", "Wireless Threats", "Wireless Hacking Methodology", "Hacking WAP / WEP /WEP2 wifi’s", "Wireless Hacking Tools", "Bluetooth Hacking", "Own Script Writing for Hacking Wireless Networks", "Assignment Session"] },
      { id: "m9", title: "Module 9 : SYSTEM HACKING", content: ["Cracking Passwords", "Escalating Privileges", "Executing Applications", "Hacking windows xp / 7 / 8 / 10 / Server and Linux, Mac OS", "Hiding Files", "Own Script Writing for System Hacking", "Assignment Session"] },
      { id: "m10", title: "Module 10 : HACKING WEB APPLICATIONS", content: ["Web App Threats", "Web App Hacking Methodology", "XSS (Cross Side Scripting)", "CSRF", "OWASP Top 10 Vulnerability", "Own Script Writing for Hacking Web Applications", "Assignment Session"] },
      { id: "m11", title: "Module 11 : SNIFFING", content: ["MAC Attacks", "ARP Poisoning", "Spoofing Attack", "DNS Poisoning", "Sniffing Tool : Wireshark", "Sniffing Detection Techniques", "Own Script Writing for Sniffing", "Assignment Session"] },
      { id: "m12", title: "Module 12 : DENIAL - OF - SERVICE", content: ["DoS / DDoS Attack Techniques", "Botnets", "DoS / DDoS Protection Tools", "Defacing any websites / networks", "Assignment Session"] },
      { id: "m13", title: "Module 13 : HACKING WEBSERVERS", content: ["Webserver Attacks", "Attack Methodology", "Hacking windows / linux webserver", "Defacing webservers", "Webserver Security Tools", "Own Script Writing for Hacking Webservers", "Assignment Session"] },
      { id: "m14", title: "Module 14 : CLOUD COMPUTING", content: ["Cloud computing threats", "Cloud computing attacks", "Cloud Security", "Cloud Security tools", "Assignment Session"] },
      { id: "m15", title: "Module 15 : HACKING MOBILE PLATFORM", content: ["Mobile Platform Attack Vectors", "Hacking Android OS", "Hacking IOS", "Hacking Windows Phone OS", "Own Script Writing for Mobile Platforms", "Assignment Session"] },
      { id: "m16", title: "Module 16 : CLI BASED TOOLS DEVELOPMENT SESSION", content: ["IP Lookup", "Sub Domain Hunter", "Location Tracker", "IP & Cookies Graber", "Camera Hijaking", "Login Brute-Force", "Android Brute-Force", "Wi-Fi Password Graber", "All Platform Payload Generator"] },
      { id: "m17", title: "Module 17 : Web Based Tools Development Session", content: ["Basic HTML", "Basic CSS", "Basic JS", "Web Sub Hunter", "Network Scanner", "Brute Force", "Multiple Phishing Pages", "Android Exploiting FrameWork", "All Platform Payload Generator"] },
      { id: "m18", title: "Module 18 : GUI Based Tools Development Session", content: ["Network Scanning", "Sub Domain Hunter", "Android Exploiting FrameWork", "All Platform Payload Generator"] }
    ]
  },
  {
    slug: "hardware-hacking",
    title: "HARDWARE HACKING",
    description: "Hardware hacking, is known as hardware security research or hardware reverse engineering, is the process of exploring and manipulating electronic devices, hardware components,",
    longDescription: "Hardware hacking, is known as hardware security research or hardware reverse engineering, is the process of exploring and manipulating electronic devices, hardware components.",
    icon: "Cpu",
    modules: [
      { id: "m1", title: "Module 1 : INTRODUCTION TO HARDWARE HACKING", content: ["What is Hardware Hacking", "Hardware Hacking Concepts, Types and Phases", "Hardware Hacking Scope"] },
      { id: "m2", title: "Module 2 : OVERVIEW OF HARDWARE HACKING", content: ["Rubber Ducky", "Wi-Fi Pentesting", "RF Pentesting", "IR Hacking"] },
      { id: "m3", title: "Module 3 : Components For Hardware Hacking", content: ["Arduino", "ESP Modules", "STM Modules", "Raspberry Pi", "Sensors", "RF Modules", "SD Cards Modules", "RFID & NFC Modules", "OLED Displays", "TFT Displays", "Battery"] },
      { id: "m4", title: "Module 4 : Rubber Ducky (7 Devices)", content: ["What is Rubber Ducky", "Types of Rubber Ducky", "Selecting Boards for Rubber Ducky", "Practical Session"] },
      { id: "m5", title: "Module 5 : WI-FI PENTESTING (9 Devices)", content: ["What is Wi-FI Pentesting", "List of Wi-Fi Pentesting Devices", "Selecting Boards for Wi-Fi Pentesting", "Practical Session"] },
      { id: "m6", title: "Module 6 : RF Pentesting (6 Devices)", content: ["What is RF Pentesting", "List of RF Pentesting Devices", "Selecting Boards for RF Pentesting", "Practical Session"] },
      { id: "m7", title: "Module 7 : IR HACKING (5 Devices)", content: ["What is IR", "List of IR Devices", "Selecting Boards for IR Hacking", "Practical Session"] }
    ]
  },
  {
    slug: "red-team-field",
    title: "RED TEAM FIELD BUNDLE",
    description: "Custom Red Team Field Kit. Get equipped with just the right gear. Industry leading pentest tools, organized and ready for any engagement.",
    longDescription: "Custom Red Team Field Kit. Get equipped with just the right gear. Industry leading pentest tools, organized and ready for any engagement. This bundle includes all Physical Red Team Operations modules. This includes Rules of Engagement, Reconnaissance, Staging, Team Mobilization.",
    icon: "Target",
    modules: [
      { id: "p1", title: "PCB Design: Module 1-8", content: ["Introduction to PCB Design", "Circuit Designing", "PCB Schematic", "Component Placement & Shielding", "PCB Editor", "Design Rule Check", "Routing and Grounding", "Drilling And Soldering"] },
      { id: "aeh", title: "Advance Ethical Hacking: Module 1-18", content: ["Ethical Hacking Intro", "Bash Scripting", "Scanning Networks", "Malware Threats", "Social Engineering", "Session Hijacking", "Wireless Hacking", "System Hacking", "Web App Hacking", "Sniffing", "DoS", "Webserver Hacking", "Cloud Computing", "Mobile Hacking", "Tools Development"] },
      { id: "ard", title: "Arduino: Module 1-7", content: ["Introduction", "Basics", "Control Statements", "Digital and Analog I/O", "LCD Displays", "Introduction to Sensors"] },
      { id: "eh", title: "Ethical Hacking: Module 1-14", content: ["Hacking Concepts", "Scanning", "Reconnaissance", "Malware", "Social Engineering", "Session Hijacking", "Wireless", "System Hacking", "Web App", "Sniffing", "Webserver", "Mobile", "CLI Tools"] },
      { id: "hh", title: "Hardware Hacking: Module 1-7", content: ["Intro to Hardware Hacking", "Overview", "Components", "Rubber Ducky", "Wi-Fi Pentesting", "RF Pentesting", "IR Hacking"] }
    ]
  },
  {
    slug: "arduino",
    title: "ARDUINO",
    description: "Arduino is an open-source electronics platform that consists of both hardware and software components, designed to make it easy for anyone to create interactive projects.",
    longDescription: "Arduino is an open-source electronics platform that consists of both hardware and software components, designed to make it easy for anyone to create interactive and programmable projects.",
    icon: "CircuitBoard",
    modules: [
      { id: "m1", title: "Module 1 : ⁠Introduction and Familiarization", content: ["Course Introduction", "Hardware Overview", "Download and Install Arduino IDE", "IDE and Sketch Overview", "Understanding Arduino Syntax"] },
      { id: "m2", title: "Module 2 : Basics", content: ["Using Variables", "Blink an LED", "digitalRead() and Serial Port", "analogRead() and Serial Port", "Reading Analog Pins and Voltage"] },
      { id: "m3", title: "Module 3 : Control", content: ["If-Else, Comparison Operators", "For Loop Iteration", "How to Use Arrays", "Switch Case and Keyboard Data", "While statement"] },
      { id: "m4", title: "Module 4 : Digital", content: ["Blink LED without delay()", "Using Buttons", "State Change Detection", "De-bouncing a Button"] },
      { id: "m5", title: "Module 5 : Analog", content: ["Analog I/O and Serial Communications", "Analog Input", "Calibration", "Smoothing Data"] },
      { id: "m6", title: "Module 6 : LCD Displays", content: ["Wiring LCD with Arduino", "Displaying messages", "Screen navigation", "Password protected LED", "Scrolling text", "Temperature display"] },
      { id: "m7", title: "Module 7 : Introduction to Sensors", content: ["What is Sensor?", "Industrial Sensors (IR, Analog, Digital)", "Light, Sound, DTMF", "Interfacing Sensors", "Designing Sensors"] }
    ]
  },
  {
    slug: "pcb-design",
    title: "PCB DESIGN",
    description: "PCB (Printed Circuit Board) design is the process of creating a physical layout of an electronic circuit on a board that provides a platform for interconnecting components.",
    longDescription: "PCB (Printed Circuit Board) design is the process of creating a physical layout of an electronic circuit on a board that provides a platform for connecting and interconnecting various electronic components.",
    icon: "LayoutTemplate",
    modules: [
      { id: "m1", title: "Module 1 : Introduction to PCB Design", content: ["Circuit Designing", "PCB Design Basics", "Schematic", "Editor", "Design Transfer", "Placement & Shielding", "Routing & Grounding", "Drilling And Soldering"] },
      { id: "m2", title: "Module 2 : Introduction to Circuit Designing", content: ["Fundamental of circuit design", "Analog Circuit Design", "Digital Circuit Design", "Symbols and Ports", "Labeling components", "Circuit optimization"] },
      { id: "m3", title: "Module 3 : PCB Schematic", content: ["Board Shape & Boundary", "Schematic capture", "Placing and connecting parts", "Graphics and text", "From schematic to PCB"] },
      { id: "m4", title: "Module 4 : Component Placement & Shielding", content: ["Placing components", "Moving components", "Copper Pour"] },
      { id: "m5", title: "Module 5 : PCB Editor", content: ["Net list preparation", "Exporting and importing data", "PCB Material", "Layers, Colors and Grids", "Electrical Layer"] },
      { id: "m6", title: "Module 6 : Design Transfer and Rule Check", content: ["Design synchronization", "Net list transfer", "Design rules concepts", "Design Rule Checking"] },
      { id: "m7", title: "Module 7 : Routing and Grounding", content: ["Routing guidelines", "Discontinuities (vias, pads)", "Basic layout rules", "Basic grounding rules"] },
      { id: "m8", title: "Module 8 : Drilling And Soldering", content: ["Drilling process", "Soldering components", "Testing & Troubleshooting"] }
    ]
  },
  {
    slug: "python",
    title: "PYTHON",
    description: "Python is a popular computer programming language used to create software and websites, automate processes, and analyse data.",
    longDescription: "Python is a popular computer programming language used to create software and websites, automate processes, and analyse data. Python is a general-purpose language.",
    icon: "Code",
    modules: [
      { id: "m1", title: "Module 1 : First step in python", content: ["Course overview", "Working environment", "Keywords and identifiers", "Syntactic units", "Indentations", "Comments"] },
      { id: "m2", title: "Module 2 : Variables to store values", content: ["Variables overview", "Assigning values", "Multiple values", "Constants", "Literals (Numeric, String, Boolean, Special, Collections)"] },
      { id: "m3", title: "Module 3 : Categorization of datatypes", content: ["Numbers", "Lists", "Tuples", "Strings", "Sets", "Dictionaries"] },
      { id: "m4", title: "Module 4 : IO importing and formatting", content: ["Output functions", "Formatting inputs", "Library importing"] },
      { id: "m5", title: "Module 5 : Computations and operations", content: ["Arithmetic", "Comparison", "Logical", "Assignment", "Identity", "Membership"] },
      { id: "m6", title: "Module 6 : Decision making", content: ["Conditional if", "If else", "If, elif, else", "Nested if"] },
      { id: "m7", title: "Module 7 : Loops", content: ["While loop", "For loop Level 1", "For loop Level 2"] },
      { id: "m8", title: "Module 8 : List and collections", content: ["Level 1 to Level 4 Operations"] },
      { id: "m9", title: "Module 9 : Tuples and collections", content: ["Level 1 to Level 4 Operations"] },
      { id: "m10", title: "Module 10 : Sets and collections", content: ["Level 1 to Level 4 Operations"] },
      { id: "m11", title: "Module 11 : Dictionaries and collections", content: ["Level 1 to Level 3 Operations"] },
      { id: "m12", title: "Module 12 : Functional programs", content: ["Defining functions", "Arguments and parameters", "Recursive functions", "Lambda design"] },
      { id: "m13", title: "Module 13 : Others", content: ["OOPS Level 1-4", "File handling", "Modules", "Scientific computing (NumPy)", "Data visualization (Matplotlib)", "Python with DB"] }
    ]
  },
  {
    slug: "java",
    title: "JAVA PROGRAMMING",
    description: "Java is a high-level, object-oriented programming language designed to be platform-independent and run on various operating systems.",
    longDescription: "Java is a high-level, object-oriented programming language designed to be platform-independent and run on various operating systems without the need for recompilation.",
    icon: "Coffee",
    modules: [
      { id: "m1", title: "Core Java Topics", content: ["Java Applications", "OOP Features", "JDK/JVM Installation", "Data types", "Arrays & Loops", "Inheritance", "Abstract Classes & Interfaces", "Packages", "Exception Handling", "I/O Streams", "Collections & Mapping", "Lambda Expressions", "JAR files & Modules"] }
    ]
  },
  {
    slug: "data-structures",
    title: "DATA STRUCTURES",
    description: "Data structures act as ordered containers for effectively storing and organizing data, fundamental to computer science.",
    longDescription: "Data structures act as ordered containers or arrangements for effectively storing and organizing data. They are fundamental elements of computer science and essential for efficient programming.",
    icon: "Database",
    modules: [
      { id: "m1", title: "DS & Algorithms Topics", content: ["Asymptotic Analysis", "Linear & Binary Search", "Sorting (Insertion, Bubble)", "Linked Lists (Singly, Doubly, Circular)", "Stacks & Queues", "Trees (Binary, AVL, B, B+, Trie)", "Hashing", "Graphs (BFS, DFS, Topological Sort)", "Recursion vs Iteration"] }
    ]
  },
  {
    slug: "bash-scripting",
    title: "BASH SCRIPTING",
    description: "A Bash script is a plain text file which contains a series of commands we would normally type on the command line.",
    longDescription: "A Bash script is a plain text file which contains a series of commands. These commands are a mixture of commands we would normally type ourselves on the command line.",
    icon: "Terminal",
    modules: [
      { id: "m1", title: "Module 1: Basic Linux Commands", content: ["Navigation", "File Operations", "Permissions"] },
      { id: "m2", title: "Module 2: Advanced Linux Commands", content: ["Piping", "Redirection", "Grep", "Sed/Awk Basics"] },
      { id: "m3", title: "Module 3: Basic Bash Scripting", content: ["Variables", "Input/Output", "Shebang"] },
      { id: "m4", title: "Module 4: Loops in Bash", content: ["For loops", "While loops", "Until loops"] },
      { id: "m5", title: "Module 5: Function in Bash", content: ["Defining functions", "Scope", "Return values"] },
      { id: "m6", title: "Module 6: Option in Bash", content: ["Getopts", "Positional parameters"] },
      { id: "m7", title: "Module 7: Assignment Session", content: ["Automating tasks", "Scripting projects"] }
    ]
  },
  {
    slug: "c-programming",
    title: "C PROGRAMMING",
    description: "C programming is a versatile language widely used in system-level programming, software development, and embedded devices.",
    longDescription: "C programming is a versatile and influential programming language that is widely used in system-level programming, software development, and embedded devices.",
    icon: "FileCode",
    modules: [
      { id: "m1", title: "C Programming Topics", content: ["C Basics & Variables", "Data Types & I/O", "Operators", "Control Statements", "Functions", "Arrays & Strings", "Pointers", "User-Defined Data Types", "File Handling"] }
    ]
  },
  {
    slug: "fullstack-development",
    title: "FULLSTACK WEBSITE DEVELOPMENT",
    description: "Full stack development is the process of developing both the frontend (user-facing) and backend (database and logic) of applications.",
    longDescription: "Full stack development involves developing both the frontend and backend components of an application, ensuring a seamless flow from user interaction to data management.",
    icon: "Globe",
    modules: [
      { id: "m1", title: "Frontend Development", content: ["HTML5 Semantic Structure", "CSS3 Advanced Styling", "JavaScript ES6+", "Responsive Design"] },
      { id: "m2", title: "Backend Development", content: ["Node.js/Express", "Database Management (SQL/NoSQL)", "Server Logic", "Authentication"] },
      { id: "m3", title: "API & Deployment", content: ["RESTful APIs", "Git/GitHub", "Cloud Deployment", "Maintenance"] }
    ]
  }
];
