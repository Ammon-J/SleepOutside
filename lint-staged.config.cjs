module.exports = {
  "*.{ts,js,mjs,cjs,mts}": (stagedFiles) => [
    `prettier --write ${stagedFiles.join(" ")}`,
    `eslint --max-warnings=0 ${stagedFiles.join(" ")}`,
  ],
  "*.astro": (stagedFiles) => [`prettier --write ${stagedFiles.join(" ")}`],
};
