/// <reference types='vitest' />
import { defineConfig } from "vite";
import deepmerge from "deepmerge";
import baseConfig from "./vite.base";
import dts from "vite-plugin-dts";
import { join } from "path";

export default defineConfig(
  deepmerge(baseConfig, {
    plugins: [
      dts({
        entryRoot: "src",
        tsconfigPath: join(process.cwd(), "tsconfig.lib.json"),
      }),
    ],
  }),
);
