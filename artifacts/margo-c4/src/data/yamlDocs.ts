const BASE = "https://docs.margo.org/specification/applications/application-description";

export interface FieldDoc {
  label: string;
  section: string;
  type: string;
  required: boolean;
  description: string;
  link: string;
}

export const YAML_FIELD_DOCS: Record<string, FieldDoc> = {
  // ── Top-level ───────────────────────────────────────────────────────────────
  apiVersion: {
    label: "apiVersion",
    section: "Top-level",
    type: "string",
    required: true,
    description:
      "Identifier of the version of the API the object definition follows. Current value is margo.org/v1-alpha1.",
    link: `${BASE}#top-level-attributes`,
  },
  kind: {
    label: "kind",
    section: "Top-level",
    type: "string",
    required: true,
    description: "Specifies the object type. Must be ApplicationDescription.",
    link: `${BASE}#top-level-attributes`,
  },
  metadata: {
    label: "metadata",
    section: "Top-level",
    type: "Metadata",
    required: true,
    description:
      "Metadata element specifying characteristics about the application — including id, name, version, and catalog information.",
    link: `${BASE}#top-level-attributes`,
  },
  deploymentProfiles: {
    label: "deploymentProfiles",
    section: "Top-level",
    type: "[]DeploymentProfile",
    required: true,
    description:
      "Deployment profiles specifying the types of deployments the application supports. Each profile targets either helm.v3 (Kubernetes) or compose (Docker/Podman).",
    link: `${BASE}#top-level-attributes`,
  },
  parameters: {
    label: "parameters",
    section: "Top-level",
    type: "map[string][Parameter]",
    required: false,
    description:
      "Named configurable parameters used when installing or updating the application. Values can be string, integer, double, boolean, or arrays thereof.",
    link: `${BASE}#top-level-attributes`,
  },
  configuration: {
    label: "configuration",
    section: "Top-level",
    type: "Configuration",
    required: false,
    description:
      "Specifies how parameters should be displayed to the user (sections/settings layout) and validated (schema rules).",
    link: `${BASE}#top-level-attributes`,
  },

  // ── Metadata ────────────────────────────────────────────────────────────────
  id: {
    label: "id",
    section: "Metadata",
    type: "string",
    required: true,
    description:
      "Unique identifier for the application. Must be lowercase letters, numbers, and dashes only — no uppercase, underscores, or periods. Max 200 characters.",
    link: `${BASE}#metadata-attributes`,
  },
  name: {
    label: "name",
    section: "Metadata / Component / Section / Setting / Schema",
    type: "string",
    required: true,
    description:
      "A display name. In Metadata, this is the application's official name (may include spaces/special chars). In Component, it is the unique component identifier (lowercase + dashes only).",
    link: `${BASE}#metadata-attributes`,
  },
  description: {
    label: "description",
    section: "Metadata / DeploymentProfile / Setting",
    type: "string",
    required: false,
    description:
      "A human-readable description. In Metadata, describes the application. In DeploymentProfile, gives context about the profile's purpose, use case, and resource requirements.",
    link: `${BASE}#metadata-attributes`,
  },
  version: {
    label: "version",
    section: "Metadata",
    type: "string",
    required: true,
    description: "The application's version string (e.g. \"1.0\" or \"1.2.1\").",
    link: `${BASE}#metadata-attributes`,
  },
  catalog: {
    label: "catalog",
    section: "Metadata",
    type: "Catalog",
    required: true,
    description:
      "Catalog element providing metadata for the application's discovery in a WFM Application Catalog — including display info, author, and organization.",
    link: `${BASE}#catalog-attributes`,
  },

  // ── Catalog ─────────────────────────────────────────────────────────────────
  application: {
    label: "application",
    section: "Catalog",
    type: "ApplicationMetadata",
    required: false,
    description:
      "Application-specific catalog metadata: icon, tagline, description file, release notes, license file, website, and tags.",
    link: `${BASE}#catalog-attributes`,
  },
  author: {
    label: "author",
    section: "Catalog",
    type: "[]Author",
    required: false,
    description: "List of authors of the application, each with a name and optional email address.",
    link: `${BASE}#catalog-attributes`,
  },
  organization: {
    label: "organization",
    section: "Catalog",
    type: "[]Organization",
    required: true,
    description:
      "List of organizations responsible for the application's development and distribution. Each entry requires a name and optionally a website.",
    link: `${BASE}#catalog-attributes`,
  },

  // ── ApplicationMetadata ─────────────────────────────────────────────────────
  icon: {
    label: "icon",
    section: "ApplicationMetadata",
    type: "string",
    required: false,
    description: "Link to the application's icon file (e.g., PNG format).",
    link: `${BASE}#applicationmetadata-attributes`,
  },
  tagline: {
    label: "tagline",
    section: "ApplicationMetadata",
    type: "string",
    required: false,
    description: "The application's slogan/tagline for display in catalog UIs.",
    link: `${BASE}#applicationmetadata-attributes`,
  },
  descriptionFile: {
    label: "descriptionFile",
    section: "ApplicationMetadata",
    type: "string",
    required: false,
    description: "Link to a Markdown file containing the application's full description.",
    link: `${BASE}#applicationmetadata-attributes`,
  },
  releaseNotes: {
    label: "releaseNotes",
    section: "ApplicationMetadata",
    type: "string",
    required: false,
    description: "Link to release notes file (Markdown or PDF).",
    link: `${BASE}#applicationmetadata-attributes`,
  },
  licenseFile: {
    label: "licenseFile",
    section: "ApplicationMetadata",
    type: "string",
    required: false,
    description: "Link to the application's license file (plain text, Markdown, or PDF).",
    link: `${BASE}#applicationmetadata-attributes`,
  },
  site: {
    label: "site",
    section: "ApplicationMetadata / Organization",
    type: "string",
    required: false,
    description:
      "URL of the application's or organization's website.",
    link: `${BASE}#applicationmetadata-attributes`,
  },
  tags: {
    label: "tags",
    section: "ApplicationMetadata",
    type: "[]string",
    required: false,
    description:
      "Array of strings providing additional context for categorizing/searching the application in a WFM catalog UI.",
    link: `${BASE}#applicationmetadata-attributes`,
  },

  // ── Author / Organization ────────────────────────────────────────────────────
  email: {
    label: "email",
    section: "Author",
    type: "string",
    required: false,
    description: "Email address of the application's author/creator.",
    link: `${BASE}#author-attributes`,
  },

  // ── DeploymentProfile ────────────────────────────────────────────────────────
  type: {
    label: "type",
    section: "DeploymentProfile / Peripheral / CommunicationInterface",
    type: "string",
    required: true,
    description:
      "In DeploymentProfile: must be helm.v3 (Kubernetes) or compose (Docker/Podman). In Peripheral: e.g. gpu, display, camera. In CommunicationInterface: e.g. ethernet, wifi, bluetooth.",
    link: `${BASE}#deploymentprofile-attributes`,
  },
  components: {
    label: "components",
    section: "DeploymentProfile / Target",
    type: "[]Component",
    required: true,
    description:
      "In DeploymentProfile: ordered list of components to deploy. Device installs them in the listed order. In Target: array of component names the parameter applies to.",
    link: `${BASE}#deploymentprofile-attributes`,
  },
  requiredResources: {
    label: "requiredResources",
    section: "DeploymentProfile",
    type: "RequiredResources",
    required: false,
    description:
      "Resources required for this deployment profile: cpu, memory, storage, peripherals, and communication interfaces.",
    link: `${BASE}#deploymentprofile-attributes`,
  },

  // ── RequiredResources ────────────────────────────────────────────────────────
  cpu: {
    label: "cpu",
    section: "RequiredResources",
    type: "CPU",
    required: false,
    description:
      "CPU requirements: cores (decimal CPU units, e.g. 1.5) and optionally supported architectures (amd64, x86_64, arm64, arm).",
    link: `${BASE}#requiredresources-attributes`,
  },
  memory: {
    label: "memory",
    section: "RequiredResources",
    type: "string",
    required: false,
    description:
      "Minimum memory required, in binary units: Ki (Kibibytes), Mi (Mebibytes), Gi (Gibibytes). E.g. 1024Mi.",
    link: `${BASE}#requiredresources-attributes`,
  },
  storage: {
    label: "storage",
    section: "RequiredResources",
    type: "string",
    required: false,
    description:
      "Storage required (installed app + data). Binary units: Ki, Mi, Gi, Ti, Pi, Ei. The device MUST provide this amount after deployment.",
    link: `${BASE}#requiredresources-attributes`,
  },
  peripherals: {
    label: "peripherals",
    section: "RequiredResources",
    type: "[]Peripheral",
    required: false,
    description:
      "List of required peripheral hardware. Each peripheral has a type (e.g. gpu, display, camera, microphone, speaker) and optional manufacturer/model.",
    link: `${BASE}#requiredresources-attributes`,
  },
  interfaces: {
    label: "interfaces",
    section: "RequiredResources",
    type: "[]CommunicationInterface",
    required: false,
    description:
      "List of required communication interfaces. Types include: ethernet, wifi, cellular, bluetooth, usb, canbus, rs232.",
    link: `${BASE}#requiredresources-attributes`,
  },

  // ── CPU ──────────────────────────────────────────────────────────────────────
  cores: {
    label: "cores",
    section: "CPU",
    type: "double",
    required: true,
    description:
      "Number of CPU cores required (decimal, e.g. 0.5 = half a core, 1.5 = one-and-a-half). The device MUST provide this after deployment.",
    link: `${BASE}#cpu-attributes`,
  },
  architectures: {
    label: "architectures",
    section: "CPU",
    type: "[]CpuArchitectureType",
    required: false,
    description: "Supported CPU architectures (e.g. amd64, x86_64, arm64, arm).",
    link: `${BASE}#cpu-attributes`,
  },

  // ── Component / ComponentProperties ──────────────────────────────────────────
  properties: {
    label: "properties",
    section: "Component",
    type: "ComponentProperties",
    required: true,
    description:
      "Deployment properties for the component. For helm.v3: repository (OCI URL) + revision (chart version). For compose: packageLocation (archive URL) + optional keyLocation.",
    link: `${BASE}#component-attributes`,
  },
  repository: {
    label: "repository",
    section: "ComponentProperties (helm.v3)",
    type: "string",
    required: true,
    description: "OCI URL of the Helm chart (e.g. oci://registry.example.com/charts/my-app).",
    link: `${BASE}#componentproperties-attributes`,
  },
  revision: {
    label: "revision",
    section: "ComponentProperties (helm.v3)",
    type: "string",
    required: true,
    description: "Full version of the Helm chart to deploy (e.g. 1.0.1).",
    link: `${BASE}#componentproperties-attributes`,
  },
  wait: {
    label: "wait",
    section: "ComponentProperties",
    type: "bool",
    required: false,
    description:
      "If true (default), the device waits for this component to finish installing before starting the next one. Applies when multiple components are listed.",
    link: `${BASE}#componentproperties-attributes`,
  },
  timeout: {
    label: "timeout",
    section: "ComponentProperties",
    type: "string",
    required: false,
    description:
      "Maximum time to wait for installation completion. Format: ##m##s (e.g. 8m30s). If exceeded, the installation fails.",
    link: `${BASE}#componentproperties-attributes`,
  },
  packageLocation: {
    label: "packageLocation",
    section: "ComponentProperties (compose)",
    type: "string",
    required: true,
    description:
      "URL of the Compose archive (.tar.gz) containing the compose.yaml and referenced assets.",
    link: `${BASE}#componentproperties-attributes`,
  },
  keyLocation: {
    label: "keyLocation",
    section: "ComponentProperties (compose)",
    type: "string",
    required: false,
    description:
      "URL of the PGP public key used to verify the digitally-signed Compose package. Highly recommended.",
    link: `${BASE}#componentproperties-attributes`,
  },

  // ── Parameters ───────────────────────────────────────────────────────────────
  value: {
    label: "value",
    section: "Parameter",
    type: "string | integer | double | boolean | array",
    required: false,
    description:
      "Default value for this parameter. Accepted types: string, integer, double, boolean, and arrays of these types.",
    link: `${BASE}#parameter-attributes`,
  },
  targets: {
    label: "targets",
    section: "Parameter",
    type: "[]Target",
    required: true,
    description:
      "Specifies which component(s) and field(s) this parameter applies to when installing or updating.",
    link: `${BASE}#parameter-attributes`,
  },
  pointer: {
    label: "pointer",
    section: "Target",
    type: "string",
    required: true,
    description:
      "For helm.v3: dot-notation path into values.yaml (same as helm --set). For compose: name of the environment variable to set (ENV.VAR_NAME).",
    link: `${BASE}#target-attributes`,
  },

  // ── Configuration ─────────────────────────────────────────────────────────────
  sections: {
    label: "sections",
    section: "Configuration",
    type: "[]Section",
    required: true,
    description:
      "Groups of related parameters for logical display in the WFM operator UI. Each section has a name and a list of settings.",
    link: `${BASE}#configuration-attributes`,
  },
  schema: {
    label: "schema",
    section: "Configuration / Setting",
    type: "[]Schema | string",
    required: true,
    description:
      "In Configuration: defines validation rules (dataType, min/max, regex, allowEmpty) for parameters. In Setting: references a schema rule by name.",
    link: `${BASE}#configuration-attributes`,
  },
  settings: {
    label: "settings",
    section: "Section",
    type: "[]Setting",
    required: true,
    description:
      "Display instructions for how the WFM should present each parameter to the operator for input.",
    link: `${BASE}#section-attributes`,
  },
  parameter: {
    label: "parameter",
    section: "Setting",
    type: "string",
    required: true,
    description: "Name of the parameter (from the parameters map) that this setting controls.",
    link: `${BASE}#setting-attributes`,
  },
  immutable: {
    label: "immutable",
    section: "Setting",
    type: "boolean",
    required: false,
    description:
      "If true, the parameter value MUST NOT be changed after initial install. Default is false.",
    link: `${BASE}#setting-attributes`,
  },
  dataType: {
    label: "dataType",
    section: "Schema",
    type: "string",
    required: true,
    description:
      "Data type for validation: string, integer, double, or boolean.",
    link: `${BASE}#schema-attributes`,
  },
  minLength: {
    label: "minLength",
    section: "Schema",
    type: "integer",
    required: false,
    description: "Minimum length constraint for string parameters.",
    link: `${BASE}#schema-attributes`,
  },
  maxLength: {
    label: "maxLength",
    section: "Schema",
    type: "integer",
    required: false,
    description: "Maximum length constraint for string parameters.",
    link: `${BASE}#schema-attributes`,
  },
  allowEmpty: {
    label: "allowEmpty",
    section: "Schema",
    type: "boolean",
    required: false,
    description:
      "If false, the parameter value must not be empty. If true, an empty value is accepted.",
    link: `${BASE}#schema-attributes`,
  },
  minValue: {
    label: "minValue",
    section: "Schema",
    type: "number",
    required: false,
    description: "Minimum numeric value constraint for integer or double parameters.",
    link: `${BASE}#schema-attributes`,
  },
  maxValue: {
    label: "maxValue",
    section: "Schema",
    type: "number",
    required: false,
    description: "Maximum numeric value constraint for integer or double parameters.",
    link: `${BASE}#schema-attributes`,
  },
  maxPrecision: {
    label: "maxPrecision",
    section: "Schema",
    type: "integer",
    required: false,
    description: "Maximum number of decimal places allowed for double parameters.",
    link: `${BASE}#schema-attributes`,
  },
  regexMatch: {
    label: "regexMatch",
    section: "Schema",
    type: "string",
    required: false,
    description:
      "A regular expression the parameter value must match to be considered valid.",
    link: `${BASE}#schema-attributes`,
  },
  manufacturer: {
    label: "manufacturer",
    section: "Peripheral",
    type: "string",
    required: false,
    description:
      "Peripheral manufacturer name. Caution: requiring a specific manufacturer makes it harder to find compatible devices.",
    link: `${BASE}#peripheral-attributes`,
  },
  model: {
    label: "model",
    section: "Peripheral",
    type: "string",
    required: false,
    description:
      "Peripheral model name. Caution: requiring a specific model makes it harder to find compatible devices.",
    link: `${BASE}#peripheral-attributes`,
  },
};

