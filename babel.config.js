module.exports = {
  presets: [
    [
      "@babel/preset-react",
      {
        runtime: "classic", // classic JSX 런타임
        pragma: "createElement", // JSX → createElement(...)
        pragmaImportSource: "@my-react", // createElement 함수를 @my-react에서 import
      },
    ],
    [
      "@babel/preset-typescript",
      {
        isTSX: true, // .tsx 지원
        allExtensions: true,
      },
    ],
  ],
};
