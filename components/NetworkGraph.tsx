"use client";

import { motion, useReducedMotion } from "framer-motion";

interface GraphNode {
  id: string;
  label: string;
  sublabel?: string;
  x: number;
  y: number;
  type: "brand" | "category" | "influencer";
  image?: string;
  color?: string;
  platformColor?: string;
  platform?: string;
}

interface GraphEdge {
  from: string;
  to: string;
}

const nodes: GraphNode[] = [
  // Your search (left)
  {
    id: "brand",
    label: "Your Search",
    x: 60,
    y: 250,
    type: "brand",
    color: "#E24B4A",
  },
  // Category nodes (middle)
  {
    id: "dell",
    label: "Tech",
    x: 280,
    y: 120,
    type: "category",
  },
  {
    id: "apple",
    label: "Lifestyle",
    x: 280,
    y: 380,
    type: "category",
  },
  // Influencer nodes (right)
  {
    id: "arun",
    label: "Arun Maini",
    sublabel: "19.2M",
    x: 520,
    y: 55,
    type: "influencer",
    image: "/avatars/mrwhosetheboss.jpg",
    platformColor: "#FF0000",
    platform: "YouTube",
  },
  {
    id: "gaurav",
    label: "Gaurav C.",
    sublabel: "23.8M",
    x: 520,
    y: 185,
    type: "influencer",
    image: "/avatars/technicalguruji.jpg",
    platformColor: "#FF0000",
    platform: "YouTube",
  },
  {
    id: "ijustine",
    label: "iJustine",
    sublabel: "7.1M",
    x: 520,
    y: 315,
    type: "influencer",
    image: "/avatars/ijustine.jpg",
    platformColor: "#E4405F",
    platform: "Instagram",
  },
  {
    id: "dave",
    label: "Dave Lee",
    sublabel: "4.2M",
    x: 520,
    y: 445,
    type: "influencer",
    image: "/avatars/dave2d.jpg",
    platformColor: "#FF0000",
    platform: "YouTube",
  },
];

const edges: GraphEdge[] = [
  { from: "brand", to: "dell" },
  { from: "brand", to: "apple" },
  { from: "dell", to: "arun" },
  { from: "dell", to: "gaurav" },
  { from: "apple", to: "ijustine" },
  { from: "apple", to: "dave" },
];

function getNode(id: string) {
  return nodes.find((n) => n.id === id)!;
}

function EdgeLine({ edge, index }: { edge: GraphEdge; index: number }) {
  const from = getNode(edge.from);
  const to = getNode(edge.to);
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.line
      x1={from.x}
      y1={from.y}
      x2={to.x}
      y2={to.y}
      stroke="url(#edgeGradient)"
      strokeWidth="1.5"
      strokeLinecap="round"
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ pathLength: 1, opacity: 1 }}
      transition={
        prefersReducedMotion
          ? { duration: 0 }
          : { duration: 0.8, delay: 0.3 + index * 0.1, ease: "easeOut" }
      }
    />
  );
}

function BrandNode({ node, delay }: { node: GraphNode; delay: number }) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.g
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={
        prefersReducedMotion
          ? { duration: 0 }
          : { duration: 0.5, delay, ease: "easeOut" }
      }
    >
      {/* Pulsing glow */}
      <motion.circle
        cx={node.x}
        cy={node.y}
        r="32"
        fill="none"
        stroke={node.color}
        strokeWidth="1"
        opacity="0.3"
        animate={prefersReducedMotion ? undefined : { r: [32, 38, 32], opacity: [0.3, 0.1, 0.3] }}
        transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
      />
      <circle
        cx={node.x}
        cy={node.y}
        r="28"
        fill="#141417"
        stroke={node.color}
        strokeWidth="2"
      />
      {/* Search/AI icon */}
      <g transform={`translate(${node.x - 10}, ${node.y - 10})`}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={node.color} strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
        </svg>
      </g>
      <text
        x={node.x}
        y={node.y + 48}
        textAnchor="middle"
        className="fill-text-primary text-xs font-medium"
        style={{ fontSize: "11px" }}
      >
        {node.label}
      </text>
    </motion.g>
  );
}

