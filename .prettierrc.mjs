/** @type {import("prettier").Config} */
export default {
  plugins: ["prettier-plugin-astro"],
  overrides: [
    {
      files: "*.astro",
      options: {
        parser: "astro"
      }
    }
  ],
  endOfLine: "lf",
  trailingComma: "none",
  printWidth: 120,
  tabWidth: 2,
  embeddedLanguageFormatting: "auto"
};
