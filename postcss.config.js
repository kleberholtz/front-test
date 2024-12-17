module.exports = {
  plugins: [
    require('postcss-import'),
    require('tailwindcss/nesting'),
    require('tailwindcss'),
    require('postcss-preset-env')({
      stage: 1, // Configuração para ativar recursos modernos, mas desativar `is-pseudo-class`
      features: {
        'nesting-rules': true,
        'is-pseudo-class': false // Desativa o uso do `:is()`
      },
      autoprefixer: { grid: true },
    }),
    require('cssnano'),
  ]
}