import { DiagramFrame } from "../components/DiagramFrame";
import { C4Box } from "../components/C4Box";
import { C4Arrow } from "../components/C4Arrow";

export function C4Level2Container() {
  return (
    <DiagramFrame
      level="C4 Level 2"
      title="Container Diagram"
      description="Zooms into the main Margo systems to show the major containers (processes, services, and data stores) and their interactions."
      legend={[
        { color: "bg-blue-700", label: "WFM Containers" },
        { color: "bg-emerald-700", label: "Edge Device Containers" },
        { color: "bg-teal-700", label: "Application Registry" },
        { color: "bg-purple-700", label: "Data Store" },
      ]}
    >
      <div className="flex flex-col gap-6">

        {/* Application Registry */}
        <div className="border-2 border-teal-300 rounded-xl p-4 bg-teal-50">
          <div className="text-xs font-bold text-teal-600 uppercase tracking-wider mb-3">
            Application Registry (OCI-Compliant)
          </div>
          <div className="flex items-center gap-4 flex-wrap">
            <C4Box
              title="OCI Distribution API"
              type="Container"
              description="Serves Application Packages via the OCI spec endpoints"
              technology="OCI Distribution Spec v1.1"
              color="teal"
              size="sm"
            />
            <C4Arrow direction="right" label="stores / retrieves blobs" technology="Internal" />
            <C4Box
              title="Blob Storage"
              type="Data Store"
              description="Stores application package blobs and OCI manifests"
              technology="Object Storage"
              color="purple"
              size="sm"
            />
          </div>
        </div>

        {/* WFM containers */}
        <div className="border-2 border-blue-300 rounded-xl p-4 bg-blue-50">
          <div className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-3">
            Workload Fleet Manager (WFM)
          </div>
          <div className="flex items-center gap-3 flex-wrap">
            <C4Box
              title="WFM Web UI"
              type="Container"
              description="User interface for operators to manage devices and workloads"
              technology="Web App (Browser)"
              color="blue"
              size="sm"
            />
            <C4Arrow direction="right" label="API calls" technology="HTTPS / REST" />
            <C4Box
              title="WFM API Server"
              type="Container"
              description="Core REST API implementing the Margo Management Interface. Issues client certs, serves desired state, receives status"
              technology="REST API / TLS 1.3"
              color="blue"
              size="md"
            />
            <C4Arrow direction="right" label="reads/writes" technology="SQL" />
            <C4Box
              title="WFM Database"
              type="Data Store"
              description="Stores device registrations, desired states, deployment status, and application catalog"
              technology="Relational DB"
              color="purple"
              size="sm"
            />
          </div>
          <div className="flex items-center gap-3 flex-wrap mt-3">
            <div className="w-36" />
            <C4Arrow direction="right" label="pulls Application Packages" technology="OCI API / HTTPS" />
            <C4Box
              title="Application Catalog / Cache"
              type="Container"
              description="Caches and presents available Application Packages to operators"
              technology="Internal Service"
              color="blue"
              size="sm"
            />
          </div>
        </div>

        {/* Edge Device containers */}
        <div className="border-2 border-emerald-300 rounded-xl p-4 bg-emerald-50">
          <div className="text-xs font-bold text-emerald-600 uppercase tracking-wider mb-3">
            Edge Compute Device
          </div>
          <div className="flex items-center gap-3 flex-wrap">
            <C4Box
              title="WFM Client Agent"
              type="Container"
              description="Polls WFM for desired state, reconciles workloads, reports status. Signs requests with X.509 client cert."
              technology="Long-running service"
              color="green"
              size="md"
            />
            <C4Arrow direction="right" label="installs / manages" technology="Helm / Compose API" />
            <C4Box
              title="Workload Runtime"
              type="Container"
              description="Container orchestration platform that runs application workloads"
              technology="Kubernetes or Compose"
              color="green"
              size="sm"
            />
            <C4Arrow direction="right" label="pulls images" technology="OCI / HTTPS" />
            <C4Box
              title="Container Image Registry"
              type="External"
              description="Provides container images for workload components"
              technology="OCI Registry"
              external
              size="sm"
            />
          </div>
          <div className="mt-3 flex items-center gap-3">
            <C4Box
              title="Local Certificate Store"
              type="Data Store"
              description="Stores client X.509 certificate and WFM root CA"
              technology="OS Cert Store"
              color="purple"
              size="sm"
            />
            <C4Arrow direction="right" label="used by" />
            <div className="text-sm text-emerald-700 italic">WFM Client Agent (for HTTP Message Signing)</div>
          </div>
        </div>

        {/* API interaction arrows between systems */}
        <div className="border border-gray-200 rounded-lg p-3 bg-white text-sm text-muted-foreground">
          <strong className="text-foreground">Key Interactions across systems:</strong>
          <ul className="mt-1 space-y-1 list-disc list-inside">
            <li>WFM API Server ↔ WFM Client Agent: <span className="font-mono text-xs bg-gray-100 px-1 rounded">GET /api/v1/clients/&#123;clientId&#125;/deployments</span> (Margo REST, TLS 1.3 + RFC 9421 signing)</li>
            <li>WFM Client Agent → WFM API Server: <span className="font-mono text-xs bg-gray-100 px-1 rounded">POST /api/v1/clients/&#123;clientId&#125;/deployments/&#123;deploymentId&#125;/status</span></li>
            <li>WFM Client Agent → WFM API Server: <span className="font-mono text-xs bg-gray-100 px-1 rounded">POST /api/v1/clients/&#123;clientId&#125;/capabilities</span></li>
            <li>WFM Client Agent → WFM API Server: <span className="font-mono text-xs bg-gray-100 px-1 rounded">GET /api/v1/onboarding/certificate</span></li>
          </ul>
        </div>
      </div>
    </DiagramFrame>
  );
}
