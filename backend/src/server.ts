import { app } from "./app";
import { env } from "./utils/env";

app.listen(env.PORT, "0.0.0.0", () => {
  console.info(`Backend listening on http://localhost:${env.PORT}`);
});
