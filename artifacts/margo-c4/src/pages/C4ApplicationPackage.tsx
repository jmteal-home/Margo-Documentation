import { DiagramFrame } from "../components/DiagramFrame";
import { C4Box } from "../components/C4Box";
import { C4Arrow } from "../components/C4Arrow";

export function C4ApplicationPackage() {
  return (
    <DiagramFrame
      level="Concept Diagram"
      title="Application Package Structure"
      description="Illustrates how a Margo Application Package is composed, distributed through registries, and ultimately deployed as workloads on edge devices."
      legend={[
        { color: "bg-teal-700", label: "Application Registry (OCI)" },
        { color: "bg-orange-600", label: "Component Registry" },
        { color: "bg-blue-700", label: "WFM / Application Catalog" },
        { color: "bg-emerald-700", label: "Edge Compute Device" },
      ]}
    >
      <div className="flex flex-col gap-6">

        {/* Application Developer creates */}
        <div className="flex items-start gap-4">
          <C4Box
            title="Application Developer"
            type="Person"
            description="Creates and publishes the Application Package"
            color="orange"
            external
            size="sm"
          />
          <C4Arrow direction="right" label="uploads" technology="OCI push" />

          {/* Application Registry */}
          <div className="border-2 border-teal-300 rounded-xl p-4 bg-teal-50 flex-1">
            <div className="text-xs font-bold text-teal-600 uppercase tracking-wider mb-3">
              Application Registry (OCI-Compliant)
            </div>
            <div className="flex flex-col gap-2">
              {/* OCI Manifest */}
              <div className="bg-white border border-teal-200 rounded-lg p-3">
                <div className="text-xs font-bold text-teal-700 mb-1">OCI Image Manifest</div>
                <div className="text-xs text-gray-600 mb-2">
                  artifactType: <code className="bg-gray-100 px-1 rounded">application/vnd.org.margo.app.v1+json</code>
                </div>
                <div className="flex gap-2 flex-wrap">
                  {/* Application Description blob */}
                  <div className="bg-teal-100 border border-teal-300 rounded p-2 text-xs text-center">
                    <div className="font-bold text-teal-800">Layer: Application Description</div>
                    <div className="text-teal-600 mt-0.5">margo.yaml</div>
                    <div className="text-teal-500 mt-0.5 italic">mediaType: application/vnd.margo.app.description.v1+yaml</div>
                    <div className="mt-2 text-gray-600">
                      <div className="font-semibold">Contains:</div>
                      <ul className="text-left list-disc list-inside">
                        <li>apiVersion, kind: ApplicationDescription</li>
                        <li>metadata (name, version, author)</li>
                        <li>deploymentProfiles (helm.v3 / compose)</li>
                        <li>parameters (configurable values)</li>
                        <li>configuration (UI display rules)</li>
                      </ul>
                    </div>
                  </div>

                  {/* Resource blobs */}
                  <div className="bg-teal-50 border border-teal-200 rounded p-2 text-xs text-center flex flex-col gap-1">
                    <div className="font-bold text-teal-700">Layer: Icon</div>
                    <div className="text-teal-500 italic">mediaType: application/vnd.margo.app.icon.v1+jpeg</div>
                    <div className="mt-1 font-bold text-teal-700">Layer: Description</div>
                    <div className="text-teal-500 italic">mediaType: application/vnd.margo.app.description.v1+markdown</div>
                    <div className="mt-1 font-bold text-teal-700">Layer: License</div>
                    <div className="text-teal-500 italic">mediaType: application/vnd.margo.app.license.v1+text</div>
                    <div className="mt-1 font-bold text-teal-700">Layer: Release Notes</div>
                    <div className="text-teal-500 italic">mediaType: application/vnd.margo.app.releasenotes.v1+markdown</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Component Registries below */}
        <div className="flex gap-4 justify-center flex-wrap">
          <div className="flex flex-col items-center">
            <div className="text-xs text-muted-foreground mb-1">Application Description references →</div>
            <div className="flex gap-4">
              <div className="border-2 border-orange-300 rounded-xl p-4 bg-orange-50">
                <div className="text-xs font-bold text-orange-600 uppercase tracking-wider mb-2">
                  Component Registry
                </div>
                <div className="flex gap-3">
                  <C4Box
                    title="Helm Chart"
                    type="Component"
                    description="For Kubernetes-based Standalone Cluster devices"
                    technology="Helm v3"
                    color="orange"
                    size="sm"
                  />
                  <div className="flex items-center text-muted-foreground font-bold text-lg">+</div>
                  <C4Box
                    title="Compose Archive"
                    type="Component"
                    description="For Compose-based Standalone Device targets"
                    technology=".tar.gz (compose.yaml)"
                    color="orange"
                    size="sm"
                  />
                </div>
                <div className="text-xs text-orange-600 mt-2 text-center">
                  Each component links to Container Images
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* WFM pulls and deploys */}
        <div className="flex items-center justify-center gap-4">
          <C4Box
            title="Workload Fleet Manager"
            type="Software System"
            description="Pulls App Package from registry, presents in Application Catalog, generates ApplicationDeployment YAMLs"
            color="blue"
            size="md"
          />
          <C4Arrow direction="right" label="sends ApplicationDeployment YAML" technology="Margo Desired State API" />
          <C4Box
            title="Edge Compute Device"
            type="Software System"
            description="WFM Client Agent receives ApplicationDeployment YAML and installs as workloads"
            color="green"
            size="md"
          />
        </div>

        {/* ApplicationDeployment YAML structure */}
        <div className="border border-gray-200 rounded-xl p-4 bg-white">
          <div className="text-sm font-bold text-foreground mb-3">ApplicationDeployment YAML Structure (from Desired State)</div>
          <div className="grid grid-cols-2 gap-4 text-xs">
            <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
              <div className="font-bold text-gray-700 mb-1">apiVersion + kind: ApplicationDeployment</div>
              <div className="font-semibold text-gray-600 mb-1">metadata</div>
              <ul className="list-disc list-inside text-gray-600 space-y-0.5">
                <li>annotations.applicationId</li>
                <li>annotations.id (deployment UUID)</li>
                <li>name (Kubernetes manifest name)</li>
                <li>namespace</li>
              </ul>
            </div>
            <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
              <div className="font-semibold text-gray-600 mb-1">spec</div>
              <ul className="list-disc list-inside text-gray-600 space-y-0.5">
                <li>deploymentProfile.type (helm.v3 or compose)</li>
                <li>deploymentProfile.components[]
                  <ul className="list-disc list-inside ml-3">
                    <li>name</li>
                    <li>properties[] (repo, revision, etc.)</li>
                  </ul>
                </li>
                <li>parameters[] (name, value, targets)</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </DiagramFrame>
  );
}
