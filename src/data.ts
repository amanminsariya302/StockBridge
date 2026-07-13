import { Language, StorageListing } from './types';

export const TRANSLATIONS: Record<Language, {
  welcome: string;
  welcomeSub: string;
  logoSub: string;
  startBtn: string;
  selectLang: string;
  skipBtn: string;
  loginTitle: string;
  registerTitle: string;
  email: string;
  password: string;
  phone: string;
  fullName: string;
  roleSelect: string;
  companyRole: string;
  providerRole: string;
  searchPlaceholder: string;
  addStorageTitle: string;
  capacityLabel: string;
  facilitiesLabel: string;
  addressLabel: string;
  bookingStatus: string;
  receiptTitle: string;
  feeNotice: string;
  aboutText: string;
  exploreTitle: string;
  verifiedBadge: string;
  requestBooking: string;
  termsTitle: string;
  payFee: string;
  dashboard: string;
  earnings: string;
  myListings: string;
  viewRequests: string;
  activeBookings: string;
}> = {
  en: {
    welcome: "StockBridge",
    welcomeSub: "Connecting Businesses with Trusted Storage Solutions",
    logoSub: "Unused Space ⇆ Store Smart",
    startBtn: "Get Started",
    selectLang: "Select Language / भाषा चुनें",
    skipBtn: "Skip / English",
    loginTitle: "Sign In to StockBridge",
    registerTitle: "Create Your Account",
    email: "Email Address",
    password: "Password",
    phone: "Phone Number",
    fullName: "Full Name / Business Name",
    roleSelect: "I want to:",
    companyRole: "Find Storage (Company)",
    providerRole: "List Unused Space (Storage Provider)",
    searchPlaceholder: "Search by Location, Capacity or Facility...",
    addStorageTitle: "List Your Storage Space",
    capacityLabel: "Storage Capacity (e.g., 500 sq ft, 20 Tons)",
    facilitiesLabel: "Key Facilities (comma separated)",
    addressLabel: "Complete Address / Location",
    bookingStatus: "Booking Status",
    receiptTitle: "StockBridge Service Fee Receipt",
    feeNotice: "A secure flat ₹30 service fee is charged for each successful booking coordination.",
    aboutText: "Bridging the gap between companies needing temporary inventory storage and owners with unused warehouses, shops, or basements.",
    exploreTitle: "Available Nearby Storage Spaces",
    verifiedBadge: "Verified Safe Space",
    requestBooking: "Send Booking Request",
    termsTitle: "Negotiated Rental Terms",
    payFee: "Pay Platform Fee (₹30)",
    dashboard: "Dashboard",
    earnings: "Total Provider Earnings",
    myListings: "My Listed Spaces",
    viewRequests: "Manage Requests",
    activeBookings: "Active Storage Bookings"
  },
  hi: {
    welcome: "स्टॉकब्रिज",
    welcomeSub: "व्यवसायों को विश्वसनीय स्टोरेज समाधानों से जोड़ना",
    logoSub: "खाली जगह ⇆ स्मार्ट स्टोरेज",
    startBtn: "शुरू करें",
    selectLang: "भाषा का चयन करें",
    skipBtn: "छोड़ें (अंग्रेजी)",
    loginTitle: "स्टॉकब्रिज में साइन इन करें",
    registerTitle: "अपना खाता बनाएं",
    email: "ईमेल पता",
    password: "पासवर्ड",
    phone: "फ़ोन नंबर",
    fullName: "पूरा नाम / व्यवसाय का नाम",
    roleSelect: "मैं चाहता हूँ:",
    companyRole: "स्टोरेज ढूंढें (कंपनी)",
    providerRole: "खाली जगह किराए पर दें (स्टोरेज प्रदाता)",
    searchPlaceholder: "स्थान, क्षमता या सुविधाओं द्वारा खोजें...",
    addStorageTitle: "अपनी स्टोरेज जगह सूचीबद्ध करें",
    capacityLabel: "स्टोरेज क्षमता (जैसे, 500 वर्ग फुट, 20 टन)",
    facilitiesLabel: "प्रमुख सुविधाएं (अल्पविराम से अलग)",
    addressLabel: "पूरा पता / स्थान",
    bookingStatus: "बुकिंग की स्थिति",
    receiptTitle: "स्टॉकब्रिज सेवा शुल्क रसीद",
    feeNotice: "प्रत्येक सफल बुकिंग के लिए ₹30 का सुरक्षित प्लेटफॉर्म सेवा शुल्क लिया जाता है।",
    aboutText: "अस्थायी इन्वेंट्री स्टोरेज की आवश्यकता वाली कंपनियों और अप्रयुक्त गोदामों, दुकानों या बेसमेंट वाले मालिकों के बीच की दूरी को पाटना।",
    exploreTitle: "आस-पास उपलब्ध स्टोरेज स्थान",
    verifiedBadge: "सत्यापित सुरक्षित स्थान",
    requestBooking: "बुकिंग अनुरोध भेजें",
    termsTitle: "किराये की तय शर्तें",
    payFee: "प्लेटफ़ॉर्म शुल्क का भुगतान करें (₹30)",
    dashboard: "डैशबोर्ड",
    earnings: "कुल प्रदाता कमाई",
    myListings: "मेरी सूचीबद्ध जगहें",
    viewRequests: "अनुरोध प्रबंधित करें",
    activeBookings: "सक्रिय स्टोरेज बुकिंग"
  },
  te: {
    welcome: "స్టాక్‌బ్రిడ్జ్",
    welcomeSub: "వ్యాపారాలను విశ్వసనీయ నిల్వ పరిష్కారాలతో అనుసంధానించడం",
    logoSub: "ఖాళీ స్థలం ⇆ స్మార్ట్ స్టోరేజ్",
    startBtn: "ప్రారంభించండి",
    selectLang: "భాషను ఎంచుకోండి",
    skipBtn: "వదిలేయండి (ఇంగ్లీష్)",
    loginTitle: "స్టాక్‌బ్రిడ్జ్‌కి లాగిన్ అవ్వండి",
    registerTitle: "ఖాతాను సృష్టించండి",
    email: "ఈమెయిల్ చిరునామా",
    password: "పాస్‌వర్డ్",
    phone: "ఫోన్ నంబర్",
    fullName: "పూర్తి పేరు / వ్యాపార పేరు",
    roleSelect: "నేను కోరుకుంటున్నాను:",
    companyRole: "స్టోరేజ్ వెతకండి (కంపెనీ)",
    providerRole: "ఖాళీ స్థలాన్ని అద్దెకు ఇవ్వండి (స్టోరేజ్ ప్రొవైడర్)",
    searchPlaceholder: "ప్రాంతం, సామర్థ్యం లేదా సౌకర్యాల ద్వారా వెతకండి...",
    addStorageTitle: "మీ స్టోరేజ్ స్థలాన్ని నమోదు చేయండి",
    capacityLabel: "స్టోరేజ్ సామర్థ్యం (ఉదా., 500 చదరపు అడుగులు, 20 టన్నులు)",
    facilitiesLabel: "ముఖ్య సౌకర్యాలు (కామాలతో వేరు చేయండి)",
    addressLabel: "పూర్తి చిరునామా / ప్రాంతం",
    bookingStatus: "బుకింగ్ స్థితి",
    receiptTitle: "స్టాక్‌బ్రిడ్జ్ సేవా రుసుము రసీదు",
    feeNotice: "ప్రతి విజయవంతమైన బుకింగ్ సమన్వయానికి సురక్షితమైన ₹30 సేవా రుసుము వర్తిస్తుంది.",
    aboutText: "తాత్కాలిక ఇన్వెంటరీ నిల్వ అవసరమైన కంపెనీలను మరియు ఉపయోగించని గిడ్డంగులు, దుకాణాలు లేదా బేస్మెంట్లను కలిగి ఉన్న యజమానులను కలపడం.",
    exploreTitle: "సమీపంలో అందుబాటులో ఉన్న స్టోరేజ్ స్థలాలు",
    verifiedBadge: "ధృవీకరించబడిన సురక్షित స్థలం",
    requestBooking: "బుకింగ్ అభ్యర్థన పంపండి",
    termsTitle: "చర్చించిన అద్దె నిబంధనలు",
    payFee: "ప్లాట్‌ఫారమ్ రుసుము చెల్లించండి (₹30)",
    dashboard: "డ్యాష్‌బోర్డ్",
    earnings: "మొత్తం ప్రొవైడర్ ఆదాయం",
    myListings: "నా నమోదిత స్థలాలు",
    viewRequests: "అభ్యర్థనలను నిర్వహించండి",
    activeBookings: "క్రియాశీల స్టోరేజ్ బుకింగ్‌లు"
  },
  gu: {
    welcome: "સ્ટોકબ્રિજ",
    welcomeSub: "વ્યવસાયોને વિશ્વસનીય સ્ટોરેજ સોલ્યુશન્સ સાથે જોડવું",
    logoSub: "ખાલી જગ્યા ⇆ સ્માર્ટ સ્ટોરેજ",
    startBtn: "શરૂ કરો",
    selectLang: "ભાષા પસંદ કરો",
    skipBtn: "છોડી દો (અંગ્રેજી)",
    loginTitle: "સ્ટોકબ્રિજમાં સાઇન ઇન કરો",
    registerTitle: "તમારું ખાતું બનાવો",
    email: "ઇમેઇલ સરનામું",
    password: "પાસવર્ડ",
    phone: "ફોન નંબર",
    fullName: "પૂરું નામ / વ્યવસાયનું નામ",
    roleSelect: "હું ઈચ્છું છું:",
    companyRole: "સ્ટોરેજ શોધો (કંપની)",
    providerRole: "ખાલી જગ્યા ભાડે આપો (સ્ટોરેજ પ્રદાતા)",
    searchPlaceholder: "સ્થાન, ક્ષમતા અથવા સુવિધાઓ દ્વારા શોધો...",
    addStorageTitle: "તમારી સ્ટોરેજ જગ્યા લિસ્ટ કરો",
    capacityLabel: "સ્ટોરેજ ક્ષમતા (જેમ કે, 500 ચોરસ ફૂટ, 20 ટન)",
    facilitiesLabel: "મુખ્ય સુવિધાઓ (અલ્પવિરામથી અલગ કરો)",
    addressLabel: "પૂરું સરનામું / સ્થાન",
    bookingStatus: "બુકિંગની સ્થિતિ",
    receiptTitle: "સ્ટોકબ્રિજ સેવા શુલ્ક રસીદ",
    feeNotice: "દરેક સફળ બુકિંગ માટે ₹30 નો સુરક્ષિત પ્લેટફોર્મ સેવા શુલ્ક લાગુ પડે છે.",
    aboutText: "કામચલાઉ ઇન્વેન્ટરી સ્ટોરેજની જરૂરિયાતવાળી કંપનીઓ અને બિનઉપયોગી વેરહાઉસ, દુકાનો અથવા બેઝમેન્ટ ધરાવતા માલિકો વચ્ચે સેતુ બનાવવો.",
    exploreTitle: "નજીકમાં ઉપલબ્ધ સ્ટોરેજ સ્પેસ",
    verifiedBadge: "ચકાસાયેલ સુરક્ષિત જગ્યા",
    requestBooking: "બુકિંગ વિનંતી મોકલો",
    termsTitle: "નક્કી કરેલી શરતો",
    payFee: "પ્લેટફોર્મ ફી ચૂકવો (₹30)",
    dashboard: "ડેશબોર્ડ",
    earnings: "કુલ પ્રદાતા કમાણી",
    myListings: "મારી લિસ્ટેડ જગ્યાઓ",
    viewRequests: "વિનંતીઓ મેનેજ કરો",
    activeBookings: "સક્રિય સ્ટોરેજ બુકિંગ"
  }
};

