import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  // Specify the base path if deploying to a subdirectory
  base: '/',

  // Configure build options
  build: {
    outDir: 'target/classes/static/', // Output directory
    sourcemap: false, // Generate source maps for debugging
    rollupOptions: {
      // Customize Rollup options
      input: './index.html', // Entry point
      output: {
        // Output options
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return 'vendor'; // Separate vendor code
          }
        },
      },
    },
    minify: 'esbuild', // Minify with 'esbuild' or 'terser'
  },

  // Server configurations
  server: {
    port: 3000,
    open: true, // Open the browser automatically
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
  plugins: [vue()],
})
