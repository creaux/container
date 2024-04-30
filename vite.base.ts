/// <reference types='vitest' />
import { defineConfig } from 'vite';
import { join, resolve, relative } from 'path';
import { viteStaticCopy } from 'vite-plugin-static-copy';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  root: process.cwd(),
  cacheDir: join(
    relative(process.cwd(), resolve(__dirname, 'node_modules')),
    '.vite',
    relative(__dirname, process.cwd()),
  ),

  plugins: [
    tsconfigPaths({
      root: __dirname,
      configNames: ['tsconfig.base.json'],
    }),
    viteStaticCopy({
      targets: [
        {
          src: './package.json',
          dest: './',
        },
      ],
    }),
  ],

  css: {
    devSourcemap: true,
  },

  // Uncomment this if you are using workers.
  // worker: {
  //  plugins: [ nxViteTsPaths() ],
  // },

  // Configuration for building your library.
  // See: https://vitejs.dev/guide/build.html#library-mode
  build: {
    outDir: join(
      relative(process.cwd(), resolve(__dirname, 'dist')),
      relative(__dirname, process.cwd()),
    ),
    reportCompressedSize: true,
    commonjsOptions: {
      transformMixedEsModules: true,
    },
    sourcemap: 'inline',
    lib: {
      // Could also be a dictionary or array of multiple entry points.
      entry: 'src/index.ts',
      fileName: 'index',
      // Change this to the formats you want to support.
      // Don't forget to update your package.json as well.
      formats: ['es'],
    },
    rollupOptions: {
      // External packages that should not be bundled into your library.
      external: [],
    },
  },

  test: {
    globals: true,
    cache: {
      dir: './node_modules/.vitest',
    },
    watch: false,
    environment: 'node',
    include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],

    reporters: ['default'],
    coverage: {
      provider: 'v8',
      reportsDirectory: join(
        relative(process.cwd(), resolve(__dirname, 'coverage')),
        relative(__dirname, process.cwd()),
      ),
    },
  },
});
