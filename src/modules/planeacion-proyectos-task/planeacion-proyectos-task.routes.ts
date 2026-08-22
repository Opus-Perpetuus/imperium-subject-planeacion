import { define_crud, define_module } from "@opus-perpetuus/imperium-core-kit";
import { planeacion_proyectos_task_pages } from "./planeacion-proyectos-task.pages.ts";
import { planeacion_proyectos_task_tables } from "./planeacion-proyectos-task.tables.ts";

export const planeacion_proyectos_task_module = define_module({
  resource: "planeacion-proyectos-task",
  labels: {
    singular: "Tareas de proyecto",
    plural: "Tareas de proyecto",
    read: "Ver Tareas de proyecto",
    write: "Editar Tareas de proyecto",
  },
  routes: define_crud({
    resource: "planeacion-proyectos-task",
    table: "planeacion_proyectos_task",
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
    },
    options_map: { value: "id", label: "name" },
  }),
  tables: planeacion_proyectos_task_tables,
  pages: planeacion_proyectos_task_pages,
  menu: [],
});
