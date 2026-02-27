import React, { useState, useCallback, useEffect, useRef } from 'react';
import {
  Search, Mic, ChevronRight, Play, Home, Image as ImageIcon, FileText, Plus, Camera, X,
  Scan, PenTool, Sparkles, ArrowLeft, Download, Share2, MoreVertical, Wand2, Cloud, Zap,
  ZapOff, Settings, Check, UserCircle, Frame, MapPin, Signal, Battery, RefreshCcw, BrainCircuit,
  ArrowUpDown, ListFilter, Upload, Bell, CheckCircle2, Calendar, Lightbulb, RotateCw, BookOpen, Music, MessageCircle, Pause
} from 'lucide-react';
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { motion, AnimatePresence } from "framer-motion";

// --- Assets ---
const BASE_URL = "https://satinux-vercel.vercel.app/assets/home-satin/";

const ASSETS = {
  profile: BASE_URL + "images/img_10.png",
  hero: BASE_URL + "images/img_1.png",
  holi_wishes: BASE_URL + "images/Holi.png",
  remove_blur: BASE_URL + "images/img_4.png",
  indian_avatar: BASE_URL + "images/img_5.png",
  mamta_amit: BASE_URL + "images/img_9.png",
  shivratri: BASE_URL + "images/img_11.png",
  year_2025: BASE_URL + "images/img_12.png",
  seema_years: BASE_URL + "images/img_13.png",
  photo_video: BASE_URL + "images/photo-to-video.png",
  bridal_look: BASE_URL + "images/img_16.png",
  change_bg: BASE_URL + "images/img_17.png",
  create_collage: BASE_URL + "images/img_19.png",
  touchup_photos: BASE_URL + "images/touchup.png",
  whatsapp_status: BASE_URL + "images/img_21.png",
  template_explore: BASE_URL + "images/img_23.png",
  template_cricket: BASE_URL + "images/img_24.png",
  template_ghibli: BASE_URL + "images/img_22.png",
  template_suit: BASE_URL + "images/img_25.png",
  profile_nitin: BASE_URL + "images/img_26.png",
  profile_roxy: BASE_URL + "images/img_27.png",
  profile_flowers: BASE_URL + "images/img_28.png",
  profile_spruha: BASE_URL + "images/img_29.png",
  bg_satin: BASE_URL + "img_0.png",
  nature: BASE_URL + "images/foryou-nature.png",
  people: BASE_URL + "images/foryou-people.png",
  celebration: BASE_URL + "images/foryou-celebration.png",
  festivals: BASE_URL + "images/foryou-festivals.png",
  aicam1: BASE_URL + "images/aicam-1.png",
  aicam2: BASE_URL + "images/aicam-2.png",
  aicam3: BASE_URL + "images/aicam-3.png",
  frame9: BASE_URL + "frames/frame9.png",
  frame10: BASE_URL + "frames/frame10.png",
  frame11: BASE_URL + "frames/frame11.png",
  frame12: BASE_URL + "frames/frame12.png",
  frame13: BASE_URL + "frames/frame13.png",
  frame14: BASE_URL + "frames/frame14.png",
  frame15: BASE_URL + "frames/frame15.png"
};

const MEMORY_DATA = {
  recap2025: {
    title: "2025 Recap",
    images: [
      "https://satinux-vercel.vercel.app/assets/home-satin/images/2025-1.png",
      "https://satinux-vercel.vercel.app/assets/home-satin/images/2025-2.png",
      "https://satinux-vercel.vercel.app/assets/home-satin/images/2025-3.png",
      "https://satinux-vercel.vercel.app/assets/home-satin/images/2025-4.png",
      "https://satinux-vercel.vercel.app/assets/home-satin/images/2025-5.png",
      "https://satinux-vercel.vercel.app/assets/home-satin/images/2025-6.png"
    ],
    music: "https://cdn.pixabay.com/download/audio/2022/10/25/audio_51745774a3.mp3?filename=crescent-moon-122941.mp3", // Upbeat
    duration: 4000
  },
  seemaYears: {
    title: "Seema: Through the Years",
    images: [
      "https://satinux-vercel.vercel.app/assets/home-satin/images/Seema-1.png",
      "https://satinux-vercel.vercel.app/assets/home-satin/images/Seema-2.png",
      "https://satinux-vercel.vercel.app/assets/home-satin/images/Seema-3.png",
      "https://satinux-vercel.vercel.app/assets/home-satin/images/Seema-4.png",
      "https://satinux-vercel.vercel.app/assets/home-satin/images/Seema-5.png"
    ],
    music: "https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=lofi-study-112191.mp3", // Nostalgic
    duration: 4500
  }
};

const videoTags = [
  { id: "birthday", avatar: null },
  { id: "nitin", avatar: ASSETS.profile_nitin },
  { id: "wedding", avatar: null },
  { id: "vaishnoDevi", avatar: null },
  { id: "udaipur", avatar: null },
  { id: "diwali", avatar: null },
  { id: "deepika", avatar: ASSETS.profile },
  { id: "weddingPune", avatar: null },
  { id: "mugdhaVijay", avatar: null },
  { id: "roxy", avatar: ASSETS.profile_roxy },
  { id: "flowers", avatar: ASSETS.profile_flowers },
  { id: "spruha", avatar: ASSETS.profile_spruha },
  { id: "dance", avatar: null },
  { id: "food", avatar: null },
  { id: "guhaghar", avatar: null },
];

const photosTool = {
  unblur: { before: "https://i.ibb.co/7NnR7Ty8/blur-before.png", after: "https://i.ibb.co/zhRC1HGF/blur-after.png" },
  erase: { before: "https://i.ibb.co/994XrDYZ/remove-people-from-photos-before.png", after: "https://i.ibb.co/dwS8rdbp/remove-people-from-photos-after.png" },
  enhance: { before: "https://i.ibb.co/Zps21mh2/enhance-before.png", after: "https://i.ibb.co/cXr9C0B5/enhance-after.png" }
};

const galleryPhotos = [
  "https://i.ibb.co/7NnR7Ty8/blur-before.png",
  "https://i.ibb.co/994XrDYZ/remove-people-from-photos-before.png",
  "https://i.ibb.co/Zps21mh2/enhance-before.png",
  "https://picsum.photos/id/64/300/300",
  "https://picsum.photos/id/65/300/300"
];

const blurGalleryPhotos = ["https://i.ibb.co/7NnR7Ty8/blur-before.png", "https://i.ibb.co/xt91H0nF/blur-before-2.png", "https://i.ibb.co/wNrtbcRn/blur-before3.png"];
const eraseGalleryPhotos = ["https://i.ibb.co/pjxGCGBk/remove-people-from-photos-before-2.png", "https://i.ibb.co/994XrDYZ/remove-people-from-photos-before.png"];
const enhanceGalleryPhotos = ["https://i.ibb.co/Zps21mh2/enhance-before.png", "https://i.ibb.co/ycnsdQXv/enhance-before-2.png", "https://i.ibb.co/fddv9mnq/enhance-before-3.png"];
const rajkumariGalleryPhotos = ["https://i.ibb.co/SXhKgdD2/Rajkumari-before-1.png", "https://i.ibb.co/63gDfqd/Rajkumari-before-2.png"];
const rajkumarGalleryPhotos = ["https://i.ibb.co/21H0gPGn/Rajkumar-before-1.png", "https://i.ibb.co/s9Rr3ksP/Rajkumar-before-2.png"];

const photosGridData = [
  { src: "https://picsum.photos/id/100/600/600", type: "featured" },
  { src: "https://picsum.photos/id/101/300/300", type: "normal" },
  { src: "https://picsum.photos/id/102/300/300", type: "normal" },
  { src: "https://picsum.photos/id/103/300/300", type: "normal" },
  { src: "https://picsum.photos/id/104/300/300", type: "normal" },
  { src: ASSETS.change_bg, type: "video", duration: "1:06" },
  { src: "https://picsum.photos/id/106/300/300", type: "normal" },
  { src: "https://picsum.photos/id/107/300/300", type: "normal" },
  { src: "https://picsum.photos/id/108/300/300", type: "normal" },
  { src: "https://picsum.photos/id/109/300/300", type: "normal" },
  { src: "https://picsum.photos/id/110/300/300", type: "video", duration: "0:45" },
  { src: "https://picsum.photos/id/111/300/300", type: "normal" },
  { src: "https://picsum.photos/id/112/300/300", type: "video", duration: "2:10" },
  { src: "https://picsum.photos/id/113/300/300", type: "normal" },
  { src: "https://picsum.photos/id/114/300/300", type: "normal" },
  { src: "https://picsum.photos/id/115/300/300", type: "normal" },
];

const fileSections = {
  documents: [
    "https://satinux-vercel.vercel.app/assets/home-satin/images/doc1.png",
    "https://satinux-vercel.vercel.app/assets/home-satin/images/doc2.png",
    "https://satinux-vercel.vercel.app/assets/home-satin/images/doc3.png",
    "https://satinux-vercel.vercel.app/assets/home-satin/images/doc4.png"
  ],
  id: [
    "https://satinux-vercel.vercel.app/assets/home-satin/images/image11_645_1089.png",
    "https://satinux-vercel.vercel.app/assets/home-satin/images/image12_645_1089.png",
    "https://satinux-vercel.vercel.app/assets/home-satin/images/image13_645_1089.png",
    "https://satinux-vercel.vercel.app/assets/home-satin/images/image11_645_1089.png"
  ],
  bills: [
    "https://satinux-vercel.vercel.app/assets/home-satin/images/image14_645_1089.png",
    "https://satinux-vercel.vercel.app/assets/home-satin/images/image15_645_1089.png",
    "https://satinux-vercel.vercel.app/assets/home-satin/images/image16_645_1089.png",
    "https://satinux-vercel.vercel.app/assets/home-satin/images/image17_645_1089.png"
  ],
  upi: [
    "https://satinux-vercel.vercel.app/assets/home-satin/images/image18_645_1089.png",
    "https://satinux-vercel.vercel.app/assets/home-satin/images/image19_645_1089.png",
    "https://satinux-vercel.vercel.app/assets/home-satin/images/image20_645_1089.png",
    "https://satinux-vercel.vercel.app/assets/home-satin/images/image21_645_1089.png"
  ],
  insurance: [
    "https://satinux-vercel.vercel.app/assets/home-satin/images/image22_645_1089.png",
    "https://satinux-vercel.vercel.app/assets/home-satin/images/image23_645_1089.png",
    "https://satinux-vercel.vercel.app/assets/home-satin/images/image24_645_1089.png",
    "https://satinux-vercel.vercel.app/assets/home-satin/images/image25_645_1089.png"
  ],
  warranty: [
    "https://satinux-vercel.vercel.app/assets/home-satin/images/image26_645_1089.png",
    "https://satinux-vercel.vercel.app/assets/home-satin/images/image27_645_1089.png",
    "https://satinux-vercel.vercel.app/assets/home-satin/images/image28_645_1089.png",
    "https://satinux-vercel.vercel.app/assets/home-satin/images/image29_645_1089.png"
  ],
  audio: [
    "https://satinux-vercel.vercel.app/assets/home-satin/images/image30_645_1089.png",
    "https://satinux-vercel.vercel.app/assets/home-satin/images/image31_645_1089.png",
    "https://satinux-vercel.vercel.app/assets/home-satin/images/image32_645_1089.png",
    "https://satinux-vercel.vercel.app/assets/home-satin/images/image33_645_1089.png"
  ]
};

const LANGUAGES = [
  { id: 'hi', name: 'Hindi', native: 'हिन्दी' },
  { id: 'en', name: 'English', native: 'English' },
  { id: 'mr', name: 'Marathi', native: 'मराठी' },
  { id: 'gu', name: 'Gujarati', native: 'ગુજરાતી' },
  { id: 'ta', name: 'Tamil', native: 'தமிழ்' },
  { id: 'te', name: 'Telugu', native: 'తెలుగు' },
  { id: 'kn', name: 'Kannada', native: 'ಕನ್ನಡ' },
  { id: 'bn', name: 'Bengali', native: 'বাংলা' },
  { id: 'pa', name: 'Punjabi', native: 'ਪੰਜਾਬੀ' },
];

const STICKERS = ['✨', '❤️', '🔥', '🌸', '🙏', '🕉️', '🚩', '🥳', '💎', '🌈', '🦋', '⭐', '🧿', '🔱'];
const AVATARS = [
  'https://i.pravatar.cc/100?u=1',
  'https://i.pravatar.cc/100?u=2',
  'https://i.pravatar.cc/100?u=3',
  'https://i.pravatar.cc/100?u=4'
];

