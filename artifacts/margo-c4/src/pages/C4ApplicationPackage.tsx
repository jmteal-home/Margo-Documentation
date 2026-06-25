import { DiagramFrame } from "../components/DiagramFrame";
import { C4Box } from "../components/C4Box";
import { C4Arrow } from "../components/C4Arrow";
import { GroupBoundary } from "../components/GroupBoundary";

export function C4ApplicationPackage() {
  return (
    <DiagramFrame
      level="Concept Diagram"
      levelColor="bg-teal-100 text-teal-800"
      title="Application Package Structure"
      description="How a Margo Application Package is composed as an OCI artifact, distributed through registries, and ultimately deployed as workloads on edge devices."
      legend={[
        { color: "bg-teal-700", label: "Application Registry (OCI Artifact)" },
        { color: "bg-orange-600", label: "Component / Container Registry" },
        { color: "bg-blue-700", label: "Workload Fleet Manager" },
        { color: "bg-emerald-700", label: "Edge Compute Device" },
      ]}
      references={[
        { label: "Margo: Application Description Format", url: "https://docs.margo.org/spec/application-description/" },
        { label: "Margo: Application Package (OCI Artifact)", url: "https://docs.margo.org/spec/application-package/" },
        { label: "Margo: Deployment Profiles (Helm & Compose)", url: "https://docs.margo.org/spec/application-description/deployment-profiles/" },
        { label: "Margo: ApplicationDeployment YAML Schema", url: "https://docs.margo.org/spec/margo-management-interface/desired-state/#applicationdeployment" },
        { label: "OCI Image Manifest Specification", url: "https://github.com/opencontainers/image-spec/blob/main/manifest.md" },
        { label: "OCI Artifact Guidance", url: "https://github.com/opencontainers/image-spec/blob/main/artifacts-guidance.md" },
      ]}
      minWidth={1080}
    >
      <div className="space-y-5">

        {/* Phase 1: Packaging */}
        <div className="flex items-start gap-5">
          <div className="flex flex-col items-center gap-2 flex-shrink-0">
            <C4Box
              title="Application Developer"
              subtitle="Person"
              variant="person"
              color="orange"
              description="Creates and publishes the Application Package."
              width={175}
            />
            <C4Arrow direction="down" label="OCI push" length={40} />
          </div>

          <div className="flex-1">
            <GroupBoundary title="Application Registry — OCI Artifact" borderColor="border-teal-400" color="bg-teal-50">
              <div className="space-y-3">
                <div className="bg-white border border-teal-200 rounded-lg p-3">
                  <p className="text-xs font-bold text-teal-700 mb-1">OCI Image Manifest</p>
                  <code className="text-[10px] text-teal-600 bg-teal-50 px-1 rounded">
                    artifactType: application/vnd.org.margo.app.v1+json
                  </code>

                  <div className="mt-3 grid grid-cols-2 gap-3">
                    {/* Main descriptor layer */}
                    <div className="bg-teal-100 border border-teal-300 rounded-md p-3 text-xs space-y-1">
                      <p className="font-bold text-teal-800">Layer: Application Description</p>
                      <p className="font-mono text-teal-600">margo.yaml</p>
                      <p className="italic text-teal-500 text-[10px]">mediaType: application/vnd.margo.app.description.v1+yaml</p>
                      <div className="border-t border-teal-200 pt-2 mt-2 space-y-0.5 text-gray-700">
                        <p className="font-semibold text-teal-800">Contains:</p>
                        <p>• apiVersion / kind: ApplicationDescription</p>
                        <p>• id — top-level application identifier</p>
                        <p>• metadata (name, version, author, description)</p>
                        <p>• deploymentProfiles (helm and/or compose)</p>
                        <p>• parameters[] with type, default, constraints</p>
                        <p>• configuration (UI display & grouping rules)</p>
                      </div>
                    </div>

                    {/* Resource layers */}
                    <div className="bg-white border border-teal-200 rounded-md p-3 text-xs space-y-2">
                      <p className="font-bold text-teal-700">Optional Resource Layers:</p>
                      {[
                        ["Icon", "application/vnd.margo.app.icon.v1+jpeg"],
                        ["Description (Markdown)", "application/vnd.margo.app.description.v1+markdown"],
                        ["License", "application/vnd.margo.app.license.v1+text"],
                        ["Release Notes", "application/vnd.margo.app.releasenotes.v1+markdown"],
                      ].map(([name, mt]) => (
                        <div key={name} className="bg-teal-50 border border-teal-100 rounded p-1.5">
                          <p className="font-semibold text-teal-700">{name}</p>
                          <p className="font-mono text-[9px] text-teal-500">{mt}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </GroupBoundary>
          </div>
        </div>

        {/* Phase 2: Component Registries */}
        <div className="flex justify-center">
          <C4Arrow direction="down" label="margo.yaml references component locations" length={44} />
        </div>

        <GroupBoundary title="Component Registry — Deployment Artifacts" borderColor="border-orange-400" color="bg-orange-50">
          <div className="flex gap-8 justify-center flex-wrap">
            <div className="space-y-2 w-56">
              <C4Box
                title="Helm Chart"
                subtitle="Container"
                variant="container"
                color="orange"
                description="Packaged as an OCI artifact. Used by Standalone Cluster devices running Kubernetes."
                technology="Helm v3 Chart (OCI)"
                width={210}
              />
              <div className="text-xs text-center text-orange-600">↓ references container images</div>
              <C4Box
                title="Container Image Registry"
                subtitle="External"
                variant="external"
                description="Hosts OCI container images pulled by Kubernetes during workload installation."
                width={210}
              />
            </div>
            <div className="flex items-center font-bold text-orange-400 text-xl">+</div>
            <div className="space-y-2 w-56">
              <C4Box
                title="Compose Archive"
                subtitle="Container"
                variant="container"
                color="orange"
                description="A .tar.gz archive containing compose.yaml. Used by Standalone Device targets."
                technology=".tar.gz (Compose Spec)"
                width={210}
              />
              <div className="text-xs text-center text-orange-600">↓ references container images</div>
              <C4Box
                title="Container Image Registry"
                subtitle="External"
                variant="external"
                description="Hosts OCI container images pulled by Docker/Podman Compose."
                width={210}
              />
            </div>
          </div>
        </GroupBoundary>

        {/* Phase 3: WFM → Device */}
        <div className="flex justify-center">
          <C4Arrow direction="down" label="WFM pulls App Package; generates ApplicationDeployment YAMLs" length={44} />
        </div>
        <div className="flex items-center justify-center gap-6 flex-wrap">
          <C4Box
            title="Workload Fleet Manager"
            subtitle="Software System"
            variant="system"
            color="blue"
            description="Pulls App Package from registry, presents it in the Application Catalog, and generates per-device ApplicationDeployment YAMLs with configured parameter values."
            width={220}
          />
          <C4Arrow direction="right" label="ApplicationDeployment YAML via Desired State API" technology="Margo REST / HTTPS" />
          <C4Box
            title="Edge Compute Device"
            subtitle="Software System"
            variant="system"
            color="emerald"
            description="WFM Client Agent receives the ApplicationDeployment YAML, validates SHA-256 digests, and installs workloads via Helm or Compose."
            width={220}
          />
        </div>

        {/* ApplicationDeployment YAML anatomy */}
        <div className="bg-white border border-border rounded-lg p-4">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
            ApplicationDeployment YAML — Key Fields
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="bg-gray-50 rounded-md p-3 border border-gray-200 space-y-1">
              <p className="font-bold text-gray-700">metadata</p>
              <p>• <code className="bg-gray-100 px-0.5 rounded">annotations.applicationId</code> — reference to the source App Package</p>
              <p>• <code className="bg-gray-100 px-0.5 rounded">annotations.id</code> — unique deployment UUID</p>
              <p>• <code className="bg-gray-100 px-0.5 rounded">name</code> — Kubernetes-compatible manifest name</p>
              <p>• <code className="bg-gray-100 px-0.5 rounded">namespace</code></p>
            </div>
            <div className="bg-gray-50 rounded-md p-3 border border-gray-200 space-y-1">
              <p className="font-bold text-gray-700">spec</p>
              <p>• <code className="bg-gray-100 px-0.5 rounded">deploymentProfile.type</code> — <em>helm</em> or <em>compose</em></p>
              <p>• <code className="bg-gray-100 px-0.5 rounded">deploymentProfile.components[]</code> — name + properties (repo, revision, release name…)</p>
              <p>• <code className="bg-gray-100 px-0.5 rounded">parameters[]</code> — name, value, and target component paths</p>
            </div>
          </div>
        </div>
      </div>
    </DiagramFrame>
  );
}
