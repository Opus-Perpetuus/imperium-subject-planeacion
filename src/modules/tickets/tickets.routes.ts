import { define_crud, define_module } from "@opus-perpetuus/imperium-core-kit";
import { tickets_pages } from "./tickets.pages.ts";
import { tickets_tables } from "./tickets.tables.ts";

export const tickets_module = define_module({
  resource: "tickets",
  labels: {
    singular: "Tickets",
    plural: "Tickets",
    read: "Ver Tickets",
    write: "Editar Tickets",
  },
  routes: define_crud({
    resource: "tickets",
    table: "tickets",
    soft_delete: true,
    soft_delete_field: "is_active",
    history: true,
    default_sort: "name:asc",
    id_prefix: "tickets",
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
  tables: tickets_tables,
  pages: tickets_pages,
  menu: [
    {
      id: "planeacion.tickets",
      label: "Tickets",
      order: 0,
      pageId: "planeacion.tickets",
      path: "tickets",
      permission: "subject.planeacion.tickets.read",
      icon: "document",
    },
    {
      id: "planeacion.planeacion-proyectos",
      label: "Proyectos",
      order: 0,
      pageId: "planeacion.planeacion-proyectos",
      path: "planeacion-proyectos",
      permission: "subject.planeacion.planeacion-proyectos.read",
      icon: "document",
    },
    {
      id: "planeacion.planeacion-mis-tareas",
      label: "Mis tareas",
      order: 1,
      pageId: "planeacion.planeacion-mis-tareas",
      path: "planeacion-mis-tareas",
      permission: "subject.planeacion.planeacion-mis-tareas.read",
      icon: "document",
    },
    {
      id: "planeacion.planeacion-proyectos-task",
      label: "Tareas de proyecto",
      order: 2,
      pageId: "planeacion.planeacion-proyectos-task",
      path: "planeacion-proyectos-task",
      permission: "subject.planeacion.planeacion-proyectos-task.read",
      icon: "document",
    }
    ],
});
