import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import webSpatial from '@webspatial/vite-plugin'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    webSpatial(),
    react({
      jsxImportSource: '@webspatial/react-sdk',
    }),
  ],
})
