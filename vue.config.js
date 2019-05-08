module.exports = {
  runtimeCompiler: true,

  css: {
    loaderOptions: {
      sass: {
        data: '@import "@/scss/settings.scss";'
      }
    }
  },

  lintOnSave: undefined
}
