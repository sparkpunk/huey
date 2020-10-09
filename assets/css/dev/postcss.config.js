const themeDir = __dirname + '/../../../';

module.exports = {
  plugins: [
    require('postcss-import')({
      path: [themeDir]
    }), 
    require('tailwindcss')(themeDir + 'tailwind.config.js'),
    require('autoprefixer'),
  ],
};