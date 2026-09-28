/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SITE_URL?: string
  readonly VITE_GA_ID?: string
  readonly VITE_IMPACT_SCRIPT_URL?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
