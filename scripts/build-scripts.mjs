import { build } from 'esbuild';

const scripts = [
  { entry: 'lib/theme-setup.ts', outfile: 'public/theme-setup.js' },
];

Promise.all(
  scripts.map(({ entry, outfile }) =>
    build({
      entryPoints: [entry],
      outfile,
      bundle: true,
      format: 'iife',
      platform: 'browser',
      // watch: process.env.NODE_ENV === 'development',
    }).catch(() => process.exit(1)),
  ),
);
