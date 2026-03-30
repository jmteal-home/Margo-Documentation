import { useState, useCallback } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  YAML_FIELD_DOCS,
  EXAMPLE_1,
  EXAMPLE_2,
  validateApplicationDescription,
  type ValidationCheck,
} from "@/data/yamlDocs";

// ── YAML line tokenizer ──────────────────────────────────────────────────────

interface YamlToken {
  type: "indent" | "key" | "colon" | "value" | "comment" | "list-dash" | "text";
  content: string;
  doc?: (typeof YAML_FIELD_DOCS)[string];
}

// Colour palette for syntax tokens
const TOKEN_COLORS: Record<YamlToken["type"], string> = {
  indent: "",
  key: "text-blue-700 font-semibold",
  colon: "text-gray-500",
  value: "text-emerald-700",
  comment: "text-gray-400 italic",
  "list-dash": "text-gray-400",
  text: "text-gray-800",
};

function tokenizeLine(line: string): YamlToken[] {
  // Comment
  if (/^\s*#/.test(line)) {
    return [{ type: "comment", content: line }];
  }

  // Match: optional indent + optional "- " + key + ":" + rest
  const m = line.match(/^(\s*)((-\s+)?)([a-zA-Z_][a-zA-Z0-9_]*)(\s*:)(.*)$/);
  if (m) {
    const [, indent, , dash, key, colon, rest] = m;
    const doc = YAML_FIELD_DOCS[key];
    const tokens: YamlToken[] = [];
    if (indent) tokens.push({ type: "indent", content: indent });
    if (dash) tokens.push({ type: "list-dash", content: dash });
    tokens.push({ type: "key", content: key, doc });
    tokens.push({ type: "colon", content: colon });
    if (rest.trim()) tokens.push({ type: "value", content: rest });
    return tokens;
  }

  // List item with only a dash and value (no key)
  const listM = line.match(/^(\s*-\s+)(.+)$/);
  if (listM) {
    return [
      { type: "list-dash", content: listM[1] },
      { type: "value", content: listM[2] },
    ];
  }

  return [{ type: "text", content: line }];
}

// ── Annotated YAML Renderer ──────────────────────────────────────────────────

