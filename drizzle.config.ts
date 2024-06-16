import { defineConfig } from 'drizzle-kit'
export default defineConfig({
    schema: "./drizzle/schema.ts",
    dialect: 'sqlite',
    driver: "turso",
    dbCredentials: {
        url: process.env.TURSO_DATABASE_URL as string,
        authToken: process.env.TURSO_AUTH_TOKEN as string,

    },
    verbose: true,
    strict: true,
})