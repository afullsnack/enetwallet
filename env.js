

/* eslint-disable */
const z = require("zod");

/* eslint-disable */
// const path = require("path");

const APP_ENV = "local";
// console.log(__dirname, ":::dirname", APP_ENV);
// const envPath = `${__dirname}/.env.${APP_ENV}`;

// if (APP_ENV !== "expo") {
//   /* eslint-disable */
//   require("dotenv").config({
//     path: envPath,
//   });
// }

// creating the schema
const client = z.object({
  APP_ENV: z.enum(["local", "staging", "production", "expo"]),
  LOCAL_STORE_ENC_KEY: z.string().min(12),
  GOOGLE_CLIENT_ID: z.string(),
  GOOGLE_CLIENT_SECRET: z.string(),
  CALLBACK_URL: z.string(),
});

const buildTime = z.object({
  // SENTRY_TOKEN: z.string(),
  BUNDLE_ID: z.string(),
});

// Get the environment from the process

/**
 * @type {Record<keyof z.infer<typeof client> , string | undefined>}
 */
const _clientEnv = {
  APP_ENV,

  // ADD YOUR ENV VARS HERE TOO
  LOCAL_STORE_ENC_KEY: process.env.LOCAL_STORE_ENC_KEY,
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
  CALLBACK_URL: process.env.CALLBACK_URL,
};

/**
 * @type {Record<keyof z.infer<typeof buildTime> , string | undefined>}
 */
const _buildTimeEnv = {
  // ADD YOUR ENV VARS HERE TOO
  // SENTRY_TOKEN: process.env.SECRET_KEY,
  BUNDLE_ID: process.env.BUNDLE_ID,
};

// we merge all variables into one object
const _env = {
  ..._clientEnv,
  ..._buildTimeEnv,
};

// merge the two schemas
const merged = buildTime.merge(client);
const parsed = merged.safeParse(_env);

if (parsed.success === false) {
  console.error(
    "❌ Invalid environment variables:",
    parsed.error.flatten().fieldErrors,

    `\n❌ Missing variables in .env.${APP_ENV} file, Make sure all required variables are defined in the .env.${APP_ENV} file.`,
    `\n💡 Tip: If you recently updated the .env.${APP_ENV} file and the error still persists, try restarting the server with the -cc flag to clear the cache.`,
  );
  throw new Error(
    "Invalid environment variables, Check terminal for more details ",
  );
}

const Env = parsed.data;
const ClientEnv = client.parse(_clientEnv);

module.exports = { Env, ClientEnv };

