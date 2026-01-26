module.exports = {
  "*.{ts,js,mjs,cjs,mts,astro}": (stagedFiles) => [
    `prettier --write ${stagedFiles.join(" ")}`,
    `eslint --max-warnings=0 ${stagedFiles.join(" ")}`,
  ],
  "*.md": (stagedFiles) => [`prettier --write ${stagedFiles.join(" ")}`],
};
