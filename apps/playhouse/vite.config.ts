/// <reference types='vitest' />
import { defineConfig } from "vite";
import deepmerge from "deepmerge";
import baseConfig from "../../vite.app";
import { reaxyParser } from "@creaux/container-proxies-parser";

export default defineConfig(
  deepmerge(baseConfig, {
    plugins: [
      reaxyParser({
        blob: /^.*.assess.*$/,
        idRegExp: /\s*\[!id\s+(.*?)]\s*/,
        fromImport: "./use-effect.creator",
      }),
    ],
    build: {
      lib: {
        name: "playhouse",
      },
    },
  }),
);
