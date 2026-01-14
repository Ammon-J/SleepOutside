module.exports = {
  "*.{ts,js,mjs,cjs}": (stagedFiles) => [
    `prettier --write ${stagedFiles.join(" ")}`,
    `eslint --max-warnings=0 ${stagedFiles.join(" ")}`,
  ],
};
