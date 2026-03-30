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
    action: "Packages the application as an OCI artifact: margo.yaml descriptor + resource layers (icon, license, etc.) + references to Helm/Compose components.",
    protocol: "OCI push / oras CLI",
  },
  {
    actor: "Application Developer",
    actorColor: "bg-orange-100 text-orange-800 border-orange-300",
    action: "Pushes Application Package to the Application Registry.",
    target: "Application Registry",
    protocol: "OCI Distribution Spec v1.1",
  },
  {
    actor: "WFM",
    actorColor: "bg-blue-100 text-blue-800 border-blue-300",
    action: "Pulls and indexes the Application Package into the Application Catalog.",
    target: "Application Registry",
    protocol: "OCI API / HTTPS",
  },
  {
    actor: "Device (initial onboarding)",
    actorColor: "bg-emerald-100 text-emerald-800 border-emerald-300",
    action: "Retrieves the WFM root CA certificate for TLS trust establishment (can also be provisioned out-of-band).",
    target: "WFM",
    protocol: "GET /api/v1/onboarding/certificate",
  },
  {
    actor: "Device",
    actorColor: "bg-emerald-100 text-emerald-800 border-emerald-300",
    action: "Sends device capabilities to WFM: CPU, memory, storage capacity, peripherals, communication interfaces, and device role (Standalone Cluster or Standalone Device).",
    target: "WFM",
    protocol: "POST /api/v1/clients/{clientId}/capabilities  [RFC 9421 signed]",
  },
  {
    actor: "Operator",
    actorColor: "bg-purple-100 text-purple-800 border-purple-300",
    action: "Selects an application from the Application Catalog in the WFM UI, picks target device(s), and configures parameter values.",
    target: "WFM UI",
    note: "WFM generates an ApplicationDeployment YAML with operator-configured parameter values and assigns it to the target device.",
  },
  {
    actor: "Device",
    actorColor: "bg-emerald-100 text-emerald-800 border-emerald-300",
    action: "Polls WFM for the State Manifest, sending the last-known ETag in If-None-Match to avoid redundant processing.",
    target: "WFM",
    protocol: "GET /api/v1/clients/{clientId}/deployments  [If-None-Match: {etag}]",
  },
  {
    actor: "WFM",
    actorColor: "bg-blue-100 text-blue-800 border-blue-300",
    action: "Returns the State Manifest (200 OK + new ETag) if state has changed, or 304 Not Modified if unchanged. Manifest lists each workload as a URL + SHA-256 digest pair.",
    target: "Device",
    protocol: "JSON: manifestVersion, bundle URL + digest, deployments[]",
  },
  {
    actor: "Device",
    actorColor: "bg-emerald-100 text-emerald-800 border-emerald-300",
    action: "Downloads ApplicationDeployment YAMLs. Can fetch individually or as a single compressed bundle.",
    target: "WFM",
    protocol: "GET /api/v1/clients/{clientId}/deployments/{id}/{digest}  OR  /bundles/{digest}",
    note: "SHA-256 digest of every downloaded artifact is verified before use. Mismatches abort the update.",
  },
  {
    actor: "Device",
    actorColor: "bg-emerald-100 text-emerald-800 border-emerald-300",
    action: "State Reconciler installs, updates, or removes workloads to match desired state. Uses Helm v3 for Standalone Cluster or Compose for Standalone Device.",
    target: "Workload Runtime",
    protocol: "Kubernetes Helm API  OR  Docker/Podman Compose CLI",
  },
  {
    actor: "Device",
    actorColor: "bg-emerald-100 text-emerald-800 border-emerald-300",
    action: "Reports per-workload and per-component deployment status back to WFM: pending → installing → installed (or failed / removing / removed).",
    target: "WFM",
    protocol: "POST /api/v1/clients/{clientId}/deployments/{deploymentId}/status  [RFC 9421 signed]",
  },
  {
    actor: "Operator",
    actorColor: "bg-purple-100 text-purple-800 border-purple-300",
    action: "Views real-time deployment status in the WFM UI. Workloads are marked as installed on the target device(s).",
    target: "WFM UI",
  },
];

const actors = [
  { label: "Application Developer", cls: "bg-orange-100 text-orange-800 border-orange-300" },
  { label: "Operator", cls: "bg-purple-100 text-purple-800 border-purple-300" },
  { label: "WFM (Server)", cls: "bg-blue-100 text-blue-800 border-blue-300" },
  { label: "Device / WFM Client Agent", cls: "bg-emerald-100 text-emerald-800 border-emerald-300" },
];

