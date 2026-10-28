/**
 * Estatus de planeacion para status-option-control del núcleo.
 * Alineado con RAW_DEFAULTS (PLANNING + tickets) del núcleo.
 */
export const STATUS_OPTION_SEED_PATH = "/api/status-option-control/seed-defaults";

export type StatusOption = { value: string; label: string; color: string; icon?: string };

export type StatusOptionSeed = {
  model_id: string;
  module_name?: string;
  status_fields?: string[];
  options: Array<StatusOption & { field_name: string }>;
};

function seed(model_id: string, field_name: string, options: StatusOption[]): StatusOptionSeed {
  return {
    model_id,
    module_name: model_id,
    status_fields: [field_name],
    options: options.map((o) => ({ ...o, field_name })),
  };
}

/** PLANNING — proyectos / tareas / mis-tareas */
export const PLANNING_STATUS_OPTIONS: StatusOption[] = [
  { value: "pendiente", label: "Pendiente", color: "#ffc107", icon: "fas fa-hourglass-half" },
  { value: "en_progreso", label: "En progreso", color: "#0dcaf0", icon: "fas fa-spinner" },
  { value: "en_revision", label: "En revisión", color: "#6f42c1", icon: "fas fa-eye" },
  { value: "bloqueado", label: "Bloqueado", color: "#dc3545", icon: "fas fa-ban" },
  { value: "completado", label: "Completado", color: "#198754", icon: "fas fa-check-circle" },
  { value: "cancelado", label: "Cancelado", color: "#212529", icon: "fas fa-times-circle" },
];

/** tickets */
export const TICKETS_STATUS_OPTIONS: StatusOption[] = [
  { value: "open", label: "Abierto", color: "#ffc107", icon: "fas fa-exclamation" },
  { value: "in_progress", label: "En proceso", color: "#0dcaf0", icon: "fas fa-gears" },
  { value: "resolved", label: "Resuelto", color: "#198754", icon: "fas fa-check" },
  { value: "closed", label: "Cerrado", color: "#6c757d", icon: "fas fa-ban" },
];

const S = "subject-planeacion";

export const STATUS_OPTION_SEEDS: StatusOptionSeed[] = [
  // RAW_DEFAULTS: planeacion-proyectos.state, mis-tareas.state, proyectos-task.status, tickets.status
  seed(`${S}/planeacion-proyectos`, "state", PLANNING_STATUS_OPTIONS),
  seed(`${S}/planeacion-mis-tareas`, "state", PLANNING_STATUS_OPTIONS),
  seed(`${S}/planeacion-proyectos-task`, "status", PLANNING_STATUS_OPTIONS),
  seed(`${S}/tickets`, "status", TICKETS_STATUS_OPTIONS),
];

export type PushStatusSeedsOptions = {
  env?: Record<string, string | undefined>;
  fetchImpl?: typeof fetch;
  timeout_ms?: number;
};

export type PushStatusSeedsResult =
  | { pushed: true; status: number; data: unknown }
  | { pushed: false; reason: string; status?: number };

export async function push_status_seeds(opts: PushStatusSeedsOptions = {}): Promise<PushStatusSeedsResult> {
  const env = opts.env ?? process.env;
  const base = (env.CORE_DATA_URL?.trim() || env.NOX_DATA_URL?.trim() || "")
    .replace(/\/api\/kirlets\/data\/.*$/, "")
    .replace(/\/+$/, "");
  const caller = env.SUBJECT_TECHNICAL_ID?.trim() || env.KIRLET_TECHNICAL_ID?.trim() || "";
  const secret = env.CORE_SUBJECT_GATEWAY_SECRET?.trim() || env.NOX_KIRLET_GATEWAY_SECRET?.trim() || "";
  if (!base || !caller || !secret) return { pushed: false, reason: "core_not_configured" };
  try {
    const res = await (opts.fetchImpl ?? fetch)(`${base}${STATUS_OPTION_SEED_PATH}`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-core-subject-gateway-secret": secret,
        "x-imperium-subject": caller,
      },
      body: JSON.stringify({ entries: STATUS_OPTION_SEEDS }),
      signal: AbortSignal.timeout(opts.timeout_ms ?? 12_000),
    });
    let data: unknown = null;
    try {
      data = await res.json();
    } catch {
      /* sin JSON */
    }
    if (!res.ok) return { pushed: false, reason: "core_refused", status: res.status };
    return { pushed: true, status: res.status, data };
  } catch (err) {
    return { pushed: false, reason: err instanceof Error ? err.message : String(err) };
  }
}
