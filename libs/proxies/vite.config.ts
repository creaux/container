/// <reference types='vitest' />
import { defineConfig } from 'vite';
import deepmerge from 'deepmerge';
import baseConfig from '../../vite.lib';

export default defineConfig(
  deepmerge(baseConfig, {
    build: {
      lib: {
        name: 'container-proxies',
      },
    },
  }),
);