export function C4DeploymentFlow() {
  return (
    <DiagramFrame
      level="Sequence / Flow Diagram"
      levelColor="bg-violet-100 text-violet-800"
      title="End-to-End Workload Deployment Flow"
      description="Complete sequence from an application developer publishing an App Package to a workload running and reporting status on an edge device. Includes onboarding, desired state polling, reconciliation, and status reporting."
      references={[
        { label: "Margo: End-to-End Flow Overview", url: "https://docs.margo.org/spec/overview/" },
        { label: "Margo: Desired State Polling & Reconciliation", url: "https://docs.margo.org/spec/margo-management-interface/desired-state/" },
        { label: "Margo: Workload Status Reporting", url: "https://docs.margo.org/spec/margo-management-interface/deployment-status/" },
        { label: "Margo: Device Onboarding", url: "https://docs.margo.org/spec/margo-management-interface/onboarding/" },
        { label: "RFC 9421 — HTTP Message Signatures", url: "https://www.rfc-editor.org/rfc/rfc9421" },
        { label: "OCI Distribution Spec v1.1", url: "https://github.com/opencontainers/distribution-spec/blob/main/spec.md" },
      ]}
      minWidth={760}
    >
      <div className="space-y-4">
        {/* Actor legend */}
        <div className="flex gap-2 flex-wrap pb-3 border-b border-border">
          <p className="text-xs font-semibold text-muted-foreground self-center">Actors:</p>
          {actors.map((a) => (
            <span key={a.label} className={`text-xs font-semibold px-2.5 py-1 rounded-md border ${a.cls}`}>
              {a.label}
            </span>
          ))}
        </div>

        {/* Steps */}
        <div className="space-y-2">
          {steps.map((step, i) => (
            <div key={i} className="flex gap-3 items-start">
              <div className="flex-shrink-0 w-7 h-7 rounded-full bg-gray-100 border border-gray-300 text-gray-600 text-xs font-bold flex items-center justify-center mt-0.5">
                {i + 1}
              </div>
              <div className="flex-1 border border-gray-200 rounded-lg p-3 bg-white shadow-sm">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className={`text-xs font-bold px-2 py-0.5 rounded border ${step.actorColor}`}>
                    {step.actor}
                  </span>
                  {step.target && (
                    <>
                      <span className="text-gray-400">→</span>
                      <span className="text-xs font-semibold text-gray-600 bg-gray-100 px-2 py-0.5 rounded border border-gray-200">
                        {step.target}
                      </span>
                    </>
                  )}
                </div>
                <p className="text-sm text-foreground mt-1.5 leading-relaxed">{step.action}</p>
                {step.protocol && (
                  <div className="mt-1.5 font-mono text-[11px] text-blue-700 bg-blue-50 border border-blue-100 px-2 py-1 rounded inline-block">
                    {step.protocol}
                  </div>
                )}
                {step.note && (
                  <div className="mt-1.5 text-xs text-amber-800 bg-amber-50 border border-amber-200 rounded px-2 py-1.5">
                    ℹ️ {step.note}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Security model callout */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm font-bold text-blue-800 mb-2">Security Model</p>
          <ul className="space-y-1.5 text-xs text-blue-700">
            <li>
              <strong>Transport:</strong> All client-to-WFM API calls use TLS 1.3 minimum for encryption in transit.
            </li>
            <li>
              <strong>Message Integrity:</strong> Device outbound requests are signed using{" "}
              <a href="https://www.rfc-editor.org/rfc/rfc9421" target="_blank" rel="noopener noreferrer" className="underline hover:text-blue-900">
                RFC 9421 HTTP Message Signatures
              </a>{" "}
              with the device's X.509 private key. This protects payload integrity even through TLS-terminating proxies.
            </li>
            <li>
              <strong>Replay Protection:</strong> The WFM validates signatures against the registered client certificate and rejects requests with stale timestamps.
            </li>
            <li>
              <strong>Artifact Integrity:</strong> All downloaded ApplicationDeployment YAMLs and bundles are verified using SHA-256 content digests before the reconciler processes them.
            </li>
          </ul>
        </div>
      </div>
    </DiagramFrame>
  );
}
