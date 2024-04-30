/// <reference types='vitest' />
import { defineConfig } from 'vite';
import deepmerge from 'deepmerge';
import baseConfig from './vite.base';
import dts from 'vite-plugin-dts';
import { join } from 'path';

export default defineConfig(
  deepmerge(baseConfig, {
    plugins: [
      dts({
        entryRoot: 'src',
        tsconfigPath: join(process.cwd(), 'tsconfig.lib.json'),
      }),
    ],
    build: {
      lib: {
        // Could also be a dictionary or array of multiple entry points.
        entry: join(process.cwd(), 'src/index.ts'),
        fileName: 'index',
        // Change this to the formats you want to support.
        // Don't forget to update your package.json as well.
        formats: ['es'],
      },
    },
  }),
);
