import { DiagramFrame } from "../components/DiagramFrame";

interface Change {
  id: string;
  severity: "breaking" | "new" | "updated" | "deprecated";
  area: string;
  title: string;
  detail: string;
  specLink?: string;
}

interface Revision {
  date: string;
  label: string;
  sourceChecked: string;
  summary: string;
  changes: Change[];
}

const REVISIONS: Revision[] = [
  {
    date: "June 25, 2026",
    label: "Spec Refresh — June 2026",
    sourceChecked: "docs.margo.org (Application Description, Desired State, Deployment Status, API Swagger, Concepts)",
    summary:
      "Refreshed all diagram content and the Application Description editor against the current Margo specification. Found three breaking structural changes to the Application Description format, new Helm version restrictions, expanded API endpoints, and updated Deployment Status fields.",
    changes: [
      // ── BREAKING ──────────────────────────────────────────────────────────────
      {
        id: "id-top-level",
        severity: "breaking",
        area: "Application Description",
        title: "`id` promoted from metadata to top-level field",
        detail:
          "Previously the application identifier lived at `metadata.id`. It is now a required top-level attribute alongside `apiVersion`, `kind`, and `metadata`. Any margo.yaml written under the old spec must move the `id:` line out of the `metadata:` block to the top of the document. The Application Description Editor examples have been updated to reflect this.",
        specLink: "https://docs.margo.org/specification/applications/application-description#top-level-attributes",
      },
      {
        id: "helm-v3-renamed",
        severity: "breaking",
        area: "Application Description — deploymentProfiles",
        title: "`type: helm.v3` renamed to `type: helm`",
        detail:
          "The deployment profile type value changed from `helm.v3` to `helm`. The new value covers both Helm version 3 and Helm version 4 (using Chart APIVersion v2). Profile identifiers that included `.v3` in their naming (e.g. `my-app-helm.v3-a`) should be updated to remove the `.v3` segment. Both the App Package Structure diagram and the editor examples have been updated.",
        specLink: "https://docs.margo.org/specification/applications/application-description#deploymentprofile-attributes",
      },
      {
        id: "compose-env-pointer",
        severity: "breaking",
        area: "Application Description — parameters",
        title: "Compose environment-variable pointers no longer use `ENV.` prefix",
        detail:
          "Pointers targeting Compose environment variables previously used the format `ENV.IDP_NAME`. The spec now uses the bare variable name: `IDP_NAME`. Any margo.yaml with compose-targeting parameter pointers must have the `ENV.` prefix removed. The editor examples have been updated. The validator now flags legacy `ENV.*` pointers as deprecated.",
        specLink: "https://docs.margo.org/specification/applications/application-description#target-attributes",
      },
      // ── NEW ───────────────────────────────────────────────────────────────────
      {
        id: "helm-exceptions",
        severity: "new",
        area: "Application Description — deploymentProfiles",
        title: "New Helm Exceptions section — three Helm features are forbidden",
        detail:
          "A new 'Helm Exceptions' subsection explicitly prohibits Helm features that require direct Kubernetes API communication: (1) the Lookup template function, which queries live cluster resources at render time; (2) Hooks (pre/post install, upgrade, delete, rollback, test, etc.), which monitor resources via the Kubernetes API; and (3) CRD management via Helm. The prohibition covers current Helm v3 and v4 implementations and may expand if Helm introduces further API-dependent features.",
        specLink: "https://docs.margo.org/specification/applications/application-description#helm-exceptions",
      },
      {
        id: "helm-v4",
        severity: "new",
        area: "Application Description — deploymentProfiles",
        title: "Helm v4 support added",
        detail:
          "The `helm` deployment profile type now explicitly covers both Helm version 3 and Helm version 4 using Chart APIVersion v2. The Deployment Flow diagram wording has been updated to reflect v3/v4 support.",
        specLink: "https://docs.margo.org/specification/applications/application-description#deploymentprofile-attributes",
      },
      {
        id: "bundle-retrieval",
        severity: "new",
        area: "Desired State — Management Interface",
        title: "Bundle archive retrieval method formally documented",
        detail:
          "The Desired State spec now formally defines two complementary retrieval strategies for ApplicationDeployment YAMLs: (1) Individual YAMLs, fetched separately per workload (best for incremental updates on bandwidth-limited links), and (2) a Bundle archive, a single compressed archive containing all YAMLs (best for initial onboarding or high-latency/high-round-trip networks). The WFM Client chooses based on network conditions. Both routes reference the same content.",
        specLink: "https://docs.margo.org/specification/margo-management-interface/desired-state",
      },
      {
        id: "new-api-endpoints",
        severity: "new",
        area: "Margo Management API",
        title: "Three new API endpoints added (Update, Delete, Bundle)",
        detail:
          "The Workload Management API 1.0.0 Swagger specification now includes: PUT /api/v1/clients/{clientId}/capabilities/{deviceId} to update device capabilities; DELETE /api/v1/clients/{clientId}/capabilities/{deviceId} to unregister a device; GET /api/v1/clients/{clientId}/bundles/{digest} to retrieve a bundle for a specific device and digest. The individual deployment YAML endpoint now includes a `{digest}` path parameter: GET /api/v1/clients/{clientId}/deployments/{deploymentId}/{digest}.",
        specLink: "https://docs.margo.org/specification/margo-management-interface/workload-management-api-1.0.0",
      },
      // ── UPDATED ───────────────────────────────────────────────────────────────
      {
        id: "parameters-map-description",
        severity: "updated",
        area: "Application Description — parameters",
        title: "`parameters` map structure description enhanced",
        detail:
          "The top-level `parameters` attribute description now explicitly explains the map structure: each key is the user-defined parameter name (e.g. `mysqlDatabase:`, `greeting:`), and the value is a Parameter object (map[string]Parameter). The `name` field was removed from the Parameter Attributes table — the map key serves as the parameter name. The editor tooltip has been updated.",
        specLink: "https://docs.margo.org/specification/applications/application-description#top-level-attributes",
      },
      {
        id: "cpu-architectures",
        severity: "updated",
        area: "Application Description — requiredResources",
        title: "`x86_64` removed from CPU architecture example",
        detail:
          "The Example 2 (Digitron orchestrator) `requiredResources.cpu.architectures` list previously contained both `amd64` and `x86_64`. The current spec example lists only `amd64`. The editor's Example 2 has been updated accordingly.",
        specLink: "https://docs.margo.org/specification/applications/application-description#cpu-attributes",
      },
      {
        id: "package-location-clarified",
        severity: "updated",
        area: "Application Description — componentProperties (compose)",
        title: "`packageLocation` description clarified",
        detail:
          "The `packageLocation` property for Compose components now has an updated description: 'It should be a direct path to the compose.yaml or compose file archived in tar.gz.' The editor tooltip reflects this wording.",
        specLink: "https://docs.margo.org/specification/applications/application-description#componentproperties-attributes",
      },
      {
        id: "deployment-status-deviceid",
        severity: "updated",
        area: "Deployment Status — Management Interface",
        title: "`deviceId` field added to DeploymentStatusManifest",
        detail:
          "A new `deviceId` field has been added to the Deployment Status request body. It is conditionally required: it MUST be supplied when reporting deployment status on behalf of a child-device (i.e. in a device hierarchy scenario). The field contains the full device ID including the device hierarchy if applicable.",
        specLink: "https://docs.margo.org/specification/margo-management-interface/deployment-status",
      },
      {
        id: "desired-state-accept-header",
        severity: "updated",
        area: "Desired State — Management Interface",
        title: "Accept header content type formalized for State Manifest",
        detail:
          "The Desired State polling endpoint now formally specifies that clients SHOULD request the manifest using `Accept: application/vnd.margo.manifest.v1+json`. If the `Accept` header lists only unsupported types the server MUST return 406 Not Acceptable. If omitted the server MUST return this format by default.",
        specLink: "https://docs.margo.org/specification/margo-management-interface/desired-state",
      },
      // ── DEPRECATED ────────────────────────────────────────────────────────────
      {
        id: "deprecated-helm-v3-type",
        severity: "deprecated",
        area: "Application Description — deploymentProfiles",
        title: "`type: helm.v3` is deprecated",
        detail:
          "Use `type: helm` going forward. The Application Description editor validator now flags `type: helm.v3` entries as a deprecation warning. The App Package Structure diagram and deployment flow have been updated to use `helm`.",
        specLink: "https://docs.margo.org/specification/applications/application-description#deploymentprofile-attributes",
      },
      {
        id: "deprecated-env-prefix",
        severity: "deprecated",
        area: "Application Description — parameters",
        title: "`ENV.` prefix in compose pointers is deprecated",
        detail:
          "Compose environment-variable target pointers no longer use the `ENV.` prefix. Use the bare variable name (e.g. `IDP_NAME` instead of `ENV.IDP_NAME`). The editor validator now flags any `pointer: ENV.*` as a deprecation warning.",
        specLink: "https://docs.margo.org/specification/applications/application-description#target-attributes",
      },
    ],
  },
];