// ── Example YAML strings ─────────────────────────────────────────────────────

export const EXAMPLE_1 = `apiVersion: margo.org/v1-alpha1
kind: ApplicationDescription
metadata:
  id: com-northstartida-hello-world
  name: Hello World
  description: A basic hello world application
  version: "1.0"
  catalog:
    application:
      icon: ./resources/hw-logo.png
      tagline: Northstar Industrial Application's hello world application.
      descriptionFile: ./resources/description.md
      releaseNotes: ./resources/release-notes.md
      licenseFile: ./resources/license.pdf
      site: http://www.northstar-ida.com
      tags: ["monitoring"]
    author:
      - name: Roger Wilkershank
        email: rpwilkershank@northstar-ida.com
    organization:
      - name: Northstar Industrial Applications
        site: http://northstar-ida.com
deploymentProfiles:
  - type: helm.v3
    id: com-northstartida-hello-world-helm.v3-a
    components:
      - name: hello-world
        properties:
          repository: oci://northstarida.azurecr.io/charts/hello-world
          revision: 1.0.1
          wait: true
parameters:
  greeting:
    value: Hello
    targets:
      - pointer: global.config.appGreeting
        components: ["hello-world"]
  greetingAddressee:
    value: World
    targets:
      - pointer: global.config.appGreetingAddressee
        components: ["hello-world"]
configuration:
  sections:
    - name: General Settings
      settings:
        - parameter: greeting
          name: Greeting
          description: The greeting to use.
          schema: requireText
        - parameter: greetingAddressee
          name: Greeting Addressee
          description: The person, or group, the greeting addresses.
          schema: requireText
  schema:
    - name: requireText
      dataType: string
      maxLength: 45
      allowEmpty: false
`;

