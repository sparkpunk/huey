module.exports = {
  plugins: [
    require("tailwindcss"),
    require("@fullhuman/postcss-purgecss")({
      content: ['layouts/**/*.html']
    }),
    require("autoprefixer")
  ],
};