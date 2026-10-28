import { describe, expect, test } from "bun:test";
import { readFileSync } from "node:fs";
import {
  push_status_seeds,
  STATUS_OPTION_SEED_PATH,
  STATUS_OPTION_SEEDS,
} from "./status-seeds";

describe("status seeds", () => {
  test("cada seed tiene valores únicos con campo", () => {
    for (const s of STATUS_OPTION_SEEDS) {
      const values = s.options.map((o) => o.value);
      expect(new Set(values).size).toBe(values.length);
      expect(s.options.every((o) => o.field_name === s.status_fields?.[0])).toBe(true);
      expect(
        s.options.every((o) => /^#[0-9a-f]{6}$/.test(o.color) && /^fas fa-[a-z0-9-]+$/.test(o.icon ?? "")),
      ).toBe(true);
      expect(s.model_id.startsWith("subject-planeacion/")).toBe(true);
    }
  });

  test("cubre proyectos/tareas/tickets alineados a RAW_DEFAULTS", () => {
    const ids = STATUS_OPTION_SEEDS.map((s) => `${s.model_id}:${s.status_fields?.[0]}`);
    expect(ids).toContain("subject-planeacion/planeacion-proyectos:state");
    expect(ids).toContain("subject-planeacion/planeacion-mis-tareas:state");
    expect(ids).toContain("subject-planeacion/planeacion-proyectos-task:status");
    expect(ids).toContain("subject-planeacion/tickets:status");
  });

  test("pages usan input-status sin options literales", () => {
    for (const [rel, field] of [
      ["./modules/planeacion-proyectos/planeacion-proyectos.pages.ts", "state"],
      ["./modules/planeacion-mis-tareas/planeacion-mis-tareas.pages.ts", "state"],
      ["./modules/planeacion-proyectos-task/planeacion-proyectos-task.pages.ts", "status"],
      ["./modules/tickets/tickets.pages.ts", "status"],
    ] as const) {
      const src = readFileSync(new URL(rel, import.meta.url), "utf8");
      expect(src).toMatch(new RegExp(`name: "${field}",\\n\\s+component: "input-status",`));
      expect(src).not.toMatch(new RegExp(`name: "${field}"[\\s\\S]*?options:\\s*\\[`));
    }
  });
});

describe("push_status_seeds", () => {
  const env = {
    CORE_DATA_URL: "http://core:3000/api/kirlets/data/x",
    SUBJECT_TECHNICAL_ID: "subject-planeacion",
    CORE_SUBJECT_GATEWAY_SECRET: "s",
  };
  test("sin env no llama", async () => {
    let called = false;
    const r = await push_status_seeds({
      env: {},
      fetchImpl: (async () => {
        called = true;
        return new Response();
      }) as unknown as typeof fetch,
    });
    expect(r).toEqual({ pushed: false, reason: "core_not_configured" });
    expect(called).toBe(false);
  });
  test("POST entries a seed-defaults del núcleo", async () => {
    let url = "";
    let init: RequestInit | undefined;
    const fetchImpl = (async (u: string, i: RequestInit) => {
      url = u;
      init = i;
      return Response.json({ data: [{ inserted: 1 }] });
    }) as unknown as typeof fetch;
    const r = await push_status_seeds({ env, fetchImpl });
    expect(url).toBe(`http://core:3000${STATUS_OPTION_SEED_PATH}`);
    expect(init?.method).toBe("POST");
    const body = JSON.parse(String(init?.body));
    expect(body.entries.length).toBe(STATUS_OPTION_SEEDS.length);
    expect(r.pushed).toBe(true);
  });
});