export const EXAMPLE_2 = `apiVersion: margo.org/v1-alpha1
kind: ApplicationDescription
metadata:
  id: com-northstartida-digitron-orchestrator
  name: Digitron orchestrator
  description: The Digitron orchestrator application
  version: 1.2.1
  catalog:
    application:
      icon: ./resources/ndo-logo.png
      tagline: Northstar Industrial Application's next-gen, AI driven, Digitron instrument orchestrator.
      descriptionFile: ./resources/description.md
      releaseNotes: ./resources/release-notes.md
      licenseFile: ./resources/license.pdf
      site: http://www.northstar-ida.com
      tags: ["optimization", "instrumentation"]
    author:
      - name: Roger Wilkershank
        email: rpwilkershank@northstar-ida.com
    organization:
      - name: Northstar Industrial Applications
        site: http://northstar-ida.com
deploymentProfiles:
  - type: helm.v3
    id: com-northstartida-digitron-orchestrator-helm.v3-a
    description: This allows to install / run the application as a Helm chart deployment.
      The device where this application is installed needs to have a screen and a keyboard.
    components:
      - name: database-services
        properties:
          repository: oci://quay.io/charts/realtime-database-services
          revision: 2.3.7
          wait: true
          timeout: 8m30s
      - name: digitron-orchestrator
        properties:
          repository: oci://northstarida.azurecr.io/charts/northstarida-digitron-orchestrator
          revision: 1.0.9
          wait: true
    requiredResources:
      cpu:
        cores: 1.5
        architectures:
          - amd64
          - x86_64
      memory: 1024Mi
      storage: 10Gi
      peripherals:
        - type: gpu
          manufacturer: NVIDIA
        - type: display
      interfaces:
        - type: ethernet
        - type: bluetooth
  - type: compose
    id: com-northstartida-digitron-orchestrator-compose-a
    components:
      - name: digitron-orchestrator-docker
        properties:
          packageLocation: https://northsitarida.com/digitron/docker/digitron-orchestrator.tar.gz
          keyLocation: https://northsitarida.com/digitron/docker/public-key.asc
parameters:
  idpName:
    targets:
      - pointer: idp.name
        components: ["digitron-orchestrator"]
      - pointer: ENV.IDP_NAME
        components: ["digitron-orchestrator-docker"]
  idpProvider:
    targets:
      - pointer: idp.provider
        components: ["digitron-orchestrator"]
      - pointer: ENV.IDP_PROVIDER
        components: ["digitron-orchestrator-docker"]
  idpClientId:
    targets:
      - pointer: idp.clientId
        components: ["digitron-orchestrator"]
      - pointer: ENV.IDP_CLIENT_ID
        components: ["digitron-orchestrator-docker"]
  idpUrl:
    targets:
      - pointer: idp.providerUrl
        components: ["digitron-orchestrator"]
      - pointer: idp.providerMetadata
        components: ["digitron-orchestrator"]
      - pointer: ENV.IDP_URL
        components: ["digitron-orchestrator-docker"]
  adminName:
    targets:
      - pointer: administrator.name
        components: ["digitron-orchestrator"]
      - pointer: ENV.ADMIN_NAME
        components: ["digitron-orchestrator-docker"]
  adminPrincipalName:
    targets:
      - pointer: administrator.userPrincipalName
        components: ["digitron-orchestrator"]
      - pointer: ENV.ADMIN_PRINCIPALNAME
        components: ["digitron-orchestrator-docker"]
  pollFrequency:
    value: 30
    targets:
      - pointer: settings.pollFrequency
        components: ["digitron-orchestrator", "database-services"]
      - pointer: ENV.POLL_FREQUENCY
        components: ["digitron-orchestrator-docker"]
  siteId:
    targets:
      - pointer: settings.siteId
        components: ["digitron-orchestrator", "database-services"]
      - pointer: ENV.SITE_ID
        components: ["digitron-orchestrator-docker"]
  cpuLimit:
    value: 1
    targets:
      - pointer: settings.limits.cpu
        components: ["digitron-orchestrator"]
  memoryLimit:
    value: 16384
    targets:
      - pointer: settings.limits.memory
        components: ["digitron-orchestrator"]
configuration:
  sections:
    - name: General
      settings:
        - parameter: pollFrequency
          name: Poll Frequency
          description: How often the service polls for updated data in seconds
          schema: pollRange
        - parameter: siteId
          name: Site Id
          description: Special identifier for the site (optional)
          schema: optionalText
    - name: Identity Provider
      settings:
        - parameter: idpName
          name: Name
          description: The name of the Identity Provider to use
          immutable: true
          schema: requiredText
        - parameter: idpProvider
          name: Provider
          description: Provider of the identity service
          immutable: true
          schema: requiredText
        - parameter: idpClientId
          name: Client ID
          description: The client id for this application
          immutable: true
          schema: requiredText
        - parameter: idpUrl
          name: Provider URL
          description: The URL of the Identity Provider
          immutable: true
          schema: url
    - name: Administrator
      settings:
        - parameter: adminName
          name: Presentation Name
          description: The presentation name of the administrator
          schema: requiredText
        - parameter: adminPrincipalName
          name: Principal Name
          description: The principal name of the administrator
          schema: email
    - name: Resource Limits
      settings:
        - parameter: cpuLimit
          name: CPU Limit
          description: Maximum number of CPU cores to allow the application to consume
          schema: cpuRange
        - parameter: memoryLimit
          name: Memory Limit
          description: Maximum memory (MB) to allow the application to consume
          schema: memoryRange
  schema:
    - name: requiredText
      dataType: string
      maxLength: 45
      allowEmpty: false
    - name: email
      dataType: string
      allowEmpty: false
      regexMatch: ".*@[a-z0-9.-]*"
    - name: url
      dataType: string
      allowEmpty: false
      regexMatch: "^(http(s):\\/\\/.)[-a-zA-Z0-9@:%._+~#=]{2,256}\\.[a-z]{2,6}\\b([-a-zA-Z0-9@:%_+.~#?&//=]*)$"
    - name: pollRange
      dataType: integer
      minValue: 30
      maxValue: 360
      allowEmpty: false
    - name: optionalText
      dataType: string
      minLength: 5
      allowEmpty: true
    - name: cpuRange
      dataType: double
      minValue: 0.5
      maxPrecision: 1
      allowEmpty: false
    - name: memoryRange
      dataType: integer
      minValue: 16384
      allowEmpty: false
`;

