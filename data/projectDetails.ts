// Extended project data for case studies
export const projectDetails: Record<
    string,
    {
        problemStatement: {
            what: string;
            who: string;
            why: string;
        };
        productThinking: {
            solution: string;
            alternatives: string[];
            tradeoffs: string[];
        };
        recruiterView: {
            summary: string;
            impact: string[];
            outcome: string;
        };
        engineerView: {
            apiDesign: string;
            dbSchema: string;
            scalingApproach: string;
            bottlenecks: string[];
        };
        challenges: {
            issue: string;
            lesson: string;
        }[];
        learnings: string[];
        nextSteps: string[];
    }
> = {
    "explain-bytes": {
        problemStatement: {
            what: "Developers frequently struggle with 'search fatigue' when trying to understand technical concepts across multiple websites and AI interfaces.",
            who: "Software engineers looking for a more streamlined way to learn or refresh their technical knowledge.",
            why: "Finding the 'right' resource be it an article, video, or documentation is often a time-consuming process of trial and error."
        },
        productThinking: {
            solution:
                "Built ExplainBytes, a web application that consolidates technical knowledge from multiple sources into a single, easy-to-navigate interface with easy to memorize flashcards.",
            alternatives: [
                "Doom scrolling through search results untill you find the right resource",
                "Using AI like ChatGPT/Gemini to get your answers",
            ],
            tradeoffs: [
                "Read-through caching: Prioritized sub-millisecond read performance for technical concepts at the cost of slight initial latency during cache hydration.",
                "Local MDX vs. CMS API: Chose file-system-based MDX to eliminate network round-trips and improve SEO, accepting the complexity of static regeneration (ISR) for content updates."
            ],
        },
        recruiterView: {
            summary:
                "Led the design and implementation of ExplainBytes, a web application that consolidates technical knowledge from multiple sources into a single, easy-to-navigate interface with easy to memorize flashcards.",
            impact: [
                "Reduced time spent searching for resources by 15%",
                "Increased time spent learning by 10x",
                "Saved time spent scrolling through search results",
            ],
            outcome:
                "I didn't get paid or hoping to get one for this project but I'm happy with the outcome.",
        },
        engineerView: {
            apiDesign: `// Search endpoint with rate limiting
GET /api/v1/search?q=idempotency
Headers: { "X-RateLimit-Client-ID": "user_123" }

// Response with cached search results
{
  "results": [
    { "id": "topic_1", "title": "Understanding Idempotency", "slug": "idempotency-guide" }
  ],
  "source": "cache" | "elasticsearch",
  "latency": "15ms"
}`,
            dbSchema: `// Content served via Node.js FS module (I/O operations)
// Direct file-system mapping for sub-millisecond resolution

/content
  /docs
    [slug].mdx       <-- Unified source of truth
  /flashcards
    [slug].json      <-- Derived metadata for learning

// Server-side resolution logic
const content = await fs.readFile(
  path.join(process.cwd(), 'content/docs', \`\${slug}.mdx\`),
  'utf8'
);`,
            scalingApproach:
                "Utilizes Elasticsearch for high-performance full-text search, backed by a Redis Read-Through cache for hot queries. Documentation is rendered via MDX with Next.js ISR for sub-second page loads. Rate limiting is enforced via a Sliding Window Counter algorithm at the edge.",
            bottlenecks: [
                "Elasticsearch memory overhead during heavy indexing - mitigated with bulk processing",
                "Cold starts for infrequently accessed MDX docs - solved with pre-generation",
                "High API spam risk - implemented sliding window rate limiting",
            ],
        },
        challenges: [
            {
                issue:
                    "Maintaining separate file structures for documentation and flashcards led to data inconsistency and high maintenance overhead.",
                lesson:
                    "Architected a unified directory structure where flashcards are automatically derived from doc topics, ensuring 100% consistency between learning modules.",
            },
            {
                issue:
                    "Search latency was high even with Elasticsearch, as every request hit the primary index, causing performance bottlenecks during peak traffic.",
                lesson:
                    "Implemented a Redis-based Read-Through cache pattern to serve top-tier search terms from memory, drastically reducing response times.",
            },
            {
                issue:
                    "Frequent API calls for static resources were redundant, adding unnecessary latency to a content-heavy application.",
                lesson:
                    "Leveraged React's 'use cache' and Next.js caching layers to treat static documentation as immutable assets, achieving near-instant delivery.",
            },
        ],
        learnings: [
            "Caching patterns like 'Read-Through' are architectural requirements, not optional optimizations, for low-latency systems.",
            "High-performance MDX rendering can eliminate the need for traditional API calls for documentation, improving speed and SEO.",
            "Implemented the Sliding Window Counter algorithm for robust rate limiting to protect infra from spam and DDoS attacks.",
            "Learned that a unified data structure is critical when building multi-format educational platforms (Docs + Flashcards).",
        ],
        nextSteps: [
            "Architect the next major feature set to evolve the platform into a comprehensive, 'one-go' technical solution.",
            "Migrate from Vercel to dedicated cloud infrastructure (AWS/GCP) for granular control over servers, CDNs, and edge caching.",
            "Explore AI-driven flashcard generation from arbitrary technical articles to expand content scale.",
            "Extension for this is already going, which is a collabrative editor via which open source community can easily contribute to the content."
        ],
    },
    "collaborative-editor": {
        problemStatement: {
            what: "Maintaining data consistency in real-time collaborative environments is notoriously difficult due to race conditions and network lag.",
            who: "Content creators and documentation teams needing a high-performance, conflict-free editing experience.",
            why: "Standard database-per-keystroke models scale poorly and cause frequent merge conflicts in multi-user sessions.",
        },
        productThinking: {
            solution:
                "Implemented a real-time collaborative editor using Tiptap and Yjs. The system synchronizes binary CRDT updates over WebSockets for awareness and conflict resolution. Approved content is converted from Prosemirror JSON to MDX, stored in Supabase, and pushed to GitHub via API to trigger automated Vercel deployments.",
            alternatives: [
                "Operational Transformation (OT) like Google Docs (high server complexity)",
                "Simple locking mechanism (detrimental to collaborative flow)",
                "Interval polling with diff-match-patch (high latency and conflict-prone)",
            ],
            tradeoffs: [
                "Binary CRDTs over JSON: Significant reduction in WebSocket payload size and memory overhead, though more complex to debug.",
                "Admin Review Flow: Sacrificed instant site updates for a controlled GitHub API push, ensuring content quality before Vercel deployment.",
                "Supabase Persistent State: Used as a 'hot' buffer for document drafts before they are matured into static MDX files.",
            ],
        },
        recruiterView: {
            summary:
                "Engineered a production-ready collaborative document editor featuring real-time sync, presence awareness, and an automated MDX publishing pipeline.",
            impact: [
                "Enabled sub-100ms synchronization for concurrent editors.",
                "Automated the documentation lifecycle from rich-text editing to static site deployment.",
                "Reduced manual content publishing overhead by 90% via GitHub API integration.",
            ],
            outcome:
                "The tool serves as the primary contribution engine for ExplainBytes, allowing the community to safely propose and refine technical documentation.",
        },
        engineerView: {
            apiDesign:
                `// Yjs Binary Update over WebSocket
Uint8Array([1, 1, 145, 1, 0, 123, ...]) // Compact CRDT state

// Awareness / Presence Update
{
  "user": { "name": "Pratyush", "color": "#f783ac" },
  "cursor": { "anchor": 10, "head": 15 }
}

// GitHub API Push (Admin Review)
POST /api/content/publish
{
  "slug": "crdt-fundamentals",
  "content": "--- title: CRDTs ...", // MDX Format
  "commit_message": "docs: update crdt-fundamentals"
}`,
            dbSchema: `// Supabase 'documents' table acts as the source of truth for drafts
// Final content is persisted as .mdx files in the repository

{
  "id": "uuid",
  "title": "Introduction to CRDTs",
  "content_json": { ... }, // Prosemirror state
  "content_mdx": "# Introduction...", 
  "status": "draft" | "review" | "approved",
  "github_commit_sha": "abc123..."
}`,
            scalingApproach:
                "Horizontally scaled Yjs socket servers with awareness throttling. The publishing pipeline uses a decoupled architecture where heavy formatting (JSON to MDX) and GitHub API operations are handled via server actions, ensuring the UI remains responsive even during deployment triggers.",
            bottlenecks: [
                "GitHub API secondary rate limits for high-frequency commits - mitigated with batching",
                "Yjs document size overhead over time - implemented state-vector snapshots",
                "Memory leaks in long-running WebSocket sessions - added aggressive GC on inactive rooms",
            ],
        },
        challenges: [
            {
                issue:
                    "Converting complex Prosemirror nodes (tables, code blocks) to clean MDX was prone to formatting errors.",
                lesson:
                    "Built a custom recursive visitor pattern to map Prosemirror JSON nodes to MDXAST (Markdown AST) for reliable serialization.",
            },
            {
                issue:
                    "High-frequency awareness updates (cursor movements) saturated the WebSocket connection during 10+ user sessions.",
                lesson:
                    "Implemented update throttling (150ms) and delta-based awareness broadcasts to reduce network noise by 70%.",
            },
        ],
        learnings: [
            "Binary protocols like Yjs are essential for scaling real-time apps beyond simple text.",
            "Static Regeneration (ISR) is more reliable for docs than pure dynamic databases.",
            "Automating the Git flow via API bridges the gap between 'editor' and 'repository'.",
            "Effective presence indicators are a UX requirement for collaborative tools.",
        ],
        nextSteps: [
            "Implement offline-first capabilities using IndexedDB persistence.",
            "Add support for collaborative visual diagramming using Tldraw.",
        ],
    },
    "chat": {
        problemStatement: {
            what: "Users needed a secure, low-latency platform for text, voice, and video communication without relying on third-party data-hungry platforms.",
            who: "Privacy-conscious users and small teams needing instant communication tools.",
            why: "Existing chat solutions often have high overhead, complex setups, or privacy concerns regarding message storage.",
        },
        productThinking: {
            solution:
                "Developed a full-stack chat application leveraging Redis as the primary data store for ultra-fast message delivery. Integrated Socket.io for real-time signaling and WebRTC for secure, peer-to-peer audio/video calling. Media assets are handled via Cloudinary with signed URLs stored in Redis to ensure secure access.",
            alternatives: [
                "HTTP Polling (too slow for real-time)",
                "Firebase (vendor lock-in and pricing scaling issues)",
                "Standard SQL DB (slower for high-frequency small message writes)",
            ],
            tradeoffs: [
                "Redis over SQL: Sacrificed complex querying capabilities for sub-millisecond message persistence and retrieval.",
                "WebRTC P2P: Chose Peer-to-Peer over SFU/MCU to reduce server bandwidth costs and enhance privacy, accepting potential connection issues on restricted networks.",
                "Ephemeral State: Redis handles active session and presence data, while long-term history is optimized for speed.",
            ],
        },
        recruiterView: {
            summary:
                "Engineered a high-performance real-time communication platform supporting instant messaging and WebRTC-based video conferencing.",
            impact: [
                "Reduced message delivery latency to sub-50ms using Redis pub/sub.",
                "Implemented secure P2P video calls reducing server load by 95%.",
                "Streamlined media sharing with 100% secure Cloudinary signed URLs.",
            ],
            outcome:
                "Delivered a robust, privacy-first communication tool that demonstrates expertise in real-time systems and WebRTC protocols.",
        },
        engineerView: {
            apiDesign:
                `// WebSocket Event: New Message
socket.emit("message:send", {
  room_id: "room_123",
  content: "Hello!",
  media_url: "cl-res-456" // Signed Cloudinary URL
});

// WebRTC Signaling: Offer
socket.emit("webrtc:offer", {
  target: "peer_b",
  sdp: offer_payload
});

// Redis Key Schema
HGETALL "room:messages:room_123" // Retrieves message history`,
            dbSchema: `// Redis Primary Storage (Key-Value/Hash mapping)

"user:{id}:profile" -> { name, avatar_url, status }
"room:{id}:messages" -> [ { sender_id, text, timestamp, media_id } ]
"room:{id}:members" -> Set of user_ids
"media:{id}:signed_url" -> Temporary access link`,
            scalingApproach:
                "Utilized Redis Pub/Sub for horizontal scaling of WebSocket servers, ensuring messages reach clients regardless of which server node they are connected to. Implemented STUN/TURN servers to facilitate WebRTC NAT traversal for reliable P2P connections.",
            bottlenecks: [
                "Redis memory limits for historical data - implemented message TTL and archival",
                "WebRTC connection failures on corporate firewalls - mitigated with TURN server relay",
                "Socket.io memory overhead per connection - optimized heartbeat intervals",
            ],
        },
        challenges: [
            {
                issue:
                    "ICE candidate exchange was failing in symmetric NAT environments, preventing video calls.",
                lesson:
                    "Integrated a global TURN server mesh to provide a fallback relay, ensuring high connection success rate.",
            },
            {
                issue:
                    "Message ordering was inconsistent during high-concurrency bursts.",
                lesson:
                    "Leveraged Redis Sorted Sets with high-precision timestamps (micro-seconds) to guarantee chronological delivery.",
            },
        ],
        learnings: [
            "WebRTC state machines are complex; robust signaling is half the battle.",
            "Redis is an incredibly capable primary DB for real-time workloads when modeled correctly.",
            "Signed URLs are essential for securing user-uploaded media without complex proxying.",
            "Graceful degradation (falling back from video to audio/text) is key to good UX.",
        ],
        nextSteps: [
            "Implement End-to-End Encryption (E2EE) using the Web Crypto API.",
            "Add group video calling support via a Selective Forwarding Unit (SFU).",
            "Build a desktop client using Electron for system-level notifications.",
        ],
    },
};