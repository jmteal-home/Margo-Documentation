import { useState } from "react";
import { DiagramNav } from "./components/DiagramNav";
import { C4Level1SystemContext } from "./pages/C4Level1SystemContext";
import { C4Level2Container } from "./pages/C4Level2Container";
import { C4Level3ComponentWFM } from "./pages/C4Level3ComponentWFM";
import { C4Level3ComponentDevice } from "./pages/C4Level3ComponentDevice";
import { C4ApplicationPackage } from "./pages/C4ApplicationPackage";
import { C4DeploymentFlow } from "./pages/C4DeploymentFlow";
import { AppDescriptionEditor } from "./pages/AppDescriptionEditor";

export type DiagramId =
  | "level1-context"
  | "level2-container"
  | "level3-wfm"
  | "level3-device"
  | "application-package"
  | "deployment-flow"
  | "app-description-editor";

const diagrams: { id: DiagramId; label: string; description: string; badge?: string }[] = [
  {
    id: "level1-context",
    label: "L1: System Context",
    description: "High-level view — actors and major systems",
    badge: "C4",
  },
  {
    id: "level2-container",
    label: "L2: Containers",
    description: "Processes, services, and data stores",
    badge: "C4",
  },
  {
    id: "level3-wfm",
    label: "L3: WFM Internals",
    description: "Workload Fleet Manager components",
    badge: "C4",
  },
  {
    id: "level3-device",
    label: "L3: Device Internals",
    description: "WFM Client Agent components",
    badge: "C4",
  },
  {
    id: "application-package",
    label: "App Package Structure",
    description: "OCI artifact anatomy and deployment",
    badge: "Concept",
  },
  {
    id: "deployment-flow",
    label: "Deployment Flow",
    description: "End-to-end workload deployment sequence",
    badge: "Sequence",
  },
  {
    id: "app-description-editor",
    label: "App Description Editor",
    description: "Edit & validate margo.yaml with spec tooltips",
    badge: "Spec",
  },
];

export default function App() {
  const [active, setActive] = useState<DiagramId>("level1-context");

  return (
    <div className="h-screen flex flex-col overflow-hidden bg-background">
      {/* Header */}
      <header className="flex-shrink-0 bg-[hsl(222,72%,30%)] text-white px-6 py-3.5 shadow-lg">
        <div className="max-w-screen-2xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold tracking-tight">Project Margo</h1>
            <p className="text-blue-200 text-xs mt-0.5">
              C4 Architecture Diagrams — Open Standard for Edge Workload Orchestration
            </p>
          </div>
          <a
            href="https://docs.margo.org/"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-1.5 text-xs text-blue-200 hover:text-white transition-colors border border-blue-400 hover:border-blue-200 rounded-md px-3 py-1.5"
          >
            <span>↗</span>
            <span>docs.margo.org</span>
          </a>
        </div>
      </header>

      {/* Body: sidebar + main */}
      <div className="flex flex-1 overflow-hidden max-w-screen-2xl mx-auto w-full">
        {/* Sidebar nav */}
        <DiagramNav diagrams={diagrams} active={active} onSelect={setActive} />

        {/* Main content — scrolls vertically */}
        <main className="flex-1 overflow-y-auto overflow-x-hidden">
          <div className="p-6 max-w-screen-xl">
            {active === "level1-context" && <C4Level1SystemContext />}
            {active === "level2-container" && <C4Level2Container />}
            {active === "level3-wfm" && <C4Level3ComponentWFM />}
            {active === "level3-device" && <C4Level3ComponentDevice />}
            {active === "application-package" && <C4ApplicationPackage />}
            {active === "deployment-flow" && <C4DeploymentFlow />}
            {active === "app-description-editor" && <AppDescriptionEditor />}
          </div>
        </main>
      </div>
    </div>
  );
}
