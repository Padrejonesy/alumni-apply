const modules = import.meta.glob([
  "../App.tsx",
  "../components/**/*.tsx",
  "../pages/**/*.tsx",
  "../hooks/**/*.tsx",
  "../lib/**/*.ts",
], { eager: false });

describe("project module imports", () => {
  for (const [modulePath, loadModule] of Object.entries(modules)) {
    it(`imports ${modulePath}`, async () => {
      const loaded = await loadModule();
      expect(loaded).toBeTruthy();
    }, 20000);
  }
});
