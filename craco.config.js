const CracoAntDesignPlugin = require("craco-antd");

module.exports = {
  plugins: [
    {
      plugin: CracoAntDesignPlugin,
      options: {
        customizeTheme: {
          "@primary-color": "#0b8aa8",
          "@font-family": "Catamaran, sans-serif",
          "@font-size-base": "16px",
          "@btn-primary-color": "#333",
          "@btn-primary-bg": "#ffcc00",
          "@border-radius-base": "20px",
          "@border-radius-sm": "10px",
        },
      },
    },
  ],
};
