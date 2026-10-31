export type Env = {
  readonly VITE_BACKEND_URL: string;
};

export const env = import.meta.env as unknown as Env;
