import { define_crud, define_module } from "@opus-perpetuus/imperium-core-kit";
import { planeacion_proyectos_pages } from "./planeacion-proyectos.pages.ts";
import { planeacion_proyectos_tables } from "./planeacion-proyectos.tables.ts";

export const planeacion_proyectos_module = define_module({
  resource: "planeacion-proyectos",
  labels: {
    singular: "Proyectos",
    plural: "Proyectos",
    read: "Ver Proyectos",
    write: "Editar Proyectos",
  },
  routes: define_crud({
    resource: "planeacion-proyectos",
    table: "planeacion_proyectos",
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
      start_date: { type: "string", search: true },
      due_date: { type: "string", search: true },
      owner_user: { type: "string", search: true },
      user_id: { type: "string", search: true },
      status: { type: "string", search: true },
      invited_at: { type: "string", search: true },
      responded_by_user: { type: "string", search: true },
      markdown_specification: { type: "string", search: true },
      progress_percentage: { type: "number" },
    },
    options_map: { value: "id", label: "name" },
  }),
  tables: planeacion_proyectos_tables,
  pages: planeacion_proyectos_pages,
  menu: [],
});
