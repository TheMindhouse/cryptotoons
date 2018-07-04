const { injectBabelPlugin } = require("react-app-rewired")
const rewireLess = require("react-app-rewire-less")

module.exports = function override(config, env) {
  config = injectBabelPlugin(
    ["import", { libraryName: "antd", style: true }],
    config
  )
  config = rewireLess.withLoaderOptions({
    modifyVars: {
      "@primary-color": "#0b8aa8",
      "@font-family": "Catamaran, sans-serif",
      "@font-size-base": "16px",
      "@btn-primary-color": "#333",
      "@btn-primary-bg": "#ffcc00",
    },
  })(config, env)
  return config
}