// ── Validation ────────────────────────────────────────────────────────────────

export interface ValidationCheck {
  id: string;
  label: string;
  description: string;
  valid: boolean;
  error?: string;
}

const hasKey = (text: string, key: string) =>
  new RegExp(`(^|\\n)\\s*${key}\\s*:`, 'm').test(text);

const getLineValue = (text: string, key: string): string | null => {
  const m = text.match(new RegExp(`(?:^|\\n)\\s*${key}\\s*:\\s*(.+)`));
  return m ? m[1].trim().replace(/^["']|["']$/g, '') : null;
};

export function validateApplicationDescription(yaml: string): ValidationCheck[] {
  const checks: ValidationCheck[] = [];

  const apiVer = getLineValue(yaml, 'apiVersion');
  checks.push({
    id: 'apiVersion',
    label: 'apiVersion present',
    description: 'Must be margo.org/v1-alpha1',
    valid: !!apiVer,
    error: !apiVer ? 'Missing required field: apiVersion' : undefined,
  });

  const kind = getLineValue(yaml, 'kind');
  checks.push({
    id: 'kind',
    label: 'kind = ApplicationDescription',
    description: 'Must be exactly "ApplicationDescription"',
    valid: kind === 'ApplicationDescription',
    error: kind !== 'ApplicationDescription' ? `Expected "ApplicationDescription", got "${kind ?? '(missing)'}"` : undefined,
  });

  const metaId = getLineValue(yaml, 'id');
  const metaIdValid = !!metaId && /^[a-z0-9-]+$/.test(metaId);
  checks.push({
    id: 'metadata.id',
    label: 'metadata.id valid',
    description: 'Lowercase letters, numbers, and dashes only. Max 200 chars.',
    valid: metaIdValid,
    error: !metaId
      ? 'Missing required field: metadata.id'
      : !metaIdValid
      ? `id "${metaId}" contains invalid characters (uppercase/underscore/period not allowed)`
      : undefined,
  });

  checks.push({
    id: 'metadata.name',
    label: 'metadata.name present',
    description: 'Application display name is required',
    valid: hasKey(yaml, 'name'),
    error: !hasKey(yaml, 'name') ? 'Missing required field: metadata.name' : undefined,
  });

  checks.push({
    id: 'metadata.version',
    label: 'metadata.version present',
    description: 'Application version string is required',
    valid: hasKey(yaml, 'version'),
    error: !hasKey(yaml, 'version') ? 'Missing required field: metadata.version' : undefined,
  });

  checks.push({
    id: 'catalog.organization',
    label: 'catalog.organization present',
    description: 'At least one organization entry is required in the catalog',
    valid: hasKey(yaml, 'organization'),
    error: !hasKey(yaml, 'organization') ? 'Missing required field: catalog.organization' : undefined,
  });

  checks.push({
    id: 'deploymentProfiles',
    label: 'deploymentProfiles present',
    description: 'At least one deployment profile (helm.v3 or compose) is required',
    valid: hasKey(yaml, 'deploymentProfiles'),
    error: !hasKey(yaml, 'deploymentProfiles') ? 'Missing required field: deploymentProfiles' : undefined,
  });

  const hasHelm = /type:\s*helm\.v3/.test(yaml);
  const hasCompose = /type:\s*compose/.test(yaml);
  checks.push({
    id: 'profile.type',
    label: 'Valid profile type(s)',
    description: 'Each deploymentProfile.type must be helm.v3 or compose',
    valid: hasHelm || hasCompose,
    error: !hasHelm && !hasCompose
      ? 'No valid deployment profile type found (expected helm.v3 or compose)'
      : undefined,
  });

  checks.push({
    id: 'component.name',
    label: 'component name(s) present',
    description: 'Each component must have a name (lowercase + dashes)',
    valid: hasKey(yaml, 'components'),
    error: !hasKey(yaml, 'components') ? 'No components found in any deployment profile' : undefined,
  });

  checks.push({
    id: 'component.properties',
    label: 'component properties present',
    description: 'Each component must have a properties block',
    valid: hasKey(yaml, 'properties'),
    error: !hasKey(yaml, 'properties') ? 'No component properties block found' : undefined,
  });

  const hasRepo = hasKey(yaml, 'repository');
  const hasPkg = hasKey(yaml, 'packageLocation');
  checks.push({
    id: 'component.location',
    label: 'Component location specified',
    description: 'helm.v3 requires repository + revision; compose requires packageLocation',
    valid: hasRepo || hasPkg,
    error: !hasRepo && !hasPkg
      ? 'No component location found (need repository for helm.v3 or packageLocation for compose)'
      : undefined,
  });

  return checks;
}