function AnnotatedYaml({ yaml }: { yaml: string }) {
  const lines = yaml.split("\n");

  return (
    <pre className="font-mono text-[13px] leading-6 select-text whitespace-pre-wrap break-all p-4">
      {lines.map((line, i) => {
        const tokens = tokenizeLine(line);
        return (
          <div key={i} className="hover:bg-blue-50/40 rounded-sm transition-colors min-h-[1.5rem]">
            {tokens.map((tok, j) => {
              if (tok.type === "key" && tok.doc) {
                return (
                  <Tooltip key={j} delayDuration={150}>
                    <TooltipTrigger asChild>
                      <span
                        className={`${TOKEN_COLORS[tok.type]} underline decoration-dotted decoration-blue-400 cursor-help`}
                      >
                        {tok.content}
                      </span>
                    </TooltipTrigger>
                    <TooltipContent
                      side="top"
                      className="max-w-sm p-0 bg-white border border-border shadow-xl rounded-lg overflow-hidden"
                    >
                      <div className="bg-[hsl(222,72%,30%)] px-3 py-2 text-white">
                        <div className="font-bold text-sm">{tok.doc.label}</div>
                        <div className="text-[11px] text-blue-200 mt-0.5">{tok.doc.section}</div>
                      </div>
                      <div className="px-3 py-2 space-y-1.5">
                        <div className="flex gap-2 flex-wrap">
                          <span className="text-[10px] font-mono bg-gray-100 text-gray-700 px-1.5 py-0.5 rounded">
                            {tok.doc.type}
                          </span>
                          <span
                            className={`text-[10px] font-semibold px-1.5 py-0.5 rounded ${
                              tok.doc.required
                                ? "bg-red-100 text-red-700"
                                : "bg-gray-100 text-gray-500"
                            }`}
                          >
                            {tok.doc.required ? "Required" : "Optional"}
                          </span>
                        </div>
                        <p className="text-xs text-gray-700 leading-relaxed">{tok.doc.description}</p>
                        <a
                          href={tok.doc.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[10px] text-blue-600 hover:underline flex items-center gap-0.5"
                          onClick={(e) => e.stopPropagation()}
                        >
                          ↗ View spec
                        </a>
                      </div>
                    </TooltipContent>
                  </Tooltip>
                );
              }

              if (tok.type === "key") {
                // Known YAML key but no doc entry — still colour it
                return (
                  <span key={j} className={TOKEN_COLORS[tok.type]}>
                    {tok.content}
                  </span>
                );
              }

              return (
                <span key={j} className={TOKEN_COLORS[tok.type]}>
                  {tok.content}
                </span>
              );
            })}
          </div>
        );
      })}
    </pre>
  );
}

// ── Validation Results ────────────────────────────────────────────────────────

function ValidationPanel({ checks }: { checks: ValidationCheck[] }) {
  const passed = checks.filter((c) => c.valid).length;
  const total = checks.length;
  const allPass = passed === total;

  return (
    <div className="border border-border rounded-xl bg-white overflow-hidden">
      <div
        className={`px-4 py-2.5 flex items-center gap-2 ${
          allPass ? "bg-emerald-50 border-b border-emerald-200" : "bg-amber-50 border-b border-amber-200"
        }`}
      >
        <span className={`text-lg ${allPass ? "text-emerald-600" : "text-amber-500"}`}>
          {allPass ? "✅" : "⚠️"}
        </span>
        <span className="text-sm font-semibold text-foreground">
          Validation — {passed}/{total} checks passed
        </span>
        <a
          href="https://docs.margo.org/specification/applications/application-description#top-level-attributes"
          target="_blank"
          rel="noopener noreferrer"
          className="ml-auto text-xs text-blue-600 hover:underline"
        >
          ↗ Full spec
        </a>
      </div>
      <div className="p-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
        {checks.map((check) => (
          <div
            key={check.id}
            className={`flex items-start gap-2 rounded-md px-2.5 py-2 text-xs border ${
              check.valid
                ? "bg-emerald-50 border-emerald-200 text-emerald-800"
                : "bg-red-50 border-red-200 text-red-800"
            }`}
          >
            <span className="flex-shrink-0 mt-0.5">{check.valid ? "✓" : "✗"}</span>
            <div>
              <div className="font-semibold">{check.label}</div>
              {!check.valid && check.error && (
                <div className="mt-0.5 text-[11px] opacity-80">{check.error}</div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────

export function AppDescriptionEditor() {
  const [yaml, setYaml] = useState(EXAMPLE_1);
  const [activeExample, setActiveExample] = useState<1 | 2>(1);
  const [showValidation, setShowValidation] = useState(false);
  const [validationResults, setValidationResults] = useState<ValidationCheck[]>([]);

  const loadExample = useCallback(
    (n: 1 | 2) => {
      setActiveExample(n);
      setYaml(n === 1 ? EXAMPLE_1 : EXAMPLE_2);
      setShowValidation(false);
    },
    []
  );

  const handleValidate = () => {
    setValidationResults(validateApplicationDescription(yaml));
    setShowValidation(true);
  };

  return (
    <TooltipProvider>
      <div className="space-y-4 pb-6">
        {/* ── Header ── */}
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold uppercase tracking-widest px-2.5 py-1 rounded-md bg-teal-100 text-teal-800">
              Spec Tool
            </span>
            <h2 className="text-2xl font-bold text-foreground">Application Description Editor</h2>
          </div>
          <p className="text-sm text-muted-foreground max-w-3xl leading-relaxed">
            Edit and validate a Margo{" "}
            <code className="text-xs bg-gray-100 px-1 rounded">margo.yaml</code>{" "}
            Application Description file. Hover over any highlighted key in the annotated view to see its specification — type, required status, and description.
          </p>
        </div>

        {/* ── Toolbar ── */}
        <div className="flex items-center gap-3 flex-wrap">
          <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Load Example:
          </span>
          {([1, 2] as const).map((n) => (
            <button
              key={n}
              onClick={() => loadExample(n)}
              className={`px-3 py-1.5 rounded-md text-sm font-medium border transition-colors ${
                activeExample === n
                  ? "bg-[hsl(222,72%,30%)] text-white border-transparent"
                  : "bg-white text-foreground border-border hover:bg-secondary"
              }`}
            >
              Example {n}
              {n === 1 && (
                <span className="ml-1.5 text-[10px] opacity-70">
                  (Simple — Helm)
                </span>
              )}
              {n === 2 && (
                <span className="ml-1.5 text-[10px] opacity-70">
                  (Helm + Compose)
                </span>
              )}
            </button>
          ))}
          <div className="flex-1" />
          <button
            onClick={handleValidate}
            className="px-4 py-1.5 rounded-md text-sm font-medium bg-emerald-600 text-white hover:bg-emerald-700 transition-colors border border-emerald-700"
          >
            Validate YAML
          </button>
          <a
            href="https://docs.margo.org/specification/applications/application-description"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-blue-600 hover:text-blue-800 hover:underline flex items-center gap-1"
          >
            ↗ Full Specification
          </a>
        </div>

        {/* ── Validation results ── */}
        {showValidation && <ValidationPanel checks={validationResults} />}

        {/* ── Split editor ── */}
        <div className="grid grid-cols-2 gap-4 min-h-[640px]">
          {/* Left: Editable textarea */}
          <div className="flex flex-col border border-border rounded-xl bg-white overflow-hidden shadow-sm">
            <div className="flex items-center gap-2 px-4 py-2 border-b border-border bg-gray-50">
              <div className="w-2.5 h-2.5 rounded-full bg-gray-300" />
              <span className="text-xs font-semibold text-muted-foreground">YAML Editor</span>
              <span className="ml-auto text-[10px] text-muted-foreground">
                {yaml.split("\n").length} lines
              </span>
            </div>
            <textarea
              value={yaml}
              onChange={(e) => {
                setYaml(e.target.value);
                setShowValidation(false);
              }}
              spellCheck={false}
              className="flex-1 p-4 font-mono text-[13px] leading-6 text-gray-800 resize-none outline-none bg-white focus:ring-2 focus:ring-blue-200 focus:ring-inset"
              placeholder="Paste or type your margo.yaml here…"
            />
          </div>

          {/* Right: Annotated syntax-highlighted view */}
          <div className="flex flex-col border border-border rounded-xl bg-white overflow-hidden shadow-sm">
            <div className="flex items-center gap-2 px-4 py-2 border-b border-border bg-gray-50">
              <div className="w-2.5 h-2.5 rounded-full bg-blue-400" />
              <span className="text-xs font-semibold text-muted-foreground">
                Annotated View
              </span>
              <span className="ml-auto flex items-center gap-1 text-[10px] text-muted-foreground">
                <span className="underline decoration-dotted decoration-blue-400">underlined keys</span>
                <span>= hover for spec docs</span>
              </span>
            </div>
            <div className="flex-1 overflow-auto diagram-scroll">
              <AnnotatedYaml yaml={yaml} />
            </div>
          </div>
        </div>

        {/* ── Field reference legend ── */}
        <div className="bg-white border border-border rounded-xl p-4">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
            Quick Field Reference
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
            {Object.entries(YAML_FIELD_DOCS)
              .filter(([, doc]) => doc.required)
              .map(([key, doc]) => (
                <div
                  key={key}
                  className="flex items-start gap-2 text-xs border border-red-100 rounded-md px-2.5 py-2 bg-red-50"
                >
                  <span className="font-mono font-bold text-blue-700 flex-shrink-0">{key}:</span>
                  <div>
                    <span className="font-semibold text-red-700 text-[10px] uppercase tracking-wide">
                      Required ·{" "}
                    </span>
                    <span className="text-gray-600">{doc.description.split('.')[0]}.</span>
                  </div>
                </div>
              ))}
          </div>
          <div className="mt-3 pt-3 border-t border-border">
            <p className="text-xs text-muted-foreground">
              Optional fields and full schema validation rules are documented at{" "}
              <a
                href="https://docs.margo.org/specification/applications/application-description"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                docs.margo.org/specification/applications/application-description
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
}
