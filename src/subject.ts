import { define_subject } from "@opus-perpetuus/imperium-core-kit";
import pkg from "../package.json" with { type: "json" };
import { tickets_module } from "./modules/tickets/tickets.routes.ts";
import { planeacion_proyectos_module } from "./modules/planeacion-proyectos/planeacion-proyectos.routes.ts";
import { planeacion_mis_tareas_module } from "./modules/planeacion-mis-tareas/planeacion-mis-tareas.routes.ts";
import { planeacion_proyectos_task_module } from "./modules/planeacion-proyectos-task/planeacion-proyectos-task.routes.ts";
import { seed_demo } from "./seed.ts";

export const SUBJECT = define_subject({
  id: "SUBJECT-planeacion",
  name: "Soporte y planeación",
  version: pkg.version,
  image: `ghcr.io/opus-perpetuus/subject-planeacion:${pkg.version}`,
  compat: { nox: ">=0.5.0", kit: "^0.5.0" },
  schema_version: 1,
  menu_root: {
    id: "planeacion.root",
    label: "Soporte y planeación",
    order: 0,
  },
  modules: [tickets_module, planeacion_proyectos_module, planeacion_mis_tareas_module, planeacion_proyectos_task_module],
  seed: seed_demo,
});

export const KIRLET = SUBJECT;
