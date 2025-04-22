/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />

interface ImportMetaEnv {
  readonly VITE_BASE_PATH: string
  readonly VITE_API_URL: string
  readonly VITE_YJS_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
