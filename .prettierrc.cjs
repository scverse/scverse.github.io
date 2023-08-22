// TODO: switch back to YAML when possible
//       or switch to mjs once https://github.com/prettier/prettier-vscode/issues/3066 is fixed

/** @type {import("prettier").Config} */
module.exports = {
    semi: false,
    plugins: [require.resolve("prettier-plugin-go-template")],
    overrides: [
        {
            files: ["*.html"],
            options: {
                parser: "go-template",
            },
        },
    ],
}
