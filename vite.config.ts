import react from '@vitejs/plugin-react'
import { defineConfig } from 'vitest/config'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    // The test property is part of vitest/config
    globals: true,
    environment: 'jsdom',
    setupFiles: 'src/setupTests.ts', // Adjust this path according to where your setup file is located
  },
})
