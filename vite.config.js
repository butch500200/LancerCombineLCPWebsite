// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
    plugins: [react()],
    esbuild: {
        loader: 'jsx', // set loader to 'jsx' to interpret '.js' files as JSX
        include: /\.jsx?$/, // include both .jsx and .js files
    },
})