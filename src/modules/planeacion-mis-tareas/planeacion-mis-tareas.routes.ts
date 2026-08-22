import { define_crud, define_module } from "@opus-perpetuus/imperium-core-kit";
import { planeacion_mis_tareas_pages } from "./planeacion-mis-tareas.pages.ts";
import { planeacion_mis_tareas_tables } from "./planeacion-mis-tareas.tables.ts";

export const planeacion_mis_tareas_module = define_module({
  resource: "planeacion-mis-tareas",
  labels: {
    singular: "Mis tareas",
    plural: "Mis tareas",
    read: "Ver Mis tareas",
    write: "Editar Mis tareas",
  },
  routes: define_crud({
    resource: "planeacion-mis-tareas",
    table: "planeacion_mis_tareas",
    soft_delete: true,
    soft_delete_field: "is_active",
    history: true,
    default_sort: "name:asc",
    id_prefix: "planeaci",
    fields: {
      name: { type: "string", required: true, search: true },
      description: { type: "string", search: true },
      is_active: { type: "boolean" },
      state: { type: "string" },
      ref: { type: "string", search: true },
      search_field: { type: "string", search: true },
      created_by: { type: "string" },
      custom_data: { type: "json" },
      payload: { type: "json" },
      priority: { type: "string", search: true },
      due_date: { type: "string", search: true },
      parent_task: { type: "string", search: true },
      owner_user: { type: "string", search: true },
      markdown_specification: { type: "string", search: true },
      estimated_minutes: { type: "number" },
    },
    options_map: { value: "id", label: "name" },
  }),
  tables: planeacion_mis_tareas_tables,
  pages: planeacion_mis_tareas_pages,
  menu: [],
});
