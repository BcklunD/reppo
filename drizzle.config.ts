// import { type Config } from "drizzle-kit";
import { defineConfig } from "drizzle-kit";

import { env } from "~/env";

// export default {
//   schema: "./src/server/db/schema.ts",
//   driver: "pg",
//   dbCredentials: {
//     connectionString: env.POSTGRES_URL,
//   },
//   tablesFilter: ["reppo_*"],
// } satisfies Config;

export default defineConfig({
  schema: "./src/server/db/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: env.POSTGRES_URL,
  },
  tablesFilter: ["reppo_*"],
});
