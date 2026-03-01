/// <reference types="vite/client" />

declare const __XR_ENV_BASE__: string;

interface ImportMetaEnv {
  readonly VITE_ELEVENLABS_AGENT_ID: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
