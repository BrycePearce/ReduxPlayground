module.exports = {
  plugins: [
    require("tailwindcss"),
    require('postcss-import'),
    require("autoprefixer"),
    ...(process.env.NODE_ENV === "production" ? [require("cssnano")] : []),
  ],
};