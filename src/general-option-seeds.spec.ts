import { describe, expect, test } from "bun:test";
import { readFileSync } from "node:fs";
import {
  GENERAL_OPTION_LIST_SEED_PATH,
  GENERAL_OPTION_LIST_SEEDS,
  general_option_list_options_source,
  push_general_option_seeds,
} from "./general-option-seeds";

describe("general option seeds", () => {
  test("optionsSource apunta al control del núcleo", () => {
    expect(general_option_list_options_source("subject-planeacion/planeacion-proyectos", "priority")).toBe(
      "api://general-option-list-control/options?model_id=subject-planeacion%2Fplaneacion-proyectos&list_key=priority&as=options",
    );
  });

  test("cubre priority B", () => {
    const keys = GENERAL_OPTION_LIST_SEEDS.flatMap((e) =>
      e.lists.map((l) => `${e.model_id}:${l.list_key}`),
    );
    expect(keys).toContain("subject-planeacion/planeacion-proyectos:priority");
    expect(keys).toContain("subject-planeacion/planeacion-mis-tareas:priority");
  });

  test("forms B usan optionsSource sin options literales", () => {
    for (const rel of [
      "./modules/planeacion-proyectos/planeacion-proyectos.pages.ts",
      "./modules/planeacion-mis-tareas/planeacion-mis-tareas.pages.ts",
    ]) {
      const src = readFileSync(new URL(rel, import.meta.url), "utf8");
      expect(src).toContain("general_option_list_options_source");
      expect(src).not.toMatch(/name: "priority"[\s\S]*?options:\s*\[/);
    }
  });
});

describe("push_general_option_seeds", () => {
  const env = {
    CORE_DATA_URL: "http://core:3000/api/kirlets/data/x",
    SUBJECT_TECHNICAL_ID: "subject-planeacion",
    CORE_SUBJECT_GATEWAY_SECRET: "s",
  };
  test("sin env no llama", async () => {
    expect(
      await push_general_option_seeds({
        env: {},
        fetchImpl: (async () => new Response()) as unknown as typeof fetch,
      }),
    ).toEqual({ pushed: false, reason: "core_not_configured" });
  });
  test("POST entries a seed-defaults del núcleo", async () => {
    let url = "";
    const fetchImpl = (async (u: string, i: RequestInit) => {
      url = u;
      return Response.json({ data: [] });
    }) as unknown as typeof fetch;
    const r = await push_general_option_seeds({ env, fetchImpl });
    expect(url).toBe(`http://core:3000${GENERAL_OPTION_LIST_SEED_PATH}`);
    expect(r.pushed).toBe(true);
  });
});
