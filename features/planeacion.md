# Soporte y planeación

Quien usa la app ve el menú «Soporte y planeación» con Tickets, Proyectos,
Mis tareas y Tareas de proyecto. Queda probado que la app responde como
`subject-planeacion` y publica esas cuatro páginas en su manifiesto.

## Sub-features

La app hace la acción de `manifiesto`. Escribe: no. Esta ficha no lleva línea
`Subject:` con imagen: el catálogo no da un tag para rellenarla. El hueco está
en `despliegue.md`.

- `manifiesto` deja un resultado observable: `GET /manifest` responde 200 con
  `technicalId: "subject-planeacion"` y las páginas `planeacion.tickets`,
  `planeacion.planeacion-proyectos`, `planeacion.planeacion-mis-tareas` y
  `planeacion.planeacion-proyectos-task`.

### Archivos y contratos

- `src/subject.ts` — `define_subject` de `SUBJECT-planeacion`
  (`subject-planeacion`); no declara `dependsOn`.
- `src/modules/*/*.routes.ts` — módulos `tickets`, `planeacion-proyectos`,
  `planeacion-mis-tareas` y `planeacion-proyectos-task`.
- `GET /health` y `GET /manifest` del kit (`vendor/kit/src/kirlet/serve.ts`).

### Mapa

| id | ruta | rol semilla | pasos | esperado | muta | receta |
| --- | --- | --- | --- | --- | --- | --- |
| `subject-planeacion.manifiesto` | `GET /manifest` | sin definir | GET a la app en `:3215` | 200, `technicalId: "subject-planeacion"` y las cuatro páginas | no | sin definir |

Base QA: sin definir. Ninguna receta que muta corre hasta que se nombre.

## How to get to it (user POV)

- Menú «Soporte y planeación» → Tickets (`tickets`), Proyectos
  (`planeacion-proyectos`), Mis tareas (`planeacion-mis-tareas`), Tareas de
  proyecto (`planeacion-proyectos-task`).

## Driving it with arnes

Preconditions:

- Doctor en 0. Si falta `subject-planeacion`, la receta sale `omitida`.

- **Abrir.** `GET http://127.0.0.1:3215/manifest`; status 200 y los ids de la
  sub-feature `manifiesto`.
- **Proof.** `evidence/planeacion/`.

## Gotchas

- Una receta de lectura que escribe sale en fallo aunque la pantalla se vea bien.
- Mutar solo contra una base QA nombrada en esta ficha; hoy no hay ninguna.
- `omitida` no cuenta como probada.
