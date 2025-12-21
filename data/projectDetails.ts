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
                "Caching via Read through pattern - faster reads and response times",
                "Mdx over API calls - less latency"
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
    "collaborative-document-editor": {
        problemStatement: {
            what: "Teams couldn't collaborate on documents in real-time without conflicts or data loss.",
            who: "Remote teams needing to work on shared documents simultaneously.",
            why: "Existing solutions were either slow, expensive, or caused frustrating merge conflicts.",
        },
        productThinking: {
            solution:
                "Built a real-time collaborative editor using CRDTs for conflict-free synchronization.",
            alternatives: [
                "Operational Transformation (like Google Docs)",
                "Simple locking mechanism (one editor at a time)",
                "Periodic sync with conflict resolution UI",
            ],
            tradeoffs: [
                "CRDTs over OT - simpler to reason about, better for offline support",
                "WebSocket over polling - lower latency, more infrastructure complexity",
                "Custom rich text format - more control, more maintenance",
            ],
        },
        recruiterView: {
            summary:
                "Built a real-time collaborative document editor serving 50K+ daily active users with sub-100ms sync latency.",
            impact: [
                "Enabled real-time collaboration for 50K+ users",
                "Achieved sub-100ms sync latency globally",
                "99.9% uptime with zero data loss incidents",
                "Reduced conflict-related support tickets by 80%",
            ],
            outcome:
                "The feature became a key differentiator, contributing to 30% increase in user retention.",
        },
        engineerView: {
            apiDesign: `// WebSocket message protocol
{
  "type": "operation",
  "document_id": "doc_123",
  "operations": [
    { "type": "insert", "position": 42, "text": "Hello" }
  ],
  "vector_clock": { "client_a": 5, "client_b": 3 }
}

// Presence updates
{
  "type": "presence",
  "user_id": "user_456",
  "cursor": { "position": 100, "selection_end": 105 }
}`,
            dbSchema: `-- Document storage with CRDT state
CREATE TABLE documents (
  id UUID PRIMARY KEY,
  title VARCHAR(255),
  crdt_state JSONB NOT NULL,
  version BIGINT DEFAULT 0,
  owner_id UUID REFERENCES users(id),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Operation log for history/undo
CREATE TABLE operations (
  id UUID PRIMARY KEY,
  document_id UUID REFERENCES documents(id),
  user_id UUID REFERENCES users(id),
  operation JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);`,
            scalingApproach:
                "Horizontally scaled WebSocket servers with Redis Pub/Sub for cross-server message broadcasting. Document state partitioned by document_id. CDN for static assets.",
            bottlenecks: [
                "WebSocket connection limits per server - added connection load balancer",
                "Redis Pub/Sub fan-out at scale - implemented topic sharding",
                "Large document sync on initial load - added incremental loading",
            ],
        },
        challenges: [
            {
                issue:
                    "Memory usage spiked with many concurrent editors on large documents.",
                lesson:
                    "Implemented document chunking and virtual scrolling. Only load visible portions.",
            },
            {
                issue:
                    "Cross-datacenter latency caused noticeable lag for international users.",
                lesson:
                    "Deployed edge servers in multiple regions with local CRDT merge before sync to origin.",
            },
        ],
        learnings: [
            "CRDTs are powerful but require careful memory management",
            "Presence features are as important as the core editing",
            "Edge computing is essential for global real-time apps",
            "Test with realistic document sizes and user counts",
        ],
        nextSteps: [
            "Add offline support with local-first architecture",
            "Implement document versioning and branching",
            "Build commenting and suggestion features",
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