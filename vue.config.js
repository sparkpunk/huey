module.exports = {
  chainWebpack: config => {
    config
    .plugin('html')
    .tap(args => {
      args[0].title = "Huey | Color Palette Generator";
      return args;
    })
  }
}