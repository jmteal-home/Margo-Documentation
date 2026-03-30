import { DiagramFrame } from "../components/DiagramFrame";

interface Step {
  actor: string;
  actorColor: string;
  action: string;
  target?: string;
  protocol?: string;
  note?: string;
}

const steps: Step[] = [
  {
    actor: "Application Developer",
    actorColor: "bg-orange-100 text-orange-800 border-orange-300",
    action: "Packages application as OCI artifact (margo.yaml + resources + Helm/Compose components)",
    protocol: "OCI push",
  },
  {
    actor: "Application Developer",
    actorColor: "bg-orange-100 text-orange-800 border-orange-300",
    action: "Pushes Application Package to Application Registry",
    target: "Application Registry",
    protocol: "OCI Distribution Spec",
  },
  {
    actor: "WFM",
    actorColor: "bg-blue-100 text-blue-800 border-blue-300",
    action: "Pulls Application Package from Application Registry into Application Catalog",
    target: "Application Registry",
    protocol: "OCI API / HTTPS",
  },
  {
    actor: "Device (initial onboarding)",
    actorColor: "bg-emerald-100 text-emerald-800 border-emerald-300",
    action: "Retrieves WFM root CA certificate (or receives out-of-band)",
    target: "WFM",
    protocol: "GET /api/v1/onboarding/certificate",
  },
  {
    actor: "Device",
    actorColor: "bg-emerald-100 text-emerald-800 border-emerald-300",
    action: "Sends device capabilities (CPU, memory, roles, peripherals, interfaces) to WFM",
    target: "WFM",
    protocol: "POST /api/v1/clients/{clientId}/capabilities [RFC 9421 signed]",
  },
  {
    actor: "Operator",
    actorColor: "bg-purple-100 text-purple-800 border-purple-300",
    action: "Selects application and device(s) from WFM UI; configures parameter values",
    target: "WFM UI",
    note: "WFM generates ApplicationDeployment YAML with configured parameters",
  },
  {
    actor: "Device (polling)",
    actorColor: "bg-emerald-100 text-emerald-800 border-emerald-300",
    action: "Polls for State Manifest (using If-None-Match ETag for change detection)",
    target: "WFM",
    protocol: "GET /api/v1/clients/{clientId}/deployments",
  },
  {
    actor: "WFM",
    actorColor: "bg-blue-100 text-blue-800 border-blue-300",
    action: "Returns State Manifest (200 OK with ETag) or 304 Not Modified if unchanged",
    target: "Device",
    protocol: "JSON: manifestVersion, bundle URL, deployment[] with digest+url",
  },
  {
    actor: "Device",
    actorColor: "bg-emerald-100 text-emerald-800 border-emerald-300",
    action: "Downloads ApplicationDeployment YAMLs (individually or as bundle archive)",
    target: "WFM",
    protocol: "GET /api/v1/clients/{clientId}/deployments/{id}/{digest} or /bundles/{digest}",
    note: "Device validates SHA-256 digest of every artifact before use",
  },
  {
    actor: "Device",
    actorColor: "bg-emerald-100 text-emerald-800 border-emerald-300",
    action: "Reconciler installs / updates / removes Helm Charts or Compose Archives as workloads",
    target: "Workload Runtime",
    protocol: "Kubernetes Helm API or Docker Compose",
  },
  {
    actor: "Device",
    actorColor: "bg-emerald-100 text-emerald-800 border-emerald-300",
    action: "Reports deployment status for each workload and component (pending → installing → installed)",
    target: "WFM",
    protocol: "POST /api/v1/clients/{clientId}/deployments/{deploymentId}/status [RFC 9421 signed]",
  },
  {
    actor: "Operator",
    actorColor: "bg-purple-100 text-purple-800 border-purple-300",
    action: "Views deployment status in WFM UI — workloads marked installed on target device(s)",
    target: "WFM UI",
  },
];

export function C4DeploymentFlow() {
  return (
    <DiagramFrame
      level="Sequence / Flow Diagram"
      title="End-to-End Workload Deployment Flow"
      description="Shows the complete sequence from an application developer publishing an app to a workload running on an edge device, including onboarding, desired state polling, and status reporting."
    >
      <div className="flex flex-col gap-0">
        {/* Actor legend */}
        <div className="flex gap-3 flex-wrap mb-4 pb-4 border-b border-border">
          {[
            { label: "Application Developer", cls: "bg-orange-100 text-orange-800 border-orange-300" },
            { label: "Operator", cls: "bg-purple-100 text-purple-800 border-purple-300" },
            { label: "WFM (Server)", cls: "bg-blue-100 text-blue-800 border-blue-300" },
            { label: "Device / WFM Client Agent", cls: "bg-emerald-100 text-emerald-800 border-emerald-300" },
          ].map((a) => (
            <span
              key={a.label}
              className={`text-xs font-semibold px-2 py-1 rounded border ${a.cls}`}
            >
              {a.label}
            </span>
          ))}
        </div>

        {/* Steps */}
        <div className="space-y-2">
          {steps.map((step, i) => (
            <div key={i} className="flex gap-3 items-start">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gray-200 text-gray-600 text-xs font-bold flex items-center justify-center mt-0.5">
                {i + 1}
              </div>
              <div className="flex-1 border border-gray-200 rounded-lg p-3 bg-white shadow-sm">
                <div className="flex items-center gap-2 flex-wrap">
                  <span
                    className={`text-xs font-bold px-2 py-0.5 rounded border ${step.actorColor}`}
                  >
                    {step.actor}
                  </span>
                  {step.target && (
                    <>
                      <span className="text-gray-400 text-sm">→</span>
                      <span className="text-xs font-semibold text-gray-600 bg-gray-100 px-2 py-0.5 rounded">
                        {step.target}
                      </span>
                    </>
                  )}
                </div>
                <p className="text-sm text-foreground mt-1">{step.action}</p>
                {step.protocol && (
                  <div className="mt-1 font-mono text-xs text-muted-foreground bg-gray-50 px-2 py-0.5 rounded inline-block">
                    {step.protocol}
                  </div>
                )}
                {step.note && (
                  <div className="mt-1 text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded px-2 py-0.5">
                    Note: {step.note}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Security note */}
        <div className="mt-4 border border-blue-200 rounded-lg p-3 bg-blue-50 text-sm">
          <strong className="text-blue-800">Security Model:</strong>
          <ul className="mt-1 list-disc list-inside text-blue-700 space-y-1 text-xs">
            <li>All client-to-WFM API calls use <strong>TLS 1.3</strong> (minimum) for transport security.</li>
            <li>Device outbound requests are signed using <strong>RFC 9421 HTTP Message Signatures</strong> with the device's X.509 private key. This protects payload integrity even through TLS-terminating proxies.</li>
            <li>The WFM verifies signatures against the registered client certificate and rejects replayed requests (timestamp validation).</li>
            <li>All downloaded artifacts are verified by <strong>SHA-256 content digest</strong> before use; digest mismatches abort the update.</li>
          </ul>
        </div>
      </div>
    </DiagramFrame>
  );
}
