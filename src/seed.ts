import type { KirletDataClient, NoxServices } from "@opus-perpetuus/imperium-core-kit";
import { new_id, now_iso } from "@opus-perpetuus/imperium-core-kit";
import { push_general_option_seeds } from "./general-option-seeds.ts";
import { push_status_seeds } from "./status-seeds.ts";

export async function seed_demo(ctx: {
  data: KirletDataClient;
  nox: NoxServices;
  technical_id: string;
}): Promise<void> {
  void push_status_seeds().then((r) =>
    console.log(JSON.stringify({ scope: "seed", msg: "status_seeds", ...r, data: undefined })),
  );
  void push_general_option_seeds().then((r) =>
    console.log(JSON.stringify({ scope: "seed", msg: "general_option_seeds", ...r, data: undefined })),
  );

  const n = await ctx.data.count("tickets");
  if (n > 0) return;
  const ts = now_iso();
  await ctx.data.insert("tickets", {
    id: new_id("tickets"),
    name: "Tickets (ejemplo)",
    description: "Registro semilla de la app. Sustituye al migrar desde Mongo.",
    is_active: true,
    ref: "seed-planeacion",
    created_at: ts,
    updated_at: ts,
  });
}
