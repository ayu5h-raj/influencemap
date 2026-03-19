export type Platform = "YouTube" | "Instagram" | "TikTok" | "X";

export const platformColors: Record<Platform, string> = {
  YouTube: "#FF0000",
  Instagram: "#E4405F",
  TikTok: "#00F2EA",
  X: "#1DA1F2",
};

export interface Influencer {
  name: string;
  handle: string;
  initials: string;
  avatarColor: string;
  followers: string;
  platforms: Platform[];
  engagement: string;
  score: number;
  pastBrands: string[];
  avgViews: string;
  rateRange: string;
  niche: string;
  recentPost: string;
}

export const influencers: Influencer[] = [
  {
    name: "Arun Maini",
    handle: "@Mrwhosetheboss",
    initials: "AM",
    avatarColor: "#6366F1",
    followers: "19.2M",
    platforms: ["YouTube", "Instagram"],
    engagement: "5.8%",
    score: 97,
    pastBrands: ["Samsung", "OnePlus", "Nothing", "Qualcomm"],
    avgViews: "3.2M",
    rateRange: "$25K–$50K",
    niche: "Consumer Tech",
    recentPost: "Is the Galaxy S25 Ultra Worth It?",
  },
  {
    name: "Gaurav Chaudhary",
    handle: "@TechnicalGuruji",
    initials: "GC",
    avatarColor: "#F59E0B",
    followers: "23.8M",
    platforms: ["YouTube", "Instagram"],
    engagement: "3.2%",
    score: 94,
    pastBrands: ["HP", "Dell", "Asus", "Xiaomi"],
    avgViews: "1.8M",
    rateRange: "$15K–$35K",
    niche: "Tech Reviews (Hindi)",
    recentPost: "HP Spectre x360 — Best Laptop of 2026?",
  },
  {
    name: "iJustine",
    handle: "@iJustine",
    initials: "iJ",
    avatarColor: "#EC4899",
    followers: "7.1M",
    platforms: ["YouTube", "TikTok", "Instagram"],
    engagement: "4.5%",
    score: 91,
    pastBrands: ["Apple", "Intel", "Razer", "Adobe"],
    avgViews: "1.1M",
    rateRange: "$20K–$45K",
    niche: "Lifestyle Tech",
    recentPost: "My Entire Apple Setup Tour",
  },
  {
    name: "Dave Lee",
    handle: "@Dave2D",
    initials: "DL",
    avatarColor: "#10B981",
    followers: "4.2M",
    platforms: ["YouTube"],
    engagement: "6.1%",
    score: 89,
    pastBrands: ["LG", "Framework", "dbrand", "Anker"],
    avgViews: "2.4M",
    rateRange: "$18K–$40K",
    niche: "Premium Tech",
    recentPost: "Framework Laptop 16 — 6 Months Later",
  },
  {
    name: "Trakin Tech",
    handle: "@TrakinTech",
    initials: "TT",
    avatarColor: "#8B5CF6",
    followers: "12.5M",
    platforms: ["YouTube", "Instagram"],
    engagement: "3.9%",
    score: 86,
    pastBrands: ["Realme", "ASUS", "Boat", "Samsung"],
    avgViews: "1.5M",
    rateRange: "$10K–$25K",
    niche: "Budget Tech (Hindi)",
    recentPost: "ASUS ROG Phone — Gaming Beast?",
  },
];

export const categories = ["Laptops", "Smartphones", "Gaming", "Audio", "Wearables"];

export const crawledBrands = ["Dell", "HP", "ASUS", "Acer", "Apple", "Samsung"];

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
  {
    name: "TikTok",
    platform: "TikTok",
    color: "#00F2EA",
    detections: [
      "Branded content toggles",
      "Hashtag sponsorships",
      "Duet collabs",
      "Creator marketplace posts",
    ],
  },
  {
    name: "X / Twitter",
    platform: "X",
    color: "#1DA1F2",
    detections: [
      "Sponsored tweets",
      "Brand ambassador threads",
      "Product launch tweets",
    ],
  },
];

export const metrics = [
  { value: 4000000, suffix: "+", label: "Influencer profiles indexed", display: "4M" },
  { value: 50000, suffix: "+", label: "Brand deals tracked", display: "50K" },
  { value: 200, suffix: "+", label: "Product categories", display: "200" },
  { value: 15, suffix: "s", label: "Average search time", display: "15" },
];

export const useCases = [
  {
    title: "Brand marketing teams",
    description:
      "Find creators who've proven they can sell products in your category. No more guessing based on follower counts alone.",
  },
  {
    title: "Agencies",
    description:
      "Manage influencer discovery across multiple clients and categories. One search, every platform.",
  },
  {
    title: "D2C startups",
    description:
      "Compete with big brands by finding the same influencers — or discovering hidden gems they missed.",
  },
];
