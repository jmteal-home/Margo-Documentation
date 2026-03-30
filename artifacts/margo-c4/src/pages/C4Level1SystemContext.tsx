import { DiagramFrame } from "../components/DiagramFrame";
import { C4Box } from "../components/C4Box";
import { C4Arrow } from "../components/C4Arrow";
import { GroupBoundary } from "../components/GroupBoundary";

export function C4Level1SystemContext() {
  return (
    <DiagramFrame
      level="C4 Level 1"
      levelColor="bg-blue-100 text-blue-800"
      title="System Context Diagram"
      description="The highest-level view of Project Margo — showing the key actors and software systems, and how they interact across the open standard boundary."
      legend={[
        { color: "bg-blue-700", label: "Workload Fleet Manager" },
        { color: "bg-emerald-700", label: "Edge Compute Device" },
        { color: "bg-teal-700", label: "Application Registry" },
      ]}
      references={[
        { label: "Project Margo — docs.margo.org", url: "https://docs.margo.org/" },
        { label: "GitHub: margo/specification", url: "https://github.com/margo/specification" },
        { label: "Margo Specification: Actors & Roles", url: "https://docs.margo.org/spec/actors/" },
        { label: "Margo Specification: System Overview", url: "https://docs.margo.org/spec/overview/" },
      ]}
      minWidth={1060}
    >
      {/* ── Row 1: People ── */}
      <div className="flex justify-center gap-16 mb-2">
        <C4Box
          title="Application Developer"
          subtitle="Person"
          variant="person"
          color="orange"
          description="Creates and publishes Margo-compliant Application Packages to an OCI registry."
          width={190}
        />
        <C4Box
          title="Operator"
          subtitle="Person"
          variant="person"
          color="violet"
          description="Uses the WFM console to configure, deploy, and monitor workloads across edge devices."
          width={190}
        />
      </div>

      {/* ── Row 1 → 2: arrows down from people ── */}
      <div className="flex justify-center gap-16 mb-2">
        <C4Arrow direction="down" label="Uploads App Package" technology="OCI Distribution Spec" length={56} />
        <C4Arrow direction="down" label="Configures & monitors" technology="WFM Web UI / REST" length={56} />
      </div>

      {/* ── Row 2: Margo ecosystem boundary ── */}
      <GroupBoundary
        title="Margo Ecosystem — Open Standard Boundary"
        dashed
        borderColor="border-blue-400"
        className="mb-0"
      >
        <div className="flex items-center justify-center gap-6">
          <C4Box
            title="Application Registry"
            subtitle="Software System"
            variant="system"
            color="teal"
            description="OCI-compliant registry that stores versioned Application Packages — the margo.yaml descriptor, icons, Helm charts, and Compose archives."
            width={200}
          />
          <C4Arrow direction="right" label="Pulls App Packages" technology="OCI API / HTTPS" bidirectional />
          <C4Box
            title="Workload Fleet Manager (WFM)"
            subtitle="Software System"
            variant="system"
            color="blue"
            description="Central management server. Maintains device registry, Application Catalog, and per-device desired state. Implements the Margo Management Interface REST API."
            width={215}
          />
          <C4Arrow direction="right" label="Desired State (pull) / Status (push)" technology="Margo REST API + RFC 9421" bidirectional />
          <C4Box
            title="Edge Compute Device"
            subtitle="Software System"
            variant="system"
            color="emerald"
            description="Industrial or field device running the WFM Client Agent. Polls for desired state and installs workloads via Helm v3 or Docker Compose."
            width={200}
          />
        </div>
      </GroupBoundary>

      {/*
        ── Row 3: upward arrows + external systems ──
        Each column is positioned to roughly align under its connected ecosystem system.
        App Registry width=200, WFM width=215, Edge Device width=200.
        GroupBoundary inner gap is gap-6 (24px), arrows default to 80px wide.
        We align the 3 external columns using padding to match the ecosystem widths.
      */}
      <div className="flex justify-center">
        {/* Outer spacer matches GroupBoundary's p-5 (20px) left padding */}
        <div className="flex items-start" style={{ gap: 0 }}>

          {/* Column A: Component Registry — aligned under Application Registry (200px) */}
          <div className="flex flex-col items-center" style={{ width: 200 }}>
            <C4Arrow direction="up" label="Stores Helm/Compose components" technology="OCI push" length={52} />
            <C4Box
              title="Component Registry"
              subtitle="External System"
              variant="external"
              description="OCI registry hosting deployable Helm Charts and Compose Archives referenced by Application Packages."
              width={190}
            />
          </div>

          {/* Spacer matching first arrow (80px) + two gap-6 (24px each) = 128px */}
          <div style={{ width: 128 }} />

          {/* Column B: PKI / CA — aligned under WFM (215px) */}
          <div className="flex flex-col items-center" style={{ width: 215 }}>
            <C4Arrow direction="up" label="Issues X.509 client certs" length={52} />
            <C4Box
              title="PKI / Certificate Authority"
              subtitle="External System"
              variant="external"
              description="Issues X.509 client certificates used by devices to sign Margo API requests via RFC 9421."
              width={190}
            />
          </div>

          {/* Spacer matching second arrow (80px) + two gap-6 (24px each) = 128px */}
          <div style={{ width: 128 }} />

          {/* Column C: Container Image Registry — aligned under Edge Compute Device (200px) */}
          <div className="flex flex-col items-center" style={{ width: 200 }}>
            <C4Arrow direction="up" label="Pulls container images" technology="OCI / HTTPS" length={52} />
            <C4Box
              title="Container Image Registry"
              subtitle="External System"
              variant="external"
              description="Registry hosting the container images used by Helm and Compose workloads (e.g. Docker Hub, GHCR)."
              width={190}
            />
          </div>
        </div>
      </div>

      <div className="mt-4 text-xs text-center text-muted-foreground">
        Dashed boundary = Margo open standard scope. Vendor implementations must conform to the specification at this boundary.
      </div>
    </DiagramFrame>
  );
}