const categoryIcons: Record<string, React.ReactNode> = {
  // Tech category — chip/cpu icon
  dell: (
    <g>
      <circle cx="0" cy="0" r="24" fill="#141417" stroke="rgba(255,255,255,0.12)" strokeWidth="1.5" />
      <g transform="translate(-9, -9)">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#A0A09A" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 19.5V21M12 3v1.5m0 15V21m3.75-18v1.5m0 15V21m-9-1.5h10.5a2.25 2.25 0 002.25-2.25V6.75a2.25 2.25 0 00-2.25-2.25H6.75A2.25 2.25 0 004.5 6.75v10.5a2.25 2.25 0 002.25 2.25zm3-10.5h4.5v4.5h-4.5V9z" />
        </svg>
      </g>
    </g>
  ),
  // Lifestyle category — sparkles icon
  apple: (
    <g>
      <circle cx="0" cy="0" r="24" fill="#141417" stroke="rgba(255,255,255,0.12)" strokeWidth="1.5" />
      <g transform="translate(-9, -9)">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#A0A09A" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
        </svg>
      </g>
    </g>
  ),
};

function CategoryNode({ node, delay }: { node: GraphNode; delay: number }) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.g
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={
        prefersReducedMotion
          ? { duration: 0 }
          : { duration: 0.5, delay, ease: "easeOut" }
      }
    >
      <g transform={`translate(${node.x}, ${node.y})`}>
        {categoryIcons[node.id] || categoryIcons.dell}
      </g>
      <text
        x={node.x}
        y={node.y + 40}
        textAnchor="middle"
        className="fill-text-secondary text-xs"
        style={{ fontSize: "11px" }}
      >
        {node.label}
      </text>
    </motion.g>
  );
}

function InfluencerNode({ node, delay }: { node: GraphNode; delay: number }) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.g
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={
        prefersReducedMotion
          ? { duration: 0 }
          : { duration: 0.5, delay, ease: "easeOut" }
      }
    >
      {/* Avatar circle with clip */}
      <defs>
        <clipPath id={`clip-${node.id}`}>
          <circle cx={node.x} cy={node.y} r="22" />
        </clipPath>
      </defs>
      <circle
        cx={node.x}
        cy={node.y}
        r="23"
        fill="none"
        stroke="rgba(255,255,255,0.1)"
        strokeWidth="1.5"
      />
      <image
        href={node.image}
        x={node.x - 22}
        y={node.y - 22}
        width="44"
        height="44"
        clipPath={`url(#clip-${node.id})`}
        preserveAspectRatio="xMidYMid slice"
      />

      {/* Platform badge */}
      <circle
        cx={node.x + 16}
        cy={node.y - 16}
        r="8"
        fill={node.platformColor}
        stroke="#141417"
        strokeWidth="2"
      />

      {/* Name + stats */}
      <text
        x={node.x + 34}
        y={node.y - 4}
        className="fill-text-primary font-medium"
        style={{ fontSize: "11px" }}
      >
        {node.label}
      </text>
      <text
        x={node.x + 34}
        y={node.y + 12}
        className="fill-text-muted"
        style={{ fontSize: "10px", fontFamily: "var(--font-space-mono)" }}
      >
        {node.sublabel} · {node.platform}
      </text>
    </motion.g>
  );
}

export default function NetworkGraph() {
  return (
    <div className="hidden lg:flex items-center justify-center w-full">
      <svg
        viewBox="0 0 650 500"
        className="w-full max-w-[580px] h-auto"
        fill="none"
      >
        <defs>
          <linearGradient id="edgeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#E24B4A" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#D4537E" stopOpacity="0.2" />
          </linearGradient>
        </defs>

        {/* Edges first (behind nodes) */}
        {edges.map((edge, i) => (
          <EdgeLine key={`${edge.from}-${edge.to}`} edge={edge} index={i} />
        ))}

        {/* Nodes */}
        {nodes.map((node) => {
          if (node.type === "brand") {
            return <BrandNode key={node.id} node={node} delay={0.1} />;
          }
          if (node.type === "category") {
            return (
              <CategoryNode
                key={node.id}
                node={node}
                delay={node.id === "dell" ? 0.5 : 0.6}
              />
            );
          }
          return (
            <InfluencerNode
              key={node.id}
              node={node}
              delay={
                node.id === "arun"
                  ? 0.8
                  : node.id === "gaurav"
                  ? 0.9
                  : node.id === "ijustine"
                  ? 1.0
                  : 1.1
              }
            />
          );
        })}
      </svg>
    </div>
  );
}
