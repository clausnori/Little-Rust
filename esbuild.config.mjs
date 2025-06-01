import * as esbuild from "esbuild";
import { exec } from "child_process";
import { copyFileSync, existsSync, mkdirSync } from "fs";
import { join } from "path";

const isServe = process.argv.includes("--serve");

// Функция упаковки ZIP
function packZip() {
  exec("node .vscode/pack-zip.js", (err, stdout, stderr) => {
    if (err) {
      console.error("Ошибка при упаковке dist.zip:", err);
      return;
    }
    console.log(stdout.trim());
  });
}

// Кастомный плагин: копирует rsm.dls и запускает упаковку
const zipPlugin = {
  name: "zip-plugin",
  setup(build) {
    build.onEnd(() => {
      const src = "src/rsm.dls";
      const dest = join("dist", "rsm.dls");

      // Копируем rsm.dls в dist
      if (existsSync(src)) {
        try {
          mkdirSync("dist", { recursive: true });
          copyFileSync(src, dest);
          console.log("✓ rsm.dls скопирован в dist/");
        } catch (e) {
          console.error("Ошибка при копировании rsm.dls:", e);
        }
      } else {
        console.warn("! rsm.dls не найден в src/");
      }

      // Упаковываем
      packZip();
    });
  },
};

// Базовая конфигурация
let buildConfig = {
  entryPoints: ["src/main.js"],
  bundle: true,
  minify: true,
  logLevel: "info",
  color: true,
  outdir: "dist",
  plugins: [zipPlugin],
};

// Главная точка входа
(async function () {
  if (isServe) {
    console.log("Starting development server...");

    const ctx = await esbuild.context(buildConfig);

    await ctx.watch();
    await ctx.serve({
      servedir: ".",
      port: 3000,
    });

  } else {
    console.log("Building for production...");
    await esbuild.build(buildConfig);
    console.log("✓ Production build complete.");
  }
})();