export const INITIAL_STORAGE_LISTINGS: StorageListing[] = [
  {
    id: "lst-1",
    name: "Gopal Safe Warehousing & Cold Room",
    address: "Plot 42, GIDC Industrial Estate, Surat, Gujarat",
    capacity: "1,200 sq ft (Air-Conditioned / Dry)",
    description: "Highly secure, temperature-controlled warehouse perfect for food items, agricultural stock, or pharmaceutical packaging. Includes clean loading docks and easy truck access.",
    facilities: ["CCTV Security", "Temperature Control", "24/7 Access", "Fire Extinguisher", "Power Backup"],
    providerId: "prov-gopal",
    providerName: "Gopal Patel",
    priceSuggestion: "₹15,000 / month",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=600",
    isVerified: true
  },
  {
    id: "lst-2",
    name: "Sai Baba Local Dry Godown",
    address: "Near Metro Station Gate 3, Karol Bagh, New Delhi",
    capacity: "600 sq ft (Ground Floor)",
    description: "Centrally located local storage space perfect for small businesses, e-commerce stock, or retail inventory. Clean, pest-controlled, and immediately available.",
    facilities: ["Pest Control", "Ground Floor", "Lockable Shutter", "Nearby Metro", "CCTV Security"],
    providerId: "prov-sharma",
    providerName: "Rajesh Sharma",
    priceSuggestion: "₹8,500 / month",
    image: "https://images.unsplash.com/photo-1595246140625-573b715d11dc?auto=format&fit=crop&q=80&w=600",
    isVerified: true
  },
  {
    id: "lst-3",
    name: "Royal Cargo Depot & Logistical Hub",
    address: "Sec-12, Near Jawaharlal Nehru Port, Navi Mumbai, Maharashtra",
    capacity: "4,500 sq ft (High Ceiling / Heavy Duty)",
    description: "Spacious heavy-duty industrial storage space with forklift assistance and high vertical stacking options. Best for machinery, large raw materials, and heavy cargo.",
    facilities: ["Forklift Provided", "Heavy Duty Floors", "High Security Fence", "Loading Bays", "Weigh Bridge Access"],
    providerId: "prov-mumbai-logistics",
    providerName: "Karan Singh",
    priceSuggestion: "₹45,000 / month",
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=600",
    isVerified: true
  },
  {
    id: "lst-4",
    name: "Apex Retail Backroom & Spare Shop Space",
    address: "Shop No 14, Main Commercial Street, Gachibowli, Hyderabad",
    capacity: "250 sq ft",
    description: "Small secure backroom ideal for local retail inventory, boutique stock, or secure archive files. Features double lockers and CCTV surveillance.",
    facilities: ["CCTV Security", "Waterproof", "Double Lockers", "Main Market Location"],
    providerId: "prov-apex",
    providerName: "Mallesham K.",
    priceSuggestion: "₹4,200 / month",
    image: "https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&q=80&w=600",
    isVerified: false
  }
];
