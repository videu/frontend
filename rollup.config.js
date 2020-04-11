/* This file is not loaded by rollup directly but imported in gulpfile.js */

const { createDefaultConfig } = require('@open-wc/building-rollup');
const typescript = require('@rollup/plugin-typescript');

const defaultConfig = createDefaultConfig({ input: 'index.html' });
defaultConfig.plugins.unshift(typescript({ tsconfig: 'tsconfig.build.json' }));

module.exports.defaultConfig = defaultConfig;
