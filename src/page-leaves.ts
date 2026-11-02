import type { KirletManifestLeaf } from "@opus-perpetuus/imperium-core-kit";

/**
 * Hojas del App Registry. Sin `leaf` en la página el núcleo no publica hojas:
 * las entradas del menú (`/internal/planeacion-proyectos`…) caían en 404 y el
 * menú viejo por módulos aparecía al lado del nuevo.
 */
export const PAGE_LEAVES: Readonly<Record<string, KirletManifestLeaf>> = {
  "planeacion.tickets": {
    kind: "crud",
    appBase: "tickets",
    icon: "fa-ticket",
    listHeaders: { es: { name: "Nombre", state: "Estado", ref: "Referencia" } },
  },
  "planeacion.planeacion-proyectos": {
    kind: "crud",
    appBase: "planeacion-proyectos",
    icon: "fa-diagram-project",
    listHeaders: {
      es: {
        name: "Nombre",
        status: "Estado",
        priority: "Prioridad",
        start_date: "Inicio",
        due_date: "Entrega",
        progress_percentage: "Avance",
      },
    },
  },
  "planeacion.planeacion-mis-tareas": {
    kind: "crud",
    appBase: "planeacion-mis-tareas",
    icon: "fa-list-check",
    listHeaders: {
      es: { name: "Nombre", state: "Estado", priority: "Prioridad", due_date: "Entrega" },
    },
  },
  "planeacion.planeacion-proyectos-task": {
    kind: "crud",
    appBase: "planeacion-proyectos-task",
    icon: "fa-clipboard-list",
    listHeaders: { es: { name: "Nombre", state: "Estado", ref: "Referencia" } },
  },
};

export function leaf_for(page_id: string): KirletManifestLeaf | undefined {
  return PAGE_LEAVES[page_id];
}
