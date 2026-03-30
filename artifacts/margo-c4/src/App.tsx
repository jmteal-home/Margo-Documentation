import { useState } from "react";
import { DiagramNav } from "./components/DiagramNav";
import { C4Level1SystemContext } from "./pages/C4Level1SystemContext";
import { C4Level2Container } from "./pages/C4Level2Container";
import { C4Level3ComponentWFM } from "./pages/C4Level3ComponentWFM";
import { C4Level3ComponentDevice } from "./pages/C4Level3ComponentDevice";
import { C4ApplicationPackage } from "./pages/C4ApplicationPackage";
import { C4DeploymentFlow } from "./pages/C4DeploymentFlow";

export type DiagramId =
  | "level1-context"
  | "level2-container"
  | "level3-wfm"
  | "level3-device"
  | "application-package"
  | "deployment-flow";

const diagrams: { id: DiagramId; label: string; description: string }[] = [
  {
    id: "level1-context",
    label: "L1: System Context",
    description: "High-level view of Project Margo and its external actors",
  },
  {
    id: "level2-container",
    label: "L2: Container",
    description: "Major components within the Margo ecosystem",
  },
  {
    id: "level3-wfm",
    label: "L3: WFM Internals",
    description: "Internal structure of the Workload Fleet Manager",
  },
  {
    id: "level3-device",
    label: "L3: Device Internals",
    description: "Internal structure of the Edge Compute Device",
  },
  {
    id: "application-package",
    label: "Application Package",
    description: "Structure of a Margo Application Package",
  },
  {
    id: "deployment-flow",
    label: "Deployment Flow",
    description: "End-to-end workload deployment sequence",
  },
];

export default function App() {
  const [active, setActive] = useState<DiagramId>("level1-context");

  return (
    <div className="min-h-screen bg-[hsl(220,20%,97%)] flex flex-col">
      <header className="bg-[hsl(220,70%,35%)] text-white px-6 py-4 shadow-lg">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl font-bold tracking-tight">Project Margo</h1>
          <p className="text-blue-200 text-sm mt-0.5">
            C4 Architecture Diagrams — Open Standard for Edge Workload Orchestration
          </p>
        </div>
      </header>

      <div className="flex flex-col lg:flex-row flex-1 max-w-7xl mx-auto w-full gap-0">
        <DiagramNav
          diagrams={diagrams}
          active={active}
          onSelect={setActive}
        />
        <main className="flex-1 p-6 overflow-auto">
          {active === "level1-context" && <C4Level1SystemContext />}
          {active === "level2-container" && <C4Level2Container />}
          {active === "level3-wfm" && <C4Level3ComponentWFM />}
          {active === "level3-device" && <C4Level3ComponentDevice />}
          {active === "application-package" && <C4ApplicationPackage />}
          {active === "deployment-flow" && <C4DeploymentFlow />}
        </main>
      </div>
    </div>
  );
}
