import {
  build_feature_shell_page,
  type KirletPageDecl,
} from "@opus-perpetuus/imperium-core-kit";

const API = "api://m/subject-planeacion";

export const planeacion_proyectos_task_pages: KirletPageDecl[] = [
  {
    id: "planeacion.planeacion-proyectos-task",
    path: "planeacion-proyectos-task",
    permission: "subject.planeacion.planeacion-proyectos-task.read",
    build: () =>
      build_feature_shell_page({
        id: "planeacion.planeacion-proyectos-task",
        owner: "subject-planeacion",
        title: "Tareas de proyecto",
        props: {
          basePath: "planeacion-proyectos-task",
          idKey: "id",
          nameKey: "name",
          view: {
            title: "Tareas de proyecto",
            subtitle: "Submenú de planeacion",
            pluralLabel: "tareas de proyecto",
            singularLabel: "tareas de proyecto",
            emptyTitle: "Sin registros",
            emptyDescription: "Migra desde Mongo o crea el primero",
          },
          data: {
            list: `${API}/planeacion-proyectos-task`,
            record: `${API}/planeacion-proyectos-task/:id`,
            create: { method: "POST", action: `${API}/planeacion-proyectos-task` },
            update: { method: "PATCH", action: `${API}/planeacion-proyectos-task/:id` },
            delete: { method: "DELETE", action: `${API}/planeacion-proyectos-task/:id` },
          },
          table: {
            columns: [
              { key: "name", label: "Nombre", sortable: true, priority: 1 },
              { key: "is_active", label: "Activo", sortable: true, priority: 2 },
              { key: "ref", label: "Ref", sortable: true, priority: 3 },
            ],
            fillHeight: true,
            serverQuery: true,
          },
          form: {
            fields: [
              { name: "name", component: "input-text", label: "Nombre", required: true },
              { name: "description", component: "input-text", label: "Descripción" },
              { name: "ref", component: "input-text", label: "Referencia (_ref)" },
            ],
          },
        },
      }),
  },
];
