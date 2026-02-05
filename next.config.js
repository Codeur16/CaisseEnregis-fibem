
// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   // Export statique (SSG)
//   output: 'export',

//   // Bonnes pratiques
//   reactStrictMode: true,
//   trailingSlash: true,

//   // Images (obligatoire pour SSG)
//   images: {
//     unoptimized: true,
//   },
// };

// module.exports = nextConfig;


/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  output: 'export',
  reactStrictMode: true,
  images: {
    unoptimized: true,
  }
  // Optional: Change links `/me` -> `/me/` and emit `/me.html` -> `/me/index.html`
  // trailingSlash: true,
 
  // Optional: Prevent automatic `/me` -> `/me/`, instead preserve `href`
  // skipTrailingSlashRedirect: true,
 
  // Optional: Change the output directory `out` -> `dist`
  // distDir: 'dist',
}
 
module.exports = nextConfig

// Source - https://stackoverflow.com/a/79324896
// Posted by Ekene
// Retrieved 2026-02-04, License - CC BY-SA 4.0


  


