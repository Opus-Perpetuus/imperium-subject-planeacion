import {
  build_feature_shell_page,
  type KirletPageDecl,
} from "@opus-perpetuus/imperium-core-kit";

const API = "api://m/subject-planeacion";

export const tickets_pages: KirletPageDecl[] = [
  {
    id: "planeacion.tickets",
    path: "tickets",
    permission: "subject.planeacion.tickets.read",
    build: () =>
      build_feature_shell_page({
        id: "planeacion.tickets",
        owner: "subject-planeacion",
        title: "Tickets",
        props: {
          basePath: "tickets",
          idKey: "id",
          nameKey: "name",
          view: {
            title: "Tickets",
            subtitle: "Submenú de planeacion",
            pluralLabel: "tickets",
            singularLabel: "tickets",
            emptyTitle: "Sin registros",
            emptyDescription: "Migra desde Mongo o crea el primero",
          },
          data: {
            list: `${API}/tickets`,
            record: `${API}/tickets/:id`,
            create: { method: "POST", action: `${API}/tickets` },
            update: { method: "PATCH", action: `${API}/tickets/:id` },
            delete: { method: "DELETE", action: `${API}/tickets/:id` },
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
