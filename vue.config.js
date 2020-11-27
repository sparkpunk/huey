module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? './' : './',
  // assetsPath: process.env.NODE_ENV === 'production' ? './' : './',
  chainWebpack: config => {
    config
    .plugin('html')
    .tap(args => {
      args[0].title = "Huey | Color Palette Generator";
      return args;
    })
  }
}