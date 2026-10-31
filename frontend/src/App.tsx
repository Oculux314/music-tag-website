import { useEffect, useState } from "react";
import type { HealthResponse } from "@music-tag/shared";
import { env } from "./env.js";
import { authClient } from "./auth-client.js";

type ConnectionState = "checking" | "connected" | "error";

const backendUrl = env.VITE_BACKEND_URL.replace(/\/$/, "");

export default function App() {
  const [connection, setConnection] = useState<ConnectionState>("checking");
  const [authError, setAuthError] = useState<string | null>(null);
  const [authActionPending, setAuthActionPending] = useState(false);
  const { data: authSession, isPending: isSessionPending } = authClient.useSession();

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

  async function handleGoogleSignIn() {
    setAuthError(null);
    setAuthActionPending(true);

    try {
      const { error } = await authClient.signIn.social({
        provider: "google",
        callbackURL: window.location.origin,
      });

      if (error) {
        setAuthError(error.message);
      }
    } catch (error) {
      setAuthError(error instanceof Error ? error.message : "Google sign-in failed.");
    } finally {
      setAuthActionPending(false);
    }
  }

  async function handleSignOut() {
    setAuthError(null);
    setAuthActionPending(true);

    try {
      const { error } = await authClient.signOut();

      if (error) {
        setAuthError(error.message);
      }
    } catch (error) {
      setAuthError(error instanceof Error ? error.message : "Sign-out failed.");
    } finally {
      setAuthActionPending(false);
    }
  }

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
        <div className="auth-panel">
          {authSession ? (
            <>
              <p className="auth-status">Signed in as {authSession.user.name}</p>
              <button
                className="auth-button"
                type="button"
                disabled={authActionPending}
                onClick={() => void handleSignOut()}
              >
                {authActionPending ? "Signing out…" : "Sign out"}
              </button>
            </>
          ) : (
            <button
              className="auth-button"
              type="button"
              disabled={isSessionPending || authActionPending}
              onClick={() => void handleGoogleSignIn()}
            >
              {isSessionPending
                ? "Checking sign-in status…"
                : authActionPending
                  ? "Redirecting to Google…"
                  : "Continue with Google"}
            </button>
          )}
          {authError && (
            <p className="auth-error" role="alert">
              {authError}
            </p>
          )}
        </div>
      </section>
    </main>
  );
}