const TRACKS = [
  { id: 1, title: 'Kesariya (Remix)', artist: 'Arijit Singh', url: 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=lofi-study-112191.mp3' },
  { id: 2, title: 'Tum Tum', artist: 'Thaman S', url: 'https://cdn.pixabay.com/download/audio/2022/10/25/audio_51745774a3.mp3?filename=crescent-moon-122941.mp3' },
  { id: 3, title: 'Raatan Lambiyan', artist: 'Jubin Nautiyal', url: 'https://cdn.pixabay.com/download/audio/2022/11/03/audio_4966c888d3.mp3?filename=inspiring-cinematic-ambient-116199.mp3' },
  { id: 4, title: 'Mann Meri Jaan', artist: 'King', url: 'https://cdn.pixabay.com/download/audio/2022/03/15/audio_d0a13f69d2.mp3?filename=upbeat-pop-112196.mp3' }
];

const DEFAULT_STATUS_TEXTS = {
  hi: "हर नई सुबह एक नई उम्मीद लेकर आती है।",
  en: "Every new morning brings new hope.",
  mr: "प्रत्येक नवीन सकाळ एक नवीन आशा घेऊन येते.",
  gu: "દરેક નવી સવાર એક નવી આશા લઈને આવે છે.",
  ta: "ஒவ்வொரு புதிய காலையும் புதிய நம்பிக்கையைத் தருகிறது.",
  te: "ప్రతి కొత్త ఉదయం కొత్త ఆశను తెస్తుంది.",
  kn: "ಪ್ರತಿ ಹೊಸ ಬೆಳಿಗ್ಗೆ ಹೊಸ ಭರವಸೆಯನ್ನು ತರುತ್ತದೆ.",
  bn: "প্রতিটি নতুন সকাল নতুন আশা নিয়ে আসে।",
  pa: "ਹਰ ਨਵੀਂ ਸਵੇਰ ਨਵੀਂ ਉਮੀਦ ਲੈ ਕੇ ਆਉਂਦੀ ਹੈ।"
};

// --- APP DICTIONARY FOR LOCALE TOGGLE ---
const APP_TEXT = {
  en: {
    greeting: "Shubh Prabhaat,",
    searchPlaceholder: "Hindi ya English mein puche",
    heroTitle: "Jaipur wali shaadi ki jhalkiya...🥰",
    heroCount: "225 ready to view",
    festivalMemories: "Festival memories ✨",
    celebrationHighlights: "Celebration highlights 🎉",
    sendHoliWishes: "Send Holi wishes",
    removeBlur: "Remove blur",
    indianAvatar: "Indian Avatar",
    aiMagicForYou: "AI magic for you",
    mamtaAmit: "Mamta & Amit",
    shivratriReady: "Shivratri video is ready 🤩",
    recap2025: "2025",
    seemaYears: "Seema over the years",
    startCreating: "Start creating instantly ✨",
    photoToVideo: "Photo to video",
    bridalLook: "Bridal look",
    changeBg: "Change background",
    createCollage: "Create collage",
    touchupPhotos: "Touchup your photos",
    whatsappStatus: "WhatsApp status",
    freeUpGB: "Free up 1.2 GB",
    printWithPrinto: "Print with Printo",
    toolsHub: "Tools Hub",
    statusMaker: "Status maker",
    useEffect: "Use this effect",
    createVideoTitle: "Create a video",
    inJustOneClick: "in just one click",
    home: "Home",
    photos: "Photos",
    files: "Files",
    magicStudio: "Magic Studio",
    oneTouchEdit: "One-Touch Edit",
    aiCreative: "AI Creative",
    unblurPhoto: "Unblur Photo",
    objectRemover: "Object Remover",
    enhancePhoto: "Enhance Photo",
    newTools: "New Tools",
    desiAiAvatars: "Desi AI Avatars",
    studioFrames: "Studio Frames 🖼️",
    teleportDest: "Teleport Destinations ✈️",
    rajkumari: "Rajkumari",
    rajkumar: "Rajkumar",
    royalGold: "Royal Gold",
    modernBlack: "Modern Black",
    tajMahal: "Taj Mahal",
    hawaMahal: "Hawa Mahal",
    goldenTemple: "Golden Temple",
    kerala: "Kerala",
    goaBeach: "Goa Beach",
    himalayas: "Himalayas",
    pickPhoto: "Pick a Photo",
    slomo: "Slo-mo",
    photo: "Photo",
    video: "Video",
    aiAutoFocus: "AI Auto Focus Active",
    preview: "Preview",
    aiStudioMagic: "AI Studio Magic",
    aiEnhance: "AI Enhance",
    avatar: "Avatar",
    frame: "Frame",
    teleport: "Teleport",
    retakePhoto: "Retake Photo",
    slideDifference: "Slide to see the difference",
    now: "Now",
    save: "Save",
    share: "Share",
    original: "Original",
    aiMagic: "AI Magic",
    neuralEngine: "Neural Engine v4.0",
    fixFocus: "Fix Focus",
    unblur: "Unblur",
    removeObjects: "Remove Objects",
    remove: "Remove",
    enhance: "Enhance",
    create: "Create",
    apply: "Apply",
    uploadGallery: "Upload from gallery",
    scan: "Scan",
    createWhatsappStatus: "Create WhatsApp Status",
    useAiMagic: "Use AI Magic",
    jaipurShaadi: "Jaipur ki Shaadi 🥰",
    photosReady: "225 photos ready to view",
    sendWishes: "Send Wishes",
    createWishCards: "Create beautiful wish cards for your loved ones",
    createWish: "Create Wish",
    createVideo: "Create a video",
    chooseTheme: "Choose a theme and we'll create a beautiful video from your photos",
    startCreatingBtn: "Start Creating",
    comingSoon: "Coming Soon",
    featureDev: "This feature is currently under development.",
    processingMagic: "Processing magic...",
    optimizingPhoto: "Optimizing photo...",
    tags: {
        birthday: "Birthday",
        nitin: "Nitin",
        wedding: "Wedding",
        vaishnoDevi: "Vaishno Devi",
        udaipur: "Udaipur",
        diwali: "Diwali",
        deepika: "Deepika",
        weddingPune: "Wedding in Pune",
        mugdhaVijay: "Mugdha weds Vijay",
        roxy: "Roxy",
        flowers: "Flowers",
        spruha: "Spruha",
        dance: "Dance",
        food: "Food",
        guhaghar: "Guhaghar"
    }
  },
  hi: {
    greeting: "शुभ प्रभात,",
    searchPlaceholder: "हिंदी या अंग्रेजी में पूछें",
    heroTitle: "जयपुर वाली शादी की झलकियाँ...🥰",
    heroCount: "225 देखने के लिए तैयार",
    festivalMemories: "त्योहार की यादें ✨",
    celebrationHighlights: "जश्न की झलकियाँ 🎉",
    sendHoliWishes: "होली की शुभकामनाएँ भेजें",
    removeBlur: "धुंधलापन हटाएँ",
    indianAvatar: "भारतीय अवतार",
    aiMagicForYou: "आपके लिए एआई मैजिक",
    mamtaAmit: "ममता और अमित",
    shivratriReady: "शिवरात्रि का वीडियो तैयार है 🤩",
    recap2025: "2025",
    seemaYears: "सीमा बीते वर्षों में",
    startCreating: "तुरंत बनाना शुरू करें ✨",
    photoToVideo: "फोटो से वीडियो",
    bridalLook: "दुल्हन का रूप",
    changeBg: "बैकग्राउंड बदलें",
    createCollage: "कोलाज बनाएं",
    touchupPhotos: "तस्वीरों को टचअप करें",
    whatsappStatus: "व्हाट्सएप स्टेटस",
    freeUpGB: "1.2 GB खाली करें",
    printWithPrinto: "प्रिंटो के साथ प्रिंट करें",
    toolsHub: "टूल्स हब",
    statusMaker: "स्टेटस मेकर",
    useEffect: "इस प्रभाव का उपयोग करें",
    createVideoTitle: "एक वीडियो बनाएं",
    inJustOneClick: "बस एक क्लिक में",
    home: "होम",
    photos: "तस्वीरें",
    files: "फ़ाइलें",
    magicStudio: "मैजिक स्टूडियो",
    oneTouchEdit: "वन-टच एडिट",
    aiCreative: "एआई क्रिएटिव",
    unblurPhoto: "फोटो साफ करें",
    objectRemover: "ऑब्जेक्ट रिमूवर",
    enhancePhoto: "फोटो बेहतर करें",
    newTools: "नए टूल्स",
    desiAiAvatars: "देसी एआई अवतार",
    studioFrames: "स्टूडियो फ्रेम्स 🖼️",
    teleportDest: "टेलीपोर्ट डेस्टिनेशन ✈️",
    rajkumari: "राजकुमारी",
    rajkumar: "राजकुमार",
    royalGold: "रॉयल गोल्ड",
    modernBlack: "मॉडर्न ब्लैक",
    tajMahal: "ताज महल",
    hawaMahal: "हवा महल",
    goldenTemple: "स्वर्ण मंदिर",
    kerala: "केरल",
    goaBeach: "गोवा बीच",
    himalayas: "हिमालय",
    pickPhoto: "एक फोटो चुनें",
    slomo: "स्लो-मो",
    photo: "फोटो",
    video: "वीडियो",
    aiAutoFocus: "एआई ऑटो फोकस सक्रिय",
    preview: "प्रीव्यू",
    aiStudioMagic: "एआई स्टूडियो मैजिक",
    aiEnhance: "एआई एन्हांस",
    avatar: "अवतार",
    frame: "फ्रेम",
    teleport: "टेलीपोर्ट",
    retakePhoto: "फिर से फोटो लें",
    slideDifference: "अंतर देखने के लिए स्लाइड करें",
    now: "अभी",
    save: "सेव करें",
    share: "शेयर करें",
    original: "मूल",
    aiMagic: "एआई मैजिक",
    neuralEngine: "न्यूरल इंजन v4.0",
    fixFocus: "फोकस ठीक करें",
    unblur: "अनब्लर",
    removeObjects: "ऑब्जेक्ट हटाएं",
    remove: "हटाएं",
    enhance: "बेहतर करें",
    create: "बनाएं",
    apply: "लागू करें",
    uploadGallery: "गैलरी से अपलोड करें",
    scan: "स्कैन करें",
    createWhatsappStatus: "व्हाट्सएप स्टेटस बनाएं",
    useAiMagic: "एआई मैजिक का उपयोग करें",
    jaipurShaadi: "जयपुर की शादी 🥰",
    photosReady: "225 तस्वीरें देखने के लिए तैयार",
    sendWishes: "शुभकामनाएं भेजें",
    createWishCards: "अपने प्रियजनों के लिए सुंदर विश कार्ड बनाएं",
    createWish: "विश बनाएं",
    createVideo: "एक वीडियो बनाएं",
    chooseTheme: "एक थीम चुनें और हम आपकी तस्वीरों से एक सुंदर वीडियो बनाएंगे",
    startCreatingBtn: "बनाना शुरू करें",
    comingSoon: "जल्द आ रहा है",
    featureDev: "यह सुविधा अभी विकसित की जा रही है।",
    processingMagic: "मैजिक प्रोसेस हो रहा है...",
    optimizingPhoto: "फोटो ऑप्टिमाइज़ हो रही है...",
    tags: {
        birthday: "जन्मदिन",
        nitin: "नितिन",
        wedding: "शादी",
        vaishnoDevi: "वैष्णो देवी",
        udaipur: "उदयपुर",
        diwali: "दिवाली",
        deepika: "दीपिका",
        weddingPune: "पुणे में शादी",
        mugdhaVijay: "मुग्धा और विजय",
        roxy: "रॉक्सी",
        flowers: "फूल",
        spruha: "स्पृहा",
        dance: "नृत्य",
        food: "खाना",
        guhaghar: "गुहागर"
    }
  }
};

// --- GLOBAL COMPONENTS ---

const FallbackImage = ({ src, alt, className, style, fallbackText = "Image", draggable = false, onError }) => {
  return (
    <img
      src={src}
      alt={alt}
      style={style}
      className={className}
      draggable={draggable}
      onError={(e) => {
        if (onError) onError(e);
        e.target.onerror = null;
        e.target.src = `https://placehold.co/300x300/2a0813/FFFFFF?text=${encodeURIComponent(fallbackText)}`;
      }}
    />
  );
};

// --- BHARAT STATUS AI COMPONENT ---
const BharatStatusModule = ({ onClose }) => {
  const [state, setState] = useState({
    language: 'en',
    view: 'categories',
    showLanguageMenu: false,
    generatedImage: null,
    statusText: DEFAULT_STATUS_TEXTS['en'],
    textColor: "#FFFFFF",
    fontFamily: "Inter",
    textAlign: "center",
    activeTab: "text",
    selectedSticker: "✨",
    userName: "Seema",
    tempUserName: "Seema",
    profilePhoto: ASSETS.profile,
    selectedMusic: null,
    selectedMusicUrl: null
  });

  const [toast, setToast] = useState({ show: false, msg: '' });

  const updateState = (updates) => setState((prev) => ({ ...prev, ...updates }));

  const showNotification = (msg) => {
    setToast({ show: true, msg });
    setTimeout(() => setToast({ show: false, msg: '' }), 3000);
  };

  const handleBack = () => {
    if (state.view === 'ai_styles') updateState({ view: 'categories' });
    else if (state.view === 'editor') updateState({ view: 'categories' });
    else if (state.view === 'preview') updateState({ view: 'editor' });
  };

  const mockGenerate = () => {
    updateState({ view: 'loading' });
    setTimeout(() => {
      updateState({
        generatedImage: `https://picsum.photos/id/319/600/1000`,
        view: 'editor'
      });
    }, 2000);
  };

  const StatusCard = ({ isEditor }) => (
    <div className={`w-full aspect-[9/16] ${isEditor ? 'max-h-[440px]' : 'max-h-[460px]'} rounded-[2.5rem] overflow-hidden shadow-2xl relative border border-white/10 mb-8`}>
      {state.generatedImage && <img src={state.generatedImage} className="absolute inset-0 w-full h-full object-cover" alt="Status Background" />}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none"></div>

      <div className="absolute top-6 left-6 flex items-center gap-3 z-10">
        <div className="w-10 h-10 rounded-full border-2 border-white/20 overflow-hidden bg-black/20 backdrop-blur-md">
          <img src={state.profilePhoto} className="w-full h-full object-cover" alt="Profile" />
        </div>
        <div className="text-left">
          <div className="text-white font-bold text-sm leading-none mb-1">{state.userName}</div>
          <div className="text-white/60 text-[8px] uppercase tracking-wider">AI Status Artist</div>
        </div>
      </div>

      <div className="absolute top-6 right-6 text-4xl animate-bounce z-10">{state.selectedSticker}</div>

      <div className="absolute inset-x-0 bottom-0 p-8 flex flex-col justify-end text-center h-full pointer-events-none">
        <p className="font-bold italic leading-relaxed" style={{ color: state.textColor, fontFamily: state.fontFamily, fontSize: '1.6rem', textAlign: state.textAlign }}>
          "{state.statusText}"
        </p>
        {state.selectedMusic && (
          <div className="mt-6 flex items-center justify-center gap-2">
            <span className="bg-black/60 backdrop-blur-md px-4 py-1.5 rounded-full text-[10px] text-white flex items-center gap-2 border border-white/10">
              <span className="animate-pulse">🎵</span> {state.selectedMusic}
            </span>
          </div>
        )}
        {state.selectedMusicUrl && <audio autoPlay loop src={state.selectedMusicUrl} />}
      </div>
    </div>
  );

  const renderCategories = () => {
    const categories = [
      { id: 'motivation', name: { hi: 'प्रेरणादायक', en: 'Motivation', mr: 'प्रेरणादायी', gu: 'પ્રેરણાદાયક', ta: 'ஊக்கம்', te: 'ప్రేరణ', kn: 'ಪ್ರೇರಣೆ', bn: 'প্রেরণা', pa: 'ਪ੍ਰੇਰਣਾਦਾਇਕ' }, icon: '🔥' },
      { id: 'good_morning', name: { hi: 'शुभ प्रभात', en: 'Good Morning', mr: 'शुभ सकाळ', gu: 'શુભ સવાર', ta: 'காலை வணக்கம்', te: 'శుభోదయం', kn: 'ಶುಭೋದಯ', bn: 'सुপ্রভাত', pa: 'ਸ਼ੁਭ ਸਵੇਰ' }, icon: '☀️' },
      { id: 'festive', name: { hi: 'आज का खास', en: 'Festive', mr: 'उत्सव', gu: 'તહેવાર', ta: 'பண்டிகை', te: 'పండుగ', kn: 'ಹಬ್ಬ', bn: 'উৎসব', pa: 'ਤਿਉਹਾਰ' }, icon: '⭐' },
      { id: 'love', name: { hi: 'प्रेम', en: 'Love', mr: 'प्रेम', gu: 'પ્રેમ', ta: 'காதல்', te: 'ప్రేమ', kn: 'ಪ್ರೀತಿ', bn: 'ভালোবাসা', pa: 'ਪਿਆਰ' }, icon: '❤️' },
      { id: 'hindu_god', name: { hi: 'देवी-देवता', en: 'Devotional', mr: 'भक्ती', gu: 'ભક્તિ', ta: 'பக்தி', te: 'భక్తి', kn: 'ಭಕ್ತಿ', bn: 'ভক্তি', pa: 'ਭਗਤੀ' }, icon: '🕉️' },
      { id: 'suvichar', name: { hi: 'सुविचार', en: 'Suvichar', mr: 'सुविचार', gu: 'સુવિચાર', ta: 'நல்ல எண்ணம்', te: 'సువిచార్', kn: 'ಸುವಿಚಾರ', bn: 'সুবচন', pa: 'ਸੁਵਿਚਾਰ' }, icon: '📜' }
    ];

    return (
      <div className="fade-in space-y-6">
        <div className="flex flex-col">
          <span className="text-white/60 text-sm font-medium">Namaste</span>
          <h2 className="text-2xl font-bold font-['Poppins']">What will you create?</h2>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {categories.map(cat => (
            <button key={cat.id} onClick={mockGenerate} className="bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-[2rem] flex flex-col items-center gap-3 active:scale-95 transition-all">
              <span className="text-4xl">{cat.icon}</span>
              <span className="text-sm font-bold text-white/80">{cat.name[state.language] || cat.name['en']}</span>
            </button>
          ))}
        </div>

        <div className="bg-gradient-to-br from-[#FF6B35] via-[#FF1B8D] to-[#9C27B0] p-6 rounded-[2rem] text-white relative overflow-hidden shadow-xl active:scale-[0.98] transition-all cursor-pointer" onClick={() => updateState({ view: 'ai_styles' })}>
          <div className="relative z-10">
            <span className="text-[9px] font-bold uppercase tracking-widest text-white/70">✨ AI Magic</span>
            <h3 className="text-xl font-bold mb-1 font-['Poppins']">Magic Art Studio</h3>
            <p className="text-white/80 text-[11px] mb-4 max-w-[160px]">Transform your vision into art.</p>
            <button className="bg-white text-[#FF1B8D] px-6 py-2 rounded-full font-bold text-xs shadow-md">Launch AI</button>
          </div>
          <div className="absolute bottom-[-10%] right-0 opacity-20 text-7xl">✨</div>
        </div>
      </div>
    );
  };

  const renderAIStyles = () => (
    <div className="fade-in space-y-6">
      <h2 className="text-xl font-bold font-['Poppins']">Select AI Style</h2>
      <div className="space-y-4">
        {[
          { id: '1014', name: 'Cyber Bharat', icon: '🏙️' },
          { id: '1015', name: 'Spiritual Neon', icon: '✨' },
          { id: '1016', name: 'Golden Heritage', icon: '🏛️' }
        ].map(style => (
          <div key={style.id} onClick={mockGenerate} className="relative h-40 w-full rounded-[2rem] overflow-hidden bg-white/5 backdrop-blur-md border border-white/10 active:scale-95 transition-all cursor-pointer">
            <img src={`https://picsum.photos/id/320/600/400`} className="w-full h-full object-cover opacity-60" alt={style.name} />
            <div className="absolute inset-0 flex items-center justify-center p-6 text-center">
              <div className="flex flex-col items-center gap-2">
                <span className="text-2xl">{style.icon}</span>
                <h3 className="text-white font-bold text-2xl font-['Poppins'] drop-shadow-lg">{style.name}</h3>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderEditor = () => (
    <div className="fade-in flex flex-col h-full animate-in fade-in duration-300">
      <StatusCard isEditor={true} />
      <div className="flex justify-between items-center mb-8 px-1">
        {[{ id: 'text', icon: 'T', label: 'Text' }, { id: 'stickers', icon: '😊', label: 'Stickers' }, { id: 'profile', icon: '👤', label: 'Profile' }, { id: 'music', icon: '🎵', label: 'Music' }].map(tab => (
          <div key={tab.id} className="flex flex-col items-center gap-2 cursor-pointer" onClick={() => updateState({ activeTab: tab.id })}>
            <button className={`w-14 h-14 rounded-full flex items-center justify-center transition-all ${state.activeTab === tab.id ? 'bg-[#FF9500] border-[#FF9500] shadow-[0_8px_20px_rgba(255,149,0,0.3)] scale-110' : 'bg-white/5 border border-white/10'}`}>
              <span className="text-xl text-white font-bold">{tab.icon}</span>
            </button>
            <span className={`text-[9px] font-bold uppercase tracking-widest ${state.activeTab === tab.id ? 'text-white' : 'text-white/40'}`}>{tab.label}</span>
          </div>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto hide-scrollbar pb-6">
        {state.activeTab === 'text' && (
          <div className="space-y-6 fade-in">
            <div className="space-y-3">
              <label className="block text-white/40 text-[10px] font-bold uppercase tracking-widest">Edit Text</label>
              <input type="text" value={state.statusText} onChange={(e) => updateState({ statusText: e.target.value })} className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white outline-none focus:border-orange-500" />
            </div>
            <div className="space-y-2">
              <label className="block text-white/40 text-[10px] font-bold uppercase tracking-widest">Font Style</label>
              <div className="flex gap-3 overflow-x-auto hide-scrollbar pb-1">
                {['Inter', 'serif', 'cursive', 'fantasy'].map(font => (
                  <button key={font} onClick={() => updateState({ fontFamily: font })} className={`px-4 py-2 rounded-full border text-[11px] font-bold capitalize transition-all whitespace-nowrap ${state.fontFamily === font ? 'bg-[#FF9500] border-[#FF9500] text-white' : 'bg-white/5 border-white/10 text-white/40'}`}>{font === 'Inter' ? 'Standard' : font}</button>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="block text-white/40 text-[10px] font-bold uppercase tracking-widest">Text Color</label>
                <div className="flex gap-2">
                  {['#FFFFFF', '#FFD700', '#FF1B8D', '#00FFFF'].map(c => (
                    <button key={c} onClick={() => updateState({ textColor: c })} className={`w-8 h-8 rounded-full border-2 ${state.textColor === c ? 'border-white scale-110' : 'border-transparent opacity-60'}`} style={{ backgroundColor: c }}></button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {state.activeTab === 'stickers' && (
          <div className="grid grid-cols-5 gap-4 fade-in">
            {STICKERS.map(s => (
              <div key={s} onClick={() => updateState({ selectedSticker: s })} className={`text-2xl cursor-pointer transition-all text-center ${state.selectedSticker === s ? 'scale-125' : 'opacity-60'}`}>{s}</div>
            ))}
          </div>
        )}

        {state.activeTab === 'profile' && (
          <div className="space-y-6 fade-in">
            <div className="space-y-3">
              <label className="block text-white/40 text-[10px] font-bold uppercase tracking-widest">Full Name</label>
              <div className="flex gap-2">
                <input type="text" value={state.tempUserName} onChange={(e) => updateState({ tempUserName: e.target.value })} className="flex-1 bg-white/5 border border-white/10 rounded-xl p-3 text-white outline-none focus:border-orange-500" />
                <button onClick={() => { updateState({ userName: state.tempUserName }); showNotification('Profile Updated!'); }} className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center text-white active:scale-90 transition-transform">
                  <Check size={24} />
                </button>
              </div>
            </div>
            <div className="space-y-3">
              <label className="block text-white/40 text-[10px] font-bold uppercase tracking-widest">Select Avatar</label>
              <div className="flex gap-4">
                {AVATARS.map(a => (
                  <div key={a} onClick={() => updateState({ profilePhoto: a })} className={`w-12 h-12 rounded-full overflow-hidden border-2 cursor-pointer transition-all ${state.profilePhoto === a ? 'border-[#FF9500] scale-110' : 'border-transparent'}`}>
                    <img src={a} className="w-full h-full object-cover" alt="Avatar" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {state.activeTab === 'music' && (
          <div className="space-y-3 fade-in">
            <label className="block text-white/40 text-[10px] font-bold uppercase tracking-widest">Select Track</label>
            <div className="grid grid-cols-1 gap-2">
              {TRACKS.map(t => (
                <div key={t.id} onClick={() => updateState({ selectedMusic: t.title, selectedMusicUrl: t.url })} className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer active:scale-95 transition-transform ${state.selectedMusic === t.title ? 'border-orange-500 bg-orange-500/10' : 'border-white/10 bg-white/5'}`}>
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-white">{t.title}</span>
                    <span className="text-[10px] text-white/40">{t.artist}</span>
                  </div>
                  <span className="text-orange-500">▶️</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <button onClick={() => updateState({ view: 'preview' })} className="w-full py-4 bg-gradient-to-r from-[#FF9500] to-[#FF1B8D] text-white font-bold rounded-2xl shadow-xl active:scale-95 transition-all text-[15px] flex items-center justify-center gap-2 mt-4 shrink-0">
        Share Status 🚀
      </button>
    </div>
  );

  const renderPreview = () => (
    <div className="fade-in flex flex-col items-center h-full">
      <StatusCard isEditor={false} />
      <div className="w-full space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <button onClick={() => showNotification('Opening WhatsApp...')} className="bg-white/5 border border-white/10 flex flex-col items-center justify-center gap-2 py-4 rounded-[2rem] active:scale-95 transition-all">
            <div className="w-12 h-12 bg-[#25D366] rounded-full flex items-center justify-center shadow-lg text-white font-bold">W</div>
            <span className="font-bold text-[10px] uppercase tracking-widest text-white/60">WhatsApp</span>
          </button>
          <button onClick={() => showNotification('Opening Instagram...')} className="bg-white/5 border border-white/10 flex flex-col items-center justify-center gap-2 py-4 rounded-[2rem] active:scale-95 transition-all">
            <div className="w-12 h-12 bg-gradient-to-tr from-purple-600 to-pink-500 rounded-full flex items-center justify-center shadow-lg text-white font-bold text-lg">I</div>
            <span className="font-bold text-[10px] uppercase tracking-widest text-white/60">Instagram</span>
          </button>
        </div>
        <button onClick={() => showNotification('Status Saved to Gallery!')} className="w-full py-5 bg-white text-black font-bold rounded-[1.5rem] shadow-2xl active:scale-95 transition-all flex items-center justify-center gap-3">
          <Download size={24} /> Download Status
        </button>
      </div>
    </div>
  );

  const renderLoading = () => (
    <div className="h-full flex flex-col items-center justify-center p-10 text-center fade-in bg-[#1A0615]">
      <div className="relative mb-10">
        <div className="w-16 h-16 border-4 border-[#FF1B8D]/20 border-t-[#FF1B8D] rounded-full animate-spin"></div>
        <div className="absolute inset-0 flex items-center justify-center text-2xl">🪄</div>
        <div className="absolute -inset-10 bg-pink-500/10 rounded-full blur-3xl animate-pulse"></div>
      </div>
      <h3 className="text-xl font-bold font-['Poppins'] mb-4">AI Status Maker is Creating...</h3>
      <p className="text-white/40 text-sm">Crafting your story with Magic.</p>
    </div>
  );

  const lang = LANGUAGES.find(l => l.id === state.language);
  let title = 'Studio';
  if (state.view === 'editor') title = 'Edit Magic';
  if (state.view === 'categories') title = 'AI Status Maker';
  if (state.view === 'preview') title = 'Share Status';

  return (
    <div className="absolute inset-0 z-[200] bg-[#1A0615] flex flex-col font-['Inter'] text-white overflow-hidden animate-in slide-in-from-right duration-300">
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&family=Inter:wght@400;500;600&display=swap');
          .fade-in { animation: fadeIn 0.4s ease-out; }
          @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        `}</style>

        <div className={`absolute top-5 left-1/2 -translate-x-1/2 px-4 py-2 bg-[#E5E7EB] text-[#1A0615] rounded-xl font-bold text-sm z-[1000] shadow-xl flex items-center gap-2 transition-transform duration-400 ${toast.show ? 'translate-y-0 opacity-100' : '-translate-y-20 opacity-0'}`}>
          <span className="w-5 h-5 bg-green-500 text-white rounded flex items-center justify-center text-xs">✓</span>
          <span>{toast.msg}</span>
        </div>

        <div className="w-full h-full overflow-y-auto hide-scrollbar bg-[#1A0615]">
          {state.view === 'loading' && renderLoading()}

          {(state.view !== 'loading') && (
            <div className="flex flex-col min-h-full">
              <header className="px-5 pt-12 pb-4 flex items-center gap-4 sticky top-0 z-50 bg-[#1A0615] backdrop-blur-md border-b border-white/5">
                {state.view === 'categories' ? (
                  <button onClick={onClose} className="w-10 h-10 bg-white/5 backdrop-blur-md border border-white/10 rounded-xl flex items-center justify-center text-white active:scale-90 transition-transform">
                    <X size={20} />
                  </button>
                ) : (
                  <button onClick={handleBack} className="w-10 h-10 bg-white/5 backdrop-blur-md border border-white/10 rounded-xl flex items-center justify-center text-white active:scale-90 transition-transform">
                    <ArrowLeft size={20} />
                  </button>
                )}
                <span className="text-white font-bold text-lg font-['Poppins'] flex-1">{title}</span>
                {state.view !== 'preview' && (
                  <button onClick={() => updateState({ showLanguageMenu: true })} className="bg-white/5 backdrop-blur-md px-3 py-1.5 rounded-full border border-pink-500/30 active:scale-95">
                    <span className="text-[10px] font-bold text-white uppercase">{lang ? lang.native : 'EN'}</span>
                  </button>
                )}
              </header>
              <div className="flex-1 p-4 pb-10">
                {state.view === 'categories' && renderCategories()}
                {state.view === 'ai_styles' && renderAIStyles()}
                {state.view === 'preview' && renderPreview()}
                {state.view === 'editor' && renderEditor()}
              </div>
            </div>
          )}
        </div>

        {/* Language Selection Modal */}
        {state.showLanguageMenu && (
          <div className="absolute inset-0 z-[300] bg-black/80 backdrop-blur-sm flex flex-col justify-end" onClick={() => updateState({showLanguageMenu: false})}>
            <div className="bg-[#1A0615] rounded-t-[2rem] p-6 border-t border-white/10 animate-in slide-in-from-bottom duration-300" onClick={e => e.stopPropagation()}>
               <div className="flex justify-between items-center mb-6">
                 <h3 className="text-xl font-bold font-['Poppins']">Select Language</h3>
                 <button onClick={() => updateState({ showLanguageMenu: false })} className="p-2 bg-white/10 rounded-full active:scale-90"><X size={20} /></button>
               </div>
               <div className="grid grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto hide-scrollbar">
                  {LANGUAGES.map(l => (
                     <button key={l.id} onClick={() => updateState({ language: l.id, showLanguageMenu: false, statusText: DEFAULT_STATUS_TEXTS[l.id] || DEFAULT_STATUS_TEXTS['en'] })} className={`p-4 rounded-xl border ${state.language === l.id ? 'bg-[#FF9500] border-[#FF9500] shadow-[0_4px_15px_rgba(255,149,0,0.3)]' : 'bg-white/5 border-white/10'} text-left active:scale-95 transition-all`}>
                        <div className="font-bold text-white">{l.native}</div>
                        <div className="text-[10px] text-white/50 uppercase tracking-wider mt-1">{l.name}</div>
                     </button>
                  ))}
               </div>
            </div>
          </div>
        )}
    </div>
  );
};

// --- UI Components ---

function BeforeAfterSlider({ beforeImg, afterImg, isDone, isProcessing, toolType, frameStyle, autoAnimate = false, showLabels = true, interactive = true, originalLabel="Original", aiMagicLabel="AI Magic" }) {
  const [sliderPos, setSliderPos] = useState(100);
  const [isRevealing, setIsRevealing] = useState(false);
  const containerRef = useRef(null);
  const [containerWidth, setContainerWidth] = useState(0);

  useEffect(() => {
    const updateDimensions = () => { if (containerRef.current) setContainerWidth(containerRef.current.offsetWidth); };
    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  useEffect(() => {
    let animationFrame;
    if (autoAnimate) {
      let start = null;
      const duration = 4000;
      const animate = (time) => {
        if (!start) start = time;
        const progress = (time - start) % duration;
        const t = progress / duration;
        const val = Math.sin(t * Math.PI * 2 - Math.PI / 2) * 45 + 50;
        setSliderPos(val);
        animationFrame = requestAnimationFrame(animate);
      };
      animationFrame = requestAnimationFrame(animate);
    } else if (isProcessing) {
      setSliderPos(100);
      setIsRevealing(false);
    } else if (isDone && !isRevealing) {
      setIsRevealing(true);
      let current = 100;
      const sweep = () => {
        if (current > 0) { current -= 2.5; setSliderPos(current); requestAnimationFrame(sweep); }
        else setSliderPos(0);
      };
      sweep();
    } else if (!isDone && !isProcessing) {
      setSliderPos(100);
      setIsRevealing(false);
    }
    return () => cancelAnimationFrame(animationFrame);
  }, [isDone, isProcessing, autoAnimate, isRevealing]);

  const handleMove = (e) => {
    if (!containerRef.current || isProcessing || !interactive || !isDone) return;
    const rect = containerRef.current.getBoundingClientRect();
    const clientX = e.clientX || (e.touches && e.touches[0].clientX);
    if (clientX === undefined) return;
    const x = clientX - rect.left;
    const pos = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPos(pos);
  };

  if (!beforeImg || !afterImg) return <div className="w-full h-full bg-slate-900 animate-pulse rounded-[2rem]" />;

  return (
    <div ref={containerRef} className={`relative w-full h-full overflow-hidden select-none bg-[#430C0D] touch-pan-y ${interactive ? 'rounded-[2rem]' : 'rounded-none'}`} onMouseMove={(e) => e.buttons === 1 && handleMove(e)} onTouchMove={handleMove} onClick={handleMove}>
      <div className="absolute inset-0 flex items-center justify-center bg-[#430C0D] pointer-events-none">
        {toolType === 'bg' ? (
          <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
            <FallbackImage src={afterImg} className="absolute inset-0 w-full h-full object-cover opacity-90 scale-110 blur-[1px]" alt="Background" />
            <div className="relative z-10 w-full h-full flex items-center justify-center p-4">
              <FallbackImage src={beforeImg} className="max-h-full object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.8)]" style={{ maskImage: 'radial-gradient(circle at center, black 45%, transparent 85%)', WebkitMaskImage: 'radial-gradient(circle at center, black 45%, transparent 85%)' }} alt="Subject" />
            </div>
            <div className="absolute inset-0 bg-[#FFC857]/5 mix-blend-overlay"></div>
          </div>
        ) : (
          <FallbackImage src={afterImg} className="w-full h-full object-cover" alt="Result" />
        )}

        {toolType === 'frame' && isDone && (
          <div className="absolute inset-0 pointer-events-none z-30">
            {frameStyle === 'frame-1' && (
              <div className="absolute inset-0 border-[24px] border-[#D4AF37] shadow-[inset_0_0_60px_rgba(0,0,0,0.6)]">
                <div className="absolute inset-0 border-[4px] border-white/30 m-[-2px]"></div>
              </div>
            )}
            {frameStyle === 'frame-2' && (
              <div className="absolute inset-0 border-[24px] border-slate-900 shadow-[inset_0_0_60px_rgba(0,0,0,0.8)]">
                <div className="absolute inset-4 border border-white/10"></div>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="absolute inset-0 z-10 overflow-hidden pointer-events-none border-r-[2px] border-[#FFF8E7]/60 shadow-[5px_0_30px_rgba(255,248,231,0.3)]" style={{ width: `${sliderPos}%` }}>
        <div style={{ width: containerWidth || '100%', height: '100%' }} className="flex items-center justify-center bg-[#430C0D]">
          <FallbackImage src={beforeImg} className="w-full h-full object-cover" alt="Original" />
        </div>
      </div>

      {interactive && isDone && !autoAnimate && (
        <div className="absolute inset-y-0 z-20 w-[4px] bg-[#FFF8E7] shadow-[0_0_20px_rgba(255,248,231,1)] touch-none pointer-events-none" style={{ left: `${sliderPos}%` }}>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-[#FFF8E7] rounded-full shadow-[0_0_30px_rgba(255,200,87,0.6)] flex items-center justify-center border-[3px] border-[#FFC857]">
               <div className="flex gap-1"><div className="w-1 h-3 bg-[#FFC857] rounded-full animate-bounce"></div><div className="w-1 h-3 bg-[#FFC857] rounded-full animate-bounce [animation-delay:0.2s]"></div></div>
          </div>
        </div>
      )}

      {showLabels && isDone && !autoAnimate && (
        <>
          <div className="absolute top-6 left-6 z-40 px-3 py-1 bg-black/60 backdrop-blur-md rounded-full text-[9px] font-black text-[#FFF8E7] uppercase tracking-widest border border-white/10 italic text-center">{originalLabel}</div>
          <div className="absolute top-6 right-6 z-40 px-3 py-1 bg-gradient-to-r from-[#FFC857] to-[#FF9EAA] backdrop-blur-md rounded-full text-[9px] font-black text-black uppercase tracking-widest border border-white/20 shadow-[0_0_15px_rgba(255,200,87,0.5)] text-center">{aiMagicLabel}</div>
        </>
      )}
    </div>
  );
}

function AIMagicTile({ title, beforeUrl, afterUrl, onClick, toolType }) {
  return (
    <div className="relative w-full aspect-[3/4.6] rounded-[2.8rem] overflow-hidden shadow-2xl active:scale-[0.96] transition-all bg-slate-900 border border-white/10 group">
      <div className="absolute inset-0 pointer-events-none">
        <BeforeAfterSlider beforeImg={beforeUrl} afterImg={afterUrl} autoAnimate={true} showLabels={false} interactive={false} toolType={toolType} isDone={false} isProcessing={false} />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-4 z-50">
        <button onClick={(e) => { e.stopPropagation(); onClick(); }} className="w-full bg-gradient-to-r from-[#FFC857] to-[#FF9EAA] text-black rounded-full py-3.5 px-2 flex items-center justify-center gap-2 shadow-lg border border-white/10 active:scale-95">
          <Zap size={14} fill="currentColor" className="text-black shadow-sm" />
          <span className="text-[10px] font-black uppercase tracking-widest leading-none">{title}</span>
        </button>
      </div>
    </div>
  );
}

function CreativeOptionTile({ label, previewUrl, onClick }) {
    return (
        <button onClick={onClick} className="flex-shrink-0 group flex flex-col items-center gap-2 active:scale-95 transition-all">
            <div className="w-[105px] h-[145px] rounded-[1.2rem] overflow-hidden border border-white/5 relative shadow-xl bg-slate-900">
                <FallbackImage src={previewUrl} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" alt={label} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
            </div>
            {label && <span className="text-[10px] font-bold text-[#FFF8E7]/60 group-hover:text-[#FFF8E7] transition-colors uppercase tracking-tight text-center">{label}</span>}
        </button>
    );
}

function CreativeSection({ title, children, seeAllText }) {
    return (
        <div className="space-y-4 px-1">
            <div className="flex items-center justify-between">
                <h3 className="text-[15px] font-black text-[#FFF8E7] tracking-tight uppercase italic">{title}</h3>
                <button className="bg-white/10 px-3 py-1 rounded-full text-[10px] font-black uppercase text-[#FFF8E7]/60 active:scale-95 transition-all">{seeAllText || "See All"}</button>
            </div>
            <div className="flex gap-4 overflow-x-auto hide-scrollbar pb-2 px-1">
                {children}
            </div>
        </div>
    );
}

// Extracted VideoPlayerView for Shivratri video playback
const VideoPlayerView = ({ videoData, onClose, onToast }) => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const current = videoRef.current.currentTime;
    const dur = videoRef.current.duration;
    setProgress((current / dur) * 100);
  };

  const formatTime = (timeInSeconds) => {
    if (isNaN(timeInSeconds)) return "0:00";
    const m = Math.floor(timeInSeconds / 60);
    const s = Math.floor(timeInSeconds % 60);
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex flex-col h-full bg-black animate-in fade-in duration-500 z-[200] relative">
      <div className="absolute top-0 left-0 right-0 z-50 p-6 flex justify-between items-center bg-gradient-to-b from-black/80 to-transparent pointer-events-none">
         <div className="flex items-center gap-3 pointer-events-auto">
           <button onClick={onClose} className="p-2 bg-white/10 rounded-full text-white active:scale-90 transition-all backdrop-blur-md"><X size={20} /></button>
           <h2 className="text-white font-bold text-sm tracking-wide drop-shadow-md">{videoData.title}</h2>
         </div>
      </div>

      <div className="flex-1 relative overflow-hidden flex items-center justify-center bg-[#1a0505] cursor-pointer" onClick={togglePlay}>
         <video
           ref={videoRef}
           src={videoData.src}
           className="absolute inset-0 w-full h-full object-cover"
           autoPlay
           playsInline
           loop
           onTimeUpdate={handleTimeUpdate}
           onLoadedMetadata={() => setDuration(videoRef.current.duration)}
         />

         {!isPlaying && (
           <div className="absolute inset-0 flex items-center justify-center bg-black/30 transition-all duration-300">
             <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-md shadow-2xl">
               <Play className="w-8 h-8 text-white fill-white ml-1" />
             </div>
           </div>
         )}
         <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none"></div>
      </div>

      <div className="absolute bottom-8 left-0 right-0 px-6 z-50 flex flex-col gap-4">
         <div className="flex items-center gap-3">
            <span className="text-white text-[10px] font-bold">{formatTime(videoRef.current?.currentTime || 0)}</span>
            <div className="flex-1 h-1.5 bg-white/20 rounded-full overflow-hidden relative cursor-pointer">
              <div className="absolute top-0 left-0 bottom-0 bg-white rounded-full transition-all duration-100 ease-linear" style={{ width: `${progress}%` }}></div>
            </div>
            <span className="text-white text-[10px] font-bold">{formatTime(duration)}</span>
         </div>

         <div className="grid grid-cols-2 gap-4 mt-2">
            <button
              onClick={() => onToast("Video saved to gallery")}
              className="bg-white/10 backdrop-blur-md border border-white/20 text-white font-bold py-3.5 rounded-[1.5rem] flex items-center justify-center gap-2 active:scale-95 transition-all text-sm shadow-xl"
            >
              <Download size={18} /> Save
            </button>
            <button
              onClick={() => onToast("Shared on WhatsApp")}
              className="bg-[#25D366] text-white font-bold py-3.5 rounded-[1.5rem] flex items-center justify-center gap-2 active:scale-95 transition-all shadow-lg shadow-green-900/30 text-sm"
            >
              <MessageCircle size={18} fill="currentColor" /> Share
            </button>
         </div>
      </div>
    </div>
  );
};

// Extracted MemoryView to fix Hook violation
const MemoryView = ({ activeMemory, setActiveMemory, onClose, onToast }) => {
  useEffect(() => {
    if (!activeMemory) return;
    const timer = setInterval(() => {
      setActiveMemory(prev => {
         if (!prev) return null;
         const nextIndex = (prev.currentIndex + 1) % prev.images.length;
         return { ...prev, currentIndex: nextIndex };
      });
    }, activeMemory.duration);
    return () => clearInterval(timer);
  }, [activeMemory?.duration, setActiveMemory]);

  if (!activeMemory) return null;

  return (
    <div className="flex flex-col h-full bg-black animate-in fade-in duration-500 z-[200] relative">
      {/* Memory Header - Removed Rec Icon */}
      <div className="absolute top-0 left-0 right-0 z-50 p-6 flex justify-between items-center bg-gradient-to-b from-black/80 to-transparent">
         <div className="flex items-center gap-3">
           <button onClick={onClose} className="p-2 bg-white/10 rounded-full text-white active:scale-90 transition-all backdrop-blur-md"><X size={20} /></button>
           <h2 className="text-white font-bold text-sm tracking-wide drop-shadow-md">{activeMemory.title}</h2>
         </div>
      </div>

      {/* Main Content (Slideshow) */}
      <div className="flex-1 relative overflow-hidden flex items-center justify-center bg-[#1a0505]">
         <AnimatePresence mode="wait">
           <motion.img
             key={activeMemory.currentIndex}
             src={activeMemory.images[activeMemory.currentIndex]}
             initial={{ opacity: 0, scale: 1.1 }}
             animate={{ opacity: 1, scale: 1 }}
             exit={{ opacity: 0 }}
             transition={{ duration: 1.5 }}
             className="absolute inset-0 w-full h-full object-cover"
             alt="Memory Slide"
           />
         </AnimatePresence>

         {/* Ken Burns overlay effect */}
         <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none"></div>
      </div>

      {/* Audio Player (Hidden) */}
      <audio src={activeMemory.music} autoPlay loop />

      {/* Controls */}
      <div className="absolute bottom-10 left-0 right-0 px-6 z-50 flex flex-col gap-5">
         <div className="flex justify-center gap-1.5 mb-2">
           {activeMemory.images.map((_, idx) => (
             <div key={idx} className={`h-1 rounded-full transition-all duration-500 ${idx === activeMemory.currentIndex ? 'w-8 bg-white' : 'w-2 bg-white/30'}`}></div>
           ))}
         </div>

         <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => onToast("Video saved to gallery")}
              className="bg-white/10 backdrop-blur-md border border-white/20 text-white font-bold py-4 rounded-[1.5rem] flex items-center justify-center gap-2 active:scale-95 transition-all"
            >
              <Download size={20} /> Save Video
            </button>
            <button
              onClick={() => onToast("Shared on WhatsApp")}
              className="bg-[#25D366] text-white font-bold py-4 rounded-[1.5rem] flex items-center justify-center gap-2 active:scale-95 transition-all shadow-lg shadow-green-900/30"
            >
              <MessageCircle size={20} fill="currentColor" /> Share
            </button>
         </div>
      </div>
    </div>
  );
};

// Extracted FullscreenImageView
const FullscreenImageView = ({ image, onClose, onToast }) => {
  return (
    <div className="flex flex-col h-full bg-black animate-in zoom-in-95 duration-300 z-[200] relative">
       <button onClick={onClose} className="absolute top-6 left-6 z-50 p-3 bg-black/40 rounded-full text-white backdrop-blur-md active:scale-90"><X size={24} /></button>
       <div className="flex-1 flex items-center justify-center overflow-hidden">
          <img src={image} className="w-full h-full object-contain" alt="Full View" />
       </div>
       <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-4 px-6">
          <button onClick={() => onToast("Image Saved")} className="flex-1 bg-white text-black font-bold py-3.5 rounded-full shadow-xl active:scale-95 flex items-center justify-center gap-2"><Download size={18}/> Save</button>
          <button onClick={() => onToast("Shared")} className="flex-1 bg-white/20 text-white backdrop-blur-md border border-white/20 font-bold py-3.5 rounded-full shadow-xl active:scale-95 flex items-center justify-center gap-2"><Share2 size={18}/> Share</button>
       </div>
    </div>
  );
};

// --- Main Application ---
const App = () => {
  // Navigation & Bottom Sheets
  const [currentView, setCurrentView] = useState('main');
  const [activeSheet, setActiveSheet] = useState(null);
  const [activeNav, setActiveNav] = useState(0);
  const [heroIndex, setHeroIndex] = useState(0);
  const [appLanguage, setAppLanguage] = useState('en');
  const mainScrollRef = useRef(null);
  const mainScrollPos = useRef(0);

  // Magic Studio State
  const [magicSubTab, setMagicSubTab] = useState('edit');
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [selectedStyle, setSelectedStyle] = useState(null);
  const [pendingToolType, setPendingToolType] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const [processingStatus, setProcessingStatus] = useState("");
  const [cameraFlash, setCameraFlash] = useState(false);

  // Quick Action State
  const [quickActionData, setQuickActionData] = useState(null);
  const [isQuickProcessing, setIsQuickProcessing] = useState(false);
  const [appToast, setAppToast] = useState({ show: false, msg: '' });

  // Memory/Video Player State
  const [activeMemory, setActiveMemory] = useState(null);
  const [activeVideoData, setActiveVideoData] = useState(null);
  const [fullscreenImage, setFullscreenImage] = useState(null);

  const t = APP_TEXT[appLanguage];

  const dynamicVideoTags = videoTags.map(tag => ({
    ...tag,
    label: t.tags[tag.id] || tag.id
  }));

  const dynamicHeroSlides = [
    { src: ASSETS.hero, title: t.heroTitle, count: t.heroCount },
    { src: "https://satinux-vercel.vercel.app/assets/home-satin/images/Hero2.png", title: t.festivalMemories, count: "142 ready to view" },
    { src: "https://satinux-vercel.vercel.app/assets/home-satin/images/Hero4.png", title: t.celebrationHighlights, count: "98 ready to view" },
  ];

  // Restore main scroll position when switching back to 'main'
  useEffect(() => {
    if (currentView === 'main' && mainScrollRef.current) {
      mainScrollRef.current.scrollTop = mainScrollPos.current;
    }
  }, [currentView]);

  const handleMainScroll = (e) => {
    mainScrollPos.current = e.target.scrollTop;
  };

  // Embla Carousels
  const [heroRef, heroApi] = useEmblaCarousel({ loop: true }, [Autoplay({ delay: 3000, stopOnInteraction: false })]);

  const onHeroSelect = useCallback(() => {
    if (!heroApi) return;
    setHeroIndex(heroApi.selectedScrollSnap());
  }, [heroApi]);

  useEffect(() => {
    if (!heroApi) return;
    heroApi.on("select", onHeroSelect);
  }, [heroApi, onHeroSelect]);

  // --- Handlers for Magic Studio Integration ---
  const handleStartEditJourney = (toolType) => {
    setPendingToolType(toolType);
    setCurrentView('gallery-picker');
    setActiveSheet(null);
  };

  const handleCreativeStyleSelected = (toolType, styleId) => {
    setSelectedStyle(styleId);
    setPendingToolType(toolType);
    setCurrentView('gallery-picker');
    setActiveSheet(null);
  };

  const handlePhotoPickedFromGallery = (photoUrl) => {
      let finalBefore = photoUrl;
      let finalAfter = photoUrl;

      if (pendingToolType === 'unblur') {
          const unblurMapping = {
            "https://i.ibb.co/7NnR7Ty8/blur-before.png": "https://i.ibb.co/zhRC1HGF/blur-after.png",
            "https://i.ibb.co/xt91H0nF/blur-before-2.png": "https://i.ibb.co/TDZ7r7fk/blur-after2.png",
            "https://i.ibb.co/wNrtbcRn/blur-before3.png": "https://i.ibb.co/7NzT4XQv/blur-after3.png"
          };
          finalAfter = unblurMapping[photoUrl] || photosTool.unblur.after;
      } else if (pendingToolType === 'erase') {
          const eraseMapping = {
            "https://i.ibb.co/pjxGCGBk/remove-people-from-photos-before-2.png": "https://i.ibb.co/G3sTrbsn/remove-people-from-photos-after-2.png",
            "https://i.ibb.co/994XrDYZ/remove-people-from-photos-before.png": "https://i.ibb.co/dwS8rdbp/remove-people-from-photos-after.png"
          };
          finalAfter = eraseMapping[photoUrl] || photosTool.erase.after;
      } else if (pendingToolType === 'enhance') {
          const enhanceMapping = {
            "https://i.ibb.co/Zps21mh2/enhance-before.png": "https://i.ibb.co/cXr9C0B5/enhance-after.png",
            "https://i.ibb.co/ycnsdQXv/enhance-before-2.png": "https://i.ibb.co/Rk5jmL7Q/enhance-after-2.png",
            "https://i.ibb.co/fddv9mnq/enhance-before-3.png": "https://i.ibb.co/WvKNkQM1/enhance-after-3.png"
          };
          finalAfter = enhanceMapping[photoUrl] || photosTool.enhance.after;
      } else if (pendingToolType === 'avatar') {
          const avatarMapping = {
            "https://i.ibb.co/SXhKgdD2/Rajkumari-before-1.png": "https://i.ibb.co/whPnHdbK/Rajkumari-after-1.png",
            "https://i.ibb.co/63gDfqd/Rajkumari-before-2.png": "https://i.ibb.co/RpM8p415/Rajkumari-after-2.png",
            "https://i.ibb.co/21H0gPGn/Rajkumar-before-1.png": "https://i.ibb.co/4wQtFdpb/Rajkumar-after-1.png",
            "https://i.ibb.co/s9Rr3ksP/Rajkumar-before-2.png": "https://i.ibb.co/pvtW2Z13/Rajkumar-after-2.png"
          };
          finalAfter = avatarMapping[photoUrl] || photoUrl;
      } else if (pendingToolType === 'bg') {
          const bgMapping = {
            "bg-1": "https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=600&q=80",
            "bg-2": "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=600&q=80",
            "bg-3": "https://images.unsplash.com/photo-1587595431973-160d0d94add1?auto=format&fit=crop&w=600&q=80",
            "bg-4": "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=600&q=80",
            "bg-5": "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=600&q=80",
            "bg-6": "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=600&q=80"
          };
          finalAfter = bgMapping[selectedStyle] || bgMapping["bg-1"];
      }

      setSelectedPhoto({ before: finalBefore, after: finalAfter, type: pendingToolType, style: selectedStyle });
      setIsDone(false);
      setIsProcessing(false);
      setCurrentView(pendingToolType);
  };

  const handleCameraCapture = () => {
    setCameraFlash(true);
    setTimeout(() => {
        setCameraFlash(false);
        setSelectedPhoto({ before: enhanceGalleryPhotos[0], after: photosTool.enhance.after, type: 'enhance' });
        setCurrentView('camera-review');
    }, 400);
  };

  const startMagicFromCapture = (type) => {
    setPendingToolType(type);
    setIsDone(false);
    setIsProcessing(false);
    const capturedBefore = selectedPhoto.before;
    let capturedAfter = selectedPhoto.after;
    let style = null;

    if (type === 'avatar') capturedAfter = "https://i.ibb.co/4wQtFdpb/Rajkumar-after-1.png";
    if (type === 'frame') { capturedAfter = capturedBefore; style = 'frame-1'; }
    if (type === 'bg') { capturedAfter = "https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=600&q=80"; style = 'bg-1'; }

    setSelectedPhoto({ before: capturedBefore, after: capturedAfter, type: type, style: style });
    setCurrentView(type);
  };

  const runMagicAction = (status = t.processingMagic) => {
    setIsProcessing(true);
    setProcessingStatus(status);
    setTimeout(() => {
      setIsProcessing(false);
      setIsDone(true);
    }, 3200);
  };

  const triggerAppToast = (msg) => {
    setAppToast({ show: true, msg });
    setTimeout(() => setAppToast({ show: false, msg: '' }), 3000);
  };

  const handleMemoryOpen = (memoryKey) => {
    const memData = MEMORY_DATA[memoryKey];
    setActiveMemory({ ...memData, title: t[memoryKey] || memData.title, currentIndex: 0 });
    setCurrentView('memory-player');
  };

  const handleVideoOpen = (videoKey) => {
    if (videoKey === 'shivratri') {
       setActiveVideoData({
          title: t.shivratriReady.replace(' 🤩', ''),
          src: "https://satinux-vercel.vercel.app/assets/home-satin/images/Shivratri.mp4"
       });
       setCurrentView('video-player');
    }
  };

  const handleQuickAction = (type, title, img, resultImg) => {
    setQuickActionData({ type, title, img, resultImg });
    setIsQuickProcessing(true);
    setCurrentView('quick-action');
    setActiveSheet(null);

    // Simulate AI processing
    setTimeout(() => {
      setIsQuickProcessing(false);
    }, 2000);
  };

  const goBackToMain = () => {
    setCurrentView('main');
    setIsDone(false);
    setIsProcessing(false);
    setPendingToolType(null);
    setSelectedPhoto(null);
    setSelectedStyle(null);
    setActiveMemory(null);
    setActiveVideoData(null);
    setFullscreenImage(null);
  };

  // --- Views ---

  const renderMagicTab = () => (
    <div className="flex flex-col h-full bg-[#16080c] overflow-hidden text-[#FFF8E7] animate-in slide-in-from-bottom duration-500 z-[200]">
        <header className="px-6 py-10 flex justify-between items-center z-50">
            <div className="flex items-center gap-4">
                <button onClick={goBackToMain} className="p-3 bg-white/10 rounded-full active:scale-90"><X size={24} /></button>
                <div className="w-10 h-10 bg-gradient-to-br from-[#FFC857] to-[#FF9EAA] rounded-xl flex items-center justify-center text-black shadow-lg"><Sparkles size={22} fill="currentColor" /></div>
                <h2 className="text-xl font-black text-[#FFF8E7] tracking-tighter uppercase italic leading-none">{t.magicStudio}</h2>
            </div>
            <div className="w-10 h-10 bg-white/5 rounded-2xl flex items-center justify-center text-[#FFF8E7]/40 border border-[#FFF8E7]/10"><BrainCircuit size={20} /></div>
        </header>

        <main className="flex-1 px-5 overflow-y-auto hide-scrollbar pb-32 touch-pan-y">
            <div className="bg-white/5 p-1 rounded-2xl flex relative border border-white/10 mx-1 mb-8 shadow-inner">
                <div className="absolute inset-y-1 w-[calc(50%-4px)] bg-gradient-to-r from-[#FFC857] to-[#FF9EAA] rounded-xl transition-all duration-500 shadow-lg shadow-[#FFC857]/10" style={{ left: magicSubTab === 'edit' ? '4px' : 'calc(50%)' }}></div>
                <button onClick={() => setMagicSubTab('edit')} className={`flex-1 py-3.5 text-[11px] font-black uppercase tracking-wider relative z-10 transition-colors ${magicSubTab === 'edit' ? 'text-black' : 'text-[#FFF8E7]/40'}`}>{t.oneTouchEdit}</button>
                <button onClick={() => setMagicSubTab('creative')} className={`flex-1 py-3.5 text-[11px] font-black uppercase tracking-wider relative z-10 transition-colors ${magicSubTab === 'creative' ? 'text-black' : 'text-[#FFF8E7]/40'}`}>{t.aiCreative}</button>
            </div>

            {magicSubTab === 'edit' ? (
                <div className="grid grid-cols-2 gap-5 animate-in fade-in slide-in-from-left-6 duration-600 px-1">
                    {[
                        { id: 'unblur', title: t.unblurPhoto, before: photosTool.unblur.before, after: photosTool.unblur.after },
                        { id: 'erase', title: t.objectRemover, before: photosTool.erase.before, after: photosTool.erase.after },
                        { id: 'enhance', title: t.enhancePhoto, before: photosTool.enhance.before, after: photosTool.enhance.after }
                    ].map(tool => (
                        <AIMagicTile key={tool.id} title={tool.title} beforeUrl={tool.before} afterUrl={tool.after} toolType={tool.id} onClick={() => handleStartEditJourney(tool.id)} />
                    ))}
                    <div className="p-7 bg-white/[0.03] rounded-[2.8rem] flex flex-col items-center justify-center border border-dashed border-[#FFF8E7]/15 text-slate-700 active:scale-95 transition-all text-center">
                        <Wand2 size={36} className="text-[#FFC857]/20" />
                        <span className="text-[10px] font-black uppercase mt-4 tracking-[0.3em] opacity-40 text-center text-[#FFF8E7]/40 leading-tight italic">{t.newTools}</span>
                    </div>
                </div>
            ) : (
                <div className="space-y-10 animate-in fade-in slide-in-from-right-6 duration-600 px-1">
                    <CreativeSection title={t.desiAiAvatars}>
                        <CreativeOptionTile label={t.rajkumari} previewUrl="https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?auto=format&fit=crop&w=300&q=80" onClick={() => handleCreativeStyleSelected('avatar', 'rajkumari')} />
                        <CreativeOptionTile label={t.rajkumar} previewUrl="https://images.unsplash.com/photo-1566554273541-37a9ca77b91f?auto=format&fit=crop&w=300&q=80" onClick={() => handleCreativeStyleSelected('avatar', 'rajkumar')} />
                    </CreativeSection>
                    <CreativeSection title={t.studioFrames}>
                        <CreativeOptionTile label={t.royalGold} previewUrl={ASSETS.frame9} onClick={() => handleCreativeStyleSelected('frame', 'frame-1')} />
                        <CreativeOptionTile label={t.modernBlack} previewUrl={ASSETS.frame10} onClick={() => handleCreativeStyleSelected('frame', 'frame-2')} />
                    </CreativeSection>
                    <CreativeSection title={t.teleportDest}>
                        <CreativeOptionTile label={t.tajMahal} previewUrl="https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=300&q=80" onClick={() => handleCreativeStyleSelected('bg', 'bg-1')} />
                        <CreativeOptionTile label={t.hawaMahal} previewUrl="https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=300&q=80" onClick={() => handleCreativeStyleSelected('bg', 'bg-2')} />
                        <CreativeOptionTile label={t.goldenTemple} previewUrl="https://images.unsplash.com/photo-1587595431973-160d0d94add1?auto=format&fit=crop&w=300&q=80" onClick={() => handleCreativeStyleSelected('bg', 'bg-3')} />
                        <CreativeOptionTile label={t.kerala} previewUrl="https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=300&q=80" onClick={() => handleCreativeStyleSelected('bg', 'bg-4')} />
                        <CreativeOptionTile label={t.goaBeach} previewUrl="https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=300&q=80" onClick={() => handleCreativeStyleSelected('bg', 'bg-5')} />
                        <CreativeOptionTile label={t.himalayas} previewUrl="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=300&q=80" onClick={() => handleCreativeStyleSelected('bg', 'bg-6')} />
                    </CreativeSection>
                </div>
            )}
        </main>
    </div>
  );

  const renderGalleryPicker = () => {
    let photosToDisplay = galleryPhotos;
    if (pendingToolType === 'unblur') photosToDisplay = blurGalleryPhotos;
    else if (pendingToolType === 'erase') photosToDisplay = eraseGalleryPhotos;
    else if (pendingToolType === 'enhance') photosToDisplay = enhanceGalleryPhotos;
    else if (pendingToolType === 'avatar') {
        if (selectedStyle === 'rajkumari') photosToDisplay = rajkumariGalleryPhotos;
        else if (selectedStyle === 'rajkumar') photosToDisplay = rajkumarGalleryPhotos;
    }

    return (
      <div className="flex flex-col h-full bg-[#120407] animate-in slide-in-from-right duration-400 z-[200]">
          <header className="px-6 py-10 flex items-center justify-between border-b border-white/5 sticky top-0 z-50">
                <button onClick={() => setCurrentView('magic-studio')} className="p-3.5 bg-white/5 rounded-2xl text-[#FFF8E7] active:scale-90 shadow-xl"><ArrowLeft size={24} /></button>
                <h2 className="text-sm font-black uppercase text-[#FFF8E7] tracking-[0.2em]">{t.pickPhoto}</h2>
                <div className="w-12" />
          </header>
          <main className="flex-1 p-6 overflow-y-auto hide-scrollbar pb-32 touch-pan-y">
                <div className="grid grid-cols-3 gap-4">
                    {photosToDisplay.map((url, idx) => (
                        <button key={idx} onClick={() => handlePhotoPickedFromGallery(url)} className={`aspect-square rounded-[1.2rem] overflow-hidden border active:scale-90 transition-all bg-slate-900 ${selectedPhoto && url === selectedPhoto.before ? 'border-[#FFC857] border-2 shadow-[0_0_15px_rgba(255,200,87,0.4)]' : 'border-white/10'}`}>
                            <FallbackImage src={url} className="w-full h-full object-cover" alt="Gallery Selection" />
                        </button>
                    ))}
                </div>
          </main>
      </div>
    );
  };

  const renderSliderToolView = (title, beforeImg, afterImg, actionLabel, toolType) => (
    <div className="flex flex-col h-full bg-[#120407] overflow-hidden z-[200]">
      <header className="px-6 py-8 pt-10 flex items-center justify-between border-b border-white/5 bg-[#120407]/80 backdrop-blur-2xl">
        <button onClick={() => { setIsDone(false); setIsProcessing(false); setCurrentView('gallery-picker'); }} className="p-3.5 rounded-2xl text-[#FFF8E7] bg-white/10 active:scale-90 shadow-xl transition-all"><ArrowLeft size={24} /></button>
        <div className="text-center">
            <h2 className="text-xs font-black text-[#FFC857] uppercase tracking-[0.4em] italic">{title}</h2>
            <p className="text-[9px] text-[#FFF8E7]/40 font-bold uppercase tracking-widest mt-1.5 italic leading-none">{t.neuralEngine}</p>
        </div>
        <button className="p-3.5 rounded-2xl text-[#FFF8E7]/30 border border-[#FFF8E7]/5"><MoreVertical size={20} /></button>
      </header>

      <main className="flex-1 flex flex-col p-6 space-y-8 overflow-y-auto hide-scrollbar pb-32 touch-pan-y">
        <div className="flex-shrink-0 relative w-full h-[460px]">
           <BeforeAfterSlider beforeImg={beforeImg} afterImg={afterImg} isDone={isDone} isProcessing={isProcessing} toolType={toolType} frameStyle={selectedPhoto?.style} interactive={true} originalLabel={t.original} aiMagicLabel={t.aiMagic} />
           {isProcessing && (
              <div className="absolute inset-0 z-[100] flex items-center justify-center p-14 text-center bg-[#120407]/98 backdrop-blur-3xl rounded-[2.5rem] shadow-2xl">
                  <div className="flex flex-col items-center w-full relative justify-center h-full">
                    <div className="absolute top-0 w-full h-[3px] bg-gradient-to-r from-transparent via-[#FFC857] to-transparent shadow-[0_0_15px_rgba(255,200,87,1)] animate-scan-line"></div>
                    <Sparkles size={64} className="text-[#FFC857] animate-pulse drop-shadow-[0_0_15px_rgba(255,200,87,0.4)]" />
                    <h3 className="text-2xl font-black italic text-[#FFF8E7] tracking-tighter leading-tight uppercase mt-8 animate-pulse">{processingStatus}</h3>
                    <div className="flex items-center gap-1.5 mt-6">{[1, 2, 3].map(i => <div key={i} className="w-1.5 h-1.5 rounded-full bg-[#FFC857] animate-bounce" style={{ animationDelay: `${i * 0.15}s` }}></div>)}</div>
                  </div>
              </div>
           )}
        </div>

        <div className="flex-shrink-0 space-y-6">
            {!isDone ? (
            <div className="space-y-6 animate-in fade-in duration-700">
                  <div className="flex items-center justify-center gap-5 opacity-40">
                      <div className="w-2 h-2 rounded-full bg-[#FFC857] animate-ping"></div>
                      <p className="text-[11px] text-[#FFF8E7] font-black uppercase tracking-[0.3em]">{t.slideDifference}</p>
                      <div className="w-2 h-2 rounded-full bg-[#FFC857] animate-ping"></div>
                  </div>
                  <button onClick={() => runMagicAction(actionLabel === t.enhance ? t.optimizingPhoto : t.processingMagic)} disabled={isProcessing} className="w-full bg-gradient-to-r from-[#FFC857] to-[#FF9EAA] text-black font-black py-5 rounded-[2.2rem] shadow-xl active:scale-95 transition-all flex items-center justify-center gap-5 uppercase tracking-[0.2em] text-sm border border-white/20 hover:brightness-110 shadow-[#FFC857]/20">
                      <Zap size={24} fill="currentColor" className="text-black" /> {actionLabel} {t.now}
                  </button>
            </div>
            ) : (
            <div className="grid grid-cols-2 gap-6 animate-in slide-in-from-bottom-10 duration-700">
                  <button onClick={goBackToMain} className="bg-white/5 border border-white/10 text-[#FFF8E7] font-black py-5 rounded-[2.2rem] flex items-center justify-center gap-3 active:scale-95 transition-all uppercase text-[11px] tracking-widest shadow-2xl"><Download size={22}/> {t.save}</button>
                  <button onClick={goBackToMain} className="bg-gradient-to-r from-[#FFC857] via-[#FF9EAA] to-[#FFC857] text-black font-black py-5 rounded-[2.2rem] flex items-center justify-center gap-3 active:scale-95 shadow-xl transition-all uppercase text-[11px] tracking-widest border border-white/10"><Share2 size={22}/> {t.share}</button>
            </div>
            )}
        </div>
      </main>
      <style>{` @keyframes scan-line { 0% { transform: translateY(0); } 100% { transform: translateY(460px); } } .animate-scan-line { animation: scan-line 2.5s linear infinite; } `}</style>
    </div>
  );

  const renderCameraView = () => (
    <div className="flex flex-col h-full bg-[#120407] animate-in fade-in duration-500 z-[200]">
        <header className="px-6 py-10 flex items-center justify-between z-50">
           <button onClick={() => setCurrentView('main')} className="p-3 bg-white/10 rounded-full text-[#FFF8E7] active:scale-90"><X size={24} /></button>
           <div className="flex items-center gap-6"><button className="text-[#FFF8E7] active:scale-90"><ZapOff size={24} /></button><button className="text-[#FFF8E7] active:scale-90"><Settings size={24} /></button></div>
        </header>
        <div className="flex-1 relative mx-4 mb-4 rounded-[3rem] overflow-hidden bg-slate-900 border border-white/10 shadow-2xl">
           <div className="absolute inset-0 flex items-center justify-center opacity-20 pointer-events-none"><div className="w-64 h-64 border border-[#FFF8E7]/40 rounded-full"></div><div className="absolute w-20 h-px bg-[#FFF8E7]/60"></div><div className="absolute h-20 w-px bg-[#FFF8E7]/60"></div></div>
           <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
           <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-center w-full">
              <div className="flex justify-center gap-10 mb-6"><span className="text-[11px] font-black text-[#FFF8E7]/40 uppercase tracking-widest">{t.slomo}</span><span className="text-[11px] font-black text-[#FFC857] uppercase tracking-widest border-b-2 border-[#FFC857] pb-1">{t.photo}</span><span className="text-[11px] font-black text-[#FFF8E7]/40 uppercase tracking-widest">{t.video}</span></div>
              <span className="text-[10px] font-black uppercase text-[#FFF8E7]/30 tracking-[0.4em] italic animate-pulse">{t.aiAutoFocus}</span>
           </div>
        </div>
        <div className="h-44 flex-shrink-0 bg-[#120407] flex items-center justify-around px-8 pb-12">
           <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white overflow-hidden"><FallbackImage src={ASSETS.profile} className="w-full h-full object-cover opacity-60" /></div>
           <button onClick={handleCameraCapture} className="w-20 h-20 rounded-full bg-[#FFF8E7] flex items-center justify-center shadow-[0_0_40px_rgba(255,248,231,0.2)] active:scale-90 transition-all p-2"><div className="w-full h-full rounded-full border-[3px] border-black/10 bg-[#FFF8E7] flex items-center justify-center"><div className="w-14 h-14 rounded-full border-[2px] border-black/5 bg-[#FFF8E7]"></div></div></button>
           <button className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center text-[#FFF8E7] active:rotate-180 transition-transform duration-500"><RefreshCcw size={28} /></button>
        </div>
    </div>
  );

  const renderReviewView = () => (
    <div className="flex flex-col h-full bg-[#120407] animate-in slide-in-from-bottom duration-500 z-[200]">
        <header className="px-6 py-10 flex items-center justify-between"><button onClick={() => setCurrentView('camera')} className="p-3 bg-white/10 rounded-full text-[#FFF8E7] active:scale-90 shadow-xl"><ArrowLeft size={24} /></button><h2 className="text-sm font-black uppercase text-[#FFF8E7] tracking-[0.2em]">{t.preview}</h2><button onClick={goBackToMain} className="p-3 bg-white/10 rounded-full text-[#FFF8E7] active:scale-90 shadow-xl"><Check size={24} /></button></header>
        <main className="flex-1 overflow-y-auto hide-scrollbar pb-32 touch-pan-y">
            <div className="mx-6 rounded-[3rem] overflow-hidden bg-slate-900 border border-white/5 shadow-2xl h-[440px]"><FallbackImage src={selectedPhoto?.before} className="w-full h-full object-cover" alt="Captured" /></div>
            <div className="p-8 space-y-6">
                  <div className="flex items-center justify-center gap-3"><Sparkles size={18} className="text-[#FFC857]" /><span className="text-[11px] font-black uppercase text-[#FFF8E7] tracking-[0.3em]">{t.aiStudioMagic}</span></div>
                  <div className="grid grid-cols-1 gap-3">
                        <button onClick={() => startMagicFromCapture('enhance')} className="w-full bg-gradient-to-r from-[#FFC857] to-[#FF9EAA] text-black font-black py-5 rounded-[1.8rem] shadow-xl active:scale-95 flex items-center justify-center gap-4 uppercase tracking-widest text-[11px] border border-white/10"><BrainCircuit size={20} /> {t.aiEnhance}</button>
                        <div className="grid grid-cols-3 gap-2">
                            <button onClick={() => startMagicFromCapture('avatar')} className="bg-white/5 text-[#FFF8E7] font-black py-4 rounded-[1.8rem] active:scale-95 flex flex-col items-center justify-center gap-2 border border-[#FFF8E7]/10 uppercase tracking-widest text-[8px]"><UserCircle size={18} className="text-[#FFC857]" /> {t.avatar}</button>
                            <button onClick={() => startMagicFromCapture('frame')} className="bg-white/5 text-[#FFF8E7] font-black py-4 rounded-[1.8rem] active:scale-95 flex flex-col items-center justify-center gap-2 border border-[#FFF8E7]/10 uppercase tracking-widest text-[8px]"><Frame size={18} className="text-[#FFC857]" /> {t.frame}</button>
                            <button onClick={() => startMagicFromCapture('bg')} className="bg-white/5 text-[#FFF8E7] font-black py-4 rounded-[1.8rem] active:scale-95 flex flex-col items-center justify-center gap-2 border border-[#FFF8E7]/10 uppercase tracking-widest text-[8px]"><MapPin size={18} className="text-[#FFC857]" /> {t.teleport}</button>
                        </div>
                        <button onClick={() => setCurrentView('camera')} className="w-full bg-transparent text-[#FFF8E7]/40 font-black py-3 rounded-[2rem] active:scale-95 transition-all uppercase tracking-widest text-[9px]">{t.retakePhoto}</button>
                  </div>
            </div>
        </main>
    </div>
  );

  const renderQuickActionView = () => (
    <div className="flex flex-col h-full bg-[#120407] animate-in slide-in-from-right duration-400 z-[200]">
        <header className="px-6 py-10 flex items-center justify-between border-b border-white/5 sticky top-0 z-50 flex-shrink-0">
            <button onClick={goBackToMain} className="p-3.5 bg-white/5 rounded-2xl text-[#FFF8E7] active:scale-90 shadow-xl transition-all"><ArrowLeft size={24} /></button>
            <h2 className="text-sm font-black text-[#FFF8E7] uppercase tracking-widest">{quickActionData?.title}</h2>
            <div className="w-12" />
        </header>

        <main className="flex-1 p-6 flex flex-col items-center justify-between overflow-hidden pb-10">
            <div className="relative w-full flex-1 rounded-[2.5rem] overflow-hidden shadow-2xl border border-white/10 bg-black/40 flex items-center justify-center p-2">
                {(!isQuickProcessing && quickActionData?.resultImg?.endsWith('.mp4')) ? (
                    <video
                        src={quickActionData.resultImg}
                        className="max-w-full max-h-full object-contain transition-all duration-700 blur-0 scale-100 opacity-100"
                        autoPlay
                        loop
                        playsInline
                        controls
                    />
                ) : (
                    <img
                        src={isQuickProcessing ? quickActionData?.img : quickActionData?.resultImg}
                        className={`max-w-full max-h-full object-contain transition-all duration-700 ${isQuickProcessing ? 'blur-[30px] scale-110 opacity-70' : 'blur-0 scale-100 opacity-100'}`}
                        alt={quickActionData?.title}
                    />
                )}

                {isQuickProcessing && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
                        <div className="w-16 h-16 border-4 border-[#25D366]/20 border-t-[#25D366] rounded-full animate-spin mb-5 shadow-[0_0_20px_rgba(37,211,102,0.2)]"></div>
                        <span className="text-white font-black tracking-[0.2em] uppercase text-[11px] animate-pulse drop-shadow-md">Processing...</span>
                    </div>
                )}
            </div>

            {!isQuickProcessing && (
                <button
                    onClick={() => {
                        setTimeout(() => {
                            triggerAppToast("Image shared successfully");
                            setTimeout(() => {
                                goBackToMain();
                                setQuickActionData(null);
                            }, 2000);
                        }, 500);
                    }}
                    className="mt-8 w-full bg-gradient-to-r from-[#25D366] to-[#128C7E] text-white font-black py-5 rounded-[2.2rem] shadow-xl active:scale-95 transition-all flex items-center justify-center gap-4 uppercase tracking-[0.2em] text-[13px] border border-white/20 hover:brightness-110 shadow-[#25D366]/20 flex-shrink-0"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232"/>
                    </svg>
                    Share on WhatsApp
                </button>
            )}
        </main>
    </div>
  );

  const renderPhotosView = () => (
    <div className="flex-1 overflow-y-auto hide-scrollbar relative bg-[#1c0812] animate-in slide-in-from-right duration-300 z-[200]">
      <header className="px-4 py-5 flex justify-between items-center bg-gradient-to-b from-black/80 to-transparent sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <button onClick={goBackToMain} className="p-1 active:scale-90 transition-transform">
            <X size={26} className="text-white" />
          </button>
          <h1 className="text-[22px] font-extrabold text-white tracking-tight">Photos</h1>
        </div>
        <div className="flex items-center gap-4">
          <Search size={22} className="text-white" />
          <Plus size={24} className="text-white" />
          <Upload size={20} className="text-white" />
          <Bell size={20} className="text-white" />
        </div>
      </header>

      <main className="px-0.5 relative pb-32">
        <div className="grid grid-cols-3 gap-[2px]">
          {photosGridData.map((item, index) => (
            <div
              key={index}
              className={`relative overflow-hidden cursor-pointer active:brightness-75 transition-all bg-[#2a0813] ${item.type === 'featured' ? 'col-span-2 row-span-2 aspect-square' : 'col-span-1 aspect-square'}`}
              onClick={() => setActiveSheet("hero")}
            >
              <FallbackImage src={item.src} className="w-full h-full object-cover" alt="" />

              {item.type === 'featured' && (
                <>
                  <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-transparent pointer-events-none"></div>
                  <h2 className="absolute top-3 left-3 text-white text-xl font-black tracking-tight drop-shadow-md pointer-events-none">29 Sep 2025</h2>
                  <button className="absolute top-3 right-3 bg-white/90 text-black px-4 py-1.5 rounded-full text-[13px] font-bold shadow-md active:scale-95">Select</button>
                </>
              )}

              {item.type === 'video' && (
                <div className="absolute bottom-1 right-1 text-white font-bold text-[11px] drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)] pointer-events-none">
                  {item.duration}
                </div>
              )}
            </div>
          ))}
        </div>
      </main>

      <div className="fixed bottom-6 left-0 right-0 flex justify-center pointer-events-none z-40">
        <div className="bg-[#ffcb57] rounded-full p-1.5 flex items-center shadow-[0_8px_30px_rgba(0,0,0,0.5)] pointer-events-auto">
           <button className="w-10 h-10 rounded-full flex items-center justify-center text-black active:bg-black/10 transition-colors">
              <ArrowUpDown size={20} strokeWidth={2.5} />
           </button>
           <div className="flex px-1 gap-1">
             <button className="px-4 py-2 text-black font-bold text-[14px]">Years</button>
             <button className="px-4 py-2 text-black font-bold text-[14px]">Months</button>
             <button className="px-5 py-2 bg-[#b58826] text-white font-bold text-[14px] rounded-full shadow-inner">All</button>
           </div>
           <button className="w-10 h-10 rounded-full flex items-center justify-center text-black active:bg-black/10 transition-colors">
              <ListFilter size={20} strokeWidth={2.5} />
           </button>
        </div>
      </div>
    </div>
  );

  const renderFilesView = () => (
    <div className="flex-1 overflow-y-auto hide-scrollbar pb-24 relative animate-in slide-in-from-right duration-300 z-[200]">

      <header className="px-5 pt-10 pb-4 flex items-center gap-4 sticky top-0 z-40 bg-gradient-to-b from-black/80 via-black/40 to-transparent backdrop-blur-sm">
        <button onClick={goBackToMain} className="p-1 active:scale-90 transition-transform -ml-1">
          <ArrowLeft size={28} className="text-white" />
        </button>
        <h1 className="text-[28px] font-bold text-[#F8F9FA] tracking-tight">Files</h1>
      </header>

      <main className="space-y-8 pt-2">
        <section className="px-5">
           <div className="bg-gradient-to-r from-[#e8a355] to-[#c48742] rounded-[16px] p-5 shadow-lg flex items-center justify-between">
              <div className="flex-1 pr-3">
                 <h2 className="text-[18px] font-bold text-black leading-tight mb-1">Tools Hub</h2>
                 <p className="text-black/80 font-medium text-[14px] leading-snug">Professional file utilities at your fingertips</p>
              </div>
              <button className="bg-[#240090] text-white font-bold text-[14px] px-6 py-2.5 rounded-full shadow-md active:scale-95 transition-transform whitespace-nowrap">Try Now</button>
           </div>
        </section>

        <FileSection title="Documents" items={fileSections.documents} width="w-[88px]" aspect="aspect-[3/4]" />

        <section className="px-5">
          <h3 className="text-[20px] font-bold text-[#F8F9FA] tracking-tight leading-none mb-4">Utilities</h3>
          <div className="grid grid-cols-2 gap-4">
             <div className="rounded-[16px] aspect-[1.45/1] shadow-lg active:scale-[0.98] transition-transform relative overflow-hidden cursor-pointer border border-white/10">
               <img src="https://satinux-vercel.vercel.app/assets/home-satin/images/image9_645_1089.png" className="w-full h-full object-cover" alt="DigiLocker" />
               <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent pointer-events-none"></div>
               <span className="absolute bottom-3 left-4 text-[#F8F9FA] font-bold text-[16px] drop-shadow-md pointer-events-none">DigiLocker</span>
             </div>
             <div className="rounded-[16px] aspect-[1.45/1] shadow-lg active:scale-[0.98] transition-transform relative overflow-hidden cursor-pointer border border-white/10">
               <img src="https://satinux-vercel.vercel.app/assets/home-satin/images/image10_645_1089.png" className="w-full h-full object-cover" alt="Private Folder" />
               <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent pointer-events-none"></div>
               <span className="absolute bottom-3 left-4 text-[#F8F9FA] font-bold text-[16px] drop-shadow-md pointer-events-none leading-tight block">Private Folder</span>
             </div>
          </div>
        </section>

        <FileSection title="ID" items={fileSections.id} width="w-[88px]" aspect="aspect-square" />
        <FileSection title="Bills" items={fileSections.bills} width="w-[88px]" aspect="aspect-square" />
        <FileSection title="UPI transaction" items={fileSections.upi} width="w-[88px]" aspect="aspect-square" />
        <FileSection title="Insurance" items={fileSections.insurance} width="w-[88px]" aspect="aspect-square" />
        <FileSection title="Warranty cards" items={fileSections.warranty} width="w-[125px]" aspect="aspect-[4/3]" />
        <FileSection title="Audio" items={fileSections.audio} isAudio={true} width="w-[88px]" aspect="aspect-square" />

      </main>
    </div>
  );

  return (
    <div className="min-h-screen bg-black sm:bg-neutral-900 flex items-center justify-center sm:p-4">
      <style>{`
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      {cameraFlash && <div className="fixed inset-0 z-[999] bg-[#FFF8E7] opacity-80 animate-in fade-in fade-out duration-300 pointer-events-none"></div>}

      <div className="w-full h-[100dvh] sm:h-[850px] sm:max-h-[92vh] sm:max-w-[414px] bg-gradient-to-b from-[#2a0813] via-[#120407] to-black sm:rounded-[3rem] sm:border-[10px] sm:border-black relative overflow-hidden sm:shadow-[0_0_50px_rgba(0,0,0,0.5)] flex flex-col text-white font-sans">

        {/* Global App Toast */}
        <div className={`absolute top-10 left-1/2 -translate-x-1/2 px-4 py-3 bg-white/95 backdrop-blur-md text-black rounded-2xl font-bold text-[13px] z-[1000] shadow-2xl flex items-center gap-3 transition-all duration-400 border border-white/20 ${appToast.show ? 'translate-y-0 opacity-100 scale-100' : '-translate-y-10 opacity-0 scale-95 pointer-events-none'}`}>
          <span className="w-6 h-6 bg-[#25D366] text-white rounded-full flex items-center justify-center text-sm shadow-md"><Check size={14} strokeWidth={3} /></span>
          <span>{appToast.msg}</span>
        </div>

        <div className="flex-1 overflow-hidden relative flex flex-col">

          {currentView === 'main' && (
            <div ref={mainScrollRef} onScroll={handleMainScroll} className="flex-1 overflow-y-auto hide-scrollbar pb-28 relative">

              <header className="px-4 pt-10 pb-4">
                <div className="flex justify-between items-center mb-5">
                  <h1 className="text-[16px] font-normal tracking-wide text-white">
                    {t.greeting} <span className="font-bold">Seema</span>
                  </h1>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setAppLanguage(prev => prev === 'en' ? 'hi' : 'en')}
                      className="px-3 py-1.5 text-[11px] font-bold border border-white/20 rounded-full text-white bg-white/10 active:scale-95 transition-all uppercase flex items-center gap-1"
                    >
                      {appLanguage === 'en' ? 'A/अ' : 'अ/A'}
                    </button>
                    <div className="w-9 h-9 rounded-full overflow-hidden border border-white/20 shadow-sm">
                      <FallbackImage src={ASSETS.profile} alt="Profile" className="w-full h-full object-cover" />
                    </div>
                  </div>
                </div>

                <div className="bg-[#511323] rounded-full flex items-center px-4 py-3 border border-[#7a1c34]/40 shadow-inner">
                  <Search className="text-white/70 w-[18px] h-[18px] mr-3 shrink-0" />
                  <input
                    type="text"
                    placeholder={t.searchPlaceholder}
                    className="bg-transparent border-none outline-none flex-1 text-white placeholder-white/80 text-[14px]"
                  />
                  <Mic className="text-white w-[18px] h-[18px] ml-3 shrink-0" />
                </div>
              </header>

              <main className="space-y-7 pt-1">

                <section className="px-4 relative group">
                  <div className="relative rounded-3xl overflow-hidden shadow-2xl h-[230px] border border-white/10">
                    <div ref={heroRef} className="overflow-hidden w-full h-full">
                      <div className="flex w-full h-full">
                        {dynamicHeroSlides.map((slide, i) => (
                          <div key={i} className="flex-[0_0_100%] min-w-0 relative w-full h-full">
                            <FallbackImage src={slide.src} alt={slide.title} className="w-full h-full object-cover" />
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="absolute bottom-3 left-3 right-3 pointer-events-none">
                      <motion.div
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setActiveSheet("hero")}
                        className="bg-[#a62b46] backdrop-blur-md rounded-2xl px-4 py-3 flex justify-between items-center border border-white/10 shadow-lg pointer-events-auto cursor-pointer"
                      >
                        <div>
                          <h2 className="text-[13.5px] font-bold text-white mb-0.5 tracking-tight">{dynamicHeroSlides[heroIndex]?.title || t.heroTitle}</h2>
                          <p className="text-white/80 text-[11px] font-medium">{dynamicHeroSlides[heroIndex]?.count || t.heroCount}</p>
                        </div>
                        <div className="w-6 h-6 flex items-center justify-center shrink-0">
                          <ChevronRight className="w-[18px] h-[18px] text-white" strokeWidth={3} />
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </section>

                <section>
                  <div className="overflow-x-auto hide-scrollbar snap-x snap-mandatory scroll-pl-4">
                    <div className="flex gap-3 px-4 pb-2 w-max after:content-[''] after:w-1 after:shrink-0">
                      <QuickCard className="snap-start" img={ASSETS.holi_wishes} text={t.sendHoliWishes} onClick={() => handleQuickAction('holi', t.sendHoliWishes, ASSETS.holi_wishes, ASSETS.holi_wishes)} />
                      <QuickCard className="snap-start" img={ASSETS.remove_blur} text={t.removeBlur} onClick={() => handleQuickAction('unblur', t.removeBlur, ASSETS.remove_blur, 'https://satinux-vercel.vercel.app/assets/home-satin/images/Unblur_Full.png')} />
                      <QuickCard className="snap-start" img={ASSETS.indian_avatar} text={t.indianAvatar} onClick={() => handleQuickAction('avatar', t.indianAvatar, ASSETS.indian_avatar, 'https://satinux-vercel.vercel.app/assets/home-satin/images/emperor.png')} />
                    </div>
                  </div>
                </section>

                <section className="px-4">
                  <h2 className="text-[#ffcb57] text-[22px] font-extrabold text-center mb-4 flex items-center justify-center gap-1.5 tracking-tight">
                    {t.aiMagicForYou} <span className="text-xl leading-none">💖</span>
                  </h2>

                  <div className="flex gap-2.5 h-[270px]">
                    <motion.div whileTap={{ scale: 0.97 }} onClick={() => { setFullscreenImage(ASSETS.mamta_amit); setCurrentView('fullscreen-view'); }} className="flex-[1.1] relative rounded-[20px] overflow-hidden cursor-pointer shadow-lg border border-white/10">
                      <FallbackImage src={ASSETS.mamta_amit} className="w-full h-full object-cover" alt={t.mamtaAmit} />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none"></div>
                      <div className="absolute bottom-3 left-3 text-[12px] font-bold pointer-events-none drop-shadow-md">{t.mamtaAmit}</div>
                    </motion.div>

                    <div className="flex-1 flex flex-col gap-2.5">
                      <motion.div whileTap={{ scale: 0.95 }} onClick={() => handleVideoOpen('shivratri')} className="flex-[1.2] relative rounded-[20px] overflow-hidden cursor-pointer shadow-lg border border-white/10">
                        <FallbackImage src={ASSETS.shivratri} className="w-full h-full object-cover" alt="Shivratri" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end justify-between p-2.5 pointer-events-none">
                          <span className="text-[10px] leading-tight font-bold drop-shadow-md pr-2">{t.shivratriReady}</span>
                          <div className="bg-white rounded-full p-1.5 shadow-md shrink-0">
                            <Play className="w-[10px] h-[10px] text-black fill-black" />
                          </div>
                        </div>
                      </motion.div>

                      <div className="flex-1 flex gap-2.5">
                        <motion.div whileTap={{ scale: 0.94 }} onClick={() => handleMemoryOpen('recap2025')} className="flex-1 relative rounded-[16px] overflow-hidden cursor-pointer shadow-lg border border-white/10">
                          <FallbackImage src={ASSETS.year_2025} className="w-full h-full object-cover" alt="2025" />
                          <div className="absolute inset-0 flex items-center justify-center bg-black/20 pointer-events-none">
                            <span className="text-[22px] font-black drop-shadow-lg text-white">{t.recap2025}</span>
                          </div>
                        </motion.div>
                        <motion.div whileTap={{ scale: 0.94 }} onClick={() => handleMemoryOpen('seemaYears')} className="flex-1 relative rounded-[16px] overflow-hidden cursor-pointer shadow-lg border border-white/10 bg-[#7ba9c2]">
                          <FallbackImage src={ASSETS.seema_years} className="w-full h-full object-cover opacity-90 mix-blend-overlay" alt="Seema" />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-2 pb-2.5 text-center pointer-events-none">
                            <span className="text-[9px] font-bold leading-tight w-full drop-shadow-md">{t.seemaYears}</span>
                          </div>
                        </motion.div>
                      </div>
                    </div>
                  </div>
                </section>

                <section className="px-4">
                  <h2 className="text-[#ffcb57] text-[22px] font-extrabold text-center mb-4 flex items-center justify-center gap-1.5 tracking-tight">
                    {t.startCreating}
                  </h2>

                  <div className="grid grid-cols-2 gap-3">
                    <CreateCard img="https://satinux-vercel.vercel.app/assets/home-satin/images/photo-to-video.png" label={t.photoToVideo} onClick={() => setActiveSheet("video")} videoSrc="https://satinux-vercel.vercel.app/assets/home-satin/images/photo-video.mp4" />
                    <CreateCard img={ASSETS.bridal_look} label={t.bridalLook} onClick={() => setCurrentView('magic-studio')} />

                    <CreateCard img={ASSETS.change_bg} label={t.changeBg} onClick={() => setCurrentView('magic-studio')} />
                    <CreateCard img={ASSETS.create_collage} label={t.createCollage} onClick={() => setActiveSheet("collage")} />

                    <CreateCard img={ASSETS.touchup_photos} label={t.touchupPhotos} onClick={() => setCurrentView('magic-studio')} />
                    <CreateCard img={ASSETS.whatsapp_status} label={t.whatsappStatus} imgClass="object-top" onClick={() => handleQuickAction('status', t.whatsappStatus, ASSETS.whatsapp_status, 'https://satinux-vercel.vercel.app/assets/home-satin/images/Vivaah.mp4')} />
                  </div>
                </section>

                <section>
                  <div className="overflow-x-auto hide-scrollbar snap-x snap-mandatory scroll-pl-4">
                    <div className="flex gap-2.5 px-4 pb-2 w-max after:content-[''] after:w-1 after:shrink-0">
                      <ActionChip className="snap-start" text={t.freeUpGB} color="bg-[#ff902b] text-black" onClick={() => {}} />
                      <ActionChip className="snap-start" text={t.printWithPrinto} color="bg-[#ff3062] text-white" onClick={() => {}} />
                      <ActionChip className="snap-start" text={t.toolsHub} color="bg-[#e6cf2e] text-black" onClick={() => setCurrentView('files')} />
                      <ActionChip className="snap-start" text={t.statusMaker} color="bg-[#33e88b] text-black" onClick={() => setCurrentView('status-maker')} />
                    </div>
                  </div>
                </section>

                <section>
                  <div className="overflow-x-auto hide-scrollbar snap-x snap-mandatory scroll-pl-4">
                    <div className="flex gap-3 px-4 pb-4 pt-1 w-max after:content-[''] after:w-1 after:shrink-0">
                      <TemplateCard className="snap-start" img={ASSETS.template_explore} buttonText={t.useEffect} onClick={() => setCurrentView('magic-studio')} />
                      <TemplateCard className="snap-start" img={ASSETS.template_cricket} buttonText={t.useEffect} onClick={() => setCurrentView('magic-studio')} />
                      <TemplateCard className="snap-start" img={ASSETS.template_ghibli} buttonText={t.useEffect} onClick={() => setActiveSheet("ghibli")} />
                      <TemplateCard className="snap-start" img={ASSETS.template_suit} buttonText={t.useEffect} onClick={() => setCurrentView('magic-studio')} />
                    </div>
                  </div>
                </section>

                <section className="px-4 pb-10">
                  <div className="bg-[#68191C] rounded-[24px] p-6 text-center shadow-lg relative overflow-hidden">
                     <h3 className="text-[#FFD057] text-[24px] font-black leading-tight">{t.createVideoTitle}</h3>
                     <p className="text-[#FFD057] text-[15px] font-medium mb-6">{t.inJustOneClick}</p>

                     <div className="flex flex-wrap justify-center gap-2.5">
                        {dynamicVideoTags.map((tag, i) => (
                          <Tag key={i} text={tag.label} avatar={tag.avatar} onClick={() => setActiveSheet("video")} />
                        ))}
                     </div>
                  </div>
                </section>

              </main>
            </div>
          )}

          {currentView === 'photos' && renderPhotosView()}
          {currentView === 'files' && renderFilesView()}
          {currentView === 'status-maker' && <BharatStatusModule onClose={goBackToMain} />}

          {currentView === 'quick-action' && renderQuickActionView()}
          {currentView === 'fullscreen-view' && <FullscreenImageView image={fullscreenImage} onClose={goBackToMain} onToast={triggerAppToast} />}
          {currentView === 'memory-player' && <MemoryView activeMemory={activeMemory} setActiveMemory={setActiveMemory} onClose={goBackToMain} onToast={triggerAppToast} />}
          {currentView === 'video-player' && <VideoPlayerView videoData={activeVideoData} onClose={goBackToMain} onToast={triggerAppToast} />}

          {currentView === 'magic-studio' && renderMagicTab()}
          {currentView === 'camera' && renderCameraView()}
          {currentView === 'camera-review' && renderReviewView()}
          {currentView === 'gallery-picker' && renderGalleryPicker()}
          {currentView === 'unblur' && renderSliderToolView(t.fixFocus, selectedPhoto?.before, selectedPhoto?.after, t.unblur, "unblur")}
          {currentView === 'erase' && renderSliderToolView(t.removeObjects, selectedPhoto?.before, selectedPhoto?.after, t.remove, "erase")}
          {currentView === 'enhance' && renderSliderToolView(t.enhancePhoto, selectedPhoto?.before, selectedPhoto?.after, t.enhance, "enhance")}
          {currentView === 'avatar' && renderSliderToolView(t.avatar, selectedPhoto?.before, selectedPhoto?.after, t.create, "avatar")}
          {currentView === 'frame' && renderSliderToolView(t.frame, selectedPhoto?.before, selectedPhoto?.after, t.apply, "frame")}
          {currentView === 'bg' && renderSliderToolView(t.teleport, selectedPhoto?.before, selectedPhoto?.after, t.teleport, "bg")}

        </div>

        {currentView === 'main' && (
          <div className="absolute bottom-6 w-full px-4 flex justify-between items-center z-50 pointer-events-none">
            <div className="bg-[#ffcb57] rounded-[26px] h-[52px] px-5 flex items-center justify-between gap-6 shadow-[0_8px_30px_rgba(0,0,0,0.4)] pointer-events-auto border border-orange-300/20">
              <NavButton active={currentView === 'main'} onClick={() => { setActiveNav(0); setCurrentView('main'); }}>
                <Home className="w-5 h-5" />
                <span className="text-[10px] font-bold mt-0.5">{t.home}</span>
              </NavButton>
              <NavButton active={currentView === 'photos'} onClick={() => { setActiveNav(1); setCurrentView('photos'); }}>
                <ImageIcon className="w-5 h-5" />
                <span className="text-[10px] font-bold mt-0.5">{t.photos}</span>
              </NavButton>
              <NavButton active={currentView === 'files'} onClick={() => { setActiveNav(2); setCurrentView('files'); }}>
                <FileText className="w-5 h-5" />
                <span className="text-[10px] font-bold mt-0.5">{t.files}</span>
              </NavButton>
            </div>

            <div className="flex gap-2.5 pointer-events-auto">
              <motion.button whileTap={{ scale: 0.9 }} onClick={() => setActiveSheet("upload")} className="w-[52px] h-[52px] bg-[#ffcb57] rounded-full flex justify-center items-center shadow-[0_8px_30px_rgba(0,0,0,0.4)] hover:brightness-105 transition-all">
                <Plus className="w-6 h-6 text-black" strokeWidth={3} />
              </motion.button>
              <motion.button whileTap={{ scale: 0.9 }} onClick={() => setCurrentView("camera")} className="w-[52px] h-[52px] bg-[#ff2975] rounded-full flex justify-center items-center shadow-[0_8px_30px_rgba(0,0,0,0.4)] hover:brightness-105 transition-all">
                <Camera className="w-5 h-5 text-white" strokeWidth={2.5} />
              </motion.button>
            </div>
          </div>
        )}

        {/* BOTTOM SHEETS */}
        <BottomSheet isOpen={activeSheet === "upload"} onClose={() => setActiveSheet(null)} hideHeader customBg="bg-[#333333]">
          <div className="flex flex-col py-2 px-1">
            <UploadMenuItem
              icon={<ImageIcon size={22} fill="currentColor" className="text-[#ffcb57]" />}
              label={t.uploadGallery}
              onClick={() => setActiveSheet(null)}
            />
            <div className="h-px bg-white/10 mx-2 my-1"></div>
            <UploadMenuItem
              icon={<Scan size={22} className="text-[#ffcb57]" strokeWidth={2.5} />}
              label={t.scan}
              onClick={() => { setActiveSheet(null); setCurrentView('camera'); }}
            />
            <div className="h-px bg-white/10 mx-2 my-1"></div>
            <UploadMenuItem
              icon={<PenTool size={20} fill="currentColor" className="text-[#ffcb57]" />}
              label={t.createWhatsappStatus}
              onClick={() => { setActiveSheet(null); setCurrentView("status-maker"); }}
            />
            <div className="h-px bg-white/10 mx-2 my-1"></div>
            <UploadMenuItem
              icon={<Sparkles size={22} fill="currentColor" className="text-[#ffcb57]" />}
              label={t.useAiMagic}
              onClick={() => { setActiveSheet(null); setCurrentView('magic-studio'); }}
            />
          </div>
        </BottomSheet>

        <BottomSheet isOpen={activeSheet === "hero"} onClose={() => setActiveSheet(null)} title={t.jaipurShaadi}>
          <div className="grid grid-cols-3 gap-2">
            {[ASSETS.holi_wishes, ASSETS.whatsapp_status, ASSETS.mamta_amit, ASSETS.hero, ASSETS.year_2025, ASSETS.shivratri].map((src, i) => (
              <div key={i} className="aspect-square rounded-lg overflow-hidden border border-white/10">
                <FallbackImage src={src} alt="" className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
          <p className="text-white/60 text-xs text-center mt-5">{t.photosReady}</p>
        </BottomSheet>

        <BottomSheet isOpen={activeSheet === "wish"} onClose={() => setActiveSheet(null)} title={t.sendWishes}>
          <div className="flex flex-col items-center gap-4 py-2">
            <div className="w-32 h-32 rounded-2xl overflow-hidden border border-white/10 shadow-xl">
              <FallbackImage src={ASSETS.holi_wishes} alt="" className="w-full h-full object-cover" />
            </div>
            <p className="text-white/80 text-sm text-center">{t.createWishCards}</p>
            <motion.button whileTap={{ scale: 0.95 }} className="bg-[#ffcb57] text-black font-bold text-sm px-8 py-3 rounded-full mt-2">
              {t.createWish}
            </motion.button>
          </div>
        </BottomSheet>

        <BottomSheet isOpen={activeSheet === "video"} onClose={() => setActiveSheet(null)} title={t.createVideo}>
          <div className="flex flex-col items-center gap-4 py-2">
            <p className="text-white/80 text-sm text-center">{t.chooseTheme}</p>
            <div className="flex flex-wrap gap-2 justify-center">
              {[t.tags.birthday, t.tags.wedding, "Travel", "Celebration", "Anniversary"].map((themeTxt) => (
                <motion.button key={themeTxt} whileTap={{ scale: 0.93 }} className="bg-white/10 text-white text-xs px-4 py-2 rounded-full border border-white/10">
                  {themeTxt}
                </motion.button>
              ))}
            </div>
            <motion.button whileTap={{ scale: 0.95 }} className="bg-[#ffcb57] text-black font-bold text-sm px-8 py-3 rounded-full mt-4">
              {t.startCreatingBtn}
            </motion.button>
          </div>
        </BottomSheet>

        <BottomSheet isOpen={!!activeSheet && !["hero", "wish", "enhance", "video", "aimagic", "upload", "aicamera", "ghibli", "collage"].includes(activeSheet)} onClose={() => setActiveSheet(null)} title={t.comingSoon}>
           <div className="py-10 flex flex-col items-center justify-center">
             <span className="text-4xl mb-4">🚀</span>
             <p className="text-white/70">{t.featureDev}</p>
           </div>
        </BottomSheet>

      </div>
    </div>
  );
};

// --- Helper Components ---

const FileSection = ({ title, items, isAudio = false, aspect = "aspect-square", width = "w-[88px]" }) => (
  <section>
    <div className="px-5 flex justify-between items-end mb-3">
        <h3 className="text-[20px] font-bold text-[#F8F9FA] tracking-tight leading-none">{title}</h3>
        <span className="text-[14px] font-semibold text-[#F8F9FA] cursor-pointer hover:underline mb-0.5">View all</span>
    </div>
    <div className="overflow-x-auto hide-scrollbar snap-x snap-mandatory scroll-pl-5">
      <div className="flex gap-3 px-5 pb-2 w-max after:content-[''] after:w-1 after:shrink-0">
        {items.map((src, i) => (
          <div key={i} className={`snap-start ${width} ${aspect} rounded-[12px] overflow-hidden shrink-0 bg-[#1c1c1c] shadow-sm cursor-pointer active:scale-95 transition-transform relative border border-white/10`}>
             <FallbackImage src={src} alt={title} className="w-full h-full object-cover" fallbackText={title} />
             {isAudio && (
               <div className="absolute bottom-1.5 left-1.5 w-6 h-6 bg-white/90 rounded-full flex items-center justify-center shadow-md">
                  <Play className="w-3 h-3 text-black fill-black ml-0.5" />
               </div>
             )}
          </div>
        ))}
      </div>
    </div>
  </section>
);

const UploadMenuItem = ({ icon, label, onClick }) => (
  <motion.button whileTap={{ scale: 0.98 }} onClick={onClick} className="flex items-center gap-5 p-4 rounded-xl w-full text-left transition-colors">
    <div className="w-[42px] h-[42px] rounded-full bg-[#4a4a4c] flex items-center justify-center shadow-md shrink-0">
      {icon}
    </div>
    <span className="text-white text-[17px] font-bold">{label}</span>
  </motion.button>
);

const QuickCard = ({ img, text, onClick, className = "" }) => (
  <motion.button whileTap={{ scale: 0.95 }} onClick={onClick} className={`w-[125px] h-[180px] rounded-[22px] relative overflow-hidden flex-shrink-0 shadow-lg border border-white/10 ${className}`}>
    <FallbackImage src={img} alt={text} className="w-full h-full object-cover" />
    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent flex items-end p-3 pointer-events-none">
      <span className="text-[13px] font-bold leading-tight text-left drop-shadow-md">{text}</span>
    </div>
  </motion.button>
);

const CreateCard = ({ img, label, onClick, imgClass = "", videoSrc }) => {
  const containerRef = useRef(null);
  const videoRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [shouldPlay, setShouldPlay] = useState(false);
  const [isVideoVisible, setIsVideoVisible] = useState(false);

  useEffect(() => {
    if (!videoSrc || !containerRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.6 }
    );

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [videoSrc]);

  useEffect(() => {
    let timer;
    if (isVisible && videoSrc) {
       // Wait 3 seconds after becoming visible before switching to video
       timer = setTimeout(() => setShouldPlay(true), 3000);
    } else {
       // Reset when out of view
       setShouldPlay(false);
       setIsVideoVisible(false);
    }
    return () => clearTimeout(timer);
  }, [isVisible, videoSrc]);

  const handleVideoPlay = () => {
    setIsVideoVisible(true);
  };

  const handleVideoEnd = () => {
      // Fade out video to reveal image again
      setIsVideoVisible(false);
      // Optional: setShouldPlay(false) after a delay if you want to fully unmount video
  };

  return (
    <motion.button ref={containerRef} whileTap={{ scale: 0.97 }} onClick={onClick} className="relative rounded-[22px] overflow-hidden h-[260px] w-full shadow-lg border border-white/10 text-left bg-black group">

      {/* Background Image - Always Visible (Base Layer) */}
      <FallbackImage
        src={img}
        alt={label}
        className={`absolute inset-0 w-full h-full object-cover ${imgClass}`}
      />

      {/* Video - Overlays Image (Fade In Layer) */}
      {shouldPlay && videoSrc && (
        <video
          ref={videoRef}
          src={videoSrc}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${isVideoVisible ? 'opacity-100' : 'opacity-0'} ${imgClass}`}
          autoPlay
          muted
          playsInline
          onPlay={handleVideoPlay}
          onEnded={handleVideoEnd}
        />
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end items-center pb-3.5 pointer-events-none z-10">
        <div className="bg-black text-white text-[12px] font-bold px-4 py-2 rounded-full flex items-center gap-1 shadow-md">
          {label} <ChevronRight className="w-[14px] h-[14px] text-white" strokeWidth={3} />
        </div>
      </div>
    </motion.button>
  );
};

const ActionChip = ({ text, color, onClick, className = "" }) => (
  <motion.button whileTap={{ scale: 0.93 }} onClick={onClick} className={`${color} flex-shrink-0 rounded-lg px-4 py-2.5 text-[12px] font-bold whitespace-nowrap shadow-md ${className}`}>
    {text}
  </motion.button>
);

const TemplateCard = ({ img, buttonText, onClick, className = "" }) => (
  <motion.button whileTap={{ scale: 0.95 }} onClick={onClick} className={`w-[130px] h-[185px] rounded-[22px] relative overflow-hidden flex-shrink-0 shadow-lg border border-white/10 ${className}`}>
    <FallbackImage src={img} alt="Template" className="w-full h-full object-cover" />
    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent flex items-end justify-center pb-3 pointer-events-none">
      <div className="bg-black/90 text-white text-[11px] font-bold px-3 py-1.5 rounded-full flex items-center gap-1 shadow-md">
        {buttonText}<ChevronRight className="w-3 h-3 text-white" strokeWidth={3} />
      </div>
    </div>
  </motion.button>
);

const Tag = ({ text, avatar, onClick }) => (
  <motion.button whileTap={{ scale: 0.93 }} onClick={onClick} className="bg-white text-black rounded-full px-4 py-2 text-[13px] font-bold flex items-center gap-2 shadow-sm">
    {avatar && <FallbackImage src={avatar} alt={text} className="w-5 h-5 rounded-full object-cover" />}
    {text}
  </motion.button>
);

function NavButton({ active, onClick, children }) {
  return (
    <motion.button
      whileTap={{ scale: 0.85 }}
      className="relative flex flex-col items-center justify-center pt-1"
      onClick={onClick}
    >
      <div className={`transition-colors flex flex-col items-center ${active ? "text-black" : "text-black/60"}`}>
        {children}
      </div>
    </motion.button>
  );
}

function BottomSheet({ isOpen, onClose, title, customBg, hideHeader, children }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/70 z-[100] sm:rounded-[2.5rem] backdrop-blur-sm"
          />
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className={`absolute bottom-0 left-0 right-0 ${customBg || 'bg-[#16080c]'} rounded-t-[2rem] sm:rounded-b-[2.5rem] z-[101] max-h-[80vh] flex flex-col ${!customBg && 'border border-white/10'} shadow-2xl`}
          >
            {!hideHeader && (
              <div className="p-5 border-b border-white/5 flex justify-between items-center shrink-0">
                <h3 className="text-white font-bold text-lg">{title}</h3>
                <button onClick={onClose} className="p-2 bg-white/10 rounded-full active:scale-90 transition-transform">
                  <X size={20} className="text-white"/>
                </button>
              </div>
            )}
            <div className={`p-5 overflow-y-auto hide-scrollbar ${hideHeader ? 'pt-8 pb-10' : ''}`}>
              {children}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export default App;
