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
    "multi-tenant-saas-platform": {
        problemStatement: {
            what: "Clients needed customizable, isolated environments without separate deployments.",
            who: "Enterprise clients requiring white-label solutions with their own branding and data isolation.",
            why: "Managing separate deployments per client was expensive and didn't scale.",
        },
        productThinking: {
            solution:
                "Built a multi-tenant platform with tenant-level customization and data isolation.",
            alternatives: [
                "Separate deployment per tenant (expensive)",
                "Schema-per-tenant in shared database",
                "Row-level security with shared schema",
            ],
            tradeoffs: [
                "Shared infrastructure for cost efficiency vs. dedicated for isolation",
                "Row-level security for simpler ops vs. schema separation for stronger isolation",
                "Customization limits for maintainability",
            ],
        },
        recruiterView: {
            summary:
                "Architected a multi-tenant SaaS platform serving 15+ enterprise clients with isolated environments.",
            impact: [
                "Reduced client onboarding from weeks to hours",
                "Serving 15+ enterprise clients on shared infrastructure",
                "Cut hosting costs by 60% compared to dedicated deployments",
                "Zero cross-tenant data leakage incidents",
            ],
            outcome:
                "Platform became the foundation for the company's enterprise sales motion.",
        },
        engineerView: {
            apiDesign: `// Tenant resolution middleware
const tenantMiddleware = (req, res, next) => {
  const tenantId = req.headers['x-tenant-id'] 
    || extractFromSubdomain(req.hostname);
  req.tenant = await getTenantConfig(tenantId);
  next();
};

// Tenant-scoped data access
GET /api/v1/resources
X-Tenant-Id: tenant_abc

// Response is automatically filtered by tenant`,
            dbSchema: `-- Row-level security approach
CREATE TABLE tenants (
  id UUID PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  subdomain VARCHAR(63) UNIQUE,
  config JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE resources (
  id UUID PRIMARY KEY,
  tenant_id UUID REFERENCES tenants(id) NOT NULL,
  data JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS policy
ALTER TABLE resources ENABLE ROW LEVEL SECURITY;
CREATE POLICY tenant_isolation ON resources
  USING (tenant_id = current_setting('app.tenant_id')::UUID);`,
            scalingApproach:
                "Shared PostgreSQL with RLS, Redis for tenant config caching, per-tenant rate limiting. Large tenants can be migrated to dedicated resources.",
            bottlenecks: [
                "Noisy neighbor problem - per-tenant resource quotas",
                "Config cache invalidation across servers - Redis pub/sub",
                "Tenant-specific customization complexity - JSON Schema validation",
            ],
        },
        challenges: [
            {
                issue:
                    "Early implementation had a bug where tenant context wasn't set properly in background jobs.",
                lesson:
                    "Always pass tenant context explicitly to async jobs. Never rely on request context.",
            },
            {
                issue:
                    "Some tenants had 100x more data than others, causing query performance issues.",
                lesson:
                    "Implemented per-tenant query analysis and automated index suggestions.",
            },
        ],
        learnings: [
            "Row-level security in PostgreSQL is underrated",
            "Tenant context must be explicit everywhere, including logs",
            "Plan for tenant migration to dedicated resources from day one",
            "Noisy neighbor mitigation is as important as isolation",
        ],
        nextSteps: [
            "Implement tenant-level feature flags",
            "Add automated tenant health monitoring",
            "Build self-service admin portal for tenant management",
        ],
    },
};