export default {
  plugins: {
    'postcss-import': {},
    'tailwindcss/nesting': {},
    tailwindcss: {},
    autoprefixer: {
      flexbox: 'no-2009',
      grid: 'autoplace'
    },
    'postcss-preset-env': {
      stage: 3,
      features: {
        'nesting-rules': false,
        'custom-properties': false,
        'color-function': true,
        'custom-media-queries': true,
        'gap-properties': true,
        'media-query-ranges': true
      },
      autoprefixer: false
    },
    ...(process.env.NODE_ENV === 'production' ? {
      cssnano: {
        preset: ['default', {
          discardComments: {
            removeAll: true,
          },
          normalizeWhitespace: false,
          colormin: true,
          reduceIdents: false,
          mergeIdents: false,
          minifyFontValues: true,
          minifyGradients: true,
          minifyParams: true,
          minifySelectors: true,
          mergeLonghand: true,
          mergeRules: true
        }]
      }
    } : {})
  }
}
