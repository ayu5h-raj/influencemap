"use client";

import { motion, useReducedMotion } from "framer-motion";

interface GraphNode {
  id: string;
  label: string;
  sublabel?: string;
  x: number;
  y: number;
  type: "brand" | "competitor" | "influencer";
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
  // Your brand (left)
  {
    id: "brand",
    label: "Your Brand",
    x: 60,
    y: 250,
    type: "brand",
    color: "#E24B4A",
  },
  // Competitor nodes (middle)
  {
    id: "dell",
    label: "Dell",
    x: 280,
    y: 120,
    type: "competitor",
  },
  {
    id: "apple",
    label: "Apple",
    x: 280,
    y: 380,
    type: "competitor",
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
      {/* Building icon */}
      <g transform={`translate(${node.x - 10}, ${node.y - 10})`}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={node.color} strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
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

function CompetitorNode({ node, delay }: { node: GraphNode; delay: number }) {
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
      <circle
        cx={node.x}
        cy={node.y}
        r="24"
        fill="#141417"
        stroke="rgba(255,255,255,0.12)"
        strokeWidth="1.5"
      />
      {/* People/network icon */}
      <g transform={`translate(${node.x - 9}, ${node.y - 9})`}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#A0A09A" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
        </svg>
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
          if (node.type === "competitor") {
            return (
              <CompetitorNode
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
