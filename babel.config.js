module.exports = {
  presets: [
    ["@babel/preset-env", {targets: {node: 'current'}}],
    "@babel/preset-typescript"
  ],
  plugins: [
    ['module-resolver',
      {
        alias: {
          "@api": "./src/api",
          "@modules": "./src/modules",
          "@infra": "./src/infra",
          "@shared": "./src/shared"
        }
      }
    ],
    "babel-plugin-transform-typescript-metadata",
    ["@babel/plugin-proposal-decorators",{"legacy": true}],
    ["@babel/plugin-proposal-class-properties", {"loose": true}]
  ]
}