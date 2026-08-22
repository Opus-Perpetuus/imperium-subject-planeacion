import type { KirletTableDecl } from "@opus-perpetuus/imperium-core-kit";

export const planeacion_proyectos_tables: KirletTableDecl[] = [
  {
    name: "planeacion_proyectos",
    columns: [
      { name: "id", type: "text", primaryKey: true },
      { name: "name", type: "text", notNull: true },
      { name: "description", type: "text" },
      { name: "is_active", type: "boolean", notNull: true, default: true },
      { name: "state", type: "text" },
      { name: "ref", type: "text", unique: true },
      { name: "search_field", type: "text" },
      { name: "created_by", type: "text" },
      { name: "custom_data", type: "json" },
      { name: "payload", type: "json" },
      { name: "created_at", type: "text", notNull: true },
      { name: "updated_at", type: "text", notNull: true },
      { name: "priority", type: "text" },
      { name: "start_date", type: "text" },
      { name: "due_date", type: "text" },
      { name: "owner_user", type: "text" },
      { name: "user_id", type: "text" },
      { name: "status", type: "text" },
      { name: "invited_at", type: "text" },
      { name: "responded_by_user", type: "text" },
      { name: "markdown_specification", type: "text" },
      { name: "progress_percentage", type: "real" },
    ],
    indexes: [
      { name: "idx_planeacion_proyectos_name", columns: ["name"] },
      { name: "idx_planeacion_proyectos_active", columns: ["is_active"] },
    ],
  },
];
