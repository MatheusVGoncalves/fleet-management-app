module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module:react-native-dotenv",
        {
          moduleName: "@env", //nome que usarei para importar as variáveis de ambiente
          allowUndefined: false, //não permitirei variáveis de ambiente indefinidas
        },
      ],
    ],
  };
};
