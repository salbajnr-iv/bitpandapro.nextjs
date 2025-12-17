import { defineConfig } from '@prisma/client/extension'

export default defineConfig({
  datasource: {
    url: process.env.DATABASE_URL!,
  },
})