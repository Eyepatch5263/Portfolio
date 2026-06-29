"use client";

import dynamic from "next/dynamic";

const DynamicMermaid = dynamic(
  () => import("./mermaid").then((mod) => mod.Mermaid),
  {
    ssr: false,
    loading: () => (
      <div className="my-6 p-4 text-center text-sm text-muted-foreground animate-pulse border rounded-xl">
        Loading diagram...
      </div>
    ),
  }
);

interface MermaidWrapperProps {
  chart: string;
  className?: string;
}

export function MermaidWrapper({ chart, className }: MermaidWrapperProps) {
  return <DynamicMermaid chart={chart} className={className} />;
}
