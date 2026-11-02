import { describe, expect, test } from "bun:test";
import { SUBJECT } from "./subject.ts";
import manifest from "../manifest.json" with { type: "json" };

type MenuItem = { pageId?: string; children?: MenuItem[] };

function menu_page_ids(items: MenuItem[]): string[] {
  return items.flatMap((item) => [
    ...(item.pageId ? [item.pageId] : []),
    ...menu_page_ids(item.children ?? []),
  ]);
}

describe("hojas del App Registry", () => {
  test("cada entrada del menú abre una página con hoja (sin hoja el núcleo da 404)", () => {
    const built = SUBJECT.manifest() as { menu: MenuItem[]; pages: Array<{ id: string; leaf?: { appBase?: string } }> };
    const ids = menu_page_ids(built.menu);
    expect(ids.length).toBeGreaterThan(0);
    for (const id of ids) {
      const page = built.pages.find((p) => p.id === id);
      expect(page?.leaf?.appBase, id).toBeTruthy();
    }
  });

  test("manifest.json está al día con el código", () => {
    expect(manifest).toEqual(JSON.parse(JSON.stringify(SUBJECT.manifest())));
  });
});
