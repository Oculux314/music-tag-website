export type Env = {
  readonly VITE_BACKEND_URL: string;
};

const rawEnv = import.meta.env;

export const env: Env = {
  VITE_BACKEND_URL: rawEnv.VITE_BACKEND_URL.replace(/\/+$/, ""), // Remove trailing slashes
};
