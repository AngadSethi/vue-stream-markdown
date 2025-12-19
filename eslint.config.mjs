import antfu from '@antfu/eslint-config'
import nuxt from './playground/.nuxt/eslint.config.mjs'

export default antfu({
  unocss: true,
  formatters: {
    html: true,
    css: true,
  },
  ignores: [
    'playground/app/markdown/**/code-blocks.md',
  ],
}).append(nuxt())
