export type Platform = "YouTube" | "Instagram";

export const platformColors: Record<Platform, string> = {
  YouTube: "#FF0000",
  Instagram: "#E4405F",
};

export interface Influencer {
  name: string;
  handle: string;
  initials: string;
  avatarColor: string;
  avatarImage: string;
  followers: string;
  platforms: Platform[];
  engagement: string;
  score: number;
  pastBrands: string[];
  avgViews: string;
  niche: string;
  recentPost: string;
}

export const influencers: Influencer[] = [
  {
    name: "Arun Maini",
    handle: "@Mrwhosetheboss",
    initials: "AM",
    avatarColor: "#6366F1",
    avatarImage: "/avatars/mrwhosetheboss.jpg",
    followers: "19.2M",
    platforms: ["YouTube", "Instagram"],
    engagement: "5.8%",
    score: 97,
    pastBrands: ["Samsung", "OnePlus", "Nothing", "Qualcomm"],
    avgViews: "3.2M",
    niche: "Consumer Tech",
    recentPost: "Is the Galaxy S25 Ultra Worth It?",
  },
  {
    name: "Gaurav Chaudhary",
    handle: "@TechnicalGuruji",
    initials: "GC",
    avatarColor: "#F59E0B",
    avatarImage: "/avatars/technicalguruji.jpg",
    followers: "23.8M",
    platforms: ["YouTube", "Instagram"],
    engagement: "3.2%",
    score: 94,
    pastBrands: ["HP", "Dell", "Asus", "Xiaomi"],
    avgViews: "1.8M",
    niche: "Tech Reviews (Hindi)",
    recentPost: "HP Spectre x360 — Best Laptop of 2026?",
  },
  {
    name: "iJustine",
    handle: "@iJustine",
    initials: "iJ",
    avatarColor: "#EC4899",
    avatarImage: "/avatars/ijustine.jpg",
    followers: "7.1M",
    platforms: ["YouTube", "Instagram"],
    engagement: "4.5%",
    score: 91,
    pastBrands: ["Apple", "Intel", "Razer", "Adobe"],
    avgViews: "1.1M",
    niche: "Lifestyle Tech",
    recentPost: "My Entire Apple Setup Tour",
  },
  {
    name: "Dave Lee",
    handle: "@Dave2D",
    initials: "DL",
    avatarColor: "#10B981",
    avatarImage: "/avatars/dave2d.jpg",
    followers: "4.2M",
    platforms: ["YouTube"],
    engagement: "6.1%",
    score: 89,
    pastBrands: ["LG", "Framework", "dbrand", "Anker"],
    avgViews: "2.4M",
    niche: "Premium Tech",
    recentPost: "Framework Laptop 16 — 6 Months Later",
  },
  {
    name: "Trakin Tech",
    handle: "@TrakinTech",
    initials: "TT",
    avatarColor: "#8B5CF6",
    avatarImage: "/avatars/trakintech.jpg",
    followers: "12.5M",
    platforms: ["YouTube", "Instagram"],
    engagement: "3.9%",
    score: 86,
    pastBrands: ["Realme", "ASUS", "Boat", "Samsung"],
    avgViews: "1.5M",
    niche: "Budget Tech (Hindi)",
    recentPost: "ASUS ROG Phone — Gaming Beast?",
  },
];

export const categories = ["Laptops", "Smartphones", "Gaming", "Audio", "Wearables"];


export const sortOptions = ["Best match", "Followers", "Engagement"] as const;

export interface PlatformCoverageItem {
  name: string;
  platform: Platform;
  color: string;
  detections: string[];
}

export const platformCoverage: PlatformCoverageItem[] = [
  {
    name: "Instagram",
    platform: "Instagram",
    color: "#E4405F",
    detections: [
      "Paid partnership labels",
      "Tagged brand posts",
      "Story mentions",
      "Collab posts",
    ],
  },
  {
    name: "YouTube",
    platform: "YouTube",
    color: "#FF0000",
    detections: [
      "Sponsored segments",
      "Description affiliate links",
      "Branded integrations",
      "Product placements",
    ],
  },
];

export const metrics = [
  { value: 4000000, suffix: "+", label: "Creator profiles analyzed", display: "4M" },
  { value: 95, suffix: "%", label: "Match accuracy rate", display: "95" },
  { value: 200, suffix: "+", label: "Niches & categories", display: "200" },
  { value: 15, suffix: "s", label: "Average time to results", display: "15" },
];

export const useCases = [
  {
    title: "Brand marketing teams",
    description:
      "Find creators who genuinely fit your brand — matched by niche, audience demographics, and engagement quality. Not just follower counts.",
  },
  {
    title: "Agencies",
    description:
      "Discover the right influencers across multiple clients and categories in seconds. One search, instant results.",
  },
  {
    title: "D2C startups",
    description:
      "Find high-impact creators in your niche without the enterprise budget. Discover hidden gems that bigger brands overlook.",
  },
];
