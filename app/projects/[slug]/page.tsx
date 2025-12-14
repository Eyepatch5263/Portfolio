"use client";

import * as React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, ExternalLink, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { ModeSwitch } from "@/components/projects/mode-switch";
import {
    ArchitectureDiagram,
    sampleArchitecture,
} from "@/components/projects/architecture-diagram";
import { projects } from "@/data/projects";

// Extended project data for case studies
const projectDetails: Record<
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
    "realtime-payments-platform": {
        problemStatement: {
            what: "Legacy payment system couldn't handle growing transaction volume, causing failed payments during peak hours.",
            who: "E-commerce merchants and their customers experiencing failed transactions and revenue loss.",
            why: "Each failed payment meant lost revenue and damaged customer trust. The business was losing ~$50K/month to payment failures.",
        },
        productThinking: {
            solution:
                "Built a new real-time payment processing system with idempotency guarantees, automatic retries, and graceful degradation.",
            alternatives: [
                "Scaling the existing monolith horizontally",
                "Using a third-party payment orchestration service",
                "Implementing a queue-based batch processing system",
            ],
            tradeoffs: [
                "Chose eventual consistency over strong consistency for better availability",
                "Built custom solution vs. third-party for better control and lower latency",
                "Invested in observability early, trading development speed for debuggability",
            ],
        },
        recruiterView: {
            summary:
                "Led the design and implementation of a mission-critical payment processing system handling 10K+ daily transactions with 99.99% uptime.",
            impact: [
                "Reduced payment failures by 95%",
                "Increased transaction throughput by 10x",
                "Saved ~$50K/month in lost revenue",
                "Improved average transaction latency from 2s to 200ms",
            ],
            outcome:
                "The system processed $2M+ in transactions within the first month with zero critical incidents.",
        },
        engineerView: {
            apiDesign: `// Idempotent payment endpoint
POST /api/v1/payments
{
  "idempotency_key": "uuid-v4",
  "amount": 9999,
  "currency": "USD",
  "customer_id": "cus_123",
  "payment_method_id": "pm_456"
}

// Response includes payment state machine status
{
  "id": "pay_789",
  "status": "succeeded" | "pending" | "failed",
  "created_at": "2024-01-15T10:30:00Z"
}`,
            dbSchema: `-- Core tables with proper indexing
CREATE TABLE payments (
  id UUID PRIMARY KEY,
  idempotency_key VARCHAR(255) UNIQUE NOT NULL,
  amount BIGINT NOT NULL,
  currency VARCHAR(3) NOT NULL,
  status payment_status NOT NULL DEFAULT 'pending',
  customer_id UUID REFERENCES customers(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_payments_customer ON payments(customer_id);
CREATE INDEX idx_payments_status ON payments(status) WHERE status = 'pending';`,
            scalingApproach:
                "Horizontal scaling with PostgreSQL read replicas, Redis for idempotency key caching, and Kafka for async event processing. Database sharding by customer_id planned for 100K+ daily transactions.",
            bottlenecks: [
                "Database write contention during peak hours - mitigated with connection pooling",
                "Third-party payment provider rate limits - implemented exponential backoff",
                "Event processing lag during high volume - added consumer auto-scaling",
            ],
        },
        challenges: [
            {
                issue:
                    "Initial design had a race condition in idempotency checking that caused duplicate charges under high concurrency.",
                lesson:
                    "Always use database-level constraints for idempotency, not application-level checks. Added UNIQUE constraint on idempotency_key.",
            },
            {
                issue:
                    "Webhook processing was synchronous, causing timeouts when downstream services were slow.",
                lesson:
                    "Moved to async processing with Kafka. Webhooks now return 200 immediately and process in background.",
            },
        ],
        learnings: [
            "Idempotency is non-negotiable for payment systems",
            "Observability investment pays off 10x during incidents",
            "Design for failure - assume every external call will fail",
            "Database constraints are more reliable than application logic",
        ],
        nextSteps: [
            "Implement database sharding for horizontal write scaling",
            "Add support for multi-currency transactions",
            "Build a reconciliation system for end-of-day auditing",
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

// Default details for projects without specific case study
const defaultDetails = {
    problemStatement: {
        what: "Identified a significant technical challenge that needed solving.",
        who: "Development teams and end users facing the issue.",
        why: "The problem was causing inefficiency and poor user experience.",
    },
    productThinking: {
        solution: "Designed and implemented a solution addressing the core problem.",
        alternatives: ["Alternative approach 1", "Alternative approach 2"],
        tradeoffs: ["Trade-off decision 1", "Trade-off decision 2"],
    },
    recruiterView: {
        summary: "Led the technical design and implementation of a key system component.",
        impact: ["Measurable impact 1", "Measurable impact 2"],
        outcome: "Successfully delivered the project with positive business outcomes.",
    },
    engineerView: {
        apiDesign: "// API design details would go here",
        dbSchema: "-- Database schema details would go here",
        scalingApproach: "Details on scaling approach.",
        bottlenecks: ["Identified bottleneck and mitigation"],
    },
    challenges: [
        {
            issue: "A significant challenge encountered during development.",
            lesson: "The lesson learned and how it improved the final solution.",
        },
    ],
    learnings: ["Key learning from the project"],
    nextSteps: ["Potential future improvement"],
};

interface ProjectPageParams {
    params: Promise<{
        slug: string;
    }>;
}

export default function ProjectPage({ params }: ProjectPageParams) {
    const resolvedParams = React.use(params);
    const [mode, setMode] = React.useState<"recruiter" | "engineer">("recruiter");

    const project = projects.find((p) => p.slug === resolvedParams.slug);

    if (!project) {
        notFound();
    }

    const details = projectDetails[project.slug] || defaultDetails;

    return (
        <>
            <Header />
            <main className="min-h-screen pt-24 pb-20">
                <div className="container mx-auto px-6">
                    {/* Back Button */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <Button variant="ghost" asChild className="mb-8">
                            <Link href="/#projects">
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                Back to Projects
                            </Link>
                        </Button>
                    </motion.div>

                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="mb-12"
                    >
                        <div className="flex flex-wrap items-center gap-4 mb-4">
                            <Badge variant="outline">{project.role}</Badge>
                            <div className="flex gap-2">
                                <Button variant="ghost" size="sm" asChild>
                                    <a href="#" target="_blank" rel="noopener noreferrer">
                                        <Github className="mr-2 h-4 w-4" />
                                        Code
                                    </a>
                                </Button>
                                <Button variant="ghost" size="sm" asChild>
                                    <a href="#" target="_blank" rel="noopener noreferrer">
                                        <ExternalLink className="mr-2 h-4 w-4" />
                                        Live Demo
                                    </a>
                                </Button>
                            </div>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
                            {project.title}
                        </h1>
                        <p className="mt-4 text-xl text-muted-foreground max-w-3xl">
                            {project.tagline}
                        </p>
                        <div className="flex flex-wrap gap-2 mt-6">
                            {project.technologies.map((tech) => (
                                <Badge key={tech} variant="secondary">
                                    {tech}
                                </Badge>
                            ))}
                        </div>
                    </motion.div>

                    {/* Mode Switch */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="mb-12"
                    >
                        <ModeSwitch mode={mode} onModeChange={setMode} />
                    </motion.div>

                    <div className="space-y-16">
                        {/* 1. Problem Statement */}
                        <motion.section
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                        >
                            <h2 className="text-2xl font-bold mb-6">1. Problem Statement</h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="text-lg">What?</CardTitle>
                                    </CardHeader>
                                    <CardContent className="text-muted-foreground">
                                        {details.problemStatement.what}
                                    </CardContent>
                                </Card>
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="text-lg">Who?</CardTitle>
                                    </CardHeader>
                                    <CardContent className="text-muted-foreground">
                                        {details.problemStatement.who}
                                    </CardContent>
                                </Card>
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="text-lg">Why it mattered?</CardTitle>
                                    </CardHeader>
                                    <CardContent className="text-muted-foreground">
                                        {details.problemStatement.why}
                                    </CardContent>
                                </Card>
                            </div>
                        </motion.section>

                        <Separator />

                        {/* 2. Product Thinking */}
                        <motion.section
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                        >
                            <h2 className="text-2xl font-bold mb-6">2. Product Thinking</h2>
                            <div className="space-y-6">
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="text-lg">The Solution</CardTitle>
                                    </CardHeader>
                                    <CardContent className="text-muted-foreground">
                                        {details.productThinking.solution}
                                    </CardContent>
                                </Card>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <Card>
                                        <CardHeader>
                                            <CardTitle className="text-lg">
                                                Alternatives Considered
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <ul className="space-y-2">
                                                {details.productThinking.alternatives.map((alt, i) => (
                                                    <li
                                                        key={i}
                                                        className="text-muted-foreground flex items-start gap-2"
                                                    >
                                                        <span className="text-foreground">•</span>
                                                        {alt}
                                                    </li>
                                                ))}
                                            </ul>
                                        </CardContent>
                                    </Card>
                                    <Card>
                                        <CardHeader>
                                            <CardTitle className="text-lg">Trade-offs Made</CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <ul className="space-y-2">
                                                {details.productThinking.tradeoffs.map((tradeoff, i) => (
                                                    <li
                                                        key={i}
                                                        className="text-muted-foreground flex items-start gap-2"
                                                    >
                                                        <span className="text-foreground">•</span>
                                                        {tradeoff}
                                                    </li>
                                                ))}
                                            </ul>
                                        </CardContent>
                                    </Card>
                                </div>
                            </div>
                        </motion.section>

                        <Separator />

                        {/* 3. System Architecture */}
                        <motion.section
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                        >
                            <h2 className="text-2xl font-bold mb-6">3. System Architecture</h2>
                            <ArchitectureDiagram
                                nodes={sampleArchitecture.nodes}
                                connections={sampleArchitecture.connections}
                            />
                            <p className="mt-4 text-sm text-muted-foreground">
                                Hover over components to see details. This diagram is interactive.
                            </p>
                        </motion.section>

                        <Separator />

                        {/* 4. Mode-Specific Content */}
                        <motion.section
                            key={mode}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <h2 className="text-2xl font-bold mb-6">
                                4. {mode === "recruiter" ? "Impact & Outcome" : "Technical Deep Dive"}
                            </h2>

                            {mode === "recruiter" ? (
                                <div className="space-y-6">
                                    <Card>
                                        <CardHeader>
                                            <CardTitle className="text-lg">Summary</CardTitle>
                                        </CardHeader>
                                        <CardContent className="text-muted-foreground">
                                            {details.recruiterView.summary}
                                        </CardContent>
                                    </Card>
                                    <Card>
                                        <CardHeader>
                                            <CardTitle className="text-lg">Key Impact</CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <ul className="space-y-2">
                                                {details.recruiterView.impact.map((item, i) => (
                                                    <li
                                                        key={i}
                                                        className="text-muted-foreground flex items-start gap-2"
                                                    >
                                                        <span className="text-green-500">✓</span>
                                                        {item}
                                                    </li>
                                                ))}
                                            </ul>
                                        </CardContent>
                                    </Card>
                                    <Card>
                                        <CardHeader>
                                            <CardTitle className="text-lg">Outcome</CardTitle>
                                        </CardHeader>
                                        <CardContent className="text-muted-foreground">
                                            {details.recruiterView.outcome}
                                        </CardContent>
                                    </Card>
                                </div>
                            ) : (
                                <div className="space-y-6">
                                    <Card>
                                        <CardHeader>
                                            <CardTitle className="text-lg">API Design</CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <pre className="p-4 rounded-lg bg-secondary overflow-x-auto text-sm">
                                                <code>{details.engineerView.apiDesign}</code>
                                            </pre>
                                        </CardContent>
                                    </Card>
                                    <Card>
                                        <CardHeader>
                                            <CardTitle className="text-lg">Database Schema</CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <pre className="p-4 rounded-lg bg-secondary overflow-x-auto text-sm">
                                                <code>{details.engineerView.dbSchema}</code>
                                            </pre>
                                        </CardContent>
                                    </Card>
                                    <Card>
                                        <CardHeader>
                                            <CardTitle className="text-lg">Scaling Approach</CardTitle>
                                        </CardHeader>
                                        <CardContent className="text-muted-foreground">
                                            {details.engineerView.scalingApproach}
                                        </CardContent>
                                    </Card>
                                    <Card>
                                        <CardHeader>
                                            <CardTitle className="text-lg">
                                                Bottlenecks & Mitigations
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <ul className="space-y-2">
                                                {details.engineerView.bottlenecks.map((item, i) => (
                                                    <li
                                                        key={i}
                                                        className="text-muted-foreground flex items-start gap-2"
                                                    >
                                                        <span className="text-foreground">•</span>
                                                        {item}
                                                    </li>
                                                ))}
                                            </ul>
                                        </CardContent>
                                    </Card>
                                </div>
                            )}
                        </motion.section>

                        <Separator />

                        {/* 5. Challenges & Failures */}
                        <motion.section
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                        >
                            <h2 className="text-2xl font-bold mb-6">5. Challenges & Failures</h2>
                            <div className="space-y-6">
                                {details.challenges.map((challenge, i) => (
                                    <Card key={i}>
                                        <CardContent className="pt-6">
                                            <div className="space-y-4">
                                                <div>
                                                    <h4 className="font-medium text-destructive mb-2">
                                                        What Broke
                                                    </h4>
                                                    <p className="text-muted-foreground">{challenge.issue}</p>
                                                </div>
                                                <div>
                                                    <h4 className="font-medium text-green-500 mb-2">
                                                        Lesson Learned
                                                    </h4>
                                                    <p className="text-muted-foreground">{challenge.lesson}</p>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </motion.section>

                        <Separator />

                        {/* 6. Outcome & Learnings */}
                        <motion.section
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                        >
                            <h2 className="text-2xl font-bold mb-6">6. Outcome & Learnings</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="text-lg">Key Learnings</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <ul className="space-y-2">
                                            {details.learnings.map((learning, i) => (
                                                <li
                                                    key={i}
                                                    className="text-muted-foreground flex items-start gap-2"
                                                >
                                                    <span className="text-foreground">→</span>
                                                    {learning}
                                                </li>
                                            ))}
                                        </ul>
                                    </CardContent>
                                </Card>
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="text-lg">What I&apos;d Improve Next</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <ul className="space-y-2">
                                            {details.nextSteps.map((step, i) => (
                                                <li
                                                    key={i}
                                                    className="text-muted-foreground flex items-start gap-2"
                                                >
                                                    <span className="text-foreground">○</span>
                                                    {step}
                                                </li>
                                            ))}
                                        </ul>
                                    </CardContent>
                                </Card>
                            </div>
                        </motion.section>
                    </div>

                    {/* Navigation to other projects */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="mt-20 pt-12 border-t border-border"
                    >
                        <h3 className="text-lg font-semibold mb-6">Other Projects</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {projects
                                .filter((p) => p.slug !== project.slug)
                                .slice(0, 3)
                                .map((p) => (
                                    <Link key={p.id} href={`/projects/${p.slug}`}>
                                        <Card className="h-full hover:border-foreground/20 transition-colors cursor-pointer">
                                            <CardContent className="pt-6">
                                                <h4 className="font-medium">{p.title}</h4>
                                                <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                                                    {p.tagline}
                                                </p>
                                            </CardContent>
                                        </Card>
                                    </Link>
                                ))}
                        </div>
                    </motion.div>
                </div>
            </main>
            <Footer />
        </>
    );
}
