import { DiagramFrame } from "../components/DiagramFrame";
import { C4Box } from "../components/C4Box";
import { C4Arrow } from "../components/C4Arrow";
import { GroupBoundary } from "../components/GroupBoundary";

export function C4Level3ComponentWFM() {
  return (
    <DiagramFrame
      level="C4 Level 3"
      levelColor="bg-blue-100 text-blue-800"
      title="WFM API Server — Component Diagram"
      description="Internal components of the Workload Fleet Manager's API Server, which implements the Margo Management Interface specification. All device-facing endpoints require RFC 9421 signed requests."
      legend={[
        { color: "bg-blue-700", label: "API Components" },
        { color: "bg-teal-700", label: "Security / PKI" },
        { color: "bg-slate-600", label: "Data Store" },
      ]}
      references={[
        { label: "Margo Management Interface — Full Spec", url: "https://docs.margo.org/spec/margo-management-interface/" },
        { label: "Margo: Onboarding API", url: "https://docs.margo.org/spec/margo-management-interface/onboarding/" },
        { label: "Margo: Desired State API", url: "https://docs.margo.org/spec/margo-management-interface/desired-state/" },
        { label: "Margo: Device Capabilities", url: "https://docs.margo.org/spec/margo-management-interface/device-capabilities/" },
        { label: "RFC 9421 — HTTP Message Signatures", url: "https://www.rfc-editor.org/rfc/rfc9421" },
        { label: "RFC 9530 — HTTP Digest Fields", url: "https://www.rfc-editor.org/rfc/rfc9530" },
      ]}
      minWidth={1040}
    >
      <div className="space-y-4">

        {/* External callers */}
        <div className="flex justify-center gap-16">
          <C4Box
            title="Operator / WFM Web UI"
            subtitle="External System"
            variant="external"
            description="Browser console managing deployments and viewing device status."
            width={190}
          />
          <C4Box
            title="WFM Client Agent (Device)"
            subtitle="External System"
            variant="external"
            description="Polls desired state, reports capabilities & status. Uses RFC 9421 signed requests."
            width={200}
          />
        </div>

        {/* Arrows in */}
        <div className="flex justify-center gap-20">
          <C4Arrow direction="down" label="HTTPS REST" length={44} />
          <C4Arrow direction="down" label="HTTPS + RFC 9421 signed" length={44} />
        </div>

        {/* WFM API Server internals */}
        <GroupBoundary title="WFM API Server Components" borderColor="border-blue-400" color="bg-blue-50">
          <div className="flex gap-4 flex-wrap justify-center">

            {/* Onboarding */}
            <div className="border border-blue-200 rounded-lg p-3 bg-white shadow-sm space-y-2 w-52">
              <p className="text-[10px] font-bold text-blue-700 uppercase tracking-wider text-center">Onboarding</p>
              <C4Box
                title="Certificate Endpoint"
                subtitle="Component"
                variant="component"
                color="teal"
                description="Issues WFM root CA certificate to new devices on first contact."
                technology="GET /api/v1/onboarding/certificate"
                width={188}
              />
            </div>

            {/* Device Management */}
            <div className="border border-blue-200 rounded-lg p-3 bg-white shadow-sm space-y-2 w-52">
              <p className="text-[10px] font-bold text-blue-700 uppercase tracking-wider text-center">Device Management</p>
              <C4Box
                title="Capabilities Handler"
                subtitle="Component"
                variant="component"
                color="blue"
                description="Receives and stores device hardware capabilities: CPU, memory, storage, peripherals, network interfaces."
                technology="POST /api/v1/clients/{id}/capabilities"
                width={188}
              />
            </div>

            {/* Desired State */}
            <div className="border border-blue-200 rounded-lg p-3 bg-white shadow-sm space-y-2 w-52">
              <p className="text-[10px] font-bold text-blue-700 uppercase tracking-wider text-center">Workload Management</p>
              <C4Box
                title="Desired State API"
                subtitle="Component"
                variant="component"
                color="blue"
                description="Serves State Manifests listing ApplicationDeployment YAMLs per device. Supports If-None-Match ETag caching. Provides bundle download endpoint."
                technology="GET /api/v1/clients/{id}/deployments"
                width={188}
              />
            </div>

            {/* Status ingestion */}
            <div className="border border-blue-200 rounded-lg p-3 bg-white shadow-sm space-y-2 w-52">
              <p className="text-[10px] font-bold text-blue-700 uppercase tracking-wider text-center">Observability</p>
              <C4Box
                title="Status Ingestion Handler"
                subtitle="Component"
                variant="component"
                color="blue"
                description="Receives per-workload status: pending, installing, installed, removing, removed, failed."
                technology="POST /api/v1/clients/{id}/deployments/{dId}/status"
                width={188}
              />
            </div>

            {/* Security middleware */}
            <div className="border border-teal-200 rounded-lg p-3 bg-white shadow-sm space-y-2 w-52">
              <p className="text-[10px] font-bold text-teal-700 uppercase tracking-wider text-center">Security Middleware</p>
              <C4Box
                title="HTTP Signature Verifier"
                subtitle="Component"
                variant="component"
                color="teal"
                description="Validates RFC 9421 HTTP Message Signatures using the device's registered X.509 public key. Rejects replayed or tampered requests."
                technology="RFC 9421 + RFC 9530"
                width={188}
              />
              <C4Arrow direction="down" label="validates cert" length={36} />
              <C4Box
                title="X.509 PKI Component"
                subtitle="Component"
                variant="component"
                color="teal"
                description="Manages client certificate registration and validation for device identity."
                technology="TLS 1.3 + X.509"
                width={188}
              />
            </div>
          </div>

          {/* DB connection */}
          <div className="mt-5 flex justify-center">
            <C4Arrow direction="down" label="reads / writes device, state & status data" technology="SQL" length={52} />
          </div>
          <div className="flex justify-center mt-1">
            <C4Box
              title="WFM Database"
              subtitle="Data Store"
              variant="database"
              color="slate"
              description="Stores device registry, desired states (ApplicationDeployment YAMLs), deployment status per device, device capabilities, and application catalog."
              technology="Relational DB"
              width={400}
            />
          </div>
        </GroupBoundary>

        {/* Desired State format callout */}
        <div className="bg-white border border-border rounded-lg p-4 text-sm">
          <p className="font-semibold text-foreground mb-2">Desired State Manifest Format</p>
          <p className="text-xs text-muted-foreground leading-relaxed">
            The WFM returns a <strong>State Manifest</strong> JSON object listing each assigned workload as a URL + SHA-256 digest pair.
            Devices may fetch individual <code className="bg-gray-100 px-1 rounded text-blue-700">ApplicationDeployment</code> YAMLs or a compressed bundle
            (mediaType: <code className="bg-gray-100 px-1 rounded text-blue-700">application/vnd.margo.bundle.v1+tar+gzip</code>).
            ETag headers allow clients to skip downloads when state hasn't changed (304 Not Modified).
          </p>
        </div>
      </div>
    </DiagramFrame>
  );
}