const SEVERITY_META = {
  breaking: {
    label: "Breaking",
    badge: "bg-red-600 text-white",
    border: "border-red-300",
    bg: "bg-red-50",
    icon: "⚠",
  },
  new: {
    label: "New",
    badge: "bg-emerald-600 text-white",
    border: "border-emerald-300",
    bg: "bg-emerald-50",
    icon: "✦",
  },
  updated: {
    label: "Updated",
    badge: "bg-blue-600 text-white",
    border: "border-blue-300",
    bg: "bg-blue-50",
    icon: "↻",
  },
  deprecated: {
    label: "Deprecated",
    badge: "bg-amber-500 text-white",
    border: "border-amber-300",
    bg: "bg-amber-50",
    icon: "⊘",
  },
};

export function RevisionHistory() {
  return (
    <DiagramFrame
      level="Revision Log"
      levelColor="bg-slate-100 text-slate-700"
      title="Specification Change History"
      description="Tracks all changes found when refreshing diagram content against the official Margo specification source. Each entry includes the affected area, severity, and a link to the relevant spec section."
      references={[
        { label: "Margo Specification — docs.margo.org", url: "https://docs.margo.org/" },
        { label: "Application Description Spec", url: "https://docs.margo.org/specification/applications/application-description" },
        { label: "Desired State API", url: "https://docs.margo.org/specification/margo-management-interface/desired-state" },
        { label: "Deployment Status API", url: "https://docs.margo.org/specification/margo-management-interface/deployment-status" },
        { label: "Workload Management API (Swagger)", url: "https://docs.margo.org/specification/margo-management-interface/workload-management-api-1.0.0" },
        { label: "GitHub: margo/specification", url: "https://github.com/margo/specification" },
      ]}
      minWidth={820}
    >
      <div className="space-y-8">
        {REVISIONS.map((rev) => {
          const counts = {
            breaking: rev.changes.filter((c) => c.severity === "breaking").length,
            new: rev.changes.filter((c) => c.severity === "new").length,
            updated: rev.changes.filter((c) => c.severity === "updated").length,
            deprecated: rev.changes.filter((c) => c.severity === "deprecated").length,
          };

          return (
            <div key={rev.date} className="space-y-4">
              {/* Revision header */}
              <div className="flex items-start gap-4 bg-white border border-border rounded-xl p-4 shadow-sm">
                <div className="flex-shrink-0 w-2 self-stretch rounded-full bg-[hsl(222,72%,30%)]" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 flex-wrap">
                    <h3 className="text-lg font-bold text-foreground">{rev.label}</h3>
                    <span className="text-xs text-muted-foreground bg-gray-100 px-2 py-0.5 rounded-full">
                      {rev.date}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Sources checked: <span className="italic">{rev.sourceChecked}</span>
                  </p>
                  <p className="text-sm text-foreground mt-2 leading-relaxed">{rev.summary}</p>

                  {/* Count pills */}
                  <div className="flex gap-2 flex-wrap mt-3">
                    {(["breaking", "new", "updated", "deprecated"] as const).map((s) =>
                      counts[s] > 0 ? (
                        <span
                          key={s}
                          className={`text-xs font-bold px-2.5 py-1 rounded-full ${SEVERITY_META[s].badge}`}
                        >
                          {counts[s]} {SEVERITY_META[s].label}
                        </span>
                      ) : null
                    )}
                  </div>
                </div>
              </div>

              {/* Change cards — grouped by severity */}
              {(["breaking", "new", "updated", "deprecated"] as const).map((sev) => {
                const group = rev.changes.filter((c) => c.severity === sev);
                if (group.length === 0) return null;
                const meta = SEVERITY_META[sev];
                return (
                  <div key={sev} className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${meta.badge}`}>
                        {meta.icon} {meta.label}
                      </span>
                      <div className="flex-1 h-px bg-border" />
                    </div>
                    {group.map((change) => (
                      <div
                        key={change.id}
                        className={`border ${meta.border} ${meta.bg} rounded-lg p-4`}
                      >
                        <div className="flex items-start gap-3 flex-wrap">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 flex-wrap mb-1">
                              <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500 bg-white border border-gray-200 px-2 py-0.5 rounded">
                                {change.area}
                              </span>
                            </div>
                            <p className="text-sm font-bold text-foreground">
                              <code className="font-mono">{change.title.match(/^`[^`]+`/) ? "" : ""}</code>
                              {change.title}
                            </p>
                            <p className="text-sm text-gray-700 mt-1.5 leading-relaxed">
                              {change.detail}
                            </p>
                            {change.specLink && (
                              <a
                                href={change.specLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 text-xs text-blue-600 hover:underline mt-2"
                              >
                                ↗ View spec section
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                );
              })}
            </div>
          );
        })}

        {/* Legend */}
        <div className="border border-border rounded-xl p-4 bg-white">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
            Change Severity Legend
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {(["breaking", "new", "updated", "deprecated"] as const).map((s) => (
              <div key={s} className={`rounded-lg p-3 border ${SEVERITY_META[s].border} ${SEVERITY_META[s].bg}`}>
                <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${SEVERITY_META[s].badge}`}>
                  {SEVERITY_META[s].icon} {SEVERITY_META[s].label}
                </span>
                <p className="text-xs text-gray-600 mt-2 leading-relaxed">
                  {s === "breaking" && "Structural change that requires updates to existing margo.yaml files."}
                  {s === "new" && "New feature, field, or capability added to the specification."}
                  {s === "updated" && "Existing field description, behaviour, or content clarified or expanded."}
                  {s === "deprecated" && "Old format or field value still parses but should be migrated."}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DiagramFrame>
  );
}
