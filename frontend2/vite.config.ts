import { reactRouter } from '@react-router/dev/vite'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig, loadEnv } from 'vite'
import svgr from 'vite-plugin-svgr'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [tailwindcss(), reactRouter(), tsconfigPaths(), svgr()],
    server: {
      proxy: {
        [env.VITE_BASE_PATH]: {
          target: env.VITE_API_URL,
          changeOrigin: true,
          secure: false,
          rewrite: (path) =>
            path.replace(new RegExp(`^${env.VITE_BASE_PATH}`), ''),
        },
      },
    },
  }
})
