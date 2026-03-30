import { DiagramFrame } from "../components/DiagramFrame";
import { C4Box } from "../components/C4Box";
import { C4Arrow } from "../components/C4Arrow";

export function C4Level1SystemContext() {
  return (
    <DiagramFrame
      level="C4 Level 1"
      title="System Context Diagram"
      description="Project Margo is an open standard for interoperable edge workload orchestration. This diagram shows the high-level actors and their relationship to the core Margo ecosystem."
      legend={[
        { color: "bg-blue-700", label: "Margo System Boundary" },
        { color: "bg-emerald-700", label: "Software Systems (Margo-Compliant)" },
        { color: "bg-orange-600", label: "Person / User" },
      ]}
    >
      <div className="flex flex-col gap-6">

        {/* Top row: external actors */}
        <div className="flex justify-around items-center gap-4">
          <div className="flex flex-col items-center gap-2">
            <C4Box
              title="Application Developer"
              type="Person"
              description="Packages and publishes edge apps as Margo-compliant Application Packages"
              color="orange"
              external
            />
          </div>
          <div className="flex flex-col items-center gap-2">
            <C4Box
              title="End User / Operator"
              type="Person"
              description="Deploys and manages workloads on edge devices via the WFM UI"
              color="orange"
              external
            />
          </div>
        </div>

        {/* Arrows down to Margo boundary */}
        <div className="flex justify-around gap-4">
          <div className="flex flex-col items-center">
            <C4Arrow direction="down" label="Uploads Application Packages" technology="OCI Registry API" />
          </div>
          <div className="flex flex-col items-center">
            <C4Arrow direction="down" label="Configures & monitors deployments" technology="WFM UI" />
          </div>
        </div>

        {/* Margo System Boundary */}
        <div className="border-2 border-dashed border-blue-400 rounded-xl p-4 bg-blue-50">
          <div className="text-xs font-bold text-blue-500 uppercase tracking-wider mb-4">
            Margo Ecosystem (Open Standard Boundary)
          </div>
          <div className="flex items-center justify-center gap-6">
            <div className="flex flex-col items-center gap-2">
              <C4Box
                title="Application Registry"
                type="Software System"
                description="OCI-compliant registry hosting Application Packages"
                technology="OCI Distribution Spec"
                color="teal"
              />
            </div>

            <C4Arrow direction="right" label="Pulls Application Packages" technology="OCI API / HTTPS" />

            <div className="flex flex-col items-center gap-2">
              <C4Box
                title="Workload Fleet Manager (WFM)"
                type="Software System"
                description="Orchestrates workload deployments across a fleet of edge devices"
                technology="REST API / HTTPS"
                color="blue"
                size="lg"
              />
            </div>

            <C4Arrow direction="right" label="Desired State (pull)" technology="Margo REST API / HTTPS" bidirectional />

            <div className="flex flex-col items-center gap-2">
              <C4Box
                title="Edge Compute Device"
                type="Software System"
                description="Runs Margo-compliant workloads; hosts the WFM Client agent"
                technology="Kubernetes / Compose"
                color="green"
                size="lg"
              />
            </div>
          </div>
        </div>

        {/* Bottom: Component / Container Registry (external) */}
        <div className="flex justify-around gap-4">
          <div className="flex flex-col items-center">
            <C4Arrow direction="up" label="Stores Helm Charts & Compose Archives" technology="OCI / HTTPS" />
            <C4Box
              title="Component Registry"
              type="External System"
              description="Stores deployable components: Helm Charts and Compose Archives"
              technology="OCI Registry"
              external
            />
          </div>
          <div className="flex flex-col items-center">
            <C4Arrow direction="up" label="Stores container images" technology="OCI / HTTPS" />
            <C4Box
              title="Container Image Registry"
              type="External System"
              description="Hosts container images referenced by application components"
              technology="OCI Registry (e.g. Docker Hub)"
              external
            />
          </div>
          <div className="flex flex-col items-center">
            <C4Arrow direction="up" label="Issues client X.509 certificates" />
            <C4Box
              title="Authentication / PKI Service"
              type="External System"
              description="Manages trust via X.509 certificates for secure API communication"
              external
            />
          </div>
        </div>
      </div>
    </DiagramFrame>
  );
}
