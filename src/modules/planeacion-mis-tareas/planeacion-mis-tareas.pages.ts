import {
  build_feature_shell_page,
  type KirletPageDecl,
} from "@opus-perpetuus/imperium-core-kit";

const API = "api://m/subject-planeacion";

export const planeacion_mis_tareas_pages: KirletPageDecl[] = [
  {
    id: "planeacion.planeacion-mis-tareas",
    path: "planeacion-mis-tareas",
    permission: "subject.planeacion.planeacion-mis-tareas.read",
    build: () =>
      build_feature_shell_page({
        id: "planeacion.planeacion-mis-tareas",
        owner: "subject-planeacion",
        title: "Mis tareas",
        props: {
          basePath: "planeacion-mis-tareas",
          idKey: "id",
          nameKey: "name",
          view: {
            title: "Mis tareas",
            subtitle: "Submenú de planeacion",
            pluralLabel: "mis tareas",
            singularLabel: "mis tareas",
            emptyTitle: "Sin registros",
            emptyDescription: "Migra desde Mongo o crea el primero",
          },
          data: {
            list: `${API}/planeacion-mis-tareas`,
            record: `${API}/planeacion-mis-tareas/:id`,
            create: { method: "POST", action: `${API}/planeacion-mis-tareas` },
            update: { method: "PATCH", action: `${API}/planeacion-mis-tareas/:id` },
            delete: { method: "DELETE", action: `${API}/planeacion-mis-tareas/:id` },
          },
          table: {
            columns: [
              { key: "name", label: "Nombre", sortable: true, priority: 1 },
              { key: "is_active", label: "Activo", sortable: true, priority: 2 },
              { key: "ref", label: "Ref", sortable: true, priority: 3 },
              { key: "priority", label: "priority", sortable: true, priority: 3 },
              { key: "due_date", label: "due date", sortable: true, priority: 3 },
              { key: "parent_task", label: "parent task", sortable: true, priority: 3 },
              { key: "owner_user", label: "owner user", sortable: true, priority: 3 },
              { key: "markdown_specification", label: "markdown specification", sortable: true, priority: 3 },
              { key: "estimated_minutes", label: "estimated minutes", sortable: true, priority: 3 },
            ],
            fillHeight: true,
            serverQuery: true,
          },
          form: {
            fields: [
              { name: "name", component: "input-text", label: "Nombre", required: true },
              { name: "description", component: "input-text", label: "Descripción" },
              { name: "ref", component: "input-text", label: "Referencia (_ref)" },
              { name: "priority", component: "input-text", label: "priority" },
              { name: "due_date", component: "input-text", label: "due date" },
              { name: "parent_task", component: "input-text", label: "parent task" },
              { name: "owner_user", component: "input-text", label: "owner user" },
              { name: "markdown_specification", component: "input-text", label: "markdown specification" },
              { name: "estimated_minutes", component: "input-number", label: "estimated minutes" },
            ],
          },
        },
      }),
  },
];
