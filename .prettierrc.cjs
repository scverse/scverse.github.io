// TODO: switch back to YAML once https://github.com/prettier/prettier/issues/15141 (I assume) is fixed
//       or at least switch to mjs once https://github.com/prettier/prettier-vscode/issues/3066 is fixed

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
