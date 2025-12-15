// next.config.js

// Importa el plugin next-transpile-modules
const withTM = require('next-transpile-modules')([
  '@mui/material',
  '@mui/system',
  '@mui/x-date-pickers', // El módulo que está causando el error al importar /styles
  '@mui/icons-material',
]);

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Asegúrate de que reactStrictMode esté activado si es necesario
  reactStrictMode: true,
  
  // Puedes dejar otras configuraciones aquí si las tienes
  // ...
};

// Exporta el módulo envuelto en withTM
module.exports = withTM(nextConfig);