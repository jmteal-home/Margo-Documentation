import { DiagramFrame } from "../components/DiagramFrame";
import { C4Box } from "../components/C4Box";
import { C4Arrow } from "../components/C4Arrow";
import { GroupBoundary } from "../components/GroupBoundary";

export function C4Level3ComponentDevice() {
  return (
    <DiagramFrame
      level="C4 Level 3"
      levelColor="bg-emerald-100 text-emerald-800"
      title="Edge Compute Device — Component Diagram"
      description="Internal components of the WFM Client Agent on an Edge Compute Device, showing how desired state is polled, reconciled, and workloads are managed."
      legend={[
        { color: "bg-emerald-700", label: "WFM Client Agent Components" },
        { color: "bg-teal-700", label: "Security" },
        { color: "bg-slate-600", label: "Local Data Store" },
      ]}
      references={[
        { label: "Margo: WFM Client Agent Requirements", url: "https://docs.margo.org/spec/margo-management-interface/wfm-client-agent/" },
        { label: "Margo: Device Capabilities Schema", url: "https://docs.margo.org/spec/margo-management-interface/device-capabilities/" },
        { label: "Margo: Desired State Reconciliation", url: "https://docs.margo.org/spec/margo-management-interface/desired-state/" },
        { label: "Margo: Device Roles (Standalone Cluster vs Device)", url: "https://docs.margo.org/spec/device-roles/" },
        { label: "RFC 9421 — HTTP Message Signatures", url: "https://www.rfc-editor.org/rfc/rfc9421" },
      ]}
      minWidth={1060}
    >
      <div className="space-y-4">

        {/* External: WFM */}
        <div className="flex justify-center">
          <C4Box
            title="Workload Fleet Manager (WFM)"
            subtitle="External System"
            variant="external"
            description="Implements the Margo Management Interface REST API. Serves State Manifests and receives status reports."
            width={320}
          />
        </div>
        <div className="flex justify-center">
          <C4Arrow direction="down" label="Desired State (pull) / Status & Capabilities (push)" technology="HTTPS REST + RFC 9421 Signed" bidirectional length={60} />
        </div>

        {/* WFM Client Agent internals */}
        <GroupBoundary title="WFM Client Agent" borderColor="border-emerald-400" color="bg-emerald-50">
          <div className="flex gap-4 flex-wrap justify-center">

            {/* Onboarding */}
            <div className="border border-emerald-200 rounded-lg p-3 bg-white shadow-sm space-y-2 w-52">
              <p className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider text-center">Onboarding</p>
              <C4Box
                title="Certificate Retriever"
                subtitle="Component"
                variant="component"
                color="teal"
                description="On first boot, fetches the WFM root CA certificate and stores it for TLS verification."
                technology="GET /api/v1/onboarding/certificate"
                width={188}
              />
              <C4Arrow direction="down" label="stores CA cert" length={36} />
              <C4Box
                title="Local Certificate Store"
                subtitle="Data Store"
                variant="database"
                color="slate"
                description="Stores WFM root CA and device X.509 client certificate."
                technology="OS / File System"
                width={188}
              />
            </div>

            {/* Capabilities */}
            <div className="border border-emerald-200 rounded-lg p-3 bg-white shadow-sm space-y-2 w-52">
              <p className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider text-center">Capabilities</p>
              <C4Box
                title="Capabilities Reporter"
                subtitle="Component"
                variant="component"
                color="emerald"
                description="Collects and reports device hardware info: CPU, memory, storage, peripherals, network interfaces, and device role."
                technology="POST /api/v1/clients/{id}/capabilities"
                width={188}
              />
            </div>

            {/* Reconciliation */}
            <div className="border border-emerald-200 rounded-lg p-3 bg-white shadow-sm space-y-2 w-52">
              <p className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider text-center">Reconciliation Engine</p>
              <C4Box
                title="Desired State Poller"
                subtitle="Component"
                variant="component"
                color="emerald"
                description="Periodically GETs State Manifest using If-None-Match ETag. Skips processing on 304 Not Modified."
                technology="GET /api/v1/clients/{id}/deployments"
                width={188}
              />
              <C4Arrow direction="down" label="triggers on change" length={36} />
              <C4Box
                title="State Reconciler"
                subtitle="Component"
                variant="component"
                color="emerald"
                description="Compares desired vs current state. Downloads and validates SHA-256 digests of all artifacts. Deploys, updates, or removes workloads."
                technology="Internal"
                width={188}
              />
              <C4Arrow direction="down" label="persists state" length={36} />
              <C4Box
                title="Local State Store"
                subtitle="Data Store"
                variant="database"
                color="slate"
                description="Stores manifest version, ETags, and deployed workload states to survive restarts."
                technology="Local DB / File"
                width={188}
              />
            </div>

            {/* Status */}
            <div className="border border-emerald-200 rounded-lg p-3 bg-white shadow-sm space-y-2 w-52">
              <p className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider text-center">Status Reporting</p>
              <C4Box
                title="Status Reporter"
                subtitle="Component"
                variant="component"
                color="emerald"
                description="Sends per-workload and per-component installation status to WFM: pending → installing → installed / failed."
                technology="POST /api/v1/clients/{id}/deployments/{dId}/status"
                width={188}
              />
            </div>

            {/* HTTP Signing */}
            <div className="border border-teal-200 rounded-lg p-3 bg-white shadow-sm space-y-2 w-52">
              <p className="text-[10px] font-bold text-teal-700 uppercase tracking-wider text-center">Security</p>
              <C4Box
                title="HTTP Message Signer"
                subtitle="Component"
                variant="component"
                color="teal"
                description="Signs all outbound API requests with SHA-256 Content-Digest and RFC 9421 HTTP Message Signature using the device's X.509 private key."
                technology="RFC 9421 / X.509"
                width={188}
              />
            </div>
          </div>

          {/* Workload runtime connection */}
          <div className="mt-5 flex justify-center">
            <C4Arrow direction="down" label="installs / removes workloads" technology="Helm v3 API or Docker Compose CLI" length={52} />
          </div>

          {/* Workload Runtimes */}
          <div className="border border-emerald-300 rounded-lg p-3 bg-emerald-100 mt-1">
            <p className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider text-center mb-3">Workload Runtime (device-role dependent)</p>
            <div className="flex gap-6 justify-center flex-wrap">
              <C4Box
                title="Kubernetes + Helm v3"
                subtitle="Container"
                variant="container"
                color="emerald"
                description="Used by Standalone Cluster devices. Installs Helm v3 charts from Component Registry."
                technology="Helm v3"
                width={210}
              />
              <div className="flex items-center font-bold text-emerald-600 text-sm">OR</div>
              <C4Box
                title="Docker / Podman (Compose)"
                subtitle="Container"
                variant="container"
                color="emerald"
                description="Used by Standalone Device targets. Runs Compose Archives (.tar.gz with compose.yaml)."
                technology="Compose Spec"
                width={210}
              />
            </div>
          </div>
        </GroupBoundary>

        {/* Device roles callout */}
        <div className="bg-white border border-border rounded-lg p-4">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Device Roles</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="bg-emerald-50 border border-emerald-200 rounded-md p-3">
              <p className="font-bold text-emerald-800 mb-1">Standalone Cluster</p>
              <p className="text-emerald-700">Single device acting as both cluster leader and worker node. Runs Kubernetes. Workloads are installed as Helm v3 releases. Suitable for more powerful edge hardware.</p>
            </div>
            <div className="bg-teal-50 border border-teal-200 rounded-md p-3">
              <p className="font-bold text-teal-800 mb-1">Standalone Device</p>
              <p className="text-teal-700">Resource-constrained device with no Kubernetes requirement. Workloads are Compose Archives. Uses Docker or Podman Compose to start containers from the compose.yaml inside the archive.</p>
            </div>
          </div>
        </div>
      </div>
    </DiagramFrame>
  );
}
