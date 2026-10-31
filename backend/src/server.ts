import { app } from "./app.js";
import { env } from "./utils/env.js";

app.listen(env.PORT, "0.0.0.0", () => {
  console.info(`Backend listening on http://localhost:${env.PORT}`);
});
