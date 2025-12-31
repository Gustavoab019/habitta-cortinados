import nextConfig from "eslint-config-next";

const config = [
  {
    ignores: ["**/.next/**", "**/node_modules/**"]
  },
  ...nextConfig,
  {
    rules: {
      "no-console": "off"
    }
  }
];

export default config;
