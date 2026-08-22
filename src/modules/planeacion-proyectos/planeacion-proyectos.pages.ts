import {
  build_feature_shell_page,
  type KirletPageDecl,
} from "@opus-perpetuus/imperium-core-kit";

const API = "api://m/subject-planeacion";

export const planeacion_proyectos_pages: KirletPageDecl[] = [
  {
    id: "planeacion.planeacion-proyectos",
    path: "planeacion-proyectos",
    permission: "subject.planeacion.planeacion-proyectos.read",
    build: () =>
      build_feature_shell_page({
        id: "planeacion.planeacion-proyectos",
        owner: "subject-planeacion",
        title: "Proyectos",
        props: {
          basePath: "planeacion-proyectos",
          idKey: "id",
          nameKey: "name",
          view: {
            title: "Proyectos",
            subtitle: "Submenú de planeacion",
            pluralLabel: "proyectos",
            singularLabel: "proyectos",
            emptyTitle: "Sin registros",
            emptyDescription: "Migra desde Mongo o crea el primero",
          },
          data: {
            list: `${API}/planeacion-proyectos`,
            record: `${API}/planeacion-proyectos/:id`,
            create: { method: "POST", action: `${API}/planeacion-proyectos` },
            update: { method: "PATCH", action: `${API}/planeacion-proyectos/:id` },
            delete: { method: "DELETE", action: `${API}/planeacion-proyectos/:id` },
          },
          table: {
            columns: [
              { key: "name", label: "Nombre", sortable: true, priority: 1 },
              { key: "is_active", label: "Activo", sortable: true, priority: 2 },
              { key: "ref", label: "Ref", sortable: true, priority: 3 },
              { key: "priority", label: "priority", sortable: true, priority: 3 },
              { key: "start_date", label: "start date", sortable: true, priority: 3 },
              { key: "due_date", label: "due date", sortable: true, priority: 3 },
              { key: "owner_user", label: "owner user", sortable: true, priority: 3 },
              { key: "user_id", label: "user id", sortable: true, priority: 3 },
              { key: "status", label: "status", sortable: true, priority: 3 },
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
              { name: "start_date", component: "input-text", label: "start date" },
              { name: "due_date", component: "input-text", label: "due date" },
              { name: "owner_user", component: "input-text", label: "owner user" },
              { name: "user_id", component: "input-text", label: "user id" },
              { name: "status", component: "input-text", label: "status" },
              { name: "invited_at", component: "input-text", label: "invited at" },
              { name: "responded_by_user", component: "input-text", label: "responded by user" },
              { name: "markdown_specification", component: "input-text", label: "markdown specification" },
              { name: "progress_percentage", component: "input-number", label: "progress percentage" },
            ],
          },
        },
      }),
  },
];
