import { DiagramFrame } from "../components/DiagramFrame";
import { C4Box } from "../components/C4Box";
import { C4Arrow } from "../components/C4Arrow";

export function C4Level3ComponentWFM() {
  return (
    <DiagramFrame
      level="C4 Level 3"
      title="WFM API Server — Component Diagram"
      description="Internal components of the Workload Fleet Manager's API server, which implements the Margo Management Interface specification."
      legend={[
        { color: "bg-blue-700", label: "API Components" },
        { color: "bg-purple-700", label: "Data / Storage" },
        { color: "bg-teal-700", label: "Security / PKI" },
      ]}
    >
      <div className="flex flex-col gap-5">

        {/* Inbound traffic */}
        <div className="flex justify-around gap-4">
          <C4Box title="Operator / WFM UI" type="Person/Browser" description="Manages deployments and views device status" external size="sm" />
          <C4Box title="WFM Client Agent" type="Edge Device" description="Polls desired state, reports status and capabilities" external size="sm" />
        </div>

        <div className="flex justify-around gap-4">
          <C4Arrow direction="down" label="HTTPS (REST)" />
          <C4Arrow direction="down" label="HTTPS + RFC 9421 Signed Requests" />
        </div>

        {/* WFM API Server internals */}
        <div className="border-2 border-blue-300 rounded-xl p-5 bg-blue-50">
          <div className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-4">
            WFM API Server Components
          </div>

          <div className="flex gap-4 flex-wrap justify-center">

            {/* Onboarding component */}
            <div className="flex flex-col items-center gap-2 border border-blue-200 rounded-lg p-3 bg-white shadow-sm">
              <div className="text-xs font-bold text-blue-700 uppercase">Onboarding Handler</div>
              <C4Box
                title="Certificate API"
                type="Component"
                description="Issues and serves the WFM root CA certificate to new devices"
                technology="GET /api/v1/onboarding/certificate"
                color="teal"
                size="sm"
              />
            </div>

            {/* Device management component */}
            <div className="flex flex-col items-center gap-2 border border-blue-200 rounded-lg p-3 bg-white shadow-sm">
              <div className="text-xs font-bold text-blue-700 uppercase">Device Management</div>
              <C4Box
                title="Capabilities Handler"
                type="Component"
                description="Receives and stores device hardware capabilities"
                technology="POST/PUT /api/v1/clients/{id}/capabilities"
                color="blue"
                size="sm"
              />
            </div>

            {/* Desired state component */}
            <div className="flex flex-col items-center gap-2 border border-blue-200 rounded-lg p-3 bg-white shadow-sm">
              <div className="text-xs font-bold text-blue-700 uppercase">Workload Management</div>
              <C4Box
                title="Desired State API"
                type="Component"
                description="Serves State Manifests listing ApplicationDeployment YAMLs for each device. Supports ETag caching."
                technology="GET /api/v1/clients/{id}/deployments"
                color="blue"
                size="md"
              />
            </div>

            {/* Status component */}
            <div className="flex flex-col items-center gap-2 border border-blue-200 rounded-lg p-3 bg-white shadow-sm">
              <div className="text-xs font-bold text-blue-700 uppercase">Observability</div>
              <C4Box
                title="Deployment Status Handler"
                type="Component"
                description="Receives workload status reports (pending/installing/installed/failed) from devices"
                technology="POST /api/v1/clients/{id}/deployments/{dId}/status"
                color="blue"
                size="sm"
              />
            </div>

            {/* Security middleware */}
            <div className="flex flex-col items-center gap-2 border border-teal-200 rounded-lg p-3 bg-white shadow-sm">
              <div className="text-xs font-bold text-teal-700 uppercase">Security Middleware</div>
              <C4Box
                title="RFC 9421 Signature Verifier"
                type="Component"
                description="Validates HTTP Message Signatures using device X.509 client cert. Rejects replayed or tampered requests."
                technology="RFC 9421 / X.509"
                color="teal"
                size="sm"
              />
              <C4Arrow direction="down" label="validates" />
              <C4Box
                title="X.509 PKI"
                type="Component"
                description="Manages client certificate issuance and validation"
                technology="TLS 1.3 + X.509"
                color="teal"
                size="sm"
              />
            </div>
          </div>

          {/* Shared DB connection */}
          <div className="mt-4 flex justify-center">
            <C4Arrow direction="down" label="reads / writes" technology="SQL" />
          </div>
          <div className="flex justify-center mt-2">
            <C4Box
              title="WFM Database"
              type="Data Store"
              description="Devices, desired states, deployment status, capabilities, application catalog"
              technology="Relational DB"
              color="purple"
              size="md"
            />
          </div>
        </div>

        {/* External pull of app packages */}
        <div className="flex justify-center">
          <div className="border border-gray-200 rounded-lg p-3 bg-white text-sm text-muted-foreground max-w-lg">
            <strong className="text-foreground">Desired State Bundle Format:</strong>
            <p className="mt-1">
              The WFM serves a <strong>State Manifest</strong> (JSON) listing each assigned workload as an
              <code className="text-xs bg-gray-100 px-1 rounded mx-1">ApplicationDeployment</code> YAML.
              Devices can retrieve workloads individually or as a compressed bundle
              (<code className="text-xs bg-gray-100 px-1 rounded">application/vnd.margo.bundle.v1+tar+gzip</code>).
              All artifacts are content-addressed via SHA-256 digests.
            </p>
          </div>
        </div>
      </div>
    </DiagramFrame>
  );
}
