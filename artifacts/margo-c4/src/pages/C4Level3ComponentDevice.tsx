import { DiagramFrame } from "../components/DiagramFrame";
import { C4Box } from "../components/C4Box";
import { C4Arrow } from "../components/C4Arrow";

export function C4Level3ComponentDevice() {
  return (
    <DiagramFrame
      level="C4 Level 3"
      title="Edge Compute Device — Component Diagram"
      description="Internal components of the Edge Compute Device, showing how the WFM Client Agent reconciles desired state and manages workloads on the device."
      legend={[
        { color: "bg-emerald-700", label: "WFM Client Agent Components" },
        { color: "bg-green-600", label: "Workload Runtime" },
        { color: "bg-purple-700", label: "Local Data / Storage" },
        { color: "bg-teal-700", label: "Security" },
      ]}
    >
      <div className="flex flex-col gap-5">

        {/* External: WFM */}
        <div className="flex justify-center">
          <C4Box
            title="Workload Fleet Manager (WFM)"
            type="External System"
            description="Margo Management Interface server"
            technology="HTTPS REST API"
            external
            size="lg"
          />
        </div>

        <div className="flex justify-center">
          <C4Arrow direction="down" label="Desired State (pull) + Status (push)" technology="HTTPS + RFC 9421 Signed" bidirectional />
        </div>

        {/* Edge Device internals */}
        <div className="border-2 border-emerald-300 rounded-xl p-5 bg-emerald-50">
          <div className="text-xs font-bold text-emerald-600 uppercase tracking-wider mb-4">
            WFM Client Agent Components
          </div>

          <div className="flex gap-4 flex-wrap justify-center">

            {/* Onboarding */}
            <div className="flex flex-col items-center gap-2 border border-emerald-200 rounded-lg p-3 bg-white shadow-sm">
              <div className="text-xs font-bold text-emerald-700 uppercase">Onboarding</div>
              <C4Box
                title="Certificate Retriever"
                type="Component"
                description="Fetches WFM root CA certificate during initial onboarding"
                technology="GET /api/v1/onboarding/certificate"
                color="teal"
                size="sm"
              />
              <C4Arrow direction="down" label="stores CA cert" />
              <C4Box
                title="Local Certificate Store"
                type="Data Store"
                description="Stores WFM root CA and device X.509 client certificate"
                technology="OS / File System"
                color="purple"
                size="sm"
              />
            </div>

            {/* Capabilities reporter */}
            <div className="flex flex-col items-center gap-2 border border-emerald-200 rounded-lg p-3 bg-white shadow-sm">
              <div className="text-xs font-bold text-emerald-700 uppercase">Capability Reporter</div>
              <C4Box
                title="Device Capabilities Reporter"
                type="Component"
                description="Reports CPU, memory, storage, peripherals, and communication interfaces to the WFM"
                technology="POST /api/v1/clients/{id}/capabilities"
                color="green"
                size="sm"
              />
            </div>

            {/* Desired State Reconciler */}
            <div className="flex flex-col items-center gap-2 border border-emerald-200 rounded-lg p-3 bg-white shadow-sm">
              <div className="text-xs font-bold text-emerald-700 uppercase">Reconciliation Engine</div>
              <C4Box
                title="Desired State Poller"
                type="Component"
                description="Periodically fetches State Manifest using If-None-Match ETag to detect changes"
                technology="GET /api/v1/clients/{id}/deployments"
                color="green"
                size="sm"
              />
              <C4Arrow direction="down" label="triggers reconciliation" />
              <C4Box
                title="State Reconciler"
                type="Component"
                description="Compares desired vs current state. Deploys, updates, or removes workloads. Validates SHA-256 digests of all artifacts."
                technology="Internal Logic"
                color="green"
                size="md"
              />
              <C4Arrow direction="down" label="persists current state" />
              <C4Box
                title="Local State Store"
                type="Data Store"
                description="Stores current manifest version, ETags, and deployed workload states to survive restarts"
                technology="Local DB / File"
                color="purple"
                size="sm"
              />
            </div>

            {/* Status Reporter */}
            <div className="flex flex-col items-center gap-2 border border-emerald-200 rounded-lg p-3 bg-white shadow-sm">
              <div className="text-xs font-bold text-emerald-700 uppercase">Status Reporting</div>
              <C4Box
                title="Deployment Status Reporter"
                type="Component"
                description="Reports per-workload and per-component status: pending, installing, installed, removing, removed, failed"
                technology="POST /api/v1/clients/{id}/deployments/{dId}/status"
                color="green"
                size="sm"
              />
            </div>

            {/* HTTP Signing */}
            <div className="flex flex-col items-center gap-2 border border-teal-200 rounded-lg p-3 bg-white shadow-sm">
              <div className="text-xs font-bold text-teal-700 uppercase">Security</div>
              <C4Box
                title="HTTP Message Signer"
                type="Component"
                description="Signs all outbound requests with SHA-256 Content-Digest and RFC 9421 HTTP Message Signature using client X.509 private key"
                technology="RFC 9421 / X.509"
                color="teal"
                size="sm"
              />
            </div>
          </div>

          {/* Workload Runtime interaction */}
          <div className="mt-4 flex justify-center">
            <C4Arrow direction="down" label="installs / removes workloads via Helm or Compose" technology="Kubernetes API / Docker Compose" />
          </div>

          {/* Device roles */}
          <div className="mt-2 border border-green-300 rounded-lg p-3 bg-green-50">
            <div className="text-xs font-bold text-green-700 uppercase mb-2">Workload Runtime</div>
            <div className="flex gap-4 justify-center flex-wrap">
              <C4Box
                title="Kubernetes (Helm)"
                type="Runtime"
                description="For Standalone Cluster devices — installs Helm v3 charts as workloads"
                technology="Helm v3"
                color="green"
                size="sm"
              />
              <div className="flex items-center text-muted-foreground font-medium">OR</div>
              <C4Box
                title="Docker / Podman (Compose)"
                type="Runtime"
                description="For Standalone Devices — starts Compose Archives as workloads"
                technology="Compose Spec"
                color="green"
                size="sm"
              />
            </div>
          </div>
        </div>

        {/* Device roles note */}
        <div className="border border-gray-200 rounded-lg p-3 bg-white text-sm text-muted-foreground">
          <strong className="text-foreground">Device Roles:</strong>
          <ul className="mt-1 list-disc list-inside space-y-1">
            <li><strong>Standalone Cluster</strong> — Single device acting as both cluster leader and worker, running Kubernetes.</li>
            <li><strong>Standalone Device</strong> — Limited resource device running Docker/Podman Compose (no Kubernetes required).</li>
          </ul>
        </div>
      </div>
    </DiagramFrame>
  );
}
