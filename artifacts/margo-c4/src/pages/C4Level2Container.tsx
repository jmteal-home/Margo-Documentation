import { DiagramFrame } from "../components/DiagramFrame";
import { C4Box } from "../components/C4Box";
import { C4Arrow } from "../components/C4Arrow";
import { GroupBoundary } from "../components/GroupBoundary";

export function C4Level2Container() {
  return (
    <DiagramFrame
      level="C4 Level 2"
      levelColor="bg-indigo-100 text-indigo-800"
      title="Container Diagram"
      description="Zooms into the major Margo systems to show the processes, services, and data stores — and how they communicate at the container level."
      legend={[
        { color: "bg-blue-700", label: "WFM Containers" },
        { color: "bg-emerald-700", label: "Edge Device Containers" },
        { color: "bg-teal-700", label: "Application Registry" },
        { color: "bg-slate-600", label: "Data Store" },
      ]}
      references={[
        { label: "Margo Management Interface — API Reference", url: "https://docs.margo.org/spec/margo-management-interface/" },
        { label: "GitHub: API Spec (OpenAPI)", url: "https://github.com/margo/specification/tree/main/spec" },
        { label: "Margo: Onboarding Sequence", url: "https://docs.margo.org/spec/margo-management-interface/onboarding/" },
        { label: "Margo: Desired State API", url: "https://docs.margo.org/spec/margo-management-interface/desired-state/" },
        { label: "RFC 9421 — HTTP Message Signatures", url: "https://www.rfc-editor.org/rfc/rfc9421" },
      ]}
      minWidth={1060}
    >
      <div className="space-y-5">

        {/* Application Registry */}
        <GroupBoundary title="Application Registry (OCI-Compliant)" borderColor="border-teal-400" color="bg-teal-50">
          <div className="flex items-center gap-6 flex-wrap">
            <C4Box
              title="OCI Distribution API"
              subtitle="Container"
              variant="container"
              color="teal"
              description="Serves Application Package blobs and manifests. Implements OCI Distribution Spec v1.1."
              technology="OCI Distribution Spec v1.1"
              width={200}
            />
            <C4Arrow direction="right" label="stores & retrieves blobs" technology="Internal" />
            <C4Box
              title="Blob Storage"
              subtitle="Data Store"
              variant="database"
              color="slate"
              description="Stores margo.yaml descriptors, icons, Helm charts, Compose archives, and OCI manifests."
              technology="Object / Block Storage"
              width={200}
            />
          </div>
        </GroupBoundary>

        {/* WFM */}
        <GroupBoundary title="Workload Fleet Manager (WFM)" borderColor="border-blue-400" color="bg-blue-50">
          <div className="space-y-4">
            <div className="flex items-center gap-5 flex-wrap">
              <C4Box
                title="WFM Web UI"
                subtitle="Container"
                variant="container"
                color="blue"
                description="Browser-based operator console for managing devices, applications, and deployments."
                technology="SPA (Browser)"
                width={185}
              />
              <C4Arrow direction="right" label="REST API calls" technology="HTTPS" />
              <C4Box
                title="WFM API Server"
                subtitle="Container"
                variant="container"
                color="blue"
                description="Core REST server implementing the Margo Management Interface. Handles onboarding, desired state, capability reports, and status ingestion."
                technology="REST API / TLS 1.3"
                width={215}
              />
              <C4Arrow direction="right" label="reads / writes" technology="SQL" />
              <C4Box
                title="WFM Database"
                subtitle="Data Store"
                variant="database"
                color="slate"
                description="Stores device registrations, desired states, deployment status, capabilities, and application catalog."
                technology="Relational DB"
                width={190}
              />
            </div>
            <div className="flex items-center gap-5 ml-0 flex-wrap">
              <div className="w-[185px]" />
              <C4Arrow direction="right" label="pulls App Packages" technology="OCI API / HTTPS" />
              <C4Box
                title="Application Catalog Service"
                subtitle="Container"
                variant="container"
                color="blue"
                description="Syncs and caches Application Packages from the Application Registry; presents them to operators."
                technology="Background Service"
                width={215}
              />
            </div>
          </div>
        </GroupBoundary>

        {/* Edge Device */}
        <GroupBoundary title="Edge Compute Device" borderColor="border-emerald-400" color="bg-emerald-50">
          <div className="space-y-4">
            <div className="flex items-center gap-5 flex-wrap">
              <C4Box
                title="WFM Client Agent"
                subtitle="Container"
                variant="container"
                color="emerald"
                description="Long-running service that polls WFM for desired state, reconciles workloads, reports status. Signs all outbound requests with X.509 client certificate."
                technology="Native Service"
                width={215}
              />
              <C4Arrow direction="right" label="installs / manages workloads" technology="Helm API / Compose API" />
              <C4Box
                title="Workload Runtime"
                subtitle="Container"
                variant="container"
                color="emerald"
                description="Container orchestrator running application workloads. Kubernetes (Standalone Cluster) or Docker/Podman Compose (Standalone Device)."
                technology="Kubernetes or Compose Spec"
                width={215}
              />
              <C4Arrow direction="right" label="pulls container images" technology="OCI / HTTPS" />
              <C4Box
                title="Container Image Registry"
                subtitle="External System"
                variant="external"
                description="Hosts container images for workload components (e.g. Docker Hub, GHCR, private registry)."
                width={185}
              />
            </div>
            <div className="flex items-center gap-5 flex-wrap">
              <C4Box
                title="Local Certificate Store"
                subtitle="Data Store"
                variant="database"
                color="slate"
                description="Stores the device's X.509 client certificate and the WFM root CA certificate. Used by the Agent to sign requests."
                technology="OS Cert Store / FS"
                width={215}
              />
              <C4Arrow direction="right" label="signing key used by" technology="RFC 9421" />
              <div className="text-sm text-emerald-700 italic">WFM Client Agent (HTTP Message Signing)</div>
            </div>
          </div>
        </GroupBoundary>

        {/* Key API interactions callout */}
        <div className="bg-white border border-border rounded-lg p-4">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Key Margo Management Interface API Calls</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            {[
              ["Onboarding", "GET /api/v1/onboarding/certificate", "Device fetches WFM root CA on first boot"],
              ["Capabilities", "POST /api/v1/clients/{clientId}/capabilities", "Device registers hardware capabilities"],
              ["Desired State", "GET /api/v1/clients/{clientId}/deployments", "Device polls for state manifest (ETag caching)"],
              ["Bundle Download", "GET /api/v1/clients/{clientId}/deployments/bundles/{digest}", "Device fetches all deployment YAMLs in one call"],
              ["Status Report", "POST /api/v1/clients/{clientId}/deployments/{id}/status", "Device reports workload installation status"],
            ].map(([name, path, desc]) => (
              <div key={name} className="bg-gray-50 rounded-md p-2 border border-gray-200">
                <span className="font-semibold text-gray-700">{name}: </span>
                <code className="text-blue-700 bg-blue-50 px-1 rounded">{path}</code>
                <p className="text-gray-500 mt-0.5">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DiagramFrame>
  );
}
