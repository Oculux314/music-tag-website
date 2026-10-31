import { useEffect, useState } from "react";
import type { HealthResponse } from "@music-tag/shared";
import { env } from "./env.js";

type ConnectionState = "checking" | "connected" | "error";

const backendUrl = env.VITE_BACKEND_URL.replace(/\/$/, "");

export default function App() {
  const [connection, setConnection] = useState<ConnectionState>("checking");

  useEffect(() => {
    const controller = new AbortController();

    async function checkBackend() {
      try {
        const response = await fetch(`${backendUrl}/api/health`, {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(`Backend returned ${response.status}`);
        }

        const health = (await response.json()) as HealthResponse;
        setConnection(health.status === "ok" ? "connected" : "error");
      } catch {
        if (!controller.signal.aborted) {
          setConnection("error");
        }
      }
    }

    void checkBackend();
    return () => controller.abort();
  }, []);

  return (
    <main className="page-shell">
      <section className="status-card" aria-labelledby="page-title">
        <div className="eyebrow">Music Tag</div>
        <h1 id="page-title">Your music library starts here.</h1>
        <p className="description">The React frontend and Express API are ready to build on.</p>
        <output className={`connection connection--${connection}`}>
          <span className="connection-dot" aria-hidden="true" />
          {connection === "checking" && "Checking backend connection…"}
          {connection === "connected" && "Backend connected"}
          {connection === "error" && "Backend is unreachable"}
        </output>
      </section>
    </main>
  );
}
